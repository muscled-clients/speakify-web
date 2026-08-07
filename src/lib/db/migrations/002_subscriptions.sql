CREATE TABLE IF NOT EXISTS subscriptions (
    user_id text PRIMARY KEY REFERENCES "user"(id) ON DELETE CASCADE,
    stripe_customer_id text NOT NULL,
    stripe_subscription_id text UNIQUE,
    status text NOT NULL,
    current_period_start timestamptz,
    current_period_end timestamptz,
    cancel_at_period_end boolean NOT NULL DEFAULT false,
    trial_end timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS subscriptions_customer_idx ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON subscriptions(status);

CREATE TABLE IF NOT EXISTS device_activations (
    id text PRIMARY KEY,
    user_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    device_fingerprint text NOT NULL,
    device_name text,
    first_seen_at timestamptz NOT NULL DEFAULT now(),
    last_seen_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE(user_id, device_fingerprint)
);
CREATE INDEX IF NOT EXISTS device_activations_user_idx ON device_activations(user_id);
