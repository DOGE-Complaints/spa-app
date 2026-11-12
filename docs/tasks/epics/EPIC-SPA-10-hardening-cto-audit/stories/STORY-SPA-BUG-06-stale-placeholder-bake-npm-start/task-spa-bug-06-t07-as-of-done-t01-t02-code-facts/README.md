# SPA-BUG-06-T07 — As-of-Done T01/T02 Code Facts (F2)

**Status:** Done — P6 PASS 2026-08-18T10:35:03Z · F2 **CLOSED**  
**Story:** [`../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-06-execution-2026-08-18.md](../../../../../../analysis/audit-STORY-SPA-BUG-06-execution-2026-08-18.md) §F2  
**Depends on:** SPA-BUG-06-T03 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:30:56Z  
**Gate Date:** 2026-08-18T10:35:03Z  
**Package:** `pkg-000071` **unchanged** · wave `spa_bug_06_audit_2026_08_18`

## Purpose
Doc-only: T01/T02 Code Facts still claim `package.json` L10 `serve -s dist`. Disk L10 is `node scripts/start-spa.mjs` (T03 As-of-Done is correct). Split As-of-Done vs Historical.

## Risk
Leaving present-tense blind `serve` as current contradicts disk and confuses P7. Rewriting product scripts.

## Code Facts (re-verify at execute)
- Disk current: [`package.json`](../../../../../../../package.json) L10 `"start": "node scripts/start-spa.mjs"`.
- T01 As-of-Done / Historical split: [`task-spa-bug-06-t01-reconfirm-placeholder-start/README.md`](../task-spa-bug-06-t01-reconfirm-placeholder-start/README.md) §Code Facts.
- T02 As-of-Done / Historical split: [`task-spa-bug-06-t02-pin-start-dist-provenance/README.md`](../task-spa-bug-06-t02-pin-start-dist-provenance/README.md) §Code Facts.
- T03 As-of-Done already wrapper: [`task-spa-bug-06-t03-fix-classifier-start-spa/README.md`](../task-spa-bug-06-t03-fix-classifier-start-spa/README.md) L21.

## Gap
Audit F2 Low — persistent task-README SSOT vs shipped start wrapper.

## AC / DoD
- [x] (P0) T01 Code Facts As-of-Done: `"start": "node scripts/start-spa.mjs"`; Historical: pre-fix `serve -s dist` (keep in T01 reconfirm note).
- [x] (P0) T02 Code Facts same As-of-Done / Historical split.
- [x] (P0) Doc-only — no product source. Do not mix BUG-07 (`.env.example` / `railway.toml` comment).
- [x] (P0) Do not rewrite `pkg-000071`.
- [x] (P0) Gate `Date:` from `--print-utc-now` after rewrite only.

## Where to change
- [`task-spa-bug-06-t01-reconfirm-placeholder-start/README.md`](../task-spa-bug-06-t01-reconfirm-placeholder-start/README.md) §Code Facts
- [`task-spa-bug-06-t02-pin-start-dist-provenance/README.md`](../task-spa-bug-06-t02-pin-start-dist-provenance/README.md) §Code Facts

## Out of scope
Product JSX/scripts; F1 live §8.4 (T06); F3 Surface (T08); BUG-05/07/08; git push.

## Verification
```bash
rg -n "serve -s dist|start-spa.mjs|As-of-Done|Historical" spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/task-spa-bug-06-t01-reconfirm-placeholder-start/README.md spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/task-spa-bug-06-t02-pin-start-dist-provenance/README.md
rg -n '"start"' spa-app/package.json
```
