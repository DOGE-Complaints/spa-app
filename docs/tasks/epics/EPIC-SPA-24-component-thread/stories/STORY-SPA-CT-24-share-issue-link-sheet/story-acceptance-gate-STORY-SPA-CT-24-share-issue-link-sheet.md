# Story acceptance gate — STORY-SPA-CT-24-share-issue-link-sheet

- **Story:** Share public Issue link sheet
- **Package:** `pkg-000182-20261020-epic-spa-24-ct-24-share-issue-link-sheet.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T15:26:53Z
- **Note:** P3 Execute · T01–T05 Done · Path A M152d shots 01–05 Present · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **207/207** · ct24 **6/6**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Share opens popover (wide) / bottom sheet (narrow) | Match | `data-lab-share-surface` · shots 01–02 · ct24 |
| Six rows + five network SVGs Present | Match | `/icons/next-feed/share/*` · shot 03 · ct24 |
| Public Issue URL when available | Match | fixture `publicIssueUrl` · `data-lab-share-url=present` |
| Lab missing URL → D honesty | Match | shot 05 · ct24 honesty |
| `Link copied` on copy | Match | shot 04 · ct24 toast |
| Vitest | Match | feedLab.ct24 **6/6** · suite **207/207** |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
CT24_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct24-capture.mjs
```

## Visual checklists

[`visual-checklists-share-issue-link-sheet.md`](./visual-checklists-share-issue-link-sheet.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
