# SPA-BUG-06-T04 — Regression bake-kind refuse/allow + HL-02 intact

**Status:** Done — P3 PASS 2026-08-18T10:18:16Z  

**Story:** [`../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) FR-BUG-06.6 · FR-BUG-06.8 a–d  
**Depends on:** T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:06:59Z  
**Package:** `pkg-000071`

## Purpose
Script-level regression: (a) placeholder refuse · (b) public×local `.env` refuse · (c) public no-localhost allow (Railway-like) · (d) local bake after `npm run build` from local `.env` allow. HL-02 intact.

## Risk
Fix, который зелёнит local `start`, но ослабляет `FORBIDDEN_LOCALHOST` / `railway.toml` `buildCommand`.

## Code Facts (re-verify at execute)
- Gate script: [`scripts/verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs) L7–14 `FORBIDDEN_LOCALHOST`.
- Railway: [`railway.toml`](../../../../../../../railway.toml) L7 `buildCommand = "npm run verify:build:env-bake"`.
- T03 scripts (after T03): `scripts/lib/classifySpaBake.mjs` · `scripts/write-bake-meta.mjs` · `scripts/start-spa.mjs`.
- Prefer script-level tests over UI hostname checks.

## AC / DoD
- [x] (P0) (a) placeholder `dist` → `npm start` exit 1 → FR-BUG-06.8a · backlog AC #4.
- [x] (P0) (b) public bake + `.env` with localhost → exit 1 → FR-BUG-06.8b · backlog AC #5.
- [x] (P0) (c) public bake without localhost `.env` (Railway-like) → serve starts → FR-BUG-06.8c · backlog AC #6.
- [x] (P0) (d) local bake after `npm run build` from local `.env` → serve starts → FR-BUG-06.8d.
- [x] (P0) `rg` `FORBIDDEN_LOCALHOST` still present; `railway.toml` still `verify:build:env-bake` → FR-BUG-06.6 · backlog AC #7.

## Where to change
- Tests for classifier / `start-spa.mjs` (script-level preferred)
- Do **not** edit [`railway.toml`](../../../../../../../railway.toml) or weaken `FORBIDDEN_LOCALHOST`

## Out of scope
UI hostname checks as primary; skip HL-02; local board/login smoke (T05 §8.4).

## Verification
```bash
rg -n 'FORBIDDEN_LOCALHOST' spa-app/scripts/verify-build-env-bake.mjs
rg -n 'verify:build:env-bake' spa-app/railway.toml
# script-level: placeholder refuse · public×local .env refuse · Railway-like allow · local bake allow
```
