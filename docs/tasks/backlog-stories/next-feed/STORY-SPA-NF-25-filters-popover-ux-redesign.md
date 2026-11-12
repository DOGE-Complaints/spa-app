# STORY-SPA-NF-25 — Filters popover UX redesign

## Meta

- **Key:** `STORY-SPA-NF-25-filters-popover-ux-redesign`
- **Package:** [next-feed](INDEX.md)
- **Status:** **BLOCKED** (OP eye) · P8 local close · T01–T04 **Done** · gate **BLOCK** · `pkg-000229` · SHAs feat `bf0b74f` · test `b0a06f3` · docs `83d45e8` · Partial visual=**BLOCK** · no invent OP PASS · [disposition](../../run-reports/p5-disposition-STORY-SPA-NF-25-2026-10-24.md) · [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-25-filters-popover-ux-redesign/STORY-SPA-NF-25-filters-popover-ux-redesign.md)
- **Interview:** [INTERVIEW-NF-25-plus…](INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M13**
- **UX tip:** [M175](../../../UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md) · [intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave5-filters-redesign-2026-10-24.md)
- **Depends on:** NF-21/22 structure Present · SEARCH-02 shell  
- **Code home:** `Filters` · `LocalizedDateInput` · Filters.css  
- **L1.5:** [arch](../../../architecture/next-feed-vl/25-filters-popover-ux-redesign.md)

## L1 — FR

- **FR-NF-25.1** Filters popover usable width · clear label/value rows · no severe truncation (M175).  
- **FR-NF-25.2** Date from/to look **active** (not disabled) while keeping native picker + NF-21 theme color-scheme.  
- **FR-NF-25.3** Apply / Reset hierarchy clear (NF-22 Reset held).  
- **FR-NF-25.4** Vitest · OP eye — no invent PASS · no invent filter API keys.

## OOS

Map theme · invent gateway filters

## AC

- [x] UX tip cited / intake PASS (M175)  
- [x] Width + date affordance structure (Apply) — structure · visual **BLOCK**  
- [x] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-nf-25-t01-ux` | **Done** | Intake M175 PASS | 25.4 |
| `task-spa-nf-25-t02-layout` | Done · BLOCK | Popover width + rows + date look | 25.1 · 25.2 |
| `task-spa-nf-25-t03-actions` | Done · BLOCK | Apply/Reset hierarchy | 25.3 |
| `task-spa-nf-25-t04-vitest` | Done · BLOCK | Markers | 25.4 |

### Order

UX intake **Done** → `t02` → `t03` → `t04` · skill `react-expert`
