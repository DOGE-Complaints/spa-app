# STORY-SPA-PH-01 — Header Brand + Primary Nav

## Meta
- **Key:** `STORY-SPA-PH-01-header-brand-nav`
- **Epic:** [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md)
- **Pipeline:** [pipeline story](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/STORY-SPA-PH-01-header-brand-nav.md)
- **Package:** [public-home/](README.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [UX-PROMPTS.md](UX-PROMPTS.md) (PH-H)
- **Status:** Done — P3 gate PASS 2026-08-04T07:07:39Z (`pkg-000045`)
- **Severity:** 🟡 MED
- **Depends on:** [G8 AppShell](../design-foundation/STORY-SPA-G8-app-shell-refactor.md) Done; mockups M129; [icon catalog](STORY-SPA-PH-icon-assets.md); [api-requirements §1.1](STORY-SPA-PH-api-requirements.md)

## Артборд (SSOT дизайна)

| Мокап | Состояние | Спека (.md) |
|-------|-----------|-------------|
| **M129** | Public header chrome (guest/auth/locale/mobile) | [mockup-129-public-header-chrome-state-sheet-spec.md](../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) |
| **M130** | Account slot context (chrome host) | [mockup-130-…](../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md) — реализация слота в PH-02 |

> PNG артборды в репо могут отсутствовать — SSOT = `.md` specs.

## Зачем простыми словами
Единая публичная шапка: бренд DOGEstonia + горизонтальное меню Dashboard · How it works · Submit a story + locale. Не маркетинговый hero. Account control — PH-02; Submit handoff — PH-06.

## Текущее состояние (verified)
- Shell: [`AppShell`](../../../../src/components/AppShell/) + board-local header remnants; G8 Done.
- Nav labels / brand strip не соответствуют M129 (старый board chrome).
- Locale flags reuse: `public/assets/ET.svg`, `RU.svg`, `US.svg`.
- Session guest/auth для слота account: `useSessionShell` / `GET /me` — [api-req §1.1](STORY-SPA-PH-api-requirements.md) ✅.

## Функциональные требования (FR)
- **FR-PH-01.1** Persistent public header на public routes (M129): Brand | Primary nav | Session & locale.
- **FR-PH-01.2** Brand: logo (`DOGEstonia-logo-big.png` + fallback SVG) + product name **DOGEstonia**; клик → `/board` (или `/` → board).
- **FR-PH-01.3** Nav items (order fixed): Dashboard → `/board`; How it works → `/how-it-works`; Submit a story → external GPT (behavior PH-06).
- **FR-PH-01.4** Active route underline/marker for Dashboard / How it works; Submit не «hero button».
- **FR-PH-01.5** Locale control: reuse existing locale selector patterns + flags; selected locale readable without flag-only.
- **FR-PH-01.6** Narrow/mobile: collapse nav into menu control with `ic-nav-menu`; Escape / outside click closes.
- **FR-PH-01.7** Account slot host only — content/behavior = PH-02.
- **FR-PH-01.L10N** Ключи `publicHome.nav.*` (+ menu a11y) в будущем `publicHomeDictionary.js` + `PUBLIC_HOME_FLAT_KEYS`, et/ru/en. EN — канон M129 / appendix nav. Гид: [localization-developer-guide.md](../../../runtime-docs/localization-developer-guide.md). Forbidden: landing fluff, «Oops».

## Субтаски
| Таск | Суть | Швы |
|------|------|-----|
| **T01** | `<PublicHeader />` / AppShell header zones per M129 | AppShell components, layout |
| **T02** | Brand logo + name + home link | `public/assets/DOGEstonia-logo-*` |
| **T03** | Nav links + active states; Submit wired via PH-06 helper | router, PH-06 |
| **T04** | Locale control (reuse) | existing locale UI |
| **T05** | Mobile menu + `ic-nav-menu` | `/icons/public-home/ic-nav-menu.png` |
| **T06** | L10N `publicHome.nav.*` | `publicHomeDictionary.js` |
| **T07** | Vitest: nav order, active, mobile menu a11y, key parity | `__tests__` |
| **T08** | Story gate PH-01 | — |

## Иконки (из каталога)
> Источник: [STORY-SPA-PH-icon-assets.md](STORY-SPA-PH-icon-assets.md).
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
- Chrome only. Session presence for account slot: [api-req §1.1](STORY-SPA-PH-api-requirements.md) (Supabase + `GET /me`).
- No new HTTP endpoints.

## Зависимости
- PH-02 — account control in right slot.
- PH-05 — `/how-it-works` target must exist (can ship stub route in same wave).
- PH-06 — Submit CTA URL/env.

## Вне scope
- Account menu / logout (PH-02). Footer (PH-03). Board feed (PH-04). GPT URL wiring details (PH-06). Marketing hero.

## Тексты и переводы (en / et / ru)

> EN — канон M129 + [M133 appendix §header.nav](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) (mapped to `publicHome.nav.*`). Locale selector strings — **reuse** existing locale keys (не дублировать).

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
- [x] Public header matches M129 zones: brand + nav + locale (+ account slot host).
- [x] Nav order: Dashboard · How it works · Submit a story; active state for in-app routes.
- [x] Mobile: hamburger `ic-nav-menu`; menu dismissible.
- [x] All nav labels via `t()`; `PUBLIC_HOME_FLAT_KEYS` listed; no forbidden marketing terms.
- [x] Links to [icon catalog](STORY-SPA-PH-icon-assets.md) #1 + reuse rows; [api-req §1.1](STORY-SPA-PH-api-requirements.md).

## Швы
- AppShell header, router, `publicHomeDictionary.js` (future), locale control.
