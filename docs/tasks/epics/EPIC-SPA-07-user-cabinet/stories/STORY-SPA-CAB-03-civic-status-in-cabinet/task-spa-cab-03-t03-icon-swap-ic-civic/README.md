# SPA-CAB-03-T03 — Icon-swap unicode → ic-civic-*

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../STORY-SPA-CAB-03-civic-status-in-cabinet.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) §Иконки, T03  
**Depends on:** T01 (card mounted); icons on disk  
**ui_scope:** `mixed`  
**extends:** ui-mockup M28 / T01  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T21:26:27Z
**Completed:** 2026-07-25T21:40:18Z

@mockup: ../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.png

## Purpose
Закрыть T03: заменить unicode `○ ! … ✓` в `CivicStatusCard` на `/icons/user-cabinet/ic-civic-*.png` (#5–#9). **Change-propagation:** компонент общий — затрагивает `/dashboard` и `/profile`.

## Risk
Регрессия Dashboard визуала/a11y; битые пути иконок → пустой icon slot.

## Code Facts (re-verify at execute)
- [`CivicStatusCard.jsx`](../../../../../../../src/components/CivicStatus/CivicStatusCard.jsx) — `civic-status-card__icon` still unicode.
- Assets present: `public/icons/user-cabinet/ic-civic-{unverified,verify-required,in-progress,verified,failed}.png`.
- Consumers: `DashboardPage`, `UserCabinetPage` (after T01), `VerifyPage`.

## AC / DoD
- [x] (P0) Пять состояний M28 используют соответствующие `ic-civic-*.png` (не unicode).
- [x] (P0) Dashboard + Profile показывают те же icon assets (один компонент).
- [x] (P1) `alt`/aria-hidden consistent with prior icon treatment.

## Where to change
- `spa-app/src/components/CivicStatus/CivicStatusCard.jsx` (+ CSS if needed)
- Do **not** duplicate assets; paths `/icons/user-cabinet/ic-civic-*.png`

## Out of scope
- New icon design. Wallet icons. CAB-04+ section icons.

## Verification
```bash
cd spa-app && npm test -- --run CivicStatusCard
cd spa-app && npm test -- --run DashboardPage
ls public/icons/user-cabinet/ic-civic-*.png
```
