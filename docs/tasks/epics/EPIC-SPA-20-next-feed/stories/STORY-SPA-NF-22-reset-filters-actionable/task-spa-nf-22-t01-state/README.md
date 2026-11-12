# SPA-NF-22-T01 — Wire dirty∨active enablement

**Status:** Done  
**Done:** `2026-10-22T14:14:42Z`  
**Note:** P3 structure Pass · gate BLOCK · Path A fails:[] · dirty∨active wired  
**Story:** [`../STORY-SPA-NF-22-reset-filters-actionable.md`](../STORY-SPA-NF-22-reset-filters-actionable.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-22-reset-filters-actionable.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-22-reset-filters-actionable.md)  
**ui_scope:** `feed` / filters · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:08:08Z`  
**Package:** `pkg-000205`  
**Path A:** Interview F4 · ARCH-DELTA §10 · p13UxReady

## Purpose

FR-NF-22.1 · 22.3: Enable Reset when `isDirty || hasActiveFilters`. Disabled only when neither. Reset clears applied filters **and** pending panel dirty. Wire toolbar + panel footer.

## Code Facts (verify)

- AS-IS: `disabled={!hasActiveFilters}` only
- TO-BE: `actionable = isDirty || hasActiveFilters` · FeedToolbar + BoardToolbar pass `isDirty`

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent new filter fields · NF-21 / NF-23 OOS

## AC / DoD

- [x] Enabled when dirty and/or active
- [x] Disabled only when nothing to reset
- [x] Reset clears applied + pending dirty (hook Present)
- [ ] Visual Done not claimed without OP eye

## Where changed

`ResetFiltersControl.jsx` · `FeedToolbar.jsx` · `BoardToolbar.jsx`

## Verification

```bash
rg -n "isDirty|actionable|board-filter-reset" spa-app/src/components/Filters/ResetFiltersControl.jsx spa-app/src/features/feed/FeedToolbar.jsx
```
