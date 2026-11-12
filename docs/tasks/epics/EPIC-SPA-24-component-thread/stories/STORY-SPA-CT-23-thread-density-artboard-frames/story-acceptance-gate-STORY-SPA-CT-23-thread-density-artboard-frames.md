# Story acceptance gate — STORY-SPA-CT-23-thread-density-artboard-frames

- **Story:** Thread density · remove extra frames (artboard SSOT)
- **Package:** `pkg-000181-20261020-epic-spa-24-ct-23-thread-density-artboard-frames.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T15:14:35Z
- **Note:** P3 Execute · T01–T05 Done · Path A shots Present · no invent denser/HTTP/OP PASS · vitest feed-lab+thread-mount **201/201** · ct23 **6/6**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Extra discussion/section frames Absent vs artboard | Match | thread-host no border · IssueThreadBlock top hairline only · shot 01 |
| Bubble/spine/pills Match M153b | Match | tokens held · shot 02 · ct18+ct23 |
| Gaps Match artboard rhythm (OP eye) | Match (structure) | 12px/8px rhythm · shot 03 · OP Absent → BLOCK |
| No invent palette | Match | M153b hex held |
| Regression asserts on wrapper borders | Match | `threadMount.ct23` · `feedLab.ct23` |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
CT23_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct23-capture.mjs
```

## Visual checklists

[`visual-checklists-thread-density-artboard-frames.md`](./visual-checklists-thread-density-artboard-frames.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
