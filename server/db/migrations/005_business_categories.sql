BEGIN;

UPDATE products
SET category = CASE category
  WHEN 'tenues' THEN 'vetements'
  WHEN 'sacs' THEN 'sacs-a-main'
  WHEN 'accessoires' THEN 'sacs-a-main'
  WHEN 'beaute' THEN 'bijoux'
  WHEN 'soins-visage' THEN 'bijoux'
  WHEN 'soins-corps' THEN 'tissus'
  WHEN 'parfums' THEN 'bijoux'
  ELSE category
END;

ALTER TABLE products
  DROP CONSTRAINT IF EXISTS products_category_check;

ALTER TABLE products
  ADD CONSTRAINT products_category_check
  CHECK (category IN ('vetements', 'tissus', 'leche', 'bijoux', 'chaussures', 'sacs-a-main'));

INSERT INTO schema_migrations (version)
VALUES ('005_business_categories')
ON CONFLICT (version) DO NOTHING;

COMMIT;
