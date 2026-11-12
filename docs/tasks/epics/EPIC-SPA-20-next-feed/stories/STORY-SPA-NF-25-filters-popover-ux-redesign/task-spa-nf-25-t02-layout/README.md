# SPA-NF-25-T02 — Popover width + rows + date look

**Status:** Done · gate **BLOCK** (OP eye Absent)  
**Done:** `2026-10-24T11:24:31Z`  


**Story:** [`../STORY-SPA-NF-25-filters-popover-ux-redesign.md`](../STORY-SPA-NF-25-filters-popover-ux-redesign.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-25-filters-popover-ux-redesign.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-25-filters-popover-ux-redesign.md)  
**ui_scope:** feed / Filters popover · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T11:13:33Z`  
**Package:** `pkg-000229`  
**Path A:** M175 · Interview M13 · soft NF-21

## Purpose

FR-NF-25.1 / 25.2: Usable popover width · clear label/value rows · no severe truncation · date from/to look **active** while keeping native picker + NF-21 theme `color-scheme`.

## Code Facts (verify)

- AS-IS: `src/components/Filters/` · `FilterPanel.jsx` · `Filters.css` · `LocalizedDateInput.jsx` · `DateRangeFilter.jsx` · soft NF-21 Present
- Target: M175 presentation — wider usable panel · active-looking dates · no invent filter API keys

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · no invent filter API keys · Map theme OOS · invent gateway filters OOS · keep native date picker

## AC / DoD

- [x] Width + clear rows · no severe truncation
- [x] Dates look active · NF-21 color-scheme held
- [x] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where changed

`Filters.css` · `FilterPanel.jsx` · `LocalizedDateInput.jsx` · `DateRangeFilter.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "min-width|color-scheme|LocalizedDate|filter-panel" spa-app/src/components/Filters/ -g '*.jsx' -g '*.css' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/25-filters-popover-ux-redesign.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md
```
