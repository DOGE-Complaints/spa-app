# Story acceptance gate — STORY-SPA-CR-22-media-strip-flush-residual

- **Story:** Media–strip flush residual (OP eye)
- **Package:** `pkg-000158-20261018-epic-spa-23-cr-22-media-strip-flush-residual.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T12:25:27Z
- **Note:** P3 structure Done · measure cause Present (layout gap **0** · plate bg removed) · Path A shots 01–05 · vitest **143/143** · OP eye **Absent** → Partial visual=**BLOCK** · no invent OP PASS/SVG/HTTP · CR-16 chip held

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Documented cause note (measure) | STRUCTURE | [`measure-cause-CR-22.md`](./measure-cause-CR-22.md) · gap=0 · plate bg |
| OP eye: strip hugs media on lab feed | **BLOCK** | OP Absent · geometry gap=0 · mediaBg transparent |
| Detail parity if same anatomy | STRUCTURE | `FeedIssueDetailBody.css` transparent plate |
| Vitest/layout marker Present · no chip regression | PASS | cr22 · suite **143/143** · chip CSS held |
| Verify `#/lab/feed` | STRUCTURE | Path A shots 01–05 · capture gap=0 |
| OP eye gate (Absent = BLOCK) | **BLOCK** | OP eye Absent |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/reactions-mount
# 32 files · 143 tests passed
node spa-app/scripts/tmp-cr22-measure.mjs
node spa-app/scripts/tmp-cr22-capture.mjs
```

## Visual checklists

[`visual-checklists-media-flush.md`](./visual-checklists-media-flush.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
