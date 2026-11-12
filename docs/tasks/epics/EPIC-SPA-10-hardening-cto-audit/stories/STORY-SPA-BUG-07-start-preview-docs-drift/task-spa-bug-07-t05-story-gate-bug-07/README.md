# SPA-BUG-07-T05 — Story gate BUG-07

**Status:** Done — P3 gate PASS 2026-08-18T10:48:03Z  
**Story:** [`../STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md) FR-BUG-07.5 · all AC  
**Depends on:** T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:43:15Z  
**Package:** `pkg-000072`

## Purpose
Story acceptance-verification: все 6 AC. Closes story. Date only after live P3 verify (`--print-utc-now`).

## Risk
Product Done while `.env.example` still names `start` as `vite preview`, or HL-02/`railway.toml` rewritten.

## Code Facts (re-verify at execute)
- Gate: [`acceptance-verification-spa-bug-07.md`](./acceptance-verification-spa-bug-07.md) Date `2026-08-18T10:48:03Z`.
- HL-02 still wired: [`railway.toml`](../../../../../../../railway.toml) L7 `buildCommand = "npm run verify:build:env-bake"` · L3 serve comment.
- `FORBIDDEN_LOCALHOST`: [`verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs) L7–14.
- `package.json` L10 still `node scripts/start-spa.mjs` (not `vite preview`).

## AC / DoD
- [x] (P0) All 6 backlog AC checkboxes evidenced in gate.
- [x] (P0) deploy-guide / railway.toml not rewritten against DEPLOY-02 → FR-BUG-07.5 · backlog AC #5.
- [x] (P0) No `FORBIDDEN_LOCALHOST` / `railway.toml` `buildCommand` changes → backlog AC #6.
- [x] (P0) Do not mix BUG-05/06/08; do not reopen HL-02/HL-04; no product JSX.

## Where to change
- Fill [`acceptance-verification-spa-bug-07.md`](./acceptance-verification-spa-bug-07.md) after live P3 verify (`--print-utc-now` for Date)
- Sync bullrun / backlog INDEX / dashboard on story Done (P3, not this scaffold)

## Out of scope
Mix BUG-05/06/08; reopen HL-02/HL-04; product JSX.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n 'FORBIDDEN_LOCALHOST' spa-app/scripts/verify-build-env-bake.mjs
rg -n 'verify:build:env-bake' spa-app/railway.toml
```
