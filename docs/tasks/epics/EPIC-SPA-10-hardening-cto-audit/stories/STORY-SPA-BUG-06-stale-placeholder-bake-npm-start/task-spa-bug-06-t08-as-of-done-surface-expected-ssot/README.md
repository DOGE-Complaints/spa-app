# SPA-BUG-06-T08 — As-of-Done Surface + Expected vs Actual SSOT (F3)

**Status:** Done — P6 PASS 2026-08-18T10:35:55Z · F3 **CLOSED**  
**Story:** [`../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-06-execution-2026-08-18.md](../../../../../../analysis/audit-STORY-SPA-BUG-06-execution-2026-08-18.md) §F3  
**Depends on:** SPA-BUG-06-T03 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:30:56Z  
**Gate Date:** 2026-08-18T10:35:55Z  
**Package:** `pkg-000071` **unchanged** · wave `spa_bug_06_audit_2026_08_18`

## Purpose
Doc-only: backlog Surface still `"start"` → `serve -s dist`; pipeline/backlog Expected vs Actual still present-tense pre-fix Actual. Record current start wrapper; keep 2026-08-18 Actual as Historical symptom.

## Risk
Opening BUG-07 (`.env.example` / `railway.toml` comment). Inventing new AC. Product script rewrite.

## Code Facts (re-verify at execute)
- Disk: [`package.json`](../../../../../../../package.json) L10 `"start": "node scripts/start-spa.mjs"`.
- Backlog Surface As-of-Done / Historical: [`STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md).
- Backlog + pipeline Expected vs Actual: Current start wrapper; 2026-08-18 Actual kept as Historical.
- BUG-07 **not** opened this task.

## Gap
Audit F3 Low — persistent backlog/pipeline SSOT vs shipped start contract.

## AC / DoD
- [x] (P0) Backlog Surface As-of-Done: `"start"` → `node scripts/start-spa.mjs`; Historical 2026-08-18: `serve -s dist`.
- [x] (P0) Pipeline + backlog Expected vs Actual: Current start contract; keep 2026-08-18 Actual as Historical symptom.
- [x] (P0) Doc-only. Do **not** open BUG-07 (`.env.example` / `railway.toml` comment).
- [x] (P0) Do not rewrite `pkg-000071`. Do not mix BUG-05/08.
- [x] (P0) Gate `Date:` from `--print-utc-now` after rewrite only.

## Where to change
- [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) Surface · Expected vs Actual
- [`../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) Expected vs Actual / start-contract rows

## Out of scope
Product source; F1 live §8.4 (T06); F2 T01/T02 READMEs (T07); BUG-07/08; git push.

## Verification
```bash
rg -n "serve -s dist|start-spa.mjs|As-of-Done|Historical|Surface|Expected vs Actual" spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md
```
