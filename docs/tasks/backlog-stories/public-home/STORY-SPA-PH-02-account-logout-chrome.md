# STORY-SPA-PH-02 — Account Control + Logout Chrome

## Meta
- **Key:** `STORY-SPA-PH-02-account-logout-chrome`
- **Epic:** [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md)
- **Pipeline:** [pipeline story](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-02-account-logout-chrome/STORY-SPA-PH-02-account-logout-chrome.md)
- **Package:** [public-home/](README.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [UX-PROMPTS.md](UX-PROMPTS.md) (PH-A)
- **Status:** Done — P3 gate PASS 2026-08-04T09:57:03Z (`pkg-000046`)
- **Severity:** 🟡 MED
- **Depends on:** PH-01 header slot; [M130](../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md); [api-req §1.1–1.2](STORY-SPA-PH-api-requirements.md); [ID-02](../identity-auth/STORY-SPA-ID-02-session-shell-states.md)

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) |
|-------|-----------|-------------|
| **M130** | Guest · Authenticated · Menu open | [mockup-130-public-header-account-control-state-sheet-spec.md](../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md) |
| **M129** | Header host context | [mockup-129-…](../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) |

## Зачем простыми словами
Справа в шапке: guest → Sign in (`/login`); auth → компактный account control с меню Profile + Log out. Logout = client `signOut`, без backend `/logout`.

## Текущее состояние (verified)
- Session: [`useSessionShellState.js`](../../../../src/auth/useSessionShellState.js) + [`identityService.fetchMe`](../../../../src/auth/identityService.js) → `GET /me` ✅.
- **As-of-Done (P3/P6):** client `signOut` wired in [`AccountControl.jsx`](../../../../src/components/AccountControl/AccountControl.jsx) → redirect `/board`; no identity `/logout` ([api-req §1.2](STORY-SPA-PH-api-requirements.md)). HEAD `81eec52`.
- Identity **не** имеет logout endpoint — не создавать BE story.
- `/profile` cabinet Done (EPIC-07).
- Header default slot: [`AccountControlSlot`](../../../../src/components/AccountControl/AccountControlSlot.jsx) in [`Header.jsx`](../../../../src/components/AppShell/Header.jsx).

## Функциональные требования (FR)
- **FR-PH-02.1** Component `<AccountControl />` in PH-01 right slot (M130).
- **FR-PH-02.2** Guest: outline profile icon + optional «Sign in» label → navigate `/login`; no dropdown.
- **FR-PH-02.3** Authenticated idle: avatar/`ic-field-role` + optional display_name + chevron; click opens menu.
- **FR-PH-02.4** Menu items exactly: **Profile** → `/profile`; **Log out** → `supabase.auth.signOut` (or project auth helper) → redirect `/board`. No confirmation modal v1.
- **FR-PH-02.5** Menu: outside click / Escape dismiss; keyboard navigable; Log out not destructive-styled.
- **FR-PH-02.6** Privacy: no raw phone/OTP/tokens in menu (ID-08 patterns).
- **FR-PH-02.L10N** Ключи `publicHome.account.*` в `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`. EN — канон M130. Profile menu label may align with `appShell.nav.profile` reuse where identical.

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | `<AccountControl />` guest/auth states | SessionShell, PH-01 slot |
| **T02** | Guest → `/login` | router |
| **T03** | Auth menu: Profile + Log out | `/profile` |
| **T04** | Wire client `signOut` + redirect `/board` | supabase auth client / identityService |
| **T05** | Icons: `ic-field-role`, chevron-down | catalog reuse |
| **T06** | L10N `publicHome.account.*` | `publicHomeDictionary.js` |
| **T07** | Vitest: guest/auth/menu/logout redirect; no BE logout call | `__tests__` |
| **T08** | Story gate PH-02 | — |

## Иконки (из каталога)
> Источник: [STORY-SPA-PH-icon-assets.md](STORY-SPA-PH-icon-assets.md) reuse rows.
>
> **Icons (non-blocking):** Финальные картинки пока не готовы. В коде прописывать точные имена/пути из каталога (`/icons/public-home/…`, reuse `/icons/identity|story-handoff|user-cabinet/…`). Отсутствие или placeholder PNG не блокирует вёрстку, L10N, routes, тесты — замена арта позже.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| Account / profile | `ic-field-role.png` | `/icons/user-cabinet/ic-field-role.png` | CAB #3 |
| Dropdown chevron | `ic-chevron-down.png` | `/icons/identity/ic-chevron-down.png` | EPIC-04 #11 |

## Routes / API
- [api-req §1.1](STORY-SPA-PH-api-requirements.md): session + `GET /me` (`avatar_url`, `display_name`, …).
- [api-req §1.2](STORY-SPA-PH-api-requirements.md): logout = client `signOut` only; **no** identity `/logout`.
- Guest login route: SPA `/login` (no API).

## Зависимости
- PH-01 — header host slot.
- ID-02 — session states.
- CAB-01 — `/profile` destination exists.

## Вне scope
- Backend logout endpoint. Logout confirmation modal. Settings / wallet shortcuts in menu. Header brand/nav (PH-01).

## Тексты и переводы (en / et / ru)

> EN — канон M130. Appendix `header.account.signIn` → `publicHome.account.signIn`.

### `publicHome.account.*`

| key | en | et | ru |
|-----|----|----|----|
| `publicHome.account.signIn` | Sign in | Logi sisse | Войти |
| `publicHome.account.profile` | Profile | Profiil | Профиль |
| `publicHome.account.logOut` | Log out | Logi välja | Выйти |
| `publicHome.account.openMenu` | Open account menu | Ava konto menüü | Открыть меню аккаунта |

> Optional reuse: `appShell.nav.profile` if string parity maintained — prefer single key in implementation notes (ADMIN-06).

## Acceptance Criteria
- [x] Guest shows Sign in → `/login` (M130 State A).
- [x] Auth shows account control; menu = Profile + Log out only (M130 State C).
- [x] Log out clears session via client `signOut` and lands on `/board`; no BE logout call.
- [x] L10N keys listed; icon catalog reuse rows referenced; api-req §1.1–1.2 linked.

## Швы
- SessionShell / supabase auth, PH-01 header slot, `/login`, `/profile`, `/board`.
