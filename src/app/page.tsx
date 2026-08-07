import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px' }}>
      <h1 style={{ fontSize: 56, lineHeight: 1.05, margin: 0, letterSpacing: '-0.02em' }}>
        Voice-to-text on your Mac. Never sends your voice to a server.
      </h1>
      <p style={{ fontSize: 20, color: '#94a3b8', marginTop: 24, lineHeight: 1.5 }}>
        Hit Ctrl+Space. Speak. Text appears in whatever app you&apos;re in. Runs locally on your Mac — works
        on planes, in secure environments, everywhere.
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        <Link
          href="/download"
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '14px 24px',
            borderRadius: 10,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Start 7-day free trial
        </Link>
        <Link
          href="/pricing"
          style={{
            border: '1px solid #334155',
            color: '#e2e8f0',
            padding: '14px 24px',
            borderRadius: 10,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          See pricing
        </Link>
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#64748b' }}>$20/month after trial. Cancel anytime.</p>
    </main>
  )
}
