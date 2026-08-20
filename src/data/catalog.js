export const CATEGORIES = [
  { id: "soins-visage", label: "Soins visage", emoji: "✨", desc: "Sérums, crèmes, nettoyants pour un éclat naturel" },
  { id: "soins-corps", label: "Soins corps", emoji: "🧴", desc: "Beurres, huiles, lotions pour une peau nourrie" },
  { id: "parfums", label: "Parfums", emoji: "🌸", desc: "Eaux de toilette et parfums d'exception" },
  { id: "accessoires", label: "Accessoires", emoji: "💍", desc: "Sacs, bijoux, accessoires tendance" },
];

// Le catalogue affiché sur le site vient de l'API (voir src/services/api.js,
// api.products()), pas de ce fichier. PRODUCTS a été retiré : il n'était
// plus utilisé nulle part et risquait de désynchroniser avec le vrai
// catalogue en base (voir server/db/migrations/003_catalog_images.sql).

export const STEPS = [
  { key: "browse", num: "ÉTAPE 1", title: "Parcourez", text: "Choisis tes articles ou envoie une recherche précise." },
  { key: "confirm", num: "ÉTAPE 2", title: "On confirme", text: "Lim'Elle vérifie la disponibilité et le prix global." },
  { key: "pay", num: "ÉTAPE 3", title: "Tu paies", text: "Le paiement intervient après confirmation du prix final." },
  { key: "receive", num: "ÉTAPE 4", title: "Tu reçois", text: "Ton colis part de Dakar et rejoint Niamey." },
];

export const FAQS = [
  { q: "Comment est calculé le transport ?", a: "Le transport est estimé selon le poids. La base actuelle de travail est de 4 000 FCFA par kg avec un minimum de 1 kg. Le montant final est confirmé avant paiement." },
  { q: "Quel est le délai de livraison ?", a: "Le délai dépend du GP ou du particulier qui transporte le colis. Lim'Elle communique le délai disponible avant confirmation." },
  { q: "Puis-je grouper plusieurs articles ?", a: "Oui. Les articles sont regroupés dans un même colis lorsque l'organisation de l'expédition le permet." },
  { q: "Quand dois-je payer ?", a: "Après vérification de la disponibilité et confirmation du prix global par Lim'Elle." },
  { q: "Puis-je demander un produit qui n'est pas dans le catalogue ?", a: "Oui. Envoie une photo ou une description avec ta taille, ta couleur et ton budget. Lim'Elle recherche le produit à Dakar." },
];
