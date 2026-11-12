# SPA-NS-03-T04 — Wire rail icons `/icons/next-shell/…`

**Status:** Done · P3 `2026-10-09T16:09:26Z`  
**Story:** [`../STORY-SPA-NS-03-profile-rail-shelter-nav.md`](../STORY-SPA-NS-03-profile-rail-shelter-nav.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md)  
**Depends on:** T01 · NS-02 promote Present  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:04:13Z`  
**Done:** `2026-10-09T16:09:26Z`  
**Package:** `pkg-000099`  

**@icons:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md)

## Purpose
Wire rail icons to `/icons/next-shell/…` runtime URLs (already promoted in NS-02).

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | board / profile / my-stories | `ProfileRail.jsx` ICON_* constants |
| 2 | location / verified / chevron-down | summary meta + chevron |
| 3 | No new SVG invent | reuse `public/icons/next-shell/…` |
| 4 | Vitest | ProfileRail.ns03 asserts icon `src` |

## AC / DoD

- [x] (P0) All catalog slots wired
- [x] (P0) No new SVG masters
