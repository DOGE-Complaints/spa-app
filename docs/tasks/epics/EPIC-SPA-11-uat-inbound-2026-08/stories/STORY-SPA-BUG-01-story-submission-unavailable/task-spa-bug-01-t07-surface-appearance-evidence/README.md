# SPA-BUG-01-T07 — Surface appearance evidence (F2 + F4)

**Status:** Done — P6 PASS 2026-08-07T11:18:08Z · F2+F4 · path `fr_ac_narrow` · **P7 verified** ([reaudit](../../../../../../analysis/reaudit-STORY-SPA-BUG-01-gap-closure-2026-08-07.md))  
**Story:** [`../STORY-SPA-BUG-01-story-submission-unavailable.md`](../STORY-SPA-BUG-01-story-submission-unavailable.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-01-execution-2026-08-07.md](../../../../../../analysis/audit-STORY-SPA-BUG-01-execution-2026-08-07.md) §F2 · §F4  
**Depends on:** SPA-BUG-01-T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T11:10:12Z  
**Package:** `pkg-000053` (unchanged) · `run_mode=spa_bug_01_audit_2026_08_07`

## Purpose
Закрыть overclaim FR-BUG-01.3/01.4 «story ровно 1× на заявленной поверхности» / «single appearance»: либо live evidence `story_id` один раз на board/cabinet/profile после Submit 202, либо явное сужение FR/AC wording + gate PARTIAL→documented scope.

## Risk
Gate/AC продолжают звучать как «board card proven» при `board_after.new_story_visible: null`.

## Code Facts (closed)
- Path chosen: **FR/AC narrow** — [`evidence-…T111808Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-surface-scope-t07-2026-08-07T111808Z.md).
- Prior submit: POST **202** + `navigated-away`; `board_after.new_story_visible: null` — [`evidence-…104447Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-07T104447Z.md).
- Writer: [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx) L117–120; readers = 0 → [BUG-03](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-03-post-submit-story-feedback.md).

## AC / DoD
- [x] (P0) FR/AC + gate wording narrowed: «claimed surface» = leave-handoff HTTP success → F2 · F4.
- [x] (P0) No secrets / raw Bearer; evidence YAML under `docs/analysis/`.
- [x] (P0) Gate matrix updated to PASS with narrowed scope.
- [x] (P0) Gate Date from `--print-utc-now` at close.

## Where to change
- [`evidence-…T111808Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-surface-scope-t07-2026-08-07T111808Z.md) — done
- Backlog + pipeline FR/AC — done
- Gate `acceptance-verification-spa-bug-01.md` — done
- This task acceptance — done

## Out of scope
Implement profile/cabinet reader for `submittedStoryId` → [BUG-03](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-03-post-submit-story-feedback.md); T06 doc hygiene.

## Verification
```bash
rg -n "new_story_visible|story_id|board_after|fr_ac_narrow" spa-app/docs/analysis/evidence-STORY-SPA-BUG-01*
```
