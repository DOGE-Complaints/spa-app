# SPA-THR-01-T02 — IssueThreadBlock mount under feed post

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** FR-THR-01.1 / FR-THR-01.6–01.11 · M143 §3–4 · [backlog](../../../../../../backlog-stories/threads-feed/STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Depends on:** T01  
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
Mount `IssueThreadBlock` (`data-testid="issue-thread-block"`) directly beneath civic Issue inside `BoardIssuePost`. Placement slots for loading/empty/populated/unavailable + action row; interactions owned by THR-02/03/04.

## Risk
Fake comments/counts; invent HTTP; full tree/picker in this task.

## Code Facts (re-verify at execute)
- No `IssueThreadBlock` in `src/` yet
- Icons: `ic-react` / `ic-discussion` / `ic-invite-organization` ON DISK

## AC / DoD
- [x] (P0) `issue-thread-block` under feed post
- [x] (P0) States A–D placement chrome (fail-soft unavailable keeps Issue readable)
- [x] (P0) Action row React / Discussion / Invite organization labels+icons (placement)
- [x] (P0) No invent HTTP / no mock social network

## Where to change
- `IssueThreadBlock` · `BoardIssuePost` · L10N keys (wired via T05)

## Out of scope
Issue page mount (T03) · continuous shell polish (T04) · THR-02 tree detail · invent HTTP

## Verification
```bash
rg -n 'issue-thread-block|IssueThreadBlock' spa-app/src || true
```
