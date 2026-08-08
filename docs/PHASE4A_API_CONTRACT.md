# Lim'Elle Phase 4A - Contrat API

## Objectif
Définir un contrat stable entre le frontend et le futur serveur avant d'ajouter une base de données.

## Endpoints prévus

### GET /api/health
Retourne l'état de l'API.

### GET /api/products
Retourne les produits disponibles dans le catalogue.

### GET /api/products/:id
Retourne un produit précis.

### POST /api/orders
Crée une demande de commande après validation serveur.

### GET /api/orders/:reference
Retourne une commande par référence.

## Création de commande

Le serveur reçoit :
- customer
- items
- deliveryMode
- deliveryAddress si nécessaire
- notes

Le serveur recalcule :
- prix des produits
- poids
- transport
- total

Le navigateur ne définit jamais le montant officiel d'une commande.

## Réponse POST /api/orders

```json
{
  "reference": "LE-2026-000001",
  "status": "EN_ATTENTE",
  "totals": {
    "productTotal": 35000,
    "transport": 4000,
    "total": 39000
  }
}
```

## Règles

- Les commandes sont créées en `EN_ATTENTE`.
- Le paiement reste manuel.
- Aucun secret métier n'est envoyé au navigateur.
- Les données reçues sont validées côté serveur.
- Les statuts sont contrôlés par le serveur.
- Les références sont générées côté serveur.
