# T02 ui-mockup-spec — M124 Session Shell State Sheet

- **Mockup SSOT:** [mockup-124-session-shell-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md)
- **PNG:** [mockup-124-session-shell-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.png)
- **ui_anchor:** true
- **Operator gate:** accepted at P3 execute (2026-06-28)

## Layout regions (§6)

| Region | Selector / component |
|--------|----------------------|
| Logo | `.app-shell__header .header-brand-logo` |
| Sidebar | `.app-shell__sidebar` |
| Main | `.app-shell__main` |
| Footer | `.app-shell__footer` |

## States A–E copy (verbatim from M124)

| State | Title | Primary CTA |
|-------|-------|-------------|
| A | Restoring Session | — |
| B | Sign In Required | Sign In |
| C | Session Expired | Sign In Again |
| D | DOGEstonia Services Temporarily Unavailable | Retry |
| E | Connection Problem | Retry |

## Implementation mapping

- `AppShell.jsx` — shell containers
- `SessionShellPanels.jsx` — state overlays A–E
- `data-session-shell-state` attribute on each panel
