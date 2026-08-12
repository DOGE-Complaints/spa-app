# STORY-SPA-PH-01-header-brand-nav — Header Brand + Primary Nav

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-01-header-brand-nav`
- **Parent Epic:** [`../../EPIC-SPA-09-public-shell-home.md`](../../EPIC-SPA-09-public-shell-home.md)
- **Epic:** EPIC-SPA-09 Public Shell + Home · **Wave 1**
- **Пакет:** `public-home/`
- **Status:** Done — P3 gate PASS 2026-08-04T07:07:39Z (`pkg-000045`)
- **Severity:** 🟡 MED
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-01-header-brand-nav.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-01-header-brand-nav.md)
- **decision_ref:** backlog story + [mockup-129-public-header-chrome-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) + [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) + [STORY-SPA-PH-api-requirements.md](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) §1.1
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md` (+ `.png`)
- **Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-03T13:49:59Z
- **Depends on:** [G8 AppShell](../../../../backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md) Done; mockups M129; [icon catalog](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md); [api-requirements §1.1](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md)

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) |
|-------|-----------|-------------|
| **M129** | Public header chrome (guest/auth/locale/mobile) | [mockup-129-public-header-chrome-state-sheet-spec.md](../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) |
| **M130** | Account slot context (chrome host) | [mockup-130-…](../../../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md) — реализация слота в PH-02 |

> PNG артборды в репо могут отсутствовать — SSOT = `.md` specs.  
> Verified on disk (P1.3): M129 `.md` + `.png` present.

## Зачем простыми словами
Единая публичная шапка: бренд DOGEstonia + горизонтальное меню Dashboard · How it works · Submit a story + locale. Не маркетинговый hero. Account control — PH-02; Submit handoff — PH-06.

## Текущее состояние (verified)
- Shell: [`AppShell`](../../../../../../src/components/AppShell/) + board-local header remnants; G8 Done.
- Nav labels / brand strip не соответствуют M129 (старый board chrome).
- Locale flags reuse: `public/assets/ET.svg`, `RU.svg`, `US.svg`.
- Session guest/auth для слота account: `useSessionShell` / `GET /me` — [api-req §1.1](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) ✅.
- P1.3 re-verify: [`Header.jsx`](../../../../../../src/components/AppShell/Header.jsx) = logo + sync + LanguageSelector only (no primary nav); `publicHomeDictionary.js` absent; `/how-it-works` not in `App.jsx`; `ic-nav-menu.png` present under `public/icons/public-home/`.

## Функциональные требования (FR)
- **FR-PH-01.1** Persistent public header на public routes (M129): Brand | Primary nav | Session & locale.
- **FR-PH-01.2** Brand: logo (`DOGEstonia-logo-big.png` + fallback SVG) + product name **DOGEstonia**; клик → `/board` (или `/` → board).
- **FR-PH-01.3** Nav items (order fixed): Dashboard → `/board`; How it works → `/how-it-works`; Submit a story → external GPT (behavior PH-06).
- **FR-PH-01.4** Active route underline/marker for Dashboard / How it works; Submit не «hero button».
- **FR-PH-01.5** Locale control: reuse existing locale selector patterns + flags; selected locale readable without flag-only.
- **FR-PH-01.6** Narrow/mobile: collapse nav into menu control with `ic-nav-menu`; Escape / outside click closes.
- **FR-PH-01.7** Account slot host only — content/behavior = PH-02.
- **FR-PH-01.L10N** Ключи `publicHome.nav.*` (+ menu a11y) в будущем `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`, et/ru/en. EN — канон M129 / appendix nav. Гид: [localization-developer-guide.md](../../../../../runtime-docs/localization-developer-guide.md). Forbidden: landing fluff, «Oops».

## Субтаски (pipeline)

| Таск | Волна | Task folder | Суть |
|------|-------|-------------|------|
| **T01** | 1 | [task-spa-ph-01-t01-public-header-zones](./task-spa-ph-01-t01-public-header-zones/README.md) | `<PublicHeader />` / AppShell header zones per M129 |
| **T02** | 1 | [task-spa-ph-01-t02-brand-logo-home-link](./task-spa-ph-01-t02-brand-logo-home-link/README.md) | Brand logo + name + home link |
| **T03** | 1 | [task-spa-ph-01-t03-nav-links-active](./task-spa-ph-01-t03-nav-links-active/README.md) | Nav links + active states; Submit wired via PH-06 helper |
| **T04** | 1 | [task-spa-ph-01-t04-locale-reuse](./task-spa-ph-01-t04-locale-reuse/README.md) | Locale control (reuse) |
| **T05** | 1 | [task-spa-ph-01-t05-mobile-nav-menu](./task-spa-ph-01-t05-mobile-nav-menu/README.md) | Mobile menu + `ic-nav-menu` |
| **T06** | 1 | [task-spa-ph-01-t06-l10n-nav-keys](./task-spa-ph-01-t06-l10n-nav-keys/README.md) | L10N `publicHome.nav.*` |
| **T07** | 1 | [task-spa-ph-01-t07-vitest-nav-parity](./task-spa-ph-01-t07-vitest-nav-parity/README.md) | Vitest: nav order, active, mobile menu a11y, key parity |
| **T08** | 1 | [task-spa-ph-01-t08-story-gate-ph-01](./task-spa-ph-01-t08-story-gate-ph-01/README.md) | Story gate PH-01 |

## Иконки (из каталога)
> Источник: [STORY-SPA-PH-icon-assets.md](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md).
>
> **Icons (non-blocking):** Финальные картинки пока не готовы. В коде прописывать точные имена/пути из каталога (`/icons/public-home/…`, reuse `/icons/identity|story-handoff|user-cabinet/…`). Отсутствие или placeholder PNG не блокирует вёрстку, L10N, routes, тесты — замена арта позже.

| Элемент | Файл | Путь | Каталог |
|---------|------|------|---------|
| Mobile nav menu | `ic-nav-menu.png` | `/icons/public-home/ic-nav-menu.png` | NEW #1 |
| App logo | `DOGEstonia-logo-big.png` | `public/assets/` | Reuse |
| Locale flags | `ET.svg` / `RU.svg` / `US.svg` | `public/assets/` | Reuse |
| Locale globe *(опц.)* | `ic-globe.png` | `/icons/identity/ic-globe.png` | EPIC-04 #6 |
| Locale selected check | `ic-success-check.png` | `/icons/story-handoff/ic-success-check.png` | ID-12 #14 |
| Dropdown chevron | `ic-chevron-down.png` | `/icons/identity/ic-chevron-down.png` | EPIC-04 #11 |
| Account icon (slot) | `ic-field-role.png` | `/icons/user-cabinet/ic-field-role.png` | CAB #3 → PH-02 |

## Routes / API
- Chrome only. Session presence for account slot: [api-req §1.1](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) (Supabase + `GET /me`).
- No new HTTP endpoints.

## Зависимости
- PH-02 — account control in right slot.
- PH-05 — `/how-it-works` target must exist (can ship stub route in same wave).
- PH-06 — Submit CTA URL/env.

## Вне scope
- Account menu / logout (PH-02). Footer (PH-03). Board feed (PH-04). GPT URL wiring details (PH-06). Marketing hero.

## Тексты и переводы (en / et / ru)

> EN — канон M129 + [M133 appendix §header.nav](../../../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) (mapped to `publicHome.nav.*`). Locale selector strings — **reuse** existing locale keys (не дублировать).

### `publicHome.nav.*`

| key | en | et | ru |
|-----|----|----|----|
| `publicHome.nav.dashboard` | Dashboard | Juhtpaneel | Доска |
| `publicHome.nav.howItWorks` | How it works | Kuidas see töötab | Как это работает |
| `publicHome.nav.submitStory` | Submit a story | Esita lugu | Подать историю |
| `publicHome.nav.menuOpen` | Open menu | Ava menüü | Открыть меню |
| `publicHome.nav.menuClose` | Close menu | Sulge menüü | Закрыть меню |

> Brand wordmark **DOGEstonia** — не переводится. Submit behavior/a11y handoff strings — PH-06 / `howItWorks.cta.submitAccessibleLabel`.

## Acceptance Criteria
- [ ] Public header matches M129 zones: brand + nav + locale (+ account slot host).
- [ ] Nav order: Dashboard · How it works · Submit a story; active state for in-app routes.
- [ ] Mobile: hamburger `ic-nav-menu`; menu dismissible.
- [ ] All nav labels via `t()`; `PUBLIC_HOME_FLAT_KEYS` listed; no forbidden marketing terms.
- [ ] Links to [icon catalog](../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) #1 + reuse rows; [api-req §1.1](../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md).

## Швы
- AppShell header, router, `publicHomeDictionary.js` (future), locale control.

## Tasks

- [SPA-PH-01-T01](task-spa-ph-01-t01-public-header-zones/README.md) — Public header zones (Brand | Nav | Session/Locale) · **ui_anchor**
- [SPA-PH-01-T02](task-spa-ph-01-t02-brand-logo-home-link/README.md) — Brand logo + name + home link
- [SPA-PH-01-T03](task-spa-ph-01-t03-nav-links-active/README.md) — Nav links + active states
- [SPA-PH-01-T04](task-spa-ph-01-t04-locale-reuse/README.md) — Locale control reuse
- [SPA-PH-01-T05](task-spa-ph-01-t05-mobile-nav-menu/README.md) — Mobile nav menu + ic-nav-menu
- [SPA-PH-01-T06](task-spa-ph-01-t06-l10n-nav-keys/README.md) — L10N publicHome.nav.*
- [SPA-PH-01-T07](task-spa-ph-01-t07-vitest-nav-parity/README.md) — Vitest nav + key parity
- [SPA-PH-01-T08](task-spa-ph-01-t08-story-gate-ph-01/README.md) — Story gate PH-01
- [SPA-PH-01-T12](task-spa-ph-01-t12-capture-m129-state-c-locale-open/README.md) — Post-audit F2 State C locale-open PNG · `run_mode=spa_ph_01_audit_2026_08_04`
- [SPA-PH-01-T13](task-spa-ph-01-t13-document-path-a-mobile-inline-nav/README.md) — Post-audit F3 Path A mobile doc · same run_mode
- [SPA-PH-01-T14](task-spa-ph-01-t14-remove-empty-post-audit-dirs-t09-t11/README.md) — Post-audit F5 remove empty T09–T11 · same run_mode
