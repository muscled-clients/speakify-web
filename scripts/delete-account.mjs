#!/usr/bin/env node
// Account deletion tool, fulfilling the privacy policy's 30-day deletion promise.
// Usage: DATABASE_URL=... STRIPE_SECRET_KEY=... node scripts/delete-account.mjs user@example.com
// Deletes: Stripe customer (cancels any subscription), then the user row
// (sessions/accounts/subscriptions/device_activations cascade via FK).

import pg from 'pg'
import Stripe from 'stripe'

const email = process.argv[2]
if (!email) {
  console.error('Usage: node scripts/delete-account.mjs <email>')
  process.exit(1)
}

const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY_LIVE || process.env.STRIPE_SECRET_KEY_TEST
if (!process.env.DATABASE_URL || !stripeKey) {
  console.error('DATABASE_URL and a Stripe secret key are required in env')
  process.exit(1)
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const stripe = new Stripe(stripeKey)

const { rows: users } = await pool.query('SELECT id, email FROM "user" WHERE email = $1', [email])
if (users.length === 0) {
  console.error(`No user found for ${email}`)
  process.exit(1)
}
const user = users[0]
console.log(`Deleting account ${user.email} (${user.id})`)

const { rows: subs } = await pool.query(
  'SELECT stripe_customer_id FROM subscriptions WHERE user_id = $1', [user.id]
)
for (const sub of subs) {
  if (sub.stripe_customer_id) {
    try {
      await stripe.customers.del(sub.stripe_customer_id)
      console.log(`  Stripe customer ${sub.stripe_customer_id} deleted (subscriptions auto-canceled)`)
    } catch (err) {
      console.error(`  Stripe deletion failed (${sub.stripe_customer_id}): ${err.message}`)
      console.error('  Aborting so we do not leave a paying customer without an account. Fix Stripe first.')
      process.exit(1)
    }
  }
}

await pool.query('DELETE FROM "user" WHERE id = $1', [user.id])
console.log('  User row deleted (sessions, accounts, subscriptions, devices cascade)')
// verification rows are keyed by identifier (email), not userId — clear them explicitly
await pool.query('DELETE FROM verification WHERE identifier = $1', [user.email])
console.log('  Verification tokens cleared')
await pool.end()
console.log('Done. Reply to the requester confirming deletion.')
