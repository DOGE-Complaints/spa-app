# SPA-CT-29-T01 — Media slot + stub on list civic card

**Status:** Done  
**Story:** [`../STORY-SPA-CT-29-next-feed-civic-media-stub.md`](../STORY-SPA-CT-29-next-feed-civic-media-stub.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-29-next-feed-civic-media-stub.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-29-next-feed-civic-media-stub.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T21:25:23Z`  
**Done:** `2026-10-20T21:34:58Z`  
**Package:** `pkg-000188`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · stub `/assets/dogefeed.png`

## Purpose

FR-CT-29.1 · 29.3: Media slot + stub on list civic card (FeedCivicPost / list host) · supersede `no-media` Done claim.

## Code Facts (verify)

- `FeedCivicPost.jsx` `data-civic-variant="media-stub"` · **Present** (was `no-media`)
- `/assets/dogefeed.png` · **Present** (`public/assets/dogefeed.png`)
- Soft reuse `CIVIC_MEDIA_STUB_PATH` ← `LAB_MEDIA_STUB_PATH` · **Present**

## Constraints

- Path A gap + stub · NO BRIEF · no UX gen · Partial=**BLOCK**  
- Same asset path as lab · no invent image-gen HTTP/OP PASS

## AC / DoD

- [x] List cards show dogefeed stub
- [x] no-media Done claim superseded
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedCivicPost.jsx` · `FeedCivicPost.css` · `civicMediaStub.js` · soft `labMediaStub.js` re-export

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed
```

P3: feed.ct29 list assert · shot 02 `1619fbf3d8d6`
