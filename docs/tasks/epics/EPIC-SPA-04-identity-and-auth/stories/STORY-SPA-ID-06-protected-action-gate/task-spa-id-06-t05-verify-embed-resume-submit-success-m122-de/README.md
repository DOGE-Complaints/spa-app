# SPA-ID-06-T05 — Verify embed, resume, submit, success (M122 D/E)

**Story:** [`../STORY-SPA-ID-06-protected-action-gate.md`](../STORY-SPA-ID-06-protected-action-gate.md)  
**Decision Ref:** [mockup-122](../../../../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md) states D–E; FR-06.4–06.7  
**Depends on:** T02, T04  
**ui_scope:** `extends`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T18:55:30Z

## Purpose
Embed existing `PhoneVerificationFlow` (ID-04 reuse, not redraw). After verify success: `GET /me` refresh → resume draft → M122 D «Verification Complete / Ready» → `POST /story-drafts/{id}/submit` → M122 E «Submission Success». Handle gateway `verification_required` on submit even when local `/me.phone_verified=true` (FR-06.7).

## Risk
Duplicating phone UI violates story AC #5. Missing `verification_required` path allows false sense of verified submit.

## Code Facts (re-verify at execute)
- [`PhoneVerificationFlow.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx) — `host`, `onComplete`, `onDismiss` props; full M32 flow built (ID-04 Done).
- [`identityService.js`](../../../../../../../../src/auth/identityService.js) — `fetchMe` refresh after verify.
- T02 `storyDraftService.submitStoryDraft` — must surface `verification_required`.
- [`VerifyPage.jsx`](../../../../../../../../src/pages/VerifyPage.jsx) — reference for embedding PhoneVerificationFlow in page host.

## AC / DoD
- [ ] (P0) Phone verify via `PhoneVerificationFlow` inline/modal — no duplicate panels (AC #5, FR-06.4).
- [ ] (P0) After verify: `/me` refresh → resume same `draft_id` → submit success (AC #3, FR-06.5).
- [ ] (P0) Success shows `submission_id` + Under Review status (FR-06.6).
- [ ] (P0) Submit with local `phone_verified=true` but gateway `verification_required` → gate + draft + resume (AC #4, FR-06.7).
- [ ] (P0) Complete/success copy via `t('storyGate.complete.*')` / `t('storyGate.success.*')` (AC #6).

## Where to change
- New: `spa-app/src/components/StoryGate/VerificationCompletePanel.jsx`
- New: `spa-app/src/components/StoryGate/SubmissionSuccessPanel.jsx`
- `spa-app/src/pages/StoryComposePage.jsx` — orchestrate verify embed + resume/submit
- `spa-app/src/auth/storyGateFlowState.js` — COMPLETE / SUCCESS phases

## Out of scope
- GPT bridge (ID-08). Full M110 composer. Country waitlist (ID-07).

## Verification
```bash
cd spa-app && npm run test:run -- src/pages/__tests__/StoryComposePage.test.jsx
cd spa-app && npm run dev
# manual: full A→E happy path; mock verification_required on submit
```
