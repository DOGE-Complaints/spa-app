# Story acceptance gate — STORY-SPA-NF-21-filter-date-color-scheme

- **Story:** Filter date color-scheme follows theme
- **Package:** `pkg-000204-20261022-epic-spa-20-nf-21-filter-date-color-scheme.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-22T13:58:44Z
- **Note:** P3 Execute · T01–T02 **Done** · structure Pass · Path A shots Present · CAPTURE-META `fails: []` · probe nativeCount=2 · light/dark schemes · Filters **26/26** · nf21 **2/2** · OP eye **Absent** → Partial visual=**BLOCK** · no invent OP PASS / custom calendar · Await P4/P5

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Light theme calendar light | Structure Pass | `[data-theme=light]` scheme · shot 02 · probe light |
| Dark theme calendar dark | Structure Pass | `[data-theme=dark]` scheme · shot 03 · probe dark |
| Vitest · OP eye | Structure Pass / **BLOCK** | Filters **26/26** · nf21 **2/2** · OP Absent |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/Filters
```

## Visual checklists

[`visual-checklists-filter-date-color-scheme.md`](./visual-checklists-filter-date-color-scheme.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
