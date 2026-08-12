# Acceptance verification — SPA-SEARCH-04-T11

**Wave:** `run_mode=spa_search_04_audit_2026_06_18`  
**Audit gap:** F6 — dark native date popup (box path)  
**Date:** 2026-06-18

## Evidence

| AC | Result | Proof |
|----|--------|-------|
| `color-scheme: dark` on date inputs | PASS | [`Filters.css`](../../../../../../../src/components/Filters/Filters.css) `.board-filter-date-input { color-scheme: dark; }` |
| Custom calendar out of scope | N/A | Documented in task README Out of scope |
| UI smoke | PASS | `npm run test:ui:filters` (2026-06-18) |

## Limitation (documented)

Full native popup styling (fonts, border-radius) is not possible via CSS; operator chose box-path only — no custom calendar component.

## Commands

```bash
cd spa-app && npm run test:ui:filters && npx vitest run
```

**Suite:** 38 files / 150 passed.
