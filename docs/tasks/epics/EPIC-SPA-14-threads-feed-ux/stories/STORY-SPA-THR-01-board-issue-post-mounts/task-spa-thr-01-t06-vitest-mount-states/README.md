# SPA-THR-01-T06 — Vitest mount states (fail-soft)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** FR-THR-01.6 / FR-THR-01.7 / FR-THR-01.9 · AC-SPA-THR-02 spirit  
**Depends on:** T01–T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T20:38:39Z
**Done:** 2026-09-22T20:46:40Z  
**Package:** `pkg-000077`

## Purpose
Vitest coverage for loading / empty / unavailable mount states: fail-soft keeps Issue readable; no mock social network / invent HTTP.

## Risk
Asserting live social API; fabricating comments in tests as product truth.

## Code Facts (re-verify at execute)
- Testids: `board-issue-post`, `issue-thread-block`
- No social HTTP invent — stub local props/state only

## AC / DoD
- [x] (P0) Vitest covers loading + empty + unavailable
- [x] (P0) Unavailable: Issue remains readable / Open issue present
- [x] (P0) No invent endpoints in tests

## Where to change
- `src/**/__tests__/*` near BoardIssuePost / IssueThreadBlock

## Out of scope
Puppeteer full-cycle (optional later) · THR-02…05 · invent HTTP

## Verification
```bash
cd spa-app && npx vitest run src --reporter=dot 2>&1 | tail -20
```
