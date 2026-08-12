# SPA-ID-06-T04 — Gate + Draft Saved panels (M122 B/C)

**Story:** [`../STORY-SPA-ID-06-protected-action-gate.md`](../STORY-SPA-ID-06-protected-action-gate.md)  
**Decision Ref:** [mockup-122-story-compose-verification-gate-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-122-story-compose-verification-gate-sheet-spec.md) states B–C; FR-06.2, FR-06.3  
**Depends on:** T02, T03  
**ui_scope:** `extends`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T18:55:30Z

## Purpose
On Submit when `GET /me.phone_verified === false`, show M122 B «Verification Required» gate panel (Verify & continue / Save draft / Cancel). Before verification, persist draft via `storyDraftService` and show M122 C «Draft Saved» with draft_id + last-saved — explicit «nothing lost» signal.

## Risk
Skipping pre-verify draft save loses user story content — core product promise of lazy gate.

## Code Facts (re-verify at execute)
- [`identityService.js`](../../../../../../../../src/auth/identityService.js) — `fetchMe()` returns `phone_verified`.
- T02 `storyDraftService` — `createStoryDraft` (scaffold target).
- T03 `StoryComposePage` — compose form state holder.
- FR-06.8 — show draft_id/status only; never phone/OTP/tokens.

## AC / DoD
- [ ] (P0) Submit checks `/me.phone_verified`; `false` → gate panel, not hard block (AC #1, FR-06.2).
- [ ] (P0) `POST /story-drafts` before verify path; draft_id + last-saved shown (AC #2, FR-06.3).
- [ ] (P0) Gate + Draft Saved strings via `t('storyGate.required.*')` / `t('storyGate.draftSaved.*')` (AC #6).
- [ ] (P1) Cancel returns to compose without data loss when draft saved.

## Where to change
- New: `spa-app/src/components/StoryGate/VerificationRequiredPanel.jsx`
- New: `spa-app/src/components/StoryGate/DraftSavedPanel.jsx`
- `spa-app/src/pages/StoryComposePage.jsx` — wire submit → me check → panels
- `spa-app/src/auth/storyGateFlowState.js` — transitions to GATE / DRAFT_SAVED

## Out of scope
- PhoneVerificationFlow embed (T05). Submission success (T05). `verification_required` from gateway on submit (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/StoryGate/__tests__/
cd spa-app && npm run dev
# manual: unverified user Submit → gate B → draft saved C
```
