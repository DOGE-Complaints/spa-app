# SPA-REQ10-02-T02 — Mount + IssueThreadBlock root `initialSelected`

**Status:** Done · P3 `2026-09-28T18:22:01Z`  
**Story:** [`../STORY-SPA-REQ10-02-reaction-selected-reload.md`](../STORY-SPA-REQ10-02-reaction-selected-reload.md)  
**Decision Ref:** backlog STORY-SPA-REQ10-02 · REQ-19 · Option A  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-28T18:17:14Z`  
**Package:** `pkg-000088`

## Purpose

Propagate mapped thread-root `selected` from `LiveIssueThreadMount` → `IssueThreadBlock` → root `ReactionControls` as `initialSelected`. Keep summaryMarks/aggregateCount for counts. Keep empty-state reaction slot.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| Mount passes `threadRootSelected` | `LiveIssueThreadMount.jsx` |
| Root ReactionControls `initialSelected` (empty + populated) | `IssueThreadBlock.jsx` |
| `ReactionControls` accepts `initialSelected` | `ReactionControls.jsx` |

## AC / DoD

- [x] (P0) Root picker receives `initialSelected` from Option A tree — **AC-01**
- [x] (P0) Counts still from summaryMarks/aggregate — **AC-02**
- [x] (P0) Empty-state slot still mounts ReactionControls — Keep

## Where to change

- `spa-app/src/components/threads/LiveIssueThreadMount.jsx`
- `spa-app/src/components/threads/IssueThreadBlock.jsx`

## Out of scope

CommentTree (T03) · mapper (T01) · invent HTTP

## Verification

```bash
rg -n 'initialSelected|threadRootSelected' spa-app/src/components/threads/LiveIssueThreadMount.jsx spa-app/src/components/threads/IssueThreadBlock.jsx
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
