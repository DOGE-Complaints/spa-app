# STORY-SPA-CAB-07 — Cabinet Page States: New User & Load Error

## Meta (pipeline)

- **Key:** `STORY-SPA-CAB-07-cabinet-page-states`
- **Parent Epic:** [`../../EPIC-SPA-07-user-cabinet.md`](../../EPIC-SPA-07-user-cabinet.md)
- **Epic:** EPIC-SPA-07 User Cabinet · **Волна 4 (Integration gate)**
- **Пакет:** `cabinet/`
- **Status:** ✅ Done
- **Severity:** 🟡 LOW-MED (M-4)
- **Wave:** `pkg-000037`
- **Scaffolded:** 2026-07-28T13:48:38Z
- **source:** [`spa-app/docs/tasks/backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md)
- **decision_ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md); [mockup-23-user-cabinet-empty-new-user-spec.md](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md); [mockup-22-user-cabinet-load-error-spec.md](../../../../../../UX/mockups/user%20profile/mockup-22-user-cabinet-load-error-spec.md); [STORY-SPA-CAB-api-requirements.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md); [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)…[CAB-06](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md); [ID-02](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md)
- **ui_scope:** `mixed`
- **Gate:** [acceptance-verification-spa-cab-07.md](./task-spa-cab-07-t06-story-gate-cab-07/acceptance-verification-spa-cab-07.md) **PASS** 2026-07-28T14:05:08Z

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) | Картинка (.png) |
|-------|-----------|-------------|-----------------|
| **M23** | composite new user | [spec](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md) | [png](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.png) |
| **M22** | profile load failure (error panel) | [spec](../../../../../../UX/mockups/user%20profile/mockup-22-user-cabinet-load-error-spec.md) | ⚠️ **error-картинки нет** (PNG не поставлен) |
| *(loading)* | shell skeleton (image-only) | — спеки нет | [png](../../../../../../UX/mockups/user%20profile/mockup-22-user-cabinet-loading-spec.png) |

> ⚠️ **Коллизия номера M22:** спека `…load-error-spec.md` описывает **error-панель** (Unable to load account data / Retry), но единственный `mockup-22-*.png` — это **loading-skeleton** (другое состояние). Error-панель без картинки; loading-картинка без спеки (её loading-state релевантен FR-CAB-01.5 у [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)).

## Зачем простыми словами
Интеграционный gate: кабинет корректно выглядит для нового пользователя (все секции на месте, локальные empty states) и при сбое загрузки данных профиля (инженерный error panel, не паника).

## Scope — Функциональные требования (FR)
- **FR-CAB-07.1** M23 composite: после signup/first visit — все секции видны, каждая со своим empty state; не giant welcome screen.
- **FR-CAB-07.2** M23 actions: Verify Account, Go to Board (story empty), Coming soon (wallet / contribution / story data-affordance) — согласованы с CAB-03/04/05/06 stubs.
- **FR-CAB-07.3** M22 load error: title `Unable to load account data`, Retry, Back to Board; optional technical code (`PROFILE_LOAD_FAILED` etc.).
- **FR-CAB-07.4** Shell стабилен при error (sidebar/header); не full-page crash (M22 §2).
- **FR-CAB-07.5** Задел под reusable `AppErrorState` / `ErrorPanel` (M22 §4) — без отдельной global story в этой волне.
- **FR-CAB-07.L10N** **Локализация (L10N) — сразу:** M22 error panel через `cabinet.error.profileLoad.*` + reuse `cabinet.common.retry`, `storyHandoff.cta.backToBoard`, `cabinet.common.codeLabel` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`, et/ru/en. M23 composite — reuse empty states CAB-02…06 (отдельных ключей нет). Гид: [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); EN — канон M22.

## Scope — Субтаски (backlog T01–T08 → pipeline tasks)
| Backlog | Pipeline task | Суть |
|---------|---------------|------|
| **T01+T02** | [SPA-CAB-07-T01](./task-spa-cab-07-t01-m23-composite-new-user-empty/README.md) | M23 composite empty + actions согласованы с CAB-03…06 |
| **T03+T04+FR.5** | [SPA-CAB-07-T02](./task-spa-cab-07-t02-m22-profile-load-error-panel/README.md) | M22 ErrorPanel + shell стабилен |
| **T05** | [SPA-CAB-07-T03](./task-spa-cab-07-t03-l10n-cabinet-error-profile-load/README.md) | L10N `cabinet.error.profileLoad.*` + FLAT_KEYS |
| **T06** | [SPA-CAB-07-T04](./task-spa-cab-07-t04-icon-wiring-m22-reuse/README.md) | Icon-wiring warning + retry (reuse) |
| **T07** | [SPA-CAB-07-T05](./task-spa-cab-07-t05-vitest-m23-m22-parity/README.md) | Vitest M23+M22 + parity |
| **T08** | [SPA-CAB-07-T06](./task-spa-cab-07-t06-story-gate-cab-07/README.md) | Story gate CAB-07 |

## Scope — Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) §Reuse. Своих новых иконок нет: M22 = reuse story-handoff; M23 composite = empty-иконки блоков CAB-02…06.

| Контекст | Файл | Путь | Каталог |
|----------|------|------|---------|
| M22 profile load-error | `ic-warning-triangle.png` (reuse) | `/icons/story-handoff/ic-warning-triangle.png` | §Reuse (инженерный тон) |
| M22 Retry | `ic-auto-resubmit.png` (reuse) | `/icons/story-handoff/ic-auto-resubmit.png` | §Reuse |
| M23 composite empty | *(reuse из CAB-02…06)* `ic-story-empty`, `ic-wallet-unlinked`, `ic-contrib-*`, `ic-civic-unverified` | `/icons/user-cabinet/*` | #5,#11,#16,#19–21 |

## Routes / API — identity **live**
- Источник профиля = **live `GET /me`** (identity готов — [api-requirements](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md)). M22 = сбой `/me` на уровне кабинета (shell стабилен).
- Error codes (`PROFILE_LOAD_FAILED`, `SESSION_EXPIRED`) — FE-моделируемые; показывать через `cabinet.common.codeLabel`.
- Retry re-triggers `/me` fetch.
- M23 composite empty для CAB-04/05/06 = stub UI + Coming soon где нужно (без gateway HTTP).

## DEV / test hooks

DEV-only (`import.meta.env.DEV`): extend `sessionStorage['doge.mock-me-error']` / profile fixtures for M23 new-user empty composite and M22 codes (`PROFILE_LOAD_FAILED`, `SESSION_EXPIRED`) — document exact values at P3 execute.

## Зависимости
- [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) … [CAB-06](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md) — все блоки смонтированы.
- [ID-02](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md) — shell остаётся при profile error.

## Вне scope
- Global error handling для всего app (отдельный epic). Logout/login flows.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): M22 — `cabinet.error.profileLoad.*` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`. M23 composite — reuse empty states из CAB-02…06; уникальных строк почти нет.

### M22 — Profile load error (`cabinet.error.profileLoad.*`)

| key | en | et | ru |
|-----|----|----|----|
| `cabinet.error.profileLoad.title` | Unable to load account data | Konto andmeid ei õnnestunud laadida | Не удалось загрузить данные аккаунта |
| `cabinet.error.profileLoad.message` | We could not retrieve your profile information at this time. Please try again. | Profiili andmeid praegu ei õnnestunud laadida. Palun proovi uuesti. | Не удалось получить данные профиля. Попробуйте снова. |
| `cabinet.error.profileLoad.details` | Profile aggregate endpoint returned an unexpected response. | Profiili koondpäring tagastas ootamatu vastuse. | Сводный запрос профиля вернул неожиданный ответ. |
| `cabinet.error.profileLoad.retry` | *(reuse)* `cabinet.common.retry` | | |
| `cabinet.error.profileLoad.backToBoard` | *(reuse)* `storyHandoff.cta.backToBoard` | | |

### M23 composite — reuse (без новых ключей)

| Секция | Источник ключей |
|--------|-----------------|
| Account | CAB-02 `cabinet.account.*` |
| Civic Status | CAB-03 `civic.*` reuse |
| Story Activity empty | CAB-04 `cabinet.story.empty.*` + `storyHandoff.cta.goToBoard` |
| Wallet empty | CAB-05 `cabinet.wallet.stateA.*` |
| Contribution empty | CAB-06 `cabinet.contrib.*` empty states |

> **Error codes** (M22 §6): `PROFILE_LOAD_FAILED`, `SESSION_EXPIRED`, … — **не переводить**; показывать через `cabinet.common.codeLabel`. Per-code title/message — вне MVP backlog.

## Acceptance Criteria
- [ ] New user видит M23 composite (структура + local empties).
- [ ] Profile load fail показывает M22 с Retry и Back to Board.
- [ ] Shell не коллапсирует; инженерный тон сообщений.
- [ ] Error codes из списка M22 §6 поддерживаемы в UI contract.
- [ ] M22 строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.

## Швы
- [`sessionShellState.js`](../../../../../../../src/auth/sessionShellState.js), [`useSessionShellState.js`](../../../../../../../src/auth/useSessionShellState.js).
