# SPA-PH-05-T07 — Story gate PH-05

**Status:** Done — P3 2026-08-04T13:22:05Z
**Story:** [`../STORY-SPA-PH-05-how-it-works-page.md`](../STORY-SPA-PH-05-how-it-works-page.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md) Acceptance Criteria  
**Depends on:** T01…T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T13:09:56Z  
**Package:** `pkg-000050`

## Purpose
Rollup story acceptance for PH-05: fill `acceptance-verification-spa-ph-05.md` from story-acceptance-gate template; §UI + story-root `screenshots/` pack (indexer + full-cycle) after T02 UI-3.

## Risk
Marking Done without §UI / live happy PNG; inventing AC not in backlog.

## Code Facts (re-verify at execute)
- Template: search `story-acceptance-gate-template` under `spa-app/docs/tasks/` / methodology templates.
- PH-04 gate pattern: [`…/task-spa-ph-04-t08-…/acceptance-verification-spa-ph-04.md`](../../STORY-SPA-PH-04-board-feed-home/task-spa-ph-04-t08-story-gate-ph-04/acceptance-verification-spa-ph-04.md).
- UI SSOT: T02 `ui-mockup-spec.md` (created at P3 UI-1) + M133 Path A refs.

## AC / DoD
- [x] (P0) Gate file lists all backlog AC with PASS/FAIL + evidence paths.
- [x] (P0) §UI links story-root `screenshots/README.md` + at least one full-cycle happy PNG (`ls` verify).
- [x] (P0) Commands: vitest HowItWorks/publicHome + `test:ui:how-it-works` (+ full-cycle if added).
- [x] (P0) Date from `--print-utc-now` at gate close.

## Where to change
- `…/task-spa-ph-05-t07-story-gate-ph-05/acceptance-verification-spa-ph-05.md` (create at P3)
- Story-root `…/STORY-SPA-PH-05-how-it-works-page/screenshots/` (create at P3 UI-3)
- Backlog + pipeline Status → Done only after PASS

## Out of scope
Product implement (T01–T06); PH-06.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run HowItWorks publicHome
cd spa-app && npm run test:ui:how-it-works
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-05-how-it-works-page/screenshots/README.md
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-05-how-it-works-page/screenshots/full-cycle/
```
