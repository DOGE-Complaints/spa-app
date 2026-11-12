# SPA-NF-LAB-06-T02 — Rename lab-owned → `*Deprecated`

**Status:** Done · P3 (`2026-10-13T15:09:44Z`)
**Story:** [`../STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md`](../STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** false
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T15:02:37Z`
**Closed:** `2026-10-13T15:09:44Z`
**Package:** `pkg-000132`
**UX appendix:** skip (Artboards N/A · NOT visual PASS)
**Depends on:** T01 inventory
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Apply Scope rename table: lab-owned modules → `*Deprecated`. Update imports · barrel exports explicitly Deprecated · set `data-lab-plane="deprecated"` on roots (FR-LAB-06.1/06.3/06.4).

## Result (code)

| Current (gone) | Deprecated Present |
|----------------|--------------------|
| `FeedLabIssueCard` | `FeedLabIssueCardDeprecated` (+ `.css`) |
| `LabReactionChrome` | `LabReactionChromeDeprecated` (+ `.css`) |
| `FeedLabDiscussion` | `FeedLabDiscussionDeprecated` (+ `.css`) |
| `FeedLabDetailOverlay` | `FeedLabDetailOverlayDeprecated` (+ `.css`) |

- Barrel: `features/feed-lab/index.js` exports Deprecated only
- Host: `FeedLabPage.jsx` mounts Deprecated · `data-lab-plane="deprecated"`
- Package INDEX documents Deprecated exports
- `git status src/features/feed/` empty this tip

## AC / DoD
- [x] Lab-owned modules exist only under Deprecated names/paths
- [x] Barrel exports Deprecated names explicitly
- [x] Roots carry `data-lab-plane="deprecated"`
- [x] Package INDEX / tip note documents Deprecated exports
- [x] No shared `features/feed/**` renamed solely for this tip
