# SPA-THR-07-T03 — Knobs cache module

**Status:** Done  
**Story:** [`../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md`](../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md)  
**Decision Ref:** backlog THR-07 · handoff 04 (refresh-on-focus)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:30:38Z`
**Completed:** `2026-09-24T07:37:03Z`  
**Package:** `pkg-000083`

## Purpose

Knobs cache module: load once, refresh on window focus; expose `max_depth`.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| `getKnobs` seam | `ThreadsSocialClient.js` → Unavailable until T02 Close |
| No knobs cache module yet | implement under `src/` threads/config area (P3 chooses path) |

## AC / DoD

- [x] (P0) Knobs loaded/cached **before** tree drives `maxDepth`
- [x] (P0) Refresh on window focus (handoff)
- [x] (P0) Expose `max_depth` for IssueThreadBlock

## Where to change

- New knobs cache module near threads client/hooks
- Consumers: T04/T05 mounts

## Out of scope

Tree map (T04) · page wire (T05) · write ops

## Verification

```bash
cd spa-app && npm test -- --run
```
