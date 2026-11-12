# STORY-SPA-NF-22-reset-filters-actionable — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-22-reset-filters-actionable.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-22-reset-filters-actionable.md)  
> **Status:** P8 local close · structure **Present** · gate **BLOCK** · `2026-10-22T14:20:42Z` · tip · `activation: none` · Story **BLOCKED** (OP eye) OK · NO PUSH  
> **Package:** `pkg-000205` · next-feed · Interview **F4** · ARCH-DELTA **§10** · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `feed` / filters · soft `#/next/feed` · **mixed** · Path A p13UxReady · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft `ResetFiltersControl` / `FeedToolbar` Present · soft NF-21 structure · tip after `pkg-000204` NF-21 P8  
> **Runtime:** T01–T03 **Done** · [disposition](../../../../../analysis/p5-disposition-STORY-SPA-NF-22-2026-10-22.md) F1 WAIVED operator · F2 WAIVED info · TASKED=**0** · [p7](../../../../../analysis/reaudit-STORY-SPA-NF-22-p7-2026-10-22.md) · [arch](../../../../../architecture/next-feed-vl/22-reset-filters-actionable.md) · dirty∨active Reset · Filters **29/29** · nf22 **2/2** · Path A Present · CAPTURE-META `fails: []` · OP eye Absent → **BLOCK** · no invent OP PASS · no invent new filter fields · P6 not needed

## Purpose

Reset Filters enablement ignores panel dirty — only `hasActiveFilters`. Need dirty∨active enablement · pointer when actionable · Vitest · OP eye.

## L1 — FR (backlog verbatim)

- **FR-NF-22.1** Reset clears applied filters **and** pending panel dirty state when actionable.  
- **FR-NF-22.2** Control shows **pointer** whenever actionable (dirty and/or hasActiveFilters) — not dead non-pointer gray when user can reset.  
- **FR-NF-22.3** Disabled only when nothing to reset.  
- **FR-NF-22.4** Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Reset works from toolbar + panel footer (structure)  
- [x] Pointer when actionable (structure)  
- [x] Vitest · Path A  
- [ ] OP eye — Absent → gate **BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-22-reset-filters-actionable.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-22-t01-state](task-spa-nf-22-t01-state/README.md) | Wire dirty∨active enablement | **Done** |
| T02 | [task-spa-nf-22-t02-cursor](task-spa-nf-22-t02-cursor/README.md) | CSS cursor pointer when enabled | **Done** |
| T03 | [task-spa-nf-22-t03-vitest](task-spa-nf-22-t03-vitest/README.md) | Behavior tests | **Done** |

**Order:** t01 → t02 → t03

## Out of scope (backlog verbatim)

Date color-scheme (NF-21) · invent new filter fields

## DoD (backlog verbatim)

Reset actionable · pointer when enabled · Vitest · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **F4** · [ARCH-DELTA §10](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) Present · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-reset-filters-actionable.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
