# 🌸 Lim'Elle

Lim'Elle est une application web de personal shopping entre Dakar et Niamey. Le frontend utilise React/Vite. L'API utilise Fastify et PostgreSQL.

Le prix affiché reste indicatif. Lim'Elle confirme la disponibilité et le prix final avant paiement.

## Fonctionnalités

- Catalogue avec filtres par catégorie
- Recherche produit
- Fiche produit avec variantes
- Panier persistant côté navigateur
- Formulaire de commande
- Calcul indicatif du transport
- Recalcul serveur des produits, du poids et du total
- Référence de commande et token de consultation sécurisé
- Génération d'une facture HTML
- Contact WhatsApp
- Module de demande sur-mesure
- Interface responsive

## Architecture

```text
LimElle/
├── src/
│   ├── components/       # Interface React
│   ├── config/            # Configuration Lim'Elle
│   ├── data/              # Catalogue et données frontend de secours
│   ├── services/          # Client API et WhatsApp
│   ├── types/             # Modèles métier
│   └── utils/             # Calculs et normalisation
├── server/
│   ├── app.js             # Construction de l'application Fastify
│   ├── server.js          # Démarrage du serveur
│   ├── routes.js          # Routes API
│   ├── schemas.js         # Validation des payloads
│   ├── repositories/      # Accès PostgreSQL
│   └── db/                # Connexion et migrations PostgreSQL
├── docs/                  # Documentation des phases et audits
├── LimElleSite.jsx        # Ancien prototype conservé comme sauvegarde
└── vite.config.js
```

## API

- `GET /api/health` vérifie l'état de l'API
- `GET /api/health/db` vérifie la connexion PostgreSQL
- `GET /api/products` retourne le catalogue
- `GET /api/products/:id` retourne un produit
- `POST /api/orders` crée une commande après validation serveur
- `GET /api/orders/:lookupToken` récupère une commande avec son token privé
- `GET /api/orders/:lookupToken/invoice` retourne la facture HTML

Les prix envoyés par le navigateur ne servent pas de source de vérité. Le serveur recharge les produits et recalcule les montants.

## Configuration

La configuration frontend se trouve dans `src/config/limelle.js`.

Valeurs actuelles :

- Devise : XOF
- Origine : Dakar
- Destination : Niamey
- Transport : 4 000 FCFA par kg arrondi au kg supérieur
- Retrait à Niamey : actif
- Livraison à domicile : désactivée
- Suivi transport : désactivé
- Paiement : après confirmation du prix final

Le frontend utilise `VITE_API_BASE_URL` lorsque cette variable est définie. L'API utilise `PORT`, `HOST`, `DATABASE_URL`, `DATABASE_SSL` et `CORS_ORIGIN` selon l'environnement.

## Installation

```bash
npm install
npm run dev
```

Pour lancer l'API :

```bash
npm run dev:api
```

Pour préparer la base :

```bash
npm run db:migrate
```

## Tests et build

```bash
npm run test:server
npm run test:frontend-api
npm run test:frontend-integration
npm run build
```

Le workflow GitHub Actions exécute les migrations PostgreSQL, les tests API, les tests du client frontend, le parcours de commande réel et le build frontend.

## Règles métier

- Le personal shopping est le service initial.
- Les vêtements et chaussures sont prioritaires.
- Le marché initial est Niamey.
- Le retrait à Niamey est le mode de réception actif.
- La livraison à domicile reste désactivée tant que la configuration ne l'active pas.
- Le paiement intervient après confirmation du prix final.
- Aucun coût interne ni aucune marge n'est exposé au frontend.

## Historique du projet

Les décisions et travaux par phase sont documentés dans `docs/`.

`LimElleSite.jsx` est un ancien prototype. Il n'est pas utilisé par l'application actuelle. La source de vérité est `src/` et le backend `server/`.
