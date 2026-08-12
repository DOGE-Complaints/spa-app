# SPA-ID-06-T01 — storyGate i18n dictionary + IDENTITY_FLAT_KEYS

**Story:** [`../STORY-SPA-ID-06-protected-action-gate.md`](../STORY-SPA-ID-06-protected-action-gate.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md) §Translations `storyGate.*`; [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md)  
**Depends on:** ID-09 Done (i18n foundation)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T18:55:30Z

## Purpose
Add all `storyGate.*` keys from story §Translations to `identityDictionary.js` for et/ru/en and register in `IDENTITY_FLAT_KEYS`. Extend dictionary parity/forbidden-term tests for new namespace.

## Risk
Missing keys cause raw `storyGate.*` strings in UI. Forbidden terms in gate copy break civic trust tone compliance.

## Code Facts (re-verify at execute)
- [`identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js) — grep `storyGate` → **0** at intake; `IDENTITY_FLAT_KEYS` exists (L850+).
- [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) — merges identity dictionary into `UI_DICTIONARY`.
- [`identityDictionary.test.js`](../../../../../../../../src/i18n/__tests__/identityDictionary.test.js) — parity + forbidden scan pattern from ID-09.
- Story §Translations — **33** `storyGate.*` keys (en/et/ru SSOT in pipeline story).

## AC / DoD
- [ ] (P0) All `storyGate.*` keys from story §Translations present in `UI_DICTIONARY.et`, `.ru`, `.en` (story AC #6, FR-06.9).
- [ ] (P0) Each new key registered in `IDENTITY_FLAT_KEYS`.
- [ ] (P0) `scanIdentityDictionaryForbiddenTerms()` — no hits on new keys (FR-06.9).
- [ ] (P1) Unit test: `findMissingIdentityDictionaryKeys()` includes storyGate keys → `[]`.

## Where to change
- `spa-app/src/i18n/identityDictionary.js` — `storyGate` namespace per §Translations
- `spa-app/src/i18n/__tests__/identityDictionary.test.js` — extend parity count/guard

## Out of scope
- Component wiring (T03–T05). Gateway client (T02).

## Verification
```bash
cd spa-app && npm run test:run -- src/i18n/__tests__/identityDictionary.test.js
```
