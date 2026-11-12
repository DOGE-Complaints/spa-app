# STORY-SPA-NS-14-brand-png-dual-theme — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-14-brand-png-dual-theme.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-14-brand-png-dual-theme.md)  
> **Status:** P5 APPLY · gate **BLOCK** · Story **BLOCKED** (asset + OP eye) · asset **MASTERS_ABSENT** · `2026-10-23T14:34:34Z` · `pkg-000216` · `activation: none` · Await P8  
> **Package:** `pkg-000216` · next-shell · Interview **L2** · wave `OP-spa nf24-wave4-20261023`  
> **ui_scope:** `shell` · **mixed** · Path A **M169** · soft T01/T02 BLOCK · Partial visual=**BLOCK** · NO BRIEF · no invent art/PNG masters  
> **Skill declared:** `react-expert`  
> **Runtime:** T03 tagline drop Done · T04 markers Done · Header SVG held · CAPTURE-META `fails: []` · ns14 **3/3** · OP eye Absent → gate **BLOCK**

## Purpose

Transparent PNG dual-theme brand for Header + Footer (M169). Soft block on clean masters. Footer tagline omitted without inventing art. Vitest · OP eye — no invent PASS.

## L1 — FR (backlog verbatim)

- **FR-NS-14.1** Header uses **transparent PNG** light + dark masters (theme switch) — not SVG wrapping raster as production brand.  
- **FR-NS-14.2** Visible header band ~44 CSS px · no dark plate.  
- **FR-NS-14.3** Footer uses same family PNG · mark ≥40px · brand name ok · **no** tagline `Civic issues, structured.` beside brand.  
- **FR-NS-14.4** Soft: remove/hide footer tagline key from rendered UI.  
- **FR-NS-14.5** Vitest · OP eye — no invent PASS · no invent mascot · no crop artboard as master.

## Acceptance Criteria (backlog verbatim)

- [x] UX tip cited / intake PASS (M169)  
- [ ] Dual PNG light/dark header+footer (**BLOCK** soft — masters Absent)  
- [x] No footer tagline beside brand (structure)  
- [x] Vitest · OP eye (structure Present · visual **BLOCK**)

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-14-brand-png-dual-theme.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-14-t01-assets](task-spa-ns-14-t01-assets/README.md) | Clean transparent PNG masters → `public/assets/` | **BLOCK** soft |
| T02 | [task-spa-ns-14-t02-header](task-spa-ns-14-t02-header/README.md) | Wire Header theme PNG | **BLOCK** soft (deferred) |
| T03 | [task-spa-ns-14-t03-footer](task-spa-ns-14-t03-footer/README.md) | Drop tagline (PNG wire awaits T01) | **Done** (tagline) |
| T04 | [task-spa-ns-14-t04-vitest](task-spa-ns-14-t04-vitest/README.md) | Markers | **Done** |

## Out of scope (backlog verbatim)

Map theme · invent CDN · legal pages content

## @mockup handoff

- Continuity: Interview **L2** · [M169](../../../../../UX/mockups/home/DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.md) · Path A  
- Shots: [visual-checklists](./visual-checklists-brand-png-dual-theme.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
