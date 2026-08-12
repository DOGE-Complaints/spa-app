# SPA-ID-14-T08 — As-of-Done backlog SSOT (F1)

**Status:** Done — P6 PASS 2026-08-07T20:25:53Z · F1  
**Story:** [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md)  
**Decision Ref:** [audit-STORY-SPA-ID-14-execution-2026-08-07.md](../../../../../../analysis/audit-STORY-SPA-ID-14-execution-2026-08-07.md) §F1  
**Depends on:** SPA-ID-14-T07  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T20:22:51Z  
**Package:** `pkg-000055` (unchanged) · `run_mode=spa_id_14_audit_2026_08_07`

## Purpose
Привести persistent SSOT в соответствие с As-of-Done после P3/P4: backlog (и pipeline story при том же дрейфе) §Зачем / §Gap / §Verified facts всё ещё present-tense «live navigate to profile» / «Live skip State F» при disk `SUBMITTED` без auto-navigate.

## Risk
Оператор/аудит читают pre-fix auto-profile navigate как текущее состояние; Done AC противоречит тексту SSOT.

## Code Facts (closed)
- Live after 202: `setSubmissionId` + `setPhase(SUBMITTED)`; **no** success `navigate('/profile', { submittedStoryId })` — [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx) L115–124.
- Backlog + pipeline: **As-of-Done** vs **Historical (pre-ID-14)** — no present-tense live skip as current.

## AC / DoD
- [x] (P0) Backlog product story: §Зачем / §Gap Expected vs Actual / §Verified facts — **Historical (pre-ID-14)** vs **As-of-Done (current)**; no present-tense live skip / auto-profile navigate as current fact → F1.
- [x] (P0) Pipeline story mirror sections if still present-tense pre-fix → same As-of-Done split.
- [x] (P0) No product SPA code change; gate Date from `--print-utc-now` at close.

## Where to change
- [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-14-post-submit-path-choice.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-14-post-submit-path-choice.md)
- [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md) (if drift)
- This task `acceptance-verification-spa-id-14-t08.md`

## Out of scope
Desktop CTA horizontal (T09 / F2); State E dual spinner (F3 WAIVED); product JSX/CSS.

## Verification
```bash
rg -n "navigate\\('/profile'|Live skip State F|сразу.*navigate" spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-14-post-submit-path-choice.md
# After fix: historical / pre-ID-14 only; current = SUBMITTED stay-on-submit
rg -n "setPhase\\(SUBMITTED\\)|As-of-Done|Historical" spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-14-post-submit-path-choice.md
```
