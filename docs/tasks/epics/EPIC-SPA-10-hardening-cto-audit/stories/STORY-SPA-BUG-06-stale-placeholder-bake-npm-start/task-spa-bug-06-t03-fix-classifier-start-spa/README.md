# SPA-BUG-06-T03 — Fix pinned layer (classifier + bake-meta + start-spa)

**Status:** Done — P3 PASS 2026-08-18T10:18:16Z  

**Story:** [`../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) FR-BUG-06.3 · FR-BUG-06.4 · FR-BUG-06.5  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:06:59Z  
**Package:** `pkg-000071`

## Purpose
Fix **pinned** start/bake layer only: classifier SSOT + post-build provenance + `start` wrapper. `package.json` `build`/`start` wired per FR. Keep HL-02 `FORBIDDEN_LOCALHOST` and `railway.toml` `buildCommand`.

## Risk
Ослабление gate / UI hostname branches / commit localhost-`dist` ломает Railway / BUG-05.

## Code Facts (As-of-Done)
- `build` writes bake-meta: [`package.json`](../../../../../../../package.json) `"build": "vite build && node scripts/write-bake-meta.mjs"`.
- `start` wrapper: same file `"start": "node scripts/start-spa.mjs"`.
- Classifier: [`scripts/lib/classifySpaBake.mjs`](../../../../../../../scripts/lib/classifySpaBake.mjs).
- Decision: [`scripts/lib/spaStartDecision.mjs`](../../../../../../../scripts/lib/spaStartDecision.mjs).
- Writer: [`scripts/write-bake-meta.mjs`](../../../../../../../scripts/write-bake-meta.mjs).
- Starter: [`scripts/start-spa.mjs`](../../../../../../../scripts/start-spa.mjs).
- Gate unchanged: [`scripts/verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs) L7–14 `FORBIDDEN_LOCALHOST`; [`railway.toml`](../../../../../../../railway.toml) L7.

## AC / DoD
- [x] (P0) `classifySpaBake` + `write-bake-meta.mjs` + `start-spa.mjs` существуют; `package.json` `build`/`start` wired → FR-BUG-06.3/06.4/06.5 · backlog AC #3.
- [x] (P0) `npm start` на placeholder bake → exit **1**, не silent `:4173` UI fail → backlog AC #4.
- [x] (P0) `npm start` на public bake при local `.env` с localhost gateway/identity → exit **1** → backlog AC #5.
- [x] (P0) Railway-like: public bake, no localhost `.env` → `serve` starts on `${PORT:-4173}` → backlog AC #6.
- [x] (P0) No new hostname branches in Login/Board (`LoginPage` / `BoardPage` / `mapAuthError`) → FR-BUG-06.7.

## Where to change
- New: `spa-app/scripts/lib/classifySpaBake.mjs` (read **already built** `dist/assets/*.js`; kinds `placeholder` / `local` / `public` / `unknown`)
- New: `spa-app/scripts/write-bake-meta.mjs` → `dist/bake-meta.json` (`schema`, `builtAt`, `bakeKind`, hostnames **без** секретов/anon key, `source`)
- New: `spa-app/scripts/start-spa.mjs` (FR-BUG-06.5 exit rules; else spawn `serve -s dist -l tcp://0.0.0.0:${PORT:-4173}`)
- [`package.json`](../../../../../../../package.json) L8/L10 only as FR-BUG-06.4/06.5 (`build` = `vite build && node scripts/write-bake-meta.mjs`; `start` = `node scripts/start-spa.mjs`)

## Out of scope
Patch Login/Board; disable bake gate; commit localhost-`dist`; BUG-07/08; weaken `FORBIDDEN_LOCALHOST`.

## Verification
```bash
cd spa-app
test -f scripts/lib/classifySpaBake.mjs
test -f scripts/write-bake-meta.mjs
test -f scripts/start-spa.mjs
rg -n 'write-bake-meta|start-spa' package.json
# placeholder dist → npm start expect exit 1
# public bake + .env localhost → npm start expect exit 1
```
