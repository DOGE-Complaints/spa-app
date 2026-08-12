# STORY-SPA-CAB-04 — Story Activity Card

## Meta (pipeline)

- **Key:** `STORY-SPA-CAB-04-story-activity-card`
- **Parent Epic:** [`../../EPIC-SPA-07-user-cabinet.md`](../../EPIC-SPA-07-user-cabinet.md)
- **Epic:** EPIC-SPA-07 User Cabinet · **Волна 3 (Blocks)**
- **Пакет:** `cabinet/`
- **Status:** ✅ Done
- **Severity:** 🟡 LOW-MED (M-4)
- **Wave:** `pkg-000034`
- **Scaffolded:** 2026-07-26T11:17:40Z
- **Completed:** 2026-07-26T11:31:11Z
- **source:** [`spa-app/docs/tasks/backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md)
- **decision_ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md); [mockup-45-story-activity-state-sheet-spec.md](../../../../../../UX/mockups/user%20profile/mockup-45-story-activity-state-sheet-spec.md); [mockup-23-user-cabinet-empty-new-user-spec.md](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md); [STORY-SPA-CAB-api-requirements.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md); [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md); [CAB-03](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md); [ID-12](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md)
- **ui_scope:** `mixed`
- **Gate:** [acceptance-verification-spa-cab-04.md](./task-spa-cab-04-t06-story-gate-cab-04/acceptance-verification-spa-cab-04.md) PASS
- **Screenshots:** [screenshots/](./screenshots/)

## Артборд (SSOT дизайна)

| Мокап | Роль | Спека (.md) | Картинка (.png) |
|-------|------|-------------|-----------------|
| **M45** | Story activity states (SSOT) | [spec](../../../../../../UX/mockups/user%20profile/mockup-45-story-activity-state-sheet-spec.md) | [png](../../../../../../UX/mockups/user%20profile/mockup-45-story-activity-state-sheet-spec.md.png) |
| **M23** | Empty (new user) §Story Activity | [spec](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md) | [png](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.png) |

> ⚠️ Имя файла M45-картинки — с двойным расширением `…state-sheet-spec.md.png` (ссылка ведёт на реальный файл; переименование — на усмотрение владельца ассетов).

## Зачем простыми словами
Ledger участия пользователя в кабинете: метаданные историй (ID, status, date), без текста истории. Отвечает «что этот аккаунт уже внёс?» за 3 секунды.

## Scope — Функциональные требования (FR)
- **FR-CAB-04.1** Компонент `<StoryActivityCard />` в слоте Story Activity (M99 below Civic).
- **FR-CAB-04.2** Runtime states (один за раз):
  - **A** Active history — metrics + table (Story ID, Status, Created)
  - **B** Empty — `No stories submitted yet`; primary **`Go to Board`** (не Submit)
  - **C** Draft available — UI: `Resume Draft` → MVP `cabinet.common.comingSoon`; follow-up wiring (не MVP): → `/story/submit?draft_id=` (ID-12)
  - **D** Verification required — `Verify Account` → `/verify`
  - **E** Activity unavailable — retry + code ref (e.g. `ACTIVITY_LOAD_FAILED`)
> AC + §Routes — SSOT MVP; FR-C route = post-MVP wiring.
- **FR-CAB-04.3** Privacy (M45 §4): не показывать full story text, phone, wallet, moderation notes.
- **FR-CAB-04.4** Metrics/counts — из gateway contract когда доступен; empty/error states без блокировки на API gap.
- **FR-CAB-04.L10N** **Локализация (L10N) — сразу:** все строки через `t()` + `formatI18nMessage` для `{count}`; ключи `cabinet.story.*` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`, et/ru/en. Reuse: `storyHandoff.cta.goToBoard`, `civic.unverified.cta`, `cabinet.common.*`. Гид: [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); EN — канон M45; empty state — **M23** (не M45-B Submit).

## Post-MVP (не в AC)
- M45 State B primary **`Submit First Story`** — создание истории не из кабинета.

## Scope — Субтаски (backlog T01–T10 → pipeline tasks)
| Backlog | Pipeline task | Суть |
|---------|---------------|------|
| **T01** | [SPA-CAB-04-T01](./task-spa-cab-04-t01-mount-story-activity-card/README.md) | `<StoryActivityCard />` в слоте Story Activity |
| **T02–T06** | [SPA-CAB-04-T02](./task-spa-cab-04-t02-runtime-states-a-e-no-http/README.md) | States A–E UI + privacy; MVP no HTTP / comingSoon for data affordances |
| **T08** | [SPA-CAB-04-T03](./task-spa-cab-04-t03-icon-wiring-story-activity/README.md) | Icon-wiring #10–#15 + reuse |
| **T07** | [SPA-CAB-04-T04](./task-spa-cab-04-t04-l10n-cabinet-story-keys/README.md) | L10N `cabinet.story.*` + `CABINET_FLAT_KEYS` |
| **T09** | [SPA-CAB-04-T05](./task-spa-cab-04-t05-vitest-five-states-privacy/README.md) | Vitest: 5 states A–E + AC guards |
| **T10** | [SPA-CAB-04-T06](./task-spa-cab-04-t06-story-gate-cab-04/README.md) | Story gate CAB-04 |

## Scope — Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #10–#15 (генерация → `public/icons/user-cabinet/`) + §Reuse (story-handoff). В коде — `/icons/<dir>/ic-<name>.png`.

| Состояние / элемент | Файл | Путь | Каталог |
|---------------------|------|------|---------|
| Заголовок «Story Activity» | `ic-story-activity.png` | `/icons/user-cabinet/ic-story-activity.png` | #10 |
| State B Empty | `ic-story-empty.png` | `/icons/user-cabinet/ic-story-empty.png` | #11 |
| State C Draft available | `ic-story-draft.png` | `/icons/user-cabinet/ic-story-draft.png` | #12 |
| Table col «Story ID» | `ic-story-id.png` | `/icons/user-cabinet/ic-story-id.png` | #13 |
| Status «Published» | `ic-status-published.png` | `/icons/user-cabinet/ic-status-published.png` | #14 |
| Status «Under Review» | `ic-status-under-review.png` | `/icons/user-cabinet/ic-status-under-review.png` | #15 |
| State D «Verify Account» | `ic-verify-shield.png` (reuse) | `/icons/story-handoff/ic-verify-shield.png` | §Reuse |
| State E Unavailable | `ic-cloud-error.png` (reuse) | `/icons/story-handoff/ic-cloud-error.png` | §Reuse |
| Retry | `ic-auto-resubmit.png` (reuse) | `/icons/story-handoff/ic-auto-resubmit.png` | §Reuse |

## Routes / API — gateway **backend ready**; SPA wiring **отложен** (2026-07-25)
> Endpoints **существуют** (GW-CAB-01/02) — [api-requirements §2/§4](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md). В этой волне FE = **UI без HTTP** к gateway.

- **Backend (не звать из SPA в MVP AC):**
  - `GET /story-activity` → States A/B/E (когда wiring включён).
  - `GET /story-drafts/current` → State C Resume (когда wiring включён).
- **MVP FE:** layout + empty/comingSoon states; **нет** `fetch` к gateway.
- **Разрешённые CTAs без GW:** `Go to Board` (`storyHandoff.cta.goToBoard`), `Verify Account` → `/verify`.
- **Data-affordance** (Resume Draft, metrics drill-down, retry load) → `cabinet.common.comingSoon` до wiring follow-up.
- Privacy: при будущем wiring — только метаданные (FR-CAB-04.3).

## DEV / test hooks

DEV-only screenshot/preview hook in [`UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) (`import.meta.env.DEV`): `sessionStorage['doge.story-activity-preview']` forces Story Activity state without gateway HTTP.

| Value | Effect |
|-------|--------|
| `active` | state A — Active history |
| `empty` | state B — Empty |
| `draft` | state C — Draft available |
| `verify` | state D — Verification required |
| `unavailable` | state E — Activity unavailable |

Test URLs: `/#/profile`, `/#/board`, `/#/verify`.

Full-cycle: `cd spa-app && npm run test:ui:cabinet-story-cab04-full` → [screenshots/README.md](./screenshots/README.md).

## Зависимости
- [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md), [CAB-03](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) (state D).
- [ID-12](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-story-draft-handoff-submit.md) — draft resume route.

## Вне scope
- Submit/create story from cabinet. Full story content display.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): ключи `cabinet.story.*` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`; `{count}` через `formatI18nMessage`. EN — канон M45; **MVP empty:** primary `Go to Board` + description из M23 (не M45 `Submit First Story`).

### `cabinet.story.*` (EN — канон M45/M23; et/ru — перевод)

| key | en | et | ru |
|-----|----|----|----|
| `cabinet.story.title` | Story Activity | Lugude tegevus | Активность историй |
| `cabinet.story.metrics.submitted` | Stories Submitted: {count} | Esitatud lood: {count} | Отправлено историй: {count} |
| `cabinet.story.metrics.published` | Published: {count} | Avaldatud: {count} | Опубликовано: {count} |
| `cabinet.story.metrics.underReview` | Under Review: {count} | Läbivaatamisel: {count} | На проверке: {count} |
| `cabinet.story.table.storyId` | Story ID | Loo ID | ID истории |
| `cabinet.story.table.status` | Status | Olek | Статус |
| `cabinet.story.table.created` | Created | Loodud | Создано |
| `cabinet.story.status.published` | Published | Avaldatud | Опубликовано |
| `cabinet.story.status.underReview` | Under Review | Läbivaatamisel | На проверке |
| `cabinet.story.empty.message` | No stories submitted yet. | Ühtegi lugu pole veel esitatud. | Истории ещё не отправлялись. |
| `cabinet.story.empty.description` | Your submitted stories will appear here. | Sinu esitatud lood kuvatakse siin. | Здесь появятся ваши отправленные истории. |
| `cabinet.story.empty.cta` | *(reuse)* `storyHandoff.cta.goToBoard` | | |
| `cabinet.story.draft.title` | Draft Available | Mustand saadaval | Черновик доступен |
| `cabinet.story.draft.description` | You have an unfinished story waiting for completion. | Sul on lõpetamata lugu. | У вас есть незавершённая история. |
| `cabinet.story.draft.lastEdited` | Last Edited: | Viimati muudetud: | Последнее изменение: |
| `cabinet.story.draft.resume` | Resume Draft | Jätka mustandit | Продолжить черновик |
| `cabinet.story.draft.discard` | *(reuse)* `cabinet.common.discardDraft` | | |
| `cabinet.story.verifyRequired.title` | Verification Required | Kinnitamine nõutav | Требуется верификация |
| `cabinet.story.verifyRequired.description` | Verify your account before submitting stories. | Kinnita konto enne lugude esitamist. | Подтвердите аккаунт перед отправкой историй. |
| `cabinet.story.verifyRequired.cta` | *(reuse)* `civic.unverified.cta` | | |
| `cabinet.story.unavailable.title` | Activity Unavailable | Tegevus pole saadaval | Активность недоступна |
| `cabinet.story.unavailable.description` | We could not load your story activity. | Lugude tegevust ei õnnestunud laadida. | Не удалось загрузить активность историй. |
| `cabinet.story.unavailable.code` | *(reuse)* `cabinet.common.codeLabel` | | |
| `cabinet.story.unavailable.retry` | *(reuse)* `cabinet.common.retry` | | |

> **Post-MVP** (не в MVP AC): `cabinet.story.empty.submitFirst` — см. [cabinet/README.md](../../../../../../backlog-stories/cabinet/README.md) §Post-MVP L10N.

## Acceptance Criteria
- [x] 5 runtime states A–E реализованы как **UI layout** (кроме Submit First Story CTA).
- [x] Empty state: `Go to Board`, не Submit.
- [x] **Нет HTTP** к gateway в MVP; Resume Draft / data-load → `cabinet.common.comingSoon`.
- [x] Verify Account → `/verify` (без gateway).
- [x] Privacy rules соблюдены (нет full story text в UI).
- [x] Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.

**Follow-up (не MVP AC):** wire `GET /story-activity` + `GET /story-drafts/current` → live A/C/E.

## Швы
- [`storyDraftService.js`](../../../../../../../src/services/storyDraftService.js), [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx).
