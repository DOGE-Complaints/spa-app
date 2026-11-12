# STORY-SPA-NS-12-freeze-rail-my-stories — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-12-freeze-rail-my-stories.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-12-freeze-rail-my-stories.md)  
> **Status:** P8 local close · T01–T03 **Done** · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-23T14:08:51Z` · `pkg-000214` closed · `activation: none` · NO PUSH · [disposition](../../../../../run-reports/p5-disposition-STORY-SPA-NS-12-2026-10-23.md) · [p7](../../../../../analysis/reaudit-STORY-SPA-NS-12-p7-2026-10-23.md) · [arch](../../../../../architecture/next-feed-vl/12-freeze-rail-my-stories.md)  
> **Package:** `pkg-000214` · next-shell · Interview **R4** · wave `OP-spa nf24-wave4-20261023`  
> **ui_scope:** `shell` · **mixed** · Path A Interview R4 code lock · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft NS-03 ProfileRail · soft NS-09 rail cleanup · soft NS-11 profile next shell closed · tip after `pkg-000213`  
> **Runtime:** Path A shots 01–05 Present · CAPTURE-META `fails: []` · ns12 **2/2** · ns03 **4/4** · ns09 **3/3** · OP eye Absent → gate **BLOCK** · no invent OP PASS · keep My stories code gated

## Purpose

Freeze/hide **My stories** in ProfileRail (keep code for later unfreeze). Remaining nav: Feed · Profile. Soft mobile parity. Vitest · OP eye — no invent PASS.

## L1 — FR (backlog verbatim)

- **FR-NS-12.1** ProfileRail does **not** show **My stories** nav item (gate/hide — keep code for later unfreeze).  
- **FR-NS-12.2** Remaining nav: Feed · Profile (held).  
- **FR-NS-12.3** Soft mobile: no My stories affordance if present.  
- **FR-NS-12.4** Vitest · OP eye — no invent PASS · no invent story list in rail.

## Acceptance Criteria (backlog verbatim)

- [x] My stories Absent from rail UI — structure Present · OP eye Absent  
- [x] Feed + Profile held — structure Present · OP eye Absent  
- [x] Vitest · OP eye — vitest green · OP Absent → Partial=**BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-12-freeze-rail-my-stories.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-12-t01-gate](task-spa-ns-12-t01-gate/README.md) | Hide/gate My stories NavLink | **Done** |
| T02 | [task-spa-ns-12-t02-mobile](task-spa-ns-12-t02-mobile/README.md) | Soft mobile parity | **Done** |
| T03 | [task-spa-ns-12-t03-vitest](task-spa-ns-12-t03-vitest/README.md) | Update NS-03/09 tests | **Done** |

**Order:** t01 → t02 → t03

## Out of scope (backlog verbatim)

CAB-08 story HTTP · invent activity API in rail

## DoD (backlog verbatim)

My stories Absent from rail UI · Feed + Profile held · Vitest · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **R4** · Path A code lock · keep My stories code gated  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-freeze-rail-my-stories.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
