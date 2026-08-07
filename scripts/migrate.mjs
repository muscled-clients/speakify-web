#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
})

async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      filename text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `)
}

async function applied() {
  const { rows } = await pool.query('SELECT filename FROM _migrations')
  return new Set(rows.map((r) => r.filename))
}

async function main() {
  await ensureMigrationsTable()
  const done = await applied()
  const dir = join(process.cwd(), 'src/lib/db/migrations')
  const files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort()

  for (const f of files) {
    if (done.has(f)) {
      console.log(`⏩ ${f} already applied`)
      continue
    }
    const sql = await readFile(join(dir, f), 'utf8')
    console.log(`▶️  ${f}`)
    await pool.query('BEGIN')
    try {
      await pool.query(sql)
      await pool.query('INSERT INTO _migrations (filename) VALUES ($1)', [f])
      await pool.query('COMMIT')
      console.log(`✅ ${f}`)
    } catch (err) {
      await pool.query('ROLLBACK')
      console.error(`❌ ${f}:`, err)
      process.exit(1)
    }
  }

  await pool.end()
  console.log('Migrations complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
