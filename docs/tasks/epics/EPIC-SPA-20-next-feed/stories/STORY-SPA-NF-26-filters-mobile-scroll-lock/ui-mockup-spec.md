# ui-mockup-spec — STORY-SPA-NF-26 (clean P1.3 · no UX tip)

> Clean P1.3 · **no UX tip gate** · **NO BRIEF** · no UX gen · P1.3 `2026-10-25T10:41:41Z`  
> Continuity: Interview **M2** · [26-filters-mobile-scroll-lock](../../../../../architecture/next-feed-vl/26-filters-mobile-scroll-lock.md) · evidence PNG · NF-25 [M175](../../../../../UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md) **held**

## Target

- Mobile filter sheet body scrolls all rows (Type…Country · dates · actions reachable)
- While open: lock background document scroll · optional `touch-action`
- Hold NF-25 layout/width/date affordance · no invent filter keys
- Vitest · OP eye — no invent PASS

## Delta vs AS-IS

NF-25 `overflow-y: auto` soft Present · body scroll-lock / touch-action Partial (Interview probe 2) → CSS/code scroll + lock only.

## Partial

OP eye Absent → visual gate **BLOCK** · invent filter keys OOS · invent custom calendar OOS · burger (NS-17) OOS.

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/26-filters-mobile-scroll-lock.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave6-mobile-2026-10-25/02-filters-scroll-bottom-nav.png
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md
```
