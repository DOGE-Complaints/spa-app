# SPA-CAB-05-T08 — Fix wallet slot right-edge viewport clip

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-05-wallet-status-card.md`](../STORY-SPA-CAB-05-wallet-status-card.md)  
**Decision Ref:** [`../../../../../../analysis/audit-STORY-SPA-CAB-05-execution-2026-07-26.md`](../../../../../../analysis/audit-STORY-SPA-CAB-05-execution-2026-07-26.md) §V2  
**Depends on:** T01–T02 Done (wallet slot mounted)  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T20:03:47Z
**Completed:** 2026-07-26T20:31:48Z  
**Post-audit wave:** `run_mode=spa_cab_05_audit_2026_07_26`

## Purpose
Закрыть audit **V2**: устранить горизонтальный overflow — wallet-card обрезана правым краем viewport на 1536×1024 во всех mock-состояниях (03–09).

## Risk
Copy/CTA усечены (`…available late`); M50 layout parity неполная; систематично на 5+ кадрах.

## Code Facts (re-verify at execute)
- Slot CSS: [`.user-cabinet-page__slot--wallet`](../../../../../../../src/pages/UserCabinetPage.css) `grid-column: 10 / span 3` (L76–79).
- Grid: `.user-cabinet-page__grid` 12-col; wallet = rightmost top cell.
- Evidence: mock A/B/C + locales et/ru in [`../screenshots/full-cycle/`](../screenshots/full-cycle/) — right edge clipped.
- Function not blocked (CTA partially visible; comingSoon E1/E2 work).

## AC / DoD
- [x] (P0) Wallet slot (cols 10–12) fully fits main content width at viewport 1536×1024 (no right-edge clip of card border/copy).
- [x] (P0) Fix via CSS/grid (`UserCabinetPage.css` / related layout) — minmax / min-width / span adjustment as needed.
- [x] (P0) Re-shot mock A/B/C (and preferably locales) under story-root `screenshots/full-cycle/` or ui-baseline post — no clip.
- [x] (P1) Vitest UserCabinetPage / WalletStatus still PASS.
- [x] (P0) [`acceptance-verification-spa-cab-05-t08.md`](./acceptance-verification-spa-cab-05-t08.md) PASS with live `Date:` post verify.

## Where to change
- `spa-app/src/pages/UserCabinetPage.css` (primary)
- Possibly `WalletStatus.css` max-width / overflow if needed
- Screenshot re-capture via `npm run test:ui:cabinet-wallet-cab05` / `-full`

## Out of scope
- V1 live H1 (T07). Icon PNG replace (T09). Changing M99 column counts product-wide beyond wallet fit. New pkg.

## Verification
```bash
cd spa-app && npm test -- --run WalletStatus UserCabinetPage
cd spa-app && npm run test:ui:cabinet-wallet-cab05
# visual: 03–05 (and locales) — full card border visible, no mid-word clip
```

Gate: [`acceptance-verification-spa-cab-05-t08.md`](./acceptance-verification-spa-cab-05-t08.md) PASS.
