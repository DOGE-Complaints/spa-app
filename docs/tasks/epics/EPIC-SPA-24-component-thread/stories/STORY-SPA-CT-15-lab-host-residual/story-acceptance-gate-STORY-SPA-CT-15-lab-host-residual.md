# Story acceptance gate — STORY-SPA-CT-15-lab-host-residual

- **Story:** Lab host residual (G-M2 · G-M3 · G-M4 · G-L5)
- **Package:** `pkg-000173-20261019-epic-spa-24-ct-15-lab-host-residual.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-19T13:03:59Z
- **Note:** P3 structure Done · T01–T05 Done · Path A OP-UX residual §3 G-M2 · G-M3 · G-M4 · G-L5 · M152-C/E · M153 branch/G · Partial visual=**BLOCK** · OP eye Absent · no invent HTTP/aggregate/OP PASS · vitest feed-lab+thread-mount **151/151**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Narrow / branch disclosure reachable on lab without only CT08 canvas | Structure Pass | card 004 narrow · card 002 branch · shots 01–02 |
| Residents row absent unless aggregate confirmed | Structure Pass | omit vs confirmed · shots 03–04 |
| Issue id in heading when fixture supplies it | Structure Pass | `Discussion · Issue {publicId}` · shot 05 |
| OP eye gate (Absent = BLOCK) | **BLOCK** | Absent · Partial=BLOCK · no invent PASS |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
CT15_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-ct15-capture.mjs
```

## Visual checklists

[`visual-checklists-lab-host.md`](./visual-checklists-lab-host.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
