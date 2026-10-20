# CT-16 — Dual-append post ownership (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T11:40Z (P3)  
> **Package:** `pkg-000174` · EPIC-SPA-24  
> **Code home:** `ThreadMount` · `FeedLabThreadMount` · `ThreadLabCanvas`  
> **Normative:** OP-UX M153a/b BUG-1 · Arch §12.1  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Write owner | `commentWriteOwner="host"\|"mount"\|"auto"` · FeedLab / ThreadLabCanvas pin **host** |
| Host path | Host snap appends once · ThreadMount must **not** local-append same id |
| Mount path | ThreadMount local-appends · dedupe by id if props already flushed |
| Markers | `data-tm-comment-write-owner` · `data-lab-ct16` · `data-lab-comment-write-owner=host` |
| Forest | After reply/root post: not `flat` from `duplicate-id` |

## Touchpoints

- `thread-mount/ThreadMount.jsx` · `feed-lab/.../FeedLabThreadMount.jsx` · `thread-mount/lab/ThreadLabCanvas.jsx`
- Tests: `threadMount.ct16` · `feedLab.ct16` · `tests/puppeteer/lab-feed-thread-ct16-dual-append.mjs`

## OOS

Forest rewrite beyond ownership · invent HTTP · attach picker (CT-17) · invent OP PASS · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **158**/158 · ct16 Present
- Path A shots 01–03 Present · puppeteer dual-append HARD_FAIL cleared on nest/root
