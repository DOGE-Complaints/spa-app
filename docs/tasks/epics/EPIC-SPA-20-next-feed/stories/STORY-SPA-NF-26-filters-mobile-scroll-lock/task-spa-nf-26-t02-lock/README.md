# SPA-NF-26-T02 — Body scroll lock on open/close

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

FR-NF-26.2: While sheet open — lock background document scroll (body/overflow) · optional `touch-action` honesty; restore on close.

## Code Facts (verify)

- AS-IS: Filter open/close Present · body scroll-lock / touch-action Partial (Interview probe 2)
- Target: document scroll lock while open · restore on close · no invent filter keys

## Constraints

- Clean P1.3 · **NO BRIEF** · Partial=**BLOCK**  
- **no invent OP PASS** · no invent filter API keys · burger OOS · invent custom calendar OOS

## AC / DoD

- [x] Background scroll locked while sheet open
- [x] Lock cleared on close
- [x] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where changed

`FilterPanel.jsx` (`useEffect` body overflow + touch-action)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "overflow|touch-action|scroll.?lock|document\.body" spa-app/src/components/Filters/ -g '*.jsx' -g '*.css' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/26-filters-mobile-scroll-lock.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave6-mobile-2026-10-25/02-filters-scroll-bottom-nav.png
```
