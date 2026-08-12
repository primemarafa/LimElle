# Lim'Elle, configuration production

## Frontend

`VITE_API_BASE_URL` doit pointer vers l'URL HTTPS publique de l'API.

Exemple : `VITE_API_BASE_URL=https://api.example.com`

## API

`PORT` est fourni par l'hébergeur lorsque nécessaire.

`HOST=0.0.0.0`

`CORS_ORIGIN` doit contenir l'origine HTTPS exacte du frontend.

Exemple : `CORS_ORIGIN=https://www.example.com`

## PostgreSQL

`DATABASE_URL` doit pointer vers la base PostgreSQL de production.

`DATABASE_SSL=true` lorsque le fournisseur PostgreSQL l'exige.

## Règle

Aucun secret réel ne doit être commité dans Git.
Les valeurs de production doivent être configurées dans les variables d'environnement de l'hébergeur.
