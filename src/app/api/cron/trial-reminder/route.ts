import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/pool'
import { sendTrialEndingEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

/**
 * Hourly cron (server crontab): emails trialing users whose trial ends within
 * the next 24 hours, once. Stripe's trial_will_end webhook fires 3 days ahead,
 * which for a 3-day trial is at signup, so the reminder is sent from here.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const auth = req.headers.get('authorization')
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { rows } = await query<{ user_id: string; email: string; trial_end: string }>(
    `SELECT s.user_id, u.email, s.trial_end
     FROM subscriptions s
     JOIN "user" u ON u.id = s.user_id
     WHERE s.status = 'trialing'
       AND s.trial_end > NOW()
       AND s.trial_end <= NOW() + interval '24 hours'
       AND s.trial_reminder_sent_at IS NULL`
  )

  let sent = 0
  for (const r of rows) {
    const ok = await sendTrialEndingEmail(r.email, new Date(r.trial_end))
    if (ok) {
      await query(`UPDATE subscriptions SET trial_reminder_sent_at = NOW() WHERE user_id = $1`, [r.user_id])
      sent++
    }
  }
  return NextResponse.json({ eligible: rows.length, sent })
}
