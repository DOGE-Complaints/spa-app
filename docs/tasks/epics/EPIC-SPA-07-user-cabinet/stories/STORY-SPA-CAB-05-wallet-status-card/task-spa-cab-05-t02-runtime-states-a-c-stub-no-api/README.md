# SPA-CAB-05-T02 — Runtime states A–C stub (no wallet-API)

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-05-wallet-status-card.md`](../STORY-SPA-CAB-05-wallet-status-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md) §FR-CAB-05.2–05.6, T02–T05, Routes/API, AC (MVP stub)  
**Depends on:** T01  
**ui_scope:** `mixed`  
**extends:** T01 / ui-mockup M50  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T13:51:04Z
**Completed:** 2026-07-26T19:35:18Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-50-wallet-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-50-wallet-state-sheet-spec.png

## Purpose
Закрыть FR-CAB-05.2–.6 и backlog T02–T05: UI layout для states A–C (один за раз); MVP default = State A stub; **нет** wallet-API; `Connect Wallet` / `Manage Wallet` → `cabinet.common.comingSoon`; authorship language (не trading); privacy (no keys/seed/full address by default/balances).

## Risk
Live wallet-API / crypto-dashboard aesthetic нарушает MVP AC; Connect/Manage без comingSoon → false “connected” UX.

## Code Facts (re-verify at execute)
- MVP AC (backlog): stub State A; Connect/Manage → `cabinet.common.comingSoon`; wallet-API не вызывается.
- FR-CAB-05.2: State A optional disabled `Coming Later` (reuse `cabinet.common.comingLater`).
- `cabinet.common.comingSoon` / `comingLater` already in [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js).
- DEV hook (pipeline story): `sessionStorage['doge.wallet-preview']` = `unlinked` | `linked` | `connect`.

## AC / DoD
- [x] (P0) AC #1: Wallet card = stub State A «Wallet not linked» (не crypto-dashboard aesthetic).
- [x] (P0) AC #2: Click `Connect Wallet` / `Manage Wallet` → `cabinet.common.comingSoon`; **wallet-API не вызывается**.
- [x] (P0) AC #3: Wallet optional — не блокирует остальной кабинет.
- [x] (P0) FR-CAB-05.2–.4: UI layouts A / B / C available (B/C via DEV preview; live backend = post-MVP).
- [x] (P0) FR-CAB-05.5: authorship language only (no trading/speculation copy).
- [x] (P0) FR-CAB-05.6: privacy — no private keys, seed, full address by default, balances.

## Where to change
- `spa-app/src/components/WalletStatus/WalletStatusCard.jsx` (+ helpers/state if needed)
- `spa-app/src/pages/UserCabinetPage.jsx` — props / `doge.wallet-preview` hook

## Out of scope
- Icon asset wiring paths (T03). Dictionary keys table (T04). Vitest (T05). Live wallet contract (post-MVP).

## Verification
```bash
cd spa-app && npm test -- --run WalletStatus UserCabinetPage
rg -n "fetch\\(|wallet_status|wallet_address" src/components/WalletStatus || true
```
