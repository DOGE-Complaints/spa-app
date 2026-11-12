# SPA-BUG-08-T05 — Story gate BUG-08

**Status:** Done — P3 gate PASS 2026-08-18T11:11:32Z  
**Story:** [`../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) all AC · FR-BUG-08.8  
**Depends on:** T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T11:05:39Z  
**Package:** `pkg-000073`

## Purpose
Story acceptance-verification: все 7 AC. Closes story. Date after live P3 verify.

## Risk
Product Done while `publicEnv.js` missing, HL-04 fallback moved, or BUG-06 scripts rewritten in this pkg.

## Code Facts (re-verify at execute)
- Gate: [`acceptance-verification-spa-bug-08.md`](./acceptance-verification-spa-bug-08.md) Date `2026-08-18T11:11:32Z`.
- HL-04 still in resolver: [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) L8–10 · L27–30.
- BUG-06 `start` still wrapper: [`package.json`](../../../../../../../package.json) L10.
- `.env.example` L30 hygiene warning.

## AC / DoD
- [x] (P0) All 7 backlog AC checkboxes evidenced in gate.
- [x] (P0) FR-BUG-08.8: no Login/Board hostname branches; no HL-02 changes.
- [x] (P0) `.env.example` L30 still warns.
- [x] (P0) BUG-06 start/bake scripts out of this PR unless already landed separately → backlog AC #7.
- [x] (P0) Do not mix BUG-05/06/07; do not reopen HL-02/HL-04; do not move HL-04 fallback into `publicEnv.js`.

## Where to change
- Fill gate after live P3 verify — done
- Sync bullrun / backlog INDEX / dashboard on story Done

## Out of scope
Mix BUG-05/06/07; reopen HL-02/HL-04.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
test -f spa-app/src/config/publicEnv.js
rg -n 'IDENTITY_SERVICE_DEV_FALLBACK' spa-app/src/auth/resolveIdentityServiceUrl.js
rg -n '"start"' spa-app/package.json
```
