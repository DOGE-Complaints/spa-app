# SPA-ID-07-T03 — Country Not Supported panel (M123 A)

**Story:** [`../STORY-SPA-ID-07-country-waitlist.md`](../STORY-SPA-ID-07-country-waitlist.md)  
**Decision Ref:** [mockup-123-country-waitlist-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md) state A; FR-07.1  
**Depends on:** T01 (waitlist.* i18n)  
**ui_scope:** `visual`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T08:57:57Z

## Purpose
Implement M123 A «Country Not Supported»: informative tone (not rejection), country label from dial prefix, CTA Join Waitlist / Learn More. **ui_anchor** for M123 visual pipeline.

## Risk
Rejection tone or missing country context breaks trust for unsupported-region users (core product promise of ID-07).

## Code Facts (re-verify at execute)
- M123 spec state A — [mockup-123 spec §states](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md).
- [`phoneVerificationErrorLabels.js`](../../../../../../../../src/components/PhoneVerification/phoneVerificationErrorLabels.js) — ID-05 `COUNTRY_NOT_ALLOWED` uses `phoneError.country.*` (inline error), **not** full M123 waitlist flow.
- No `CountryNotSupportedPanel` in [`src/components/`](../../../../../../../../src/components/) at intake.

## AC / DoD
- [ ] (P0) Panel renders `t('waitlist.notSupported.*')` — no English literals (AC #6, FR-07.7).
- [ ] (P0) Shows country from props (dial-derived label); informative copy per FR-07.1.
- [ ] (P0) Join Waitlist CTA → `onJoinWaitlist`; Learn More → `onLearnMore` (or doc link stub).
- [ ] (P1) `data-testid` selectors for puppeteer/UI-1 gate.
- [ ] (P1) CSS co-located under `src/components/CountryWaitlist/` (or `Waitlist/`).

## Where to change
- New: `spa-app/src/components/CountryWaitlist/CountryNotSupportedPanel.jsx`
- New: `spa-app/src/components/CountryWaitlist/index.js`
- New: `spa-app/src/components/CountryWaitlist/CountryWaitlist.css` (or module)

## Out of scope
- Form/Joined/Error panels (T04–T05). VerifyPage orchestration (T06).

## Verification
```bash
cd spa-app && npm run dev
# /#/verify — trigger COUNTRY_NOT_ALLOWED mock (+37288888888) after T06; for T03 use isolated render test
npm run test:run -- src/components/CountryWaitlist/__tests__/ 2>/dev/null || true
```
