# SPA-BUG-05-T02 — Pin resolver fallback bake

**Status:** Done — P3 PASS 2026-08-16T12:34:58Z  

**Story:** [`../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) FR-BUG-05.2 · Diagnostic playbook B  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16T12:30:27Z  
**Package:** `pkg-000065`

## Purpose
Formalize pin = `resolveIdentityServiceUrl.js` fallback string bake. H1 already CONFIRMED — write pin note in task README / gate (не env, не Node, не flake).

## Risk
Fix на неверном слое (gate disable / Railway Variables) ломает HL-02.

## Code Facts (As-of-Done)

1. **As-of-Done / Current:** [`src/auth/resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) L6–8 `export const IDENTITY_SERVICE_DEV_FALLBACK = import.meta.env.PROD ? '' : 'http://localhost:8100'`; L26–29 PROD throw; L31–32 non-PROD return fallback.
2. **Historical** (pre-T03 pin): module-level L2 literal `IDENTITY_SERVICE_DEV_FALLBACK = 'http://localhost:8100'` (present-tense L2 literal is **not** current).
3. Module-load callers still use `resolveIdentityServiceUrl()`: [`identityService.js`](../../../../../../../src/auth/identityService.js) L3–4 · [`oauthService.js`](../../../../../../../src/auth/oauthService.js) L4–6 · [`identityReadyClient.js`](../../../../../../../src/auth/identityReadyClient.js) L1–3.
4. Gate forbids needle: [`scripts/verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs) L7–14, L67–80.
5. H1 CONFIRMED: [`railway-spa-app-build-failure-investigation-2026-08-16.md`](../../../../../../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md).

## AC / DoD
- [x] (P0) Pin layer = SPA resolver / fallback bake (зафиксирован в gate note) → FR-BUG-05.2 · backlog AC #2.
- [x] (P0) Pin rules recorded: do not disable bake gate; do not weaken `FORBIDDEN_LOCALHOST`; do not «fix» Variables.

## Pin (P3)

| Observation | Pin layer | Fix direction |
|-------------|-----------|---------------|
| Public env OK + vite OK + dist contains `localhost:8100` from `IDENTITY_SERVICE_DEV_FALLBACK` | **SPA product source** [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) | DCE localhost literal in **prod** dist (`import.meta.env.PROD`) **without** weakening HL-02 gate and **without** rolling back HL-04 PROD throw |
| Gate disabled / `buildCommand` → bare `npm run build` | Deploy config anti-pattern | **Forbidden** |
| Change Railway VITE to localhost | Env | **Not** the cause |

H1 CONFIRMED (investigation + T01 local). H2–H10 not root.

## Where to change
- Pin note in this README and/or T05 gate (docs only)
- No product code in T02

## Out of scope
Pin env / Node / flake; disable gate; product fix (T03).

## Verification
```bash
rg -n "IDENTITY_SERVICE_DEV_FALLBACK|localhost:8100" spa-app/src/auth/resolveIdentityServiceUrl.js
rg -n "FORBIDDEN_LOCALHOST|localhost:8100" spa-app/scripts/verify-build-env-bake.mjs
```
