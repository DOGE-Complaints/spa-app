# SPA-ID-06-T06 — Vitest story gate coverage

**Story:** [`../STORY-SPA-ID-06-protected-action-gate.md`](../STORY-SPA-ID-06-protected-action-gate.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-06-protected-action-gate.md) AC #1–#6  
**Depends on:** T03, T04, T05  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T18:55:30Z

## Purpose
Add Vitest coverage for story gate: flow state transitions, storyDraftService mocks, compose/gate panel rendering with `t()` keys, `verification_required` branch, and storyGate dictionary parity.

## Risk
Untested resume/submit path regresses silently across ID-04 reuse boundary.

## Code Facts (re-verify at execute)
- ID-09 pattern: [`identityLocaleSnapshots.test.jsx`](../../../../../../../../src/i18n/__tests__/identityLocaleSnapshots.test.jsx) — jsdom + mocks.
- [`PhoneVerificationFlow.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx) — mock `identityService` pattern.
- T02–T05 runtime modules — target under test.

## AC / DoD
- [ ] (P0) Tests: compose loads without gate when not submitting (AC #1).
- [ ] (P0) Tests: draft save before verify path (AC #2).
- [ ] (P0) Tests: resume + submit after mocked verify complete (AC #3).
- [ ] (P0) Tests: `verification_required` on submit opens gate flow (AC #4).
- [ ] (P0) Tests: `PhoneVerificationFlow` rendered (not duplicate verify UI) (AC #5).
- [ ] (P1) storyGate key parity + no forbidden terms in dictionary tests (AC #6).
- [ ] (P0) `npm run test:run` green.

## Where to change
- `spa-app/src/pages/__tests__/StoryComposePage.test.jsx` (new)
- `spa-app/src/components/StoryGate/__tests__/` (new)
- `spa-app/src/auth/__tests__/storyGateFlowState.test.js` (new)
- Extend `spa-app/src/i18n/__tests__/identityDictionary.test.js` if needed

## Out of scope
- Puppeteer M122 full flow (optional smoke in T07 gate). Gateway live contract tests.

## Verification
```bash
cd spa-app && npm run test:run
```
