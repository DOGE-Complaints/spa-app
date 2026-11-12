# Story acceptance gate — STORY-SPA-NF-25-filters-popover-ux-redesign

- **Story:** Filters popover UX redesign
- **Package:** `pkg-000229-20261024-epic-spa-20-nf-25-filters-popover-ux-redesign.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-24T11:24:31Z
- **Note:** P3 structure Pass · M175 · width 440 · dates active 44px · Reset←Apply hierarchy · CAPTURE-META `fails: []` · OP eye **Absent** → Partial visual=**BLOCK** · **no invent PASS** · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| UX tip cited / intake PASS (M175) | Present | T01 Done · ui-mockup-spec |
| Width + date affordance structure (Apply) | structure Pass · visual **BLOCK** | shots 01–05 · probes · T02–T03 |
| Vitest · OP eye Absent → **BLOCK** until Apply + eye | Vitest Pass · OP eye **Absent** → **BLOCK** | nf25 **6/6** · CAPTURE-META |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/Filters/__tests__/Filters.nf25.test.jsx
cd spa-app && node scripts/tmp-nf25-capture.mjs
cd spa-app && npm run test:ui:filters
```

## Visual checklists

[`visual-checklists-filters-popover-ux-redesign.md`](./visual-checklists-filters-popover-ux-redesign.md) · Path A Present · OP eye Absent → **BLOCK**

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
