import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { query } from '@/lib/db/pool'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * GET /api/subscription/status
 *
 * Called by the Speakify Mac app on launch + once per day thereafter.
 * Requires a valid session (bearer token in Authorization header OR cookie).
 *
 * Returns `entitled: true` if the user has an active or trialing subscription
 * (or past_due within its grace window). The Mac app's SubscriptionManager
 * caches this result along with the server_time_ms so it can enforce a soft
 * 14-day / hard 30-day offline grace period.
 */
export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Admin kill switch: a revoked account is locked regardless of billing state.
  const revokedCheck = await query<{ revoked_at: string | null }>(
    `SELECT revoked_at FROM "user" WHERE id = $1`,
    [session.user.id]
  )
  if (revokedCheck.rows[0]?.revoked_at != null) {
    return NextResponse.json({
      entitled: false,
      status: 'revoked',
      current_period_end: null,
      trial_end: null,
      cancel_at_period_end: false,
      server_time_ms: Date.now(),
      user: { id: session.user.id, email: session.user.email, name: session.user.name },
    })
  }

  const { rows } = await query<{
    status: string
    current_period_end: string | null
    trial_end: string | null
    cancel_at_period_end: boolean
  }>(
    `SELECT status, current_period_end, trial_end, cancel_at_period_end
     FROM subscriptions
     WHERE user_id = $1`,
    [session.user.id]
  )
  const sub = rows[0]

  const now = new Date()
  const status = sub?.status ?? 'none'
  const entitledStatuses = new Set(['active', 'trialing', 'past_due'])
  const entitled = sub != null && entitledStatuses.has(status)

  return NextResponse.json({
    entitled,
    status,
    current_period_end: sub?.current_period_end ?? null,
    trial_end: sub?.trial_end ?? null,
    cancel_at_period_end: sub?.cancel_at_period_end ?? false,
    server_time_ms: now.getTime(),
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
  })
}
