# 🌸 Lim'Elle — E-commerce & Personal Shopping (Dakar → Niamey)

**Lim'Elle** est une application web développée avec React (frontend) et Fastify (API), qui met en avant un catalogue de mode, d'accessoires et de produits de beauté sélectionnés à Dakar (Sénégal) et livrés au Niger (Niamey).

Le prix affiché sur le catalogue est **indicatif** : Lim'Elle confirme la disponibilité et le prix global (produit + transport) avant tout paiement, qui reste manuel.

---

## 🚀 Fonctionnalités principales

- **Catalogue dynamique & filtres** : tenues, chaussures, sacs, bijoux, accessoires, beauté et demandes sur-mesure, avec filtrage instantané par catégorie.
- **Fiche produit détaillée** : tailles, couleurs, description et ajout au panier.
- **Panier & commande** : panier persistant en session, formulaire client (nom, téléphone, ville, mode de réception), résumé de commande avec référence générée.
- **Simulateur de frais d'envoi** : calcul du transport en FCFA à partir du poids (kg), configurable.
- **Commandes via WhatsApp** : génération de messages pré-remplis (contact général, commande, demande sur-mesure).
- **Module Sur-mesure** : prise de contact directe pour une recherche précise à Dakar.
- **Design soigné & responsive** : transitions fluides, animations, cartes interactives.

---

## 🏗️ Architecture

Le projet est organisé en deux parties : un frontend React/Vite et une API Fastify, développées par phases documentées dans `docs/`.

```
LimElle/
├── src/                    # Frontend React (Vite)
│   ├── components/         # Composants UI (catalogue, panier, commande, FAQ...)
│   ├── config/              # Configuration centralisée (limelle.js)
│   ├── data/                 # Catalogue produits, catégories, FAQ
│   ├── services/             # Appels API (api.js) et WhatsApp (whatsapp.js)
│   ├── types/                 # Modèles métier (Product, Customer, Order)
│   ├── utils/                  # Calculs (transport, prix)
│   └── App.jsx
├── server/                  # API backend (Fastify)
│   ├── app.js               # Point d'entrée du serveur
│   ├── routes.js             # Déclaration des routes /api/*
│   └── data/products.js       # Source de données produits côté serveur
├── docs/                     # Journal de bord et plans par phase (Phase 1 à 4A)
├── LimElleSite.jsx           # Ancien prototype monofichier, conservé en sauvegarde
└── vite.config.js
```

### Frontend (`src/`)

- **React** (Hooks, state management, composants réutilisables)
- **Tailwind CSS** pour le style
- **Lucide React** pour l'iconographie
- **Google Fonts** (Fraunces & Manrope)

### Backend (`server/`)

- **Fastify** comme framework API
- Endpoints actuellement disponibles :
  - `GET /api/health` — état de l'API
  - `GET /api/products` — liste des produits
  - `GET /api/products/:id` — détail d'un produit

> ⚠️ Le contrat d'API complet (voir `docs/PHASE4A_API_CONTRACT.md`) prévoit également `POST /api/orders` et `GET /api/orders/:reference`, avec recalcul serveur des prix et du transport. Ces routes sont en cours d'implémentation ; le frontend gère pour l'instant la création de commande côté client via `src/types/order.js`.

---

## ⚙️ Configuration & Personnalisation

La configuration du frontend est centralisée dans `src/config/limelle.js` :

```javascript
export const LIMELLE_CONFIG = {
  brand: "Lim'Elle",
  whatsappNumber: "22799205739",
  currency: "XOF",
  country: "NE",
  origin: "Dakar",
  destination: "Niamey",
  transport: {
    ratePerKg: 4000,
    minimumWeightKg: 1,
    mode: "GP / particulier",
    trackingEnabled: false,
    homeDeliveryEnabled: false,
  },
  social: {
    instagramUrl: "",
    instagramHandle: "@limelle",
    facebookUrl: "",
  },
};
```

Les messages WhatsApp pré-remplis (contact général, commande, demande sur-mesure) sont définis juste en dessous, dans `WA_MESSAGES`.

---

## 🧩 Modèles métier

- **Product** : référence, nom, description, catégorie, prix indicatif, poids, tailles, couleurs, disponibilité, stock, badge, image.
- **Customer** : nom complet, téléphone, ville, mode de livraison (point de retrait ou domicile), adresse, notes.
- **Order** : référence, statut, type de demande, client, articles, totaux, date de création.

### Cycle de statut d'une commande

```
EN_ATTENTE → CONFIRMÉE → PAYÉE → EN_PRÉPARATION → EXPÉDIÉE → EN_TRANSIT → ARRIVÉE → LIVRÉE
```

`ANNULÉE` peut intervenir à tout moment avant la livraison, selon les règles commerciales.

---

## 🚦 Démarrer le projet

### Frontend

```bash
npm install
npm run dev       # démarre Vite en local
npm run build     # build de production
npm run preview   # prévisualise le build
```

### Backend (API)

```bash
cd server
node app.js       # démarre l'API Fastify (port 3001 par défaut, PORT modifiable)
```

Le frontend peut être connecté à l'API via la variable d'environnement `VITE_API_BASE_URL` (voir `src/services/api.js`).

---

## 📌 Règles métier

- Le personal shopping est l'activité initiale du service.
- Vêtements et chaussures sont prioritaires.
- Le Niger (Niamey) est le seul marché desservi au lancement.
- Le retrait à Niamey est le mode de réception initial ; la livraison à domicile est prévue mais désactivée par défaut.
- Le paiement intervient uniquement après confirmation du prix final par Lim'Elle.
- Le prix global affiché au client inclut le transport, mais reste indicatif jusqu'à confirmation.
- Aucun secret métier (coûts internes, marge) n'est exposé côté frontend.

---

## 🗺️ Suivi du développement

L'avancement détaillé par phase est documenté dans `docs/` :

- `PHASE1_PROGRESS.md` — architecture initiale, configuration centralisée
- `PHASE2_PROGRESS.md` — refactorisation du catalogue en composants
- `PHASE3_PLAN.md` — modèles métier, panier, commandes
- `PHASE4A_API_CONTRACT.md` — contrat d'API frontend ↔ backend
- `PHASE4_BACKEND_FOUNDATION.md` — fondation du serveur Fastify

---

## 📄 Ancien prototype

`LimElleSite.jsx`, à la racine du dépôt, est l'ancien prototype monofichier conservé comme sauvegarde. Il n'est **plus utilisé** par l'application (`src/App.jsx` est le point d'entrée actuel) et ne doit pas servir de source de vérité pour la configuration ou les données.
