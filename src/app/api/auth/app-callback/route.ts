/**
 * After Google OAuth completes, better-auth redirects the system browser here.
 * We read the freshly-created session token and hand it back to the Speakify
 * Mac app via a `speakify:/auth/callback?token=...` deep link.
 */
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SCHEME = 'speakify'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.session?.token) {
      return htmlRedirect(`${SCHEME}://auth/callback?error=no_session`)
    }
    const token = session.session.token
    return htmlRedirect(`${SCHEME}://auth/callback?token=${encodeURIComponent(token)}`)
  } catch (err) {
    console.error('[app-callback] error', err)
    return htmlRedirect(`${SCHEME}://auth/callback?error=exception`)
  }
}

function htmlRedirect(deepLink: string): NextResponse {
  const escapedForJs = deepLink.replace(/'/g, "\\'")
  const escapedForHtml = deepLink.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Opening Speakify…</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: -apple-system, system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0f172a; color: #e2e8f0; }
    .box { text-align: center; max-width: 420px; padding: 24px; }
    h2 { margin: 0 0 8px; }
    p { color: #94a3b8; }
    a { color: #60a5fa; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Signing you in…</h2>
    <p>Speakify should open automatically. If it doesn't, <a href="${escapedForHtml}">click here</a>.</p>
    <p style="margin-top: 24px; font-size: 13px;">You can close this tab.</p>
  </div>
  <script>window.location.href = '${escapedForJs}';</script>
</body>
</html>`
  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
