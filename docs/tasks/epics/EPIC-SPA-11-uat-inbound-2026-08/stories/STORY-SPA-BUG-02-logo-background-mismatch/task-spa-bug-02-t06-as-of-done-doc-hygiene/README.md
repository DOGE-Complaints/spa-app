# SPA-BUG-02-T06 — As-of-Done doc hygiene (F1 + F4)

**Status:** Done — P6 PASS 2026-08-07T17:54:24Z · **P7 verified** 2026-08-07T18:03:17Z · F1+F4  
**Story:** [`../STORY-SPA-BUG-02-logo-background-mismatch.md`](../STORY-SPA-BUG-02-logo-background-mismatch.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-02-execution-2026-08-07.md](../../../../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md) §F1 · §F4 · [reaudit](../../../../../../analysis/reaudit-STORY-SPA-BUG-02-gap-closure-2026-08-07.md)  
**Depends on:** SPA-BUG-02-T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T17:44:38Z  
**Package:** `pkg-000054` (unchanged) · `run_mode=spa_bug_02_audit_2026_08_07` **retired**

## Purpose
Привести persistent SSOT в соответствие с As-of-Done после P3/P4: backlog §Verified facts / Expected vs Actual всё ещё present-tense «RGB без alpha» / «Opaque PNG» при disk RGBA; `spa-mvp-dashboard.md` держит BUG-02 в Remaining / open counts (`pkg-000053` wording).

## Risk
Оператор/аудит читают pre-fix RGB как текущее состояние; dashboard занижает progress (BUG-02 как open).

## Code Facts (closed)
- Backlog As-of-Done: current RGBA + historical pre-fix RGB — [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md).
- Pillow P6 re-verify: `mode RGBA`, corners alpha 0.
- Dashboard: BUG-02 removed from Remaining; bugs **2/3** Done; 51/62 ~82% — [`spa-mvp-dashboard.md`](../../../../spa-mvp-dashboard.md).

## AC / DoD
- [x] (P0) Backlog product story: Verified facts / Expected vs Actual — historical pre-fix vs **current** RGBA (no present-tense «RGB без alpha» as live) → F1.
- [x] (P0) `spa-mvp-dashboard.md`: BUG-02 removed from Remaining; bugs **2/3** Done; EPIC-11 / «текущая точка» / Now sync to `pkg-000054` Done → F4.
- [x] (P0) No product SPA code/asset change; gate Date from `--print-utc-now` at close.

## Where to change
- [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md) — done
- [`../../../../spa-mvp-dashboard.md`](../../../../spa-mvp-dashboard.md) — done
- This task `acceptance-verification-spa-bug-02-t06.md` — done

## Out of scope
Footer viewport evidence / gate amend (T07); product PNG/SVG edits; FR narrow.

## Verification
```bash
rg -n "RGB|без alpha|Opaque PNG|mode RGB" spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md
# After fix: historical / pre-fix only; current = RGBA
rg -n "BUG-02|Remaining|pkg-000053|pkg-000054" spa-app/docs/tasks/spa-mvp-dashboard.md
```
