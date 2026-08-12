# SPA-CAB-03-T02 — FE-derived civic state + Verify CTA

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../STORY-SPA-CAB-03-civic-status-in-cabinet.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) §FR-CAB-03.2–03.4, T02  
**Depends on:** T01  
**ui_scope:** `mixed`  
**extends:** T01 / M28  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T21:26:27Z
**Completed:** 2026-07-25T21:40:18Z

## Purpose
Закрыть FR-CAB-03.2 / 03.3 / 03.4 / T02: передать в `CivicStatusCard` поля `phone_verified`, `phone_verified_at`, `phone_dial_prefix` из `useSessionShell().profile`; `onVerify` → `/verify`; verified без повторного verify-prompt.

## Risk
Неверный wiring props → ложные civic states; CTA не на `/verify` ломает ID-04 handoff.

## Code Facts (re-verify at execute)
- [`DashboardPage.jsx`](../../../../../../../src/pages/DashboardPage.jsx) — `phoneVerified={Boolean(profile?.phone_verified)}`, `onVerify={() => navigate('/verify')}`, `flowPhase={CIVIC_FLOW_PHASES.IDLE}`.
- [`civicStatusState.js`](../../../../../../../src/auth/civicStatusState.js) — `deriveCivicStatusState`.
- [`SessionShellContext`](../../../../../../../src/auth/SessionShellContext.jsx) / `useSessionShell().profile`.

## AC / DoD
- [x] (P0) FR-CAB-03.4 / AC #2: `phone_verified=true/false` корректно через `CivicStatusCard`.
- [x] (P0) FR-CAB-03.2 / AC #3: unverified primary CTA Verify Account → `/verify`.
- [x] (P0) FR-CAB-03.3 / AC #3: verified — без лишнего verify prompt (M31 semantics).
- [x] (P1) `phone_verified_at` / `phone_dial_prefix` переданы как в Dashboard.

## Where to change
- `spa-app/src/pages/UserCabinetPage.jsx` — props + `useNavigate` / `CIVIC_FLOW_PHASES`

## Out of scope
- Icon assets (T03). New L10N keys (T04 — none). OTP modals (вне scope story).

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage CivicStatusCard
```
