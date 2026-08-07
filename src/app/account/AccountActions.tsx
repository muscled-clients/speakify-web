'use client'
import { useState } from 'react'

export default function AccountActions({ kind }: { kind: 'checkout' | 'portal' }) {
  const [loading, setLoading] = useState(false)

  async function go() {
    setLoading(true)
    const path = kind === 'checkout' ? '/api/stripe/create-checkout' : '/api/stripe/portal'
    const res = await fetch(path, { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else {
      alert(data.error ?? 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={go}
      disabled={loading}
      style={{
        marginTop: 20,
        padding: '12px 22px',
        borderRadius: 10,
        border: 'none',
        background: '#3b82f6',
        color: 'white',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {loading
        ? 'One moment…'
        : kind === 'checkout'
        ? 'Start 7-day trial ($20/mo after)'
        : 'Manage subscription'}
    </button>
  )
}
