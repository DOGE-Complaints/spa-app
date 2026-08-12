# SPA-ID-14-T01 — Pin live success navigate vs M135

**Status:** Done — P3 execute 2026-08-07T19:45:56Z  
**Story:** [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md)  
**Decision Ref:** backlog FR-ID-14.1 · FR-ID-14.2 · Gap Expected vs Actual · D14-1  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T19:36:12Z  
**Package:** `pkg-000055`

## Purpose
Зафиксировать evidence: live Submit **202** → `navigate('/profile', { state: { submittedStoryId } })` **без** `setPhase(SUBMITTED)` vs M135 stay-on-submit State F — **до** любого wire в T02.

## Risk
Fix без pin → спор «уже было SUBMITTED» / ложный Done.

## Code Facts (re-verify at execute)
- [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx) `submitDraft` ~L117–120: after success → `clearDraftId()` + `navigate('/profile', …)`; **нет** `setPhase(SUBMITTED)` / `setSubmissionId`.
- [`StoryHandoffSuccessPanel`](../../../../../../../src/components/StoryHandoff/StoryHandoffPanels.jsx) exists; shown when phase SUBMITTED (devPhase path).
- M135 SSOT: stay on `/story/submit` until CTA.

## AC / DoD
- [x] (P0) Evidence note: quote live success branch (navigate profile) vs required M135 stay + SUBMITTED → FR-ID-14.1 · FR-ID-14.2 pin.
- [x] (P0) No product code change in this task (T02 only).
- [x] (P0) Gate Date N/A; task acceptance Date from `--print-utc-now` at close.

## Where to change
- Evidence under `spa-app/docs/analysis/` (new `evidence-STORY-SPA-ID-14-pin-…`)
- This task `acceptance-verification-spa-id-14-t01.md`

## Out of scope
Wire submitDraft (T02); icons; L10N; panel CSS; vitest; story gate.

## Verification
```bash
rg -n "navigate\\('/profile'|setPhase\\(SUBMITTED\\)|setSubmissionId" spa-app/src/pages/StorySubmitPage.jsx
```
