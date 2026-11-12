# STORY-SPA-NS-13-hide-header-search-notifications — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-13-hide-header-search-notifications.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-13-hide-header-search-notifications.md)  
> **Status:** P8 closed · T01–T03 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `2026-10-23T14:22:30Z` · `pkg-000215` · `activation: none` · NO PUSH  
> **Package:** `pkg-000215` · next-shell · Interview **H7** · wave `OP-spa nf24-wave4-20261023`  
> **ui_scope:** `shell` · **mixed** · Path A evidence 07 · gate/hide keep code · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft NS-02 Header · soft NS-12 closed · tip after `pkg-000214`  
> **Runtime:** Path A shots 01–05 Present · CAPTURE-META `fails: []` · ns13 **2/2** · OP eye Absent → gate **BLOCK** · [disposition](../../../../run-reports/p5-disposition-STORY-SPA-NS-13-2026-10-23.md) F1/F2 WAIVED · TASKED=0 · P6 skipped · no invent OP PASS · keep search/notif code gated

## Purpose

Hide search + notifications in public Header (gate flag — do not delete markup/handlers). Locale · theme · account held. Vitest · OP eye — no invent PASS.

## L1 — FR (backlog verbatim)

- **FR-NS-13.1** Search affordance **not visible** in public Header (gate flag / conditional — **do not delete** markup/handlers).  
- **FR-NS-13.2** Notifications chrome **not visible** same gate.  
- **FR-NS-13.3** Locale · theme · account controls held.  
- **FR-NS-13.4** Vitest · OP eye — no invent PASS · no invent search API.

## Acceptance Criteria (backlog verbatim)

- [x] Search hidden · code retained  
- [x] Notifications hidden · code retained  
- [x] Locale/theme/account Present  
- [x] Vitest · OP eye (structure Present · visual **BLOCK** until OP)

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-13-hide-header-search-notifications.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-13-t01-flag](task-spa-ns-13-t01-flag/README.md) | Feature gate hide search+notifications | **Done** |
| T02 | [task-spa-ns-13-t02-a11y](task-spa-ns-13-t02-a11y/README.md) | No focusable hidden controls | **Done** |
| T03 | [task-spa-ns-13-t03-vitest](task-spa-ns-13-t03-vitest/README.md) | Markers · peers held | **Done** |

**Order:** t01 → t02 → t03

## Out of scope (backlog verbatim)

Brand PNG (NS-14) · invent notification center

## DoD (backlog verbatim)

Search hidden · code retained · Notifications hidden · code retained · Locale/theme/account Present · Vitest · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **H7** · [evidence 07](../../../../../analysis/evidence/op-residual-wave4-2026-10-23/07-header-search-notifications.png) · Path A  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-hide-header-search-notifications.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
