BEGIN;

UPDATE products
SET category = CASE category
  WHEN 'soins-visage' THEN 'bijoux'
  WHEN 'soins-corps' THEN 'tissus'
  WHEN 'parfums' THEN 'bijoux'
  WHEN 'accessoires' THEN 'sacs-a-main'
  ELSE category
END;

ALTER TABLE products
  DROP CONSTRAINT IF EXISTS products_category_check;

ALTER TABLE products
  ADD CONSTRAINT products_category_check
  CHECK (category IN ('vetements', 'tissus', 'leche', 'bijoux', 'chaussures', 'sacs-a-main'));

INSERT INTO schema_migrations (version)
VALUES ('004_business_categories')
ON CONFLICT (version) DO NOTHING;

COMMIT;
