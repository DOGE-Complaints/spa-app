# SPA-NF-25-T04 — Markers · Vitest · OP eye

**Status:** Done · gate **BLOCK** (OP eye Absent)  
**Done:** `2026-10-24T11:24:31Z`  


**Story:** [`../STORY-SPA-NF-25-filters-popover-ux-redesign.md`](../STORY-SPA-NF-25-filters-popover-ux-redesign.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-25-filters-popover-ux-redesign.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-25-filters-popover-ux-redesign.md)  
**ui_scope:** feed / Filters popover · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T11:13:33Z`  
**Package:** `pkg-000229`  
**Path A:** M175 · Interview M13

## Purpose

FR-NF-25.4: Vitest markers for width/date/actions structure · Path A capture soft · OP eye — no invent PASS · no invent filter API keys.

## Code Facts (verify)

- AS-IS: `Filters.nf22.test.jsx` · soft NF-21 tests Present
- Target: nf25 vitest + Path A capture · lab markers · OP eye Absent → gate **BLOCK**

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · no invent filter API keys

## AC / DoD

- [x] Vitest green for nf25 markers
- [x] Path A structure evidence · OP eye Absent → **BLOCK**
- [x] Visual Done not claimed

## Where changed

`Filters.nf25.test.jsx` · `scripts/tmp-nf25-capture.mjs` · soft `tests/puppeteer/filters-and-query-state-smoke.mjs` (NF-23 host)

## Verification

```bash
cd spa-app && npm test -- --run src/components/Filters/__tests__/
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/25-filters-popover-ux-redesign.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md
```
