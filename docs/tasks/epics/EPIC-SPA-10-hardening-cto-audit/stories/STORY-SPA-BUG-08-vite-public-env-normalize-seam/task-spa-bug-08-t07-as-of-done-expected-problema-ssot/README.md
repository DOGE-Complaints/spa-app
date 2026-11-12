# SPA-BUG-08-T07 — As-of-Done Expected vs Actual + §Проблема SSOT (F2)

**Status:** Done — P6 PASS 2026-08-18T11:23:15Z · F2 **CLOSED**  
**Story:** [`../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-08-execution-2026-08-18.md](../../../../../../analysis/audit-STORY-SPA-BUG-08-execution-2026-08-18.md) §F2  
**Depends on:** SPA-BUG-08-T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T11:18:17Z  
**Gate Date:** 2026-08-18T11:23:15Z  
**Package:** `pkg-000073` **unchanged** · wave `spa_bug_08_audit_2026_08_18`

## Purpose
Doc-only: pipeline + backlog **Expected vs Actual** still present-tense pre-fix Actual. Pipeline §Проблема still «**Нет** файла `publicEnv.js`». T01/T02 already split — not reworked.

## Risk
Readers treat pre-T03 Actual / «Нет файла publicEnv.js» as current disk. Moving HL-04 fallback into `publicEnv.js`. Mixing BUG-05/06/07.

## Code Facts (re-verify at execute)
- Expected vs Actual Historical + As-of-Done: backlog [`STORY-SPA-BUG-08-….md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) L34–38 · pipeline [`STORY-SPA-BUG-08-….md`](../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) L27–31.
- §Проблема Historical + As-of-Done: pipeline L41–45.
- Seam exists: [`publicEnv.js`](../../../../../../../src/config/publicEnv.js) L10 / L20 / L30.

## Gap
Audit F2 Low — persistent Expected vs Actual + §Проблема SSOT vs shipped seam. **CLOSED** this P6.

## AC / DoD
- [x] (P0) Label Expected vs Actual **Historical** on pipeline + backlog; keep 2026-08-18 Actual as symptom.
- [x] (P0) Pipeline §Проблема inventory → Historical; add As-of-Done current seam (helpers + migrated readers). Symptom «Итог: нет единого reader» → Historical / As-of-Done one-liner.
- [x] (P0) Do **not** re-task T01/T02 unless leftover present-tense. Doc-only. Do not move HL-04 fallback into `publicEnv`. Do not mix BUG-05/06/07.
- [x] (P0) Do not rewrite `pkg-000073`. Gate `Date:` from `--print-utc-now` after rewrite only.

## Where to change
- [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) Expected vs Actual
- [`../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) Expected vs Actual · §Проблема

## Out of scope
Product source; F1 Surface/Repro/Env (T06); git push; T01/T02 rewrite unless leftover present-tense.

## Verification
```bash
rg -n 'Expected vs Actual|Проблема|Historical|As-of-Done|Нет файла' spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-08-vite-public-env-normalize-seam/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md
test -f spa-app/src/config/publicEnv.js && echo 'publicEnv.js exists'
```
