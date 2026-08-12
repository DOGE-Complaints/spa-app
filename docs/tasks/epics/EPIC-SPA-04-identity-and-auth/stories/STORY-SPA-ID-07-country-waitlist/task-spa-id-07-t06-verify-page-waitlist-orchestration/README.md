# SPA-ID-07-T06 — VerifyPage waitlist orchestration

**Story:** [`../STORY-SPA-ID-07-country-waitlist.md`](../STORY-SPA-ID-07-country-waitlist.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-07-country-waitlist.md) §Routes, FR-07.6; ID-05 handoff  
**Depends on:** T02–T05  
**ui_scope:** `extends`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T08:57:57Z

## Purpose
Replace VerifyPage waitlist stub with full M123 phase orchestration on `/verify`. Wire `PhoneVerificationFlow` `onJoinWaitlist` to enter waitlist flow with dial-prefix/phone context for country pre-fill (FR-07.6, FR-07.2).

## Risk
Stub left in place blocks ID-07 entirely. `onJoinWaitlist` currently called without phone context — country pre-fill impossible without callback extension.

## Code Facts (re-verify at execute)
- [`VerifyPage.jsx:27-29,63-66`](../../../../../../../../src/pages/VerifyPage.jsx#L27) — `waitlistHandoff` stub + hardcoded English `data-testid="verify-waitlist-handoff-stub"`.
- [`PhoneVerificationFlow.jsx:190-191`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx#L190) — `onJoinWaitlist?.()` no args; `phone` in closure at error handler.
- [`PhoneVerificationFlow.test.jsx`](../../../../../../../../src/components/PhoneVerification/__tests__/PhoneVerificationFlow.test.jsx) — expects `onJoinWaitlist` called on COUNTRY_NOT_ALLOWED.
- Mock: [`identityService.js:49`](../../../../../../../../src/auth/identityService.js#L49) `+37288888888` → `COUNTRY_NOT_ALLOWED`.

## AC / DoD
- [ ] (P0) Remove English stub; render CountryWaitlist panels by `WAITLIST_PHASES` (AC #1 all states via page).
- [ ] (P0) `onJoinWaitlist` receives phone/dial context (extend callback signature if needed); country pre-fill works (AC #2).
- [ ] (P0) Entry only from `COUNTRY_NOT_ALLOWED` handoff on `/verify` (FR-07.6); happy-path verify unchanged.
- [ ] (P1) Phase transitions: A → B → C | D; Back/Retry wired.
- [ ] (P1) Learn More — external doc link or placeholder per M123 (non-blocking).

## Where to change
- `spa-app/src/pages/VerifyPage.jsx` — orchestration + remove stub
- `spa-app/src/pages/VerifyPage.css` — layout for waitlist overlay
- `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.jsx` — optional: `onJoinWaitlist({ phone })` 
- `spa-app/src/pages/__tests__/VerifyPage.test.jsx` — extend or add waitlist handoff tests

## Out of scope
- Panel implementation (T03–T05). Vitest story suite (T07).

## Verification
```bash
cd spa-app && npm run dev
# /#/verify — login, enter +37288888888, Join Waitlist → M123 A→B flow
npm run test:run -- src/pages/__tests__/VerifyPage.test.jsx
```
