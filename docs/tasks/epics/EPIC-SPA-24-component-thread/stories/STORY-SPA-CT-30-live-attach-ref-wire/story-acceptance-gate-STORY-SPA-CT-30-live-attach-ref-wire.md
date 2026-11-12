# Story acceptance gate — STORY-SPA-CT-30-live-attach-ref-wire

- **Story:** Live ThreadMount attachment upload + tree map
- **Package:** `pkg-000193-20261021-epic-spa-24-ct-30-live-attach-ref-wire.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-21T13:08:53Z
- **Note:** P3 Execute · T01–T05 Done · Path A shots 01–05 Present · uploadAttachment + published_url map · Lab Fixture held · no invent URL/OP PASS · vitest feed+feed-lab+thread-mount+reactions-mount+repositories+i18n **595/595** · feed.ct30 **2/2** · feedLab.ct30 **2/2**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Live post Ready files use `uploadAttachment` → locked POST path | Match | ThreadsSocialClient · LiveAdapter · feed.ct30 · client test |
| Tree map surfaces `published_url` to CommentAttachmentPreview | Match | mapThreadTreeToBlock · mapper tests |
| Honesty when url null | Match | publishedUrl null · mapper · CT-22 honesty |
| Lab held | Match | feedLab.ct30 · FixtureAdapter · shot 04 |
| Vitest | Match | suite **595/595** · ct30 **2/2** · lab **2/2** |
| OP eye on `#/next/feed` (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/thread-mount src/features/feed-lab src/repositories
CT30_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct30-capture.mjs
```

## Visual checklists

[`visual-checklists-live-attach-ref-wire.md`](./visual-checklists-live-attach-ref-wire.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
