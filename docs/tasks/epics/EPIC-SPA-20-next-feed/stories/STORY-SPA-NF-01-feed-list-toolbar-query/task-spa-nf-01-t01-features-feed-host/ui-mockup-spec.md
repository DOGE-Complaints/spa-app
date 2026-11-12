# UI mockup spec — STORY-SPA-NF-01 feed list + toolbar + query

**Path:** A (`@mockup` M149 · AskQuestion skipped · UX ready)  
**Anchor task:** `task-spa-nf-01-t01-features-feed-host`  
**ui_anchor:** true · **ui_scope:** `feed`  
**Package:** `pkg-000103`  
**Human gate:** **принято** `2026-10-10T17:46:08Z` (Path A / `ui_gate: auto` · M149 accepted)

## Source mockups

```text
@mockup: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md
@mockup-png: spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png
@register: spa-app/docs/tasks/backlog-stories/next-feed/NF-feed-mockup-intake-register.md row NF-F → NF-01
@api: spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-api-requirements.md §1
@icons: spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-icon-assets.md
```

## Target (NF-01 scope only — content panels)

| State | Route / surface | UI |
|-------|-----------------|-----|
| Loading | `#/next/feed` | Stable toolbar; card skeletons in feed region |
| Populated | `#/next/feed` | Ordered Issue cards (`status=PUBLISHED` list) |
| Empty | `#/next/feed` | Honest empty copy (`nextFeed.list.empty`) |
| Filtered empty | `#/next/feed` + structural filters | Zero-match + Clear filters |
| Error | feed region | Scoped error + Retry icon |
| Stale | feed region | Cached cards + stale label + Retry |
| Toolbar | feed main | Structural filters; **no** live text search (DUI-Q12 / `searchUnavailable`) |

## Layout delta (this story)

- New `spa-app/src/features/feed/**` · thin `NextFeedHostPage` orchestrator
- Shell chrome (Header / ProfileRail / AppShell) **OOS** — next-shell Done
- Public list always requests `status=PUBLISHED`
- REQ-56 `search` Ready on BE — FE live toolbar **hidden** until enable wave
- Icons: `/icons/next-feed/…` + next-shell `close` / `chevron-down` reuse

## Forbidden

- Own AppShell / Header / rails
- Invent SEARCH HTTP client beyond existing gateway options
- Classic `BoardPage` as claim URL for Done
- Early Signal discovery substitute for empty

## Baseline (UI-0)

`ui-baseline/pre-implement/01-next-feed-wip-host-1536x1024.png`

## Verify (UI-3)

`ui-baseline/post-implement/` + story-root `screenshots/full-cycle/` · vitest feed · `test:ui:board-shell`
