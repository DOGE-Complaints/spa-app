# SPA-ID-11-T03 — phone.format.* i18n dictionary

**Story:** [`../STORY-SPA-ID-11-per-country-phone-format-validation.md`](../STORY-SPA-ID-11-per-country-phone-format-validation.md)  
**Decision Ref:** backlog FR-11.6, FR-11.7; `phone.format.*` table (M127 §7)  
**Depends on:** T01 (hint key names)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T12:50:19Z
**Status:** Done
**Completed:** 2026-06-30T13:08:15Z

## Purpose
Add localized `phone.format.*` keys to identity dictionary (en/et/ru verbatim from backlog); register in `IDENTITY_FLAT_KEYS`; support `{country}`/`{example}`/`{lengths}`/`{prefix}` via `formatI18nMessage`.

## Risk
Missing flat keys break parity guards; hardcoded English in hints violates FR-11.7.

## Code Facts (re-verify at execute)
- [`identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js) — has `phone.country.*` (ID-10); **no `phone.format.*`**.
- Backlog table — 8 keys: `phoneLabel`, `helper`, `hint.empty`, `hint.invalid`, `hint.length`, `example`, `status.valid`, `status.needsCorrection`.
- Reuse: `phone.input.send`, `phone.cta.back` — do not duplicate.

## AC / DoD
- [x] (P0) All 8 `phone.format.*` keys in EN/ET/RU per backlog table (FR-11.7, AC #4, #5).
- [x] (P0) Keys registered in `IDENTITY_FLAT_KEYS`.
- [x] (P1) `identityDictionary.test.js` parity / hardcode guard green.
- [x] (P1) No forbidden terms (identity-frontend §4).

## Where to change
- `spa-app/src/i18n/identityDictionary.js`
- `spa-app/src/i18n/__tests__/identityDictionary.test.js`

## Out of scope
- Panel rendering hints (T04). Country names (ID-10 `countriesDataset`). Send/Back labels.

## Verification
```bash
cd spa-app && npm run test:run -- src/i18n/__tests__/identityDictionary.test.js
```
