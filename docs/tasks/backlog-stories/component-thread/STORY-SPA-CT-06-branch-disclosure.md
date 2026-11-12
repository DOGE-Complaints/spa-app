# STORY-SPA-CT-06 — Branch collapse / expand / error (local)

## Meta

- **Key:** `STORY-SPA-CT-06-branch-disclosure`
- **Package:** [component-thread](INDEX.md)
- **Status:** P3/P5 Done · tip · gate **BLOCK** · `pkg-000164` · `2026-10-18T13:51:05Z` · Await P8
- **Depends on:** CT-03
- **UX mirror:** §4.2 T-coll/T-exp/T-err
- **Arch:** §10 forbidden invent branch HTTP

## FR

- **FR-CT-06.1** Collapsed branch: View N replies only when count derivable from complete local tree.  
- **FR-CT-06.2** Expanding: local progress chrome · rest of tree intact.  
- **FR-CT-06.3** Expand error: Couldn’t load replies · Try again · scoped.  
- **FR-CT-06.4** If full tree already local: disclosure may be synchronous — **no fake loader required**.  
- **FR-CT-06.5** No invented branch-fetch endpoint.

## Вне scope

Server pagination · invent HTTP · tombstone prod inference

## Acceptance Criteria

- [x] Collapse/expand on fixture tree — STRUCTURE (OP eye Absent)  
- [x] Error stand without invent fetch — STRUCTURE  
- [x] Vitest local disclosure — PASS (`threadMount.ct06`)  
- [ ] OP eye — **BLOCK** Partial visual  

## Technical subtasks

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-06-t01-branch-state` | Done | collapsed/expanding/error per branch id | CommentTree | 06.1–06.3 |
| `task-spa-ct-06-t02-sync-vs-async` | Done | Sync path when children local · optional delayed fixture for expanding stand | lab stands S–W | 06.4 |
| `task-spa-ct-06-t03-vitest-branch` | Done | No network invent · state markers | tests + shots | 06.5 · AC |

## DoD

Branch UX present without fake APIs.
