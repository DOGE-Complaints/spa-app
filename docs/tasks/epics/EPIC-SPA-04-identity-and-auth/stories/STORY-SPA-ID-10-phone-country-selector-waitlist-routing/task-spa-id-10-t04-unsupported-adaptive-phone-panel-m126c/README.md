# SPA-ID-10-T04 — Unsupported adaptive phone panel (M126 C)

**Story:** [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)  
**Decision Ref:** [mockup-126-phone-country-selector-spec.md](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md) state C; FR-10.4  
**Depends on:** T01, T02, T03  
**ui_scope:** `extends`  
**extends ui-mockup:** `../task-spa-id-10-t03-country-selector-panel-m126ab/ui-mockup-spec.md`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T10:51:01Z

## Purpose
When selected country is unsupported (`!isSupportedDialPrefix`): show inline notice with `{country}`, swap primary CTA to «Join Waitlist», optional phone field label, hide/disable OTP send path — **no** `/auth/phone/request` (client short-circuit).

## Risk
SMS still sent for unsupported country wastes user trust and API quota. Send Code visible on unsupported path violates FR-10.4.

## Code Facts (re-verify at execute)
- [`PhoneVerificationFlow.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx) L218-225 — always calls `submitPhoneRequest` on phone submit.
- T01 `isSupportedDialPrefix` — scaffold target.
- Story UX-решение §4 — adaptive mode on country change.

## AC / DoD
- [ ] (P0) Unsupported selection → notice + Join Waitlist CTA (AC #4, FR-10.4).
- [ ] (P0) `POST /auth/phone/request` not called from unsupported UI path.
- [ ] (P0) Phone field optional label `phone.country.phoneOptional` when unsupported.
- [ ] (P1) Supported country (Estonia) → existing Send Code + OTP path unchanged (AC #3).
- [ ] (P1) `data-testid` for unsupported notice and join CTA.

## Where to change
- `spa-app/src/components/PhoneVerification/PhoneInputPanel.jsx` — unsupported layout branch
- `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.jsx` — guard `handlePhoneSubmit` by supported country
- CSS co-located with phone verification panels

## Out of scope
- VerifyPage waitlist handoff with explicit country (T05). Country selector base (T03).

## Verification
```bash
cd spa-app && npm run dev
# /#/verify — select Germany → notice + Join Waitlist; no network to /auth/phone/request
```
