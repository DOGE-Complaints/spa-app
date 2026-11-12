# SPA-THR-01-T01 — BoardIssuePost wrap IssueCard on `/board`

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** FR-THR-01.1 / FR-THR-01.2 / FR-THR-01.5 · [backlog](../../../../../../backlog-stories/threads-feed/STORY-SPA-THR-01-board-issue-post-mounts.md) · [arch 01](../../../../../../architecture/threads-feed-ux/01-composition-and-mounts.md)  
**Depends on:** PH-04 · M143  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T20:38:39Z
**Done:** 2026-09-22T20:46:40Z  
**Package:** `pkg-000077`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.png
```

## Purpose
Wrap each feed Issue row in `BoardIssuePost` (`data-testid="board-issue-post"`) containing existing civic `IssueCard` chrome. Civic Issue remains root; do not replace Open issue.

## Risk
Two-box pre-1.1 layout; inventing social author header; invent HTTP.

## Code Facts (re-verify at execute)
- Feed maps `IssueCard` only: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) ~L375 under `board-feed`
- No `BoardIssuePost` in `src/` yet

## AC / DoD
- [x] (P0) `board-issue-post` wraps Issue card on `/board`
- [x] (P0) Civic chrome + Open issue remain primary (FR-THR-01.2)
- [x] (P0) No invent HTTP / Facebook assets

## Where to change
- `BoardPage.jsx` · new `BoardIssuePost` component (arch 01)

## Out of scope
Thread block body (T02) · Issue page mount (T03) · THR-02…05 interactions · invent HTTP · SSR/BUG pkgs

## Verification
```bash
rg -n 'board-issue-post|BoardIssuePost' spa-app/src || true
```
