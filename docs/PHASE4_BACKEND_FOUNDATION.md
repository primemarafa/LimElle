# Lim'Elle Phase 4A - Fondation backend

## Objectif
Préparer une API et une persistance réelles sans casser le frontend actuel.

## Architecture cible

Frontend React/Vite
→ API Lim'Elle
→ Base de données

Le frontend ne doit pas accéder directement à la base de données.

## Ressources métier

### Products
- id
- name
- description
- category
- price
- weightKg
- sizes
- colors
- availability
- stock
- imageUrl
- createdAt
- updatedAt

### Customers
- id
- fullName
- phone
- city
- deliveryMode
- deliveryAddress
- notes
- createdAt
- updatedAt

### Orders
- id
- reference
- customerId
- status
- requestType
- productTotal
- transportTotal
- total
- weightKg
- createdAt
- updatedAt

### OrderItems
- id
- orderId
- productId
- productNameSnapshot
- unitPriceSnapshot
- weightKgSnapshot
- quantity
- size
- color

## Règles

1. Le serveur devient la source de vérité pour les commandes.
2. Les prix envoyés par le navigateur sont considérés comme non fiables.
3. Le total est recalculé côté serveur.
4. La référence de commande est générée côté serveur.
5. Une commande possède un historique de statut dans une prochaine étape.
6. Aucun secret n'est placé dans le frontend.
7. Le paiement reste manuel tant que son intégration n'est pas validée.

## API prévue

GET /api/products
GET /api/products/:id
POST /api/orders
GET /api/orders/:reference

Les routes d'administration seront séparées et protégées dans une phase ultérieure.

## Décision technique Phase 4A

Le dépôt actuel est un frontend Vite/React sans serveur ni dépendance backend. Nous ajoutons d'abord les contrats et modèles avant d'imposer un framework serveur et une base de données. Cette étape limite les changements inutiles et facilite le choix d'un hébergement adapté au budget de Lim'Elle.
