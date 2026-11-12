# Story acceptance gate — STORY-SPA-CT-14-spine-bubbles-fixtures

- **Story:** Thread spine · bubbles · nest fixtures (G-H7 · G-H8 · G-L2)
- **Package:** `pkg-000172-20261019-epic-spa-24-ct-14-spine-bubbles-fixtures.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-19T12:51:56Z
- **Note:** P3 structure Done · T01–T04 Done · Path A OP-UX residual §3 G-H7 · G-H8 · G-L2 · M153 nest tone · Partial visual=**BLOCK** · OP eye Absent · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **142/142**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Nested thread shows continuous spine + elbows | Structure Pass | `data-tm-spine` · elbow · shots 01–02 |
| Bubble color/spacing closer to M153 wash than white card | Structure Pass | `--tm-bubble-wash` · shot 03 |
| At least one default lab feed fixture nests ≥1 | Structure Pass | card 002 `lab-c-002-a1` · shot 05 |
| OP eye gate (Absent = BLOCK) | **BLOCK** | Absent · Partial=BLOCK · no invent PASS |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
CT14_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-ct14-capture.mjs
```

## Visual checklists

[`visual-checklists-spine-bubbles.md`](./visual-checklists-spine-bubbles.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
