# SPA-ID-07-T04 — Waitlist Form + Joined panels (M123 B/C)

**Story:** [`../STORY-SPA-ID-07-country-waitlist.md`](../STORY-SPA-ID-07-country-waitlist.md)  
**Decision Ref:** [mockup-123 spec](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md) states B–C; FR-07.2, FR-07.3  
**Depends on:** T01, T02, T03  
**ui_scope:** `extends`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T08:57:57Z

## Purpose
M123 B Waitlist Form: email (required), country (pre-filled from dial prefix, editable), optional organization; submit calls `waitlistService`. M123 C Joined: explicit confirmation + country saved signal; Return to Home — no celebration graphics.

## Risk
Missing email validation or non-editable country breaks AC #2. Creating account side-effects violates FR-07.5.

## Code Facts (re-verify at execute)
- T02 `dialPrefixToCountry` + `waitlistService` — scaffold targets.
- [`VerifyPage.jsx`](../../../../../../../../src/pages/VerifyPage.jsx) — no form yet; stub only.
- Story AC #2: country pre-filled editable; email required. AC #3: joined explicit; no account/phone/profile.

## AC / DoD
- [ ] (P0) Form: email required; country field pre-filled from `initialCountry` prop, editable (AC #2, FR-07.2).
- [ ] (P0) Submit → `waitlistService.joinWaitlist`; success → JOINED phase callback.
- [ ] (P0) Joined panel: `waitlist.joined.*` strings; Return to Home navigates `/` or `/board` (AC #3, FR-07.3).
- [ ] (P0) No account/phone/profile API calls from panels (FR-07.5).
- [ ] (P1) All strings via `t('waitlist.form.*')` / `t('waitlist.joined.*')`.

## Where to change
- New: `spa-app/src/components/CountryWaitlist/WaitlistFormPanel.jsx`
- New: `spa-app/src/components/CountryWaitlist/WaitlistJoinedPanel.jsx`
- Extend: `spa-app/src/components/CountryWaitlist/index.js`

## Out of scope
- Error panel (T05). VerifyPage phase machine (T06).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/CountryWaitlist/__tests__/WaitlistFormPanel.test.jsx
```
