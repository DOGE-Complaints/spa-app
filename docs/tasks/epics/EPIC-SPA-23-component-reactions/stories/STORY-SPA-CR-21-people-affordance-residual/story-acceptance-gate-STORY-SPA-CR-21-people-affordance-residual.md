# Story acceptance gate — STORY-SPA-CR-21-people-affordance-residual

- **Story:** People affordance residual (anchor · chip · OP eye)
- **Package:** `pkg-000157-20261018-epic-spa-23-cr-21-people-affordance-residual.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T12:15:16Z
- **Note:** P3 structure Done · peopleAnchor=trigger · chip Present · Reactions≠picker · aggregate→people · Gap v2 nw=24 · Path A shots 01–05 · OP eye **Absent** → Partial visual=**BLOCK** · no invent OP PASS/SVG/people HTTP

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| `#/lab/feed` Reactions → people · picker closed | STRUCTURE | shot 01 · peopleAnchor=trigger · picker false |
| Popover near Reactions control (not only React) | STRUCTURE | capture popLeft≡reactionsLeft `732.5` |
| Reactions hover = chip (not full-cell) | STRUCTURE | `feed-post-action-reactions-chip` · CSS chip hover |
| Populated aggregate → people | STRUCTURE | shot 03 · peopleAnchor=trigger |
| Vitest activateAggregate / reactions ≠ picker | PASS | cr21 · suite **140/140** |
| Verify labs light/dark · OP eye (Absent = BLOCK) | **BLOCK** | OP eye Absent · shots Present |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
# 31 files · 140 tests passed
node spa-app/scripts/tmp-cr21-capture.mjs
```

## Visual checklists

[`visual-checklists-people-affordance.md`](./visual-checklists-people-affordance.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
