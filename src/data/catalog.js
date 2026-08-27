export const CATEGORIES = [
  { id: "soins-visage", label: "Soins visage", emoji: "✨", desc: "Prenez soin de vous avec notre gamme visage" },
  { id: "soins-corps", label: "Soins corps", emoji: "🌿", desc: "Hydratez et sublimez votre peau au quotidien" },
  { id: "parfums", label: "Parfums", emoji: "🌸", desc: "Laissez votre empreinte avec nos fragrances exclusives" },
  { id: "accessoires", label: "Accessoires", emoji: "👜", desc: "L'élégance dans les moindres détails" },
];

export const FALLBACK_PRODUCTS = [
  {
    id: "le-001",
    name: "Sérum éclat naturel",
    description: "Anti-taches - 30ml",
    price: 9500,
    weight: 0.2,
    img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=700&auto=format&fit=crop",
    cat: "soins-visage",
    badge: "Bestseller",
  },
  {
    id: "le-002",
    name: "Beurre de karité pur",
    description: "Hydratation intense - 200g",
    price: 6000,
    weight: 0.3,
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=700&auto=format&fit=crop",
    cat: "soins-corps",
    badge: "Naturel",
  },
  {
    id: "le-003",
    name: "Parfum Élégance",
    description: "Eau de parfum - 50ml",
    price: 12500,
    weight: 0.35,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=700&auto=format&fit=crop",
    cat: "parfums",
    badge: "Exclusif",
  },
  {
    id: "le-004",
    name: "Savon clarifiant",
    description: "Éclat naturel - 100g",
    price: 2500,
    weight: 0.15,
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=700&auto=format&fit=crop",
    cat: "soins-visage",
    badge: "Doux",
  },
  {
    id: "le-005",
    name: "Huile précieuse",
    description: "Nourrissante - 50ml",
    price: 8500,
    weight: 0.25,
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=700&auto=format&fit=crop",
    cat: "soins-corps",
    badge: "Coup de cœur",
  },
];

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
