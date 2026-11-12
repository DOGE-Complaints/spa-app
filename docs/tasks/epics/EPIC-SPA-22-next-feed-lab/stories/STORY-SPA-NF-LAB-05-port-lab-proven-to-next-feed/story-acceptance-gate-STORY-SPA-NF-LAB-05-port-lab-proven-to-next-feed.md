# Story acceptance gate — STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed

- **Story:** Port lab-proven chrome to `#/next/feed`
- **Package:** `pkg-000131-20261013-epic-spa-22-nf-lab-05-port-lab-proven-to-next-feed.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-13T13:17:15Z
- **Note:** P3 stop on **FR-LAB-05.1** — LAB-03/04 visual gates **BLOCK** · OP eye Absent · Partial visual · **no invent PASS** · no port Done claim · `#/board` untouched · no product mutate this wave

## Residual (hard dependency)

| Gate | Result | Fact |
|------|--------|------|
| LAB-03 Path A | **BLOCK** | OP eye Absent · `pkg-000129` · `2026-10-13T12:42:25Z` |
| LAB-04 M158 | **BLOCK** | OP eye Absent · `pkg-000130` · `2026-10-13T13:06:08Z` |
| LAB-05 port | **BLOCK** | Prerequisite unmet · T01–T04 not executed as Done |

## Prep inventory only (not Done)

| Fact | Location |
|------|----------|
| Next list still mounts BoardIssuePost shelter | `FeedListArea.jsx` · `data-vl-shelter="BoardIssuePost"` |
| Next `ReactionChrome` still imports classic Controls CSS | `reactions/ReactionChrome.jsx` → `ReactionControls.css` |
| Lab proven reference Present (structure) | `#/lab/feed` · LAB-03/04 structure · visual not PASS |

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Prerequisite: LAB-03/04 visual + OP PASS | **BLOCK** | residual table · no invent |
| No BoardIssuePost shelter on next Done | PENDING | not ported this wave |
| No ReactionControls.css on next reaction Done | PENDING | not ported this wave |
| `#/next/feed` visual pack + OP | PENDING | blocked by prerequisite |
| `#/board` smoke · `#/lab/feed` reference | N/A tip | `#/board` not mutated · board-shell EXIT 0 |
| Partial visual = BLOCK | **held** | story Result BLOCK |

## Commands

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:ui:board-shell
```

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
