# SPA-THR-01-T03 — Same IssueThreadBlock on `/issue/:id`

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** FR-THR-01.12–01.16 · M148 · [backlog](../../../../../../backlog-stories/threads-feed/STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Depends on:** T02  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-09-22T20:38:39Z
**Done:** 2026-09-22T20:46:40Z  
**Package:** `pkg-000077`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.png
```

## Purpose
Keep civic Issue detail body on `/issue/:id` and mount the **same** `IssueThreadBlock` below — no second detail-only social product; do not delete the route.

## Risk
Forked thread UI; deleting `/issue/:id`; invent HTTP.

## Code Facts (re-verify at execute)
- Route `/issue/:id` in [`App.jsx`](../../../../../../../src/App.jsx)
- Issue page host exists — re-verify mount point at execute

## AC / DoD
- [x] (P0) Same `issue-thread-block` on Issue page (M148)
- [x] (P0) Detail remains primary; thread does not replace detail
- [x] (P0) Empty/populated/unavailable semantics match feed (parity)
- [x] (P0) Route `/issue/:id` not removed

## Where to change
- Issue page · shared `IssueThreadBlock`

## Out of scope
Feed wrap (T01) · invent HTTP · THR-02…05 · Facebook assets

## Verification
```bash
rg -n 'issue-thread-block|/issue/' spa-app/src/pages spa-app/src/App.jsx || true
```
