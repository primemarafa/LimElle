# Lim'Elle V2 - Phase 1 Progress

## Statut
Phase 1 : en cours.

## Réalisé

- [x] Branche `phase-1-architecture` créée depuis `master`.
- [x] Configuration centralisée dans `src/config/limelle.js`.
- [x] WhatsApp Niger centralisé : `22799205739`.
- [x] Transport de référence centralisé : 4 000 FCFA/kg.
- [x] Poids minimum centralisé : 1 kg.
- [x] Catalogue et catégories séparés dans `src/data/catalog.js`.
- [x] Calcul du transport isolé dans `src/utils/limelle.js`.
- [x] Calcul du prix global isolé dans `src/utils/limelle.js`.
- [x] Service WhatsApp ajouté dans `src/services/whatsapp.js`.
- [x] Modèles métier préparatoires ajoutés dans `src/types/models.js` (supprimé lors du nettoyage — doublon avec `order.js`).
- [x] `src/App.jsx` utilise maintenant la configuration, le catalogue et les utilitaires de Phase 1.
- [x] Le nouveau frontend utilise le numéro WhatsApp validé.
- [x] Le nouveau frontend affiche un prix global indicatif incluant le transport de référence.
- [x] Le parcours personal shopping et la demande sur-mesure sont intégrés au nouveau point d'entrée.

## Ancien prototype

`LimElleSite.jsx` reste conservé à la racine comme sauvegarde du prototype initial.

Il n'est plus utilisé par `src/App.jsx`.

Il contient encore les anciennes valeurs et ne doit plus servir de source de vérité.

## Points à vérifier

- [ ] Identifier et valider le système de build du dépôt.
- [ ] Vérifier les dépendances React, lucide-react et Tailwind.
- [ ] Lancer le build local.
- [ ] Vérifier les liens WhatsApp.
- [ ] Vérifier les calculs de transport.
- [ ] Vérifier le rendu mobile.
- [ ] Vérifier les erreurs console.
- [ ] Déplacer les blocs UI réutilisables dans `src/components/`.
- [ ] Préparer les pages dédiées.

## Règles métier respectées

- Personal shopping comme activité initiale.
- Vêtements et chaussures prioritaires.
- Niger uniquement au lancement.
- Point de retrait à Niamey comme mode initial.
- Paiement après confirmation.
- Prix global côté cliente.
- Coûts internes et marge réservés à l'administration future.
- 4 000 FCFA/kg comme hypothèse de transport configurable.
- Pas de tracking GP complexe au lancement.

## Journal

2026-08-07
- Accès GitHub en écriture rétabli.
- Branche `phase-1-architecture` opérationnelle.
- Entrée frontend migrée vers les modules Phase 1.
- Ancien prototype conservé pour retour arrière.
