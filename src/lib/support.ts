import { createHmac } from 'node:crypto'
import { query } from '@/lib/db/pool'

export function signTicket(ticketId: string): string {
  const secret = process.env.SUPPORT_APPROVE_SECRET || ''
  return createHmac('sha256', secret).update(ticketId).digest('hex').slice(0, 32)
}

export function verifyTicketSig(ticketId: string, sig: string): boolean {
  return signTicket(ticketId) === sig
}

export interface CustomerContext {
  known: boolean
  status?: string
  trialEnd?: string | null
  periodEnd?: string | null
}

export async function lookupCustomer(email: string): Promise<CustomerContext> {
  const { rows } = await query<{ status: string; trial_end: string | null; current_period_end: string | null }>(
    `SELECT s.status, s.trial_end, s.current_period_end
     FROM "user" u JOIN subscriptions s ON s.user_id = u.id
     WHERE lower(u.email) = lower($1)`,
    [email]
  )
  if (rows.length === 0) return { known: false }
  return {
    known: true,
    status: rows[0].status,
    trialEnd: rows[0].trial_end,
    periodEnd: rows[0].current_period_end,
  }
}

const SUPPORT_FACTS = `
Product facts you may rely on (do not invent others):
- Speakify is a macOS dictation app, $20 USD/month, charged at subscription time. There is currently no free trial.
- Refunds: full refund within 14 days of the first charge, no questions asked. Email confirmation is enough; the founder processes it.
- Requirements: macOS 14 (Sonoma) or later, Apple Silicon only (M1 or newer). Intel Macs are not supported.
- Default hotkey Ctrl+Space, changeable in Settings. Dictation is on-device (whisper.cpp); voice audio never leaves the Mac.
- Subscription checks: app verifies online periodically; fully offline works for 14 days, reminder after that, dictation pauses at 30 days offline.
- Cancel: self-serve at https://speakify.dev/account via Manage Subscription (Stripe portal). Access continues to end of paid period. Local data (history, shortcodes, vocabulary) always stays on the user's Mac.
- Charges appear as MUSCLED-SPEAKIFY on card statements.
- Second Mac: download the app and sign in with the same Google account. Nothing else needed.
- Optional AI Cleanup sends dictated TEXT (never audio) to Anthropic only if the user enables it with their own API key.
- Support email: support@speakify.dev.
`

export async function draftReply(
  fromEmail: string,
  subject: string,
  body: string,
  customer: CustomerContext
): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  const customerLine = customer.known
    ? `The sender IS a Speakify customer. Subscription status: ${customer.status}. Trial ends: ${customer.trialEnd ?? 'n/a'}. Period ends: ${customer.periodEnd ?? 'n/a'}.`
    : 'The sender email does NOT match any Speakify account. They may be a prospect, or they may use a different email for their account.'

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 700,
      system: `You draft support email replies for Speakify. Voice: warm, direct, human; short sentences; no corporate filler. HARD RULE: never use an em dash or en dash anywhere; use a period, comma, or colon instead. Sign off as "Speakify Support". Never promise features that don't exist, never share internal details, never process refunds yourself (say it's been noted and will be processed). If the question needs the founder's judgment, say so plainly in the draft and keep it short.\n${SUPPORT_FACTS}\n${customerLine}\nReturn ONLY the email body text, no subject line, no commentary.`,
      messages: [
        { role: 'user', content: `From: ${fromEmail}\nSubject: ${subject}\n\n${body.slice(0, 4000)}` },
      ],
    }),
  })
  if (!res.ok) {
    console.error('[support] draft failed:', res.status, await res.text().catch(() => ''))
    return null
  }
  const json = (await res.json()) as { content?: Array<{ text?: string }> }
  const raw = json.content?.[0]?.text ?? null
  return raw ? stripEmDashes(raw) : null
}

// House style bans em/en dashes in customer-facing text; the model occasionally
// slips one through regardless of prompting, so scrub deterministically.
function stripEmDashes(text: string): string {
  return text
    .replace(/\s+[—–]\s+/g, ', ')
    .replace(/[—–]/g, ', ')
    .replace(/,\s*,/g, ',')
}

export async function postToDiscord(content: string): Promise<string | null> {
  const token = process.env.DISCORD_BOT_TOKEN
  const channel = process.env.DISCORD_SUPPORT_CHANNEL_ID
  if (!token || !channel) return null
  const res = await fetch(`https://discord.com/api/v10/channels/${channel}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bot ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: content.slice(0, 1990) }),
  })
  if (!res.ok) {
    console.error('[support] discord post failed:', res.status)
    return null
  }
  const json = (await res.json()) as { id?: string }
  return json.id ?? null
}
