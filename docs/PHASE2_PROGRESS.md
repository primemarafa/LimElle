# Lim'Elle V2 - Phase 2 Progress

## Objectif
Refactoriser le catalogue et préparer le parcours produit sans connecter encore de backend.

## Travaux réalisés

- [x] Extraction de `WhatsAppButton`
- [x] Extraction de `ProductCard`
- [x] Extraction de `ProductGrid`
- [x] Extraction de `CategoryFilter`
- [x] Extraction de `CatalogueSection`
- [x] Extraction de `TransportEstimator`
- [x] Extraction de `FaqList`
- [x] Migration de `App.jsx` vers les composants
- [x] Prix affiché comme indicatif jusqu'à confirmation
- [x] WhatsApp centralisé
- [x] Transport centralisé à 4 000 FCFA/kg

## À faire

- [ ] Fiche produit détaillée
- [ ] Tailles et couleurs structurées
- [ ] Panier
- [ ] Résumé de commande
- [ ] Génération d'une référence de commande
- [ ] Message WhatsApp complet avec commande
- [ ] Formulaire de demande sur-mesure
- [ ] Catégories finales incluant chaussures et sacs
- [ ] Validation build
- [ ] Vérification responsive
- [ ] Pull Request vers `master`

## Règle métier
Le prix affiché sur le catalogue est indicatif. Lim'Elle confirme la disponibilité et le prix final avant paiement.

## Journal

2026-08-07
- Création de la branche `phase-2-catalogue`.
- Extraction des composants catalogue et transport.
- `App.jsx` réduit à l'orchestration des sections principales.
