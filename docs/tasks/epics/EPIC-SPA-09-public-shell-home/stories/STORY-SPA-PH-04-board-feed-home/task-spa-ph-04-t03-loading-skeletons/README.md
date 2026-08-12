# SPA-PH-04-T03 — Loading skeletons M132

**Status:** Done — P3 2026-08-04T12:16:21Z
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) FR-PH-04.3  
**Depends on:** T01  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T11:24:18Z

## Purpose
Loading state per M132: **CSS skeleton** feed placeholders — **not** spinner icon (`ic-spinner.png`).

## Risk
Using spinner icon; blocking skeleton behind spinner; missing accessible loading label (`publicHome.board.loading.accessible` via T06).

## Code Facts (re-verify at execute)
- M132 Loading state in mockup SSOT.
- Backlog: Loading CSS skeleton — **не** `ic-spinner.png`.
- Loading a11y key: `publicHome.board.loading.accessible` (T06).

## AC / DoD
- [x] (P0) Loading uses CSS skeleton, not spinner icon (FR-PH-04.3) → backlog AC #3 loader.
- [x] (P0) Aligns to M132 Loading artboard (extends T01 Path A).

## Where to change
- `spa-app/src/pages/BoardPage.jsx` + CSS skeleton styles

## Out of scope
Empty/error (T04); L10N key wiring (T06 may land first/alongside); spinner assets; new APIs.

## Verification
```bash
rg -n 'skeleton|loading|ic-spinner' spa-app/src/pages/BoardPage.jsx spa-app/src/pages/BoardPage.css
```
