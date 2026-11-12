# SPA-BUG-07-T07 — As-of-Done T01/T02 Code Facts (F2)

**Status:** Done — P6 PASS 2026-08-18T10:58:56Z · F2 **CLOSED**  
**Story:** [`../STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-07-execution-2026-08-18.md](../../../../../../analysis/audit-STORY-SPA-BUG-07-execution-2026-08-18.md) §F2  
**Depends on:** SPA-BUG-07-T03 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:55:09Z  
**Gate Date:** 2026-08-18T10:58:56Z  
**Package:** `pkg-000072` **unchanged** · wave `spa_bug_07_audit_2026_08_18`

## Purpose
Doc-only: T01/T02 Code Facts still present-tense (example L56–57 = `vite preview` / runtime L42 stale). Disk: `.env.example` L54–61 three-lane; runtime L42 wrapper + negation. Split As-of-Done vs Historical. Keep T01 reconfirm as T01-era evidence.

## Risk
Present-tense Code Facts contradict disk after T03. Rewriting product scripts / `.env.example` again.

## Code Facts (re-verify at execute)
- T01 present-tense: [`task-spa-bug-07-t01-reconfirm-start-preview-docs-drift/README.md`](../task-spa-bug-07-t01-reconfirm-start-preview-docs-drift/README.md) L18–21.
- T02 present-tense pin files: [`task-spa-bug-07-t02-pin-docs-layer/README.md`](../task-spa-bug-07-t02-pin-docs-layer/README.md) L19.
- T03 already As-of-Done: [`task-spa-bug-07-t03-fix-env-example-runtime-docs/README.md`](../task-spa-bug-07-t03-fix-env-example-runtime-docs/README.md).
- Disk three-lane: [`.env.example`](../../../../../../../.env.example) L54–61 · [`frontend-run-and-environment.md`](../../../../../../runtime-docs/frontend-run-and-environment.md) L42.
- Historical T01 evidence: [`reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md`](../../../../../../run-reports/reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md).

## Gap
Audit F2 Low — persistent task-README SSOT vs shipped three-lane docs. **CLOSED** this P6.

## AC / DoD
- [x] (P0) T01 Code Facts: As-of-Done three-lane / `start-spa.mjs`; Historical: pre-T03 `vite preview` (keep reconfirm note).
- [x] (P0) T02 Code Facts same As-of-Done / Historical split.
- [x] (P0) Do **not** rewrite T01 reconfirm present-tense snapshot. Doc-only. No product source.
- [x] (P0) Do not rewrite `pkg-000072`. Do not mix BUG-05/06/08. Gate `Date:` from `--print-utc-now` after rewrite only.

## Where to change
- [`task-spa-bug-07-t01-reconfirm-start-preview-docs-drift/README.md`](../task-spa-bug-07-t01-reconfirm-start-preview-docs-drift/README.md) §Code Facts
- [`task-spa-bug-07-t02-pin-docs-layer/README.md`](../task-spa-bug-07-t02-pin-docs-layer/README.md) §Code Facts

## Out of scope
Product JSX/scripts; F1 bullrun/INDEX (T06); F3 Surface (T08); git push.

## Verification
```bash
rg -n 'vite preview|start-spa.mjs|As-of-Done|Historical' spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/task-spa-bug-07-t01-reconfirm-start-preview-docs-drift/README.md spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/task-spa-bug-07-t02-pin-docs-layer/README.md
rg -n 'Lane A|start-spa.mjs' spa-app/.env.example
```
