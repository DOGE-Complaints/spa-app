# SPA-ID-09-T05 — Phone flow, errors, verify host l10n (ID-04/05)

**Story:** [`../STORY-SPA-ID-09-identity-ui-localization.md`](../STORY-SPA-ID-09-identity-ui-localization.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) Scope ID-04, ID-05, verifyPage; §`phone.*`, `phoneError.*`, `verifyPage.*`  
**Depends on:** T01 (dictionary + interpolation + forbidden guard)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T10:51:38Z

## Purpose
Localize PhoneVerificationFlow (all panels), validation hints, PhoneVerificationErrorState, and VerifyPage host. Wire [`verificationErrorMapping.js`](../../../../../../../../src/auth/verificationErrorMapping.js) to `t('phoneError.*')` keys while preserving kind→action mapping logic.

## Risk
Largest surface area; partial retrofit leaves disclosure/OTP/error panels EN-only. `verifyPage.waitlistHandoff` dev stub must stay untranslated per backlog.

## Code Facts (re-verify at execute)
- [`phoneVerificationLabels.js`](../../../../../../../../src/components/PhoneVerification/phoneVerificationLabels.js) — `PHONE_VERIFICATION_DISCLOSURE` EN canon (DOC-IDS-ONB-02).
- [`phoneVerificationErrorLabels.js`](../../../../../../../../src/components/PhoneVerification/phoneVerificationErrorLabels.js) — EN-only error copy/actions.
- [`verificationFlowState.js`](../../../../../../../../src/auth/verificationFlowState.js) L42-53 — validation hint EN literals.
- [`PhoneVerificationFlow.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationFlow.jsx), [`PhoneVerificationErrorState.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneVerificationErrorState.jsx) — no `useI18n` at intake.
- [`VerifyPage.jsx`](../../../../../../../../src/pages/VerifyPage.jsx) — host strings + `verify-waitlist-handoff-stub` (do not translate).
- [`verificationErrorMapping.js`](../../../../../../../../src/auth/verificationErrorMapping.js) — imports label SSOT from error labels module.

## AC / DoD
- [ ] (P0) All phone flow panels use `t('phone.*')`; hints use `phone.hint.*` (story AC #1, FR-09.1).
- [ ] (P0) Error state title/message/actions via `t('phoneError.*')`; mapping layer returns keys not EN strings (story AC #1, FR-09.3).
- [ ] (P0) OTP resend timer + attempts meta use `formatI18nMessage` (`phone.otp.resendIn`, `phoneError.meta.*`) (FR-09.5).
- [ ] (P0) `verifyPage.title` / `subtitle` / `alreadyVerified` localized; **exclude** waitlist handoff stub (backlog L232).
- [ ] (P1) Disclosure EN in dictionary matches DOC-IDS-ONB-02 / backlog `phone.disclosure.body` (FR-09.4).
- [ ] (P1) Deprecate EN blobs in `phoneVerificationLabels.js` / `phoneVerificationErrorLabels.js`.
- [ ] (P1) Update phone vitest suites for `t()` / locale.

## Where to change
- `spa-app/src/components/PhoneVerification/` (Flow, panels, ErrorState)
- `spa-app/src/components/PhoneVerification/phoneVerificationLabels.js`
- `spa-app/src/components/PhoneVerification/phoneVerificationErrorLabels.js`
- `spa-app/src/auth/verificationFlowState.js`
- `spa-app/src/auth/verificationErrorMapping.js`
- `spa-app/src/pages/VerifyPage.jsx`
- `spa-app/src/components/PhoneVerification/__tests__/`, `spa-app/src/auth/__tests__/verificationErrorMapping.test.js`

## Out of scope
- ID-07 waitlist UI. SMS backend copy. Beauty/icons (story «Вне scope»).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/PhoneVerification src/auth/__tests__/verificationErrorMapping.test.js
npm run test:ui:verify-error
```
