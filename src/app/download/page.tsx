import Link from 'next/link'

export default function Download() {
  return (
    <main style={{ maxWidth: 640, margin: '96px auto', padding: 24, textAlign: 'center' }}>
      <h1 style={{ fontSize: 40, margin: 0 }}>Download Speakify</h1>
      <p style={{ color: '#94a3b8', marginTop: 12 }}>macOS 14 or later, Apple Silicon</p>
      <a
        href="/downloads/Speakify.dmg"
        style={{
          display: 'inline-block',
          marginTop: 32,
          padding: '16px 28px',
          borderRadius: 12,
          background: '#3b82f6',
          color: 'white',
          fontWeight: 700,
          fontSize: 16,
          textDecoration: 'none',
        }}
      >
        Download Speakify.dmg
      </a>
      <p style={{ marginTop: 24, color: '#94a3b8' }}>
        After installing, launch Speakify and sign in with Google to start your 7-day free trial.
      </p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#64748b' }}>
        <Link href="/">Home</Link> · <Link href="/pricing">Pricing</Link>
      </p>
    </main>
  )
}
