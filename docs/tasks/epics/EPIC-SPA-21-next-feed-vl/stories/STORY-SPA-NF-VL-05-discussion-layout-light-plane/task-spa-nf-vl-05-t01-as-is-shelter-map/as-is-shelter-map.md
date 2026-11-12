# T01 as-is / shelter map — STORY-SPA-NF-VL-05

**Stamp:** `2026-10-12T14:57:13Z` · **pkg-000119**

## As-is (pre-wire)

- `FeedDiscussionBlock.jsx` imported classic `components/threads/CommentTree.jsx` and mounted it in expanded region.
- Classic CSS (`CommentTree.css`) = dark-oriented board skin (`rgba(255,255,255,…)`, fake identity disks).

## Ban

Classic CommentTree dark board skin ≠ Done on `#/next/feed*` (AD-VL-01/02 · arch `01-dual-plane-and-boundaries.md`).

## Post-wire (P3)

- Next Done path imports `features/feed/comments/CommentTree` (light plane).
- Classic `components/threads/CommentTree.jsx` retained for `#/board` only.
- Composer / Invite remain shelter until VL-06 / VL-12 — not claimed Done.

## Grep

`features/feed` product path: no import of `components/threads/CommentTree`.
