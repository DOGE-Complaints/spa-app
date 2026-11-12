# NF-23 inventory — board-only vs shared (T01)

> P3 `2026-10-22T14:26:15Z` · `pkg-000206` · **no mass-delete** this package  
> Cite: [analysis-next-feed-board-deprecate-architecture-2026-10-22.md](../../../../../../analysis/analysis-next-feed-board-deprecate-architecture-2026-10-22.md)

## Shared (keep — next-feed importers Present)

| Module | Fact |
|--------|------|
| `router/boardQuery.js` · `boardFilterState.js` | Used by `NextFeedHostPage` + classic BoardPage |
| `hooks/useBoardFilterDraft.js` | Next feed passes `pathname: FEED_PATH` |
| `components/Filters/*` | FeedToolbar / BoardToolbar |
| `components/map/BoardIssuesMap.jsx` | Shared map |
| `features/feed/board/*` chrome | Naming debt — next-feed owns presentation |

## Classic board-primary (do not purge this pkg)

| Module | Fact |
|--------|------|
| `pages/BoardPage.jsx` | Was App route host · zero next-feed import · **redirect retires route** · file held |
| `features/board/*` (BoardToolbar, BoardFeedArea, …) | BoardPage importers · soft early-signal |
| Classic `components/threads/*` Live mounts | Dual stack vs thread-mount — cutover CT-28 · not NF-23 purge |

## Soft CTA surfaces (T03 retarget)

Header `public-nav-dashboard` · HowItWorks dashboard CTAs · PublicFooter brand · soft AppShell `app-shell-nav-board`

## Spaghetti risks (documented, not fixed)

1. `board*` names under `features/feed/board/` used by next-feed  
2. Dual thread stacks (classic vs thread-mount)  
3. Tests still MemoryRouter `/board` for shell chrome — OK for unit isolation  

## Purge gate

Delete only after a later package proves **zero** importers. This story: inventory Present · redirect · CTAs · Vitest · **no** mass-delete.
