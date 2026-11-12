# Story acceptance gate — STORY-SPA-CR-10-picker-portal-escape

- **Story:** Picker portal escape P1 (M154 + OP-UX-MIRROR composition §3.3)
- **Package:** `pkg-000146-20261015-epic-spa-23-cr-10-picker-portal-escape.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-15T19:58:06Z
- **Note:** Structure AC held · M154 + Path A screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · no invent OP PASS · card `overflow:hidden` **kept** · Theme→CR-08 OOS · strip CR-09 OOS · M155 OOS · no invent HTTP · no `#/next/feed`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Open picker on `#/lab/feed` root — full popover outside card clip | PASS (structure) | T01 · `data-rm-portal=body` · shots 01–03 · vitest cr10 |
| No reliance on removing card `overflow: hidden` as the fix | PASS (structure) | T04 · `FeedPostCard.css` overflow held · shot 05 · capture `card_overflow=hidden` |
| Outside click / Escape / light X still dismiss | PASS (structure) | T03 · cr05+cr10 dismiss · shot 04 |
| Vitest: portal host Present when open | PASS (structure) | `reactionsMount.cr10.test.jsx` · 4/4 |
| Verify URL `http://127.0.0.1:5173/#/lab/feed` | PASS (structure) | capture base |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-15T19:58:06Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000146)
cd spa-app && npx vitest run src/features/reactions-mount src/features/feed-lab
# → 18 files · 81 PASS (cr10 4/4)
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr10-capture.mjs
# md5 01=8f535e1dc9e9 · 02=dfdb9ea31022 · 03=8dd280baa239 · 04=bddfac5ee5f7 · 05=bddfac5ee5f7
# card_overflow=hidden
```

## Visual checklists

[`visual-checklists-m154-lab-feed-picker-portal.md`](./visual-checklists-m154-lab-feed-picker-portal.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
