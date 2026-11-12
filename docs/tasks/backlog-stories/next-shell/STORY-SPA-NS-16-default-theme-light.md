# STORY-SPA-NS-16 — Default theme light when unset

## Meta

- **Key:** `STORY-SPA-NS-16-default-theme-light`
- **Package:** [next-shell](INDEX.md)
- **Status:** P5 APPLY · T01–T02 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000221` · `activation: none` · Await P8 · soft [wave5 intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md)  
- **Interview:** [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M8**
- **Depends on:** `bootTheme.js` Present  
- **Code home:** `src/theme/bootTheme.js` · soft ThemeToggle tests  
- **L1.5:** [arch](../../../architecture/next-feed-vl/16-default-theme-light.md)

## L1 — FR

- **FR-NS-16.1** When `dogestonia.theme` unset (and no prior `data-theme`), default **`light`**.  
- **FR-NS-16.2** Stored `dark` / `light` still win · no OS prefers-color-scheme invent.  
- **FR-NS-16.3** Update Vitest (`bootTheme.test.js` expects dark today) · OP eye — no invent PASS.

## OOS

Brand PNG (NS-15) · account theme sync · invent OP PASS

## AC

- [x] Unset → light (structure)  
- [x] Stored dark held (structure)  
- [x] Vitest green · OP eye Absent → **BLOCK** (Partial visual)  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-16-t01-default` | Done | `applyDefaultTheme` → light | 16.1 · 16.2 |
| `task-spa-ns-16-t02-vitest` | Done | Flip default asserts | 16.3 |

### Order

`t01` → `t02` · skill `react-expert`
