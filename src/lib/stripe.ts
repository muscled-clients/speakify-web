import Stripe from 'stripe'

// Restricted live keys (rk_live_) are accepted too — scoped keys are preferable
// to the account-wide secret key.
function isLiveKey(key: string | undefined): key is string {
  return !!key && (key.startsWith('sk_live_') || key.startsWith('rk_live_'))
}

function secretKey(): string {
  const live = process.env.STRIPE_SECRET_KEY_LIVE
  if (isLiveKey(live)) return live
  const test = process.env.STRIPE_SECRET_KEY_TEST
  if (!test) throw new Error('No Stripe secret key configured')
  return test
}

export function isTestMode(): boolean {
  return !isLiveKey(process.env.STRIPE_SECRET_KEY_LIVE)
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
