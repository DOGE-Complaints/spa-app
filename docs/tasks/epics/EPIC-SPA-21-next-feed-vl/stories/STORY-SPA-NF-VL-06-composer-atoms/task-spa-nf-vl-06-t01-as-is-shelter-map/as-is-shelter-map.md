# T01 as-is / shelter map — STORY-SPA-NF-VL-06

**Stamp:** `2026-10-12T15:13:32Z` · **pkg-000120**

## As-is (pre-wire)

- `FeedDiscussionBlock.jsx` imported classic `components/threads/CommentComposer.jsx`.
- Light `CommentTree` reply also mounted classic CommentComposer.
- Ban: classic CommentComposer alone ≠ Done on `#/next/feed*` (AD-VL-01/02).
- VerifyWriteGate inside classic = VL-11 boundary (not claimed Done here).

## Post-wire (P3)

- Next Done path: `features/feed/composer/` · ComposerEntry / ThreadComposer.
- Classic `components/threads/CommentComposer.jsx` retained for `#/board`.
- No reopen NF-08 oval as body — oval chrome retained via next-owned ThreadComposer.
