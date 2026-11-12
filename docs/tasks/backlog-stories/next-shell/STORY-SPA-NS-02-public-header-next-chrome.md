# STORY-SPA-NS-02 — PublicHeader next chrome

## Meta
- **Key:** `STORY-SPA-NS-02-public-header-next-chrome`
- **Package:** [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · Builder `pkg-000098`
- **Epic:** [EPIC-SPA-19-next-shell](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-02-public-header-next-chrome/STORY-SPA-NS-02-public-header-next-chrome.md)
- **Status:** Done · P3 (`2026-10-09T15:46:55Z`) · P6 gap CLOSED (`2026-10-09T15:54:16Z`) · gate PASS · OPEN empty
- **Depends on:** NS-01 host Done; [icon catalog](STORY-SPA-NS-icon-assets.md); [api-requirements §1](STORY-SPA-NS-api-requirements.md)
- **Brief:** [UX-PROMPTS.md](UX-PROMPTS.md) · NS-H · UX ready M149 (no mockup brief)

## Зачем
Публичная шапка next: бренд → `#/next/feed`, locale, theme, account; иконки из next-shell runtime. Не marketing hero.

## Текущее состояние (verified)

### Historical (pre-P3 · P1.3 intake)
- [`Header.jsx`](../../../../src/components/AppShell/Header.jsx): brand → `/board`; locale; ThemeToggle; AccountControl.
- Session: `useSessionShell` + `GET /me`; logout `supabase.auth.signOut` → navigate `/board` ([api-req §1](STORY-SPA-NS-api-requirements.md)).

### As-of-Done (P3 · `2026-10-09T15:46:55Z` · P6 SSOT `2026-10-09T15:54:16Z`)
- Brand Link → `/next/feed` (`FEED_HOME`) · logo reuse `/assets/DOGEstonia-logo-*`
- Icons `/icons/next-shell/{navigation,actions,status}/` · ThemeToggle glyphs · search/notifications chrome affordance
- Logout client `signOut` → navigate `/next/feed` · no `/logout`
- L10N `nextShell.header.*` en/et/ru · gate PASS · story-root `screenshots/full-cycle/` Present (P6)

## UX SSOT
- Spec: [M149 §4 Header](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) · [Component §8 `PublicHeader`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md)
- Register: [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md) row NS-H → NS-02
- States: NS-H-guest / auth / locale / theme / narrow ([UX-PROMPTS](UX-PROMPTS.md))

## Icons
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Mobile / overflow menu | `menu` | `/icons/next-shell/navigation/menu.svg` |
| Theme light | `theme-light` | `/icons/next-shell/navigation/theme-light.svg` |
| Theme dark | `theme-dark` | `/icons/next-shell/navigation/theme-dark.svg` |
| Notifications (chrome) | `notifications` | `/icons/next-shell/navigation/notifications.svg` |
| Account | `account` | `/icons/next-shell/navigation/account.svg` |
| Search affordance | `search` | `/icons/next-shell/navigation/search.svg` |

> Promote masters → `public/icons/next-shell/` on implement ([icon catalog §Promote](STORY-SPA-NS-icon-assets.md)). Live server text search = OOS (DUI-Q12).

## Logo
- Reuse `/assets/DOGEstonia-logo-horizontal.png` (+ `/assets/DOGEstonia-logo-fallback.svg`) — no new asset

## Функциональные требования (FR)
- **FR-NS-02.1** Brand click → `/next/feed` (not `/board`).
- **FR-NS-02.2** Locale + ThemeToggle reuse existing patterns (`data-theme` / `dogestonia.theme`).
- **FR-NS-02.3** Account: guest → login; auth menu; logout client `signOut`; post-logout → feed home.
- **FR-NS-02.4** Search control may show as affordance only — no production search results claim.
- **FR-NS-02.L10N** Reuse `publicHome.account.*` / locale keys where possible; `nextShell.header.*` for feed-home a11y if needed.

## Routes / API
- [api-req §1 IDENTITY](STORY-SPA-NS-api-requirements.md): `GET /me` ✅ · `signOut` ✅ client · no `/logout`.

## Вне scope
- Feed body, BoardToolbar product filters, notifications product inbox.
- New logo / new icon masters.

## Тексты и переводы (en / et / ru)

> Account strings: **reuse** `publicHome.account.*` (PH-02). Locale: existing keys.

### `nextShell.header.*` (draft deltas)

| key | en | et | ru |
|-----|----|----|----|
| `nextShell.header.homeAria` | Go to feed home | Mine voo avalehele | На главную ленты |
| `nextShell.header.searchAria` | Search (coming later) | Otsing (hiljem) | Поиск (позже) |
| `nextShell.header.menuOpen` | Open menu | Ava menüü | Открыть меню |
| `nextShell.header.menuClose` | Close menu | Sulge menüü | Закрыть меню |

> Brand **DOGEstonia** — не переводится.

## Acceptance Criteria
- [x] Brand → `#/next/feed`; logo reuse assets path
- [x] Guest/auth/locale/theme states match UX-PROMPTS NS-H checklist
- [x] Icons use `/icons/next-shell/…` runtime URLs from catalog
- [x] Logout redirects to feed home; no new identity endpoint
- [x] Search affordance does not claim live search; feed body OOS

## Verified As-of-Done
- P3 `2026-10-09T15:46:55Z` · `pkg-000098` · [gate](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-02-public-header-next-chrome/task-spa-ns-02-t03-brand-link-feed-logo-reuse/acceptance-verification-spa-ns-02.md) PASS  
- P6 gap `2026-10-09T15:54:16Z` · `run_mode=spa_ns_02_audit_2026_10_09` · F1–F3 CLOSED · F4/F5 WAIVED · OPEN empty  
- Live: brand `#/next/feed` · next-shell icons 200 · WIP host intact · Backend UP smoke · story-root screenshots pack
