# Story acceptance gate — STORY-SPA-CR-17-reactors-popover

- **Story:** ReactorsPopover + Reactions≠picker (M155 A · polish §4.1–4.3)
- **Package:** `pkg-000153-20261017-epic-spa-23-cr-17-reactors-popover.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T10:39:51Z
- **Note:** P3 structure Done · OP eye **Absent** · Gap v2 `reactions.svg` **Absent** → Partial visual=**BLOCK** · no invent OP PASS · no invent people HTTP · no invent SVG · no Connect in compact popover

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Reactions/aggregate → people popover · picker closed | STRUCTURE | `ReactionsMount` `handleOpenPeople` · shots 01–02 · vitest cr17 |
| Popover M155 A structure (header, rows, no Connect) | STRUCTURE | `rm-reactors-popover` · `data-rm-connect=absent` · shot 01 |
| Loading/error fixtures covered | STRUCTURE | FixtureAdapter `peopleState` · vitest cr17 · shots 03–04 structure proxy |
| Reactions icon Runtime URL wired (Gap v2 Absent OK) | STRUCTURE | `FEED_POST_ACTION_ICON_URLS.reactions` · file Absent |
| Vitest: activateAggregate ≠ picker · popover testids | PASS | `reactionsMount.cr17` + feed-lab suite 120/120 |
| Verify labs light/dark | STRUCTURE | shots 01 light · 05 dark · `#/lab/feed` |
| OP eye PASS (Absent = BLOCK) · Gap v2 residual | **BLOCK** | OP eye Absent · `reactions.svg` Absent |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# ok 5 paths · pkg-000153
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
# 27 files · 120 tests passed
node spa-app/scripts/tmp-cr17-capture.mjs
# screenshots/full-cycle/01…05
```

## Visual checklists

[`visual-checklists-m155-reactors-popover.md`](./visual-checklists-m155-reactors-popover.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
