# Story acceptance gate — STORY-SPA-CR-05-strip-open-dismiss

- **Story:** Strip open / dismiss (Facebook-like · M154 + OP-UX-MIRROR §3.1–3.2)
- **Package:** `pkg-000141-20261015-epic-spa-23-cr-05-strip-open-dismiss.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-15T10:24:52Z
- **Note:** Structure AC held · open/dismiss + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · FixtureAdapter only · no invent OP PASS · M155 OOS · no invent HTTP · no `#/next/feed` cutover

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Empty: React visible; opens picker on click | PASS (structure) | T01 · shot 01–02 · vitest cr05 |
| Populated: React absent; aggregate hover highlights + opens; click opens | PASS (structure) | T01–T02 · shots 03–04 · vitest |
| Outside click closes picker | PASS (structure) | T03 · vitest outside pointerdown |
| Top-right icon-only close uses `/icons/next-shell/actions/close.svg` | PASS (structure) | T03 · shot 05 · vitest |
| Escape closes | PASS (structure) | T03 · vitest Escape |
| Vitest covers empty/populated open + outside dismiss | PASS (structure) | T04 · 30/30 suite |
| No M155; no invent HTTP | PASS (structure) | FixtureAdapter · `data-m155-oos` |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-15T10:24:52Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 4 paths (pkg-000141)
cd spa-app && npx vitest run src/features/reactions-mount
# → 5 files · 30 tests PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr05-capture.mjs
# md5 01=3d437929c60a · 02=36a4f5a4e551 · 03=bf22eae2b206 · 04=a3ed48e785f8 · 05=fe6ed236ee5d
```

## Visual checklists

[`visual-checklists-m154-open-dismiss.md`](./visual-checklists-m154-open-dismiss.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
