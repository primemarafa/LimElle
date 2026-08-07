# Lim'Elle V2 - Phase 1 Progress

## Completed

- [x] Branch `phase-1-architecture` created from `master`.
- [x] Central configuration added in `src/config/limelle.js`.
- [x] Niger WhatsApp number centralized: `22799205739`.
- [x] Initial transport configuration centralized: 4 000 FCFA/kg, minimum 1 kg.
- [x] Catalog data separated into `src/data/catalog.js`.
- [x] Business calculation utilities added in `src/utils/limelle.js`.
- [x] WhatsApp service layer added in `src/services/whatsapp.js`.
- [x] Order, payment and role models added in `src/types/models.js`.
- [x] `src/App.jsx` added as the future application entry point.

## Important migration rule

The current `LimElleSite.jsx` remains untouched during this first extraction step. This protects the existing prototype while the new architecture is introduced incrementally.

## Known prototype inconsistencies to correct during the next step

- WhatsApp number is still hard-coded in the legacy component.
- The legacy transport calculator still uses 3 500 FCFA/kg.
- Some legacy text promises a 5 to 9 day delivery window.
- The legacy UI exposes article prices separately from the future global Lim'Elle price.
- Social links are placeholders.
- The legacy component still contains catalog data and UI logic together.

## Next work

1. Migrate the legacy component to use the centralized configuration.
2. Replace legacy catalog constants with imports from `src/data/catalog.js`.
3. Replace the 3 500 FCFA/kg calculator with the configurable transport utility.
4. Move reusable UI blocks into `src/components/`.
5. Add a basic validation/build workflow once the project tooling is identified.
6. Review the resulting UI against the Phase 0 commercial rules.
