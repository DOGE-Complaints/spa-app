# SPA-CAB-02-T04 — Privacy no sensitive fields

**Status:** Todo  
**Story:** [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md) §FR-CAB-02.5, T04; Reuse [ID-03](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md)  
**Depends on:** [T03](../task-spa-cab-02-t03-ux-states-not-available/README.md)  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-12T08:03:15Z

## Purpose
Закрыть FR-CAB-02.5 / T04: privacy — не показывать raw phone, OTP, tokens в Account Summary (FR-08.7 / ID-08 patterns).

## Risk
Утечка `phone_dial_prefix` или session token в DOM нарушает AC #4 и privacy contract.

## Code Facts (re-verify at execute)
- [`useSessionShellState.js:11`](../../../../../../../src/auth/useSessionShellState.js) — «Never exposes raw tokens — only shellState + safe profile fields».
- [`identityService.js:7-16`](../../../../../../../src/auth/identityService.js) — mock profile includes `phone_dial_prefix`, `phone_verified_at` (must not render in AccountSummary).
- [`me_response.py:29-45`](../../../../../../../../doge-identity-service/src/core/api/me_response.py) — `/me` returns phone fields; Account Summary must not display raw phone.

## AC / DoD
- [x] (P0) FR-CAB-02.5: raw phone, OTP, tokens не отображаются в `AccountSummary`.
- [x] (P0) AC #4: Сырой номер/OTP/токены не отображаются.
- [x] (P1) Masked email only when email field present (dynamic value, not raw phone substitute).

## Where to change
- `spa-app/src/components/AccountSummary/AccountSummary.jsx` — field allowlist / redaction

## Out of scope
- CivicStatusCard phone display (ID-03/VerifyPage). Backend `/me` contract changes.

## Verification
```bash
cd spa-app && npm test -- --run AccountSummary
```
