import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { getStripe, priceIdMonthly } from '@/lib/stripe'
import { query } from '@/lib/db/pool'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * POST /api/stripe/create-checkout
 *
 * Creates a Stripe Checkout Session for the logged-in user.
 * - $20/mo subscription
 * - 7-day trial, credit card required upfront
 * - Reuses Stripe customer if user has one, else creates one
 * - Success/cancel URLs bounce back into the account page
 */
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = session.user

  const stripe = getStripe()
  const price = priceIdMonthly()

  // Find or create Stripe customer
  const existing = await query<{ stripe_customer_id: string }>(
    `SELECT stripe_customer_id FROM subscriptions WHERE user_id = $1`,
    [user.id]
  )
  let customerId = existing.rows[0]?.stripe_customer_id ?? null
  if (!customerId) {
    const customers = await stripe.customers.list({ email: user.email, limit: 1 })
    customerId = customers.data[0]?.id ?? null
    if (!customerId) {
      const c = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { user_id: user.id },
      })
      customerId = c.id
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price, quantity: 1 }],
    subscription_data: {
      trial_period_days: 7,
      trial_settings: {
        end_behavior: { missing_payment_method: 'cancel' },
      },
      metadata: { user_id: user.id },
    },
    payment_method_collection: 'always',
    metadata: { user_id: user.id },
    success_url: `${appUrl}/account?checkout=success`,
    cancel_url: `${appUrl}/account?checkout=cancel`,
    allow_promotion_codes: true,
  })

  if (!checkout.url) {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
  return NextResponse.json({ url: checkout.url })
}
