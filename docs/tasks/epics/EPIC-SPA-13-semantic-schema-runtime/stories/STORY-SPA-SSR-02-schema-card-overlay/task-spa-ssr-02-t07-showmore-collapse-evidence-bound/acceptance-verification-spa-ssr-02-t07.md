# Task acceptance gate — SPA-SSR-02-T07 (F2)

- **Story:** STORY-SPA-SSR-02-schema-card-overlay
- **Package:** `pkg-000075-20260902-epic-spa-13-ssr-02-schema-card-overlay.yaml` **unchanged**
- **Result:** PASS
- **Date:** 2026-09-02T20:30:25Z
- **Wave:** `spa_ssr_02_audit_2026_09_02`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Vitest >4 → `schema-card-overlay-more`; ≤4 absent | PASS | [`SchemaCardOverlay.test.jsx`](../../../../../../../src/components/SchemaCardOverlay/__tests__/SchemaCardOverlay.test.jsx) · 5 tests passed |
| Document bound=4 vs M141 «up to 3» | PASS | [`ui-mockup-spec.md`](../task-spa-ssr-02-t01-overlay-compact-card/ui-mockup-spec.md) §Compact collapse bound |
| No invent fields; no mandatory Link | PASS | showMore remains static `<p>`; no product AC reopen |

## Commands (live verification 2026-09-02T20:30:25Z)

```bash
cd spa-app && npx vitest run src/components/SchemaCardOverlay
rg -n 'COMPACT_COLLAPSE|bound|4' spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/task-spa-ssr-02-t01-overlay-compact-card/ui-mockup-spec.md
```
