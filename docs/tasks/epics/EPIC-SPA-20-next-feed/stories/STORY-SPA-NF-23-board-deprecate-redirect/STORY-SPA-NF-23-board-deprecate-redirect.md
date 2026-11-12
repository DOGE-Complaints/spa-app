# STORY-SPA-NF-23-board-deprecate-redirect — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md)  
> **Status:** P8 local close · T01–T04 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-22T14:39:25Z` · tip · `activation: none`  
> **Package:** `pkg-000206` · next-feed · Interview **B11** · ARCH-DELTA **§11** · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `feed` / routes · soft public shell CTAs · **mixed** · Path A p13UxReady · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft analysis inventory Present · soft NF-22 structure · tip after `pkg-000205` NF-22 P8  
> **Runtime:** `#/board`→`#/next/feed` · inventory Present · soft CTAs · vitest · Path A shots · no invent OP PASS · no mass-delete

## Purpose

Classic `#/board` still mounts `BoardPage`. Need replace-redirect to `#/next/feed` · soft CTA retargets · inventory before purge · Vitest · OP eye.

## L1 — FR (backlog verbatim)

- **FR-NF-23.1** `#/board` redirects to `#/next/feed` (replace).  
- **FR-NF-23.2** Public CTAs that still point `/board` retarget `/next/feed` (Header soft · HowItWorks soft · Footer brand).  
- **FR-NF-23.3** L2 t01 inventory unused classic board-only components (do not mass-delete without list).  
- **FR-NF-23.4** Shared next/feed modules kept; document spaghetti risks in analysis.  
- **FR-NF-23.5** Vitest route · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] /board → /next/feed  
- [x] Soft CTA retargets  
- [x] Inventory note Present  
- [ ] Vitest · OP eye — Vitest green · OP Absent → **BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-23-board-deprecate-redirect.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-23-t01-inventory](task-spa-nf-23-t01-inventory/README.md) | List board-only vs shared | **Done** |
| T02 | [task-spa-nf-23-t02-redirect](task-spa-nf-23-t02-redirect/README.md) | App.jsx Navigate | **Done** |
| T03 | [task-spa-nf-23-t03-cta](task-spa-nf-23-t03-cta/README.md) | Soft link retargets | **Done** |
| T04 | [task-spa-nf-23-t04-vitest](task-spa-nf-23-t04-vitest/README.md) | Route tests | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Full rewrite of feed architecture · invent CDN · purge without inventory

## DoD (backlog verbatim)

/board → /next/feed · soft CTAs · inventory Present · Vitest · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **B11** · [ARCH-DELTA §11](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · [analysis](../../../../../analysis/analysis-next-feed-board-deprecate-architecture-2026-10-22.md) Present · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-board-deprecate-redirect.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
