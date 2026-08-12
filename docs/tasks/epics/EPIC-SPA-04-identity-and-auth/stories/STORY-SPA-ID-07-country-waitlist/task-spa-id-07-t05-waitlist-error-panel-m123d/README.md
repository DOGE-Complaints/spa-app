# SPA-ID-07-T05 — Waitlist Error panel (M123 D)

**Story:** [`../STORY-SPA-ID-07-country-waitlist.md`](../STORY-SPA-ID-07-country-waitlist.md)  
**Decision Ref:** [mockup-123 spec](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md) state D; FR-07.4  
**Depends on:** T01, T02  
**ui_scope:** `extends`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T08:57:57Z

## Purpose
M123 D Submission Error: distinct messages for `network_error`, `service_unavailable`, `duplicate_request`, `validation_error`; Try Again / Back actions.

## Risk
Generic error copy prevents users from fixing duplicate vs validation issues (AC #4).

## Code Facts (re-verify at execute)
- T02 `waitlistService` error kinds — scaffold target.
- Story §Translations — `waitlist.error.*` per kind + tryAgain/back.
- ID-05 error pattern — [`PhoneVerificationErrorState.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationErrorState.jsx) (reference only; waitlist errors separate).

## AC / DoD
- [ ] (P0) Panel maps each error kind → distinct `t('waitlist.error.<kind>')` message (AC #4, FR-07.4).
- [ ] (P0) Try Again → `onRetry`; Back → `onBack` (return to form or not-supported per orchestrator).
- [ ] (P1) `data-testid` per error kind for tests.
- [ ] (P1) Title uses `t('waitlist.error.title')`.

## Where to change
- New: `spa-app/src/components/CountryWaitlist/WaitlistErrorPanel.jsx`
- Extend: `spa-app/src/components/CountryWaitlist/index.js`

## Out of scope
- waitlistService implementation (T02). VerifyPage wiring (T06).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/CountryWaitlist/__tests__/WaitlistErrorPanel.test.jsx
```
