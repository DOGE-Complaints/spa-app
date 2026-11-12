# SPA-BUG-06-T05 — Story gate BUG-06 + §8.4 local smoke

**Status:** Done — P3 gate PASS (local scripts) 2026-08-18T10:18:16Z · §8.4 PENDING  

**Story:** [`../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) FR-BUG-06.7 · FR-BUG-06.8e  
**Depends on:** T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:06:59Z  
**Package:** `pkg-000071`

## Purpose
Story acceptance-verification: все 10 AC + local board/login on `npm run dev` **or** matching local bake `start` ([investigation §8.4](../../../../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md)). Closes story.

## Risk
Product Done без §8.4 local evidence оставляет value loop непроверенным.

## Code Facts (re-verify at execute)
- Gate template: [`story-acceptance-gate-template.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md)
- Gate stub: [`acceptance-verification-spa-bug-06.md`](./acceptance-verification-spa-bug-06.md) — **Date** only after live P3 verify.
- Board error slot: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L300 `data-testid="board-load-error"`.
- HL-02 still wired: [`railway.toml`](../../../../../../../railway.toml) L7 `buildCommand = "npm run verify:build:env-bake"`.
- Backlog AC/FR verbatim in pipeline story.

## AC / DoD
- [x] (P0) All 10 backlog AC checkboxes evidenced in gate (9 PASS · AC #9 PENDING).
- [ ] (P0) After intended local lane (`npm run dev` or local `build`+`start`): `#/board` without `board-load-error`; Network issues to `127.0.0.1:8000` or `localhost:8000` **200**; login token **not** to `project.supabase.co` → FR-BUG-06.8e · backlog AC #9. **PENDING** — gateway `:8000` not listening this session; do not invent 200.
- [x] (P0) No new hostname branches in Login/Board → FR-BUG-06.7 · backlog AC #8.
- [x] (P0) No operator passwords / anon JWT in commit or notes → backlog AC #10.
- [x] (P0) Do not reopen HL-02/HL-04; do not scaffold BUG-07/08 or mix BUG-05 in this pkg.

## Where to change
- Fill [`acceptance-verification-spa-bug-06.md`](./acceptance-verification-spa-bug-06.md) after live verify (`--print-utc-now` for Date)
- Sync bullrun / backlog INDEX / dashboard on story Done (P3, not this scaffold)

## Out of scope
Scaffold BUG-07/08 in same pkg; reopen HL-02/HL-04; mix BUG-05; invent Railway id.

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n 'FORBIDDEN_LOCALHOST' spa-app/scripts/verify-build-env-bake.mjs
rg -n 'verify:build:env-bake' spa-app/railway.toml
# After live P3: fill Date from --print-utc-now; §8.4 board/login on npm run dev or matching local bake start
```
