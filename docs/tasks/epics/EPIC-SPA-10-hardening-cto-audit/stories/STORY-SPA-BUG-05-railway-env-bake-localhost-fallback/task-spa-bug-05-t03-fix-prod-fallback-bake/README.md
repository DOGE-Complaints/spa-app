# SPA-BUG-05-T03 — Fix pinned SPA layer (prod fallback bake)

**Status:** Done — P3 PASS 2026-08-16T12:34:58Z  

**Story:** [`../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) FR-BUG-05.3 · Diagnostic playbook B  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16T12:30:27Z  
**Package:** `pkg-000065`

## Purpose
Fix **pinned** SPA layer only: после public-env bake **нет** forbidden localhost needles в `dist/assets/*.js`; gate печатает `ok: no localhost; …`. Сохранить HL-04 PROD fail-fast и HL-02 gate.

## Risk
Ослабление gate или откат HL-04 throw снова ломает ship / fail-fast.

## Code Facts (As-of-Done)

1. **As-of-Done / Current:** [`src/auth/resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) L6–8 `export const IDENTITY_SERVICE_DEV_FALLBACK = import.meta.env.PROD ? '' : 'http://localhost:8100'`; L26–29 HL-04 PROD throw kept.
2. **Historical** (pre-T03): module-level L2 literal `IDENTITY_SERVICE_DEV_FALLBACK = 'http://localhost:8100'` — **not** current.
3. Callers keep `resolveIdentityServiceUrl()`: [`identityService.js`](../../../../../../../src/auth/identityService.js) L4 · [`oauthService.js`](../../../../../../../src/auth/oauthService.js) L6 · [`identityReadyClient.js`](../../../../../../../src/auth/identityReadyClient.js) L3.
4. Gate must stay: [`railway.toml`](../../../../../../../railway.toml) L8 · [`verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs) L88 success line `ok: no localhost; …`.

## AC / DoD
- [x] (P0) `npm run verify:build:env-bake` с public env → exit **0** → FR-BUG-05.3 · backlog AC #3. Line: `ok: no localhost; gateway/identity/supabase/gpt URLs present in bundle`
- [x] (P0) `rg`/`scan`: no `localhost:8100` / `127.0.0.1:8100` in `dist/assets/*.js` → backlog AC #4. Post-fix chunk `index-3Fbc_xg4.js`.
- [x] (P0) HL-04 PROD throw preserved (no rollback of missing/blank URL throw). See T04 4/4.

## Where to change
- [`src/auth/resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) — pinned layer only
- Prefer small fix surface so prod dist does not bake the fallback literal

## Out of scope
Weaken `FORBIDDEN_LOCALHOST`; bare `npm run build`; rollback HL-04 throw; Node 18→20; Railway Variables.

## Verification
```bash
cd spa-app
# public VITE_* set, then:
npm run verify:build:env-bake
# Expect (post-fix): exit 0 + "ok: no localhost;"
rg -n 'localhost:8100|127.0.0.1:8100' dist/assets/*.js
```
