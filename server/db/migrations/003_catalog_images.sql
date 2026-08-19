BEGIN;

INSERT INTO products (id, name, description, price, weight, category, size, color, stock, availability, image_url)
VALUES
  ('LE-001', 'Boubou bazin sénégalais', 'Tenue féminine inspirée du bazin sénégalais, disponibilité à confirmer à Dakar.', 35000, 0.800, 'tenues', 'M,L,XL', 'Terracotta,Bordeaux,Noir', 0, 'SUR_DEMANDE', '/images/category-tenues.jpg'),
  ('LE-002', 'Tenue peulh du Niger', 'Tenue inspirée de l''art vestimentaire peulh du Niger, disponibilité à confirmer.', 30000, 0.900, 'tenues', 'S,M,L,XL', 'Selon disponibilité', 0, 'SUR_DEMANDE', 'https://commons.wikimedia.org/wiki/Special:FilePath/Femmes_peulh_portant_l%27accoutrement_traditionnel_au_Niger.jpg'),
  ('LE-003', 'Sac artisanal sahélien', 'Sac inspiré de l''artisanat ouest-africain, disponibilité à confirmer à Dakar.', 24000, 1.100, 'sacs', 'Unique', 'Camel,Noir', 0, 'SUR_DEMANDE', '/images/category-sacs.jpg'),
  ('LE-004', 'Parure sahélienne', 'Bijou inspiré des savoir-faire sahéliens, disponibilité à confirmer.', 17000, 0.300, 'bijoux', 'Unique', 'Argent', 0, 'SUR_DEMANDE', '/images/category-tenues.jpg'),
  ('LE-005', 'Soin au karité', 'Produit de soin au karité à vérifier selon la disponibilité et les conditions de transport.', 12000, 0.400, 'beaute', 'Unique', 'Standard', 0, 'SUR_DEMANDE', '/images/category-beaute.jpg'),
  ('LE-006', 'Foulard sahélien', 'Foulard sélectionné selon les pièces disponibles à Dakar ou Niamey.', 13000, 0.200, 'accessoires', 'Unique', 'Selon disponibilité', 0, 'SUR_DEMANDE', 'https://commons.wikimedia.org/wiki/Special:FilePath/Femmes_peulh_portant_l%27accoutrement_traditionnel_au_Niger.jpg')
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

COMMIT;