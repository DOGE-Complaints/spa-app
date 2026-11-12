# Story acceptance gate — STORY-SPA-CT-27-share-instagram-disabled-copy-text

- **Story:** Share Instagram disabled · Copy link text-only
- **Package:** `pkg-000185-20261020-epic-spa-24-ct-27-share-instagram-disabled-copy-text.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T19:53:14Z
- **Note:** P3 Execute · T01–T03 Done · Path A M152d shots 01–05 Present · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **225/225** · ct27 **4/4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Instagram listed + visually disabled | Match | `disabled`/`aria-disabled` · `row--disabled` · shot 01 · ct27 |
| Instagram click ≠ copy | Match | no clipboard · no toast · shot 02 · ct27 |
| Copy link works without icon | Match | `textOnly` · no img/⎘ · shot 03 · ct27 |
| Other networks unchanged | Match | TG/X/WA/FB icons Present · shot 04 · ct24 held |
| Vitest | Match | ct27 **4/4** · suite **225/225** |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
CT27_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct27-capture.mjs
```

## Visual checklists

[`visual-checklists-share-instagram-disabled-copy-text.md`](./visual-checklists-share-instagram-disabled-copy-text.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
