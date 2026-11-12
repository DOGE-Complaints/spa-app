# Story acceptance gate — STORY-SPA-CR-02-reaction-picker

- **Story:** Reaction picker (M154 panels B–E)
- **Package:** `pkg-000138-20261014-epic-spa-23-cr-02-reaction-picker.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-14T11:25:20Z
- **Note:** Structure AC held · M154 B–E checklist + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · no invent OP PASS · M155 OOS · no invent HTTP

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Three groups on comment; root no selectable Moderation (AC-24-02) | PASS (structure) | T01 · shot 01/02 · vitest |
| Capacity ≤3 + Agree/Disagree XOR (AC-24-03) | PASS (structure) | T03 · shot 04 · vitest |
| Desktop + mobile surfaces per M154 B/C | PASS (structure) | T01 · T02 · shots 01/03 |
| React always opens picker | PASS (structure) | T03 · vitest |
| Save-error restore (AC-24-04) | PASS (structure) | T04 · shot 05 · vitest |
| Icons = CR-icon §Reuse Runtime URLs; API fixtures / CR-api map | PASS (structure) | T01–T05 · FixtureAdapter |
| L10N: reuse Present keys; ids not user copy | PASS (structure) | T05 · `threadsFeed.reactions.*` |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-14T11:25:20Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 5 paths (pkg-000138)
cd spa-app && npx vitest run src/features/reactions-mount
# → 2 files · 15 tests PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr02-capture.mjs
# md5 01=3f86a43438c7 · 02=1fa133031a7e · 03=3fad10e03f52 · 04=97b300f0deb7 · 05=919ab72cb433
```

## Visual checklists

[`visual-checklists-m154-picker.md`](./visual-checklists-m154-picker.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
