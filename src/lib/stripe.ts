import Stripe from 'stripe'

function secretKey(): string {
  const live = process.env.STRIPE_SECRET_KEY_LIVE
  if (live?.startsWith('sk_live_')) return live
  const test = process.env.STRIPE_SECRET_KEY_TEST
  if (!test) throw new Error('No Stripe secret key configured')
  return test
}

export function isTestMode(): boolean {
  const live = process.env.STRIPE_SECRET_KEY_LIVE
  return !live?.startsWith('sk_live_')
}

let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) _stripe = new Stripe(secretKey())
  return _stripe
}

export function priceIdMonthly(): string {
  const id = isTestMode() ? process.env.STRIPE_PRICE_MONTHLY_TEST : process.env.STRIPE_PRICE_MONTHLY_LIVE
  if (!id) throw new Error(`Missing STRIPE_PRICE_MONTHLY_${isTestMode() ? 'TEST' : 'LIVE'}`)
  return id
}
