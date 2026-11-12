# STORY-SPA-CR-27 — List feed hydrate own reactions on page load

## Meta

- **Key:** `STORY-SPA-CR-27-list-own-reactions-hydrate`
- **Package:** [component-reactions](INDEX.md) · soft [next-feed](../next-feed/INDEX.md)
- **Status:** P8 local close · T01–T03 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000225` · `activation: none` · TASKED=**0** · Partial visual=**BLOCK** · no invent OP PASS / gateway schema · soft [wave5 intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-CR-27-2026-10-24.md) · [p7](../../../analysis/reaudit-STORY-SPA-CR-27-p7-2026-10-24.md)  

- **Interview:** [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M10**
- **Depends on:** CR-25 detail hydrate Present · `FeedListArea` omits `initialSelected`  
- **Code home:** `FeedListArea.jsx` · soft `FeedThreadMount` rootRx lift · soft list API fields  
- **L1.5:** [arch](../../../architecture/component-reactions/27-list-own-reactions-hydrate.md)
- **Prior analysis:** [analysis-reaction-persist-reload-gap…](../../../analysis/analysis-reaction-persist-reload-gap-2026-10-22.md)

## L1 — FR

- **FR-CR-27.1** On `#/next/feed` **list** load (authenticated), each card’s own React strip hydrates actor `selected[]` — not only on issue detail.  
- **FR-CR-27.2** Prefer reuse CR-25 mapping (`thread_root_reactions` / tree) · if list payload lacks selected, document honesty + minimal fetch path (no invent gateway schema).  
- **FR-CR-27.3** Anonymous omit held · Vitest · OP eye — no invent PASS.

## OOS

Own empty UX (CR-26) · invent people API · invent CDN

## AC

- [x] List cards show own selected after reload (Bearer) — structure Present · OP Absent  
- [x] Detail path CR-25 regression held  
- [x] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-cr-27-t01-probe` | Done | Confirm list payload vs tree lift path | 27.2 |
| `task-spa-cr-27-t02-wire` | Done | Pass initialSelected into list FeedCivicPost | 27.1 |
| `task-spa-cr-27-t03-vitest` | Done | List hydrate markers | 27.3 |

### Order

`t01` → `t02` → `t03` · skill `react-expert`
