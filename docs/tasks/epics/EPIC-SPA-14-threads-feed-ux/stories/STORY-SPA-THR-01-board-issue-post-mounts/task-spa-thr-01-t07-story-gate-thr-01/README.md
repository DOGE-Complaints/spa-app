# SPA-THR-01-T07 — Story gate THR-01

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** story Acceptance Criteria · M143 · M148 · AC-SPA-THR-01/02/04  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T20:38:39Z
**Done:** 2026-09-22T20:46:40Z  
**Package:** `pkg-000077`

## Purpose
Story-level acceptance gate after mounts land: AC checklist, cite M143/M148, no invent HTTP, route preserved.

## Risk
Marking Done without continuous-shell evidence; inventing social endpoints in gate notes.

## Code Facts (re-verify at execute)
- Gate file written post live-run only (`Date:` from `--print-utc-now`)
- Mockups: M143 + M148 md+png ON DISK

## AC / DoD
- [x] (P0) acceptance-verification gate PASS with live Date
- [x] (P0) Story AC checklist evidence bound
- [x] (P0) No invent HTTP; `/issue/:id` retained
- [x] (P0) Bullrun/INDEX sync after Done (P3 close)

## Where to change
- `acceptance-verification-spa-thr-01.md` (this folder, post execute)

## Out of scope
Product feature beyond T01–T06 · P2/P3 start from APPLY · push

## Verification
```bash
test -f spa-app/docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-01-board-issue-post-mounts/task-spa-thr-01-t07-story-gate-thr-01/acceptance-verification-spa-thr-01.md
```
