# Story acceptance gate — STORY-SPA-CR-20-gap-v2-icon-generate

- **Story:** Gap v2 icon generate + promote (reactions + react thumbs-up)
- **Package:** `pkg-000156-20261018-epic-spa-23-cr-20-gap-v2-icon-generate.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T12:07:24Z
- **Note:** P3 structure Done · Gap v2 files **Present** · `#/lab/feed` Reactions img natural 24×24 · OP eye **Absent** → Partial visual=**BLOCK** · no invent OP PASS · no multicolor/Lucide

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Runtime `reactions.svg` Present · `react.svg` thumbs-up | STRUCTURE | `ls` both Present · SHA `02d35604…` / `ec4922ba…` · cr20 vitest |
| `#/lab/feed` Reactions zone no broken img | STRUCTURE | capture meta naturalWidth 24 · shot 01 |
| Manifest + CR-icon Gap v2 → Reuse | STRUCTURE | manifest row · CR-icon §Gap v2 closed · ICON #10 |
| Vitest `existsSync(reactions.svg) === true` | PASS | cr17 flipped · cr20 · suite **136/136** |
| Verify `#/lab/feed` | STRUCTURE | Path A shots 01–05 |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | OP eye Absent |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
ls spa-app/public/icons/next-feed/actions/{react,reactions}.svg
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
# 30 files · 136 tests passed
node spa-app/scripts/tmp-cr20-capture.mjs
```

## Visual checklists

[`visual-checklists-gap-v2-icons.md`](./visual-checklists-gap-v2-icons.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
