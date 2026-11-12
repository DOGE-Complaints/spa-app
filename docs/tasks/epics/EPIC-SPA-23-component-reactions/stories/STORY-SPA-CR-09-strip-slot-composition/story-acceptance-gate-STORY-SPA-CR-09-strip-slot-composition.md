# Story acceptance gate — STORY-SPA-CR-09-strip-slot-composition

- **Story:** Strip slot composition A+C+B (M154 + OP-UX-MIRROR composition §3.2)
- **Package:** `pkg-000145-20261015-epic-spa-23-cr-09-strip-slot-composition.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-15T19:48:00Z
- **Note:** Structure AC held · M154 + Path A screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · no invent OP PASS · Portal→CR-10 OOS · Theme→CR-08 OOS · M155 OOS · no invent HTTP · no `#/next/feed` · no production `FeedCivicPost` 4-zone mutate

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Strip shows 3 zones; Reactions text zone gone | PASS (structure) | T01 · `data-lab-strip-zones="3"` · shot 01 · vitest cr09 |
| Zone 1 = summary strip (empty/populated per CR-05) | PASS (structure) | T01/T02 · `reactSlot` → `FeedLabReactionsMount` · shots 02/03 |
| No second React under strip on root post | PASS (structure) | T03 · no `feed-post-discussion-reaction-slot` · shot 04 |
| `#/lab/feed` still opens discussion/comment flows | PASS (structure) | T02/T03 · Comment zone · shot 05 · nflab09 |
| Vitest / lab smoke updated | PASS (structure) | `feedLab.cr09.test.jsx` · feed-lab **43**/43 · board-shell 0 |
| Verify URL `http://127.0.0.1:5173/#/lab/feed` | PASS (structure) | capture base |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-15T19:48:00Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000145)
cd spa-app && npx vitest run src/features/feed-lab
# → feed-lab 43 PASS (incl. cr09 4/4)
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr09-capture.mjs
# md5 01=bddfac5ee5f7 · 02=eb269190722a · 03=4af1da0b4f31 · 04=49b6b8c03409 · 05=f9e22605877b
```

## Visual checklists

[`visual-checklists-m154-lab-feed-strip-composition.md`](./visual-checklists-m154-lab-feed-strip-composition.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
