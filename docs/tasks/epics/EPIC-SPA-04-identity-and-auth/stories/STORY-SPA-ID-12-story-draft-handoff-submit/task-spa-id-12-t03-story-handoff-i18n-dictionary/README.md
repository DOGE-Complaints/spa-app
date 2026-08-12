# SPA-ID-12-T03 — storyHandoff.* i18n dictionary (et/ru/en)

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
Add all `storyHandoff.*` keys from pipeline story L10N table to `identityDictionary.js` + `IDENTITY_FLAT_KEYS` (et/ru/en). Fix `gptBridge.draft.sourceGpt` brand to «DOGEstonia GPT». Reuse existing `gptBridge.draft.*`, `auth.*`, `phone.*` per reuse table — no duplicates.

## Risk
Hardcoded English on handoff screens fails AC #8. Forbidden terms in any locale fail parity guards.

## Code Facts (re-verify at execute)
- grep `storyHandoff` in [`identityDictionary.js`](../../../../../../../src/i18n/identityDictionary.js) → **0** at scaffold.
- `gptBridge.draft.sourceGpt` currently «Source: Custom GPT» — backlog requires «DOGEstonia GPT».
- Guard: [`forbiddenVerificationTerms.js`](../../../../../../../src/i18n/forbiddenVerificationTerms.js).

## AC / DoD
- [ ] (P0) All `storyHandoff.*` keys from pipeline story table present et/ru/en (Scope H, AC #8).
- [ ] (P0) Keys in `IDENTITY_FLAT_KEYS`; `findMissingIdentityDictionaryKeys` passes.
- [ ] (P0) `gptBridge.draft.sourceGpt` updated to «DOGEstonia GPT» (backlog reuse note).
- [ ] (P1) No duplicate keys for auth/phone/gptBridge reuse items.

## Where to change
- [`identityDictionary.js`](../../../../../../../src/i18n/identityDictionary.js)
- [`forbiddenVerificationTerms.js`](../../../../../../../src/i18n/forbiddenVerificationTerms.js) if new prefixes needed

## Out of scope
UI panels (T06,T08). Story content localization (forbidden — D12-3).

## Verification
```bash
cd spa-app && npm run test:run -- src/i18n/__tests__/
```
