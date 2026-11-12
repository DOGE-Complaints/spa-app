# Story acceptance gate — STORY-SPA-CR-06-picker-chrome-layout

- **Story:** Picker chrome / layout polish (M154 B/C + OP-UX-MIRROR §3.3)
- **Package:** `pkg-000142-20261015-epic-spa-23-cr-06-picker-chrome-layout.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-15T10:52:01Z
- **Note:** Structure AC held · chrome layout + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · FixtureAdapter only · no invent OP PASS · M155 OOS · no invent HTTP · no `#/next/feed` cutover

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Root hint below layers (`rm-picker-root-scope-hint` after groups) | PASS (structure) | T02 · shot 01 · vitest cr06 |
| No labeled Close; icon-only dismiss | PASS (structure) | T01 · shot 02 · vitest |
| Popover content-hug width (no over-wide gutter) | PASS (structure) | T03 · shot 03 · CSS `max-content` |
| Capacity + layers + XOR/capacity from CR-02 still hold | PASS (structure) | T01–T03 · cr02 suite · shot 04 |
| Vitest: hint order + close no visible Close text | PASS (structure) | T04 · 34/34 suite |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-15T10:51:30Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000142)
cd spa-app && npx vitest run src/features/reactions-mount
# → 6 files · 34 tests PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr06-capture.mjs
# md5 01=7030e3ecbf61 · 02=ac247678fe99 · 03=e64db58bca30 · 04=6e5b43c43af1 · 05=cb2e1f30fed6
```

## Visual checklists

[`visual-checklists-m154-picker-chrome.md`](./visual-checklists-m154-picker-chrome.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
