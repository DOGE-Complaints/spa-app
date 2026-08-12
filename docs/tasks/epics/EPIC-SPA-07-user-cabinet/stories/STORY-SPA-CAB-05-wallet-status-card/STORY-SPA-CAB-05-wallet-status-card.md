# STORY-SPA-CAB-05 — Wallet Status Card (M50 full)

## Meta (pipeline)

- **Key:** `STORY-SPA-CAB-05-wallet-status-card`
- **Parent Epic:** [`../../EPIC-SPA-07-user-cabinet.md`](../../EPIC-SPA-07-user-cabinet.md)
- **Epic:** EPIC-SPA-07 User Cabinet · **Волна 3 (Blocks)**
- **Пакет:** `cabinet/`
- **Status:** ✅ Done
- **MVP scope:** 🚫 **POST-MVP (wallet/web3)** — в MVP только **заглушка**. Решение 2026-07-12: wallet/web3 исключены из MVP.
- **Severity:** 🟡 LOW-MED (M-4)
- **Wave:** `pkg-000035`
- **Scaffolded:** 2026-07-26T13:51:04Z
- **Completed:** 2026-07-26T19:35:18Z
- **source:** [`spa-app/docs/tasks/backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md)
- **decision_ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md); [mockup-50-wallet-state-sheet-spec.md](../../../../../../UX/mockups/user%20profile/mockup-50-wallet-state-sheet-spec.md); [STORY-SPA-CAB-api-requirements.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md); [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)
- **ui_scope:** `mixed`
- **Gate:** [acceptance-verification-spa-cab-05.md](./task-spa-cab-05-t06-story-gate-cab-05/acceptance-verification-spa-cab-05.md) PASS
- **Screenshots:** [screenshots/](./screenshots/)

> ⚠️ **MVP = STUB** (решение 2026-07-12, подтверждено 2026-07-25 — [api-requirements](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md)). Карточка = State A «Wallet not linked»; любой affordance (`Connect Wallet` / `Manage Wallet`) → **`cabinet.common.comingSoon`**. **Wallet-API не вызывается.** Полные B/C + backend — post-MVP.

## Артборд (SSOT дизайна)

| Мокап | Роль | Спека (.md) | Картинка (.png) |
|-------|------|-------------|-----------------|
| **M50** | Wallet states A / B / C | [spec](../../../../../../UX/mockups/user%20profile/mockup-50-wallet-state-sheet-spec.md) | [png](../../../../../../UX/mockups/user%20profile/mockup-50-wallet-state-sheet-spec.png) |

> В MVP используется только State A (заглушка) — см. баннер выше; полные B/C — post-MVP.

## Зачем простыми словами
Wallet в кабинете — future authorship/trust layer, не DeFi. Показываем все три UX-состояния M50: не привязан, привязан, доступно подключение.

## Scope — Функциональные требования (FR)
- **FR-CAB-05.1** Компонент `<WalletStatusCard />` в слоте Wallet (M99 top-right, не доминирует).
- **FR-CAB-05.2** State A — `Wallet not linked`; optional disabled `Coming Later` до backend connect.
- **FR-CAB-05.3** State B — `Wallet linked`: truncated address, linked date, `Manage Wallet`.
- **FR-CAB-05.4** State C — `Connect wallet`: primary `Connect Wallet`, copy «optional».
- **FR-CAB-05.5** Язык: authorship infrastructure, не trading/speculation (M50 §1, §4).
- **FR-CAB-05.6** Privacy: no private keys, seed, full address by default, balances (M50 §5).
- **FR-CAB-05.L10N** **Локализация (L10N) — сразу:** все строки через `t()`; ключи `cabinet.wallet.*` + reuse `cabinet.common.comingLater` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`, et/ru/en. Гид: [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); EN — канон M50.

## Scope — Субтаски (backlog T01–T09 → pipeline tasks)
| Backlog | Pipeline task | Суть |
|---------|---------------|------|
| **T01** | [SPA-CAB-05-T01](./task-spa-cab-05-t01-mount-wallet-status-card/README.md) | `<WalletStatusCard />` в слоте Wallet |
| **T02–T05** | [SPA-CAB-05-T02](./task-spa-cab-05-t02-runtime-states-a-c-stub-no-api/README.md) | States A–C UI + authorship/privacy; MVP stub A; no wallet-API; Connect/Manage → comingSoon |
| **T07** | [SPA-CAB-05-T03](./task-spa-cab-05-t03-icon-wiring-wallet/README.md) | Icon-wiring #16–#18; без coin/DeFi |
| **T06** | [SPA-CAB-05-T04](./task-spa-cab-05-t04-l10n-cabinet-wallet-keys/README.md) | L10N `cabinet.wallet.*` + `CABINET_FLAT_KEYS` |
| **T08** | [SPA-CAB-05-T05](./task-spa-cab-05-t05-vitest-three-states-privacy/README.md) | Vitest: 3 states A–C + privacy + AC guards |
| **T09** | [SPA-CAB-05-T06](./task-spa-cab-05-t06-story-gate-cab-05/README.md) | Story gate CAB-05 |

## Scope — Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #16–#18. Кладутся в `public/icons/user-cabinet/`, в коде — `/icons/user-cabinet/ic-<name>.png`.

| Состояние | Файл | Путь | Каталог # |
|-----------|------|------|-----------|
| A — Wallet not linked | `ic-wallet-unlinked.png` | `/icons/user-cabinet/ic-wallet-unlinked.png` | #16 |
| B — Wallet linked | `ic-wallet-linked.png` | `/icons/user-cabinet/ic-wallet-linked.png` | #17 |
| C — Connect Wallet (primary) | `ic-wallet-connect.png` | `/icons/user-cabinet/ic-wallet-connect.png` | #18 |

> ⚠️ **Без** dogecoin/coin-арта и DeFi-символики (каталог §Не включать; M50 §4 authorship, не trading).

## Routes / API — POST-MVP (в MVP не вызывается)
- **MVP (2026-07-25):** wallet-API **не зовётся** — stub State A + `cabinet.common.comingSoon` по клику ([api-requirements §3/§4](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md)).
- **Post-MVP:** `wallet_status` / `wallet_address` / `wallet_linked_at`; владелец (identity vs wallet-сервис) не определён.

## DEV / test hooks

DEV-only screenshot/preview hook in [`UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) (`import.meta.env.DEV`): `sessionStorage['doge.wallet-preview']` forces Wallet Status state without wallet-API.

| Value | Effect |
|-------|--------|
| `unlinked` | state A — Wallet not linked (MVP default) |
| `linked` | state B — Wallet linked (UI preview) |
| `connect` | state C — Connect wallet (UI preview) |

Test URL: `/#/profile`.

Full-cycle (after P3): `cd spa-app && npm run test:ui:cabinet-wallet-cab05-full` → [screenshots/README.md](./screenshots/README.md).

## Зависимости
- [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md).

## Вне scope
- On-chain transaction history. Token balances.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): ключи `cabinet.wallet.*` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`. EN — канон M50. Truncated address и даты — динамические значения.

### `cabinet.wallet.*` (EN — канон M50; et/ru — перевод)

| key | en | et | ru |
|-----|----|----|----|
| `cabinet.wallet.stateA.title` | Wallet not linked | Rahakott pole ühendatud | Кошелёк не привязан |
| `cabinet.wallet.stateA.description` | Wallet signatures will be available later for proving authorship. | Rahakoti allkirjad on tulevikus autorluse tõendamiseks. | Подписи кошелька позже позволят подтверждать авторство. |
| `cabinet.wallet.stateA.cta` | *(reuse)* `cabinet.common.comingLater` | | |
| `cabinet.wallet.stateB.title` | Wallet linked | Rahakott ühendatud | Кошелёк привязан |
| `cabinet.wallet.stateB.field.address` | Address | Aadress | Адрес |
| `cabinet.wallet.stateB.field.linkedOn` | Linked on | Ühendatud | Привязан |
| `cabinet.wallet.stateB.manage` | Manage Wallet | Halda rahakotti | Управление кошельком |
| `cabinet.wallet.stateC.title` | Connect wallet | Ühenda rahakott | Подключить кошелёк |
| `cabinet.wallet.stateC.description` | Connect a Dogecoin address to prepare for future authorship proofs. | Ühenda Dogecoini aadress tulevaste autorluse tõendite jaoks. | Подключите адрес Dogecoin для будущих доказательств авторства. |
| `cabinet.wallet.stateC.connect` | Connect Wallet | Ühenda rahakott | Подключить кошелёк |
| `cabinet.wallet.stateC.optional` | Wallet connection is optional. | Rahakoti ühendamine on valikuline. | Подключение кошелька необязательно. |

## Acceptance Criteria (MVP — stub)
- [x] Карточка Wallet = **заглушка** State A «Wallet not linked» (не crypto-dashboard aesthetic).
- [x] Клик по `Connect Wallet`/`Manage Wallet` → `cabinet.common.comingSoon` («This feature is coming soon»); **wallet-API не вызывается**.
- [x] Wallet не блокирует остальной кабинет (optional layer).
- [x] Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.

**Post-MVP AC (не в MVP):** полные состояния B (linked) / C (connect) M50 + wallet-контракт.

## Швы
- Placement в [`UserprofileRoadmap.md`](../../../../../../backlog-stories/cabinet/UserprofileRoadmap.md) wave 3.
