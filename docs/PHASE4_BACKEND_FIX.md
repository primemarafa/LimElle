# Phase 4 backend fix

Cette correction complète la fondation backend de la Phase 4.

## Corrections

- Ajout de `POST /api/orders`.
- Ajout de `GET /api/orders/:reference`.
- Validation serveur des commandes.
- Vérification des produits côté serveur.
- Recalcul serveur du prix, du poids, du transport et du total.
- Génération serveur des références de commande.
- Stockage temporaire des commandes en mémoire.
- Gestion CORS et pré-vol `OPTIONS` pour les appels navigateur.
- Tests automatisés des routes principales.
- Exécution des tests backend dans GitHub Actions avant le build frontend.

Le stockage en mémoire reste volontairement temporaire. Une base de données sera ajoutée dans une phase dédiée.
