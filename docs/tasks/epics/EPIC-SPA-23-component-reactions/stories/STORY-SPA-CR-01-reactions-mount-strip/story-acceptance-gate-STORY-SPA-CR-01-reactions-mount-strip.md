# Story acceptance gate — STORY-SPA-CR-01-reactions-mount-strip

- **Story:** Reactions mount strip (M154)
- **Package:** `pkg-000137-20261014-epic-spa-23-cr-01-reactions-mount-strip.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-14T10:42:39Z
- **Note:** Structure AC held · M154 checklist + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · no invent OP PASS · M155 OOS

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Strip states match M154 A insets; no theatrical `0` | PASS (structure) | T01 · shots 01–04 · vitest |
| Mount props host-agnostic; comment = same package + config | PASS (structure) | T02 · `ReactionsMount` · shot 05 |
| Slot contract = PostActionStrip / comment node (AC-24-08) | PASS (structure) | T03 · `postActionStripSlot.js` |
| Icons = Runtime URLs from CR-icon §Reuse (13 + chrome); no emoji interim | PASS (structure) | T04 · `crReactionIcons.js` · vitest |
| API = fixtures / CR-api; no invent HTTP; M155 OOS | PASS (structure) | `FixtureAdapter` · `data-m155-oos` |
| L10N: ids never user copy; hopeful/amused not selectable | PASS (structure) | T05 · reuse `threadsFeed.reactions.*` |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-14T10:42:39Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 5 paths (pkg-000137)
cd spa-app && npx vitest run src/features/reactions-mount
# → 1 file · 9 tests PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr01-capture.mjs
# md5 01=83af27a8161e · 02=d7ac40951373 · 03=f2ac6702f529 · 04=22f11b72415f · 05=15c8ed715347
```

## Visual checklists

[`visual-checklists-m154.md`](./visual-checklists-m154.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
