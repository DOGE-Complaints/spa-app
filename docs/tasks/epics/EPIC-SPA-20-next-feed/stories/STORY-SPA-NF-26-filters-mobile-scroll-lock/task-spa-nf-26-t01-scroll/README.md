# SPA-NF-26-T01 — Panel body overflow / height

**Status:** Done · gate **BLOCK** (OP eye Absent)  
**Done:** `2026-10-25T10:46:31Z`  
**Story:** [`../STORY-SPA-NF-26-filters-mobile-scroll-lock.md`](../STORY-SPA-NF-26-filters-mobile-scroll-lock.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-26-filters-mobile-scroll-lock.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-26-filters-mobile-scroll-lock.md)  
**ui_scope:** next-feed / Filters · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-25T10:41:41Z`  
**Package:** `pkg-000233`  
**Path A:** evidence PNG · NF-25 M175 held · Interview M2

## Purpose

FR-NF-26.1: On mobile, filter sheet body scrolls through all rows (Type…Country · dates · actions reachable).

## Code Facts (verify)

- AS-IS: `src/components/Filters/FilterPanel.jsx` · `Filters.css` · NF-25 soft `overflow-y: auto` Present
- Target: panel body overflow / height so all rows reachable · hold M175 layout · no invent filter keys

## Constraints

- Clean P1.3 · **NO BRIEF** · Partial=**BLOCK**  
- **no invent OP PASS** · no invent filter API keys · burger OOS · invent custom calendar OOS

## AC / DoD

- [x] Sheet body scrolls on mobile · all rows reachable
- [x] NF-25 M175 width/rows/dates held
- [x] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where changed

`FilterPanel.jsx` · `Filters.css` · scroll region · mobile bottom clear of nav

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "overflow|max-height|filter-panel|FilterPanel" spa-app/src/components/Filters/ -g '*.jsx' -g '*.css' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/26-filters-mobile-scroll-lock.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave6-mobile-2026-10-25/02-filters-scroll-bottom-nav.png
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md
```
