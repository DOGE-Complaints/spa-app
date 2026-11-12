# SPA-BUG-05-T07 — Sync backlog AC + Nested SSOT (F2)

**Status:** Done — P6 PASS 2026-08-16T12:43:28Z · F2 **CLOSED**  
**Story:** [`../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-05-execution-2026-08-16.md](../../../../../../analysis/audit-STORY-SPA-BUG-05-execution-2026-08-16.md) §F2  
**Depends on:** SPA-BUG-05-T05 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16T12:39:58Z  
**Package:** `pkg-000065` **unchanged** · wave `spa_bug_05_audit_2026_08_16`

## Purpose
Doc-only: sync backlog AC checkboxes + Nested T01–T05 status to pipeline/gate (6/7 PASS · Railway PENDING · T01–T05 Done local).

## Risk
Marking Railway AC Pass in backlog without evidence (F1) recreates SSOT lie.

## Code Facts (closed)
- Backlog AC #1–#6 `[x]` · #7 `[ ]` PENDING: [`STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)
- Nested T01–T05 **Done** (T05 local · Railway PENDING)
- Pipeline/gate unchanged on AC #7 PENDING (T06 BLOCKED)

## AC / DoD
- [x] (P0) Backlog AC #1–#6 `[x]` matching pipeline/gate.
- [x] (P0) Backlog AC #7 remains `[ ]` **PENDING** (T06 no real Railway evidence).
- [x] (P0) Nested T01–T05 Status = Done (local); T05 note Railway PENDING.
- [x] (P0) Do not invent new AC wording.
- [x] (P0) Doc-only.

## Where to change
- [`spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md) §Acceptance Criteria · §Nested tasks

## Out of scope
Invent AC; mark Railway Pass without id; product code; edit stub `spa-backlog-dashboard.md`.

## Verification
```bash
rg -n "^\- \[[ x]\]|T01|T02|T03|T04|T05" spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md
```
