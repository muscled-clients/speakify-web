-- Better-auth core tables.
-- Generated from `npx @better-auth/cli generate` conceptually — hand-written to avoid runtime codegen.

CREATE TABLE IF NOT EXISTS "user" (
    id text PRIMARY KEY,
    email text NOT NULL UNIQUE,
    "emailVerified" boolean NOT NULL DEFAULT false,
    name text,
    image text,
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "session" (
    id text PRIMARY KEY,
    "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    token text NOT NULL UNIQUE,
    "expiresAt" timestamptz NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    "updatedAt" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS session_userId_idx ON "session"("userId");
CREATE INDEX IF NOT EXISTS session_token_idx ON "session"(token);

CREATE TABLE IF NOT EXISTS "account" (
    id text PRIMARY KEY,
    "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "accessTokenExpiresAt" timestamptz,
    "refreshTokenExpiresAt" timestamptz,
    scope text,
    "idToken" text,
    password text,
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    "updatedAt" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS account_userId_idx ON "account"("userId");

CREATE TABLE IF NOT EXISTS "verification" (
    id text PRIMARY KEY,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamptz NOT NULL,
    "createdAt" timestamptz DEFAULT now(),
    "updatedAt" timestamptz DEFAULT now()
);
