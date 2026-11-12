# SPA-REQ21-01-T07 — Story-root screenshots pack + footer-in-frame (F1+F3)

**Status:** Done · P6 `2026-10-06T19:48:21Z`  
**Story:** [`../STORY-SPA-REQ21-01-shell-chrome-ownership.md`](../STORY-SPA-REQ21-01-shell-chrome-ownership.md)  
**Decision Ref:** [audit-STORY-SPA-REQ21-01-execution-2026-10-06.md](../../../../../../analysis/audit-STORY-SPA-REQ21-01-execution-2026-10-06.md) · F1 High · F3 Low  
**ui_scope:** `mixed` (docs/visual only · no product chrome rewrite)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-06T19:38:28Z`  
**Done:** `2026-10-06T19:48:21Z`  
**Package:** `pkg-000092` (unchanged · `run_mode=spa_req21_01_audit_2026_10_06`)  
**Gaps:** F1 + F3 → **CLOSED**

## Purpose

Create story-root `screenshots/README.md` + `full-cycle/` Happy board + how-it-works with `public-footer` in viewport (`scrollIntoView`). Link gate §UI. No redesign invent.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Story-root `screenshots/README.md` Present | [`../screenshots/README.md`](../screenshots/README.md) |
| 2 | Board + HIW full-cycle PNGs with footer in frame | [`../screenshots/full-cycle/01-…`](../screenshots/full-cycle/01-board-default-footer-1536x1024.png) · [`02-…`](../screenshots/full-cycle/02-how-it-works-footer-1536x1024.png) |
| 3 | Gate §UI points at story-root pack | [`../task-spa-req21-01-t06-story-gate/acceptance-verification-spa-req21-01.md`](../task-spa-req21-01-t06-story-gate/acceptance-verification-spa-req21-01.md) |
| 4 | No product `src/` | this P6 docs/visual only |

## AC / DoD

- [x] (P0) NEW `../screenshots/README.md` (Happy + Edge inventory + T01 baseline pointer)
- [x] (P0) `../screenshots/full-cycle/` has board + HIW PNGs with footer visible
- [x] (P0) Gate §UI points at story-root pack
- [x] (P0) No product `src/` change
- [x] (P0) Gaps F1 + F3 CLOSED

## Where changed

- `…/screenshots/README.md` (NEW)
- `…/screenshots/full-cycle/01-*.png` · `02-*.png` · README · capture harness
- soft: gate §UI

## Out of scope

Issue/protected/overlay (T08) · ThemeToggle / CSS migrate · mockup-150 · pkg edit · product rewrite

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-01-shell-chrome-ownership/screenshots/README.md
ls spa-app/docs/tasks/epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-01-shell-chrome-ownership/screenshots/full-cycle/01-board-default-footer-1536x1024.png
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
