# SPA-ID-08-T02 — gptBridge i18n dictionary

**Story:** [`../STORY-SPA-ID-08-gpt-verification-entry.md`](../STORY-SPA-ID-08-gpt-verification-entry.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-08-gpt-verification-entry.md) §`gptBridge.*`; [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md)  
**Depends on:** STORY-SPA-ID-09 Done (`pkg-000020`)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-02T10:51:50Z

## Purpose
Add all `gptBridge.*` keys **verbatim** from pipeline story table to [`identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js) (`IDENTITY_DICTIONARY_{EN,ET,RU}`) and register in `IDENTITY_FLAT_KEYS`. Do not duplicate ID-01/03/04/05 keys.

## Risk
Missing keys or English literals in JSX break FR-08.9 and AC #7; forbidden terms in any locale block release.

## Code Facts (re-verify at execute)
- [`identityDictionary.js`](../../../../../../../../src/i18n/identityDictionary.js) — `storyGate.*`, `auth.*`, `phone.*` exist; grep `gptBridge` → **0**.
- Pipeline story §`gptBridge.*` — 24 keys en/et/ru SSOT.
- ID-09 pattern: flat keys + completeness test in `identityDictionary.test.js`.

## AC / DoD
- [ ] (P0) All 24 `gptBridge.*` keys in EN/ET/RU dictionaries (FR-08.9, AC #7).
- [ ] (P0) Every key in `IDENTITY_FLAT_KEYS`.
- [ ] (P1) Completeness test: pipeline table keys ⊆ dictionary keys for all locales.
- [ ] (P1) No forbidden terms per localization guide.

## Where to change
- `spa-app/src/i18n/identityDictionary.js`
- `spa-app/src/i18n/__tests__/identityDictionary.test.js` (or dedicated `gptBridgeDictionary.test.js`)

## Out of scope
- Login/verify UI wiring (T03–T05). OAuth client (T01).

## Verification
```bash
cd spa-app && npm run test:run -- src/i18n/__tests__/identityDictionary.test.js
```
