# SPA-THR-07-T06 — Vitest contract fixtures

**Status:** Done  
**Story:** [`../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md`](../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md)  
**Decision Ref:** backlog THR-07 · OpenAPI envelopes  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:30:38Z`
**Completed:** `2026-09-24T07:37:03Z`  
**Package:** `pkg-000083`

## Purpose

Vitest: success empty/populated, network fail → unavailable; assert Closed URLs.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Existing client tests | THR-06 Unavailable suite under repositories |
| Forbidden path | **no** `/threads/by-issue` |
| Gateway regress | Issues `/node/issues` still covered |

## AC / DoD

- [x] (P0) Fixtures match OpenAPI envelopes (empty + populated)
- [x] (P0) Network/malformed → `unavailable`
- [x] (P0) Assert Closed URLs only; gateway Issues regression covered

## Where to change

- `spa-app/src/**/__tests__/**` (client / mapper / mounts as needed)

## Out of scope

Live E2E against remote · invent paths · THR-08/09

## Verification

```bash
cd spa-app && npm test
```
