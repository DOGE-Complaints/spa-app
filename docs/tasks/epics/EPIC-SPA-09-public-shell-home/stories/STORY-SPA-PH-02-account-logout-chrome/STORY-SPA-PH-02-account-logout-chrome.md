# STORY-SPA-PH-02-account-logout-chrome — Account Control + Logout Chrome

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-02-account-logout-chrome`
- **Parent Epic:** [`../../EPIC-SPA-09-public-shell-home.md`](../../EPIC-SPA-09-public-shell-home.md)
- **Epic:** EPIC-SPA-09 Public Shell + Home · **Wave 1**
- **Пакет:** `public-home/`
- **Status:** Done — P3 gate PASS 2026-08-04T09:57:03Z (`pkg-000046`)
- **Severity:** 🟡 MED
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-02-account-logout-chrome.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-02-account-logout-chrome.md)
- **decision_ref:** backlog story + [mockup-130-public-header-account-control-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md) + [mockup-129-…](../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) (host) + [STORY-SPA-PH-api-requirements.md](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) §1.1–1.2 + [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md` (+ `.png`)
- **Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T08:32:36Z
- **Depends on:** [PH-01](../STORY-SPA-PH-01-header-brand-nav/STORY-SPA-PH-01-header-brand-nav.md) Done (header slot); M130; [api-req §1.1–1.2](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md); [ID-02](../../../../backlog-stories/identity-auth/STORY-SPA-ID-02-session-shell-states.md); CAB-01 `/profile`

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) |
|-------|-----------|-------------|
| **M130** | Guest · Authenticated · Menu open | [mockup-130-public-header-account-control-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md) |
| **M129** | Header host context | [mockup-129-…](../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) |

> Verified on disk (P1.3): M130 `.md` + `.png` (+ estonia) present. Path A — no UX brief.

## Зачем простыми словами
Справа в шапке: guest → Sign in (`/login`); auth → компактный account control с меню Profile + Log out. Logout = client `signOut`, без backend `/logout`.

## Текущее состояние (verified)
- Session: [`useSessionShellState.js`](../../../../../../src/auth/useSessionShellState.js) + [`identityService.fetchMe`](../../../../../../src/auth/identityService.js) → `GET /me` ✅.
- PH-01 host: [`Header.jsx`](../../../../../../src/components/AppShell/Header.jsx) default `<AccountControlSlot />` in `header-account-slot` (override via `accountSlot`).
- **As-of-Done (P3/P6):** `supabase.auth.signOut()` in [`AccountControl.jsx`](../../../../../../src/components/AccountControl/AccountControl.jsx) → `navigate('/board')`; no BE `/logout` ([api-req §1.2](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md)). HEAD `81eec52`.
- Icons on disk: `/icons/user-cabinet/ic-field-role.png`, `/icons/identity/ic-chevron-down.png` (chevron placeholder-ok per audit F4 WAIVED).
- Identity **не** имеет logout endpoint — не создавать BE story.
- `/profile` cabinet Done (EPIC-07).

## Функциональные требования (FR)
- **FR-PH-02.1** Component `<AccountControl />` in PH-01 right slot (M130).
- **FR-PH-02.2** Guest: outline profile icon + optional «Sign in» label → navigate `/login`; no dropdown.
- **FR-PH-02.3** Authenticated idle: avatar/`ic-field-role` + optional display_name + chevron; click opens menu.
- **FR-PH-02.4** Menu items exactly: **Profile** → `/profile`; **Log out** → `supabase.auth.signOut` (or project auth helper) → redirect `/board`. No confirmation modal v1.
- **FR-PH-02.5** Menu: outside click / Escape dismiss; keyboard navigable; Log out not destructive-styled.
- **FR-PH-02.6** Privacy: no raw phone/OTP/tokens in menu (ID-08 patterns).
- **FR-PH-02.L10N** Ключи `publicHome.account.*` в `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`. EN — канон M130. Profile menu label may align with `appShell.nav.profile` reuse where identical.

## Субтаски (pipeline)

| Таск | Волна | Task folder | Суть |
|------|-------|-------------|------|
| **T01** | 1 | [task-spa-ph-02-t01-account-control-guest-auth](./task-spa-ph-02-t01-account-control-guest-auth/README.md) | `<AccountControl />` guest/auth states · **ui_anchor** |
| **T02** | 1 | [task-spa-ph-02-t02-guest-sign-in-login](./task-spa-ph-02-t02-guest-sign-in-login/README.md) | Guest → `/login` |
| **T03** | 1 | [task-spa-ph-02-t03-auth-menu-profile-logout](./task-spa-ph-02-t03-auth-menu-profile-logout/README.md) | Auth menu: Profile + Log out |
| **T04** | 1 | [task-spa-ph-02-t04-signout-supabase-redirect-board](./task-spa-ph-02-t04-signout-supabase-redirect-board/README.md) | Wire client `signOut` + redirect `/board` |
| **T05** | 1 | [task-spa-ph-02-t05-account-icons-reuse](./task-spa-ph-02-t05-account-icons-reuse/README.md) | Icons: `ic-field-role`, chevron-down |
| **T06** | 1 | [task-spa-ph-02-t06-l10n-account-keys](./task-spa-ph-02-t06-l10n-account-keys/README.md) | L10N `publicHome.account.*` |
| **T07** | 1 | [task-spa-ph-02-t07-vitest-account-logout](./task-spa-ph-02-t07-vitest-account-logout/README.md) | Vitest: guest/auth/menu/logout redirect; no BE logout call |
| **T08** | 1 | [task-spa-ph-02-t08-story-gate-ph-02](./task-spa-ph-02-t08-story-gate-ph-02/README.md) | Story gate PH-02 |
| **T09** | post-audit | [task-spa-ph-02-t09-commit-ph02-account-logout](./task-spa-ph-02-t09-commit-ph02-account-logout/README.md) | Commit PH-02 to HEAD (audit F1) · Done `81eec52` |
| **T10** | post-audit | [task-spa-ph-02-t10-as-of-done-signout-pipeline-ac](./task-spa-ph-02-t10-as-of-done-signout-pipeline-ac/README.md) | As-of-Done signOut + pipeline AC (audit F3) · Done |

## Иконки (из каталога)
> Источник: [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) reuse rows.
>
> **Icons (non-blocking):** Финальные картинки пока не готовы. В коде прописывать точные имена/пути из каталога (`/icons/public-home/…`, reuse `/icons/identity|story-handoff|user-cabinet/…`). Отсутствие или placeholder PNG не блокирует вёрстку, L10N, routes, тесты — замена арта позже.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| Account / profile | `ic-field-role.png` | `/icons/user-cabinet/ic-field-role.png` | CAB #3 |
| Dropdown chevron | `ic-chevron-down.png` | `/icons/identity/ic-chevron-down.png` | EPIC-04 #11 |

## Routes / API
- [api-req §1.1](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md): session + `GET /me` (`avatar_url`, `display_name`, …).
- [api-req §1.2](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md): logout = client `signOut` only; **no** identity `/logout`.
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

## Tasks

- [SPA-PH-02-T01](task-spa-ph-02-t01-account-control-guest-auth/README.md) — AccountControl guest/auth states · **ui_anchor**
- [SPA-PH-02-T02](task-spa-ph-02-t02-guest-sign-in-login/README.md) — Guest → /login
- [SPA-PH-02-T03](task-spa-ph-02-t03-auth-menu-profile-logout/README.md) — Auth menu Profile + Log out
- [SPA-PH-02-T04](task-spa-ph-02-t04-signout-supabase-redirect-board/README.md) — signOut via supabase + redirect /board
- [SPA-PH-02-T05](task-spa-ph-02-t05-account-icons-reuse/README.md) — Account icons reuse
- [SPA-PH-02-T06](task-spa-ph-02-t06-l10n-account-keys/README.md) — L10N publicHome.account.*
- [SPA-PH-02-T07](task-spa-ph-02-t07-vitest-account-logout/README.md) — Vitest guest/auth/logout
- [SPA-PH-02-T08](task-spa-ph-02-t08-story-gate-ph-02/README.md) — Story gate PH-02
- [SPA-PH-02-T09](task-spa-ph-02-t09-commit-ph02-account-logout/README.md) — Post-audit F1 commit Done (`81eec52`)
- [SPA-PH-02-T10](task-spa-ph-02-t10-as-of-done-signout-pipeline-ac/README.md) — Post-audit F3 As-of-Done Done
