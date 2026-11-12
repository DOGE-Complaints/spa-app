# SPA-THR-07-T02 — Close knobs + tree_read client

**Status:** Done  
**Story:** [`../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md`](../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md)  
**Decision Ref:** backlog THR-07 · OpenAPI Closed paths · HTTP-06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:30:38Z`
**Completed:** `2026-09-24T07:37:03Z`  
**Package:** `pkg-000083`

## Purpose

Close `knobs`+`tree_read` in `ThreadsSocialClient`; `GET /threads/knobs` + `GET /threads/issues/{issue_id}`.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Client seam on disk | `spa-app/src/repositories/ThreadsSocialClient.js` |
| Contract `knobs`/`tree_read` | both `'open'` → Unavailable / no fetch |
| Closed paths (siblings) | `GET /threads/knobs` · `GET /threads/issues/{issue_id}` — **not** `/threads/by-issue` |

## AC / DoD

- [x] (P0) `SOCIAL_HTTP_CONTRACT.knobs` + `tree_read` → `closed`
- [x] (P0) `getKnobs` / `getThreadTree` real `fetch` against Closed paths only
- [x] (P0) No `/threads/by-issue`; other ops stay Unavailable until THR-08/09

## Where to change

- `spa-app/src/repositories/ThreadsSocialClient.js`
- related unit tests

## Out of scope

comment POST · reactions · attach-ref · invent URLs

## Verification

```bash
cd spa-app && npm test -- --run src/repositories
rg -n "by-issue|/threads/knobs|/threads/issues" src/repositories/ThreadsSocialClient.js
```
