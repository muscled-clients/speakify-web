import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { query } from '@/lib/db/pool'
import Link from 'next/link'
import AccountActions from './AccountActions'

export const dynamic = 'force-dynamic'

interface SubRow {
  status: string
  current_period_end: string | null
  trial_end: string | null
  cancel_at_period_end: boolean
}

export default async function Account() {
  const hdrs = await headers()
  const session = await auth.api.getSession({ headers: hdrs })
  if (!session?.user) redirect('/login?next=/account')

  const { rows } = await query<SubRow>(
    `SELECT status, current_period_end, trial_end, cancel_at_period_end
     FROM subscriptions WHERE user_id = $1`,
    [session.user.id]
  )
  const sub = rows[0] ?? null

  return (
    <main style={{ maxWidth: 640, margin: '48px auto', padding: 24 }}>
      <h1 style={{ fontSize: 32, margin: 0 }}>Your Account</h1>
      <p style={{ color: '#94a3b8' }}>Signed in as {session.user.email}</p>

      <section
        style={{
          marginTop: 32,
          padding: 24,
          border: '1px solid #334155',
          borderRadius: 12,
          background: '#0f172a',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20 }}>Subscription</h2>
        {!sub ? (
          <>
            <p style={{ color: '#94a3b8', marginTop: 12 }}>You&apos;re not subscribed yet.</p>
            <AccountActions kind="checkout" />
          </>
        ) : (
          <>
            <p style={{ marginTop: 12 }}>
              Status: <strong>{sub.status}</strong>
              {sub.cancel_at_period_end && ' (cancels at period end)'}
            </p>
            {sub.trial_end && (
              <p style={{ color: '#94a3b8' }}>Trial ends: {new Date(sub.trial_end).toLocaleString()}</p>
            )}
            {sub.current_period_end && (
              <p style={{ color: '#94a3b8' }}>
                Current period ends: {new Date(sub.current_period_end).toLocaleString()}
              </p>
            )}
            <AccountActions kind="portal" />
          </>
        )}
      </section>

      <p style={{ marginTop: 32, fontSize: 13, color: '#64748b' }}>
        <Link href="/download">Download Speakify</Link> · <Link href="/">Home</Link>
      </p>
    </main>
  )
}
