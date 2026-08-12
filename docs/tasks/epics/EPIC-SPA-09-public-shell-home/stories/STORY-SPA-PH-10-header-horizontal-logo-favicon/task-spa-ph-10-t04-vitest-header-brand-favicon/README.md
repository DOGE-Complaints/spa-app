# SPA-PH-10-T04 — Vitest Header brand + favicon smoke

**Status:** Done — P3 PASS 2026-08-07T20:53:02Z  
**Story:** [`../STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../STORY-SPA-PH-10-header-horizontal-logo-favicon.md)  
**Decision Ref:** backlog FR-PH-10.5 · AC #1–#2 (automated)  
**Depends on:** T02 · T03  
**ui_scope:** `visual`  
**extends ui-mockup:** [`../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-mockup-spec.md`](../task-spa-ph-10-t02-wire-header-horizontal-brand/ui-mockup-spec.md)  
**@mockup:** `docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md` (context)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T20:45:13Z  
**Package:** `pkg-000056`

## Purpose
Автотесты: brand link содержит logo `img` с alt; **нет** visible text «DOGEstonia» внутри brand; smoke на icon link в `index.html`.

## Risk
Регрессия PH-01 brand click / nav tests; false pass при text still in DOM.

## Code Facts (closed)
1. [`Header.publicNav.test.jsx`](../../../../../../../src/components/AppShell/__tests__/Header.publicNav.test.jsx) — brand asserts horizontal `src`, non-empty alt, no `.header-brand-name`, empty `textContent`.
2. Same file — `index.html` contains `rel="icon"` + `./favicon.png` + `type="image/png"`.
3. Vitest: **6/6 PASS** (2026-08-07T20:52Z).
4. Story screenshots: [`../screenshots/`](../screenshots/).

## AC / DoD
- [x] (P0) Vitest: `public-header-brand` has logo `img` → FR-PH-10.5.
- [x] (P0) Vitest: no visible text node «DOGEstonia» inside brand link (alt OK) → FR-PH-10.5 · AC #1.
- [x] (P1) Smoke: `index.html` contains icon link → FR-PH-10.5 · AC #3.
- [x] (P1) Path A happy header screenshots under story `screenshots/`.

## Where to change
- [`Header.publicNav.test.jsx`](../../../../../../../src/components/AppShell/__tests__/Header.publicNav.test.jsx)
- Story-root [`screenshots/`](../screenshots/)

## Out of scope
Story gate rollup (T05); footer/auth shell tests; Landing.

## Verification
```bash
cd spa-app && npm test -- --run src/components/AppShell/__tests__/Header.publicNav.test.jsx
```
