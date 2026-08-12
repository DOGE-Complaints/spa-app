# SPA-BUG-01-T06 — As-of-Done doc hygiene (F1 + F7)

**Status:** Done — P6 PASS 2026-08-07T11:17:07Z · F1+F7 · **P7 verified** ([reaudit](../../../../../../analysis/reaudit-STORY-SPA-BUG-01-gap-closure-2026-08-07.md))  
**Story:** [`../STORY-SPA-BUG-01-story-submission-unavailable.md`](../STORY-SPA-BUG-01-story-submission-unavailable.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-01-execution-2026-08-07.md](../../../../../../analysis/audit-STORY-SPA-BUG-01-execution-2026-08-07.md) §F1 · §F7  
**Depends on:** SPA-BUG-01-T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T11:10:12Z  
**Package:** `pkg-000053` (unchanged) · `run_mode=spa_bug_01_audit_2026_08_07`

## Purpose
Привести persistent SSOT в соответствие с As-of-Done после P3/P4: stale present-tense Code Facts в T03 и drift `spa-mvp-dashboard.md` (BUG-01 всё ещё в Remaining как open P0).

## Risk
Оператор/аудит читают pre-fix `/ready schema=false` как текущее состояние; dashboard занижает progress.

## Code Facts (closed)
- T03 Code Facts: historical pre-fix vs current post–DRAFT-07 — [`task-spa-bug-01-t03-fix-pinned-layer/README.md`](../task-spa-bug-01-t03-fix-pinned-layer/README.md).
- Live `/ready` re-verified P6: `checks.schema=true`.
- Dashboard: BUG-01 removed from Remaining; bugs 1/3 Done — [`spa-mvp-dashboard.md`](../../../../spa-mvp-dashboard.md).

## AC / DoD
- [x] (P0) T03 Code Facts: historical pre-fix vs current post-DRAFT-07 (no present-tense `schema=false` as live) → F1.
- [x] (P0) `spa-mvp-dashboard.md`: BUG-01 removed from Remaining / counts / «текущая точка» sync to Done → F7.
- [x] (P0) No product SPA code change; gate Date from `--print-utc-now` at close.

## Where to change
- `task-spa-bug-01-t03-fix-pinned-layer/README.md` (Code Facts only) — done
- `spa-app/docs/tasks/spa-mvp-dashboard.md` — done
- This task `acceptance-verification-spa-bug-01-t06.md` — done

## Out of scope
Surface appearance evidence (T07); wiring `submittedStoryId` (BUG-03); FE product fix.

## Verification
```bash
rg -n "schema=false|schema:false" spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-01-story-submission-unavailable/task-spa-bug-01-t03-fix-pinned-layer/README.md
# After fix: only historical / pre-fix wording, not current live claim
rg -n "BUG-01" spa-app/docs/tasks/spa-mvp-dashboard.md
```
