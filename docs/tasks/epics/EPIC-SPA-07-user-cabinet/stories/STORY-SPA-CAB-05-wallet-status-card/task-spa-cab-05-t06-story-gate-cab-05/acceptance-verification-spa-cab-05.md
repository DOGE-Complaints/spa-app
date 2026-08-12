# Story acceptance gate — STORY-SPA-CAB-05-wallet-status-card

- **Story:** STORY-SPA-CAB-05 — Wallet Status Card
- **Package:** `pkg-000035-20260726-epic-spa-07-cab-05-wallet-status-card.yaml`
- **Result:** PASS
- **Date:** 2026-07-26T19:35:18Z (code + UI gate); story-root screenshots PASS **2026-07-26T19:35:18Z**

## AC checklist (verbatim from backlog / pipeline story — MVP stub)

| AC | Status | Evidence |
|----|--------|----------|
| Карточка Wallet = **заглушка** State A «Wallet not linked» (не crypto-dashboard aesthetic). | PASS | `WalletStatusCard` default `unlinked`; H1/H3; Vitest default stub |
| Клик по `Connect Wallet`/`Manage Wallet` → `cabinet.common.comingSoon`; **wallet-API не вызывается**. | PASS | Manage/Connect → comingSoon notice; no `fetch` in component; E1/E2; Vitest |
| Wallet не блокирует остальной кабинет (optional layer). | PASS | other slots (civic/story/account) still render; UserCabinetPage test |
| Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет. | PASS | `cabinetDictionary.js` wallet keys + flat keys; E3/E4; cabinetDictionary test |

## UI acceptance (story-root + anchor T01)

| Check | Status | Evidence |
|-------|--------|----------|
| ui-mockup-spec.md Path A M50 | PASS | [ui-mockup-spec.md](../task-spa-cab-05-t01-mount-wallet-status-card/ui-mockup-spec.md) |
| Story-root screenshots index | PASS | [screenshots/README.md](../../screenshots/README.md) |
| Live happy H1 | PASS | [01-happy-live-profile-wallet-stub-1536x1024.png](../../screenshots/full-cycle/01-happy-live-profile-wallet-stub-1536x1024.png) |
| Live auth H2 | PASS | [02-happy-live-auth-success-1536x1024.png](../../screenshots/full-cycle/02-happy-live-auth-success-1536x1024.png) |
| Happy mock H3–H5 | PASS | [03](../../screenshots/full-cycle/03-happy-mock-wallet-unlinked-stub-1536x1024.png)·[04](../../screenshots/full-cycle/04-happy-mock-wallet-linked-1536x1024.png)·[05](../../screenshots/full-cycle/05-happy-mock-wallet-connect-1536x1024.png) |
| Edge E1–E4 | PASS | [06](../../screenshots/full-cycle/06-edge-mock-manage-coming-soon-1536x1024.png)…[09](../../screenshots/full-cycle/09-edge-mock-locale-ru-wallet-unlinked-1536x1024.png) |
| archive UI-0/3 baselines | PASS | [screenshots/archive/](../../screenshots/archive/) |
| Icons ic-wallet-* wired | PASS | ICONS map + Vitest header icon |

## Commands (screenshots closed 2026-07-26T19:35:18Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run WalletStatus UserCabinetPage cabinetDictionary
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:cabinet-wallet-cab05-full
```

## Notes

- Post-MVP AC (B/C live + wallet contract) — **out of this gate**.
- Icons #16–#18 may still be 1096 B placeholders (wire paths OK; real assets = post-audit if needed).
