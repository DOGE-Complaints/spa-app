# SPA-ES-04-T05 — Vitest no coverage %; CTA uses env

**Status:** Done  
**Story:** [`../STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) · AC-SPA-ES-03/06 · FR-ES-04.L10N  
**Depends on:** T01–T04  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:54:44Z · **P3:** 2026-08-17T12:02:25Z  
**Package:** `pkg-000069`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png
```

## Purpose
Vitest: Missing is qualitative (no coverage % / «N more Stories»); Help CTA uses `VITE_STORY_GPT_URL` helper; no Offers (AC-SPA-ES-06); dictionary keys `earlySignal.forming.*` / `missing.*` / `help.*`.

## Risk
Asserting invented coverage API; skipping env CTA; mixing ES-05 feed tests as ES-04 AC.

## Code Facts (re-verify at execute)
- No `WhatsMissingBlock.test.jsx` / `HelpCompleteBlock.test.jsx` yet.
- Dictionary titles exist; remaining ES-04 keys not in `EARLY_SIGNAL_FLAT_KEYS` yet.
- PH-06 helper tests already cover `getStoryGptUrl` in [`storyGptUrl.test.js`](../../../../../../../src/config/__tests__/storyGptUrl.test.js) — reuse, do not fork env contract.

## AC / DoD
- [x] (P0) No coverage % / gap score / «N more Stories» in UI copy (AC-SPA-ES-03).
- [x] (P0) Help CTA uses env helper (not hardcoded GPT-id).
- [x] (P0) No Offers (AC-SPA-ES-06); no Voices.
- [x] (P0) FR-ES-04.L10N keys present et/ru/en
- [x] (P0) No invented gateway path; no `/dashboard` change

## Where to change
- `spa-app/src/components/earlySignal/__tests__/` · dictionary test

## Out of scope
ES-05 continuum tests. Product code this P1.

## Verification
```bash
cd spa-app && npx vitest run src/components/earlySignal src/i18n/__tests__/earlySignalDictionary.test.js --passWithNoTests
```
