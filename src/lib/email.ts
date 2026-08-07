import { Resend } from 'resend'

let _resend: Resend | null = null
function resend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!_resend) _resend = new Resend(key)
  return _resend
}

const FROM = process.env.EMAIL_FROM || 'Speakify <support@speakify.dev>'

export async function sendTrialEndingEmail(to: string, trialEnd: Date | null): Promise<boolean> {
  const client = resend()
  if (!client) {
    console.warn('[email] RESEND_API_KEY not set, skipping trial-ending email')
    return false
  }
  const when = trialEnd
    ? trialEnd.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : 'tomorrow'
  try {
    await client.emails.send({
      from: FROM,
      to,
      subject: 'Your Speakify trial ends tomorrow',
      text: [
        `Your Speakify free trial ends tomorrow${trialEnd ? ` (${when})` : ''}.`,
        '',
        'If you love it, do nothing: your subscription starts automatically at $20/month.',
        '',
        'Not for you? Cancel in one click from your account page and you will not be charged:',
        'https://speakify.dev/account',
        '',
        'Questions? Just reply to this email.',
        '',
        'Speakify by Unpuzzle',
      ].join('\n'),
    })
    console.log(`[email] trial-ending sent to ${to}`)
    return true
  } catch (err) {
    console.error('[email] trial-ending send failed:', err)
    return false
  }
}
