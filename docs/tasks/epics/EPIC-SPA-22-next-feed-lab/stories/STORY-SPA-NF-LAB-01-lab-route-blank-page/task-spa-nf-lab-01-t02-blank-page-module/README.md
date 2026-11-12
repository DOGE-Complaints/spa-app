# SPA-NF-LAB-01-T02 — Blank lab page module

**Status:** Done · P3 (`2026-10-13T11:17:12Z`) · P1.3 (`2026-10-13T11:04:31Z`)
**Story:** [`../STORY-SPA-NF-LAB-01-lab-route-blank-page.md`](../STORY-SPA-NF-LAB-01-lab-route-blank-page.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-01-lab-route-blank-page.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-01-lab-route-blank-page.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T11:04:31Z`
**Package:** `pkg-000127`
**UX appendix:** skip (Artboards N/A) — foundation only · not visual PASS
**Runtime prerequisite (later):** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** [`../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md`](../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) §3 ban-list

## Purpose
Create blank canvas placeholder `pages/FeedLabPage.jsx` (or `features/feed-lab/`) until LAB-02/03. Minimal chrome · zero HTTP on mount · ban-list imports.

## Arch context
- Clean room for later fixture/atom tips.
- **Not** `FeedToolbar` / `FeedListArea` / `NextFeedHostPage`.
- Ban: `BoardIssuePost`, `FeedCivicPost`, `FeedDiscussionBlock`, `ReactionControls.css` (and classic `*Controls.css` per VISUAL-DoD).

## Constraints
- Zero gateway/threads HTTP on mount (FR-LAB-01.3).
- name ≠ create until implement wave (P3).
- Do not mark package visual PASS / Partial as Done.
- Fixtures / atoms / modal / port = OOS (LAB-02…05).

## AC / DoD
- [x] Blank lab canvas renders on `#/lab/feed`
- [x] No issues/threads network from lab page mount
- [x] Import ban held on lab entry module
- [x] Story gate PASS after live verify (foundation; **not** visual Done / package PASS)
- [x] Product routes not regressed

## Where to change
- Target: `spa-app/src/pages/FeedLabPage.jsx` (or `spa-app/src/features/feed-lab/`)
- Wire from T01 `App.jsx` Route element
- Optional minimal CSS co-located with page (not classic Controls)

## Verification
- Ban-list grep on lab entry module
- Network: no issues/threads from mount
- local-five `#/lab/feed` blank canvas under shell
- `#/next/feed` + `#/board` smoke unchanged
