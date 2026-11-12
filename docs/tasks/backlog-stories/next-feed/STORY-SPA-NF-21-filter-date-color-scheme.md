# STORY-SPA-NF-21 — Filter date color-scheme follows theme

## Meta

- **Key:** `STORY-SPA-NF-21-filter-date-color-scheme`
- **Package:** [next-feed](INDEX.md)
- **Status:** P8 local close · T01–T02 **Done** · structure **Present** · visual **BLOCKED** (OP eye) OK · gate **BLOCK** · `pkg-000204` closed · `activation: none` · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-21-filter-date-color-scheme/STORY-SPA-NF-21-filter-date-color-scheme.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-21-2026-10-22.md)
- **Interview:** [INTERVIEW-NF-21-plus…](INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **F3**
- **L1.5:** [ARCH-DELTA…](ARCH-DELTA-live-civic-residual-2026-10-21.md) §9
- **Code home:** `Filters.css` · `LocalizedDateInput.jsx`

## L1 — FR

- **FR-NF-21.1** Native date picker chrome follows `data-theme` (light→light, dark→dark).  
- **FR-NF-21.2** Remove hardcoded `color-scheme: dark` on `.board-filter-date-native` as sole rule.  
- **FR-NF-21.3** Vitest / CSS markers · OP eye — no invent PASS.

## OOS

Reset Filters (NF-22) · invent custom calendar widget

## AC

- [x] Light theme calendar light (structure)  
- [x] Dark theme calendar dark (structure)  
- [x] Vitest · Path A (structure)  
- [ ] OP eye — Absent → gate **BLOCK**

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-nf-21-t01-scheme` | **Done** | Theme-bound color-scheme | 21.1 · 21.2 |
| `task-spa-nf-21-t02-vitest` | **Done** | CSS assert | 21.3 |

### Order

`t01` → `t02` · skill `react-expert`
