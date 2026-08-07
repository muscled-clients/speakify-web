import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { query } from '@/lib/db/pool'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Latest release assets live on GitHub Releases (CDN-backed, no repo bloat).
// Bump RELEASE_TAG when cutting a new version.
const RELEASE_TAG = 'v1.0.0'
const ALLOWED = new Set(['Speakify.dmg'])

/**
 * Gated download: requires a signed-in user with a subscription record
 * (any status — canceled users may reinstall; the app itself enforces
 * entitlement). Anonymous visitors get sent to the funnel.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  if (!ALLOWED.has(file)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user) {
    return NextResponse.redirect(`${appUrl}/download`)
  }
  const { rows } = await query(`SELECT 1 FROM subscriptions WHERE user_id = $1`, [session.user.id])
  if (rows.length === 0) {
    return NextResponse.redirect(`${appUrl}/download`)
  }

  return NextResponse.redirect(
    `https://github.com/muscled-clients/speakify-web/releases/download/${RELEASE_TAG}/${file}`,
    { status: 302 }
  )
}
