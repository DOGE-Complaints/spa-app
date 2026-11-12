# UI mockup spec — STORY-SPA-NF-03 list | map toggle

**Path:** A (`@mockup` M151 · AskQuestion skipped · UX ready)  
**Anchor task:** `task-spa-nf-03-t01-list-map-toggle`  
**ui_anchor:** true · **ui_scope:** `feed`  
**Package:** `pkg-000105`  
**Human gate:** **принято** `2026-10-10T18:51:00Z` (Path A / `ui_gate: auto` · M151 accepted)

## Source mockups

```text
@mockup: spa-app/docs/UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md
@mockup-png: spa-app/docs/UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png
@register: spa-app/docs/tasks/backlog-stories/next-feed/NF-feed-mockup-intake-register.md row NF-M → NF-03
@api: spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-api-requirements.md §1.3
@icons: spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-icon-assets.md
```

## Target (NF-03 scope)

| State | Surface | UI |
|-------|---------|-----|
| SSR-M-list | `#/next/feed` | List selected; all received issues |
| SSR-M-map | Map selected, M≥1 | Pins for lat/lon-eligible only |
| SSR-M-partial | 0&lt;M&lt;N | Partial helper near map |
| SSR-M-ineligible | M=0 | Map disabled + helper; list intact |
| MAP-ERROR | map region fail | Unavailable + return to list; no invent tiles |

## Layout delta

- `FeedListMapToggle` + feed map region under `features/feed/`
- Reuse `BoardIssuesMap` / `issueGeo` with next-feed pin URL
- Icons: list-view / map-view / map-pin from catalog
- L10N: `nextFeed.map.*`
- DUI-Q14: no invent map/search HTTP; privacy ship gate = process honesty

## Forbidden

- Invent map tile/geocode/search HTTP
- Pins without finite lat+lon
- Shell chrome ownership
- Classic `#/board` as Done claim URL

## Baseline (UI-0)

`ui-baseline/pre-implement/01-next-feed-list-only-1536x1024.png`

## Verify (UI-3)

`ui-baseline/post-implement/` + story-root `screenshots/full-cycle/` · vitest · `test:ui:board-shell`
