# SPA-SSR-01-T03 — Vitest fixture parse

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-01-issue-public-shape-consume.md`](../STORY-SPA-SSR-01-issue-public-shape-consume.md)  
**Decision Ref:** backlog AC fixture parse  
**Depends on:** T01 · T02  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Scaffolded:** 2026-09-02  
**Done:** 2026-09-02T19:37:14Z

## Purpose
Vitest (or equivalent) proves parse/pass-through of fixture Issue with both `schema_card` and `geo`.

## Risk
Testing invented HTTP; asserting pack.json UI.

## Code Facts (As-of-Done)
- [`GatewayIssueRepository.test.js`](../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) — list + detail sidecar pass-through + civic-only
- [`types.test.js`](../../../../../../../src/domain/__tests__/types.test.js) — schema_card/geo accept; `admin_*` reject

## AC / DoD
- [x] (P0) Fixture with `schema_card` + `geo` (incl. optional `detail_level`) round-trips
- [x] (P0) Absent sidecars still valid (civic-only)

## Where to change
- `spa-app/src/repositories/__tests__/*` or domain tests

## Out of scope
UI snapshots · map · overlay

## Verification
```bash
cd spa-app && npx vitest run src/repositories 2>/dev/null || npx vitest run --passWithNoTests
```
