# SPA-BUG-08-T02 — Pin: config seam (not UI, not H6)

**Status:** Done — P3 PASS 2026-08-18T11:09:52Z  
**Story:** [`../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) Pin rules  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T11:05:39Z  
**Package:** `pkg-000073`

## Purpose
Formalize pin = SPA config seam (mixed trim / no-trim / `/` vs `/+$/`). Prefer one `publicEnv` (+ `normalizePublicBaseUrl`). Not UI, not H6, not LoginPage trim.

## Risk
Fix on LoginPage / copy `trim()` into every remaining file = spaghetti; pin bake/H6 reopens BUG-06.

## Code Facts (re-verify at execute)

**Historical** (T02 pin `2026-08-18T11:09:52Z`, pre-T03): mixed dialect; `publicEnv.js` absent.

**As-of-Done / Current** (T03 `2026-08-18T11:11:32Z`):
- Seam: [`publicEnv.js`](../../../../../../../src/config/publicEnv.js) L10–31.
- Identity fallback **still** in resolver: [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) L8–10.

## Pin note (FR-BUG-08 pin rules)

Pinned layer = **SPA config seam**. Prefer one `publicEnv` + `normalizePublicBaseUrl`. Operator `.env` hygiene is necessary but **insufficient**. Trim inside LoginPage = **forbidden**. Anti-pattern: copy `trim()` into every remaining file. Do **not** pin H6 / bake / `start-spa.mjs`.

## AC / DoD
- [x] (P0) Pin note in task README / gate: config seam vs UI vs H6 → backlog pin rules.
- [x] (P0) Do **not** trim inside LoginPage. Do not copy `trim()` into every remaining file. Do not pin bake/H6.

## Where to change
- Pin note in this README / T05 gate.
- No product code in T02.

## Out of scope
Trim inside LoginPage; copy `trim()` everywhere; pin bake/H6; move HL-04 fallback into `publicEnv.js`; BUG-06/07 product.

## Verification
```bash
rg -n 'normalizePublicBaseUrl' spa-app/src/config/publicEnv.js spa-app/src/repositories/GatewayIssueRepository.js
rg -n 'IDENTITY_SERVICE_DEV_FALLBACK' spa-app/src/config/publicEnv.js spa-app/src/auth/resolveIdentityServiceUrl.js
```
