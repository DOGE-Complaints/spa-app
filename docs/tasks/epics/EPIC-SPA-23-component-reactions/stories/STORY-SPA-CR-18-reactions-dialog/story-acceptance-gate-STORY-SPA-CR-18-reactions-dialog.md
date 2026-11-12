# Story acceptance gate — STORY-SPA-CR-18-reactions-dialog

- **Story:** ReactionsDialog (M155 B · polish §4.4)
- **Package:** `pkg-000154-20261018-epic-spa-23-cr-18-reactions-dialog.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T10:47:25Z
- **Note:** P3 structure Done · OP eye **Absent** → Partial visual=**BLOCK** · no invent OP PASS · no invent people HTTP · no picker inside dialog · Connect stub only

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Dialog tabs filter fixture people honestly | STRUCTURE | `ReactionsDialog` tabs · shot 02 · vitest cr18 |
| Connect stub feedback Present | STRUCTURE | `connectUnavailableYet` · shot 03 |
| You without Connect | STRUCTURE | `rm-dialog-you` · shot 01/04 |
| Empty/loading/error covered | STRUCTURE | B2 empty vitest · popover error no View all |
| Vitest B* states | PASS | `reactionsMount.cr18` · suite **125/125** |
| Verify labs | STRUCTURE | shots 01–05 · `#/lab/feed` light/dark |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | OP eye Absent |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
# 28 files · 125 tests passed
node spa-app/scripts/tmp-cr18-capture.mjs
```

## Visual checklists

[`visual-checklists-m155-reactions-dialog.md`](./visual-checklists-m155-reactions-dialog.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
