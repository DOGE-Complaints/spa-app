# STORY-SPA-NF-25-filters-popover-ux-redesign — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-25-filters-popover-ux-redesign.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-25-filters-popover-ux-redesign.md)  
> **Status:** **BLOCKED** (OP eye) · P8 local close · T01–T04 **Done** · gate **BLOCK** · `pkg-000229` · SHAs feat `bf0b74f` · test `b0a06f3` · docs `83d45e8` · NO PUSH · no invent PASS  
> **Package:** `pkg-000229` · next-feed · Interview **M13** · M175 intake PASS · wave `OP-spa nf25-wave5-20261024`  
> **ui_scope:** feed / Filters popover · **mixed** · Path A structure Pass · Partial visual=**BLOCK** · NO BRIEF · no invent PASS  
> **Skill declared:** `react-expert`  
> **Depends:** NF-21/22 structure Present · SEARCH-02 shell · tip after `pkg-000228`  
> **Runtime:** Path A shots Present · CAPTURE-META `fails: []` · OP eye Absent → **BLOCK** · Await **P4** · no invent PASS · invent filter API OOS · Map theme OOS

## Purpose

Filters popover UX redesign per M175: usable width · clear label/value rows · date from/to look **active** (native picker + NF-21 color-scheme held) · Apply/Reset hierarchy clear (NF-22 Reset held) · Vitest · OP eye.

## L1 — FR (backlog verbatim)

- **FR-NF-25.1** Filters popover usable width · clear label/value rows · no severe truncation (M175).  
- **FR-NF-25.2** Date from/to look **active** (not disabled) while keeping native picker + NF-21 theme color-scheme.  
- **FR-NF-25.3** Apply / Reset hierarchy clear (NF-22 Reset held).  
- **FR-NF-25.4** Vitest · OP eye — no invent PASS · no invent filter API keys.

## Acceptance Criteria (backlog verbatim)

- [x] UX tip cited / intake PASS (M175)  
- [x] Width + date affordance structure (Apply) — structure · visual **BLOCK**  
- [x] Vitest · OP eye Absent → **BLOCK**  

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-25-filters-popover-ux-redesign.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-25-t01-ux](task-spa-nf-25-t01-ux/README.md) | Intake M175 PASS | **Done** |
| T02 | [task-spa-nf-25-t02-layout](task-spa-nf-25-t02-layout/README.md) | Popover width + rows + date look | Done · BLOCK |
| T03 | [task-spa-nf-25-t03-actions](task-spa-nf-25-t03-actions/README.md) | Apply/Reset hierarchy | Done · BLOCK |
| T04 | [task-spa-nf-25-t04-vitest](task-spa-nf-25-t04-vitest/README.md) | Markers | Done · BLOCK |

**Order:** t01 (Done) → t02 → t03 → t04

## Out of scope (backlog verbatim)

Map theme · invent gateway filters

## DoD (backlog verbatim)

Width + rows + active-looking dates · Apply/Reset hierarchy · Vitest · OP eye — no invent PASS · no invent filter API keys.

## @mockup handoff

- Continuity: Interview **M13** · [25-filters-popover-ux-redesign](../../../../../architecture/next-feed-vl/25-filters-popover-ux-redesign.md) · [M175](../../../../../UX/next/feed/artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md) · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-filters-popover-ux-redesign.md) · [screenshots/](./screenshots/README.md)
