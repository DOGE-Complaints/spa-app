# STORY-SPA-PH-11-footer-static-pages — pipeline mirror

> **Epic:** [EPIC-SPA-09-public-shell-home](../../EPIC-SPA-09-public-shell-home.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-11-footer-static-pages.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-11-footer-static-pages.md)  
> **Status:** P8 local close · T01–T04 **Done** · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-22T18:22:41Z` · `pkg-000211` closed · `activation: none`  
> **Package:** `pkg-000211` · public-home · Interview **P9** · M166 + wave3 intake · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `public-footer` / public-home · **mixed** · Path A p13UxReady · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** PH-03 footer Present · soft NS-10 mark · tip after `pkg-000210` PH-13 P8  
> **Runtime:** P8 local close · Path A shots Present · CAPTURE-META `fails: []` · OP eye Absent → gate **BLOCK** · no invent OP PASS · no invent CDN · no invent final legal prose · NO PUSH

## Purpose

Footer scale + About/Privacy/Contact static page shells (M166): mark ≥40px · tagline · brand → `/next/feed` · real routes — Interview P9 · no invent legal body.

## L1 — FR (backlog verbatim)

- **FR-PH-11.1** Footer mark visible ≥**40 CSS px** (M166). Prefer vector mark when shared with NS-10.  
- **FR-PH-11.2** Tagline: use preview `Civic issues, structured.` until OP final (never `[TAGLINE_TBD]`).  
- **FR-PH-11.3** About · Privacy · Contact → real routes `/about` `/privacy` `/contact` (shell + H1; body OP-supplied later — no invent legal prose).  
- **FR-PH-11.4** Brand mark+name → `/next/feed` (not `/board`).  
- **FR-PH-11.5** Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] M166 + intake cited — structure Present · OP eye Absent  
- [x] Logo scale · tagline · three routes — structure Present · OP eye Absent  
- [x] Brand → next/feed — structure Present · OP eye Absent  
- [x] Vitest · OP eye — vitest green · OP Absent → Partial=**BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-PH-11-footer-static-pages.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ph-11-t01-footer](task-spa-ph-11-t01-footer/README.md) | Logo size + tagline + brand href | **Done** |
| T02 | [task-spa-ph-11-t02-routes](task-spa-ph-11-t02-routes/README.md) | Three page shells + App routes | **Done** |
| T03 | [task-spa-ph-11-t03-links](task-spa-ph-11-t03-links/README.md) | Footer hrefs → real routes | **Done** |
| T04 | [task-spa-ph-11-t04-vitest](task-spa-ph-11-t04-vitest/README.md) | Markers · Path A · gate | **Done** |

**Order:** Intake PASS (held) → t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

How It Works (PH-13) · invent CDN · invent final legal copy

## DoD (backlog verbatim)

M166 + intake cited · logo scale · tagline · three routes · brand → next/feed · Vitest · OP eye — no invent PASS.

## Analysis / arch

- [disposition](../../../run-reports/p5-disposition-STORY-SPA-PH-11-2026-10-22.md) · [p7](../../../../analysis/reaudit-STORY-SPA-PH-11-p7-2026-10-22.md) · [arch](../../../../architecture/public-home/11-footer-static-pages.md)

## @mockup handoff

- Continuity: Interview **P9** · [M166](../../../../UX/mockups/home/DOGEstonia-M166-public-footer-brand-links-spec-v1.0.md) · [legal overview](../../../../UX/mockups/home/DOGEstonia-M166-legal-pages-shell-overview-v1.0.png) · [wave3 intake](../../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md) · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-footer-static-pages.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
