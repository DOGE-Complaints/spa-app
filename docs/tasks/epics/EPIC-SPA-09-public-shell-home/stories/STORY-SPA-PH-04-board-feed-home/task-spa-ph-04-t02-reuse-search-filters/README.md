# SPA-PH-04-T02 — Reuse SEARCH filters → getIssues

**Status:** Done — P3 2026-08-04T12:16:21Z
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) FR-PH-04.2  
**Depends on:** T01 (feed shell); SEARCH-02…05 Done  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T11:24:18Z

## Purpose
Keep existing filter toolbar + SEARCH contract wired to `issueService.getIssues`; toolbar visible in loading / error / empty states (M132).

## Risk
Reimplementing filter package; hiding toolbar on empty/error; inventing new query params outside api-req §2.1.

## Code Facts (re-verify at execute)
- SEARCH filters Done; matrix in [api-req §2.1](../../../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md).
- [`issueService.js`](../../../../../../../src/services/issueService.js) + BoardPage filter serializers.
- FR-04.2: **reuse** — do not reimplement filter package.

## AC / DoD
- [x] (P0) Existing SEARCH filters still drive `GET /tallinn/issues` (FR-PH-04.2) → backlog AC #2.
- [x] (P0) Toolbar visible in loading / error / empty (M132).
- [x] (P0) No new list API.

## Where to change
- `spa-app/src/pages/BoardPage.jsx` (toolbar mount + params → getIssues)
- Filter components / serializers already used by SEARCH

## Out of scope
New filter UX package; new gateway endpoints; columns; L10N board keys (T06); metrics.

## Verification
```bash
rg -n 'getIssues|filter' spa-app/src/pages/BoardPage.jsx spa-app/src/services/issueService.js
```
