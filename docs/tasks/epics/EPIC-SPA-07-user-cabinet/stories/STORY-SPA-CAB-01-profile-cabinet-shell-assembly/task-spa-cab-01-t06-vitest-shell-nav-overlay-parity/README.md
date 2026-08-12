# SPA-CAB-01-T06 — Vitest shell / nav / overlay / parity

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) T06 — all AC  
**Depends on:** [T01](../task-spa-cab-01-t01-profile-route-user-cabinet-page/README.md)–[T05](../task-spa-cab-01-t05-protected-overlay-dashboard-unchanged/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T12:34:41Z

## Purpose
Vitest: рендер кабинета (не placeholder), active `Profile` nav, overlay при `logged_out`, locale / flat-keys parity для shell keys.

## Risk
Gate без automated evidence → false Done.

## Code Facts (re-verify at execute)
- Existing: [`UserCabinetPage.test.jsx`](../../../../../../../src/pages/__tests__/UserCabinetPage.test.jsx), [`sessionRoutePolicy.test.js`](../../../../../../../src/router/__tests__/sessionRoutePolicy.test.js).
- Extend coverage for M99 slots, Profile nav active, overlay, L10N parity (`CABINET_FLAT_KEYS` / `IDENTITY_FLAT_KEYS` for shell keys).

## AC / DoD
- [x] (P0) Tests cover AC #1–#5 evidence paths (cabinet render, layout slots, overlay, dashboard unchanged, L10N parity).
- [x] (P0) Active Profile nav asserted.
- [x] (P0) Locale parity for shell keys (et/ru/en).

## Where to change
- `spa-app/src/pages/__tests__/UserCabinetPage.test.jsx` (extend)
- `spa-app/src/router/__tests__/sessionRoutePolicy.test.js` (verify/extend)
- Nav / i18n parity tests as needed

## Out of scope
- Puppeteer UI baseline (optional Path A on T02/T04). Story gate writeup (T07).

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage sessionRoutePolicy
```
