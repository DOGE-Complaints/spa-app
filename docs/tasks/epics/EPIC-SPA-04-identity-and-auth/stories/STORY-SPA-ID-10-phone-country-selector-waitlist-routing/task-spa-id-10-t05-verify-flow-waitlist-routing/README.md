# SPA-ID-10-T05 — Verify flow waitlist routing

**Story:** [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)  
**Decision Ref:** pipeline story FR-10.5/10.6; [audit-STORY-SPA-ID-07-execution-2026-06-30.md](../../../../../../analysis/audit-STORY-SPA-ID-07-execution-2026-06-30.md) F2  
**Depends on:** T01–T04  
**ui_scope:** `extends`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T10:51:01Z

## Purpose
Wire unsupported «Join Waitlist» and backend `COUNTRY_NOT_ALLOWED` fallback into ID-07 waitlist with **country from explicit selector choice** (not dial-derived from phone). Do not persist phone on unsupported path (FR-07.5).

## Risk
ID-07 F2 remains if `VerifyPage` still uses `dialPrefixToCountry(phone)` only. Phone stored in waitlist state violates privacy AC.

## Code Facts (re-verify at execute)
- [`VerifyPage.jsx:44-54`](../../../../../../../../src/pages/VerifyPage.jsx#L44) — `handleJoinWaitlist({ phone })` → `dialPrefixToCountry(phone)`.
- [`PhoneVerificationFlow.jsx:190-191`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx#L190) — backend fallback `onJoinWaitlist({ phone })`.
- ID-07 [`CountryWaitlist/*`](../../../../../../../../src/components/CountryWaitlist/) — waitlist phases on `/verify`.

## AC / DoD
- [ ] (P0) `onJoinWaitlist({ country, countryName?, phone? })` — unsupported path passes **selected country** (AC #5, FR-10.5).
- [ ] (P0) Phone not stored/passed to waitlist service on unsupported client-short-circuit path.
- [ ] (P0) Backend `COUNTRY_NOT_ALLOWED` fallback still reaches waitlist (AC #6, FR-10.6).
- [ ] (P1) Estonia happy-path OTP unchanged end-to-end (AC #3).
- [ ] (P1) Waitlist form `initialCountry` pre-filled from selector choice.

## Where to change
- `spa-app/src/pages/VerifyPage.jsx` — extend handoff handler
- `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.jsx` — propagate selected country; unsupported join callback
- `spa-app/src/pages/__tests__/VerifyPage.test.jsx` — extend handoff tests

## Out of scope
- Panel/selector UI (T03–T04). Vitest story suite (T06).

## Verification
```bash
cd spa-app && npm run dev
# /#/verify — select non-EE → Join Waitlist → M123 with correct country in form
npm run test:run -- src/pages/__tests__/VerifyPage.test.jsx
```
