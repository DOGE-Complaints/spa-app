# SPA-BUG-07-T06 — As-of-Done bullrun table + parent INDEX (F1)

**Status:** Done — P6 PASS 2026-08-18T10:58:18Z · F1 **CLOSED**  
**Story:** [`../STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-07-execution-2026-08-18.md](../../../../../../analysis/audit-STORY-SPA-BUG-07-execution-2026-08-18.md) §F1  
**Depends on:** SPA-BUG-07-T05 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:55:09Z  
**Gate Date:** 2026-08-18T10:58:18Z  
**Package:** `pkg-000072` **unchanged** · wave `spa_bug_07_audit_2026_08_18`

## Purpose
Doc-only: bullrun task table `STORY-SPA-BUG-07` + T01–T05 still `⬜ Todo` · P1.3; parent [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md) L198 still **In Progress** · T01–T05 Todo. Pipeline, backlog story, bugs/INDEX, dashboard, epic, §Актуальная точка already **Done**.

## Risk
Leaving index SSOT at P1.3 Todo after product AC Done. Changing `package.json` `start`. Mixing BUG-05/06/08.

## Code Facts (re-verify at execute)
- Bullrun table T01–T06 **Done**: [`bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md) L846–852.
- Parent INDEX **Done**: [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md) L198.
- Disk `"start"`: [`package.json`](../../../../../../../package.json) L10 `node scripts/start-spa.mjs`.

## Gap
Audit F1 Medium — process SSOT drift (bullrun table + parent INDEX). **CLOSED** this P6.

## AC / DoD
- [x] (P0) Bullrun table `STORY-SPA-BUG-07` + T01–T05 → **Done** · link gate / [run-summary](../../../../../../run-reports/run-summary-20260818-1048-spa-bug-07-p3.md) / [audit](../../../../../../analysis/audit-STORY-SPA-BUG-07-execution-2026-08-18.md).
- [x] (P0) Parent [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md) BUG-07 row → **Done** · T01–T05 Done.
- [x] (P0) Do **not** change `package.json` `start`. Do not mix BUG-05/06/08. Do not reopen HL-02/HL-04.
- [x] (P0) Do not rewrite `pkg-000072`. Gate `Date:` from `--print-utc-now` after rewrite only.

## Where to change
- [`bullrun-launch-index.md`](../../../../../../bullrun-launch-index.md) task table `STORY-SPA-BUG-07` / T01–T05
- [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md) BUG-07 row

## Out of scope
Product source; F2 T01/T02 Code Facts (T07); F3 Surface / Expected vs Actual (T08); git push.

## Verification
```bash
rg -n 'STORY-SPA-BUG-07|SPA-BUG-07-T0' spa-app/docs/tasks/bullrun-launch-index.md
rg -n 'BUG-07' spa-app/docs/tasks/backlog-stories/INDEX.md
rg -n '"start"' spa-app/package.json
```
