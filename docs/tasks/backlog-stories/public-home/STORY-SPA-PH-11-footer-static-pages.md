# STORY-SPA-PH-11 — Footer scale + About/Privacy/Contact pages

## Meta

- **Key:** `STORY-SPA-PH-11-footer-static-pages`
- **Package:** [public-home](INDEX.md)
- **Status:** P8 local close · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000211` closed · `activation: none`
- **Interview:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **P9**
- **UX tip:** [M166](../../../UX/mockups/home/DOGEstonia-M166-public-footer-brand-links-spec-v1.0.md) · [legal overview PNG](../../../UX/mockups/home/DOGEstonia-M166-legal-pages-shell-overview-v1.0.png) · [intake](../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md)
- **Analysis:** [disposition](../../run-reports/p5-disposition-STORY-SPA-PH-11-2026-10-22.md) · [p7](../../../analysis/reaudit-STORY-SPA-PH-11-p7-2026-10-22.md) · [arch](../../../architecture/public-home/11-footer-static-pages.md)
- **Pipeline:** [STORY-SPA-PH-11…](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-11-footer-static-pages/STORY-SPA-PH-11-footer-static-pages.md)
- **Code home:** `PublicFooter.jsx` · `App.jsx` routes · page shells like HowItWorks

## L1 — FR

- **FR-PH-11.1** Footer mark visible ≥**40 CSS px** (M166). Prefer vector mark when shared with NS-10.  
- **FR-PH-11.2** Tagline: use preview `Civic issues, structured.` until OP final (never `[TAGLINE_TBD]`).  
- **FR-PH-11.3** About · Privacy · Contact → real routes `/about` `/privacy` `/contact` (shell + H1; body OP-supplied later — no invent legal prose).  
- **FR-PH-11.4** Brand mark+name → `/next/feed` (not `/board`).  
- **FR-PH-11.5** Vitest · OP eye — no invent PASS.

## OOS

How It Works (PH-13) · invent CDN · invent final legal copy

## AC

- [x] M166 + intake cited — structure Present · OP Absent  
- [x] Logo scale · tagline · three routes — structure Present · OP Absent  
- [x] Brand → next/feed — structure Present · OP Absent  
- [x] Vitest · OP eye — vitest green · OP Absent → Partial=**BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ph-11-t01-footer` | Todo | Logo size + tagline + brand href | 11.1 · 11.2 · 11.4 |
| `task-spa-ph-11-t02-routes` | Todo | Three page shells + App routes | 11.3 |
| `task-spa-ph-11-t03-links` | Todo | Footer hrefs | 11.3 |
| `task-spa-ph-11-t04-vitest` | Todo | Tests | 11.5 |

### Order

Intake PASS → `t01` → `t02` → `t03` → `t04` · skill `react-expert`
