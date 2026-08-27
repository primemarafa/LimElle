BEGIN;

-- Remove old fashion products
DELETE FROM order_items WHERE product_id IN ('LE-001', 'LE-002', 'LE-003', 'LE-004', 'LE-005', 'LE-006');
DELETE FROM products WHERE id IN ('LE-001', 'LE-002', 'LE-003', 'LE-004', 'LE-005', 'LE-006');

-- Drop old category constraint
ALTER TABLE products
  DROP CONSTRAINT IF EXISTS products_category_check;

-- Insert new beauty catalog with lowercase IDs
INSERT INTO products (id, name, description, price, weight, category, size, color, stock, availability, image_url)
VALUES
  ('le-001', 'Sérum éclat naturel', 'Anti-taches - 30ml', 9500, 0.200, 'soins-visage', 'Unique', 'Standard', 0, 'disponible', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=700&auto=format&fit=crop'),
  ('le-002', 'Beurre de karité pur', 'Hydratation intense - 200g', 6000, 0.300, 'soins-corps', 'Unique', 'Standard', 0, 'disponible', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=700&auto=format&fit=crop'),
  ('le-003', 'Parfum Élégance', 'Eau de parfum - 50ml', 12500, 0.350, 'parfums', 'Unique', 'Standard', 0, 'disponible', 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700&auto=format&fit=crop'),
  ('le-004', 'Savon clarifiant', 'Éclat naturel - 100g', 2500, 0.150, 'soins-visage', 'Unique', 'Standard', 0, 'disponible', 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=700&auto=format&fit=crop'),
  ('le-005', 'Huile précieuse', 'Nourrissante - 50ml', 8500, 0.250, 'soins-corps', 'Unique', 'Standard', 0, 'disponible', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=700&auto=format&fit=crop')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  weight = EXCLUDED.weight,
  category = EXCLUDED.category,
  size = EXCLUDED.size,
  color = EXCLUDED.color,
  availability = EXCLUDED.availability,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- Add new category constraint for beauty catalog
ALTER TABLE products
  ADD CONSTRAINT products_category_check
  CHECK (category IN ('soins-visage', 'soins-corps', 'parfums', 'accessoires'));

INSERT INTO schema_migrations (version)
VALUES ('006_beauty_catalog')
ON CONFLICT (version) DO NOTHING;

COMMIT;
