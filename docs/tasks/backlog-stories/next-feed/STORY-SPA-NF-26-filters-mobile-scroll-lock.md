# STORY-SPA-NF-26 — Filters mobile scroll + body lock

## Meta

- **Key:** `STORY-SPA-NF-26-filters-mobile-scroll-lock`
- **Package:** [next-feed](INDEX.md)
- **Status:** P8 local close · T01–T03 **Done·BLOCK** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000233` · **activation: none** · SHAs feat `60878ef` · test `e9a07b5` · docs `09cd217` · NO PUSH · CSS/code · NO BRIEF · evidence PNG Present · NF-25 M175 held · Partial visual=**BLOCK** · no invent PASS · no invent filter keys · [disposition](../../run-reports/p5-disposition-STORY-SPA-NF-26-2026-10-25.md) · [p7](../../../analysis/reaudit-STORY-SPA-NF-26-p7-2026-10-25.md) · [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-26-filters-mobile-scroll-lock/STORY-SPA-NF-26-filters-mobile-scroll-lock.md)
- **Interview:** [INTERVIEW-NF-26-plus…](INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md) **M2**
- **Depends on:** NF-25 M175 panel Present  
- **Code home:** `FilterPanel.jsx` · `Filters.css`  
- **L1.5:** [arch](../../../architecture/next-feed-vl/26-filters-mobile-scroll-lock.md)
- **Evidence:** [02…](../../../analysis/evidence/op-residual-wave6-mobile-2026-10-25/02-filters-scroll-bottom-nav.png)

## L1 — FR

- **FR-NF-26.1** On mobile, filter sheet body scrolls through all rows (Type…Country · dates · actions reachable).  
- **FR-NF-26.2** While sheet open: lock background document scroll (body/overflow) · optional `touch-action` honesty.  
- **FR-NF-26.3** NF-25 layout/width/date affordance held · no invent filter keys.  
- **FR-NF-26.4** Vitest · OP eye — no invent PASS.

## OOS

Mobile burger (NS-17) · invent custom calendar

## AC

- [ ] Sheet body scrolls on mobile  
- [ ] Background scroll locked while open  
- [ ] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-nf-26-t01-scroll` | Await | Panel body overflow / height fix | 26.1 |
| `task-spa-nf-26-t02-lock` | Await | Body scroll lock on open/close | 26.2 |
| `task-spa-nf-26-t03-vitest` | Await | Markers | 26.4 |

### Order

`t01` → `t02` → `t03` · skill `react-expert`
