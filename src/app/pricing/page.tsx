import Link from 'next/link'

export default function Pricing() {
  return (
    <main style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px' }}>
      <h1 style={{ fontSize: 40, margin: 0 }}>Pricing</h1>
      <div
        style={{
          marginTop: 32,
          padding: 32,
          border: '1px solid #334155',
          borderRadius: 16,
          background: '#0f172a',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 24 }}>Speakify</h2>
        <p style={{ fontSize: 48, margin: '16px 0 4px', fontWeight: 700 }}>
          $20<span style={{ fontSize: 20, color: '#94a3b8', fontWeight: 400 }}> / month</span>
        </p>
        <p style={{ color: '#94a3b8', margin: '0 0 24px' }}>7-day free trial. Cancel anytime.</p>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8, color: '#cbd5e1' }}>
          <li>Local speech-to-text — never sends your voice to a server</li>
          <li>Works offline (planes, no wifi, secure environments)</li>
          <li>Global hotkey — dictate into any app</li>
          <li>Vocabulary corrections + text shortcodes</li>
          <li>Voice actions (&ldquo;send it&rdquo; → presses Enter)</li>
          <li>Transcription history</li>
          <li>Two devices per subscription</li>
        </ul>
        <Link
          href="/login?next=/account"
          style={{
            display: 'inline-block',
            marginTop: 24,
            background: '#3b82f6',
            color: 'white',
            padding: '14px 24px',
            borderRadius: 10,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Start free trial
        </Link>
        <p style={{ marginTop: 12, fontSize: 13, color: '#64748b' }}>
          A credit card is required to start the trial. You won&apos;t be charged until day 8.
        </p>
      </div>
    </main>
  )
}
