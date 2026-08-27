import { Shirt, Footprints, Sparkles, ShoppingBag } from "lucide-react";

export const CATEGORIES = [
  { id: "all", name: "Tous les articles", label: "Tous" },
  { id: "pagnes-leche", name: "Pagnes & Lèche", label: "Pagnes & Lèche", icon: Shirt },
  { id: "chaussures", name: "Chaussures", label: "Chaussures", icon: Footprints },
  { id: "bijoux", name: "Bijoux", label: "Bijoux", icon: Sparkles },
  { id: "sacs", name: "Sacs", label: "Sacs", icon: ShoppingBag },
];

export const CATEGORY_VISUALS = {
  "pagnes-leche": {
    id: "pagnes-leche",
    title: "Pagnes & Lèche",
    subtitle: "Bazin Riche, Getzner & Tissages Nobles",
    image: "/images/category-pagnes-leche.jpg",
    icon: Shirt,
  },
  "chaussures": {
    id: "chaussures",
    title: "Chaussures",
    subtitle: "Mules en cuir, Sandales & Talons d'Exception",
    image: "/images/category-chaussures.jpg",
    icon: Footprints,
  },
  "bijoux": {
    id: "bijoux",
    title: "Bijoux",
    subtitle: "Filigranes dorés & Parures Sahéliennes",
    image: "/images/category-bijoux.jpg",
    icon: Sparkles,
  },
  "sacs": {
    id: "sacs",
    title: "Sacs",
    subtitle: "Maroquinerie & Cabas d'Ateliers",
    image: "/images/category-sacs.jpg",
    icon: ShoppingBag,
  },
};

export const INITIAL_CATALOG = [
  {
    id: "bazin-riche-royal",
    name: "Bazin Riche Royal Brodé Or",
    description: "Bazin Getzner 100% coton de premier choix avec broderies traditionnelles en fil d'or - 5 mètres.",
    price: 35000,
    weight: 0.8,
    category: "pagnes-leche",
    cat: "pagnes-leche",
    badge: "Bestseller",
    img: "/images/product-bazin-riche.jpg",
    sizes: ["5 mètres", "3 mètres", "Complet 7 mètres"],
    colors: ["Bleu Roi & Or", "Vert Émeraude", "Blanc Pur"],
  },
  {
    id: "leche-traditionnel-sahel",
    name: "Lèche Sahélien Tissé Main",
    description: "Pagne traditionnel sahélien en coton lourd tissé artisanalement avec motifs géométriques indigo et ocre.",
    price: 28000,
    weight: 0.9,
    category: "pagnes-leche",
    cat: "pagnes-leche",
    badge: "Authentique",
    img: "/images/product-leche-sahelien.jpg",
    sizes: ["Standard 2m x 1.2m", "Grand Format 3m"],
    colors: ["Indigo & Ocre", "Noir & Terracotta"],
  },
  {
    id: "mules-cuir-cauris",
    name: "Mules Cuir & Cauris Dakar",
    description: "Mules d'atelier en cuir véritable grainé, finitions laiton doré et incrustations de cauris nobles faits main.",
    price: 24000,
    weight: 0.6,
    category: "chaussures",
    cat: "chaussures",
    badge: "Coup de Cœur",
    img: "/images/product-mules-cuir.jpg",
    sizes: ["37", "38", "39", "40", "41"],
    colors: ["Havane & Laiton", "Noir Ébène"],
  },
  {
    id: "sandales-dorees-tressees",
    name: "Sandales Dorées Tressées",
    description: "Sandales plates en cuir métallisé or avec tressage artisanal dakarois, légères et élégantes pour cérémonies.",
    price: 19500,
    weight: 0.4,
    category: "chaussures",
    cat: "chaussures",
    badge: "Nouveau",
    img: "/images/product-sandales-dorees.jpg",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Or Satiné", "Bronze"],
  },
  {
    id: "parure-collier-filigrane",
    name: "Collier Plastron Filigrane & Boucles",
    description: "Parure d'exception dorée à l'or fin avec pendentifs cabochons et travail minutieux de filigrane dakarois.",
    price: 45000,
    weight: 0.3,
    category: "bijoux",
    cat: "bijoux",
    badge: "Exclusif",
    img: "/images/product-collier-filigrane.jpg",
    sizes: ["Taille Unique Ajustable"],
    colors: ["Doré Solaire", "Or Antique"],
  },
  {
    id: "sac-cabas-cuir-sahel",
    name: "Cabas Cuir & Bande Tissée",
    description: "Sac à main structuré en cuir pleine fleur camel avec bande centrale tissée main et finitions dorées luxueuses.",
    price: 38000,
    weight: 0.7,
    category: "sacs",
    cat: "sacs",
    badge: "Bestseller",
    img: "/images/product-sac-cuir.jpg",
    sizes: ["Format Moyen 32cm", "Grand Cabas 40cm"],
    colors: ["Camel & Indigo", "Noir & Ocre"],
  },
];

export const FALLBACK_PRODUCTS = INITIAL_CATALOG;

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
