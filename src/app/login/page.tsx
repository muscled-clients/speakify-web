'use client'
import { authClient } from '@/lib/auth/auth-client'
import { useState } from 'react'

export default function Login() {
  const [loading, setLoading] = useState(false)

  async function signInGoogle() {
    setLoading(true)
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/account',
    })
  }

  return (
    <main style={{ maxWidth: 420, margin: '96px auto', padding: 24, textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, margin: 0 }}>Sign in to Speakify</h1>
      <p style={{ color: '#94a3b8', marginTop: 12 }}>
        One account for your subscription and every device you use Speakify on.
      </p>
      <button
        onClick={signInGoogle}
        disabled={loading}
        style={{
          marginTop: 32,
          width: '100%',
          padding: '14px 20px',
          borderRadius: 10,
          border: '1px solid #334155',
          background: '#1e293b',
          color: '#e2e8f0',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {loading ? 'Redirecting…' : 'Continue with Google'}
      </button>
    </main>
  )
}
