# STORY-SPA-NF-24-map-leaves-sheet-theme — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-24-map-leaves-sheet-theme.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-24-map-leaves-sheet-theme.md)  
> **Status:** P8 local close · T01–T04 **Done** · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-23T13:41:03Z` · `pkg-000212` closed · `activation: none`
> **Package:** `pkg-000212` · next-feed · Interview **M1** · ARCH-DELTA **§12** · wave `OP-spa nf24-wave4-20261023`  
> **ui_scope:** `map` / next-feed · **mixed** · Path A p13UxReady · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft NF-20 leaves reachable Present · soft NF-19 basemap theme · tip after `pkg-000211` PH-11 P8  
> **Runtime:** P8 local close · Path A shots Present · CAPTURE-META `fails: []` · OP eye Absent → gate **BLOCK** · no invent OP PASS · no invent basemap · NO PUSH

## Purpose

Map leaves sheet / pin popup theme (M1 · §12): `.board-issues-map-leaves` + `.board-issues-map-popup` follow `data-theme` · soft MapIssuePreview light honesty · dark held · Vitest · OP eye — no invent PASS.

## L1 — FR (backlog verbatim)

- **FR-NF-24.1** Leaves sheet (`.board-issues-map-leaves`) follows `data-theme` — light theme uses light surface/text tokens (no hardcoded navy `rgba(12,18,30,…)` as sole fill).  
- **FR-NF-24.2** Default pin popup (`.board-issues-map-popup`) same theme bind.  
- **FR-NF-24.3** Soft: `MapIssuePreview` / feed pin card — remove dark-only CSS fallback when theme light.  
- **FR-NF-24.4** Dark theme readability held.  
- **FR-NF-24.5** Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Light theme: leaves sheet light — structure Present · OP eye Absent  
- [x] Pin popup themed — structure Present · OP eye Absent  
- [x] Dark held · Vitest · OP eye — vitest green · OP Absent → Partial=**BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-24-map-leaves-sheet-theme.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-24-t01-leaves-css](task-spa-nf-24-t01-leaves-css/README.md) | Theme tokens on leaves sheet | **Done** |
| T02 | [task-spa-nf-24-t02-popup](task-spa-nf-24-t02-popup/README.md) | Theme tokens on pin popup | **Done** |
| T03 | [task-spa-nf-24-t03-preview](task-spa-nf-24-t03-preview/README.md) | MapIssuePreview light honesty | **Done** |
| T04 | [task-spa-nf-24-t04-vitest](task-spa-nf-24-t04-vitest/README.md) | CSS/theme markers | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Cluster leaves logic (NF-20) · invent basemap · invent OP PASS

## DoD (backlog verbatim)

Light theme leaves sheet light · Pin popup themed · Dark held · Vitest · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **M1** · [ARCH-DELTA §12](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · [evidence 01](../../../../../analysis/evidence/op-residual-wave4-2026-10-23/01-map-leaves-sheet-dark-on-light.png) · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-map-leaves-sheet-theme.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
