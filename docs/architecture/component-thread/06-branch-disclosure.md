# CT-06 — Branch disclosure local (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T13:47:47Z (P3) · P5 APPLY `2026-10-18T13:51:05Z`  
> **Package:** `pkg-000164` · EPIC-SPA-24  
> **Code home:** `src/features/thread-mount/tree/{CommentTree,CommentNode}` · `config/threadMountConfig` branch copy · `#/lab/thread` stands S–W  
> **Normative:** OP-UX-MIRROR-m152-m153-m157-thread §4.2 T-coll/T-exp/T-err · M153 branch  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Config | `BRANCH_*` copy · `viewRepliesLabel` · `BRANCH_EXPAND_DELAY_MS` |
| CommentTree | `branchDisclosure` · per-id state collapsed/expanding/expanded/error · `branchExpandMode` sync\|delayed\|error |
| Honesty | `data-tm-branch-fetch=false` · View N only when count local · sync OK when children local |
| CommentNode | View replies · Loading replies… · Couldn’t load replies · Try again scoped |
| Lab | `#/lab/thread` stands S–W · Path A shots |

## Touchpoints

- `thread-mount/config/threadMountConfig.js`
- `thread-mount/tree/{CommentTree,CommentNode}.*`
- `thread-mount/{ThreadMount,IssueThreadBlock}.jsx` · `lab/ThreadLabCanvas.jsx`
- Tests: `threadMount.ct06`
- Lab verify: `#/lab/thread` · OP eye

## OOS

Invent OP PASS · invent branch-fetch HTTP · server pagination · tombstone prod inference · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **99**/99 · ct06 Present
- Path A shots md5: `a8b3bbe011cc` · `5651dac1a0cc` · `b38b0b162bd8` · `304091abce1d` · `df3fd27ee197`
- P5: TASKED=0 · F1 WAIVED operator · F2–F3 WAIVED info · activation none
