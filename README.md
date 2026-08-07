# 🌸 Lim'Elle — E-commerce & Service de personal shopping (Dakar → Niger)

**Lim'Elle** est une application web moderne développée en React. Elle met en avant un catalogue de mode, d'accessoires et de produits de beauté sélectionnés à Dakar (Sénégal) et livrés directement au Niger par fret aérien.

---

## 🚀 Fonctionnalités principales

- **Catalogue dynamique & Filtres** : Parcourez les tenues, accessoires et produits de beauté avec un filtrage instantané.
- **Commandes fluides via WhatsApp** : Génération automatique de messages pré-remplis sur WhatsApp pour valider les commandes et la disponibilité.
- **Simulateur de frais d'envoi** : Calculateur interactif du coût de transport en FCFA basé sur le poids (kg) du colis.
- **Module Sur-mesure** : Prise de contact directe pour les demandes personnalisées.
- **Design Soigné & Responsive** : Transitions fluides, animations "magnetic", cartes interactives et optimisation mobile native.

---

## 🛠️ Technologies utilisées

- **React** (Hooks, State Management, Custom Hooks)
- **Tailwind CSS** (Styling et layout réactif)
- **Lucide React** (Iconographie)
- **Google Fonts** (Fraunces & Manrope)

---

## ⚙️ Configuration & Personnalisation

Tous les liens de contact et réseaux sociaux sont centralisés dans la constante `SOCIAL` au début du fichier `LimElleSite.jsx` :

```javascript
const SOCIAL = {
  instagramUrl: "[https://instagram.com/TON_COMPTE](https://instagram.com/TON_COMPTE)",
  instagramHandle: "@limelle",
  facebookUrl: "[https://facebook.com/TA_PAGE](https://facebook.com/TA_PAGE)",
  whatsappNumber: "22700000000", // Format international sans le '+'
};
