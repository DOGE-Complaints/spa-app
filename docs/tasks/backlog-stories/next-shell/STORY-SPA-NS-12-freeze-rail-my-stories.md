# STORY-SPA-NS-12 — Freeze My stories in ProfileRail

## Meta

- **Key:** `STORY-SPA-NS-12-freeze-rail-my-stories`
- **Package:** [next-shell](INDEX.md)
- **Status:** P8 local close · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000214` closed · `activation: none` · NO PUSH · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-12-freeze-rail-my-stories/STORY-SPA-NS-12-freeze-rail-my-stories.md) · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-12-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/12-freeze-rail-my-stories.md)
- **Interview:** [INTERVIEW-NF-24-plus…](../next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **R4**
- **Code home:** `ProfileRail.jsx` · soft MobileBottomNav · i18n

## L1 — FR

- **FR-NS-12.1** ProfileRail does **not** show **My stories** nav item (gate/hide — keep code for later unfreeze).  
- **FR-NS-12.2** Remaining nav: Feed · Profile (held).  
- **FR-NS-12.3** Soft mobile: no My stories affordance if present.  
- **FR-NS-12.4** Vitest · OP eye — no invent PASS · no invent story list in rail.

## OOS

CAB-08 story HTTP · invent activity API in rail

## AC

- [ ] My stories Absent from rail UI  
- [ ] Feed + Profile held  
- [ ] Vitest · OP eye  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-12-t01-gate` | Done | Hide/gate My stories NavLink | 12.1 |
| `task-spa-ns-12-t02-mobile` | Done | Soft mobile parity | 12.3 |
| `task-spa-ns-12-t03-vitest` | Done | Update NS-03/09 tests | 12.4 |

### Order

`t01` → `t02` → `t03` · skill `react-expert`
