import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { bearer } from 'better-auth/plugins'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 30_000,
  max: 10,
})

pool.on('error', (err) => console.error('[auth pool] idle client error', err))

export const auth = betterAuth({
  database: pool,

  emailAndPassword: { enabled: false },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },

  account: {
    // Skip the state-cookie double check for OAuth. Same reason as
    // manage-teams: system browser (Chrome) doesn't share cookies
    // with a fresh Speakify.app deep-link callback, so the secondary
    // check would always fail. State validation via DB verification
    // table is still enforced.
    skipStateCookieCheck: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days — desktop app users don't want to re-auth weekly
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true },
  },

  plugins: [nextCookies(), bearer()],

  // Missing secret is an error at auth-op time, not at import time — this file is imported
  // during `next build` when env vars aren't populated, and we don't want that to blow up.
  secret: process.env.BETTER_AUTH_SECRET || 'build-time-placeholder-not-usable',

  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3007',

  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3007',
    'https://speakify.dev',
    'https://www.speakify.dev',
    'speakify:/', // macOS deep-link scheme
    'null',       // some browsers send null origin from custom-scheme redirects
  ],

  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    defaultCookieAttributes: { sameSite: 'lax', maxAge: 60 * 60 * 24 * 30 },
    database: { generateId: () => crypto.randomUUID() },
  },
})

export type Session = typeof auth.$Infer.Session.session
export type User = typeof auth.$Infer.Session.user
