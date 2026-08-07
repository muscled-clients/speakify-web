import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { query } from '@/lib/db/pool'
import { verifyTicketSig, postToDiscord } from '@/lib/support'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/** Approve-and-send link clicked from Discord. GET so a plain link works. */
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id') ?? ''
  const sig = url.searchParams.get('sig') ?? ''
  if (!id || !verifyTicketSig(id, sig)) {
    return html('Invalid or expired link.', 400)
  }

  const { rows } = await query<{ from_email: string; subject: string | null; draft_reply: string | null; status: string }>(
    `SELECT from_email, subject, draft_reply, status FROM support_tickets WHERE id = $1`,
    [id]
  )
  const ticket = rows[0]
  if (!ticket) return html('Ticket not found.', 404)
  if (ticket.status === 'sent') return html('Already sent. Nothing to do.', 200)
  if (!ticket.draft_reply) return html('This ticket has no draft to send.', 400)

  const key = process.env.RESEND_API_KEY
  if (!key) return html('RESEND_API_KEY not configured on the server.', 500)

  const resend = new Resend(key)
  const subject = ticket.subject?.startsWith('Re:') ? ticket.subject : `Re: ${ticket.subject ?? 'your message'}`
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Speakify <support@speakify.dev>',
      to: ticket.from_email,
      subject,
      text: ticket.draft_reply,
    })
  } catch (err) {
    console.error('[support/approve] send failed:', err)
    return html('Send failed. Check server logs and Resend domain verification.', 500)
  }

  await query(
    `UPDATE support_tickets SET status = 'sent', sent_reply = draft_reply, updated_at = NOW() WHERE id = $1`,
    [id]
  )
  await postToDiscord(`Reply sent to ${ticket.from_email} (ticket ${id.slice(0, 8)}).`)
  return html(`Reply sent to ${ticket.from_email}. You can close this tab.`, 200)
}

function html(message: string, status: number): NextResponse {
  return new NextResponse(
    `<!DOCTYPE html><html><body style="font-family:system-ui;background:#0b1120;color:#e2e8f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0"><p>${message}</p></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}
