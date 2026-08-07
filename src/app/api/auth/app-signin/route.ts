/**
 * Speakify Mac app sign-in initiator.
 *
 * The desktop app opens https://speakify.dev/api/auth/app-signin?provider=google
 * in the system browser. This route posts to better-auth's sign-in endpoint
 * to establish OAuth state cookies in the browser context, then redirects to
 * Google. Google returns to /api/auth/app-callback, which deep-links back to
 * the app via `speakify:/auth/callback?token=...`.
 */
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED = new Set(['google'])

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const provider = url.searchParams.get('provider')
  if (!provider || !ALLOWED.has(provider)) {
    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
  }

  const callbackURL = '/api/auth/app-callback'
  const origin = process.env.BETTER_AUTH_URL || url.origin

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Signing in to Speakify…</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: -apple-system, system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0f172a; color: #e2e8f0; }
  </style>
</head>
<body>
  <p>Redirecting to Google…</p>
  <script>
    fetch(${JSON.stringify(origin)} + '/api/auth/sign-in/social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: ${JSON.stringify(provider)}, callbackURL: ${JSON.stringify(callbackURL)} }),
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => { if (data.url) window.location.href = data.url })
      .catch(err => { document.body.innerHTML = '<p>Error: ' + err.message + '</p>' })
  </script>
</body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
