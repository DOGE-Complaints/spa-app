# SPA-NS-03-T03 — Shelter nav Profile / My stories / Board

**Status:** Done · P3 `2026-10-09T16:09:26Z`  
**Story:** [`../STORY-SPA-NS-03-profile-rail-shelter-nav.md`](../STORY-SPA-NS-03-profile-rail-shelter-nav.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md)  
**Depends on:** T01  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:04:13Z`  
**Done:** `2026-10-09T16:09:26Z`  
**Package:** `pkg-000099`  

## Purpose
Shelter nav Profile / My stories / Board — FR-NS-03.3 · navigation only.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Board → `/next/feed` | `profile-rail-nav-board` |
| 2 | My stories / Profile → `/profile` | `profile-rail-nav-my-stories` · `profile-rail-nav-profile` |
| 3 | Classic shelter-list intact | `AppShellLayout` only swaps rail on next-feed; board uses `Sidebar` + PH-09 flag |
| 4 | Labels | `nextShell.rail.*` |

## AC / DoD

- [x] (P0) Nav targets existing routes
- [x] (P0) Shelter-list intact for NS-05
- [x] (P0) No BoardFeed invent
