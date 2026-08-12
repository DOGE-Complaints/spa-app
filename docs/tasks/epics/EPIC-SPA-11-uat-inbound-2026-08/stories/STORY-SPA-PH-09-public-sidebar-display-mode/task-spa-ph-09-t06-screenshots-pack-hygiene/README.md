# SPA-PH-09-T06 — Screenshots pack hygiene (F1)

**Status:** Done — P6 PASS 2026-08-08T09:41:23Z · F1  
**Story:** [`../STORY-SPA-PH-09-public-sidebar-display-mode.md`](../STORY-SPA-PH-09-public-sidebar-display-mode.md)  
**Decision Ref:** [audit-STORY-SPA-PH-09-execution-2026-08-08.md](../../../../../../analysis/audit-STORY-SPA-PH-09-execution-2026-08-08.md) §F1  
**Depends on:** SPA-PH-09-T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-08T09:38:26Z  
**Package:** `pkg-000057` (unchanged) · `run_mode=spa_ph_09_audit_2026_08_08`

## Purpose

Привести story-root screenshot pack к P3 spa visual convention: `screenshots/README.md` + `full-cycle/` layout. PNG evidence уже на диске в T02 `ui-baseline/post-implement/`.

## Risk

Gate/audit читают pack как неполный; evidence трудно индексировать без story-root README.

## Code Facts (closed)

1. Evidence under [`../screenshots/full-cycle/`](../screenshots/full-cycle/): `ph09-board-no-sidebar-desktop.png`, `ph09-board-no-sidebar-narrow.png`.
2. Index: [`../screenshots/README.md`](../screenshots/README.md).
3. Anchor post-implement remains under T02 `ui-baseline/post-implement/` (not deleted).

## Gap

Low F1 — pack hygiene → **CLOSED**.

## AC / DoD

- [x] (P0) `screenshots/README.md` indexes happy/narrow shots + capture UTC/refs → F1.
- [x] (P0) Evidence under `screenshots/full-cycle/` (copy from T02 post-implement; keep T02 originals).
- [x] (P0) Gate / story links still resolve (T05 §UI + story-root pack).
- [x] (P0) No product SPA JSX/CSS change.

## Where to change

- [`../screenshots/README.md`](../screenshots/README.md)
- [`../screenshots/full-cycle/`](../screenshots/full-cycle/)
- [`../task-spa-ph-09-t05-story-gate-ph-09/acceptance-verification-spa-ph-09.md`](../task-spa-ph-09-t05-story-gate-ph-09/acceptance-verification-spa-ph-09.md)
- [`acceptance-verification-spa-ph-09-t06.md`](./acceptance-verification-spa-ph-09-t06.md)

## Out of scope

F2 Sidebar JSX conditional (WAIVED info-nonblocking); product shell code; re-running full UI-0 baseline unless files lost.

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/screenshots/README.md
ls spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-09-public-sidebar-display-mode/screenshots/full-cycle/
```
