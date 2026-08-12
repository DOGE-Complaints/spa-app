# SPA-ID-12-T07 — verify interpose + auto-resubmit

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** T01, T03, T06  
**ui_scope:** `mixed`  
**extends ui-mockup:** `../task-spa-id-12-t08-ui-anchor-m128-icons/ui-mockup-spec.md`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
On submit 403 `verification_required`: show State D with inline `PhoneVerificationFlow` (reuse ID-04); hide preview content on verify screen; on `onComplete` auto-retry `submitStoryDraft` without second user click (D12-5).

## Risk
Manual re-click after verify breaks «one intent click» (D12-5). Showing draft content on verify violates AC #2.

## Code Facts (re-verify at execute)
- [`PhoneVerificationFlow`](../../../../../../../src/components/PhoneVerification/) — ID-04 reuse.
- [`StoryComposePage.jsx`](../../../../../../../src/pages/StoryComposePage.jsx) — existing `VerificationRequiredError` → `VERIFICATION_REQUIRED` phase (reference ID-06).
- `VerificationRequiredError` in [`storyDraftService.js`](../../../../../../../src/services/storyDraftService.js).

## AC / DoD
- [ ] (P0) 403 → State D with `storyHandoff.verify.*` chrome; narrative hidden (AC #2,#3).
- [ ] (P0) Phone verify complete → automatic submit retry → F on 202 (AC #3, D12-5).
- [ ] (P0) OTP internals reuse M32/ID-04 — no redraw (D12-7).
- [ ] (P1) 401 during verify → login redirect with draft preserved.

## Where to change
- [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx)
- Reuse: [`PhoneVerificationFlow`](../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx)
- Optional: [`StoryGate/VerificationRequiredPanel.jsx`](../../../../../../../src/components/StoryGate/VerificationRequiredPanel.jsx)

## Out of scope
M128 State D visual (T08).

## Verification
```bash
cd spa-app && npm run test:run -- src/pages/__tests__/StorySubmitPage.test.jsx
```
