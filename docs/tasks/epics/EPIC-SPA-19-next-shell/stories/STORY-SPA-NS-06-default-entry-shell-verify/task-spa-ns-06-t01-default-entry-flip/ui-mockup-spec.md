# UI mockup spec — STORY-SPA-NS-06 default entry + shell verify

**Path:** A (`@mockup` Arch 03 verify/shelter — AskQuestion skipped · UX ready)  
**Anchor task:** `task-spa-ns-06-t01-default-entry-flip`  
**ui_anchor:** true · **ui_scope:** `shell`  
**Package:** `pkg-000102`  
**Human gate:** **принято** `2026-10-09T17:50:50Z` (overnight / UX ready · `ui_gate: auto`)

## Source mockups

```text
@mockup: spa-app/docs/architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md
@register: spa-app/docs/tasks/backlog-stories/next-shell/NS-shell-mockup-intake-register.md row _(verify)_ → NS-06
@shell-reuse: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md
@icons: spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md
@brief: spa-app/docs/tasks/backlog-stories/next-shell/PRODUCT-BRIEF.md verify lock
```

## Target (NS-06 scope only)

| State | Route / surface | UI |
|-------|-----------------|-----|
| Default entry | `/` | Navigate → `#/next/feed` |
| Catch-all | `*` | Navigate → `#/next/feed` |
| Product home | `#/next/feed` | next-shell chrome + WIP host (no BoardFeed invent) |
| Classic shelter | `#/board`, `#/issue/:id` | still reachable · next-shell chrome (NS-05) · not product home |
| Icons / logo | runtime | `/icons/next-shell/…` + logo 404-free |

## Layout delta (this story)

- `App.jsx`: `/` and `*` → `/next/feed` (was `/board`)
- `spa-url-page-map.md`: next shell + home flip documented
- Vitest + `test:ui:board-shell` repaired for NS-05 chrome on classic board
- **Forbidden:** BoardFeed invent · retire classic permanently · full feed E2E claim · new SVG masters

## Baseline (UI-0)

`ui-baseline/pre-implement/` — home previously landed on classic board (NS-05 shelter PNG archive)

## Verify (UI-3)

`ui-baseline/post-implement/` + story-root `screenshots/full-cycle/` · vitest ns06 · board-shell · live Backend UP.
