# SPA-BUG-05-T01 — Reconfirm env-bake fail + optional dist needle

**Status:** Done — P3 PASS 2026-08-16T12:34:58Z  

**Story:** [`../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) FR-BUG-05.1 · Diagnostic playbook A  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16T12:30:27Z  
**Package:** `pkg-000065`

## Purpose
Короткий **reconfirm**: `verify:build:env-bake` с public `VITE_*` воспроизводит needle `localhost:8100` (или note «superseded by Railway logs + investigation»). Не полный rediscovery.

## Risk
P3 без локального/документированного reconfirm чинит не тот слой.

## Code Facts (re-verify at execute)
- Gate script: [`scripts/verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs) `FORBIDDEN_LOCALHOST` incl. `localhost:8100` (L7–14); fail L79–80 `localhost URLs baked into bundle`.
- Railway entry: [`railway.toml`](../../../../../../../railway.toml) L8 `buildCommand = "npm run verify:build:env-bake"`.
- npm alias: [`package.json`](../../../../../../../package.json) `verify:build:env-bake`.
- Pre-satisfied diagnosis: [`railway-spa-app-build-failure-investigation-2026-08-16.md`](../../../../../../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md) H1 CONFIRMED.

## AC / DoD
- [x] (P0) Evidence / reconfirm note (или явная ссылка на investigation + local scan) существует → FR-BUG-05.1 · backlog AC #1. Note: [`../../../../run-reports/reconfirm-spa-bug-05-env-bake-2026-08-16.md`](../../../../run-reports/reconfirm-spa-bug-05-env-bake-2026-08-16.md)
- [x] (P0) Pre-fix expect: exit 1 + `contains localhost:8100` **or** documented superseded-by-investigation note. Local: 255 modules · `index-Bu0Q4772.js: contains localhost:8100`

## Where to change
- Evidence note under `spa-app/docs/analysis/` or `spa-app/docs/tasks/run-reports/` (local scan / Railway log cite)
- No product code

## Out of scope
Full rediscovery; change Railway Variables; product fix (T03).

## Verification
```bash
cd spa-app
# Set public (non-localhost) VITE_GATEWAY_BASE_URL, VITE_IDENTITY_SERVICE_URL,
# VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_STORY_GPT_URL — then:
npm run verify:build:env-bake
# Expect (pre-fix): exit 1 + "contains localhost:8100"
# Optional: rg -n 'localhost:8100' dist/assets/*.js
```
