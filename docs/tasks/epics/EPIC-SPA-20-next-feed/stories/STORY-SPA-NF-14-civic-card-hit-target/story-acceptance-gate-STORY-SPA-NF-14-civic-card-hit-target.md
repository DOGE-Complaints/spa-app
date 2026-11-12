# Story acceptance gate — STORY-SPA-NF-14-civic-card-hit-target

- **Story:** Civic card hit-target (retire Open issue link)
- **Package:** `pkg-000190-20261021-epic-spa-20-nf-14-civic-card-hit-target.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-21T11:51:32Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots 01–05 Present · no invent OP PASS · vitest feed+feed-lab+i18n+reactions-mount+thread-mount **522/522** · feed.nf14 **2/2** · feedLab.nf14 **1/1**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Open issue row gone on list | Match | `feed-civic-post-open` Absent · shot 02 · feed.nf14 |
| Header+meta+title+summary+media navigate | Match | `feed-civic-post-hit` · media inside hit · probe |
| Action strip excluded | Match | actionsOutsideHit · shot 03 · feed.nf14 |
| Detail unchanged | Match | no hit / no open · shot 04 · feed.nf14 |
| A11y name + keyboard | Match | `aria-label` title · focus-visible CSS |
| Vitest | Match | suite **522/522** · nf14 **2/2** · lab **1/1** |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount src/i18n
NF14_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-nf14-capture.mjs
```

## Visual checklists

[`visual-checklists-civic-card-hit-target.md`](./visual-checklists-civic-card-hit-target.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
