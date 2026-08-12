# Composition audit — STORY-SPA-PH-08 (T01)

> **UTC:** 2026-08-09T07:43:48Z · P3 T01  
> **OOS:** sidebar / `PUBLIC_SHELL_SHOW_SIDEBAR` (PH-09) — do not change.

## Nesting stack (verified)

| Layer | Evidence |
|-------|----------|
| 1. `.board-shell` | [`HowItWorksPage.jsx`](../../../../../../../src/pages/HowItWorksPage.jsx) L43 |
| 2. `AppShell` body | `.app-shell__body.board-main` (+ `.board-main--no-sidebar` when PH-09 constant false) · [`AppShell.jsx`](../../../../../../../src/components/AppShell/AppShell.jsx) |
| 3. `section.app-shell__main.board-workspace` | AppShell children slot · panel padding in [`index.css`](../../../../../../../src/index.css) `.board-workspace` |
| 4. `.how-it-works` | max-width 760 column · [`HowItWorksPage.css`](../../../../../../../src/pages/HowItWorksPage.css) L2–7 |
| 5. `.how-it-works-step` | **primary card look** — `border` + `border-radius: 14px` + `background: var(--color-bg-secondary)` · CSS L45–50 |

Secondary nested frames: `.how-it-works-privacy` / `.how-it-works-warning` (inner bordered notes) — keep (content callouts, not page chrome).

## M133 target (Path A)

SSOT: [`mockup-133-public-how-it-works-page-state-sheet-spec.md`](../../../../../../../docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md)

- Header → intro → 4 steps → CTA → PublicFooter
- **Do not** use four equal marketing cards
- Steps: numbered vertical progression; thin borders acceptable as separators, not boxed utility cards in a panel

## Recommended change seams (T02)

1. **Primary:** weaken `.how-it-works-step` — remove filled secondary “card” surface; use hairline/separator or padding-only steps so page reads as continuous tutorial, not widgets in a panel.
2. **Optional:** HIW-scoped override so `.board-workspace` does not read as an inset utility tray (e.g. page class on shell/workspace when HIW mounts) — only if needed after step-card change; prefer page-local CSS over global `index.css`.
3. **Keep:** Header, PublicFooter, 4 STEPS markup, CTA row, i18n keys, `showSidebar={PUBLIC_SHELL_SHOW_SIDEBAR}`.

## Explicit OOS (FR-PH-08.5)

- Do not flip `PUBLIC_SHELL_SHOW_SIDEBAR`
- Do not hard-delete `Sidebar` / change cabinet shell
