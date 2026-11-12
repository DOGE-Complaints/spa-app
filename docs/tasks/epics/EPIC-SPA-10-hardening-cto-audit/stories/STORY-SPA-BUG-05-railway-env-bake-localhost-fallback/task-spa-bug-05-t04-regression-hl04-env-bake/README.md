# SPA-BUG-05-T04 — Regression HL-04 tests + local env-bake

**Status:** Done — P3 PASS 2026-08-16T12:34:58Z  

**Story:** [`../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) FR-BUG-05.4 · FR-BUG-05.6 (local)  
**Depends on:** T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16T12:30:27Z  
**Package:** `pkg-000065`

## Purpose
Regression: HL-04 vitest (PROD throw / DEV fallback) зелёный + local `verify:build:env-bake` green. No gate disable.

## Risk
Fix, который зелёнит bake, но ломает HL-04 fail-fast / DEV fallback tests.

## Code Facts (re-verify at execute)
- HL-04 suite: [`src/auth/__tests__/resolveIdentityServiceUrl.test.js`](../../../../../../../src/auth/__tests__/resolveIdentityServiceUrl.test.js) — PROD throw (L8–18), PROD public URL (L20–27), non-PROD fallback (L29–34), explicit localhost (L36–43).
- Resolver under test: [`src/auth/resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js).
- Bake script: [`scripts/verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs).

## AC / DoD
- [x] (P0) HL-04 vitest (PROD throw / DEV fallback) зелёный → FR-BUG-05.4 · backlog AC #5. `4 passed (4)`
- [x] (P0) Local `verify:build:env-bake` green (public env) → FR-BUG-05.6 (local) · backlog AC #3.
- [x] (P0) Gate not disabled (`railway.toml` still `verify:build:env-bake`). L8 unchanged.

## Where to change
- Tests only if T03 requires extra cases (prefer existing HL-04 suite)
- Do not edit [`railway.toml`](../../../../../../../railway.toml) or weaken `FORBIDDEN_LOCALHOST`

## Out of scope
Node 18→20; HL-06…08; Railway SUCCESS evidence (T05).

## Verification
```bash
cd spa-app
npx vitest run src/auth/__tests__/resolveIdentityServiceUrl.test.js
# public VITE_* set, then:
npm run verify:build:env-bake
rg -n 'verify:build:env-bake' railway.toml
```
