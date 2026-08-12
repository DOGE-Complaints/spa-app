# SPA-ID-14-T02 — Wire SUBMITTED phase; no auto-navigate

**Status:** Done — P3 execute 2026-08-07T19:56:17Z  
**Story:** [`../STORY-SPA-ID-14-post-submit-path-choice.md`](../STORY-SPA-ID-14-post-submit-path-choice.md)  
**Decision Ref:** FR-ID-14.1–14.5 · D14-1 · D14-3 · AC no profile navigate default  
**Depends on:** SPA-ID-14-T01  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T19:36:12Z  
**Package:** `pkg-000055`

@mockup: spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet.png

## Purpose
После HTTP **202**: `setSubmissionId` + `setPhase(SUBMITTED)`; **убрать** success default `navigate('/profile', { state: { submittedStoryId } })`; draft cleared; invalid id → no empty success flash.

## Risk
Оставить auto-navigate = State F никогда не виден на live path.

## Code Facts (re-verify at execute)
- [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx) `submitDraft` success branch.
- Phase: [`storyHandoffFlowState.js`](../../../../../../../src/auth/storyHandoffFlowState.js) `SUBMITTED`.
- Panel already mounts on SUBMITTED.

## AC / DoD
- [x] (P0) After 202, phase SUBMITTED + submission id set; `story-handoff-success` can render on `/story/submit` → FR-ID-14.1 · AC #1.
- [x] (P0) `submitDraft` does **not** `navigate('/profile', { state: { submittedStoryId } })` as success default → FR-ID-14.2 · AC #4.
- [x] (P0) Draft cleared after 202; missing/invalid id → no empty success flash → FR-ID-14.4 · FR-ID-14.5.
- [x] (P0) CTA leave paths remain user-driven (Board / My Stories / GPT) — destinations wired or deferred to T05/T03 without reintroducing auto-profile navigate.

## Where to change
- `spa-app/src/pages/StorySubmitPage.jsx` (`submitDraft`)
- This task acceptance

## Out of scope
Icon wire (T03); L10N keys (T04); panel visual parity (T05); profile consume state (вне scope).

## Verification
```bash
rg -n "navigate\\('/profile'|setPhase|setSubmissionId|SUBMITTED" spa-app/src/pages/StorySubmitPage.jsx
cd spa-app && npx vitest run --related src/pages/StorySubmitPage.jsx 2>/dev/null || true
```
