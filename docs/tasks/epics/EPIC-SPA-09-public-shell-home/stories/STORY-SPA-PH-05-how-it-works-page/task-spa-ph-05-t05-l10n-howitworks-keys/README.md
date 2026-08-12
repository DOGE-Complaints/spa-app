# SPA-PH-05-T05 — L10N howItWorks.* full appendix

**Status:** Done — P3 2026-08-04T13:22:05Z
**Story:** [`../STORY-SPA-PH-05-how-it-works-page.md`](../STORY-SPA-PH-05-how-it-works-page.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md) FR-PH-05.L10N  
**Depends on:** T02 (layout consumes keys)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T13:09:56Z  
**Package:** `pkg-000050`

## Purpose
Add full `howItWorks.*` namespace from M133 localized-copy appendix into `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`. Do not duplicate appendix `header.*` / `footer.*` under wrong namespace (chrome owned by PH-01/PH-03).

## Risk
Invented keys; missing et/ru parity; translating `DOGEstonia GPT` / `/board`.

## Code Facts (re-verify at execute)
- Dict today: nav + account + footer + `publicHome.board.*` — **no** `howItWorks.*`.
- SSOT copy: [mockup-133-…-localized-copy-appendix.md](../../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) + backlog tables (verbatim).
- Merge via existing `PUBLIC_HOME_DICTIONARY_*` → `UI_DICTIONARY` pattern.

## AC / DoD
- [x] (P0) Full `howItWorks.*` from appendix in en/et/ru + FLAT_KEYS (FR-PH-05.L10N) → backlog AC #4.
- [x] (P0) `DOGEstonia GPT` untranslated; routes/env names not translated (FR-PH-05.6 / AC #5).
- [x] (P0) No duplicate chrome keys under `howItWorks.header|footer`.

## Where to change
- `spa-app/src/i18n/publicHomeDictionary.js`
- `spa-app/src/i18n/__tests__/publicHomeDictionary.test.js`

## Out of scope
Layout/CTA implement (T02/T03); CMS.

## Verification
```bash
rg -n "howItWorks\." spa-app/src/i18n/publicHomeDictionary.js | head
cd spa-app && npm test -- --run publicHome
```
