# SPA-PH-10-T07 — Screenshots pack hygiene (F2)

**Status:** Done — P6 PASS 2026-08-08T08:34:56Z · F2  
**Story:** [`../STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../STORY-SPA-PH-10-header-horizontal-logo-favicon.md)  
**Decision Ref:** [audit-STORY-SPA-PH-10-execution-2026-08-07.md](../../../../../../analysis/audit-STORY-SPA-PH-10-execution-2026-08-07.md) §F2  
**Depends on:** SPA-PH-10-T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-08T08:22:48Z  
**Package:** `pkg-000056` (unchanged) · `run_mode=spa_ph_10_audit_2026_08_07`

## Purpose
Привести story-root screenshot pack к P3 spa visual convention: `screenshots/README.md` + `full-cycle/` layout. PNG evidence уже на диске у корня pack.

## Risk
Gate/audit читают pack как неполный; evidence трудно индексировать без README.

## Code Facts (closed)
1. Evidence under [`../screenshots/full-cycle/`](../screenshots/full-cycle/): `ph10-header-brand-desktop.png`, `ph10-board-header-desktop.png`, `ph10-board-header-narrow.png`.
2. Index: [`../screenshots/README.md`](../screenshots/README.md).
3. Anchor post-implement remains under T02 `ui-baseline/post-implement/` (not deleted).

## Gap
Low F2 — pack hygiene → **CLOSED**.

## AC / DoD
- [x] (P0) `screenshots/README.md` indexes happy/narrow shots + capture UTC/refs → F2.
- [x] (P0) Evidence under `screenshots/full-cycle/` (moved from pack root).
- [x] (P0) Gate / story links still resolve (T05 paths updated).
- [x] (P0) No product SPA JSX/CSS change.

## Where to change
- [`../screenshots/README.md`](../screenshots/README.md)
- [`../screenshots/full-cycle/`](../screenshots/full-cycle/)
- [`../task-spa-ph-10-t05-story-gate-ph-10/acceptance-verification-spa-ph-10.md`](../task-spa-ph-10-t05-story-gate-ph-10/acceptance-verification-spa-ph-10.md)
- [`acceptance-verification-spa-ph-10-t07.md`](./acceptance-verification-spa-ph-10-t07.md)

## Out of scope
As-of-Done SSOT (T06); EmptyState (F3); transparent pad (F4); re-running full UI-0 baseline unless files lost.

## Verification
```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-10-header-horizontal-logo-favicon/screenshots/README.md
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-10-header-horizontal-logo-favicon/screenshots/full-cycle/
```
