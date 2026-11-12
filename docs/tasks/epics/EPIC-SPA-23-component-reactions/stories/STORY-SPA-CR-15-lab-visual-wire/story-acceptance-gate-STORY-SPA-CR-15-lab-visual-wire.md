# Story acceptance gate — STORY-SPA-CR-15-lab-visual-wire

- **Story:** Lab visual wire both labs (OP-UX-MIRROR-m154 · CR-11…14)
- **Package:** `pkg-000151-20261016-epic-spa-23-cr-15-lab-visual-wire.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-16T11:13:45Z
- **Note:** Structure AC held · Path A screenshots Present · **OP eye Absent** · Gap v2 residual · Partial visual = **BLOCK** (not PASS) · no invent HTTP · no M155 · no `#/next/feed` · no invent OP PASS · no invent Gap v2 SVG

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Verify `#/lab/reactions` — tiles + accents | PASS (structure) | T01 · `rm-lab-cr15-picker` · shot 01 · facts reactionsFacts |
| Verify `#/lab/feed` — 4-zone + aggregate + picker | PASS (structure) | T02 · `data-lab-strip-zones=4` · aggregate · shot 02/03 · facts |
| Light/dark stress on feed still works | PASS (structure) | T03 · shot 04 · pageTheme=dark · CR-15 wire held |
| Vitest green for updated lab suites | PASS (structure) | `reactionsLab.cr15` + `feedLab.cr15` · suite **108**/108 |
| OP eye PASS (Absent = BLOCK) · Gap v2 residual | **BLOCK** | checklist+shots Present · OP Absent · Gap v2 residual fact |

## Commands (live `2026-10-16T11:13:45Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000151)
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
# → 108 PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr15-capture.mjs
# md5 01=d33258b2fe4f · 02=b9127eaf67fa · 03=12fe48fef3a7 · 04=1a3102aa9b84 · 05=449b90262284
```

## Visual checklists

[`visual-checklists-m154-lab-visual-wire.md`](./visual-checklists-m154-lab-visual-wire.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
