import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/pool'
import { lookupCustomer, draftReply, postToDiscord, signTicket } from '@/lib/support'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Resend Inbound webhook: fires for every email sent to support@speakify.dev.
 * Stores the ticket, drafts a reply with Claude (when ANTHROPIC_API_KEY is set),
 * and posts everything to the Discord support channel with an approve-to-send link.
 */
export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Temporary diagnostic: Resend's email.received payload shape is being confirmed.
  console.log('[support/inbound] raw payload:', JSON.stringify(payload).slice(0, 2000))

  // Resend inbound wraps the email in `data`; tolerate both shapes.
  const data = (payload.data ?? payload) as Record<string, unknown>
  const fromRaw = data.from
  const fromEmail =
    typeof fromRaw === 'string'
      ? fromRaw.match(/<([^>]+)>/)?.[1] ?? fromRaw
      : ((fromRaw as Record<string, unknown>)?.email as string) ?? 'unknown'
  const subject = (data.subject as string) ?? '(no subject)'
  const body = (data.text as string) ?? (data.html as string) ?? '(empty body)'

  // Loop guard: never ingest our own outbound mail. Without this, an approved
  // reply addressed to support@ re-enters the pipeline and ping-pongs forever.
  const lower = fromEmail.toLowerCase()
  if (lower.includes('@speakify.dev') || lower === 'unknown') {
    console.warn('[support/inbound] ignoring self/unknown sender:', fromEmail)
    return NextResponse.json({ ok: true, ignored: true })
  }

  const ticketId = crypto.randomUUID()
  const customer = await lookupCustomer(fromEmail)
  const draft = await draftReply(fromEmail, subject, body, customer)

  await query(
    `INSERT INTO support_tickets (id, from_email, subject, body, draft_reply, status)
     VALUES ($1, $2, $3, $4, $5, 'open')`,
    [ticketId, fromEmail, subject, body.slice(0, 8000), draft]
  )

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://speakify.dev'
  const approveUrl = `${appUrl}/api/support/approve?id=${ticketId}&sig=${signTicket(ticketId)}`
  const statusLine = customer.known
    ? `Customer: ${customer.status}${customer.trialEnd ? ` (trial ends ${new Date(customer.trialEnd).toLocaleDateString()})` : ''}`
    : 'Not a known customer email'

  const msg = [
    `**New support email**`,
    `From: ${fromEmail} | ${statusLine}`,
    `Subject: ${subject}`,
    '',
    `>>> ${body.slice(0, 500)}`,
    '',
    draft ? `**Draft reply:**\n${draft.slice(0, 900)}` : '**No AI draft** (ANTHROPIC_API_KEY not set). Reply manually.',
    '',
    draft ? `[Approve and send](${approveUrl})` : '',
  ].join('\n')

  const discordId = await postToDiscord(msg)
  if (discordId) {
    await query(`UPDATE support_tickets SET discord_message_id = $1 WHERE id = $2`, [discordId, ticketId])
  }

  return NextResponse.json({ ok: true, ticket: ticketId })
}
