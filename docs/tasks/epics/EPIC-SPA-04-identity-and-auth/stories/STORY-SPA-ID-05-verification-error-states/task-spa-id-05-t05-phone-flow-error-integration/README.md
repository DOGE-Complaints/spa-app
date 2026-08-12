# SPA-ID-05-T05 — PhoneVerificationFlow error integration

**Story:** [`../STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md)  
**Decision Ref:** backlog §Routes/API; [PhoneVerificationFlow.jsx](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx)  
**Depends on:** T01–T04  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T09:20:49Z

## Purpose
Replace generic `FAILED` panel with mapped `PhoneVerificationErrorState`. Catch `IdentityApiError` in request/confirm paths; wire next-actions (retry, resend, change number, sign in, waitlist handoff, dismiss).

## Risk
Swallowed errors without `code` regress to generic failed; happy-path ID-04 broken if catch too broad.

## Code Facts (re-verify at execute)
- [`PhoneVerificationFlow.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx) — `catch { setPhase(FAILED) }` without reading `error.code` (lines 73–74, 88–89).
- [`VERIFICATION_FLOW_PHASES.FAILED`](../../../../../../../../src/auth/verificationFlowState.js) — single failed phase today.
- [`VerifyPage.jsx`](../../../../../../../../src/pages/VerifyPage.jsx) — hosts flow on `/verify`.

## AC / DoD
- [ ] (P0) `submitPhoneRequest` / `submitOtpConfirm` preserve `IdentityApiError.code` and `body.trace_id` (FR-05.6).
- [ ] (P0) Render correct M37 state per mapped code; remove inline generic failed section (story AC #1).
- [ ] (P0) `network_error` from `IdentityApiError('network_error', 0)` mapped (story AC #1).
- [ ] (P0) Country → `onJoinWaitlist` / waitlist-entry stub (not ID-07 form) (story AC #4).
- [ ] (P0) Auth codes → navigate `/login` on Sign In (story AC #1).
- [ ] (P1) Local `mismatchCount` increments on `CODE_MISMATCH`; `requestSentAtMs` used for rate limit timer.
- [ ] (P1) Happy-path A–E unchanged when no error.

## Where to change
- `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.jsx`
- Possibly extend `verificationFlowState.js` with `activeErrorCode` state shape (minimal)

## Out of scope
- ID-07 waitlist UI/API. CivicStatusCard error host (ID-03 already has `verification_failed` stub).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx
# manual mode B: provoke CODE_MISMATCH via file-sink OTP
```
