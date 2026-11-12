# Story acceptance gate — STORY-SPA-NF-LAB-08-greenfield-reactions-plane

- **Story:** Greenfield reactions plane (M154)
- **Package:** `pkg-000134-20261013-epic-spa-22-nf-lab-08-greenfield-reactions-plane.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-13T16:09:25Z
- **Note:** Structure AC held · M154 checklist + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Greenfield reaction modules under `feed-lab/post/reactions/` | PASS | T01 · FeedReaction* Present · nflab08 |
| Zero Deprecated / ReactionChrome / Controls.css on Done path | PASS | vitest ban · live `banDom=false` |
| Zero emoji-soup / omit-emoji marks on lab Done | PASS | nflab08 emoji scan · labels only |
| No second React pill under strip | PASS | one `react`/card ×5 |
| Root picker · no active Moderation group | PASS | `data-lab-moderation=absent` · no layer DOM |
| M154 checklist + shots + OP eye | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-13T16:09:25Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000134)
cd spa-app && npm test -- --run src/features/feed-lab
# → 6 files · 24 tests PASS (nflab08 4/4)
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome" npm run test:ui:board-shell
# → EXIT 0
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome" node scripts/tmp-lab08-capture.mjs
# md5 01=542edf836ad7 · 02=ccdf80b9d53c
```

## Visual checklists

[`visual-checklists-m154.md`](./visual-checklists-m154.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
