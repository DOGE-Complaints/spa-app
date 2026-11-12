# SPA-BUG-09-T07 — Story gate BUG-09

**Status:** Done · P3 `2026-10-03T15:18:08Z`  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** backlog STORY-SPA-BUG-09 · AC-BUG-09-01…05  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:08:51Z`  
**Package:** `pkg-000090`

## Purpose

Story acceptance gate: AC matrix + H1 confirmed; fix pinned to BoardIssuesMap MapLibre v4 Promise (+ H1b).

## Code Facts (P3)

| # | Claim |
|---|-------|
| 1 | [acceptance-verification-spa-bug-09.md](./acceptance-verification-spa-bug-09.md) · Result **PASS** · Date `2026-10-03T15:18:08Z` |

## AC / DoD

- [x] (P0) All AC Pass or documented BLOCKED with facts — **AC-BUG-09-01…05**
- [x] (P0) H1 + H1b noted in gate — **AC-BUG-09-01…05**
- [x] (P0) Date stamped post live-run — **AC-BUG-09-01…05**

## Where to change

- task-spa-bug-09-t07-story-gate/acceptance-verification-spa-bug-09.md (P3)

## Out of scope

H2 life-sim geo · gateway invent · MapLibre downgrade · other BUG pkgs

## Verification

```bash
rg -n 'PASS|AC-BUG-09' spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-BUG-09-board-map-pins-not-rendered/task-spa-bug-09-t07-story-gate/acceptance-verification-spa-bug-09.md | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
```
