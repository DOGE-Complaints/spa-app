# SPA-ID-05-T01 — Verification error mapping contract

**Story:** [`../STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md) §FR-05.1/05.6; [mockup-37 §15](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md)  
**Depends on:** ID-04 Done (`identityService.js`, `verificationFlowState.js`)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T09:20:49Z

## Purpose
SSOT mapping from identity `error.code` → M37 error kind + copy/action metadata. Local helpers for cooldown and attempts-remaining when API omits `retry_after` / `attempts_remaining`.

## Risk
Wrong or incomplete mapping leaves generic failed panel or wrong next-action; forbidden terms in label SSOT leak into UI.

## Code Facts (re-verify at execute)
- [`identityService.js`](../../../../../../../../src/auth/identityService.js) — `IdentityApiError` with `code`, `status`, `body` (envelope).
- [`verificationFlowState.js`](../../../../../../../../src/auth/verificationFlowState.js) — `PHONE_VERIFICATION_RULES` (`RESEND_COOLDOWN_SECONDS: 60`, `MAX_ATTEMPTS: 5`).
- [`PhoneVerificationFlow.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx) — catch without code mapping (generic `FAILED`).
- grep `verificationErrorMapping` in `spa-app/src/` → 0 at intake.

## AC / DoD
- [ ] (P0) Map all backlog codes + M37 §15: `COUNTRY_NOT_ALLOWED`, `RATE_LIMITED`, `CODE_MISMATCH`, `CODE_EXPIRED`, `TOO_MANY_ATTEMPTS`, `PROVIDER_UNAVAILABLE`, `SEND_FAILED`, `profile_conflict`, `AUTHENTICATION_REQUIRED`, `session_expired`, `network_error` (story AC #1, FR-05.1).
- [ ] (P0) `computeResendCooldownRemainingSeconds(lastRequestAtMs)` uses `PHONE_VERIFICATION_RULES.RESEND_COOLDOWN_SECONDS` (FR-05.2 contract).
- [ ] (P0) `computeAttemptsRemaining(mismatchCount)` uses `PHONE_MAX_ATTEMPTS` (FR-05.3 contract).
- [ ] (P1) Label SSOT passes `findForbiddenVerificationTerm` from [`phoneVerificationLabels.js`](../../../../../../../../src/components/PhoneVerification/phoneVerificationLabels.js) (story AC #5).
- [ ] (P1) Muted `trace_id` / technical code display contract exported for UI (FR-05.6).

## Where to change
- New: `spa-app/src/auth/verificationErrorMapping.js`
- Extend or sibling: `spa-app/src/components/PhoneVerification/phoneVerificationErrorLabels.js` (if split from labels)
- New: `spa-app/src/auth/__tests__/verificationErrorMapping.test.js`

## Out of scope
- React panels (T02–T04). Flow wiring (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/verificationErrorMapping.test.js
```
