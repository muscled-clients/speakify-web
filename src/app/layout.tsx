import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Speakify: Local-first voice-to-text for macOS',
  description: 'Fast, private dictation for Mac. Never sends your voice to a server. $20/month with a 7-day free trial.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
