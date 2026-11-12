# SPA-NF-22-T02 — CSS cursor pointer when enabled

**Status:** Done  
**Done:** `2026-10-22T14:14:42Z`  
**Note:** P3 · `.board-filter-reset` pointer when actionable · not-allowed when disabled  
**Story:** [`../STORY-SPA-NF-22-reset-filters-actionable.md`](../STORY-SPA-NF-22-reset-filters-actionable.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-22-reset-filters-actionable.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-22-reset-filters-actionable.md)  
**ui_scope:** `feed` / filters · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:08:08Z`  
**Package:** `pkg-000205`  
**Path A:** Interview F4 · ARCH-DELTA §10 · p13UxReady

## Purpose

FR-NF-22.2: Pointer cursor whenever Reset is actionable — not dead non-pointer gray when user can reset.

## Code Facts (verify)

- TO-BE: `.board-filter-reset.ds-btn:not(:disabled)` → `cursor: pointer` · disabled → `not-allowed`

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent new filter fields

## AC / DoD

- [x] Pointer when actionable Present
- [ ] Visual Done not claimed without OP eye

## Where changed

`Filters.css` · `ResetFiltersControl.jsx` class `board-filter-reset`

## Verification

```bash
rg -n "board-filter-reset|NF-22" spa-app/src/components/Filters/Filters.css
```
