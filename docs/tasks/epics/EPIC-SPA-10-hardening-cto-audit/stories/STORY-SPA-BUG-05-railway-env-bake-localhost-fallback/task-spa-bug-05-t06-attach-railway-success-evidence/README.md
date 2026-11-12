# SPA-BUG-05-T06 — Attach Railway SUCCESS evidence (F1)

**Status:** Done — BLOCKED 2026-08-16T12:43:28Z · F1 still **OPEN** (no post-fix Railway SUCCESS)  
**Story:** [`../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-05-execution-2026-08-16.md](../../../../../../analysis/audit-STORY-SPA-BUG-05-execution-2026-08-16.md) §F1  
**Depends on:** SPA-BUG-05-T05 Done (local gate)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16T12:39:58Z  
**Package:** `pkg-000065` **unchanged** · wave `spa_bug_05_audit_2026_08_16`

## Purpose
Attach Railway spa-app tallinn-demo **SUCCESS** evidence (deployment id + bake `ok: no localhost` line) to T05 gate / run-summary / pipeline. Closes FR-BUG-05.6 / backlog AC #7 / audit F1.

## Risk
Invented deployment id falsely closes Product Story Done.

## Code Facts (re-verify at execute)
- Gate Railway AC **PENDING**, no post-fix id: [`acceptance-verification-spa-bug-05.md`](../task-spa-bug-05-t05-story-gate-bug-05/acceptance-verification-spa-bug-05.md)
- HL-02 still wired: [`railway.toml`](../../../../../../../railway.toml) L8 `buildCommand = "npm run verify:build:env-bake"`
- Resolver DCE on disk: [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) L6–8
- Railway MCP (P6 live, not invented): spa-app `fbea2555-dea2-4d9a-9ce9-80e432f15836` · env tallinn-demo `297a80a7-9fc9-4049-98a8-1b0d12799fac`
  - Latest **SUCCESS** still `eda23243-ba9c-4548-8acb-4ee92360ff1b` · commit `072ae20` · 2026-08-09T13:20:21Z (**pre-fix** — do not treat as F1 close)
  - Later tips **FAILED**: `ff982742` (`ef9ad07`) · `281c00dd` (`16b4473`) · `6f9c2b58` (`9f38462`)
  - **No** spa-app deployment created after P3 fix (2026-08-16). No operator push/redeploy this P6.

## AC / DoD
- [x] (P0) Gate AC #7 remains **PENDING** — no operator deploy; id **not invented**.
- [x] (P0) Do **not** invent deployment id.
- [x] (P0) Do **not** disable HL-02 bake gate / `railway.toml` buildCommand.
- [x] (P0) Do **not** reopen HL-02 / HL-04.
- [x] (P0) Doc-only this task (no product patch).

## Where to change
- [`acceptance-verification-spa-bug-05.md`](../task-spa-bug-05-t05-story-gate-bug-05/acceptance-verification-spa-bug-05.md) — T06 BLOCKED note
- This README + [`acceptance-verification-spa-bug-05-t06.md`](./acceptance-verification-spa-bug-05-t06.md)
- P6 run-summary

## Out of scope
Invent id; disable `verify:build:env-bake`; product code; new story; `railway redeploy` / push.

## Verification
```bash
rg -n "deployment|SUCCESS|PENDING|BLOCKED" spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback/task-spa-bug-05-t05-story-gate-bug-05/acceptance-verification-spa-bug-05.md
rg -n 'verify:build:env-bake' spa-app/railway.toml
```
