# SPA-NS-05-T02 — Shelter-list / board content may stay legacy in main

**Status:** Done · P3 `2026-10-09T17:21:55Z`  
**Story:** [`../STORY-SPA-NS-05-classic-shell-apply.md`](../STORY-SPA-NS-05-classic-shell-apply.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-05-classic-shell-apply.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-05-classic-shell-apply.md)  
**Depends on:** T01 classic shell chrome  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:42:01Z`  
**Done:** `2026-10-09T17:21:55Z`  
**Package:** `pkg-000101`  

**@mockup:** [`../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md`](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) §3 D2.3 (hybrid)  
**@risks:** [`../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md`](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)  
**@register:** [`../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md`](../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md) row NS-X

## Purpose
Shelter-list / board content may remain legacy UI inside main — FR-NS-05.2. Hybrid ≠ Feed Product Done.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Legacy board main intact | live `#/board` Issue Board + issue cards · Outlet unchanged |
| 2 | Vitest host text | `AppShellLayout.ns05Classic` board-host / issue-host |
| 3 | No BoardFeed invent | main stays `features/board` |

## AC / DoD

- [x] (P0) Legacy board/shelter-list intact in main
- [x] (P0) Hybrid ≠ Feed Product Done
- [x] (P0) No next-feed invent on classic

## Out of scope
BoardFeed · threads · retire classic · `/` flip · git push.
