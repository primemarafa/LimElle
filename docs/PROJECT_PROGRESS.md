# Lim'Elle, suivi global du projet

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

## Phase 6, stabilisation et finition

- [x] Modernisation des actions GitHub
- [x] Raccord frontend à l'API via src/services/api.js
- [x] Tests du client API frontend
- [x] Validation du parcours frontend vers l'API et PostgreSQL en CI
- [x] Schémas de validation Fastify
- [x] Tests des invariants de sécurité des schémas
- [x] Audit sécurité API ciblé
- [x] Régressions sécurité API
- [x] Refonte visuelle Lim'Elle selon la direction artistique validée
- [ ] Remplacement des visuels génériques par des visuels africains modernes et élégants
- [x] Validation du parcours commande frontend → API → PostgreSQL en CI
- [x] Passe sécurité finale frontend et API
- [ ] Vérification de la gestion future du champ notes côté back-office
- [ ] Audit final avant mise en production

## Identité officielle

- Nom officiel : Lim'Elle
- Direction visuelle retenue : élégante, moderne, africaine et premium
- Référence visuelle retenue : première proposition de maquette
- Marchés mis en avant : Sénégal et Niger

## Préparation production

Le checklist de référence est dans `docs/PRODUCTION_READINESS.md`.

- [x] Checklist production ajoutée
- [ ] Hébergement choisi
- [ ] Base PostgreSQL de production provisionnée
- [ ] Domaine configuré
- [ ] HTTPS actif
- [ ] Variables d'environnement production configurées
- [ ] Sauvegardes PostgreSQL configurées
- [ ] Test commande en production
- [ ] Audit final avant mise en ligne

## Historique PR important

- [x] PR #13, durcissement accès commandes et contrôles API
- [x] PR #14, fondation PostgreSQL
- [x] PR #15, service PostgreSQL et validation des migrations
- [x] PR #17, lookup token et repository PostgreSQL
- [x] PR #20, raccord frontend à l'API
- [x] PR #21, raccordements backend et tests
- [x] PR #22, corrections API et catalogue
- [x] PR #23, couverture transactionnelle PostgreSQL
- [x] PR #24, tests PostgreSQL réels
- [x] PR #25, modernisation CI Node.js
- [x] PR #26, suivi global centralisé
- [x] PR #27, tests du client API frontend
- [x] PR #28, validation du parcours frontend vers l'API et PostgreSQL
- [x] PR #29, durcissement des schémas API
- [x] PR #30, synchronisation du suivi projet
- [x] PR #31, audit sécurité API ciblé
- [x] PR #32, tests de régression sécurité API
- [x] PR #34, refonte visuelle éditoriale Lim'Elle
- [x] PR #35, passe sécurité finale frontend et API
- [ ] Prochain PR, préparation production

## Règles de suivi

Chaque étape importante est cochée après validation CI et merge.
Les éléments non terminés restent décochés.
Le prochain travail est choisi après lecture de ce fichier et vérification du code réel.
