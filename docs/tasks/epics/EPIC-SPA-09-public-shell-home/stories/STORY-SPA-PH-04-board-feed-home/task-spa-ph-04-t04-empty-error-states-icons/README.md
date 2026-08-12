# SPA-PH-04-T04 — Empty / filtered-empty / error + icons

**Status:** Done — P3 2026-08-04T12:16:21Z
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) FR-PH-04.3/5/6/7  
**Depends on:** T01; T06 keys preferred  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T11:24:18Z

## Purpose
M132 states: Empty dataset (`ic-empty-board`); Filtered zero (distinct copy + Reset filters); Load error (`ic-cloud-error` + Try Again). No «Oops»; no false error; no giant illustration; no CAB `ic-story-empty`.

## Risk
Reusing generic empty for filtered-empty; raw API error text; marketing campaign empty; spinner for error.

## Code Facts (re-verify at execute)
- Legacy `t('noIssuesRecorded')` / `t('noResultsMatch')` in BoardPage — replace with `publicHome.board.*`.
- Icons catalog paths: `/icons/public-home/ic-empty-board.png`; `/icons/story-handoff/ic-cloud-error.png`; optional retry `ic-auto-resubmit`.
- Icons non-blocking: placeholder PNG OK; exact catalog paths in code.

## AC / DoD
- [x] (P0) Empty / filtered-empty / error+retry per M132 (FR-PH-04.3/5/6/7) → backlog AC #3–4.
- [x] (P0) Empty uses `ic-empty-board`; error calm diagnostic icon; no «Oops».
- [x] (P0) Filtered empty distinct from generic empty; Reset filters present.

## Where to change
- `spa-app/src/pages/BoardPage.jsx` (+ CSS)
- Icon `src` paths from catalog

## Out of scope
PH-06 Submit CTA on empty; new APIs; metrics; columns; inventing copy outside L10N table.

## Verification
```bash
test -f spa-app/public/icons/public-home/ic-empty-board.png || echo 'placeholder-ok'
test -f spa-app/public/icons/story-handoff/ic-cloud-error.png || echo 'placeholder-ok'
rg -n 'noIssuesRecorded|noResultsMatch|publicHome\.board|ic-empty-board|ic-cloud-error' spa-app/src/pages/BoardPage.jsx
```
