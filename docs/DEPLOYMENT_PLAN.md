# Lim'Elle, plan de déploiement

## Phase A, choix de l'infrastructure

- [ ] Choisir l'hébergement frontend
- [ ] Choisir l'hébergement API
- [ ] Choisir l'hébergement PostgreSQL
- [ ] Vérifier les coûts mensuels
- [ ] Vérifier la région et la latence pour Sénégal et Niger

## Phase B, configuration production

- [ ] Définir VITE_API_BASE_URL
- [ ] Définir CORS_ORIGIN avec le domaine réel
- [ ] Générer les secrets de production
- [ ] Stocker les secrets hors du dépôt
- [ ] Configurer les migrations PostgreSQL
- [ ] Configurer les sauvegardes
- [ ] Configurer la restauration

## Phase C, mise en ligne

- [ ] Déployer PostgreSQL
- [ ] Exécuter les migrations
- [ ] Déployer l'API
- [ ] Vérifier /api/health
- [ ] Déployer le frontend
- [ ] Configurer le domaine
- [ ] Activer HTTPS

## Phase D, validation réelle

- [ ] Catalogue
- [ ] Filtres
- [ ] Panier
- [ ] Création de commande
- [ ] Persistance PostgreSQL
- [ ] Recherche de commande
- [ ] Calcul transport
- [ ] WhatsApp
- [ ] Mobile
- [ ] Desktop
- [ ] Logs sans données sensibles
- [ ] Aucun secret dans le bundle frontend

## Décision de mise en production

Le déploiement démarre après validation des cases bloquantes de `docs/PRODUCTION_READINESS.md`.
