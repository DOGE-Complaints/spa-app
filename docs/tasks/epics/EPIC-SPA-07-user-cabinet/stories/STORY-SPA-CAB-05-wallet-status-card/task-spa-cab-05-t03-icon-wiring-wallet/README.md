# SPA-CAB-05-T03 — Icon wiring Wallet (#16–#18)

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-05-wallet-status-card.md`](../STORY-SPA-CAB-05-wallet-status-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md) §Иконки, T07  
**Depends on:** T01–T02  
**ui_scope:** `visual`  
**extends:** mockup M50 / T01  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T13:51:04Z
**Completed:** 2026-07-26T19:35:18Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-50-wallet-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-50-wallet-state-sheet-spec.png

## Purpose
Закрыть T07: подключить иконки Wallet из каталога #16–#18 в `WalletStatusCard`; **без** coin/DeFi символики.

## Risk
Unicode/emoji или dogecoin art вместо catalog icons → drift vs M50 и icon inventory §Не включать.

## Code Facts (re-verify at execute)
- On disk: `public/icons/user-cabinet/ic-wallet-{unlinked,linked,connect}.png` (may be 1096 B blank placeholders — wire paths; real assets = post-audit if needed).
- Code paths: `/icons/user-cabinet/ic-wallet-*.png`.
- Catalog SSOT: [`STORY-SPA-CAB-icon-assets.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #16–#18.

## AC / DoD
- [x] (P0) State A / B / C icons wired to catalog paths `#16` / `#17` / `#18`.
- [x] (P0) No coin/DeFi / dogecoin art in Wallet UI.
- [x] (P1) No unicode glyph placeholders for these states in Wallet Status UI.

## Where to change
- `spa-app/src/components/WalletStatus/WalletStatusCard.jsx` (icon map / `<img src=…>`)

## Out of scope
- Generating new PNG assets (files already on disk). L10N keys (T04). Wallet-API.

## Verification
```bash
ls spa-app/public/icons/user-cabinet/ic-wallet-unlinked.png spa-app/public/icons/user-cabinet/ic-wallet-linked.png spa-app/public/icons/user-cabinet/ic-wallet-connect.png
cd spa-app && npm test -- --run WalletStatus
```
