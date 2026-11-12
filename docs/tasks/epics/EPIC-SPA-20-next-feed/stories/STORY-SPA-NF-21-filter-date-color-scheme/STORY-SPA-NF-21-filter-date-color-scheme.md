# STORY-SPA-NF-21-filter-date-color-scheme — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-21-filter-date-color-scheme.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-21-filter-date-color-scheme.md)  
> **Status:** P8 local close · structure **Present** · gate **BLOCK** · `2026-10-22T14:04:42Z` · tip · `activation: none` · Story **BLOCKED** (OP eye) OK · NO PUSH  
> **Package:** `pkg-000204` · next-feed · Interview **F3** · ARCH-DELTA **§9** · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `feed` / filters · soft `#/next/feed` · **mixed** · Path A p13UxReady · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft Filters / LocalizedDateInput Present · soft NF-19/20 · tip after `pkg-000203` NS-10 P8  
> **Runtime:** T01–T02 **Done** · [disposition](../../../../../analysis/p5-disposition-STORY-SPA-NF-21-2026-10-22.md) F1 WAIVED operator · F2 WAIVED info · TASKED=**0** · [p7](../../../../../analysis/reaudit-STORY-SPA-NF-21-p7-2026-10-22.md) · [arch](../../../../../architecture/next-feed-vl/21-filter-date-color-scheme.md) · theme-bound `color-scheme` · Filters **26/26** · nf21 **2/2** · Path A Present · CAPTURE-META `fails: []` · OP eye Absent → **BLOCK** · no invent OP PASS · no invent custom calendar · P6 not needed

## Purpose

Native date picker chrome stays hard-locked to `color-scheme: dark` on `.board-filter-date-native`. Need theme-bound scheme (light→light, dark→dark) · Vitest markers · OP eye.

## L1 — FR (backlog verbatim)

- **FR-NF-21.1** Native date picker chrome follows `data-theme` (light→light, dark→dark).  
- **FR-NF-21.2** Remove hardcoded `color-scheme: dark` on `.board-filter-date-native` as sole rule.  
- **FR-NF-21.3** Vitest / CSS markers · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Light theme calendar light (structure)  
- [x] Dark theme calendar dark (structure)  
- [x] Vitest · Path A  
- [ ] OP eye — Absent → gate **BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-21-filter-date-color-scheme.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-21-t01-scheme](task-spa-nf-21-t01-scheme/README.md) | Theme-bound color-scheme | **Done** |
| T02 | [task-spa-nf-21-t02-vitest](task-spa-nf-21-t02-vitest/README.md) | CSS assert | **Done** |

**Order:** t01 → t02

## Out of scope (backlog verbatim)

Reset Filters (NF-22) · invent custom calendar widget

## DoD (backlog verbatim)

Light calendar light · dark calendar dark · Vitest · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **F3** · [ARCH-DELTA §9](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) Present · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-filter-date-color-scheme.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
