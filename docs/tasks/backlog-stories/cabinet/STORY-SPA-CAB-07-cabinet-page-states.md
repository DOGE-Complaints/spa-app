# STORY-SPA-CAB-07 — Cabinet Page States: New User & Load Error

## Meta
- **Key:** `STORY-SPA-CAB-07-cabinet-page-states`
- **Epic:** [EPIC-SPA-07 User Cabinet](../epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md) · **Волна 4 (Integration gate)**
- **Пакет:** `cabinet/`
- **Status:** ✅ Done
- **Severity:** 🟡 LOW-MED (M-4)

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) | Картинка (.png) |
|-------|-----------|-------------|-----------------|
| **M23** | composite new user | [spec](../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md) | [png](../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.png) |
| **M22** | profile load failure (error panel) | [spec](../../../UX/mockups/user%20profile/mockup-22-user-cabinet-load-error-spec.md) | ⚠️ **error-картинки нет** (PNG не поставлен) |
| *(loading)* | shell skeleton (image-only) | — спеки нет | [png](../../../UX/mockups/user%20profile/mockup-22-user-cabinet-loading-spec.png) |

> ⚠️ **Коллизия номера M22:** спека `…load-error-spec.md` описывает **error-панель** (Unable to load account data / Retry), но единственный `mockup-22-*.png` — это **loading-skeleton** (другое состояние). Error-панель без картинки; loading-картинка без спеки (её loading-state релевантен FR-CAB-01.5 у [CAB-01](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)).

## Зачем простыми словами
Интеграционный gate: кабинет корректно выглядит для нового пользователя (все секции на месте, локальные empty states) и при сбое загрузки данных профиля (инженерный error panel, не паника).

## Функциональные требования (FR)
- **FR-CAB-07.1** M23 composite: после signup/first visit — все секции видны, каждая со своим empty state; не giant welcome screen.
- **FR-CAB-07.2** M23 actions: Verify Account, Go to Board (story empty), Coming soon (wallet / contribution / story data-affordance) — согласованы с CAB-03/04/05/06 stubs.
- **FR-CAB-07.3** M22 load error: title `Unable to load account data`, Retry, Back to Board; optional technical code (`PROFILE_LOAD_FAILED` etc.).
- **FR-CAB-07.4** Shell стабилен при error (sidebar/header); не full-page crash (M22 §2).
- **FR-CAB-07.5** Задел под reusable `AppErrorState` / `ErrorPanel` (M22 §4) — без отдельной global story в этой волне.
- **FR-CAB-07.L10N** **Локализация (L10N) — сразу:** M22 error panel через `cabinet.error.profileLoad.*` + reuse `cabinet.common.retry`, `storyHandoff.cta.backToBoard`, `cabinet.common.codeLabel` в [`cabinetDictionary.js`](../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`, et/ru/en. M23 composite — reuse empty states CAB-02…06 (отдельных ключей нет). Гид: [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md); EN — канон M22.

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | M23 composite: после signup/first-visit все секции видны, каждая со своим empty-state (не giant welcome) | [sessionShellState.js](../../../../src/auth/sessionShellState.js), [useSessionShellState.js](../../../../src/auth/useSessionShellState.js) |
| **T02** | M23 actions согласованы с CAB-03/04/05 (Verify Account / Go to Board / Coming Later) | (reuse блоки) |
| **T03** | M22 load-error: title `Unable to load account data` + Retry + Back to Board + опц. code (`PROFILE_LOAD_FAILED`) | новый `AppErrorState`/`ErrorPanel` |
| **T04** | Shell стабилен при error (sidebar/header не падают; не full-page crash) | `useSessionShellState.js` |
| **T05** | L10N `cabinet.error.profileLoad.*` + reuse `cabinet.common.retry`/`codeLabel`/`storyHandoff.cta.backToBoard`; M23 — reuse empty CAB-02…06 (без новых ключей) | `cabinetDictionary.js` |
| **T06** | Icon-wiring (см. Иконки) | `ErrorPanel.jsx` |
| **T07** | Vitest: M23 composite (все секции empty) + M22 error (retry/back, shell стабилен) + parity | `__tests__` |
| **T08** | Story gate CAB-07 | — |

## Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](STORY-SPA-CAB-icon-assets.md) §Reuse. Своих новых иконок нет: M22 = reuse story-handoff; M23 composite = empty-иконки блоков CAB-02…06.

| Контекст | Файл | Путь | Каталог |
|----------|------|------|---------|
| M22 profile load-error | `ic-warning-triangle.png` (reuse) | `/icons/story-handoff/ic-warning-triangle.png` | §Reuse (инженерный тон) |
| M22 Retry | `ic-auto-resubmit.png` (reuse) | `/icons/story-handoff/ic-auto-resubmit.png` | §Reuse |
| M23 composite empty | *(reuse из CAB-02…06)* `ic-story-empty`, `ic-wallet-unlinked`, `ic-contrib-*`, `ic-civic-unverified` | `/icons/user-cabinet/*` | #5,#11,#16,#19–21 |

## Routes / API — identity **live**
- Источник профиля = **live `GET /me`** (identity готов — [api-requirements](STORY-SPA-CAB-api-requirements.md)). M22 = сбой `/me` на уровне кабинета (shell стабилен).
- Error codes (`PROFILE_LOAD_FAILED`, `SESSION_EXPIRED`) — FE-моделируемые; показывать через `cabinet.common.codeLabel`.
- Retry re-triggers `/me` fetch.
- M23 composite empty для CAB-04/05/06 = stub UI + Coming soon где нужно (без gateway HTTP).

## Зависимости
- [CAB-01](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) … [CAB-06](STORY-SPA-CAB-06-contribution-layer.md) — все блоки смонтированы.
- [ID-02](../identity-auth/STORY-SPA-ID-02-session-shell-states.md) — shell остаётся при profile error.

## Вне scope
- Global error handling для всего app (отдельный epic). Logout/login flows.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md): M22 — `cabinet.error.profileLoad.*` в [`cabinetDictionary.js`](../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`. M23 composite — reuse empty states из CAB-02…06; уникальных строк почти нет.

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
- [`sessionShellState.js`](../../../../src/auth/sessionShellState.js), [`useSessionShellState.js`](../../../../src/auth/useSessionShellState.js).
