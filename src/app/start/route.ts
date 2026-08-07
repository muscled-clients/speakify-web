import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { createCheckoutSession } from '@/lib/checkout'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * GET /start?plan=trial|now
 * The single entry point for every CTA: sends the visitor to Google sign-in
 * if needed, then straight into Stripe Checkout, then back to /account
 * where the download lives.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const plan = url.searchParams.get('plan') === 'now' ? 'now' : 'trial'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || url.origin

  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user) {
    const next = encodeURIComponent(`/start?plan=${plan}`)
    return NextResponse.redirect(`${appUrl}/login?next=${next}`)
  }

  try {
    const checkoutUrl = await createCheckoutSession(
      { id: session.user.id, email: session.user.email, name: session.user.name },
      plan,
      appUrl
    )
    return NextResponse.redirect(checkoutUrl)
  } catch (err) {
    console.error('[start] checkout creation failed:', err)
    return NextResponse.redirect(`${appUrl}/account?checkout=error`)
  }
}
