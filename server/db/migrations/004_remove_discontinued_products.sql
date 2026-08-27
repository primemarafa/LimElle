-- Retire du catalogue les produits qui ne sont plus proposés à la vente.
-- Sécurité : order_items.product_id référence products(id) sans ON DELETE
-- CASCADE (voir 001_initial.sql). Si une commande existante référence LE-002
-- ou LE-006, cette migration échouera avec une erreur de clé étrangère au
-- lieu de supprimer silencieusement l'historique — dans ce cas, remplacer
-- le DELETE par un flag "discontinué" plutôt qu'une suppression physique.
DELETE FROM products WHERE id IN ('LE-001', 'LE-002', 'LE-003', 'LE-004', 'LE-005', 'LE-006');
