# STORY-SPA-NS-10-header-logo-light-scale — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md)  
> **Status:** P8 local close · structure **Present** · gate **BLOCK** · `2026-10-22T13:40:36Z` · tip · `activation: none` · Story **BLOCKED** (OP eye) OK · NO PUSH  
> **Package:** `pkg-000203` · next-shell · Interview **H8** · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `shell` · soft `#/next/feed` host · **mixed** · Path A M165 · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft NS-02 Header Present · soft NS-07/08/09 closed · intake PASS M165  
> **Runtime:** T01–T04 **Done** · [disposition](../../../../../analysis/p5-disposition-STORY-SPA-NS-10-2026-10-22.md) F1 WAIVED operator · F2 WAIVED info · TASKED=**0** · [p7](../../../../../analysis/reaudit-STORY-SPA-NS-10-p7-2026-10-22.md) · [arch](../../../../../architecture/next-feed-vl/10-header-logo-light-scale.md) · light/dark SVG · ~44px · AppShell **28/28** · Path A Present · CAPTURE-META `fails: []` · OP eye Absent → **BLOCK** · no invent OP PASS · no invent mascot · no invent CDN · P6 not needed

## Purpose

Header brand on light still reads as dark plate / wrong scale / raster master. Need light surface · ~44px visible band · **SVG vector** preferred · dark continuous · home `/next/feed`.

## L1 — FR (backlog verbatim)

- **FR-NS-10.1** Light theme: brand on light/transparent chrome — **no** dark rectangular plate.  
- **FR-NS-10.2** Visible brand band ~**44 CSS px** (M165 proposal within 40–48) measured on artwork, not padded canvas.  
- **FR-NS-10.3** Prefer **SVG vector** horizontal brand (OP) — not PNG dark-backed master as light UI source; prepare/promote real SVG (placeholder `DOGEstonia-logo-fallback.svg` ≠ production dog+wordmark).  
- **FR-NS-10.4** Dark theme: same geometry · readable light DOGE + orange stonia on continuous dark header (no inset dark tile).  
- **FR-NS-10.5** Brand home → `/next/feed` · Vitest / Path A · OP eye — no invent PASS · no invent mascot · no crop artboard PNG as master.

## Acceptance Criteria (backlog verbatim)

- [x] M165 + intake cited  
- [x] Light surface · no dark plate (structure)  
- [x] Scale tip · **vector** preferred (structure)  
- [x] Dark held · Vitest · Path A  
- [ ] OP eye — Absent → gate **BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-10-header-logo-light-scale.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-10-t01-asset](task-spa-ns-10-t01-asset/README.md) | Promote/prepare SVG horizontal brand · wire Header | **Done** |
| T02 | [task-spa-ns-10-t02-scale](task-spa-ns-10-t02-scale/README.md) | ~44px visible band CSS | **Done** |
| T03 | [task-spa-ns-10-t03-dark](task-spa-ns-10-t03-dark/README.md) | Dark ink / continuous surface | **Done** |
| T04 | [task-spa-ns-10-t04-vitest](task-spa-ns-10-t04-vitest/README.md) | Markers · home href | **Done** |

**Order:** Intake PASS → t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Footer logo (PH-11) · invent new dog style · invent CDN

## DoD (backlog verbatim)

M165 + intake cited · light surface · no dark plate · scale tip · vector preferred · dark held · Vitest / Path A · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **H8** · [M165](../../../../../UX/mockups/home/DOGEstonia-M165-header-brand-logo-light-spec-v1.0.md) Present · Path A  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-header-logo-light-scale.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
