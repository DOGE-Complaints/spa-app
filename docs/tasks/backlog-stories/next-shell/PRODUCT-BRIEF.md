# Next Shell — Product Brief (REQ-22 shell slice)

> **Locked:** 2026-10-09 (Architect Studio) + operator slice «только new shell»  
> **Status:** locked для ADMIN-NS-01…06  
> **Parent REQ:** [22-feed-visual-redesign-phase-1.md](../../../requirements/22-feed-visual-redesign-phase-1.md) §2a, FR-22.0/1/10/11/14/16/17 (shell parts)  
> **Arch:** [feed-visual-redesign-phase-1/00-overview.md](../../../architecture/feed-visual-redesign-phase-1/00-overview.md) · [01-routes-shell](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) · [03-verify](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)  
> **Sibling prep:** [REQ-21](../../../requirements/21-ui-modularity-theme-and-redesign-prep.md) Phase 0 Done  
> **Follow-on:** feed content ADMIN — [next-feed](../next-feed/INDEX.md) (ADMIN-NF-01…06)

## One-liner

Доставить **полностью новый public shell** из UX (M149 chrome) на дом `#/next/feed*`, затем **тем же составом** на classic shelter; classic **не** дом.

## Locked decisions (this package)

| # | Theme | Decision |
|---|-------|----------|
| 1 | Home | `#/next/feed` (+ `#/next/feed/issue/:id` host); brand/home → feed |
| 2 | Classic | Shelter only; D2.3 new shell OK; content may stay old board |
| 3 | Shell order | **D2.1** next → **D2.3** classic (D2.2 feed content = later package) |
| 4 | Owner | Single `AppShellLayout` — no long-lived NextShell fork |
| 5 | `/` `*` | Flip to `/next/feed` after working next shell+route |
| 6 | Right rail | No production module (DUI-Q16) |
| 7 | Own-story rail | Metrics/status + nav only (DUI-Q15); no cabinet redesign |
| 8 | Verify | Vitest + browser-smoke for **shell**; repair/extend theme/shell tests |
| 9 | Theme | Keep `data-theme` / `dogestonia.theme` / ThemeToggle |
| 10 | UX artboards | **Already exist** — index only; do not create |
| 11 | Icons | Masters in icon-system; promote into `public/icons/<context>/` |
| 12 | Header logo | **Reuse** current `/assets/DOGEstonia-logo-*` |

## In scope

- Register `#/next/feed` (+ issue host) with shell composition; honest placeholder/WIP content
- PublicHeader, ProfileRail chrome, layout grid, mobile shell chrome per M149/M159 **shell** panels
- Apply same shell to classic routes (shelter-list intact)
- spa-url-page-map + test baselines for shell
- Index + promote shell icons to runtime under `public/icons/next-shell/`

## Out of scope (this package)

- Feed list/cards, structural filter **product** UX, map, threads, reactions, invite stub, write-gate UI, mount-parity **body**
- Creating new UX artboards/specs/PNG or drawing new icon masters
- Cabinet/Profile product redesign
- Invent gateway/threads fields/endpoints
- Retire classic (needs feed Done + gates)
- Greenfield second SPA

## Assets (locked)

**Mockup SSOT:** `docs/UX/next/feed/` (artboards + packs) — already on disk; **no new mockup files** from this package. Intake map for implement: [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md).

| Class | SSOT (docs) | Runtime for code | Rule |
|-------|-------------|------------------|------|
| Shell UX | [`docs/UX/next/feed/artboards/`](../../../UX/next/feed/artboards/) (M149…) + layout/mobile packs | — (docs only) | **Do not create** new artboards/specs · see register |
| Icons | [`dogestonia-icon-system-v1.0/`](../../../UX/next/feed/dogestonia-icon-system-v1.0/) · [manifest](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-manifest-v1.0.md) | Promote → `spa-app/public/icons/next-shell/<group>/` (group = usage: `navigation`, `actions`, `status`, …) | Index in ADMIN-NS-03; no redesign glyphs |
| Header logo | existing product assets | **Reuse** `/assets/DOGEstonia-logo-horizontal.png` (+ `/assets/DOGEstonia-logo-fallback.svg`) as [`Header.jsx`](../../../../src/components/AppShell/Header.jsx) | No new logo asset |

**Shell icon subset:** `board`, `profile`, `my-stories`, `search`, `menu`, `theme-light`, `theme-dark`, `notifications`, `account`, `back`, `close`, `location`, `verified`, `chevron-down` (as needed). Reactions / map / post-actions → **feed package later**.

**Runtime URL example:** `/icons/next-shell/navigation/board.svg` ← master `…/icon-system…/icons/navigation/board.svg`.

## As-is anchors (verified)

- Routes: [`App.jsx`](../../../../src/App.jsx) L24–33 — `/board`, `/issue/:id`; `/`→`/board`; no `#/next/*`
- Chrome owner: [`AppShellLayout.jsx`](../../../../src/layout/AppShellLayout.jsx) L38–76
- Header: [`Header.jsx`](../../../../src/components/AppShell/Header.jsx) L100–116 — brand→`/board`, locale, ThemeToggle, account
- Existing `public/icons/` contexts: `public-home`, `threads-feed`, `user-cabinet`, … — **new context** `next-shell`

## Planned product stories (ADMIN-NS-05 materializes files)

| Key | Surface |
|-----|---------|
| NS-01 | Next routes + shell host + placeholder |
| NS-02 | PublicHeader next chrome (home→feed, theme/locale/account) |
| NS-03 | ProfileRail + shelter nav |
| NS-04 | Shell grid / empty right-rail slot + mobile shell chrome |
| NS-05 | D2.3 apply shell to classic |
| NS-06 | `/` flip + verify shell + page-map + icon promote verify |
