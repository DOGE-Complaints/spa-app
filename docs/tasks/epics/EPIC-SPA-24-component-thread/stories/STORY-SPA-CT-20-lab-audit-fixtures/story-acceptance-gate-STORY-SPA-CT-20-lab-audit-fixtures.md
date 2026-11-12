# Story acceptance gate — STORY-SPA-CT-20-lab-audit-fixtures

- **Story:** Lab audit fixtures + Puppeteer residual (LAB-1…4)
- **Package:** `pkg-000178-20261020-epic-spa-24-ct-20-lab-audit-fixtures.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T13:13:37Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots Present · LAB-1…4 CLOSED · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **177/177**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| loading / empty / unavailable reachable on lab | Match | CT-20 stands LAB1-* · shot 01 |
| post-fail stand reachable | Match | LAB2-fail · forcePostFail · shot 02 |
| attach-off stand reachable | Match | LAB3-attach-off · shot 03 |
| max-depth Reply block reachable | Match | LAB4-maxdepth · shot 04 |
| Expanded puppeteer suite exit 0 on covered asserts (or WAIVED listed) | Match | tmp-ct20-capture exit 0 · shot 05 |
| LAB-1…4 closed or OP-WAIVED | Match | [lab-waiver-log](./lab-waiver-log-STORY-SPA-CT-20.md) · all CLOSED · OP-WAIVED=none |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
CT20_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct20-capture.mjs
```

## Visual checklists

[`visual-checklists-lab-audit-fixtures.md`](./visual-checklists-lab-audit-fixtures.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
