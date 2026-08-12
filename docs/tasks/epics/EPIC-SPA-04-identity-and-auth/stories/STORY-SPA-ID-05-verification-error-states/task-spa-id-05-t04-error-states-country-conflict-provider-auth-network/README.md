# SPA-ID-05-T04 — Error states: Country, Conflict, Provider, Auth, Network

**Story:** [`../STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md)  
**Decision Ref:** [mockup-37](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md) §4, §8–12; backlog FR-05.4, FR-05.5  
**Depends on:** T01, T02  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T09:20:49Z

## Purpose
Wire M37 states A, E–I: Country Not Allowed (waitlist handoff stub), Too Many Attempts, SMS Unavailable, Phone Conflict, Sign In Required, Connection Problem.

## Risk
Auto-merge on `profile_conflict` violates FR-FE-008; implementing full waitlist (ID-07) out of scope.

## Code Facts (re-verify at execute)
- Backend `profile_conflict` → 409 in [`handlers.py`](../../../../../../../../../doge-identity-service/src/core/api/handlers.py).
- Session auth errors partially handled by [`sessionShellState.js`](../../../../../../../../src/auth/sessionShellState.js) at app level — inline Sign In CTA still required in flow (story Routes/API).

## AC / DoD
- [ ] (P0) `COUNTRY_NOT_ALLOWED` — Join Waitlist + Use Another Number; `onJoinWaitlist` callback only (handoff to ID-07, story AC #4, FR-05.5).
- [ ] (P0) `profile_conflict` — Sign in to Existing Account / Use Another Number; **no** auto-merge (FR-05.4, story AC #3).
- [ ] (P0) `TOO_MANY_ATTEMPTS` — Start Again → disclosure (M37 §8).
- [ ] (P0) `PROVIDER_UNAVAILABLE` / `SEND_FAILED` — Retry + Cancel (M37 §9).
- [ ] (P0) `AUTHENTICATION_REQUIRED` / `session_expired` — Sign In + Cancel (M37 §11).
- [ ] (P0) `network_error` — Retry (M37 §12, story AC #1 remainder).

## Where to change
- Labels + action map in `verificationErrorMapping.js` / error labels module
- `PhoneVerificationErrorState` or panel resolver for states A, E–I

## Out of scope
- ID-07 waitlist form / `POST /waitlist`. Full session-shell overlay (ID-02).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneVerificationErrorState.test.jsx
```
