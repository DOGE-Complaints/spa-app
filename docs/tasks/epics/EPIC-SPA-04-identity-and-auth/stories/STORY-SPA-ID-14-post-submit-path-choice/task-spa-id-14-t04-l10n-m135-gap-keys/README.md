# SPA-ID-14-T04 — L10N M135 gap keys + FLAT_KEYS

**Status:** Done — P3 execute 2026-08-07T19:56:17Z  
**Story:** [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md)  
**Decision Ref:** FR-ID-14.L10N · AC L10N · backlog §Тексты New/gap  
**Depends on:** SPA-ID-14-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T19:36:12Z  
**Package:** `pkg-000055`

## Purpose
Добавить M135 gap keys (`copySubmissionId`, `copied`, `submitAnotherHint`, `noAutoRedirect`) en/et/ru + `IDENTITY_FLAT_KEYS`; EN = M135; reuse existing success/cta keys.

## Risk
Missing a11y/hint strings → empty UI or hardcoded EN.

## Code Facts (re-verify at execute)
- [`identityDictionary.js`](../../../../../../../src/i18n/identityDictionary.js) + `IDENTITY_FLAT_KEYS`.
- Backlog table New/gap vs M135 (T04).

## AC / DoD
- [x] (P0) Four new keys present en/et/ru → FR-ID-14.L10N · AC #6.
- [x] (P0) Keys registered in `IDENTITY_FLAT_KEYS` (or project-equivalent flat list).
- [x] (P0) Existing reuse keys unchanged (title/message/cta.*).
- [x] (P0) EN strings match M135 wording from backlog.

## Where to change
- `spa-app/src/i18n/identityDictionary.js` (+ related flat-keys module if separate)
- Panel consumers if they need new `t(...)` calls (coordinate with T03/T05)
- This task acceptance

## Out of scope
Panel CSS hierarchy (T05); vitest (T06).

## Verification
```bash
rg -n "copySubmissionId|submitAnotherHint|noAutoRedirect|IDENTITY_FLAT_KEYS" spa-app/src/i18n/
```
