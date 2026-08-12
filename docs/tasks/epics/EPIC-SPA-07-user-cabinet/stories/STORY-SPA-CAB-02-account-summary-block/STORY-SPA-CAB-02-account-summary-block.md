# STORY-SPA-CAB-02 — Account Summary Block

## Meta (pipeline)

- **Key:** `STORY-SPA-CAB-02-account-summary-block`
- **Parent Epic:** [`../../EPIC-SPA-07-user-cabinet.md`](../../EPIC-SPA-07-user-cabinet.md)
- **Epic:** EPIC-SPA-07 User Cabinet · **Волна 2 (Blocks)**
- **Пакет:** `cabinet/`
- **Status:** Done
- **Closed:** 2026-07-12T08:10:42Z
- **Severity:** 🟡 LOW-MED (M-4)
- **Wave:** `pkg-000029`
- **Supersedes:** [STORY-SPA-CAB-01-profile-from-me](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-from-me.md) (узкий scope поглощён)
- **Reuse:** [ID-03](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-03-civic-status-component.md) (privacy patterns)
- **source:** [`spa-app/docs/tasks/backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md)
- **decision_ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md); [mockup-24-account-summary-complete-spec.md](../../../../../../UX/mockups/user%20profile/mockup-24-account-summary-complete-spec.md); [mockup-25-account-summary-minimal-data-spec.md](../../../../../../UX/mockups/user%20profile/mockup-25-account-summary-minimal-data-spec.md); [mockup-26-account-summary-missing-email-spec.md](../../../../../../UX/mockups/user%20profile/mockup-26-account-summary-missing-email-spec.md); [`me_response.py`](../../../../../../../../doge-identity-service/src/core/api/me_response.py)
- **ui_scope:** `visual`

## Артборд (SSOT дизайна)
- [mockup-24-account-summary-complete-spec.md](../../../../../../UX/mockups/user%20profile/mockup-24-account-summary-complete-spec.md)
- [mockup-25-account-summary-minimal-data-spec.md](../../../../../../UX/mockups/user%20profile/mockup-25-account-summary-minimal-data-spec.md)
- [mockup-26-account-summary-missing-email-spec.md](../../../../../../UX/mockups/user%20profile/mockup-26-account-summary-missing-email-spec.md)

## Зачем простыми словами
Техническая карточка аккаунта в кабинете: кто залогинен, operational status. Не социальный профиль. Данные из `/me` + placeholders для полей, которых API пока не отдаёт.

## Текущее состояние (verified)
- `/me` отдаёт: `display_name`, `role`, `phone_verified*` ([`me_response.py`](../../../../../../../../doge-identity-service/src/core/api/me_response.py)); **без** `email`, `created_at`, account `status`.

## Scope — Функциональные требования (FR)
- **FR-CAB-02.1** Компонент `<AccountSummary />` в слоте Account (M99 top-left).
- **FR-CAB-02.2** Поля: Email (masked или `Not Available`), Account Created, Role, Account Status — стабильная сетка строк (M24–M26).
- **FR-CAB-02.3** Три UX-состояния: complete (M24), minimal-data (M25), missing-email (M26).
- **FR-CAB-02.4** Отсутствующее поле → `Not Available` (muted), не error state, не collapse layout.
- **FR-CAB-02.5** Privacy: не показывать raw phone, OTP, tokens (как FR-08.7 / ID-08).
- **FR-CAB-02.L10N** **Локализация (L10N) — сразу:** labels, role/status display, placeholder через `t()`; ключи `cabinet.account.*` + reuse `cabinet.common.notAvailable` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`, et/ru/en. Гид: [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md); EN — канон M24–M26.

## Scope — Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | `<AccountSummary />` в слоте Account (M99 top-left); данные из `useSessionShell().profile` | [identityService.js](../../../../../../../src/auth/identityService.js), [SessionShellContext.jsx](../../../../../../../src/auth/SessionShellContext.jsx) |
| **T02** | Сетка строк Email/Account Created/Role/Account Status (стабильная, не collapse) | `AccountSummary.jsx` |
| **T03** | 3 UX-состояния: complete (M24) / minimal-data (M25) / missing-email (M26); отсутствующее поле → `cabinet.common.notAvailable` (muted, не error) | `AccountSummary.jsx` |
| **T04** | Privacy: не показывать raw phone/OTP/tokens (FR-08.7/ID-08) | `AccountSummary.jsx` |
| **T05** | L10N: `cabinet.account.*` + reuse `cabinet.common.notAvailable`, et/ru/en, `CABINET_FLAT_KEYS` | `cabinetDictionary.js` |
| **T06** | Icon-wiring полей (ic-field-*); missing-email БЕЗ warning-иконки (M26 §7) | `AccountSummary.jsx` |
| **T07** | Vitest: 3 состояния + missing-field=NotAvailable + privacy + parity | `__tests__` |
| **T08** | Story gate CAB-02 | — |

## Scope — Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #1–#4. Кладутся в `public/icons/user-cabinet/`, в коде — `/icons/user-cabinet/ic-<name>.png`.

| Строка поля | Файл | Путь | Каталог # |
|-------------|------|------|-----------|
| Email | `ic-field-email.png` | `/icons/user-cabinet/ic-field-email.png` | #1 |
| Account Created | `ic-field-created.png` | `/icons/user-cabinet/ic-field-created.png` | #2 |
| Role | `ic-field-role.png` | `/icons/user-cabinet/ic-field-role.png` | #3 |
| Account Status | `ic-field-status.png` | `/icons/user-cabinet/ic-field-status.png` | #4 |

> ⚠️ **missing-email (M26):** поле = `Not Available` **текстом**, БЕЗ warning-иконки (каталог §Заметки).

## Routes / API
- `GET /me` через `useSessionShell().profile` или `identityService.fetchMe`.
- Email/status/created_at — placeholder до расширения backend contract.

## Зависимости
- [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) — shell slot.
- [ID-02](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md) — authenticated context.

## Вне scope
- Civic status (CAB-03). Profile editing. Wallet.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md): ключи `cabinet.account.*` в [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`. EN — канон M24–M26. Placeholder отсутствующих полей — reuse `cabinet.common.notAvailable` (CAB-01).

### `cabinet.account.*` (EN — канон M24–M26; et/ru — перевод)

| key | en | et | ru |
|-----|----|----|----|
| `cabinet.account.title` | Account | Konto | Аккаунт |
| `cabinet.account.field.email` | Email | E-post | Эл. почта |
| `cabinet.account.field.created` | Account Created | Konto loodud | Аккаунт создан |
| `cabinet.account.field.role` | Role | Roll | Роль |
| `cabinet.account.field.status` | Account Status | Konto olek | Статус аккаунта |
| `cabinet.account.role.authenticatedUser` | Authenticated User | Autenditud kasutaja | Аутентифицированный пользователь |
| `cabinet.account.role.moderator` | Moderator | Moderaator | Модератор |
| `cabinet.account.role.administrator` | Administrator | Administraator | Администратор |
| `cabinet.account.role.support` | Support | Tugi | Поддержка |
| `cabinet.account.status.active` | Active | Aktiivne | Активен |
| `cabinet.account.status.pending` | Pending | Ootel | Ожидает |
| `cabinet.account.status.suspended` | Suspended | Peatatud | Приостановлен |
| `cabinet.account.status.archived` | Archived | Arhiveeritud | Архивирован |
| `cabinet.account.placeholder.notAvailable` | *(reuse)* `cabinet.common.notAvailable` | | |

> **Нюанс:** API `authenticated_user` → display через `cabinet.account.role.authenticatedUser`. Masked email и даты — динамические значения, не переводятся.

## Acceptance Criteria
- [x] `/profile` показывает Account Summary (не placeholder page).
- [x] `display_name`, `role` из `/me`; partial fields с `Not Available` без поломки карточки.
- [x] Три состояния M24/M25/M26 достижимы при соответствующих данных.
- [x] Сырой номер/OTP/токены не отображаются.
- [x] Protected; неавторизованный не видит контент.
- [x] Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.

## Швы
- [`identityService.js`](../../../../../../../src/auth/identityService.js), [`SessionShellContext.jsx`](../../../../../../../src/auth/SessionShellContext.jsx).

## Nested tasks

| Order | Task folder | Wave |
|-------|-------------|------|
| 1 | [`task-spa-cab-02-t01-account-summary-slot-profile-data`](./task-spa-cab-02-t01-account-summary-slot-profile-data/README.md) | pkg-000029 |
| 2 | [`task-spa-cab-02-t02-stable-field-grid`](./task-spa-cab-02-t02-stable-field-grid/README.md) | pkg-000029 |
| 3 | [`task-spa-cab-02-t03-ux-states-not-available`](./task-spa-cab-02-t03-ux-states-not-available/README.md) | pkg-000029 |
| 4 | [`task-spa-cab-02-t04-privacy-no-sensitive-fields`](./task-spa-cab-02-t04-privacy-no-sensitive-fields/README.md) | pkg-000029 |
| 5 | [`task-spa-cab-02-t05-l10n-cabinet-account-keys`](./task-spa-cab-02-t05-l10n-cabinet-account-keys/README.md) | pkg-000029 |
| 6 | [`task-spa-cab-02-t06-field-icon-wiring`](./task-spa-cab-02-t06-field-icon-wiring/README.md) | pkg-000029 |
| 7 | [`task-spa-cab-02-t07-vitest-states-privacy-parity`](./task-spa-cab-02-t07-vitest-states-privacy-parity/README.md) | pkg-000029 |
| 8 | [`task-spa-cab-02-t08-story-gate-cab-02`](./task-spa-cab-02-t08-story-gate-cab-02/README.md) | pkg-000029 |
