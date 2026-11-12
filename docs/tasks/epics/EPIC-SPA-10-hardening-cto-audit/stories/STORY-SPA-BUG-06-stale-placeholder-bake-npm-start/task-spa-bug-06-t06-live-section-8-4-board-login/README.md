# SPA-BUG-06-T06 — Live §8.4 board/login evidence (F1)

**Status:** Done — BLOCKED 2026-08-18T10:33:43Z · F1 still **OPEN** (gateway `:8000` not listening)  
**Story:** [`../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-06-execution-2026-08-18.md](../../../../../../analysis/audit-STORY-SPA-BUG-06-execution-2026-08-18.md) §F1  
**Depends on:** SPA-BUG-06-T05 Done (local gate)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:30:56Z  
**Gate Date:** 2026-08-18T10:33:43Z  
**Package:** `pkg-000071` **unchanged** · wave `spa_bug_06_audit_2026_08_18`

## Purpose
Close remaining story AC #9 / FR-BUG-06.8e §8.4: after intended local lane, `#/board` without `board-load-error`; Network issues `127.0.0.1:8000` or `localhost:8000` **200**; login token host **not** `project.supabase.co`.

## Risk
Inventing HTTP 200 while gateway is down. Weakening HL-02 `FORBIDDEN_LOCALHOST`. Mixing BUG-05 Railway / BUG-07 docs-lane / BUG-08 env-trim.

## Code Facts (re-verify at execute)
- Gate AC #9 **PENDING**: [`acceptance-verification-spa-bug-06.md`](../task-spa-bug-06-t05-story-gate-bug-06/acceptance-verification-spa-bug-06.md)
- This P6: `curl http://127.0.0.1:8000/tallinn/issues` **fail** http_code **000** (connect refused). Identity `:8100/me` **401**. Leftover `node` LISTEN `*:4173` (not this `start-spa`).
- Wrapper still refuses placeholder: [`start-spa.mjs`](../../../../../../../scripts/start-spa.mjs) · [`package.json`](../../../../../../../package.json) L10 `node scripts/start-spa.mjs`
- HL-02 intact: [`verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs) L7–14 · [`railway.toml`](../../../../../../../railway.toml) L7

## Gap
Audit F1 High — Product Story Done blocked on live value-loop evidence, not a missing start wrapper.

## AC / DoD
- [x] (P0) Stop if gateway `:8000` still down — do **not** invent 200. **BLOCKED** this P6.
- [ ] (P0) After intended local lane (`npm run dev` **or** matching local `build`+`start`): `#/board` without `board-load-error`. **OPEN**
- [ ] (P0) Live `curl` issues `127.0.0.1:8000` or `localhost:8000` **200**. **OPEN**
- [ ] (P0) Login token host **not** `project.supabase.co`. **OPEN** (not probed — gateway down)
- [x] (P0) Do not weaken HL-02 / `railway.toml` `buildCommand`. Do not mix BUG-05/07/08. Do not reopen HL-02/HL-04.
- [x] (P0) Gate `Date:` from `--print-utc-now` after live probe (`2026-08-18T10:33:43Z`)

## Where to change
- [`acceptance-verification-spa-bug-06.md`](../task-spa-bug-06-t05-story-gate-bug-06/acceptance-verification-spa-bug-06.md) AC #9
- This README + `acceptance-verification-spa-bug-06-t06.md`
- Pipeline / backlog §8.4 checkbox

## Out of scope
Invent 200; start-wrapper rewrite; Login/Board hostname branches; BUG-05 Railway id; BUG-07/08; git push.

## Verification
```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8000/tallinn/issues
rg -n "PENDING|board-load-error|project.supabase.co" spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/task-spa-bug-06-t05-story-gate-bug-06/acceptance-verification-spa-bug-06.md
rg -n "FORBIDDEN_LOCALHOST|:8100" spa-app/scripts/verify-build-env-bake.mjs
```
