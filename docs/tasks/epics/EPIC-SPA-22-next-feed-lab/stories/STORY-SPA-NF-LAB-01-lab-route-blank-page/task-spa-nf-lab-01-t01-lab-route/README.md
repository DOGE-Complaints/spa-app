# SPA-NF-LAB-01-T01 — Lab route `#/lab/feed` under shell

**Status:** Done · P3 (`2026-10-13T11:17:12Z`) · P1.3 (`2026-10-13T11:04:31Z`)
**Story:** [`../STORY-SPA-NF-LAB-01-lab-route-blank-page.md`](../STORY-SPA-NF-LAB-01-lab-route-blank-page.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-01-lab-route-blank-page.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-01-lab-route-blank-page.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** false
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T11:04:31Z`
**Package:** `pkg-000127`
**UX appendix:** skip (Artboards N/A)
**Runtime prerequisite (later):** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Add `<Route path="/lab/feed" element={<FeedLabPage />} />` under shell in `App.jsx` (alongside next/feed). Reject route outside shell (interview Q1).

## Arch context
- Lab-first wave EPIC-SPA-22 — clean room route only.
- Product `#/next/feed` / `#/board` unchanged (FR-LAB-01.4).
- name ≠ create until P3 for page module (T02).

## Constraints
- Route **inside** `AppShellLayout` only.
- No gateway/threads invent.
- No mutate product feed hosts / classic board.
- Do not claim visual Done.

## AC / DoD
- [x] `#/lab/feed` registered under shell
- [x] Route outside shell absent
- [x] `#/next/feed` and `#/board` routes untouched
- [x] No product implement beyond route wire (page module = T02)

## Where to change
- `spa-app/src/App.jsx` (Route under shell)
- Page element target named in T02 (`pages/FeedLabPage.jsx` or `features/feed-lab/`)

## Verification
- Grep `lab/feed` in `App.jsx`
- local-five: open `#/lab/feed` after T02 page exists
- Confirm shell chrome present · no NextFeedHostPage mount
