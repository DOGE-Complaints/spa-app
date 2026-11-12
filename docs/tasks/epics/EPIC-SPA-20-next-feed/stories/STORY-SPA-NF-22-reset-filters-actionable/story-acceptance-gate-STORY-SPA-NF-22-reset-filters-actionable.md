# Story acceptance gate — STORY-SPA-NF-22-reset-filters-actionable

- **Story:** Reset Filters actionable + cursor
- **Package:** `pkg-000205-20261022-epic-spa-20-nf-22-reset-filters-actionable.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-22T14:14:42Z
- **Note:** P3 Execute · T01–T03 **Done** · structure Pass · Path A shots Present · CAPTURE-META `fails: []` · Filters **29/29** · nf22 **2/2** · OP eye **Absent** → Partial visual=**BLOCK** · no invent OP PASS / new filter fields · Await P4/P5

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Reset works from toolbar + panel footer | Structure Pass | dirty∨active enable · FeedToolbar + BoardToolbar · probe |
| Pointer when actionable | Structure Pass | `.board-filter-reset` cursor pointer · shot 02–03 probe |
| Vitest · OP eye | Structure Pass / **BLOCK** | Filters **29/29** · nf22 **2/2** · OP Absent |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/Filters
```

## Visual checklists

[`visual-checklists-reset-filters-actionable.md`](./visual-checklists-reset-filters-actionable.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
