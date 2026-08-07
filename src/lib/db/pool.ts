import { Pool } from 'pg'

let _pool: Pool | null = null

export function getPool(): Pool {
  if (!_pool) {
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
      max: 10,
    })
    _pool.on('error', (err) => console.error('[db pool] idle client error', err))
  }
  return _pool
}

export async function query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<{ rows: T[] }> {
  const result = await getPool().query(text, params)
  return { rows: result.rows as T[] }
}
