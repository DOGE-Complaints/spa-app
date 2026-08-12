# UI baseline — FilterPanel (retroactive closure)

**Mode:** `retroactive_closure` — baseline captured from current implementation after SEARCH-02 code merge (inline toolbar no longer available).

| Field | Value |
|-------|-------|
| Route | `/#/board` |
| Viewport (desktop) | `1536×1024` |
| Viewport (narrow) | `390×844` |
| Env | `FAKE-OLD` (default `npm run dev`) |
| Capture tool | `npm run test:ui:filters` (Puppeteer) |
| Date | 2026-06-17 |

## Files

| File | State |
|------|-------|
| `01-board-default.png` | Panel closed, default filters |
| `02-panel-open.png` | Panel expanded, no applied filters |
| `post-implement/01-board-applied-filters.png` | After status Apply + chips |
| `post-implement/02-narrow-drawer.png` | Narrow viewport, panel open |

## Selectors verified

- `.board-filter-panel-toggle`
- `.board-filter-panel-body`
- `.board-filter-apply`
- `.board-active-filter-chips`
- `.board-toolbar .board-filter-reset`

## Target spec

- [`ui-mockup-spec.md`](../ui-mockup-spec.md)
- [`mockup-10-dashboard-filter-status-spec.md`](../../../../../../UX/mockups/mockup-10-dashboard-filter-status-spec.md)
- [`mockup-13-dashboard-filter-reset-spec.md`](../../../../../../UX/mockups/mockup-13-dashboard-filter-reset-spec.md)
