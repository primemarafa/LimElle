ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS lookup_token TEXT;

UPDATE orders
SET lookup_token = encode(gen_random_bytes(32), 'hex')
WHERE lookup_token IS NULL;

ALTER TABLE orders
  ALTER COLUMN lookup_token SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_lookup_token ON orders(lookup_token);
