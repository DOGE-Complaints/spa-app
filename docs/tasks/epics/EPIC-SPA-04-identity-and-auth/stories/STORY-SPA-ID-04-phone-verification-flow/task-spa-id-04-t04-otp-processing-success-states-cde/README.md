# SPA-ID-04-T04 — OTP + Processing + Success (states C+D+E)

**Story:** [`../STORY-SPA-ID-04-phone-verification-flow.md`](../STORY-SPA-ID-04-phone-verification-flow.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) §FR-04.3/04.4/04.5/04.6; [ui-mockup-spec.md](../task-spa-id-04-t02-phone-verification-flow-shell-m32/ui-mockup-spec.md)  
**Depends on:** T03  
**ui_scope:** `visual` (extends T02 ui_anchor)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T16:53:10Z

## Purpose
Panels **C OTP** (`autocomplete="one-time-code"`, 6 digits, resend 60s timer, change number, `POST /auth/phone/confirm`), **D Processing** (subtle progress, primary disabled), **E Success**. Generic API failure → `flowPhase=failed` only — no M37 error UI (ID-05).

## Risk
Missing resend timer or wrong OTP autocomplete hurts UX and AC #3; detailed error UI here duplicates ID-05.

## AC / DoD
- [x] (P0) OTP input: 6 digits, `autocomplete="one-time-code"` (FR-04.3; AC #3).
- [x] (P0) Resend disabled until 60s cooldown elapses; visible countdown timer (FR-04.3/04.6).
- [x] (P0) «Change number» returns to phone phase and re-issues request.
- [x] (P0) Confirm calls `confirmPhoneVerification`; success → processing → success panels (FR-04.4/04.5 partial).
- [x] (P0) Processing: subtle inline progress, no full-screen loader; actions disabled (FR-04.4).
- [x] (P0) Success panel prepares close + host `onComplete` callback (FR-04.5 partial).
- [x] (P1) Generic failure sets phase `failed` without M37-specific error copy (defer ID-05).

## Where to change
- New: `spa-app/src/components/PhoneVerification/OtpPanel.jsx`
- New: `spa-app/src/components/PhoneVerification/ProcessingPanel.jsx`
- New: `spa-app/src/components/PhoneVerification/SuccessPanel.jsx`
- Extend: `PhoneVerificationFlow.jsx` — wire panels C+D+E

## Out of scope
- Detailed error states (ID-05). `/me` refresh + route integration (T05). Vitest suite (T06).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/OtpPanel.test.jsx
```
