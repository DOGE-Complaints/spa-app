# Story acceptance gate — STORY-SPA-NF-LAB-07-greenfield-post-card-chrome

- **Story:** Greenfield post card chrome (M150)
- **Package:** `pkg-000133-20261013-epic-spa-22-nf-lab-07-greenfield-post-card-chrome.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-13T15:48:00Z
- **Note:** Structure AC held · M150 checklist + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Target modules under `feed-lab/post/` | PASS | T01/T02 · `FeedPost*` Present · nflab07 |
| No `*Deprecated` import on greenfield Done path | PASS | vitest post/ ban · import from `post/` |
| No `ReactionControls.css` / product hosts | PASS | vitest · live `banDom=false` |
| Strip = 4 zones · no second React pill | PASS | `data-lab-strip-zones=4` · one react/card |
| Fixture ids visible · media 16:9 | PASS | live cards ×5 · `data-lab-media-ratio=16:9` |
| M150 checklist + shots + OP eye | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-13T15:48:00Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/pages/__tests__/FeedLabPage
# → 6 files · 24 tests PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome" npm run test:ui:board-shell
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome" node scripts/tmp-lab07-capture.mjs
# md5 01=f25eca318a8e · 02=3138676030de
```

## Visual checklists

[`visual-checklists-m150.md`](./visual-checklists-m150.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
