# SPA-REQ9-01-T01 — Resolver + `.env.example` + unit tests

**Status:** Done  
**Story:** [`../STORY-SPA-REQ9-01-vite-identity-base-url.md`](../STORY-SPA-REQ9-01-vite-identity-base-url.md)  
**Decision Ref:** backlog `STORY-SPA-REQ9-01-vite-identity-base-url.md` · REQ-18 · REQ9 R3  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-26T12:06:24Z`  
**Package:** `pkg-000086`

## Purpose

Hard-cut primary env key to `VITE_IDENTITY_BASE_URL` in `.env.example` and `resolveIdentityServiceUrl` (JSDoc/errors/read path). Keep function/local names. Preserve HL-04 PROD fail-fast and non-PROD `:8100` fallback. Update resolver + `publicEnv` vitest fixtures.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| `.env.example` new key only | `spa-app/.env.example` (~L89) — `VITE_IDENTITY_BASE_URL=` |
| Resolver reads **only** new key | `spa-app/src/auth/resolveIdentityServiceUrl.js` — `getVitePublicString('VITE_IDENTITY_BASE_URL', env)` |
| HL-04 semantics preserved | same file — PROD throw / `IDENTITY_SERVICE_DEV_FALLBACK` |
| Tests use new key | `src/auth/__tests__/resolveIdentityServiceUrl.test.js` · `src/config/__tests__/publicEnv.test.js` |
| Consumers import resolver (no direct key) | `identityService.js` · `identityReadyClient.js` · `oauthService.js` |

**Historical (pre-P3):** `.env.example` / resolver / tests used `VITE_IDENTITY_SERVICE_URL`.

## AC / DoD

- [x] (P0) `.env.example` documents `VITE_IDENTITY_BASE_URL` only (no old key) — **AC-SPA-REQ901-01**
- [x] (P0) `resolveIdentityServiceUrl` reads **only** `VITE_IDENTITY_BASE_URL` — **AC-SPA-REQ901-01** · **AC-SPA-REQ901-04**
- [x] (P0) No dual-read / alias of `VITE_IDENTITY_SERVICE_URL`
- [x] (P0) No rename of `resolveIdentityServiceUrl` / `IDENTITY_SERVICE_*` locals
- [x] (P0) Vitest for resolver + `publicEnv` updated to new key — inventory Scope #3
- [x] (P0) PROD blank → fail-fast; non-PROD blank → local identity origin — **AC-SPA-REQ901-04**

## Where to change

- `spa-app/.env.example`
- `spa-app/src/auth/resolveIdentityServiceUrl.js`
- `spa-app/src/auth/__tests__/resolveIdentityServiceUrl.test.js`
- `spa-app/src/config/__tests__/publicEnv.test.js`

## Out of scope

Scripts/bake (T02) · docs/Railway checklist (T03) · story gate (T04) · auth UX · dual-read · drop `VITE_` · rename gateway/threads keys

## Verification

```bash
cd spa-app && npx vitest run src/auth/__tests__/resolveIdentityServiceUrl.test.js src/config/__tests__/publicEnv.test.js
rg -n 'VITE_IDENTITY_SERVICE_URL' spa-app/src spa-app/.env.example || true
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
