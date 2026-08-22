export const CATEGORIES = [
  { id: "vetements", label: "Vêtements", emoji: "👗", desc: "Tenues féminines, ensembles et pièces de cérémonie" },
  { id: "tissus", label: "Tissus", emoji: "🧵", desc: "Wax, bazin et tissus choisis pour tes tenues" },
  { id: "leche", label: "Lèche", emoji: "✨", desc: "Voiles légers et brodés pour boubous et cérémonies" },
  { id: "bijoux", label: "Bijoux", emoji: "💎", desc: "Colliers, bracelets, bagues et boucles d'oreilles" },
  { id: "chaussures", label: "Chaussures", emoji: "👠", desc: "Sandales et chaussures pour tes sorties et cérémonies" },
  { id: "sacs-a-main", label: "Sacs à main", emoji: "👜", desc: "Sacs, pochettes et modèles de cérémonie" },
];

export const FALLBACK_PRODUCTS = [
  {
    id: "le-001",
    name: "Wax imprimé",
    description: "Tissu imprimé · 6 yards",
    price: 18000,
    weight: 0.8,
    img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop",
    cat: "tissus",
    badge: "Sélection",
  },
  {
    id: "le-002",
    name: "Lèche brodé",
    description: "Voile brodé · cérémonie",
    price: 35000,
    weight: 0.6,
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop",
    cat: "leche",
    badge: "Cérémonie",
  },
  {
    id: "le-003",
    name: "Parure dorée",
    description: "Collier et boucles d'oreilles",
    price: 15000,
    weight: 0.15,
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
    cat: "bijoux",
    badge: "Sélection",
  },
  {
    id: "le-004",
    name: "Sandales habillées",
    description: "Chaussures femme · cérémonie",
    price: 28000,
    weight: 1.1,
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop",
    cat: "chaussures",
    badge: "Sélection",
  },
  {
    id: "le-005",
    name: "Sac à main cérémonie",
    description: "Pochette élégante · soirée",
    price: 22000,
    weight: 0.5,
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
    cat: "sacs-a-main",
    badge: "Cérémonie",
  },
  {
    id: "le-006",
    name: "Ensemble deux pièces",
    description: "Tenue féminine · cérémonie",
    price: 45000,
    weight: 1.2,
    img: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop",
    cat: "vetements",
    badge: "Sélection",
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
