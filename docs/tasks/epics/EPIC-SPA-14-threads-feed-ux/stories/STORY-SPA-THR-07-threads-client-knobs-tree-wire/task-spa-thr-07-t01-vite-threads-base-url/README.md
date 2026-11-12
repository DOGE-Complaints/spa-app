# SPA-THR-07-T01 — VITE_THREADS_BASE_URL + resolve helper

**Status:** Done  
**Story:** [`../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md`](../STORY-SPA-THR-07-threads-client-knobs-tree-wire.md)  
**Decision Ref:** backlog THR-07 · API_REFERENCE · handoff 04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:30:38Z`
**Completed:** `2026-09-24T07:37:03Z`  
**Package:** `pkg-000083`

## Purpose

Add `VITE_THREADS_BASE_URL` to `.env.example` + resolve helper (`getVitePublicUrl` / assert required when social enabled).

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| `getVitePublicUrl` exists | `spa-app/src/config/publicEnv.js` |
| `.env.example` exists | `spa-app/.env.example` |
| No `VITE_THREADS_BASE_URL` yet | grep pre-scaffold — document on implement |

## AC / DoD

- [x] (P0) `.env.example` documents `VITE_THREADS_BASE_URL` (local `http://127.0.0.1:8001`)
- [x] (P0) Resolve via `publicEnv.js` / `getVitePublicUrl` (assert when social enabled)
- [x] (P0) No invent alternate env keys

## Where to change

- `spa-app/.env.example`
- `spa-app/src/config/publicEnv.js`

## Out of scope

THR-08/09 writes · invent paths · product fetch (T02)

## Verification

```bash
cd spa-app && npm test -- --run src/config
rg -n 'VITE_THREADS_BASE_URL' .env.example src/config/publicEnv.js
```
