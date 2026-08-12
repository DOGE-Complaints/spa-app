# SPA-BUG-02-T07 — Footer viewport evidence + gate (F2 + F3)

**Status:** Done — P6 PASS 2026-08-07T17:57:43Z · **P7 verified** 2026-08-07T18:03:17Z · F2+F3  
**Story:** [`../STORY-SPA-BUG-02-logo-background-mismatch.md`](../STORY-SPA-BUG-02-logo-background-mismatch.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-02-execution-2026-08-07.md](../../../../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md) §F2 · §F3 · [reaudit](../../../../../../analysis/reaudit-STORY-SPA-BUG-02-gap-closure-2026-08-07.md)  
**Depends on:** SPA-BUG-02-T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T17:44:38Z  
**Package:** `pkg-000054` (unchanged) · `run_mode=spa_bug_02_audit_2026_08_07` **retired**

## Purpose
Закрыть FR-BUG-02.2 / T03–T04 overclaim «header + footer» без footer visual proof: capture **footer logo crops** (board scroll and/or dedicated) **desktop + narrow**; Pillow/sample strip-through corners; evidence note; amend T05 gate FR-02.2 — **PASS only with footer evidence paths**.

## Risk
Gate и AC продолжают звучать как «footer proven» при 0 brand pixels в bottom board shot.

## Code Facts (closed)
- Footer crops desktop+narrow on disk — [`../screenshots/`](../screenshots/) `bug02-footer-logo-crop-*.png`.
- Evidence: [`evidence-…175743Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-footer-2026-08-07T175743Z.md) — inherited surface `#0B1320`; pad `#02091D` count **0**.
- Gate FR-02.2 amended to **PASS** with footer paths — [`acceptance-verification-spa-bug-02.md`](../task-spa-bug-02-t05-story-gate-bug-02/acceptance-verification-spa-bug-02.md).
- Path: **footer evidence** (not FR narrow).

## AC / DoD
- [x] (P0) Footer logo crop(s) on disk for **desktop + narrow**; brand pixels visible → F2.
- [x] (P0) Evidence note: outer corners through transparent pad = Night `#0B1320` (`rgb(11,19,32)`); pre-fix pad absent → F2.
- [x] (P0) T05 gate FR-BUG-02.2 PASS with footer evidence paths attached → F3.
- [x] (P0) No product asset redesign; gate Date from `--print-utc-now` at close.

## Where to change
- [`../screenshots/`](../screenshots/) — done
- [`../../../../../../analysis/evidence-STORY-SPA-BUG-02-footer-2026-08-07T175743Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-footer-2026-08-07T175743Z.md) — done
- [`../task-spa-bug-02-t05-story-gate-bug-02/acceptance-verification-spa-bug-02.md`](../task-spa-bug-02-t05-story-gate-bug-02/acceptance-verification-spa-bug-02.md) — done
- This task `acceptance-verification-spa-bug-02-t07.md` — done

## Out of scope
Backlog/dashboard doc hygiene (T06); FR narrow; token recolor; placeholder icons.

## Verification
```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/screenshots/
rg -n "footer|FR-BUG-02.2|PARTIAL" spa-app/docs/tasks/epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/task-spa-bug-02-t05-story-gate-bug-02/acceptance-verification-spa-bug-02.md
rg -n "footer" spa-app/docs/analysis/evidence-STORY-SPA-BUG-02*
```
