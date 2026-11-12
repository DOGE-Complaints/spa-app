# Story acceptance gate — STORY-SPA-CT-29-next-feed-civic-media-stub

- **Story:** `#/next/feed` civic media stub (dogefeed)
- **Package:** `pkg-000188-20261020-epic-spa-24-ct-29-next-feed-civic-media-stub.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T21:34:58Z
- **Note:** P3 Execute · T01–T03 Done · Path A shots 01–05 Present · no invent image-gen HTTP/OP PASS · vitest feed+feed-lab+reactions-mount+thread-mount **442/442** · feed.ct29 **3/3** · feedLab.ct29 **2/2**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| List cards show dogefeed stub | Match | `FeedCivicPost` media · `src=/assets/dogefeed.png` · shot 02 |
| Detail shows same stub | Match | `FeedIssueDetail` → `FeedCivicPost` · shot 03 · feed.ct29 |
| Single asset path | Match | `CIVIC_MEDIA_STUB_PATH` === `LAB_MEDIA_STUB_PATH` · probe list=detail |
| no-media Done claim superseded | Match | `data-civic-variant="media-stub"` · shot 04 · not `no-media` |
| Vitest | Match | suite **442/442** · feed.ct29 **3/3** · feedLab.ct29 **2/2** |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount
CT29_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct29-capture.mjs
```

## Visual checklists

[`visual-checklists-next-feed-civic-media-stub.md`](./visual-checklists-next-feed-civic-media-stub.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
