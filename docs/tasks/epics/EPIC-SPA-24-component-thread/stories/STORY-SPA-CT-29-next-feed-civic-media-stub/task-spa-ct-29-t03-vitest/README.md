# SPA-CT-29-T03 — vitest src stub · not no-media Done

**Status:** Done  
**Story:** [`../STORY-SPA-CT-29-next-feed-civic-media-stub.md`](../STORY-SPA-CT-29-next-feed-civic-media-stub.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-29-next-feed-civic-media-stub.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-29-next-feed-civic-media-stub.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T21:25:23Z`  
**Done:** `2026-10-20T21:34:58Z`  
**Package:** `pkg-000188`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · stub `/assets/dogefeed.png`

## Purpose

FR-CT-29.5: Vitest — media Present · src = stub path · list+detail Match · not no-media Done.

## Code Facts (verify)

- `feed.ct29.test.jsx` · **Present** · nf02/nf07 updated off no-media Done
- Stub path `CIVIC_MEDIA_STUB_PATH` === `LAB_MEDIA_STUB_PATH` · **Present**
- Path A capture `scripts/tmp-ct29-capture.mjs` · shots 01–05 · **Present**

## Constraints

- No invent image-gen HTTP/OP PASS · Path A gap + stub · Partial=**BLOCK**

## AC / DoD

- [x] Vitest: src = `/assets/dogefeed.png`
- [x] list+detail Match
- [x] no-media Done claim not asserted

## Where changed

`src/features/feed/__tests__/feed.ct29.test.jsx` · nf02/nf07 · `feedLab.ct29.test.jsx` · `tmp-ct29-capture.mjs` · `FeedLabCt29Stand.jsx`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount
```

P3: **442/442** · feed.ct29 **3/3** · feedLab.ct29 **2/2** · md5 `180a71d167ed` · `1619fbf3d8d6` · `cb6cd7402a0b` · `8f57dd273016` · `37451973d01f`
