# STORY-SPA-CAB-02 — Account Summary Block

## Meta
- **Key:** `STORY-SPA-CAB-02-account-summary-block`
- **Epic:** [EPIC-SPA-07 User Cabinet](../epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md) · **Волна 2 (Blocks)**
- **Пакет:** `cabinet/`
- **Status:** ✅ Done — материализована в pipeline (`pkg-000029`, gate PASS 2026-07-12); SSOT статуса: [pipeline story](../../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-02-account-summary-block/STORY-SPA-CAB-02-account-summary-block.md). Аудит: [audit 2026-07-12](../../../analysis/audit-STORY-SPA-CAB-02-execution-2026-07-12.md).
- **Severity:** 🟡 LOW-MED (M-4)
- **Supersedes:** [STORY-SPA-CAB-01-profile-from-me](STORY-SPA-CAB-01-profile-from-me.md) (узкий scope поглощён)
- **Reuse:** [ID-03](../identity-auth/STORY-SPA-ID-03-civic-status-component.md) (privacy patterns)

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) | Картинка (.png) |
|-------|-----------|-------------|-----------------|
| **M24** | complete | [spec](../../../UX/mockups/user%20profile/mockup-24-account-summary-complete-spec.md) | [png](../../../UX/mockups/user%20profile/mockup-24-account-summary-complete-spec.png) · [вариант-1](../../../UX/mockups/user%20profile/mockup-24-account-summary-complete-spec-1.png) |
| **M25** | minimal-data | [spec](../../../UX/mockups/user%20profile/mockup-25-account-summary-minimal-data-spec.md) | [png](../../../UX/mockups/user%20profile/mockup-25-account-summary-minimal-data-spec.png) |
| **M26** | missing-email | [spec](../../../UX/mockups/user%20profile/mockup-26-account-summary-missing-email-spec.md) | ⚠️ **картинки нет** (PNG не поставлен) |

## Зачем простыми словами
Техническая карточка аккаунта в кабинете: кто залогинен, operational status. Не социальный профиль. Данные из live `GET /me`; отсутствующие nullable-поля → `Not Available`.

## Текущее состояние (verified)
- `/me` отдаёт: `display_name`, `role`, `phone_verified*`, **`email`** (nullable), **`email_verified`**, **`created_at`** (nullable), **`account_status`** (`"active"`) ([`me_response.py:21-22,35-36,50`](../../../../../doge-identity-service/src/core/api/me_response.py) — `email`/`email_verified` ONB-01 pkg-000045; `created_at`/`account_status` AUTHCORE-02 pkg-000044, 2026-07-24). M26 missing-email — только при `email=null` (claim absent / OAuth structural null); M24 complete достижим при `email != null`.

## Функциональные требования (FR)
- **FR-CAB-02.1** Компонент `<AccountSummary />` в слоте Account (M99 top-left).
- **FR-CAB-02.2** Поля: Email (masked или `Not Available`), Account Created, Role, Account Status — стабильная сетка строк (M24–M26).
- **FR-CAB-02.3** Три UX-состояния: complete (M24), minimal-data (M25), missing-email (M26).
- **FR-CAB-02.4** Отсутствующее поле → `Not Available` (muted), не error state, не collapse layout.
- **FR-CAB-02.5** Privacy: не показывать raw phone, OTP, tokens (как FR-08.7 / ID-08).
- **FR-CAB-02.L10N** **Локализация (L10N) — сразу:** labels, role/status display, placeholder через `t()`; ключи `cabinet.account.*` + reuse `cabinet.common.notAvailable` в [`cabinetDictionary.js`](../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`, et/ru/en. Гид: [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md); EN — канон M24–M26.

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | `<AccountSummary />` в слоте Account (M99 top-left); данные из `useSessionShell().profile` | [identityService.js](../../../../src/auth/identityService.js), [SessionShellContext.jsx](../../../../src/auth/SessionShellContext.jsx) |
| **T02** | Сетка строк Email/Account Created/Role/Account Status (стабильная, не collapse) | `AccountSummary.jsx` |
| **T03** | 3 UX-состояния: complete (M24) / minimal-data (M25) / missing-email (M26); отсутствующее поле → `cabinet.common.notAvailable` (muted, не error) | `AccountSummary.jsx` |
| **T04** | Privacy: не показывать raw phone/OTP/tokens (FR-08.7/ID-08) | `AccountSummary.jsx` |
| **T05** | L10N: `cabinet.account.*` + reuse `cabinet.common.notAvailable`, et/ru/en, `CABINET_FLAT_KEYS` | `cabinetDictionary.js` |
| **T06** | Icon-wiring полей (ic-field-*); missing-email БЕЗ warning-иконки (M26 §7) | `AccountSummary.jsx` |
| **T07** | Vitest: 3 состояния + missing-field=NotAvailable + privacy + parity | `__tests__` |
| **T08** | Story gate CAB-02 | — |

## Иконки (из каталога)
> Источник: [STORY-SPA-CAB-icon-assets.md](STORY-SPA-CAB-icon-assets.md) #1–#4. Кладутся в `public/icons/user-cabinet/`, в коде — `/icons/user-cabinet/ic-<name>.png`.

| Строка поля | Файл | Путь | Каталог # |
|-------------|------|------|-----------|
| Email | `ic-field-email.png` | `/icons/user-cabinet/ic-field-email.png` | #1 |
| Account Created | `ic-field-created.png` | `/icons/user-cabinet/ic-field-created.png` | #2 |
| Role | `ic-field-role.png` | `/icons/user-cabinet/ic-field-role.png` | #3 |
| Account Status | `ic-field-status.png` | `/icons/user-cabinet/ic-field-status.png` | #4 |

> ⚠️ **missing-email (M26):** поле = `Not Available` **текстом**, БЕЗ warning-иконки (каталог §Заметки).

## Routes / API — identity **поставлен** (extend `/me`)
> Решение 2026-07-12: extend `/me`. Backend **поставлен** (AUTHCORE-02 + ONB-01, 2026-07-24). FE **Done** (`pkg-000029`). SSOT статуса полей — [api-requirements](STORY-SPA-CAB-api-requirements.md).

- `GET /me` → `display_name`, `role` (`"authenticated"`), **`email`**, **`email_verified`**, **`created_at`**, **`account_status`** (`"active"`), `phone_verified*`. Через `useSessionShell().profile` / `identityService.fetchMe`.
- Nullable → `cabinet.common.notAvailable` (FR-CAB-02.4).
- `role` `"authenticated"` → `cabinet.account.role.authenticatedUser` ([`accountSummaryState.js`](../../../../src/components/AccountSummary/accountSummaryState.js)).

## Зависимости
- [CAB-01](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) — shell slot.
- [ID-02](../identity-auth/STORY-SPA-ID-02-session-shell-states.md) — authenticated context.

## Вне scope
- Civic status (CAB-03). Profile editing. Wallet.

## Тексты и переводы (en / et / ru)

> Локализация по [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md): ключи `cabinet.account.*` в [`cabinetDictionary.js`](../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`. EN — канон M24–M26. Placeholder отсутствующих полей — reuse `cabinet.common.notAvailable` (CAB-01).

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

> **Факт:** identity `role=authenticated` → display `cabinet.account.role.authenticatedUser`. Masked email и даты — динамические, не переводятся.

## Acceptance Criteria
- [ ] `/profile` показывает Account Summary (не placeholder page).
- [ ] `display_name`, `role` из `/me`; partial fields с `Not Available` без поломки карточки.
- [ ] Три состояния M24/M25/M26 достижимы при соответствующих данных.
- [ ] Сырой номер/OTP/токены не отображаются.
- [ ] Protected; неавторизованный не видит контент.
- [ ] Все строки локализованы (et/ru/en) через `t()`; `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.

## Швы
- [`identityService.js`](../../../../src/auth/identityService.js), [`SessionShellContext.jsx`](../../../../src/auth/SessionShellContext.jsx).
