# SPA-NS-03-T02 — Bind GET /story-activity or honest empty/demo

**Status:** Done · P3 `2026-10-09T16:09:26Z`  
**Story:** [`../STORY-SPA-NS-03-profile-rail-shelter-nav.md`](../STORY-SPA-NS-03-profile-rail-shelter-nav.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md)  
**Depends on:** T01 ProfileRail shell  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:04:13Z`  
**Done:** `2026-10-09T16:09:26Z`  
**Package:** `pkg-000099`  

**@api:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-api-requirements.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-api-requirements.md) §2.1

## Purpose
Bind `GET /story-activity` or honest empty/demo — FR-NS-03.2.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Honest empty hook | [`useStoryActivityRail.js`](../../../../../../../src/hooks/useStoryActivityRail.js) `status:'empty'` · `metrics:null` |
| 2 | Rail empty copy | `profile-rail-empty` · `nextShell.rail.empty` |
| 3 | No invent HTTP | no SPA repository for `/story-activity` · CAB cited only |
| 4 | Metrics path ready | ProfileRail accepts CAB-shaped `activity.metrics` when provided |

## AC / DoD

- [x] (P0) Honest empty (SPA HTTP not wired)
- [x] (P0) No invented gateway fields
- [x] (P0) Empty uses `nextShell.rail.empty`
