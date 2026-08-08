# Lim'Elle database

Cette phase prépare PostgreSQL sans connecter encore l'API à la base.

## Tables

- `products` : catalogue Lim'Elle.
- `customers` : clientes.
- `orders` : commandes et statut.
- `order_items` : contenu figé de chaque commande.

## Principes

Les prix et poids sont enregistrés dans `order_items` au moment de la commande. Une modification ultérieure du catalogue ne modifie donc pas l'historique d'une commande.

Les montants monétaires sont stockés en FCFA entiers. Aucun calcul financier ne repose sur des flottants.

## Statuts

La valeur initiale est `EN_ATTENTE`. Les statuts métier définitifs seront centralisés dans le code avant la connexion à PostgreSQL.

## Livraison

Le schéma prévoit `point_retrait` et `domicile`. Les règles de tarif et les conditions de livraison seront centralisées dans le service métier, pas dans le SQL.

## Prochaine étape

Ajouter le client PostgreSQL, les migrations et les tests d'intégration. Les secrets de connexion seront fournis par les variables d'environnement du déploiement.
