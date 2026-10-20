# CT-29 — `#/next/feed` civic media stub dogefeed (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T21:39Z (P5 APPLY)  
> **Package:** `pkg-000188` · EPIC-SPA-24  
> **Code home:** `FeedCivicPost` · `civicMediaStub.js` · `FeedLabCt29Stand` · `#/next/feed`  
> **Normative:** [gap analysis next/feed cutover](../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · Arch §15.2 · stub `/assets/dogefeed.png`  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| List + detail | Same `CIVIC_MEDIA_STUB_PATH` ← lab `LAB_MEDIA_STUB_PATH` (`/assets/dogefeed.png`) |
| Variant | `data-civic-variant="media-stub"` supersedes M150 `no-media` Done for interim |
| Asset | `public/assets/dogefeed.png` Present · no invent image-gen HTTP / per-issue unique art |
| Path A stand | `FeedLabCt29Stand` list+detail surfaces on `#/lab/feed` · OP eye Absent → BLOCK |

## Touchpoints

- `features/feed/FeedCivicPost.jsx` · `civicMediaStub.js` · `FeedCivicPost.css`
- Lab: `FeedLabCt29Stand.jsx` · `FeedLabPage.jsx`
- Tests: `feed.ct29` · `feedLab.ct29` · nf02/nf07 · Path A `scripts/tmp-ct29-capture.mjs`

## OOS

Image-gen API · ThreadMount (CT-28) · Reactions (CR-23) · carousel · invent OP PASS · invent HTTP

## Evidence

- Path A shots 01–05 Present (story pipeline full-cycle) · CAPTURE-META `fails: []`
- vitest feed+feed-lab+reactions-mount+thread-mount **442/442** · feed.ct29 **3/3** · feedLab.ct29 **2/2**
- P5: F1 WAIVED operator · F2 WAIVED info · TASKED=0 · activation none · Await P8
