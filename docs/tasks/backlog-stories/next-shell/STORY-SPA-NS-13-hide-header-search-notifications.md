# STORY-SPA-NS-13 — Hide header search + notifications

## Meta

- **Key:** `STORY-SPA-NS-13-hide-header-search-notifications`
- **Package:** [next-shell](INDEX.md)
- **Status:** P8 closed · T01–T03 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000215` · `activation: none` · NO PUSH · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-13-hide-header-search-notifications/STORY-SPA-NS-13-hide-header-search-notifications.md) · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-13-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/13-hide-header-search-notifications.md)
- **Interview:** [INTERVIEW-NF-24-plus…](../next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **H7**
- **Evidence:** [07-header-search-notifications.png](../../../analysis/evidence/op-residual-wave4-2026-10-23/07-header-search-notifications.png)
- **Code home:** `Header.jsx` · soft Header.css

## L1 — FR

- **FR-NS-13.1** Search affordance **not visible** in public Header (gate flag / conditional — **do not delete** markup/handlers).  
- **FR-NS-13.2** Notifications chrome **not visible** same gate.  
- **FR-NS-13.3** Locale · theme · account controls held.  
- **FR-NS-13.4** Vitest · OP eye — no invent PASS · no invent search API.

## OOS

Brand PNG (NS-14) · invent notification center

## AC

- [x] Search hidden · code retained  
- [x] Notifications hidden · code retained  
- [x] Locale/theme/account Present  
- [x] Vitest · OP eye (structure Present · visual **BLOCK** until OP)  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-13-t01-flag` | Done | Feature gate hide search+notifications | 13.1 · 13.2 |
| `task-spa-ns-13-t02-a11y` | Done | No focusable hidden controls | 13.1 · 13.2 |
| `task-spa-ns-13-t03-vitest` | Done | Markers · peers held | 13.3 · 13.4 |

### Order

`t01` → `t02` → `t03` · skill `react-expert`
