# Lim'Elle Phase 3 - Commandes

## Objectif
Préparer un parcours de commande fiable avant l'ajout d'un backend et d'un paiement automatisé.

## Modèles

### Product
- Référence
- Nom
- Description
- Catégorie
- Prix indicatif
- Poids
- Tailles
- Couleurs
- Disponibilité
- Stock
- Badge
- Image

### Customer
- Nom complet
- Téléphone
- Ville
- Mode de livraison
- Adresse si livraison à domicile
- Notes

### Order
- Référence
- Statut
- Type de demande
- Cliente
- Articles
- Totaux
- Date de création

## Statuts

EN_ATTENTE → CONFIRMÉE → PAYÉE → EN_PRÉPARATION → EXPÉDIÉE → EN_TRANSIT → ARRIVÉE → LIVRÉE

ANNULÉE peut intervenir avant la livraison selon les règles commerciales.

## Prochaine implémentation

- Formulaire cliente
- Choix point de retrait / domicile
- Validation des champs
- Résumé de commande
- Génération de référence
- Génération du message WhatsApp
- Conservation locale temporaire des commandes
- Préparation de l'interface pour une future API

## Règle métier
Aucun paiement automatisé en Phase 3. Le prix final est confirmé par Lim'Elle avant paiement.
