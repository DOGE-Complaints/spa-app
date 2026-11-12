# Story acceptance gate — STORY-SPA-CR-19-people-sheet-lab-wire

- **Story:** People mobile sheet + lab wire (M155 C · polish §4.5)
- **Package:** `pkg-000155-20261018-epic-spa-23-cr-19-people-sheet-lab-wire.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T10:55:57Z
- **Note:** P3 structure Done · OP eye **Absent** · Gap v2 residual → Partial visual=**BLOCK** · no invent OP PASS/SVG/people HTTP · Reactions≠picker · FixtureAdapter · Live fail-closed · sheet max-height 88dvh verified (capture ~742.72px @844)

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Sheet usable ~390 / lab 320 stress | STRUCTURE | sheet stand + feed 390 shots 03–05 · `rm-dialog--sheet` · maxH 88dvh |
| Both labs open people without picker from Reactions | STRUCTURE | lab reactions stands · feed Reactions zone · vitest cr19 · shots 01–03 |
| Vitest cross-lab smoke | PASS | `reactionsMount.cr19` · suite **132/132** |
| Verify `#/lab/reactions` · `#/lab/feed` | STRUCTURE | Path A shots 01–05 |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | OP eye Absent · Gap v2 residual |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
# 29 files · 132 tests passed
node spa-app/scripts/tmp-cr19-capture.mjs
```

## Visual checklists

[`visual-checklists-m155-people-sheet.md`](./visual-checklists-m155-people-sheet.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
