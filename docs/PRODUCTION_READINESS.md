# Lim'Elle, checklist de préparation production

Ce document sert de garde-fou avant la mise en ligne.

## 1. Code et build

- [x] Build frontend validé par CI
- [x] Tests API validés par CI
- [x] Tests PostgreSQL réels validés par CI
- [x] Tests Docker validés par CI
- [x] Client frontend raccordé à l'API
- [ ] Dernier build de production validé sur une branche finale

## 2. Sécurité

- [x] Rate limiting API
- [x] Validation des payloads
- [x] Schémas Fastify
- [x] Protection du lookup des commandes par token aléatoire
- [x] Audit sécurité API
- [x] Audit sécurité frontend
- [ ] Vérification finale des secrets et variables d'environnement
- [ ] Vérification CORS avec le domaine de production
- [ ] Vérification des headers HTTP de production
- [ ] Vérification des logs sans données sensibles

## 3. Base PostgreSQL

- [x] Migrations versionnées
- [x] Transactions
- [x] Repository PostgreSQL
- [x] Tests d'intégration PostgreSQL
- [ ] Base PostgreSQL de production provisionnée
- [ ] Identifiants de production stockés hors dépôt
- [ ] Sauvegardes configurées
- [ ] Procédure de restauration vérifiée

## 4. Frontend

- [x] Identité officielle Lim'Elle
- [x] Direction visuelle africaine, moderne et premium
- [ ] Visuels définitifs validés
- [ ] Vérification desktop
- [ ] Vérification mobile
- [ ] Vérification des performances des images
- [ ] Vérification des liens sociaux et WhatsApp réels

## 5. Déploiement

- [ ] Hébergement frontend choisi
- [ ] Hébergement API choisi
- [ ] Base PostgreSQL raccordée
- [ ] Domaine configuré
- [ ] HTTPS actif
- [ ] Variables d'environnement configurées
- [ ] Healthcheck API accessible
- [ ] Test commande sur environnement de production
- [ ] Monitoring et logs vérifiés

## 6. Validation finale

- [ ] Catalogue consultable
- [ ] Filtres fonctionnels
- [ ] Panier fonctionnel
- [ ] Commande reçue par l'API
- [ ] Commande persistée dans PostgreSQL
- [ ] Recherche de commande fonctionnelle
- [ ] Transport calculé correctement
- [ ] WhatsApp fonctionnel
- [ ] Aucun secret exposé dans le bundle frontend
- [ ] Aucun échec CI

## Règle de mise en ligne

Lim'Elle ne doit être déclaré prêt pour la production qu'après validation de toutes les cases bloquantes des sections 1 à 6.
