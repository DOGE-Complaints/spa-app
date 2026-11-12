# Story acceptance gate — STORY-SPA-NF-19-map-basemap-follows-theme

- **Story:** Map basemap follows theme (OP mark 3)
- **Package:** `pkg-000197-20261021-epic-spa-20-nf-19-map-basemap-follows-theme.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-21T19:39:51Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots 01–05 Present · CAPTURE-META `fails: []` · probe light→positron · dark→dark-matter · theme toggle remount · MapLibreMap.nf19 **5/5** · map suite **10/10** · board-shell smoke **FAIL** (4173 navigation timeout · env) · no invent OP PASS

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Light theme → light basemap on feed map | Match | probe-light · shot 02 · positron URL |
| Dark theme → dark basemap | Match | probe-dark · shot 03 · dark-matter URL |
| Theme toggle updates map style | Match | probe-toggle · shot 04 · remount on `data-theme` |
| Shared MapLibre helper (no duplicate engine) | Match | `MapLibreMap.jsx` · BoardIssuesMap / FeedMapArea inherit |
| Vitest / markers | Match | MapLibreMap.nf19 **5/5** · map **10/10** |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/map
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" NF19_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-nf19-capture.mjs
```

## Visual checklists

[`visual-checklists-map-basemap-follows-theme.md`](./visual-checklists-map-basemap-follows-theme.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
