# STORY-SPA-NF-22 — Reset Filters actionable + cursor

## Meta

- **Key:** `STORY-SPA-NF-22-reset-filters-actionable`
- **Package:** [next-feed](INDEX.md)
- **Status:** P8 local close · T01–T03 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000205` · tip · `activation: none` · `2026-10-22T14:20:42Z`
- **Pipeline:** [STORY-SPA-NF-22-reset-filters-actionable](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-22-reset-filters-actionable/STORY-SPA-NF-22-reset-filters-actionable.md)
- **Interview:** [INTERVIEW-NF-21-plus…](INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **F4**
- **L1.5:** ARCH-DELTA §10
- **Code home:** `ResetFiltersControl.jsx` · `FeedToolbar.jsx` · filter state hooks

## L1 — FR

- **FR-NF-22.1** Reset clears applied filters **and** pending panel dirty state when actionable.  
- **FR-NF-22.2** Control shows **pointer** whenever actionable (dirty and/or hasActiveFilters) — not dead non-pointer gray when user can reset.  
- **FR-NF-22.3** Disabled only when nothing to reset.  
- **FR-NF-22.4** Vitest · OP eye — no invent PASS.

## OOS

Date color-scheme (NF-21) · invent new filter fields

## AC

- [x] Reset works from toolbar + panel footer (structure)  
- [x] Pointer when actionable (structure)  
- [x] Vitest · Path A  
- [ ] OP eye — Absent → gate **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-nf-22-t01-state` | **Done** | Wire dirty∨active enablement | 22.1 · 22.3 |
| `task-spa-nf-22-t02-cursor` | **Done** | CSS cursor pointer when enabled | 22.2 |
| `task-spa-nf-22-t03-vitest` | **Done** | Behavior tests | 22.4 |

### Order

`t01` → `t02` → `t03` · skill `react-expert`
