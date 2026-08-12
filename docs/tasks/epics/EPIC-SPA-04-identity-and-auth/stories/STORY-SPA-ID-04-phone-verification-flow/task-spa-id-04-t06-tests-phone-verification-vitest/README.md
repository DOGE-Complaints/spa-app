# SPA-ID-04-T06 — Vitest phone verification coverage

**Story:** [`../STORY-SPA-ID-04-phone-verification-flow.md`](../STORY-SPA-ID-04-phone-verification-flow.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) AC 1–5  
**Depends on:** T05  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T16:53:10Z

## Purpose
Vitest: API client mocks, phase transitions, resend 60s timer, verified skip (FR-04.8), happy-path component flow, forbidden-term guard (FR-04.7).

## Risk
Missing timer or skip tests allow regressions that fail story AC #3 and #5 in production.

## AC / DoD
- [x] (P0) `identityService` phone request/confirm mocked; envelope parsing tested (T01).
- [x] (P0) Phase machine transitions: disclosure → phone → otp → processing → success (AC #2).
- [x] (P0) Resend timer: disabled until 60s, then enabled (AC #3).
- [x] (P0) OTP field has `autocomplete="one-time-code"` (AC #3).
- [x] (P0) `phone_verified=true` skips verification prompt (AC #5).
- [x] (P0) Happy-path component test: number → code → confirm → success without navigation away.
- [x] (P1) Forbidden-term scan on user-visible strings (FR-04.7).
- [x] (P1) No phone/code in test log assertions (FR-04.9).

## Where to change
- New: `spa-app/src/auth/__tests__/verificationFlowState.test.js`
- New: `spa-app/src/auth/__tests__/identityService.phone.test.js`
- New: `spa-app/src/components/PhoneVerification/__tests__/*.test.jsx`

## Out of scope
- E2E Telnyx SMS. ID-05 error state matrix. Story gate doc (T07).

## Verification
```bash
cd spa-app && npm run test:run
```
