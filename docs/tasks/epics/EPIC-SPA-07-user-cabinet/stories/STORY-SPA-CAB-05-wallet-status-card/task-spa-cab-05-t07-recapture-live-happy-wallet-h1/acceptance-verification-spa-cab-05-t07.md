# Story acceptance gate — SPA-CAB-05-T07 (post-audit V1)

- **Story:** STORY-SPA-CAB-05 — Wallet Status Card (gap T07)
- **Package:** active `pkg-000035` unchanged; queue via `run_mode=spa_cab_05_audit_2026_07_26`
- **Result:** PASS
- **Date:** 2026-07-26T20:28:59Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Live H1 re-captured without NETWORK_ERROR overlay | PASS | `01-happy-live-profile-wallet-stub-1536x1024.png` — profile fields populated (email/role/status); no Connection Problem / NETWORK_ERROR modal |
| `01-happy-live-profile-wallet-stub-1536x1024.png` shows wallet card on authenticated profile | PASS | `[data-wallet-status-card]` State A visible with account + civic + story |
| `screenshots/README.md` timestamp updated | PASS | Full-cycle PASS note `2026-07-26T20:28:59Z` (H1 re-shot) |
| H2 live-auth still present / PASS | PASS | `02-happy-live-auth-success-1536x1024.png` re-captured same run; runner exit 0 |

## Runner hardening

`cabinet-wallet-cab05-full-cycle.mjs` `openProfileWithWallet` waits until session-shell overlay has no NETWORK_ERROR and AccountSummary is not «Not Available» before H1 shot.

## Commands (live verification 2026-07-26T20:28:59Z)

```bash
# identity local :8100 must be up (make serve in doge-identity-service)
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm run test:ui:cabinet-wallet-cab05-full
# exit 0; H1 visual: no NETWORK_ERROR
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)

Scaffolded: 2026-07-26T20:03:47Z.
