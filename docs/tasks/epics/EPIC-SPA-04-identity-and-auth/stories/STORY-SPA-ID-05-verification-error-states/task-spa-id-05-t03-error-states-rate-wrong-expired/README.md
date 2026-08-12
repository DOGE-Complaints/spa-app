# SPA-ID-05-T03 — Error states: Rate Limited, Wrong Code, Code Expired

**Story:** [`../STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md)  
**Decision Ref:** [mockup-37](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md) §5–7; backlog FR-05.2, FR-05.3  
**Depends on:** T01, T02  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T09:20:49Z

## Purpose
Wire M37 states B–D into `PhoneVerificationErrorState`: Rate Limited (cooldown timer, Resend disabled), Wrong Code (Attempts remaining: N), Code Expired (Resend / Change number).

## Risk
Timer desync or missing attempt counter violates story AC #2; user can spam resend during cooldown.

## Code Facts (re-verify at execute)
- OTP resend timer pattern exists in [`OtpPanel.jsx`](../../../../../../../../src/components/PhoneVerification/OtpPanel.jsx) + [`verificationFlowState.js`](../../../../../../../../src/auth/verificationFlowState.js) `resendCooldownRemainingSeconds`.
- Generic failed panel in [`PhoneVerificationFlow.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx) lines 160–181.

## AC / DoD
- [ ] (P0) `RATE_LIMITED` — cooldown display `MM:SS`, primary Resend disabled until 0 (FR-05.2, story AC #2).
- [ ] (P0) `CODE_MISMATCH` — «Attempts remaining: N» from T01 helper (FR-05.3, story AC #2).
- [ ] (P0) `CODE_EXPIRED` — Resend + Change number actions per M37 §7.
- [ ] (P1) Copy matches M37 titles/messages (EN canon); no forbidden terms.

## Where to change
- `spa-app/src/auth/verificationErrorMapping.js` or `phoneVerificationErrorLabels.js` — state B–D copy
- `spa-app/src/components/PhoneVerification/PhoneVerificationErrorState.jsx` — timer/attempts UI
- Optional factory: `resolveVerificationErrorPanel(errorCode, context)`

## Out of scope
- Flow catch wiring (T05). Country/conflict/provider states (T04).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/PhoneVerificationErrorState.test.jsx
```
