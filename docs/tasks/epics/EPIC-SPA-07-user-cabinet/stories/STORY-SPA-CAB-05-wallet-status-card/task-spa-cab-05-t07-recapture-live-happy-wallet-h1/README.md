# SPA-CAB-05-T07 — Re-capture live happy wallet H1 (no NETWORK_ERROR)

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-05-wallet-status-card.md`](../STORY-SPA-CAB-05-wallet-status-card.md)  
**Decision Ref:** [`../../../../../../analysis/audit-STORY-SPA-CAB-05-execution-2026-07-26.md`](../../../../../../analysis/audit-STORY-SPA-CAB-05-execution-2026-07-26.md) §V1  
**Depends on:** T06 Done (story gate); identity `/me` reachable for live run  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T20:03:47Z
**Completed:** 2026-07-26T20:28:59Z  
**Post-audit wave:** `run_mode=spa_cab_05_audit_2026_07_26`

## Purpose
Закрыть audit **V1**: пере-снять live full-cycle H1 так, чтобы `01-happy-live-profile-wallet-stub-1536x1024.png` показал аутентифицированный профиль с видимой wallet-карточкой **без** overlay `NETWORK_ERROR` / «Connection Problem».

## Risk
Оставить H1 в error-state → Done-запись CAB-05 выглядит как live-happy evidence, но кадр не демонстрирует stub wallet на чистом профиле (evidence gap Med→High).

## Code Facts (re-verify at execute)
- Current H1: [`../screenshots/full-cycle/01-happy-live-profile-wallet-stub-1536x1024.png`](../screenshots/full-cycle/01-happy-live-profile-wallet-stub-1536x1024.png) — audit: NETWORK_ERROR overlay; account «Not Available».
- Live-auth H2 PASS: [`02-happy-live-auth-success-1536x1024.png`](../screenshots/full-cycle/02-happy-live-auth-success-1536x1024.png).
- Runner: `npm run test:ui:cabinet-wallet-cab05-full` → [`tests/puppeteer/cabinet-wallet-cab05-full-cycle.mjs`](../../../../../../../tests/puppeteer/cabinet-wallet-cab05-full-cycle.mjs).
- Indexer: [`../screenshots/README.md`](../screenshots/README.md).
- Card UI-only stub — не зависит от `/me`; gap = artifact quality, не код WalletStatusCard.

## AC / DoD
- [x] (P0) Re-run live full-cycle with reachable gateway/identity `/me` (no NETWORK_ERROR modal on profile).
- [x] (P0) Replace `screenshots/full-cycle/01-happy-live-profile-wallet-stub-1536x1024.png` — wallet card visible, no Connection Problem overlay.
- [x] (P0) Update `screenshots/README.md` capture timestamp / note for H1 re-shot.
- [x] (P1) H2 live-auth still PASS (or re-captured in same run).
- [x] (P0) [`acceptance-verification-spa-cab-05-t07.md`](./acceptance-verification-spa-cab-05-t07.md) PASS with live `Date:` post verify.

## Where to change
- `spa-app/docs/tasks/epics/.../STORY-SPA-CAB-05-wallet-status-card/screenshots/full-cycle/01-*.png` (replace)
- `spa-app/docs/tasks/epics/.../STORY-SPA-CAB-05-wallet-status-card/screenshots/README.md`
- Optionally harden wait/assert in `cabinet-wallet-cab05-full-cycle.mjs` if flaky `/me` (only if needed for reliable H1)

## Out of scope
- V2 CSS clip (T08). Icon PNG replace (T09). Wallet-API. New pkg.

## Verification
```bash
cd spa-app && npm run test:ui:cabinet-wallet-cab05-full
ls -la docs/tasks/epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-05-wallet-status-card/screenshots/full-cycle/01-happy-live-profile-wallet-stub-1536x1024.png
# visual: no NETWORK_ERROR / Connection Problem on H1
```

Gate: [`acceptance-verification-spa-cab-05-t07.md`](./acceptance-verification-spa-cab-05-t07.md) PASS.
