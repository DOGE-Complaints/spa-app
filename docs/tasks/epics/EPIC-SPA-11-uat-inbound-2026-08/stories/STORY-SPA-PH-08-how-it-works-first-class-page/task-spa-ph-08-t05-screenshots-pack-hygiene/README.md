# SPA-PH-08-T05 — Screenshots pack hygiene (F1)

**Status:** Done — P6 PASS 2026-08-09T08:25:59Z · F1  
**Story:** [`../STORY-SPA-PH-08-how-it-works-first-class-page.md`](../STORY-SPA-PH-08-how-it-works-first-class-page.md)  
**Decision Ref:** [audit-STORY-SPA-PH-08-execution-2026-08-09.md](../../../../../../analysis/audit-STORY-SPA-PH-08-execution-2026-08-09.md) §F1  
**Depends on:** SPA-PH-08-T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T08:20:49Z  
**Package:** `pkg-000058` (unchanged) · `run_mode=spa_ph_08_audit_2026_08_09`

## Purpose

Привести story-root screenshot pack к P3 spa visual convention: `screenshots/README.md` + `full-cycle/`. PNG evidence уже на диске в T02 `ui-baseline/post-implement/`.

## Risk

Gate/audit читают pack как неполный; evidence трудно индексировать без story-root README.

## Code Facts (closed)

1. Evidence under [`../screenshots/full-cycle/`](../screenshots/full-cycle/): `01-hiw-first-class-desktop-1536x1024.png`, `02-hiw-first-class-narrow-390x844.png`.
2. Index: [`../screenshots/README.md`](../screenshots/README.md).
3. Anchor post-implement remains under T02 `ui-baseline/post-implement/` (not deleted).
4. T04 §UI links story-root pack.

## Gap

Low F1 — pack hygiene → **CLOSED**.

## AC / DoD

- [x] (P0) `screenshots/README.md` indexes happy/narrow shots + capture UTC/refs → F1.
- [x] (P0) Evidence under `screenshots/full-cycle/` (copy from T02 post-implement; keep T02 originals).
- [x] (P0) Gate / story links still resolve (T04 §UI updated).
- [x] (P0) No product SPA JSX/CSS change.

## Where to change

- [`../screenshots/README.md`](../screenshots/README.md)
- [`../screenshots/full-cycle/`](../screenshots/full-cycle/)
- [`../task-spa-ph-08-t04-story-gate-ph-08/acceptance-verification-spa-ph-08.md`](../task-spa-ph-08-t04-story-gate-ph-08/acceptance-verification-spa-ph-08.md)
- [`acceptance-verification-spa-ph-08-t05.md`](./acceptance-verification-spa-ph-08-t05.md)

## Out of scope

F2 T01 Code Facts (T06); F3 vitest describe (T07); product composition rework.

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/screenshots/README.md
ls spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/screenshots/full-cycle/
```
