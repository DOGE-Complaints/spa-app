# SPA-CAB-05-T01 — Mount WalletStatusCard in cabinet wallet slot

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-05-wallet-status-card.md`](../STORY-SPA-CAB-05-wallet-status-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md) §FR-CAB-05.1, T01  
**Depends on:** [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) — wallet slot in `UserCabinetPage`  
**ui_scope:** `mixed`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T13:51:04Z
**Completed:** 2026-07-26T19:35:18Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-50-wallet-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-50-wallet-state-sheet-spec.png

## Purpose
Закрыть FR-CAB-05.1 / T01: создать `<WalletStatusCard />` и смонтировать в слот Wallet (`cabinet-slot-wallet`, M99 top-right, не доминирует) вместо `cabinet.common.comingLater`.

## Risk
Без mount wallet stub не появляется на `/profile`; placeholder `comingLater` остаётся в wallet slot.

## Code Facts (re-verify at execute)
- [`UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) — `SECTION_SLOTS` id `wallet`; `testId: cabinet-slot-wallet`; non-account/civic/story slots → `cabinet.common.comingLater` (wallet still placeholder).
- Account / civic / story slots mount cards — образец mount branch (no slot-header when card owns title).
- No `WalletStatusCard` in `src/` yet (`rg WalletStatus` empty for component).

## AC / DoD
- [x] (P0) FR-CAB-05.1: `WalletStatusCard` смонтирован в wallet slot на `/profile`.
- [x] (P0) Placeholder `comingLater` убран из wallet slot.
- [x] (P1) Component scaffold ready for T02 states (default State A stub).
- [x] (P1) Wallet slot remains optional — does not block other cabinet sections.

## Where to change
- `spa-app/src/components/WalletStatus/` (new) — `WalletStatusCard.jsx` (+ index export)
- `spa-app/src/pages/UserCabinetPage.jsx` — wallet branch like account/civic/story

## Out of scope
- Runtime states A–C details (T02). Icons (T03). L10N keys (T04). Vitest suite (T05). Wallet-API.

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage
rg -n "WalletStatusCard|cabinet-slot-wallet" src/pages/UserCabinetPage.jsx src/components/WalletStatus
```
