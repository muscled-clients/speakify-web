-- Admin kill switch: revocation is account-level and distinct from billing.
-- A revoked user keeps their subscription rows (billing untouched) but the
-- status endpoint reports them locked and their sessions are deleted.
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS revoked_at timestamptz;
