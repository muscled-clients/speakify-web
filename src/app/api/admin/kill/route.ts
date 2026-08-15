import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/pool'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * POST /api/admin/kill — server-to-server kill switch (called by manage-teams).
 *
 * Auth: Authorization: Bearer <ADMIN_API_KEY>  (env var; never in a browser)
 *
 * Body: { "email": "person@example.com", "action": "deactivate" | "reactivate" | "status" }
 *
 * deactivate: sets revoked_at AND deletes every session (bearer tokens die
 *             instantly; the Mac app locks on its next status check — hourly
 *             poll or app-focus, whichever comes first).
 * reactivate: clears revoked_at (user signs in again normally).
 * status:     reports current revocation + subscription state.
 *
 * Billing is intentionally untouched — revoking access is not a Stripe
 * cancellation. Handle billing separately if the company pays for the seat.
 */
export async function POST(req: NextRequest) {
  const adminKey = process.env.ADMIN_API_KEY
  const header = req.headers.get('authorization')
  if (!adminKey || header !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { email?: string; action?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
  const email = body.email?.trim().toLowerCase()
  const action = body.action
  if (!email || !action || !['deactivate', 'reactivate', 'status'].includes(action)) {
    return NextResponse.json(
      { error: 'Body must be { email, action: deactivate | reactivate | status }' },
      { status: 400 }
    )
  }

  const { rows } = await query<{ id: string; email: string; revoked_at: string | null }>(
    `SELECT id, email, revoked_at FROM "user" WHERE lower(email) = $1`,
    [email]
  )
  const user = rows[0]
  if (!user) return NextResponse.json({ error: 'No Speakify account with that email' }, { status: 404 })

  if (action === 'deactivate') {
    await query(`UPDATE "user" SET revoked_at = NOW() WHERE id = $1`, [user.id])
    const sessions = await query(`DELETE FROM "session" WHERE "userId" = $1 RETURNING id`, [user.id])
    console.log(`[admin/kill] DEACTIVATED ${user.email} (${sessions.rows.length} sessions revoked)`)
    return NextResponse.json({
      ok: true,
      action: 'deactivate',
      email: user.email,
      sessions_revoked: sessions.rows.length,
      note: 'Bearer tokens are dead now; the Mac app locks on its next status check (<=1h, or instantly on app focus).',
    })
  }

  if (action === 'reactivate') {
    await query(`UPDATE "user" SET revoked_at = NULL WHERE id = $1`, [user.id])
    console.log(`[admin/kill] reactivated ${user.email}`)
    return NextResponse.json({
      ok: true,
      action: 'reactivate',
      email: user.email,
      note: 'User must sign in again in the Mac app (their old sessions were deleted on deactivation).',
    })
  }

  const sub = await query<{ status: string }>(
    `SELECT status FROM subscriptions WHERE user_id = $1`,
    [user.id]
  )
  return NextResponse.json({
    ok: true,
    action: 'status',
    email: user.email,
    revoked: user.revoked_at != null,
    revoked_at: user.revoked_at,
    subscription_status: sub.rows[0]?.status ?? 'none',
  })
}
