# STORY-SPA-CAB-01 — Profile Cabinet Shell & Assembly

## Meta
- **Key:** `STORY-SPA-CAB-01-profile-cabinet-shell-assembly`
- **Epic:** [EPIC-SPA-07 User Cabinet](../epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md) · **Волна 1 (Shell)**
- **Пакет:** `cabinet/`
- **Status:** ✅ Done — материализована в pipeline (`pkg-000030`, gate PASS 2026-07-25); SSOT исполнения: [pipeline story](../../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-01-profile-cabinet-shell-assembly/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md).
- **Severity:** 🟡 LOW-MED (M-4)
- **Источник:** [mvp-integration-plan M-4](../../../../docs/analysis/mvp-integration-plan-2026-07-02.md)

## Артборд (SSOT дизайна)

| Мокап | Спека (.md) | Картинка (.png) |
|-------|-------------|-----------------|
| **M21** — Cabinet overview (default) | [mockup-21-user-cabinet-overview-default-spec.md](../../../UX/mockups/user%20profile/mockup-21-user-cabinet-overview-default-spec.md) | [mockup-21-user-cabinet-overview-default-spec.png](../../../UX/mockups/user%20profile/mockup-21-user-cabinet-overview-default-spec.png) |
| **M99** — Final assembly | [mockup-99-user-cabinet-final-assembly-spec.md](../../../UX/mockups/user%20profile/mockup-99-user-cabinet-final-assembly-spec.md) | [mockup-99-user-cabinet-final-assembly-spec.png](../../../UX/mockups/user%20profile/mockup-99-user-cabinet-final-assembly-spec.png) |

> **Loading (FR-CAB-01.5):** skeleton — [mockup-22-user-cabinet-loading-spec.png](../../../UX/mockups/user%20profile/mockup-22-user-cabinet-loading-spec.png) (image-only, `.md` нет). Не путать с `mockup-22-…-load-error-spec.md` у [CAB-07](STORY-SPA-CAB-07-cabinet-page-states.md).

## Зачем простыми словами
Заменить заглушку `/profile` на собранный **User Cabinet**: тот же AppShell, активный пункт sidebar `Profile`, сетка секций под блоки кабинета. Это каркас для CAB-02…06.

## Текущее состояние (verified)
- `/profile` → [`UserCabinetPage`](../../../../src/pages/UserCabinetPage.jsx) с слотом **AccountSummary** (CAB-02 Done, `pkg-000029`); wiring через [`AppShellLayout.jsx`](../../../../src/layout/AppShellLayout.jsx).
- **Ещё Todo:** M21/M99 12-column grid + слоты Civic / Story / Wallet / Contribution; shell skeleton; L10N section labels.
- Readiness: identity `/me` ready — [api-requirements §6](STORY-SPA-CAB-api-requirements.md).

## Функциональные требования (FR)
- **FR-CAB-01.1** Маршрут `/profile` рендерит `ProfilePage` / `UserCabinetPage` вместо placeholder.
- **FR-CAB-01.2** Reuse существующий AppShell; sidebar: `Profile` active; header title `Profile` (M99).
- **FR-CAB-01.3** Layout: desktop 12-column grid; слоты под Account, Civic, Story Activity, Wallet, Contribution (иерархия M99: Civic > Story > Contribution > Account > Wallet).
- **FR-CAB-01.4** Protected route — session overlay при `logged_out` (ID-02); не редирект на `/login` на уровне layout.
- **FR-CAB-01.5** Loading: shell-level skeleton при aggregate load профиля (до монтирования блоков).
- **FR-CAB-01.6** Не social-profile aesthetic (M21 §3).
- **FR-CAB-01.L10N** **Локализация (L10N) — сразу:** page title, section labels, shell loading через `t()`; ключи `cabinet.*` + `appShell.nav.profile` в [`cabinetDictionary.js`](../../../../src/i18n/cabinetDictionary.js) / [`identityDictionary.js`](../../../../src/i18n/identityDictionary.js) + `CABINET_FLAT_KEYS` / `IDENTITY_FLAT_KEYS`, et/ru/en. Гид: [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md); EN — канон M21/M99.

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | `/profile` → `UserCabinetPage` вместо `ProtectedPlaceholder`; route wiring | [App.jsx](../../../../src/App.jsx), [AppShellLayout.jsx:12-18,44-45](../../../../src/layout/AppShellLayout.jsx) |
| **T02** | 12-column grid + слоты (Account/Civic/Story/Wallet/Contribution) по иерархии M99 (Civic > Story > Contribution > Account > Wallet) | новый `UserCabinetPage.jsx` |
| **T03** | L10N: `cabinet.*` (page/section/shell) + `appShell.nav.profile`, et/ru/en, `CABINET_FLAT_KEYS`/`IDENTITY_FLAT_KEYS`; заменить hardcode nav ([AppShellLayout.jsx:45](../../../../src/layout/AppShellLayout.jsx#L45)) | `cabinetDictionary.js`, `identityDictionary.js` |
| **T04** | Shell-level skeleton при aggregate-load (M21 «no giant spinner») | `UserCabinetPage.jsx` |
| **T05** | Protected overlay (ID-02) на `/profile`; `/dashboard` не задет | [sessionRoutePolicy.js](../../../../src/router/sessionRoutePolicy.js) |
| **T06** | Vitest: рендер кабинета (не placeholder), active `Profile` nav, overlay при `logged_out`, parity ключей | `__tests__` |
| **T07** | Story gate CAB-01 | — |

## Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](STORY-SPA-CAB-icon-assets.md). Runtime-путь user-cabinet: `/icons/user-cabinet/ic-<name>.png` (файлы кладутся в `public/icons/user-cabinet/`).

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| Header-логотип | `DOGEstonia-logo-big.png` | `public/assets/DOGEstonia-logo-big.png` (reuse) | §Reuse |
| Language flags | `ET.svg`/`RU.svg`/`US.svg` | `public/assets/` (reuse) | §Reuse |
| Sidebar `Profile` nav-glyph *(опц.)* | `ic-nav-profile.png` | `/icons/user-cabinet/ic-nav-profile.png` | заметка каталога (только если nav получит иконку при вёрстке) |

> Собственных user-cabinet-иконок shell не требует (иконки секций — в CAB-02…06). См. Вне scope.

## Routes / API
- `/profile` — protected ([`sessionRoutePolicy.js`](../../../../src/router/sessionRoutePolicy.js)).
- Данные: `useSessionShell().profile` / **live** `GET /me` (identity готов — [api-requirements](STORY-SPA-CAB-api-requirements.md)).

## Зависимости
- [ID-02](../identity-auth/STORY-SPA-ID-02-session-shell-states.md) — overlay на protected routes.
- Блоки CAB-02…06 монтируются в слоты этой страницы.

## Вне scope
- Содержимое секций (CAB-02…06). Mobile layout. Иконки.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md): ключи `cabinet.*` в [`cabinetDictionary.js`](../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`; `appShell.nav.profile` — в [`identityDictionary.js`](../../../../src/i18n/identityDictionary.js) + `IDENTITY_FLAT_KEYS`. EN — канон M21/M99. Общие ключи пакета — [cabinet/README.md](README.md) §`cabinet.common.*`.

### `cabinet.*` / `appShell.nav.profile` (EN — канон M21/M99; et/ru — перевод)

| key | en | et | ru |
|-----|----|----|----|
| `cabinet.page.title` | Profile | Profiil | Профиль |
| `appShell.nav.profile` | Profile | Profiil | Профиль |
| `cabinet.shell.loading` | Loading profile… | Profiili laadimine… | Загрузка профиля… |
| `cabinet.section.account` | Account | Konto | Аккаунт |
| `cabinet.section.civicStatus` | Civic Status | Kodaniku staatus | Гражданский статус |
| `cabinet.section.storyActivity` | Story Activity | Lugude tegevus | Активность историй |
| `cabinet.section.wallet` | Wallet | Rahakott | Кошелёк |
| `cabinet.section.contribution` | Contribution Layer | Panustamise kiht | Слой вклада |
| `cabinet.common.notAvailable` | Not Available | Pole saadaval | Недоступно |
| `cabinet.common.comingLater` | Coming Later | Tulekul | Скоро |
| `cabinet.common.comingSoon` | This feature is coming soon | See funktsioon on peagi saadaval | Эта функция скоро появится |
| `cabinet.common.retry` | Retry | Proovi uuesti | Повторить |
| `cabinet.common.codeLabel` | Code: {code} | Kood: {code} | Код: {code} |
| `cabinet.common.discardDraft` | Discard Draft | Loobu mustandist | Отменить черновик |

> **Доработанные тексты (нет в мокапе):** `cabinet.shell.loading`, `appShell.nav.profile` (сейчас hardcode в [`AppShellLayout.jsx:45`](../../../../src/layout/AppShellLayout.jsx)). Section titles могут reuse card titles нижних блоков (Account, Story Activity).

## Acceptance Criteria
- [x] Авторизованный пользователь видит собранный кабинет на `/profile` (не placeholder).
- [x] Layout соответствует M99 section slots и visual hierarchy.
- [x] Неавторизованный — SessionShell overlay (ID-02).
- [x] `/dashboard` не изменён.
- [x] Все строки shell локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` / `IDENTITY_FLAT_KEYS` обновлены; forbidden-terms нет.

## Швы
- [`App.jsx`](../../../../src/App.jsx), [`AppShellLayout.jsx`](../../../../src/layout/AppShellLayout.jsx), [`sessionRoutePolicy.js`](../../../../src/router/sessionRoutePolicy.js).
