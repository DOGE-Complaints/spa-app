# SPA-BUG-07-T08 — As-of-Done Surface + Expected vs Actual SSOT (F3)

**Status:** Done — P6 PASS 2026-08-18T10:59:41Z · F3 **CLOSED**  
**Story:** [`../STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-07-execution-2026-08-18.md](../../../../../../analysis/audit-STORY-SPA-BUG-07-execution-2026-08-18.md) §F3  
**Depends on:** SPA-BUG-07-T03 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T10:55:09Z  
**Gate Date:** 2026-08-18T10:59:41Z  
**Package:** `pkg-000072` **unchanged** · wave `spa_bug_07_audit_2026_08_18`

## Purpose
Doc-only: pipeline + backlog Expected vs Actual still present-tense «Actual (disk 2026-08-18)» pre-fix (`start` = `vite preview`). Backlog Surface still L56–57 / L42 as if unfixed. As-of-Done section already exists on backlog — still need Historical labels + Surface current three-lane.

## Risk
Readers treat pre-fix Actual as current disk. Opening BUG-05/06/08. Changing `package.json` `start`.

## Code Facts (re-verify at execute)
- Backlog Surface still L56–57 / L42: [`STORY-SPA-BUG-07-start-preview-docs-drift.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md) L16 · Expected vs Actual L34–42 · As-of-Done block present.
- Pipeline Expected vs Actual still pre-fix: [`STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md) L30–36.
- Disk three-lane: [`.env.example`](../../../../../../../.env.example) L54–61 · runtime-docs L42 `start-spa.mjs`.

## Gap
Audit F3 Low — persistent backlog/pipeline SSOT vs shipped three-lane docs. **CLOSED** this P6.

## AC / DoD
- [x] (P0) Label Expected vs Actual **Historical** on pipeline + backlog; keep 2026-08-18 Actual as symptom.
- [x] (P0) Backlog Surface → current three-lane + historical cite.
- [x] (P0) Doc-only. Do **not** change `package.json` `start`. Do not mix BUG-05/06/08.
- [x] (P0) Do not rewrite `pkg-000072`. Gate `Date:` from `--print-utc-now` after rewrite only.

## Where to change
- [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md) Surface · Expected vs Actual
- [`../STORY-SPA-BUG-07-start-preview-docs-drift.md`](../STORY-SPA-BUG-07-start-preview-docs-drift.md) Expected vs Actual

## Out of scope
Product source; F1 bullrun/INDEX (T06); F2 T01/T02 READMEs (T07); git push.

## Verification
```bash
rg -n 'Surface|Expected vs Actual|Historical|As-of-Done|vite preview' spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/STORY-SPA-BUG-07-start-preview-docs-drift.md
```
