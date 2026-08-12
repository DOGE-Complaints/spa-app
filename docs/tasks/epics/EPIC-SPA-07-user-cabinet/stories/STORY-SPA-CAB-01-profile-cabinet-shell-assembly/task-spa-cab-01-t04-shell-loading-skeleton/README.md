# SPA-CAB-01-T04 — Shell loading skeleton

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) §FR-CAB-01.5, T04  
**Depends on:** [T02](../task-spa-cab-01-t02-m99-grid-section-slots/README.md)  
**ui_scope:** `visual`  
**extends ui-mockup:** [`../task-spa-cab-01-t02-m99-grid-section-slots/ui-mockup-spec.md`](../task-spa-cab-01-t02-m99-grid-section-slots/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T12:34:41Z

@mockup: spa-app/docs/UX/mockups/user profile/mockup-22-user-cabinet-loading-spec.png

## Purpose
Закрыть FR-CAB-01.5 / T04: shell-level skeleton при aggregate load профиля (M21 «no giant spinner»). Reference layout context: M21/M99.

## Risk
Giant spinner вместо skeleton → FR-CAB-01.5 / visual AC fail; loading text-only without structure breaks M22.

## Code Facts (re-verify at execute)
- [`UserCabinetPage.jsx:10-21`](../../../../../../../src/pages/UserCabinetPage.jsx) — `RESTORING` → text `cabinet.shell.loading` only (не skeleton grid).
- M22 loading png: `spa-app/docs/UX/mockups/user profile/mockup-22-user-cabinet-loading-spec.png` (image-only).
- Не путать с CAB-07 load-error mockup-22.

## AC / DoD
- [x] (P0) FR-CAB-01.5: shell-level skeleton при aggregate load (до монтирования блоков).
- [x] (P0) AC #1: loading path всё ещё «кабинет», не placeholder / не giant spinner.
- [x] (P1) Skeleton mirrors M99 slot structure (M22).

## Where to change
- [`spa-app/src/pages/UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx)
- [`spa-app/src/pages/UserCabinetPage.css`](../../../../../../../src/pages/UserCabinetPage.css)

## Out of scope
- Error / empty page states (CAB-07). Section content loading (CAB-02…06).

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage
# visual: compare loading state to M22 png
```
