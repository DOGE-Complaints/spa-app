# SPA-THR-07-T05 — Board + Issue mounts wire

**Status:** Done  
**Story:** [`../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md`](../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md)  
**Decision Ref:** backlog THR-07  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:30:38Z`
**Completed:** `2026-09-24T07:37:03Z`  
**Package:** `pkg-000083`

## Purpose

Wire BoardPage + IssuePage: `issueId`, load knobs→tree, `onRetry`.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Board mount | `BoardPage.jsx` — `IssueThreadBlock` + harness `empty` |
| Issue mount | `IssuePage.jsx` — harness `empty` |
| Pass | `issueId` + `maxDepth` from knobs into `IssueThreadBlock` |

## AC / DoD

- [x] (P0) Knobs then tree load on both mounts; `onRetry` wired
- [x] (P0) Demo comments not prod default on board/issue mounts
- [x] (P0) Issues gateway path unchanged (no regress)

## Where to change

- `spa-app/src/pages/BoardPage.jsx`
- `spa-app/src/pages/IssuePage.jsx`

## Out of scope

THR-08/09 writes · new artboards · invent URLs

## Verification

```bash
cd spa-app && npm test -- --run src/pages
```
