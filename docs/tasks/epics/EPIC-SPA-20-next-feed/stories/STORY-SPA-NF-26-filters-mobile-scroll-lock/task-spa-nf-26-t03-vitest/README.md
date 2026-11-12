# SPA-NF-26-T03 — Markers · Vitest · acceptance

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

FR-NF-26.4 · AC: Vitest markers for scroll + lock structure · soft Path A capture · OP eye Absent → gate **BLOCK** · no invent PASS · no invent filter keys.

## Code Facts (verify)

- AS-IS: `Filters.nf25.test.jsx` · soft NF-25 capture Present
- Target: nf26 vitest + markers · gate update · OP eye Absent → **BLOCK**

## Constraints

- Clean P1.3 · **NO BRIEF** · Partial=**BLOCK**  
- **no invent OP PASS** · no invent filter API keys

## AC / DoD

- [x] Vitest green for nf26 markers
- [x] Structure evidence · OP eye Absent → **BLOCK**
- [x] Visual Done not claimed

## Where changed

`Filters.nf26.test.jsx` · `scripts/tmp-nf26-capture.mjs` · gate · screenshots

## Verification

```bash
cd spa-app && npm test -- --run src/components/Filters/__tests__/
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/26-filters-mobile-scroll-lock.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave6-mobile-2026-10-25/02-filters-scroll-bottom-nav.png
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md
```
