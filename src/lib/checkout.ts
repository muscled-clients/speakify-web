import { getStripe, priceIdMonthly } from '@/lib/stripe'
import { query } from '@/lib/db/pool'

export type CheckoutPlan = 'trial' | 'now'

/**
 * Creates a Stripe Checkout session for a signed-in user and returns its URL.
 * plan 'trial': 3-day trial, card required (skipped automatically for anyone
 * with a prior subscription — one trial per user).
 * plan 'now': no trial, charged immediately (the "I'm convinced" path).
 */
export async function createCheckoutSession(
  user: { id: string; email: string; name?: string | null },
  plan: CheckoutPlan,
  appUrl: string
): Promise<string> {
  const stripe = getStripe()
  const price = priceIdMonthly()

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

  // TRIAL_DAYS=0 disables trials entirely: every checkout charges immediately.
  const trialDays = Number(process.env.TRIAL_DAYS ?? '3')
  const hadSubscription = existing.rows.length > 0
  const wantsTrial = plan === 'trial' && !hadSubscription && trialDays > 0
  const subscriptionData: Record<string, unknown> = { metadata: { user_id: user.id } }
  if (wantsTrial) {
    subscriptionData.trial_period_days = trialDays
    subscriptionData.trial_settings = { end_behavior: { missing_payment_method: 'cancel' } }
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price, quantity: 1 }],
    subscription_data: subscriptionData as never,
    payment_method_collection: 'always',
    metadata: { user_id: user.id },
    success_url: `${appUrl}/account?checkout=success`,
    cancel_url: `${appUrl}/account?checkout=cancel`,
    allow_promotion_codes: true,
  })
  if (!checkout.url) throw new Error('Stripe returned a session without a URL')
  return checkout.url
}
