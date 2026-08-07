import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { createCheckoutSession, type CheckoutPlan } from '@/lib/checkout'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/** POST /api/stripe/create-checkout — body: { plan?: 'trial' | 'now' } (default trial). */
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let plan: CheckoutPlan = 'trial'
  try {
    const body = (await req.json()) as { plan?: string }
    if (body.plan === 'now') plan = 'now'
  } catch {
    // no body — default to trial
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin
  try {
    const url = await createCheckoutSession(
      { id: session.user.id, email: session.user.email, name: session.user.name },
      plan,
      appUrl
    )
    return NextResponse.json({ url })
  } catch (err) {
    console.error('[create-checkout] failed:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
