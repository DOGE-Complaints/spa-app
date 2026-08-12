# SPA-ID-04-T01 — Phone API + verification flow state

**Story:** [`../STORY-SPA-ID-04-phone-verification-flow.md`](../STORY-SPA-ID-04-phone-verification-flow.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) §FR-04.2/04.6/04.9; [identityService.js](../../../../../../../../src/auth/identityService.js)  
**Depends on:** ID-03 Done (`civicStatusState.js`, `CivicStatusCard`)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T16:53:10Z

## Purpose
Extend `identityService` with `POST /auth/phone/request` and `POST /auth/phone/confirm`; add `verificationFlowState.js` with phases `disclosure→phone→otp→processing→success|failed` and server rule constants (6 digit, 60s resend, 5 attempts, 5 min TTL). No phone/code logging.

## Risk
Wrong API envelope handling or missing constants break resend timer and OTP validation; privacy leak if phone/code logged.

## Code Facts (re-verify at execute)
- [`identityService.js`](../../../../../../../../src/auth/identityService.js) — only `fetchMe` at intake.
- grep `PhoneVerification|verificationFlowState` in `spa-app/src/` → 0 at intake.
- [`civicStatusState.js`](../../../../../../../../src/auth/civicStatusState.js) — `CIVIC_FLOW_PHASES` ready for wiring in T05.

## AC / DoD
- [x] (P0) `requestPhoneVerification(phone)` → `POST /auth/phone/request` with Bearer JWT; parses `{sent, expires_at}` (FR-04.2).
- [x] (P0) `confirmPhoneVerification(phone, code)` → `POST /auth/phone/confirm`; parses `{status:"verified"}` (FR-04.3 partial).
- [x] (P0) `verificationFlowState.js` exports phase enum + transitions; server constants: 6 digits, 60s cooldown, 5 attempts, 5 min TTL (FR-04.6).
- [x] (P0) No console/log of phone or OTP code (FR-04.9).
- [x] (P1) Error envelope `{error:{code,message,trace_id}}` surfaced to caller without leaking PII.

## Where to change
- Extend: `spa-app/src/auth/identityService.js`
- New: `spa-app/src/auth/verificationFlowState.js`

## Out of scope
- UI panels (T02–T04). Detailed error UI (ID-05). Route host (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/verificationFlowState.test.js
# after T06: full npm run test:run
```
