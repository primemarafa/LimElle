# Lim'Elle, audit de préparation production

Statut : audit en cours

## Fonctionnel

- [x] Catalogue
- [x] Filtres et catégories
- [x] Estimation transport
- [x] Création de commande
- [x] Recherche de commande par lookup token
- [x] Calcul serveur des totaux
- [x] Persistance PostgreSQL
- [x] Génération de facture
- [x] Partage de facture WhatsApp
- [x] Partage de facture par email

## Sécurité

- [x] Lookup token non prévisible
- [x] Validation des entrées API
- [x] Limitation des quantités
- [x] Limitation du champ notes
- [x] Rate limiting
- [x] Contrôles IDOR
- [ ] Vérifier CORS avec origine de production
- [ ] Vérifier headers HTTP de production
- [ ] Vérifier absence de secrets dans le dépôt
- [ ] Vérifier absence de données sensibles dans les logs

## Frontend

- [x] Client API centralisé
- [x] Tests client API
- [x] Parcours commande testé avec API et PostgreSQL
- [ ] Vérifier toutes les pages sur desktop
- [ ] Vérifier toutes les pages sur mobile
- [ ] Vérifier images et formats responsives
- [ ] Vérifier performance des images
- [ ] Remplacer les visuels génériques par les visuels conformes à la direction artistique

## CI et build

- [x] Build CI
- [x] Tests API CI
- [x] Tests PostgreSQL CI
- [x] Tests Docker CI
- [x] Actions GitHub modernisées
- [x] Nettoyage du code et réduction du bundle CSS (-30%)
- [ ] Vérifier le dernier run complet sur master
- [ ] Vérifier la version Node de production

## Production

- [ ] Hébergement frontend choisi
- [ ] Hébergement API choisi
- [ ] PostgreSQL production choisi
- [ ] Variables production configurées
- [ ] CORS production configuré
- [ ] HTTPS configuré
- [ ] Domaine configuré
- [ ] Sauvegardes PostgreSQL configurées
- [ ] Test réel de création de commande
- [ ] Test réel de recherche de commande
- [ ] Test réel de facture
- [ ] Test réel WhatsApp
- [ ] Test réel email

## Règle de validation

Aucune mise en production avant validation de toutes les cases de sécurité, du build, du parcours commande et de la configuration production.
