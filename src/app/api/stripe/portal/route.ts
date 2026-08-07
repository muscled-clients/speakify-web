import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { getStripe } from '@/lib/stripe'
import { query } from '@/lib/db/pool'

/** POST /api/stripe/portal — returns a Stripe Customer Portal session URL for the logged-in user. */
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { rows } = await query<{ stripe_customer_id: string }>(
    `SELECT stripe_customer_id FROM subscriptions WHERE user_id = $1`,
    [session.user.id]
  )
  const customerId = rows[0]?.stripe_customer_id
  if (!customerId) return NextResponse.json({ error: 'No customer' }, { status: 404 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin
  const stripe = getStripe()
  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl}/account`,
  })
  return NextResponse.json({ url: portal.url })
}
