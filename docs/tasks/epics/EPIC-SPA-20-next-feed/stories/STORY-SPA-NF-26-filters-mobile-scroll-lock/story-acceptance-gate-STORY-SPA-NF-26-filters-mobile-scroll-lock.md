# Story acceptance gate — STORY-SPA-NF-26-filters-mobile-scroll-lock

- **Story:** Filters mobile scroll + body lock
- **Package:** `pkg-000233-20261025-epic-spa-20-nf-26-filters-mobile-scroll-lock.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-25T10:46:31Z
- **Note:** P3 Execute Done · T01–T03 Done·BLOCK · structure Pass · CAPTURE-META `fails: []` · OP eye **Absent** · Partial visual=**BLOCK** · NF-25 M175 held · **no invent PASS** · no invent filter keys · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Sheet body scrolls on mobile | Structure Present · visual **BLOCK** | scroll region · clears nav · shot 01–02 |
| Background scroll locked while open | Structure Present · visual **BLOCK** | body lock · restore on close · Vitest |
| Vitest · OP eye Absent → **BLOCK** | Vitest green · gate **BLOCK** | nf26 **4/4** · CAPTURE-META |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/Filters/__tests__/Filters.nf26.test.jsx
cd spa-app && node scripts/tmp-nf26-capture.mjs
cd spa-app && npm run test:ui:filters
```

## Visual checklists

[`visual-checklists-filters-mobile-scroll-lock.md`](./visual-checklists-filters-mobile-scroll-lock.md) · Path A Present · OP eye Absent → **BLOCK**

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
