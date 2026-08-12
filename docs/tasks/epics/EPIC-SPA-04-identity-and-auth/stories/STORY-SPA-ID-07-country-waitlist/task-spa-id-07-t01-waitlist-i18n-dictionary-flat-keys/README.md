# SPA-ID-07-T01 — waitlist i18n dictionary + IDENTITY_FLAT_KEYS

**Story:** [`../STORY-SPA-ID-07-country-waitlist.md`](../STORY-SPA-ID-07-country-waitlist.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md) §Translations `waitlist.*`; [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md)  
**Depends on:** ID-09 Done (i18n foundation); ID-05 Done (error handoff exists)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T08:57:57Z

## Purpose
Add all `waitlist.*` keys from story §Translations to `identityDictionary.js` for et/ru/en and register in `IDENTITY_FLAT_KEYS`. Extend dictionary parity/forbidden-term tests for new namespace.

## Risk
Missing keys cause raw `waitlist.*` strings in M123 UI. Forbidden terms in waitlist copy break civic trust tone compliance.

## Code Facts (re-verify at execute)
- grep `waitlist.` in [`identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js) → **0** at intake.
- [`phoneError.country.*`](../../../../../../../../src/i18n/identityDictionary.js) — ID-05 country error labels exist; **distinct** from `waitlist.*` namespace.
- [`identityDictionary.test.js`](../../../../../../../../src/i18n/__tests__/identityDictionary.test.js) — parity + forbidden scan pattern from ID-09.
- Story §Translations — **24** `waitlist.*` keys (en/et/ru SSOT in pipeline story).

## AC / DoD
- [ ] (P0) All `waitlist.*` keys from story §Translations present in `UI_DICTIONARY.et`, `.ru`, `.en` (story AC #6, FR-07.7).
- [ ] (P0) Each new key registered in `IDENTITY_FLAT_KEYS`.
- [ ] (P0) `scanIdentityDictionaryForbiddenTerms()` — no hits on new keys (FR-07.7).
- [ ] (P1) Unit test: `findMissingIdentityDictionaryKeys()` includes waitlist keys → `[]`.

## Where to change
- `spa-app/src/i18n/identityDictionary.js` — `waitlist` namespace per §Translations
- `spa-app/src/i18n/forbiddenVerificationTerms.js` — add `waitlist.` prefix if needed
- `spa-app/src/i18n/__tests__/identityDictionary.test.js` — extend parity count/guard

## Out of scope
- Waitlist panels (T03–T05). waitlistService (T02).

## Verification
```bash
cd spa-app
npm run test:run -- src/i18n/__tests__/identityDictionary.test.js
grep -c "waitlist\." src/i18n/identityDictionary.js
```
