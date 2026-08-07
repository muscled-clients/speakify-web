import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Latest release assets live on GitHub Releases (CDN-backed, no repo bloat).
// Bump RELEASE_TAG when cutting a new version — or replace with an API lookup later.
const RELEASE_TAG = 'v1.0.0'
const ALLOWED = new Set(['Speakify.dmg'])

export async function GET(_req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  if (!ALLOWED.has(file)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.redirect(
    `https://github.com/muscled-clients/speakify-web/releases/download/${RELEASE_TAG}/${file}`,
    { status: 302 }
  )
}
