# SPA-ID-10-T02 — phone.country.* i18n dictionary

**Story:** [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)  
**Decision Ref:** pipeline story §Translations `phone.country.*`; [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md)  
**Depends on:** T01 optional (country names in dataset, not dictionary)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T10:51:01Z

## Purpose
Add all `phone.country.*` keys from story §Translations to `identityDictionary.js` (et/ru/en) + `IDENTITY_FLAT_KEYS`. Reuse existing `phone.input.*` keys where backlog §Reuse specifies; no duplicate literals.

## Risk
Raw `phone.country.*` keys in UI. Forbidden terms in unsupported copy. et/ru inflection nuance broken if `{country}` used incorrectly.

## Code Facts (re-verify at execute)
- grep `phone.country.` in [`identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js) → **0** at intake.
- Existing ID-04 keys: `phone.input.send`, `phone.cta.back`, `phone.input.phoneNumber` — present.
- [`forbiddenVerificationTerms.js`](../../../../../../../../src/i18n/forbiddenVerificationTerms.js) — `phone.` prefix already scanned.

## AC / DoD
- [ ] (P0) All `phone.country.*` from story §Translations in et/ru/en (FR-10.7, AC #7).
- [ ] (P0) Keys in `IDENTITY_FLAT_KEYS`; `findMissingIdentityDictionaryKeys()` → `[]`.
- [ ] (P0) `scanIdentityDictionaryForbiddenTerms()` — no hits.
- [ ] (P1) Reuse ID-04 keys per backlog §Reuse where panel uses same copy (no duplicate EN strings).

## Where to change
- `spa-app/src/i18n/identityDictionary.js`
- `spa-app/src/i18n/forbiddenVerificationTerms.js` — add `phone.country.` if needed
- `spa-app/src/i18n/__tests__/identityDictionary.test.js`

## Out of scope
- Country names in selector (T01 dataset). Panel wiring (T03–T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/i18n/__tests__/identityDictionary.test.js
grep -c "phone.country" src/i18n/identityDictionary.js
```
