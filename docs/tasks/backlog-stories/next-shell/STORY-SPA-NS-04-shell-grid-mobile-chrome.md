# STORY-SPA-NS-04 — Shell grid + mobile chrome

## Meta
- **Key:** `STORY-SPA-NS-04-shell-grid-mobile-chrome`
- **Package:** [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-19-next-shell](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-04-shell-grid-mobile-chrome/STORY-SPA-NS-04-shell-grid-mobile-chrome.md)
- **Status:** Done · P3 (`2026-10-09T16:29:50Z`) · gate PASS · UX ready M149/M159
- **Depends on:** NS-01 host; NS-02/03 chrome preferred; [icon catalog](STORY-SPA-NS-icon-assets.md)
- **Brief:** [UX-PROMPTS.md](UX-PROMPTS.md) · NS-G + NS-M

## Зачем
Layout grid: header + left rail + main + **empty/omit** right slot (DUI-Q16). Mobile shell chrome only (bottom bar / narrow header) — без feed stress body.

## Текущее состояние (verified)
- Layout: [`AppShellLayout.jsx`](../../../../src/layout/AppShellLayout.jsx) + AppShell.
- Right-rail production module: **absent** in `src` (Q16).

## UX SSOT
- Spec (grid): [Layout spec](../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md) · [layout artboard png](../../../UX/next/feed/DOGEstonia-dashboard-layout-artboard-v1.0.png) · [Component §12 `NodeContextRail`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) · [DUI-Q16](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md)
- Spec (mobile): M149 §5 panel E / `SHELL-MOBILE` · [Mobile pack](../../../UX/next/feed/DOGEstonia-mobile-responsive-design-pack-v1.0.md) · [M159 chrome-only](../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md) · [Component §9 `MobileAppBar`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md)
- Register: rows NS-G + NS-M → NS-04

## Icons
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Back (mobile / overlay) | `back` | `/icons/next-shell/navigation/back.svg` |
| Close (drawer / overlay) | `close` | `/icons/next-shell/actions/close.svg` |
| Menu (narrow) | `menu` | `/icons/next-shell/navigation/menu.svg` |
| Board (bottom nav) | `board` | `/icons/next-shell/navigation/board.svg` |
| Profile (bottom nav) | `profile` | `/icons/next-shell/navigation/profile.svg` |

## Logo
- N/A · header owns (NS-02)

## Функциональные требования (FR)
- **FR-NS-04.1** Grid hosts: header, profile rail, main, optional empty right **slot** — no production right-rail module/data.
- **FR-NS-04.2** Narrow/mobile: shell chrome (app bar / bottom nav) per M149 E + M159 **chrome-only**.
- **FR-NS-04.3** Main area may keep WIP from NS-01; feed stress panels = next-feed.
- **FR-NS-04.L10N** `nextShell.mobile.*` for chrome a11y; reuse `nextShell.header.menu*`.

## Routes / API
- [api-req §3.4](STORY-SPA-NS-api-requirements.md) — ✅ none · right-rail ❌ no API.

## Вне scope
- NodeContextRail production content; feed mobile stress body (M159 content) → next-feed.

## Тексты и переводы (en / et / ru)

### `nextShell.mobile.*`

| key | en | et | ru |
|-----|----|----|----|
| `nextShell.mobile.back` | Back | Tagasi | Назад |
| `nextShell.mobile.close` | Close | Sulge | Закрыть |
| `nextShell.mobile.navBoard` | Board | Tahvel | Доска |
| `nextShell.mobile.navProfile` | Profile | Profiil | Профиль |

## Acceptance Criteria
- [x] Grid matches layout SSOT with empty/omitted right-rail product module (Q16)
- [x] Mobile chrome-only AC; no feed stress body claim
- [x] Icons `/icons/next-shell/…` from catalog
- [x] No right-rail HTTP invent
