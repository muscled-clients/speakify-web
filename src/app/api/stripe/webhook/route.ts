import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { query } from '@/lib/db/pool'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('[stripe/webhook] STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }
  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let event: Stripe.Event
  const rawBody = Buffer.from(await req.arrayBuffer())
  try {
    event = getStripe().webhooks.constructEvent(rawBody, sig, secret)
  } catch (err) {
    console.error('[stripe/webhook] verify failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await onCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await upsertSubscription(event.data.object as Stripe.Subscription)
        break
      case 'customer.subscription.deleted':
        await onSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      case 'customer.subscription.trial_will_end':
        // Optional: fire an email 3 days before trial ends.
        console.log('[stripe/webhook] trial_will_end', (event.data.object as Stripe.Subscription).id)
        break
      case 'invoice.payment_failed':
        // Handled by subscription.updated → status becomes past_due.
        console.log('[stripe/webhook] invoice.payment_failed', (event.data.object as Stripe.Invoice).id)
        break
      case 'charge.refunded':
        await onChargeRefunded(event.data.object as Stripe.Charge)
        break
      default:
        // Ignore
        break
    }
  } catch (err) {
    console.error(`[stripe/webhook] handler ${event.type} failed:`, err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }
  return NextResponse.json({ received: true })
}

async function onCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id
  const subId = session.subscription as string | null
  if (!userId || !subId) {
    console.error('[stripe/webhook] checkout.session.completed missing user_id or subscription')
    return
  }
  const sub = await getStripe().subscriptions.retrieve(subId)
  await upsertSubscription(sub)
}

async function upsertSubscription(sub: Stripe.Subscription) {
  const userId = sub.metadata?.user_id
  if (!userId) {
    console.error('[stripe/webhook] subscription missing user_id metadata', sub.id)
    return
  }
  const item = sub.items.data[0]
  const raw = sub as unknown as Record<string, unknown>
  const rawItem = item as unknown as Record<string, unknown>
  const rawStart = (rawItem['current_period_start'] ?? raw['current_period_start']) as number | undefined
  const rawEnd = (rawItem['current_period_end'] ?? raw['current_period_end']) as number | undefined
  const rawTrialEnd = raw['trial_end'] as number | null | undefined
  const start = rawStart ? new Date(rawStart * 1000).toISOString() : null
  const end = rawEnd ? new Date(rawEnd * 1000).toISOString() : null
  const trialEnd = rawTrialEnd ? new Date(rawTrialEnd * 1000).toISOString() : null

  await query(
    `INSERT INTO subscriptions
       (user_id, stripe_customer_id, stripe_subscription_id, status, current_period_start, current_period_end, cancel_at_period_end, trial_end, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
     ON CONFLICT (user_id) DO UPDATE SET
       stripe_customer_id     = EXCLUDED.stripe_customer_id,
       stripe_subscription_id = EXCLUDED.stripe_subscription_id,
       status                 = EXCLUDED.status,
       current_period_start   = EXCLUDED.current_period_start,
       current_period_end     = EXCLUDED.current_period_end,
       cancel_at_period_end   = EXCLUDED.cancel_at_period_end,
       trial_end              = EXCLUDED.trial_end,
       updated_at             = NOW()`,
    [userId, sub.customer as string, sub.id, sub.status, start, end, sub.cancel_at_period_end, trialEnd]
  )
  console.log(`[stripe/webhook] subscription upserted user=${userId} status=${sub.status}`)
}

async function onSubscriptionDeleted(sub: Stripe.Subscription) {
  await query(
    `UPDATE subscriptions SET status = 'canceled', updated_at = NOW() WHERE stripe_subscription_id = $1`,
    [sub.id]
  )
  console.log(`[stripe/webhook] subscription canceled ${sub.id}`)
}

async function onChargeRefunded(charge: Stripe.Charge) {
  // Refunds don't automatically end subscriptions — cancel immediately when this fires.
  const customerId = typeof charge.customer === 'string' ? charge.customer : charge.customer?.id
  if (!customerId) return
  await query(
    `UPDATE subscriptions SET status = 'canceled', updated_at = NOW() WHERE stripe_customer_id = $1`,
    [customerId]
  )
  console.log(`[stripe/webhook] refunded → subscription revoked for customer ${customerId}`)
}
