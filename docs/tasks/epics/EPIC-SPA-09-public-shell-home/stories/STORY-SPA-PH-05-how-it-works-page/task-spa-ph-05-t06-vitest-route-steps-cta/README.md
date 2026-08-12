# SPA-PH-05-T06 — Vitest route + steps + CTAs

**Status:** Done — P3 2026-08-04T13:22:05Z
**Story:** [`../STORY-SPA-PH-05-how-it-works-page.md`](../STORY-SPA-PH-05-how-it-works-page.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md) AC  
**Depends on:** T01…T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T13:09:56Z  
**Package:** `pkg-000050`

## Purpose
Automated coverage: public route; exactly 4 steps; CTA targets (`/board` + env GPT); `howItWorks.*` key parity. Add puppeteer smoke `test:ui:how-it-works` (package.json script) for P3 step 0b / UI-3.

## Risk
Weak assertions that allow stub to pass; skipping env CTA cases.

## Code Facts (re-verify at execute)
- Existing Header nav tests: [`Header.publicNav.test.jsx`](../../../../../../../src/components/AppShell/__tests__/Header.publicNav.test.jsx).
- PH-04 pattern: page `*.test.jsx` + `tests/puppeteer/*-smoke.mjs`.

## AC / DoD
- [x] (P0) Vitest: route public; 4 steps; CTA targets; key parity → supports all backlog AC.
- [x] (P0) `npm run test:ui:how-it-works` smoke exists and asserts no stub-only happy path after implement.
- [x] (P0) Suite green on committed tree after P3.

## Where to change
- `spa-app/src/pages/__tests__/HowItWorksPage*.test.jsx` (new)
- `spa-app/src/i18n/__tests__/publicHomeDictionary.test.js`
- `spa-app/tests/puppeteer/how-it-works-smoke.mjs` (new)
- `spa-app/package.json` scripts

## Out of scope
Story gate rollup (T07); live screenshot pack (T07 UI-3).

## Verification
```bash
cd spa-app && npm test -- --run HowItWorks publicHome
cd spa-app && npm run test:ui:how-it-works
```
