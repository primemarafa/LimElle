export const CATEGORIES = [
  { id: "tenues", label: "Tenues", emoji: "👗", desc: "Robes, ensembles et tenues féminines" },
  { id: "chaussures", label: "Chaussures", emoji: "👠", desc: "Chaussures femme recherchées à Dakar" },
  { id: "sacs", label: "Sacs", emoji: "👜", desc: "Sacs et maroquinerie" },
  { id: "bijoux", label: "Bijoux", emoji: "💎", desc: "Bijoux et accessoires précieux" },
  { id: "accessoires", label: "Accessoires", emoji: "🧣", desc: "Foulards, ceintures et accessoires" },
  { id: "beaute", label: "Beauté", emoji: "💄", desc: "Soins et cosmétiques" },
  { id: "surmesure", label: "Sur demande", emoji: "✨", desc: "Une recherche précise à Dakar" },
];

export const PRODUCTS = [
  { id: "LE-001", cat: "tenues", name: "Boubou Bazin rhapsodie terracotta", description: "Boubou féminin recherché à Dakar, adapté aux occasions et cérémonies.", price: 35000, weight: 0.8, badge: "Nouveau", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=900&auto=format&fit=crop", sizes: ["M", "L", "XL"], colors: ["Terracotta", "Bordeaux", "Noir"], availability: "sur_demande", stock: 0 },
  { id: "LE-002", cat: "tenues", name: "Ensemble wax & pagne tissé main", description: "Ensemble féminin en wax et pagne tissé, selon disponibilité chez le fournisseur.", price: 30000, weight: 0.9, badge: "Sélection", img: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=900&auto=format&fit=crop", sizes: ["S", "M", "L", "XL"], colors: ["Multicolore"], availability: "sur_demande", stock: 0 },
  { id: "LE-003", cat: "sacs", name: "Sac cuir tanné & fermoir doré", description: "Sac féminin à vérifier auprès des vendeurs partenaires à Dakar.", price: 24000, weight: 1.1, badge: "Coup de cœur", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=900&auto=format&fit=crop", sizes: ["Unique"], colors: ["Camel", "Noir"], availability: "sur_demande", stock: 0 },
  { id: "LE-004", cat: "bijoux", name: "Parure Touareg argent & corail", description: "Parure inspirée de l'artisanat sahélien, disponibilité à confirmer à Dakar.", price: 17000, weight: 0.3, badge: "Sélection", img: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=900&auto=format&fit=crop", sizes: ["Unique"], colors: ["Argent"], availability: "sur_demande", stock: 0 },
  { id: "LE-005", cat: "beaute", name: "Beurre de karité & sérum éclat", description: "Produits de soin à vérifier selon la disponibilité et les conditions de transport.", price: 12000, weight: 0.4, badge: "Sélection", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop", sizes: ["Unique"], colors: ["Standard"], availability: "sur_demande", stock: 0 },
  { id: "LE-006", cat: "accessoires", name: "Foulard Fouta teinture naturelle", description: "Foulard léger sélectionné selon les pièces disponibles à Dakar.", price: 13000, weight: 0.2, badge: "Sélection", img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=900&auto=format&fit=crop", sizes: ["Unique"], colors: ["Selon disponibilité"], availability: "sur_demande", stock: 0 },
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
