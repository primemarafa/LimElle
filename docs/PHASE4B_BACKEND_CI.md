# Lim'Elle Phase 4B - Backend et CI

## Architecture

`server/app.js` construit l'application Fastify mais ne démarre aucun port.

`server/server.js` est le point d'entrée de production et démarre Fastify.

Les tests utilisent `app.inject()` et ferment toujours l'instance Fastify dans un bloc `finally`.

## CI

Le workflow `.github/workflows/api.yml` vérifie :

1. Installation reproductible avec `npm ci`.
2. Tests API.
3. Build frontend.
4. Timeout de sécurité de 5 minutes.

## CORS

Le backend utilise `CORS_ORIGIN` en production. En développement, la valeur par défaut est `http://localhost:5173`.

## Avant production

- Remplacer le stockage en mémoire des commandes par PostgreSQL.
- Ajouter des schémas de validation Fastify pour les payloads.
- Ajouter une politique CORS avec le domaine de production exact.
- Ajouter des protections contre les abus sur les endpoints publics.
- Ajouter des tests d'intégration avec la base de données.
- Ajouter les secrets uniquement via les variables d'environnement de l'hébergeur.
