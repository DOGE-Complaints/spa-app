# Story acceptance gate — STORY-SPA-NF-16-more-menu-deferred

- **Story:** More (⋮) menu deferred (comment-out + memo)
- **Package:** `pkg-000192-20261021-epic-spa-20-nf-16-more-menu-deferred.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-21T12:53:22Z
- **Note:** P3 Execute · T01–T03 Done · Path A shots 01–05 Present · keep more.svg · TODO(NF-16) · no invent OP PASS · vitest feed+feed-lab+i18n+reactions-mount+thread-mount **527/527** · feed.nf16 **2/2**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| More not visible on live civic card | Match | probe `moreCount=0` · shot 02–05 · feed.nf16 |
| Gated/commented block + TODO Present | Match | `false && (` · TODO(NF-16) · feed.nf16 tip |
| ARCH-DELTA §4 held | Match | SSOT cite · restore path |
| more.svg not deleted | Match | asset Present · catalog held |
| Vitest | Match | suite **527/527** · nf16 **2/2** |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount src/i18n
NF16_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-nf16-capture.mjs
```

## Visual checklists

[`visual-checklists-more-menu-deferred.md`](./visual-checklists-more-menu-deferred.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
