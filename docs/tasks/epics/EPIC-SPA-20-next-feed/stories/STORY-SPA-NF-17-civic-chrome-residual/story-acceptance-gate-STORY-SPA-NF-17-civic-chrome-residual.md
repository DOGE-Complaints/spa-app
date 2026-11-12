# Story acceptance gate — STORY-SPA-NF-17-civic-chrome-residual

- **Story:** Civic chrome residual (OP marks 1 · 2 · 3 · 5)
- **Package:** `pkg-000194-20261021-epic-spa-20-nf-17-civic-chrome-residual.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-21T17:48:06Z
- **Note:** P3 Execute · T01–T05 Done · Path A shots 01–05 Present · no invent OP PASS · vitest feed+feed-lab+i18n+reactions-mount+thread-mount **533/533** · feed.nf17 **2/2**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| No actions `border-top` hairline under media on civic card | Match | shot 02 · probe `borderTop=0px` |
| Reaction marks ≥ tip 20 CSS px · primary 24 held | Match | shot 03 · probe marks 20 · icons 24 |
| Strip pad/margin tip applied · touch ≥44 | Match | shot 04 · probe pad 4 · margin 0 · mh 44 |
| Summary ≥ tip 1rem | Match | shot 05 · probe `summaryIs1rem` |
| Focus chrome held | Match | `:focus-visible` CSS Present |
| Vitest / markers | Match | suite **533/533** · nf17 **2/2** |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount src/i18n
NF17_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-nf17-capture.mjs
```

## Visual checklists

[`visual-checklists-civic-chrome-residual.md`](./visual-checklists-civic-chrome-residual.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
