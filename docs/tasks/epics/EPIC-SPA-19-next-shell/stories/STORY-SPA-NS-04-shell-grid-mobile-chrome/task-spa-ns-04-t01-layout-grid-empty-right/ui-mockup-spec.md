# UI mockup spec — STORY-SPA-NS-04 shell grid + mobile chrome

**Path:** A (`@mockup` layout SSOT + M149 E / M159 chrome-only — AskQuestion skipped · overnight auto-approved)  
**Anchor task:** `task-spa-ns-04-t01-layout-grid-empty-right`  
**ui_anchor:** true  
**Package:** `pkg-000100`  
**extends mockup:** layout spec + M149 §5 E `SHELL-MOBILE` · M159 chrome-only · Component §9 MobileAppBar · §11 MobileBottomNav · DUI-Q16  
**Human gate:** **принято** `2026-10-09T16:24:04Z` (overnight / ready mockups · `ui_gate: auto`)

## Source mockups

```text
@mockup: spa-app/docs/UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md
@mockup-png: spa-app/docs/UX/next/feed/DOGEstonia-dashboard-layout-artboard-v1.0.png
@mockup-mobile: spa-app/docs/UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md
@mockup-m149: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md §5 E
@component: spa-app/docs/UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md §9 MobileAppBar · §11 MobileBottomNav · §12 omit product
@dui: spa-app/docs/UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md Q16
@icons: spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md
```

## Target (NS-04 scope only)

| State | Route / surface | UI |
|-------|-----------------|-----|
| Desktop grid | `#/next/feed*` | header + ProfileRail + main + **empty** right slot (Q16 · no NodeContextRail data) |
| Tablet | mid widths | right slot may collapse; left rail retained where layout allows |
| Mobile chrome | ≤767 px next-feed | `MobileAppBar` + `MobileBottomNav` · no feed stress body |
| Icons | mobile slots | `/icons/next-shell/…` back/close/menu/board/profile |
| L10N | a11y | `nextShell.mobile.*` |
| Classic shelter | `#/board` | unchanged PH-09 / no next-shell grid |
| Feed body | main | OOS → next-feed · keep NS-01 WIP |

## Layout delta (this story)

- AppShell optional empty `rightSlot` on next-shell desktop only.
- MobileAppBar + MobileBottomNav chrome-only on next-feed narrow.
- L10N `nextShell.mobile.*`.
- **Forbidden:** NodeContextRail product, BoardFeed, feed stress panels, new SVG, right-rail HTTP, flip `/` (NS-06).

## Baseline (UI-0)

`ui-baseline/pre-implement/01-next-feed-grid-as-is.png` · `02-next-feed-narrow-as-is.png`

## Verify (UI-3)

`ui-baseline/post-implement/` desktop grid + empty right · mobile chrome · vitest · `test:ui:board-shell` · live Backend UP.
