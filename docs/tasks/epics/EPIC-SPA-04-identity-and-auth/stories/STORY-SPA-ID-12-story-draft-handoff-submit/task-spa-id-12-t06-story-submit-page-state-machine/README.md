# SPA-ID-12-T06 — StorySubmitPage state machine (A–H/E0)

**Story:** [`../STORY-SPA-ID-12-story-draft-handoff-submit.md`](../STORY-SPA-ID-12-story-draft-handoff-submit.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md); [`../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md); [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** T01, T02, T03, T04, T05  
**ui_scope:** `mixed`  
**extends ui-mockup:** `../task-spa-id-12-t08-ui-anchor-m128-icons/ui-mockup-spec.md`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-05T08:01:18Z

## Purpose
Rename/rewrite `StoryComposePage` → `StorySubmitPage`: implement state machine A Resolving, B Login panel, C Preview (read-only), D stub→T07, E Submitting, F Submitted, G Expired, H ServiceDown, E0 Empty. Remove local compose editor + `createStoryDraft` UI (D12-1). Wire `useSearchParams` for `draft_id`.

## Risk
Leaving compose editor violates D12-1/AC #6. Showing narrative on verify screen violates privacy (AC #2).

## Code Facts (re-verify at execute)
- [`StoryComposePage.jsx`](../../../../../../../src/pages/StoryComposePage.jsx) — compose form + `STORY_GATE_PHASES` :36-136.
- [`storyDraftService.js`](../../../../../../../src/services/storyDraftService.js) — browser createStoryDraft :94.
- Route still `/story/compose` until T04 applied.

## AC / DoD
- [ ] (P0) States A/B/C/E0/F/G/H/E wired per backlog state machine (Scope A,B,F).
- [ ] (P0) `?draft_id` → GET preview on 200; 404→G; no id→E0 (AC #1).
- [ ] (P0) Preview read-only original-language fields via T02 mapper (AC #1,#2).
- [ ] (P0) Local compose editor + save-draft removed (AC #6, D12-1).
- [ ] (P0) Submit CTA triggers POST submit → E→F or error branches (AC #3).
- [ ] (P1) `data-testid` hooks per STORY-UX-MOCKUP-BRIEF for T09 puppeteer.

## Where to change
- Rename/rewrite: `../../../../../../../src/pages/StorySubmitPage.jsx` (+ CSS)
- Remove/update: `../../../../../../../src/pages/StoryComposePage.jsx`, tests
- New: `../../../../../../../src/auth/storyHandoffFlowState.js` phases enum

## Out of scope
Verify interpose detail (T07). M128 visual polish (T08).

## Verification
```bash
cd spa-app && npm run test:run -- src/pages/__tests__/StorySubmitPage.test.jsx
```
