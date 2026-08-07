CREATE TABLE IF NOT EXISTS support_tickets (
    id text PRIMARY KEY,
    from_email text NOT NULL,
    subject text,
    body text NOT NULL,
    draft_reply text,
    status text NOT NULL DEFAULT 'open',
    discord_message_id text,
    sent_reply text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS support_tickets_email_idx ON support_tickets(from_email);
CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON support_tickets(status);
