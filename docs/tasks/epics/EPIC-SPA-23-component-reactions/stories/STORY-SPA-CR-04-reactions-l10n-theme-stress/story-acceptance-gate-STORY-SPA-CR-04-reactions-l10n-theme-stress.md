# Story acceptance gate — STORY-SPA-CR-04-reactions-l10n-theme-stress

- **Story:** Reactions L10N + theme stress (M160 on `#/lab/reactions`)
- **Package:** `pkg-000140-20261014-epic-spa-23-cr-04-reactions-l10n-theme-stress.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-14T12:18:43Z
- **Note:** Structure AC held · M160 stress checklist + screenshots Present · **OP eye Absent** · Partial visual = **BLOCK** (not PASS) · `data-lab-visual-done=false` · FixtureAdapter only · currentColor icons · no invent OP PASS · M155 OOS · no invent HTTP · no `#/next/feed` cutover

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Lab surfaces pass M160-style stress: ET/RU/EN × light/dark × 320/200% | PASS (structure) | T01–T03 · shots 01–05 · vitest |
| Icons currentColor / theme-safe | PASS (structure) | T02 · `CrReactionIcon` mask · shot 03 |
| Long ET/RU wrap; no clipped primary actions | PASS (structure) | T01 · T03 · shots 02/04/05 |
| No new API; FixtureAdapter only | PASS (structure) | `data-rm-adapter-default=fixture` · vitest |
| L10N policy: reuse Present; ids not raw; no hopeful/amused selectable | PASS (structure) | T01 · `threadsFeed.reactions.*` · CR_OMIT |
| OP eye PASS (Absent = BLOCK) | **BLOCK** | checklist+shots Present · OP Absent |

## Commands (live `2026-10-14T12:18:43Z`)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# → ok 3 paths (pkg-000140)
cd spa-app && npx vitest run src/features/reactions-mount
# → 4 files · 24 tests PASS
cd spa-app && PUPPETEER_EXECUTABLE_PATH="…/Google Chrome for Testing" node scripts/tmp-cr04-capture.mjs
# md5 01=c218e3fa3601 · 02=969de4ff9e72 · 03=230a81ee791e · 04=39d699a4917b · 05=fc1af309555e
```

## Visual checklists

[`visual-checklists-m160.md`](./visual-checklists-m160.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
