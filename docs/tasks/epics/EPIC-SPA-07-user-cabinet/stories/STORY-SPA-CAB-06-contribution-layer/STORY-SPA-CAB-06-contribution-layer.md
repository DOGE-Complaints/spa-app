# STORY-SPA-CAB-06 — Contribution Layer (M53 full)

## Meta (pipeline)

- **Key:** `STORY-SPA-CAB-06-contribution-layer`
- **Parent Epic:** [`../../EPIC-SPA-07-user-cabinet.md`](../../EPIC-SPA-07-user-cabinet.md)
- **Epic:** EPIC-SPA-07 User Cabinet · **Волна 3 (Blocks)**
- **Пакет:** `cabinet/`
- **Status:** ✅ Done
- **MVP scope:** ✅ **UI stub** — весь слой без HTTP (GW-CAB-03 Deferred, 2026-07-25)
- **Severity:** 🟡 LOW-MED (M-4)
- **Wave:** `pkg-000036`
- **Scaffolded:** 2026-07-27T14:45:14Z
- **source:** [`spa-app/docs/tasks/backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md)
- **decision_ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md); [mockup-53-contribution-layer-state-sheet-spec.md](../../../../../../UX/mockups/user%20profile/mockup-53-contribution-layer-state-sheet-spec.md); [mockup-23-user-cabinet-empty-new-user-spec.md](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md); [STORY-SPA-CAB-api-requirements.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md); [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)
- **ui_scope:** `mixed`
- **Gate:** [acceptance-verification-spa-cab-06.md](./task-spa-cab-06-t06-story-gate-cab-06/acceptance-verification-spa-cab-06.md)
- **Post-audit:** [SPA-CAB-06-T07](./task-spa-cab-06-t07-recapture-mock-full-cycle-no-session-expired/README.md) **Done** — V1 mock 03–10 re-shot without Session Expired (`run_mode=spa_cab_06_audit_2026_07_28`, gate 2026-07-28T11:13:39Z).

> ⚠️ **MVP = UI STUB** (подтверждено 2026-07-25 — [api-requirements](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md)). Три карточки без HTTP; affordances → **`cabinet.common.comingSoon`**. **Не вызывать** `GET /contribution/receipts` / `records`. A1 empty **без** Submit Story CTA. Live A2/B2 — follow-up после GW-CAB-03.

## Артборд (SSOT дизайна)

| Мокап | Роль | Спека (.md) | Картинка (.png) |
|-------|------|-------------|-----------------|
| **M53** | Contribution layer states (SSOT) | [spec](../../../../../../UX/mockups/user%20profile/mockup-53-contribution-layer-state-sheet-spec.md) | [png](../../../../../../UX/mockups/user%20profile/mockup-53-contribution-layer-state-sheet-spec.png) |
| **M23** | Empty composite §Civic Contributions | [spec](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md) | [png](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.png) |

## Зачем простыми словами
Нижняя секция кабинета: civic ledger — receipts, contribution events, reputation placeholder. Не gamification, не leaderboard.

## Scope — Функциональные требования (FR)
- **FR-CAB-06.1** Parent `<ContributionLayer />` с тремя дочерними карточками: Story Receipts, Contribution Records, Reputation.
- **FR-CAB-06.2** Story Receipts: A1 empty, A2 populated, A3 service unavailable + retry.
- **FR-CAB-06.3** Contribution Records: B1 empty, B2 populated, B3 service error + retry.
- **FR-CAB-06.4** Reputation: C1 coming later, C2 available (no numeric score/rank), C3 unavailable + retry.
- **FR-CAB-06.5** A1 empty **без** primary action `Submit Story` (post-MVP defer).
- **FR-CAB-06.6** Privacy M53 §5; ledger aesthetic, не social reputation.
- **FR-CAB-06.L10N** **Локализация (L10N) — сразу:** все строки через `t()` + `formatI18nMessage` для `{count}`; ключи `cabinet.contrib.*` + reuse `cabinet.common.*` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`, et/ru/en. Гид: [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); EN — канон M53; A1 empty **без** Submit Story CTA.

## Post-MVP (не в AC)
- M53 A1 primary **`Submit Story`** — создание истории не из кабинета.

## Scope — Субтаски (backlog T01–T09 → pipeline tasks)
| Backlog | Pipeline task | Суть |
|---------|---------------|------|
| **T01** | [SPA-CAB-06-T01](./task-spa-cab-06-t01-mount-contribution-layer/README.md) | Parent `<ContributionLayer />` + 3 cards в M99 Section 5 |
| **T02–T05** | [SPA-CAB-06-T02](./task-spa-cab-06-t02-runtime-states-a1-c3-stub-no-api/README.md) | A1–C3 UI stub; no HTTP; no Submit CTA; privacy/ledger; comingSoon |
| **T07** | [SPA-CAB-06-T03](./task-spa-cab-06-t03-icon-wiring-contrib/README.md) | Icon-wiring #19–21 + reuse cloud/retry; без coin/gamification |
| **T06** | [SPA-CAB-06-T04](./task-spa-cab-06-t04-l10n-cabinet-contrib-keys/README.md) | L10N `cabinet.contrib.*` + `CABINET_FLAT_KEYS` |
| **T08** | [SPA-CAB-06-T05](./task-spa-cab-06-t05-vitest-three-modules-parity/README.md) | Vitest: 3×(empty/populated/unavailable) + parity |
| **T09** | [SPA-CAB-06-T06](./task-spa-cab-06-t06-story-gate-cab-06/README.md) | Story gate CAB-06 |

## Scope — Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #19–#21 (генерация → `public/icons/user-cabinet/`) + §Reuse (story-handoff).

| Модуль / состояние | Файл | Путь | Каталог |
|--------------------|------|------|---------|
| A — Story Receipts | `ic-contrib-receipts.png` | `/icons/user-cabinet/ic-contrib-receipts.png` | #19 |
| B — Contribution Records | `ic-contrib-records.png` | `/icons/user-cabinet/ic-contrib-records.png` | #20 |
| C — Reputation (future) | `ic-contrib-reputation.png` | `/icons/user-cabinet/ic-contrib-reputation.png` | #21 |
| A3/B3/C3 unavailable | `ic-cloud-error.png` (reuse) | `/icons/story-handoff/ic-cloud-error.png` | §Reuse |
| Retry | `ic-auto-resubmit.png` (reuse) | `/icons/story-handoff/ic-auto-resubmit.png` | §Reuse |

> ⚠️ Метрики «Receipts: 12 / Contribution Events: 18» — **текст**, не иконки (каталог §Заметки). Без coin/gamification (каталог §Не включать).

## Routes / API — **весь слой UI-stub** (GW-CAB-03 Deferred, 2026-07-25)
> Contribution receipts/records **отсутствуют** на gateway ([GW-CAB-03 Deferred](../../../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/cabinet-api/STORY-GW-CAB-03-contribution-layer-api.md)). SSOT: [api-requirements §2.3/§4](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md).

- **MVP FE:** три карточки (Receipts / Records / Reputation) как **UI без HTTP**; affordances → `cabinet.common.comingSoon`.
- **Не вызывать** `GET /contribution/receipts` / `records` (endpoint нет).
- Reputation — post-MVP stub (C1 Coming Later) — то же правило Coming soon.
- A1 empty **без** Submit Story CTA (FR-CAB-06.5).

## DEV / test hooks

DEV-only screenshot/preview hook in [`UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) (`import.meta.env.DEV`): `sessionStorage['doge.contrib-preview']` forces Contribution Layer module states without HTTP.

| Value | Effect |
|-------|--------|
| `receipts-empty` / omit | A1 — Story Receipts empty (MVP default) |
| `receipts-populated` | A2 — receipts populated (UI preview) |
| `receipts-unavailable` | A3 — unavailable + retry |
| `records-empty` | B1 — records empty |
| `records-populated` | B2 — records populated |
| `records-unavailable` | B3 — error + retry |
| `reputation-later` | C1 — Coming Later (MVP default for Reputation) |
| `reputation-available` | C2 — available (no numeric score/rank) |
| `reputation-unavailable` | C3 — unavailable + retry |

Test URL: `/#/profile`.

Full-cycle (after P3): `cd spa-app && npm run test:ui:cabinet-contrib-cab06-full` → [screenshots/README.md](./screenshots/README.md) (создаётся в P3).

## Зависимости
- [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md).

## Вне scope
- Submit story from cabinet. Leaderboards, XP, token balances.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): ключи `cabinet.contrib.*` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`; `{count}` через `formatI18nMessage`. EN — канон M53. Retry — reuse `cabinet.common.retry`.

### `cabinet.contrib.*` (EN — канон M53; et/ru — перевод)

| key | en | et | ru |
|-----|----|----|----|
| `cabinet.contrib.layerTitle` | Contribution Layer | Panustamise kiht | Слой вклада |
| `cabinet.contrib.receipts.title` | Story Receipts | Lugude kviitungid | Квитанции историй |
| `cabinet.contrib.receipts.empty` | No story receipts recorded yet. | Ühtegi loo kviitungit pole veel salvestatud. | Квитанции историй ещё не записаны. |
| `cabinet.contrib.receipts.metric` | Receipts: {count} | Kviitungid: {count} | Квитанции: {count} |
| `cabinet.contrib.receipts.unavailable` | Receipt data temporarily unavailable. | Kviitungi andmed on ajutiselt kättesaamatud. | Данные квитанций временно недоступны. |
| `cabinet.contrib.records.title` | Contribution Records | Panustamise kirjed | Записи вклада |
| `cabinet.contrib.records.empty` | No contribution records yet. | Panustamise kirjeid pole veel. | Записей вклада пока нет. |
| `cabinet.contrib.records.metric` | Contribution Events: {count} | Panustamise sündmused: {count} | События вклада: {count} |
| `cabinet.contrib.records.unavailable` | Contribution history unavailable. | Panustamise ajalugu pole saadaval. | История вклада недоступна. |
| `cabinet.contrib.records.event.storySubmitted` | Story Submitted | Lugu esitatud | История отправлена |
| `cabinet.contrib.records.event.storyUpdated` | Story Updated | Lugu uuendatud | История обновлена |
| `cabinet.contrib.records.event.issueParticipated` | Issue Participated | Probleemis osaletud | Участие в обращении |
| `cabinet.contrib.reputation.title` | Reputation | Maine | Репутация |
| `cabinet.contrib.reputation.comingLater` | Reputation features will become available in a future release. | Mainefunktsioonid on tulevases versioonis. | Функции репутации появятся в будущем релизе. |
| `cabinet.contrib.reputation.badge` | *(reuse)* `cabinet.common.comingLater` | | |
| `cabinet.contrib.reputation.metric.consistency` | Participation Consistency | Osalemise järjepidevus | Последовательность участия |
| `cabinet.contrib.reputation.metric.verified` | Verified Contributions | Kinnitatud panused | Подтверждённые вклады |
| `cabinet.contrib.reputation.metric.trust` | Community Trust Signals | Kogukonna usaldusmärgid | Сигналы доверия сообщества |
| `cabinet.contrib.reputation.unavailable` | Reputation data unavailable. | Maine andmed pole saadaval. | Данные репутации недоступны. |
| `cabinet.contrib.retry` | *(reuse)* `cabinet.common.retry` | | |

> **Post-MVP** (не в MVP AC): `cabinet.contrib.receipts.submitStory` — см. [cabinet/README.md](../../../../../../backlog-stories/cabinet/README.md) §Post-MVP L10N.

## Acceptance Criteria
- [x] Три модуля видны на `/profile` bottom section (UI layout).
- [x] **Нет HTTP** к contribution endpoints; клики → `cabinet.common.comingSoon`.
- [x] Reputation C1 `Coming Later` / Coming soon.
- [x] A1 empty без Submit Story CTA.
- [x] Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.

**Follow-up:** live A2/B2 после GW-CAB-03.

## Швы
- M99 Section 5 — Contribution Layer placement.
