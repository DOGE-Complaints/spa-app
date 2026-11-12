# SPA-NF-25-T03 — Apply/Reset hierarchy

**Status:** Done · gate **BLOCK** (OP eye Absent)  
**Done:** `2026-10-24T11:24:31Z`  


**Story:** [`../STORY-SPA-NF-25-filters-popover-ux-redesign.md`](../STORY-SPA-NF-25-filters-popover-ux-redesign.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-25-filters-popover-ux-redesign.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-25-filters-popover-ux-redesign.md)  
**ui_scope:** feed / Filters popover · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T11:13:33Z`  
**Package:** `pkg-000229`  
**Path A:** M175 · Interview M13 · soft NF-22

## Purpose

FR-NF-25.3: Apply / Reset hierarchy clear — secondary Reset left · primary Apply right (M175) · NF-22 Reset actionable held (no regress dirty∨active).

## Code Facts (verify)

- AS-IS: `ResetFiltersControl` · FilterPanel footer · NF-22 Present
- Target: visual hierarchy only · do not invent new Reset/Apply semantics or filter API keys

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · NF-22 semantics held · no invent filter API · Map theme OOS

## AC / DoD

- [x] Apply primary · Reset secondary hierarchy Present
- [x] NF-22 Reset held
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedToolbar.jsx` · `BoardToolbar.jsx` · `Filters.css` footer · `board-filter-apply`

## Verification

```bash
rg -n "ResetFilters|Apply|filter.*footer|board-filter" spa-app/src/components/Filters/ spa-app/src/features/feed/FeedToolbar.jsx | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/25-filters-popover-ux-redesign.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md
```
