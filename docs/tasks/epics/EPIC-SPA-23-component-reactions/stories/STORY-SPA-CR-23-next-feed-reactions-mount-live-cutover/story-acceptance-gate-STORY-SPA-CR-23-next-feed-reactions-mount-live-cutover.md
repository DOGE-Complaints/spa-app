# Story acceptance gate — STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover

- **Story:** `#/next/feed` ReactionsMount Live cutover
- **Package:** `pkg-000187-20261020-epic-spa-23-cr-23-next-feed-reactions-mount-live-cutover.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T21:15:55Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots 01–05 Present · no invent HTTP/OP PASS · vitest feed+reactions-mount+feed-lab+thread-mount **437/437** · feed.cr23 **4/4** · feedLab.cr23 **2/2**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| ReactionsMount on next/feed strip | Match | `FeedCivicPost` → `FeedReactionsMount` · `data-testid="reactions-mount"` · shot 02 |
| Comment target when CT-28 Present | Match | `FeedThreadMount` `renderCommentReactions` · `target=comment` · shot 03 |
| FeedReactionsStrip not Done surface | Match | `data-vl-done-claim="false"` · `data-cr23-retired` · nfvl03 |
| ThreadsSocialClient only | Match | `createLiveAdapter` · `adapter.kind=live` · feed.cr23 |
| People Live fail-closed | Match | `listReactors` fail · `inventHttp: false` · feed.cr23 |
| Lab held | Match | `FeedLabReactionsMount` `data-rm-adapter=fixture` · shot 05 · feedLab.cr23 |
| Vitest | Match | suite **437/437** · feed.cr23 **4/4** · feedLab.cr23 **2/2** |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/reactions-mount src/features/feed-lab src/features/thread-mount
CR23_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-cr23-capture.mjs
```

## Visual checklists

[`visual-checklists-next-feed-reactions-mount-live-cutover.md`](./visual-checklists-next-feed-reactions-mount-live-cutover.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
