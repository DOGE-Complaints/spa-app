# Story acceptance gate — SPA-CAB-05-T08 (post-audit V2)

- **Story:** STORY-SPA-CAB-05 — Wallet Status Card (gap T08)
- **Package:** active `pkg-000035` unchanged; queue via `run_mode=spa_cab_05_audit_2026_07_26`
- **Result:** PASS
- **Date:** 2026-07-26T20:31:48Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Wallet slot fully fits at 1536×1024 (no right-edge clip) | PASS | Puppeteer geometry: slot `r=1496` / viewport `1536`; card `r=1477`; `pageOverflow=0` `bodyOverflow=0` |
| Fix via CSS/grid | PASS | `UserCabinetPage.css`: wallet `grid-column: 9 / span 4` (was `10 / span 3`); civic/story `span 4`; `min-width:0` + `box-sizing`; `WalletStatus.css` `max-width:100%` + wrap; `index.css` `.board-workspace { min-width:0 }` |
| Mock A/B/C (+ locales) re-shot | PASS | full-cycle 03–09 replaced 2026-07-26T20:31:48Z |
| Vitest WalletStatus / UserCabinetPage PASS | PASS | 17/17 |
| Gate artifact live Date | PASS | this file |

## Commands (live verification 2026-07-26T20:31:48Z)

```bash
cd spa-app && npm test -- --run WalletStatus UserCabinetPage
cd spa-app && npm run test:ui:cabinet-wallet-cab05-full
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)

Scaffolded: 2026-07-26T20:03:47Z.
