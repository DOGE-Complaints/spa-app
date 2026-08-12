# SPA-CAB-02-T07 — Vitest states privacy parity

**Status:** Todo  
**Story:** [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md) T07  
**Depends on:** [T03](../task-spa-cab-02-t03-ux-states-not-available/README.md), [T04](../task-spa-cab-02-t04-privacy-no-sensitive-fields/README.md), [T05](../task-spa-cab-02-t05-l10n-cabinet-account-keys/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-12T08:03:15Z

## Purpose
Закрыть T07: Vitest — 3 UX-состояния + missing-field=`Not Available` + privacy + locale parity для `AccountSummary`.

## Risk
Без тестов регрессии privacy/state derivation не ловятся до gate.

## Code Facts (re-verify at execute)
- Pattern: [`CivicStatusCard.test.jsx`](../../../../../../../src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx).
- Pattern: [`identityLocaleSnapshots.test.jsx`](../../../../../../../src/i18n/__tests__/identityLocaleSnapshots.test.jsx) — locale parity.
- [`forbiddenVerificationTerms.js`](../../../../../../../src/i18n/forbiddenVerificationTerms.js) — forbidden terms guard.

## AC / DoD
- [x] (P0) Tests cover M24 complete / M25 minimal-data / M26 missing-email states.
- [x] (P0) Missing field renders `cabinet.common.notAvailable` (muted), not error class.
- [x] (P0) AC #4: DOM does not contain raw phone, OTP, token substrings from profile.
- [x] (P0) AC #6: et/ru/en label parity for `cabinet.account.*` keys (snapshot or explicit asserts).
- [x] (P1) `display_name`, `role` from mock profile appear when provided.

## Where to change
- `spa-app/src/components/AccountSummary/__tests__/AccountSummary.test.jsx` (new)

## Out of scope
- Puppeteer UI smoke (future gate). Story gate rollup (T08).

## Verification
```bash
cd spa-app && npm test -- --run AccountSummary
cd spa-app && npm test -- --run identityLocaleSnapshots
```
