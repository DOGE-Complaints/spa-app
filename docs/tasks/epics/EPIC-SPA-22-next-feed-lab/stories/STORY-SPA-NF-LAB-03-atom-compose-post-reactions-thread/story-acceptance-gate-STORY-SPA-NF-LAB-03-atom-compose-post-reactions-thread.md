# Story acceptance gate — STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread

- **Story:** Atom compose post · reactions · thread on `#/lab/feed`
- **Package:** `pkg-000129-20261013-epic-spa-22-nf-lab-03-atom-compose-post-reactions-thread.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-13T12:42:25Z
- **Note:** Structure AC held · visual Path A checklists + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| 5 atom-composed cards on `#/lab/feed` | PASS | live facts · vitest nflab03 · shot `01` |
| No `BoardIssuePost` / `FeedCivicPost` / `FeedDiscussionBlock` on lab Done path | PASS | vitest ban · `banDom=false` |
| No classic `ReactionControls.css` on lab Done reaction path | PASS | `LabReactionChrome` lab CSS only · vitest |
| No threads/gateway HTTP | PASS | vitest · local `onSubmitComment` / no `onReact` HTTP |
| Visible ids `DOGEstonia-UusVeerenni-00N` | PASS | facts.cards · identity `publicLabel` |
| Discussion header ≠ «DISCUSSION» | PASS | facts.discussionCopy=`Thread` |
| M150 must-state + screenshot + OP | **BLOCK** | checklist Present · shot `02` · OP Absent |
| M154 must-state + screenshot + OP | **BLOCK** | checklist Present · shot `03` · OP Absent |
| M152/M153 must-state + screenshot + OP | **BLOCK** | checklist Present · shot `04` · OP Absent |
| M149 list rhythm + screenshot + OP | **BLOCK** | checklist Present · shot `01` · OP Absent |

## Commands (live `2026-10-13T12:42:25Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab/__tests__/feedLabCompose.nflab03.test.jsx \
  src/pages/__tests__/FeedLabPage.nflab01.test.jsx \
  src/features/feed-lab/__tests__/labFeedFixtures.nflab02.test.js
cd spa-app && PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:ui:board-shell
cd spa-app && PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node scripts/tmp-lab03-capture.mjs
```

## Visual checklists

[`visual-checklists-path-a.md`](./visual-checklists-path-a.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
