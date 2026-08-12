# SPA-PH-04-T07 — Vitest feed states + no columns

**Status:** Done — P3 2026-08-04T12:16:21Z
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) AC + FR-PH-04.*  
**Depends on:** T01–T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T11:24:18Z

## Purpose
Vitest: no `board-columns`; loading/empty/filtered-empty/error paths; filter reuse still calls getIssues; `publicHome.board.*` key parity.

## Risk
Weak assertions that still pass with columns; skipping filtered-empty vs empty distinction.

## Code Facts (re-verify at execute)
- Existing BoardPage / publicHome test patterns under `spa-app/src/**/__tests__` or `*.test.*`.
- Mock `getIssues` for state matrix.

## AC / DoD
- [x] (P0) Tests assert no status/kanban columns.
- [x] (P0) States + filter reuse + key parity covered.

## Where to change
- New/extend vitest next to BoardPage / publicHomeDictionary

## Out of scope
Puppeteer/UI visual gate (Path A on T01 / story screenshots); inventing AC.

## Verification
```bash
cd spa-app && npm test -- --run BoardPage publicHome.board
```
