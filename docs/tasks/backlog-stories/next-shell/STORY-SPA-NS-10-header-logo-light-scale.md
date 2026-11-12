# STORY-SPA-NS-10 — Header logo light surface + scale (vector)

## Meta

- **Key:** `STORY-SPA-NS-10-header-logo-light-scale`
- **Package:** [next-shell](INDEX.md)
- **Status:** P8 local close · T01–T04 **Done** · structure **Present** · visual **BLOCKED** (OP eye) OK · gate **BLOCK** · `pkg-000203` closed · `activation: none` · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-10-header-logo-light-scale/STORY-SPA-NS-10-header-logo-light-scale.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-NS-10-2026-10-22.md)
- **Interview:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **H8**
- **UX tip:** [M165](../../../UX/mockups/home/DOGEstonia-M165-header-brand-logo-light-spec-v1.0.md) · [intake](../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave3-header-logo-light-2026-10-22.md)
- **Code home:** `Header.jsx` · `Header.css` · `public/assets/` brand

## L1 — FR

- **FR-NS-10.1** Light theme: brand on light/transparent chrome — **no** dark rectangular plate.  
- **FR-NS-10.2** Visible brand band ~**44 CSS px** (M165 proposal within 40–48) measured on artwork, not padded canvas.  
- **FR-NS-10.3** Prefer **SVG vector** horizontal brand (OP) — not PNG dark-backed master as light UI source; prepare/promote real SVG (placeholder `DOGEstonia-logo-fallback.svg` ≠ production dog+wordmark).  
- **FR-NS-10.4** Dark theme: same geometry · readable light DOGE + orange stonia on continuous dark header (no inset dark tile).  
- **FR-NS-10.5** Brand home → `/next/feed` · Vitest / Path A · OP eye — no invent PASS · no invent mascot · no crop artboard PNG as master.

## OOS

Footer logo (PH-11) · invent new dog style · invent CDN

## AC

- [x] M165 + intake cited (structure)
- [x] Light surface · no dark plate (structure)
- [x] Scale tip · **vector** preferred (structure)
- [x] Dark held · Vitest · Path A (structure)
- [ ] OP eye — Absent → gate **BLOCK**

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-10-t01-asset` | **Done** | Promote/prepare SVG horizontal brand · wire Header | 10.1 · 10.3 |
| `task-spa-ns-10-t02-scale` | **Done** | ~44px visible band CSS | 10.2 |
| `task-spa-ns-10-t03-dark` | **Done** | Dark ink / continuous surface | 10.4 |
| `task-spa-ns-10-t04-vitest` | **Done** | Markers · home href | 10.5 |

### Order

Intake PASS → t01 → t02 → t03 → t04
