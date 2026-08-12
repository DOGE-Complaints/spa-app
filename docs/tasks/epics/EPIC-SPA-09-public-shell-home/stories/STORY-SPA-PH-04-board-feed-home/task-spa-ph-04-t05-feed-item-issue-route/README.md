# SPA-PH-04-T05 — Feed item → /issue/:id

**Status:** Done — P3 2026-08-04T12:16:21Z
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) FR-PH-04.4/8  
**Depends on:** T01  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T11:24:18Z

## Purpose
Each feed item navigates to existing `/issue/:id` (IssuePage / `GET /tallinn/issues/{id}`). Optional open-details affordance: `ic-chevron-right` (catalog #4).

## Risk
New detail API; broken links; inventing card chrome beyond M132 Results.

## Code Facts (re-verify at execute)
- Existing IssuePage route; detail is link-only — no new GET contract.
- Optional: `/icons/public-home/ic-chevron-right.png`.
- Reuse existing board card/status strings where applicable (not `publicHome.board.*` chrome).

## AC / DoD
- [x] (P0) Feed item → `/issue/:id` (FR-PH-04.4).
- [x] (P0) Optional chevron affordance per FR-PH-04.8 / catalog (non-blocking if PNG missing).

## Where to change
- `spa-app/src/pages/BoardPage.jsx` (feed item link/navigate)
- Optional chevron asset path

## Out of scope
New issue detail page rewrite; new gateway detail endpoints; filter package; L10N board chrome (T06).

## Verification
```bash
rg -n 'issue/|/issue/|navigate|Link' spa-app/src/pages/BoardPage.jsx
```
