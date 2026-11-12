# Story acceptance gate — STORY-SPA-NF-LAB-09-greenfield-discussion-plane

- **Story:** Greenfield discussion plane (M152 / M153)
- **Package:** `pkg-000135-20261013-epic-spa-22-nf-lab-09-greenfield-discussion-plane.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-13T16:30:20Z
- **Note:** Structure AC held · M152/M153 checklist + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Greenfield discussion modules under `feed-lab/post/discussion/` | PASS | T01 · FeedDiscussion* Present · nflab09 |
| No Deprecated discussion / FeedDiscussionBlock on Done path | PASS | vitest ban · live `banDom=false` |
| Comment strip → expand | PASS | live click + nflab09 |
| No classic DISCUSSION uppercase Done chrome | PASS | header «Thread» · ban scan |
| Literal bodies collapsed + expanded | PASS | previews + comment nodes |
| M152/M153 checklist + shots + OP eye | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-13T16:30:20Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000135)
cd spa-app && npm test -- --run src/features/feed-lab
# → 7 files · 28 tests PASS (nflab09 4/4)
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome" npm run test:ui:board-shell
# → EXIT 0
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome" node scripts/tmp-lab09-capture.mjs
# md5 01=1e2e43d39a6a · 02=bc8056c4ef6e
```

## Visual checklists

[`visual-checklists-m152.md`](./visual-checklists-m152.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
