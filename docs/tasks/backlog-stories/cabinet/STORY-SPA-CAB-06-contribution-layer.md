# STORY-SPA-CAB-06 — Contribution Layer (M53 full)

## Meta
- **Key:** `STORY-SPA-CAB-06-contribution-layer`
- **Epic:** [EPIC-SPA-07 User Cabinet](../epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md) · **Волна 3 (Blocks)**
- **Пакет:** `cabinet/`
- **Status:** ✅ Done
- **Severity:** 🟡 LOW-MED (M-4)

## Артборд (SSOT дизайна)

| Мокап | Роль | Спека (.md) | Картинка (.png) |
|-------|------|-------------|-----------------|
| **M53** | Contribution layer states (SSOT) | [spec](../../../UX/mockups/user%20profile/mockup-53-contribution-layer-state-sheet-spec.md) | [png](../../../UX/mockups/user%20profile/mockup-53-contribution-layer-state-sheet-spec.png) |
| **M23** | Empty composite §Civic Contributions | [spec](../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md) | [png](../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.png) |

## Зачем простыми словами
Нижняя секция кабинета: civic ledger — receipts, contribution events, reputation placeholder. Не gamification, не leaderboard.

## Функциональные требования (FR)
- **FR-CAB-06.1** Parent `<ContributionLayer />` с тремя дочерними карточками: Story Receipts, Contribution Records, Reputation.
- **FR-CAB-06.2** Story Receipts: A1 empty, A2 populated, A3 service unavailable + retry.
- **FR-CAB-06.3** Contribution Records: B1 empty, B2 populated, B3 service error + retry.
- **FR-CAB-06.4** Reputation: C1 coming later, C2 available (no numeric score/rank), C3 unavailable + retry.
- **FR-CAB-06.5** A1 empty **без** primary action `Submit Story` (post-MVP defer).
- **FR-CAB-06.6** Privacy M53 §5; ledger aesthetic, не social reputation.
- **FR-CAB-06.L10N** **Локализация (L10N) — сразу:** все строки через `t()` + `formatI18nMessage` для `{count}`; ключи `cabinet.contrib.*` + reuse `cabinet.common.*` в [`cabinetDictionary.js`](../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`, et/ru/en. Гид: [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md); EN — канон M53; A1 empty **без** Submit Story CTA.

## Post-MVP (не в AC)
- M53 A1 primary **`Submit Story`** — создание истории не из кабинета.

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | Parent `<ContributionLayer />` + 3 дочерние карточки (Receipts / Records / Reputation) в M99 Section 5 | новый компонент |
| **T02** | Story Receipts: A1 empty (**без** Submit Story CTA) / A2 populated / A3 unavailable+retry | `ContributionLayer.jsx` |
| **T03** | Contribution Records: B1 empty / B2 populated / B3 error+retry | `ContributionLayer.jsx` |
| **T04** | Reputation: C1 coming-later / C2 available (**без** numeric score/rank) / C3 unavailable+retry | `ContributionLayer.jsx` |
| **T05** | Privacy M53 §5; ledger-эстетика, не social reputation | `ContributionLayer.jsx` |
| **T06** | L10N `cabinet.contrib.*` (+`{count}`), reuse `cabinet.common.*`, et/ru/en, `CABINET_FLAT_KEYS` | `cabinetDictionary.js` |
| **T07** | Icon-wiring (см. Иконки); БЕЗ coin/gamification (каталог §Не включать) | `ContributionLayer.jsx` |
| **T08** | Vitest: 3 модуля × (empty/populated/unavailable) + parity | `__tests__` |
| **T09** | Story gate CAB-06 | — |

## Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](STORY-SPA-CAB-icon-assets.md) #19–#21 (генерация → `public/icons/user-cabinet/`) + §Reuse (story-handoff).

| Модуль / состояние | Файл | Путь | Каталог |
|--------------------|------|------|---------|
| A — Story Receipts | `ic-contrib-receipts.png` | `/icons/user-cabinet/ic-contrib-receipts.png` | #19 |
| B — Contribution Records | `ic-contrib-records.png` | `/icons/user-cabinet/ic-contrib-records.png` | #20 |
| C — Reputation (future) | `ic-contrib-reputation.png` | `/icons/user-cabinet/ic-contrib-reputation.png` | #21 |
| A3/B3/C3 unavailable | `ic-cloud-error.png` (reuse) | `/icons/story-handoff/ic-cloud-error.png` | §Reuse |
| Retry | `ic-auto-resubmit.png` (reuse) | `/icons/story-handoff/ic-auto-resubmit.png` | §Reuse |

> ⚠️ Метрики «Receipts: 12 / Contribution Events: 18» — **текст**, не иконки (каталог §Заметки).

## Routes / API — **весь слой UI-stub** (GW-CAB-03 Deferred, 2026-07-25)
> Contribution receipts/records **отсутствуют** на gateway ([GW-CAB-03 Deferred](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/cabinet-api/STORY-GW-CAB-03-contribution-layer-api.md)). SSOT: [api-requirements §2.3/§4](STORY-SPA-CAB-api-requirements.md).

- **MVP FE:** три карточки (Receipts / Records / Reputation) как **UI без HTTP**; affordances → `cabinet.common.comingSoon`.
- **Не вызывать** `GET /contribution/receipts` / `records` (endpoint нет).
- Reputation — post-MVP stub (C1 Coming Later) — то же правило Coming soon.
- A1 empty **без** Submit Story CTA (FR-CAB-06.5).

## Зависимости
- [CAB-01](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md).

## Вне scope
- Submit story from cabinet. Leaderboards, XP, token balances.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md): ключи `cabinet.contrib.*` в [`cabinetDictionary.js`](../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`; `{count}` через `formatI18nMessage`. EN — канон M53. Retry — reuse `cabinet.common.retry`.

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

> **Post-MVP** (не в MVP AC): `cabinet.contrib.receipts.submitStory` — см. [cabinet/README.md](README.md) §Post-MVP L10N.

## Acceptance Criteria
- [x] Три модуля видны на `/profile` bottom section (UI layout).
- [x] **Нет HTTP** к contribution endpoints; клики → `cabinet.common.comingSoon`.
- [x] Reputation C1 `Coming Later` / Coming soon.
- [x] A1 empty без Submit Story CTA.
- [x] Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.

**Follow-up:** live A2/B2 после GW-CAB-03.

## Швы
- M99 Section 5 — Contribution Layer placement.
