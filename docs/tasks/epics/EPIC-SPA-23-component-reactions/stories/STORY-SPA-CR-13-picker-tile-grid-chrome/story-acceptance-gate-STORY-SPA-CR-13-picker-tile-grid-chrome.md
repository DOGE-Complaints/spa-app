# Story acceptance gate — STORY-SPA-CR-13-picker-tile-grid-chrome

- **Story:** Picker tile grid + footer chrome (M154 B/C · OP-UX-MIRROR-m154 §4)
- **Package:** `pkg-000149-20261016-epic-spa-23-cr-13-picker-tile-grid-chrome.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-16T10:53:17Z
- **Note:** Structure AC held · Path A screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · keep CR-10 portal · no invent HTTP · no M155 · no Lucide · accents→CR-14 OOS · no `#/next/feed` · no invent OP PASS

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Desktop picker shows horizontal tiles per group | PASS (structure) | T01 · `data-rm-picker-layout=tile-grid` · shot 01 · grid class |
| Footer Cancel + Add reactions Present on popover | PASS (structure) | T02 · `rm-picker-cancel` / `rm-picker-add` · shot 03 |
| Sheet uses Done | PASS (structure) | T02 · `rm-picker-done` · shot 04 |
| Selected tile visual matches M154 tone | PASS (structure) | soft bg + border + check · shot 02/03 · accents→CR-14 residual |
| Vitest: grid · footer testids · root no moderation | PASS (structure) | `reactionsMount.cr13` · suite **94**/94 |
| Verify `#/lab/reactions` + `#/lab/feed` | PASS (structure) | capture facts layout/portal/footer/tiles/desc |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-16T10:53:17Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000149)
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
# → 94 PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr13-capture.mjs
# md5 01=2b794d08195d · 02=f6e8289cdca2 · 03=8c31985944f0 · 04=04ee1282312a · 05=8fa6a85b4b2d
```

## Visual checklists

[`visual-checklists-m154-picker-tile-grid.md`](./visual-checklists-m154-picker-tile-grid.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
