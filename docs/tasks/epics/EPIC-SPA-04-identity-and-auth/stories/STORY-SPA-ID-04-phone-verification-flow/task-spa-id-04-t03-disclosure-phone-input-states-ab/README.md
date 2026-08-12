# SPA-ID-04-T03 — Disclosure + Phone Input (states A+B)

**Story:** [`../STORY-SPA-ID-04-phone-verification-flow.md`](../STORY-SPA-ID-04-phone-verification-flow.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-04-phone-verification-flow.md) §FR-04.1/04.2/04.7; [DOC-IDS-ONB-02](../../../../../../../doge-identity-service/docs/tasks/backlog-stories/identity-onboarding/DOC-IDS-ONB-02-disclosure-copy.md); [ui-mockup-spec.md](../task-spa-id-04-t02-phone-verification-flow-shell-m32/ui-mockup-spec.md)  
**Depends on:** T02  
**ui_scope:** `visual` (extends T02 ui_anchor)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T16:53:10Z

## Purpose
Panels **A Disclosure** (before phone input, DOC-IDS-ONB-02 copy, `Send code`/`Not now`) and **B Phone Input** (+372 mask, validation hints, triggers `POST /auth/phone/request` via T01 client).

## Risk
Showing phone input before disclosure violates FR-04.1 and trust contract (story AC #1).

## AC / DoD
- [x] (P0) Disclosure panel shown first; phone field not visible until user accepts (FR-04.1; AC #1).
- [x] (P0) Disclosure copy from DOC-IDS-ONB-02 verbatim; CTAs `Send code` / `Not now`.
- [x] (P0) Phone input: country locked +372, E.164 mask, inline validation hints (FR-04.2).
- [x] (P0) Valid submit calls `requestPhoneVerification` and advances to OTP phase.
- [x] (P0) No forbidden terms in copy (FR-04.7).
- [x] (P1) `Not now` dismisses/closes flow without API call where host allows deferral.

## Where to change
- New: `spa-app/src/components/PhoneVerification/DisclosurePanel.jsx`
- New: `spa-app/src/components/PhoneVerification/PhoneInputPanel.jsx`
- Extend: `PhoneVerificationFlow.jsx` — wire panels A+B

## Out of scope
- OTP/Processing/Success panels (T04). Error UI detail (ID-05). `/verify` route (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification/__tests__/DisclosurePanel.test.jsx src/components/PhoneVerification/__tests__/PhoneInputPanel.test.jsx
```
