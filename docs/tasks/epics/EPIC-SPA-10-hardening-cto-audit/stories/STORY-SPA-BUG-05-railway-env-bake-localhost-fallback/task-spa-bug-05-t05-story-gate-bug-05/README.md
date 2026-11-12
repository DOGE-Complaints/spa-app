# SPA-BUG-05-T05 — Story gate BUG-05 + Railway SUCCESS evidence

**Status:** Done — P3 gate PASS (local) 2026-08-16T12:34:58Z · Railway SUCCESS PENDING  

**Story:** [`../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) FR-BUG-05.5 · FR-BUG-05.6  
**Depends on:** T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16T12:30:27Z  
**Package:** `pkg-000065`

## Purpose
Story acceptance-verification: все 7 AC + Railway spa-app tallinn-demo **SUCCESS** (deployment id + gate ok line) или documented operator redeploy evidence. Closes story.

## Risk
Product Done без Railway evidence оставляет ship path непроверенным.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)
- Gate stub: [`acceptance-verification-spa-bug-05.md`](./acceptance-verification-spa-bug-05.md) — **Date** only after live P3 verify.
- HL-02 still wired: [`railway.toml`](../../../../../../../railway.toml) L8 `buildCommand = "npm run verify:build:env-bake"`.
- Backlog AC/FR verbatim in pipeline story.

## AC / DoD
- [x] (P0) Local AC evidenced in gate (6/7 PASS). Railway SUCCESS **PENDING** — no operator deploy/push this phase; no invented deployment id.
- [x] (P0) `railway.toml` всё ещё `verify:build:env-bake` → FR-BUG-05.5 · backlog AC #6.
- [ ] (P0) Railway spa-app tallinn-demo deployment **SUCCESS** после fix tip (evidence: deployment id + gate ok line) → FR-BUG-05.6 · backlog AC #7. **Not Pass** — needs operator redeploy.
- [x] (P0) Do not reopen HL-02/HL-04; do not scaffold next story in this pkg.

## Where to change
- Fill [`acceptance-verification-spa-bug-05.md`](./acceptance-verification-spa-bug-05.md) after live verify (`--print-utc-now` for Date)
- Sync bullrun / backlog INDEX / dashboard on story Done (P3, not this scaffold)

## Out of scope
Scaffold next story in same pkg; reopen HL-02/HL-04; disable bake gate.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n 'verify:build:env-bake' spa-app/railway.toml
# After live P3: fill Date from --print-utc-now; attach Railway deployment id + gate ok line
```
