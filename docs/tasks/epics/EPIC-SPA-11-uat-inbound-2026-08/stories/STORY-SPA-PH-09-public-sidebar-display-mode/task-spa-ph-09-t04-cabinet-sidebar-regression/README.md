# SPA-PH-09-T04 — Cabinet sidebar regression

**Status:** Done — P3 PASS 2026-08-08T09:04:55Z  
**Story:** [`../STORY-SPA-PH-09-public-sidebar-display-mode.md`](../STORY-SPA-PH-09-public-sidebar-display-mode.md)  
**Decision Ref:** backlog FR-PH-09.3 · AC cabinet  
**Depends on:** SPA-PH-09-T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-08T08:52:31Z  
**Package:** `pkg-000057`

## Purpose
Protected/cabinet shell still shows sidebar (default `showSidebar`).

## Code Facts (closed)
1. [`AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx): `<AppShell>` without hide — default true.
2. [`UserCabinetPage.test.jsx`](../../../../../../../src/pages/__tests__/UserCabinetPage.test.jsx): asserts `.board-sidebar` present; no `--no-sidebar`.
3. Public board tests assert no sidebar (pair).

## AC / DoD
- [x] (P0) Cabinet/profile has sidebar → FR-PH-09.3 · AC #2.
- [x] (P0) Public without sidebar → AC #1 pair.
- [x] (P0) No cabinet redesign.

## Verification
```bash
cd spa-app && npm test -- --run src/pages/__tests__/UserCabinetPage.test.jsx
```
