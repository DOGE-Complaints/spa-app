# SPA-BUG-08-T04 — Regression: normalize tests + HL-04 + rg

**Status:** Done — P3 PASS 2026-08-18T11:11:32Z  
**Story:** [`../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) FR-BUG-08.7  
**Depends on:** T03  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T11:05:39Z  
**Package:** `pkg-000073`

## Purpose
Regression: unit tests for `normalizePublicBaseUrl` (space, trailing slashes, empty); existing GatewayIssueRepository trailing-space test still green; HL-04 vitest still green; `rg` product `src/` has no remaining `import.meta.env.VITE_GATEWAY_BASE_URL` outside `publicEnv.js`.

## Risk
Failing the gate on `__tests__` stubs or MOCK_MODE readers; rewriting start/bake.

## Code Facts (re-verify at execute)
- New: [`publicEnv.test.js`](../../../../../../../src/config/__tests__/publicEnv.test.js) · [`supabaseClient.publicEnv.test.js`](../../../../../../../src/auth/__tests__/supabaseClient.publicEnv.test.js)
- GatewayIssueRepository L19 still green; HL-04 4/4 green.
- Full `npm run test:run`: **128 files / 563 passed | 2 skipped**.
- `rg import.meta.env.VITE_GATEWAY_BASE_URL` in `src/` → **no hits** (helpers use `env?.[key]`).

## AC / DoD
- [x] (P0) New unit tests cover space + slash class → FR-BUG-08.7 · backlog AC #5.
- [x] (P0) Identity HL-04 vitest (PROD throw / DEV fallback) still green → backlog AC #4.
- [x] (P0) `rg` product `src/` (exclude `publicEnv.js` and `__tests__` if they stub): no raw `import.meta.env.VITE_GATEWAY_BASE_URL` → backlog AC #3.
- [x] (P0) Existing GatewayIssueRepository L19 still green; supabase trimmed URL when stubbed with trailing space.
- [x] (P0) Do **not** fail on `__tests__` stubs or MOCK_MODE readers. Do not rewrite start/bake.

## Where to change
- `src/config/__tests__/publicEnv.test.js` + supabase stub coverage — done

## Out of scope
Fail on `__tests__` stubs; fail on MOCK_MODE readers; rewrite start/bake; reopen HL-02/HL-04 policy.

## Verification
```bash
cd spa-app && npm run test:run -- src/config/__tests__/publicEnv.test.js src/repositories/__tests__/GatewayIssueRepository.test.js src/auth/__tests__/resolveIdentityServiceUrl.test.js
rg -n 'import\.meta\.env\.VITE_GATEWAY_BASE_URL' spa-app/src --glob '!**/__tests__/**'
```
