# Story acceptance gate — STORY-SPA-NF-15-action-strip-density-unframe

- **Story:** Action strip density · React unframe (M162)
- **Package:** `pkg-000191-20261021-epic-spa-20-nf-15-action-strip-density-unframe.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-21T12:34:30Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots 01–05 Present · no invent OP PASS · vitest feed+feed-lab+i18n+reactions-mount+thread-mount **525/525** · feed.nf15 **2/2** · feedLab.nf15 **1/1**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| React flat like Comment/Share on civic strip | Match | shot 02 · probe `reactBorder=0px` |
| Icons 24 CSS px | Match | shot 03 · probe icons 24px · feed.nf15 CSS tip |
| Desktop 4v/8h · gap 6 · min-height 44 | Match | shot 04 · probe pad/mh · CSS |
| Narrow stacked proposal applied or documented reuse | Match | shot 05 · 420 token · narrow probe |
| CR-23 host held | Match | probe `hostLive` · `data-feed-cr23` |
| Focus chrome held | Match | `:focus-visible` CSS Present |
| Vitest | Match | suite **525/525** · nf15 **2/2** · lab **1/1** |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount src/i18n
NF15_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-nf15-capture.mjs
```

## Visual checklists

[`visual-checklists-action-strip-density-unframe.md`](./visual-checklists-action-strip-density-unframe.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
