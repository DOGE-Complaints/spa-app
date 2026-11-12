# STORY-SPA-NF-23 — Deprecate `#/board` → `/next/feed`

## Meta

- **Key:** `STORY-SPA-NF-23-board-deprecate-redirect`
- **Package:** [next-feed](INDEX.md)
- **Status:** P8 local close · T01–T04 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000206` · tip · `activation: none` · `2026-10-22T14:39:25Z`
- **Pipeline:** [STORY-SPA-NF-23-board-deprecate-redirect](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-23-board-deprecate-redirect/STORY-SPA-NF-23-board-deprecate-redirect.md)
- **Interview:** [INTERVIEW-NF-21-plus…](INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **B11**
- **Analysis:** [analysis-next-feed-board-deprecate-architecture-2026-10-22.md](../../../analysis/analysis-next-feed-board-deprecate-architecture-2026-10-22.md)
- **Disposition:** [p5-disposition-STORY-SPA-NF-23-2026-10-22.md](../../../analysis/p5-disposition-STORY-SPA-NF-23-2026-10-22.md)
- **P7:** [reaudit-STORY-SPA-NF-23-p7-2026-10-22.md](../../../analysis/reaudit-STORY-SPA-NF-23-p7-2026-10-22.md)
- **Arch:** [23-board-deprecate-redirect.md](../../../architecture/next-feed-vl/23-board-deprecate-redirect.md)
- **Code home:** `App.jsx` · soft Header/HowItWorks/Footer · `BoardPage` held

## L1 — FR

- **FR-NF-23.1** `#/board` redirects to `#/next/feed` (replace).  
- **FR-NF-23.2** Public CTAs that still point `/board` retarget `/next/feed` (Header soft · HowItWorks soft · Footer brand).  
- **FR-NF-23.3** L2 t01 inventory unused classic board-only components (do not mass-delete without list).  
- **FR-NF-23.4** Shared next/feed modules kept; document spaghetti risks in analysis.  
- **FR-NF-23.5** Vitest route · OP eye — no invent PASS.

## OOS

Full rewrite of feed architecture · invent CDN · purge without inventory

## AC

- [x] /board → /next/feed (structure)  
- [x] Soft CTA retargets (structure)  
- [x] Inventory note Present  
- [x] Vitest · Path A  
- [ ] OP eye — Absent → gate **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-nf-23-t01-inventory` | **Done** | List board-only vs shared | 23.3 · 23.4 |
| `task-spa-nf-23-t02-redirect` | **Done** | App.jsx Navigate | 23.1 |
| `task-spa-nf-23-t03-cta` | **Done** | Soft link retargets | 23.2 |
| `task-spa-nf-23-t04-vitest` | **Done** | Route tests | 23.5 |

### Order

`t01` → `t02` → `t03` → `t04` · skill `react-expert`
