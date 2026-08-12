# SPA-CAB-05-T09 — Replace ic-wallet placeholder PNG assets

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-05-wallet-status-card.md`](../STORY-SPA-CAB-05-wallet-status-card.md)  
**Decision Ref:** [`../../../../../../analysis/audit-STORY-SPA-CAB-05-execution-2026-07-26.md`](../../../../../../analysis/audit-STORY-SPA-CAB-05-execution-2026-07-26.md) §V-icon; [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #16–#18  
**Depends on:** T03 Done (paths wired); assets currently blank placeholders  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T20:03:47Z
**Completed:** 2026-07-26T20:35:05Z  
**Post-audit wave:** `run_mode=spa_cab_05_audit_2026_07_26`

## Purpose
Закрыть audit **V-icon**: заменить 3 blank placeholder PNG (`1096` bytes each) в `public/icons/user-cabinet/` реальной арт-графикой по каталогу #16–#18. **Код не трогать** — `ICONS` в `WalletStatusCard` уже указывает на эти пути.

## Risk
Placeholder-ok закрывает wire/slot, но визуал M50 остаётся пустым кружком; без реальных ассетов artboard parity неполная.

## Code Facts (re-verify at execute)
- On disk (1096 B blanks): `ic-wallet-unlinked.png`, `ic-wallet-linked.png`, `ic-wallet-connect.png` under `public/icons/user-cabinet/`.
- Wire unchanged: [`WalletStatusCard.jsx`](../../../../../../../src/components/WalletStatus/WalletStatusCard.jsx) `ICONS` map L10–14.
- Spec: [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #16–#18; **без** coin/DeFi (каталог §Не включать).
- Pattern: [SPA-CAB-04-T07](../../STORY-SPA-CAB-04-story-activity-card/task-spa-cab-04-t07-replace-ic-story-placeholder-assets/README.md) assets-only replace.

## AC / DoD
- [x] (P0) Три файла заменены; размер каждого ≫ 1096 B (реальный PNG с alpha).
- [x] (P0) Имена/пути неизменны (`ic-wallet-unlinked|linked|connect.png`).
- [x] (P0) Стиль: icon-assets conventions (256×256, thin stroke, transparent BG); **no** dogecoin/coin/DeFi symbolism.
- [x] (P1) Vitest WalletStatus still PASS (icon src assertions).
- [x] (P1) **No** changes to `WalletStatusCard.jsx` / CSS in this task (assets only).
- [x] (P0) [`acceptance-verification-spa-cab-05-t09.md`](./acceptance-verification-spa-cab-05-t09.md) PASS with live `Date:` post verify.

## Where to change
- `spa-app/public/icons/user-cabinet/ic-wallet-unlinked.png`
- `spa-app/public/icons/user-cabinet/ic-wallet-linked.png`
- `spa-app/public/icons/user-cabinet/ic-wallet-connect.png`

## Out of scope
- V1 live H1 (T07). V2 CSS clip (T08). JSX path renames. New pkg.

## Verification
```bash
cd spa-app && ls -la public/icons/user-cabinet/ic-wallet-*.png
cd spa-app && npm test -- --run WalletStatus
```

Gate: [`acceptance-verification-spa-cab-05-t09.md`](./acceptance-verification-spa-cab-05-t09.md) PASS.
