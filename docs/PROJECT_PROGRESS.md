# Lim'Elle V2, suivi global du projet

## Statut actuel

Phase 6 en cours.

## Phase 1, architecture et socle frontend

- [x] Configuration centralisée
- [x] Catalogue et catégories séparés
- [x] Calcul transport isolé
- [x] Calcul prix global isolé
- [x] Service WhatsApp centralisé
- [x] Modèles métier préparatoires
- [x] Nouveau point d'entrée frontend
- [x] Build validé
- [x] Responsive vérifié

## Phase 2, catalogue et composants

- [x] ProductCard
- [x] ProductGrid
- [x] CategoryFilter
- [x] CatalogueSection
- [x] TransportEstimator
- [x] FaqList
- [x] WhatsAppButton
- [x] App.jsx refactorisé
- [x] Parcours catalogue validé

## Phase 3, commande et API

- [x] API Fastify
- [x] Validation manuelle des commandes
- [x] Calcul serveur des totaux
- [x] Création de commande
- [x] Recherche de commande
- [x] Tests API
- [x] Rate limiting
- [x] Limitation des quantités
- [x] Limitation du champ notes

## Phase 4, sécurité et industrialisation

- [x] Correction IDOR sur les références prévisibles
- [x] Lookup token aléatoire
- [x] Protection contre le spam API
- [x] Docker
- [x] GitHub Actions
- [x] Build CI
- [x] Tests API CI
- [x] Tests Docker CI
- [x] Images orientées Sénégal et Niger

## Phase 5, PostgreSQL

- [x] Service PostgreSQL en CI
- [x] Migrations versionnées
- [x] Extension pgcrypto
- [x] Token de lookup généré côté PostgreSQL
- [x] Repository PostgreSQL
- [x] Transactions BEGIN, COMMIT et ROLLBACK
- [x] Injection du repository dans l'API
- [x] Persistance client, commande et articles
- [x] Tests transactionnels
- [x] Tests PostgreSQL réels dans CI
- [x] Nettoyage des données de test

## Phase 6, stabilisation

- [x] Modernisation des actions GitHub
- [ ] Raccord complet du frontend à l'API
- [ ] Tests frontend avec API réelle
- [ ] Validation finale du parcours commande
- [ ] Validation sécurité frontend et API
- [ ] Schémas de validation API
- [ ] Audit final avant mise en production

## Points encore ouverts

- [ ] OrderForm.jsx doit utiliser src/services/api.js
- [ ] Le frontend doit envoyer les commandes à PostgreSQL via l'API
- [ ] Ajouter des schémas Fastify ou Zod
- [ ] Vérifier la gestion future du champ notes côté back-office
- [ ] Faire une passe sécurité finale

## Historique PR important

- [x] PR #13, durcissement accès commandes et contrôles API
- [x] PR #14, fondation PostgreSQL
- [x] PR #15, service PostgreSQL et validation des migrations
- [x] PR #17, lookup token et repository PostgreSQL
- [x] PR #21, raccordements backend et tests
- [x] PR #22, corrections API et catalogue
- [x] PR #23, couverture transactionnelle PostgreSQL
- [x] PR #24, tests PostgreSQL réels
- [x] PR #25, modernisation CI Node.js

## Règles de suivi

Chaque étape importante doit être cochée ici après validation CI et merge.
Les éléments non terminés restent décochés.
Le frontend ne sera considéré raccordé qu'après un test réel de création de commande via l'API.
