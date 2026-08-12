# SPA-ID-12-T05 — login redirect + draft_id sessionStorage

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** T04  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
Implement no-session handoff: on GET/submit 401 persist `draft_id` in sessionStorage; redirect `/login?next=…`; after login restore handoff to `/story/submit?draft_id=…`. HashRouter-safe (R3): sessionStorage primary, `?next=` fallback.

## Risk
Lost `draft_id` after login forces empty-state and breaks product promise (D12-4).

## Code Facts (re-verify at execute)
- [`VerifyPage.jsx`](../../../../../../../src/pages/VerifyPage.jsx) — `useSearchParams` pattern at scaffold.
- grep `draft_id|storyHandoff` in [`spa-app/src/`](../../../../../../../src/) → **0** at scaffold.
- ID-08 pattern: `gptBridgeFlowState.js` sessionStorage for `oauth_request_id` (reference).

## AC / DoD
- [ ] (P0) 401 on GET → save draft_id + redirect login with return path (AC #1, D12-4).
- [ ] (P0) Post-login resume → `/story/submit` with same draft_id (AC #1).
- [ ] (P1) sessionStorage key documented; cleared after successful submit or explicit abandon.

## Where to change
- New: `../../../../../../../src/auth/storyHandoffFlowState.js` (or extend story gate state)
- [`LoginPage.jsx`](../../../../../../../src/pages/LoginPage.jsx) — return navigation
- [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx) (T06) — consume storage

## Out of scope
Full page state machine (T06).

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/storyHandoffFlowState.test.js
```
