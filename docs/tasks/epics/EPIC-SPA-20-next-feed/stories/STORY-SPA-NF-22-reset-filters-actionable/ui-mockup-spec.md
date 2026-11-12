# ui-mockup-spec — STORY-SPA-NF-22 (Path A)

> Path A · p13UxReady · no UX gen · P3 `2026-10-22T14:14:42Z` · **NO BRIEF**  
> Continuity: Interview **F4** · [ARCH-DELTA §10](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) Present · [wave3 evidence](../../../../analysis/evidence/op-residual-wave3-2026-10-22/)

## Target

- Interview **F4** — [INTERVIEW-NF-21-plus…](../../../../backlog-stories/next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md)
- Reset actionable when dirty and/or hasActiveFilters · pointer when actionable
- Code home: `ResetFiltersControl.jsx` · `FeedToolbar.jsx` · `Filters.css`

## Delta vs AS-IS

`disabled={!hasActiveFilters}` only → enablement = `isDirty || hasActiveFilters` · pointer when enabled · Vitest.

## Implemented (structure; OP eye still Absent)

- `board-filter-reset` · FeedToolbar/BoardToolbar `isDirty` · Filters.nf22 · Path A shots Present

## Partial

OP eye Absent → visual gate **BLOCK** · no invent OP PASS · no invent new filter fields.

## @mockup

```text
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md
@mockup: spa-app/src/components/Filters/ResetFiltersControl.jsx
@mockup: spa-app/src/features/feed/FeedToolbar.jsx
@mockup: spa-app/src/components/Filters/Filters.css
```
