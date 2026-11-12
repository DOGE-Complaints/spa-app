# Task acceptance gate — SPA-SSR-03 (story)

- **Story:** STORY-SPA-SSR-03-board-list-map-toggle
- **Package:** `pkg-000076-20260902-epic-spa-13-ssr-03-board-list-map-toggle.yaml` **unchanged**
- **Result:** PASS
- **Date:** 2026-09-02T20:42:09Z
- **ui_scope:** visual · Path A M142

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| list\|map toggle on `/board` | PASS | `ListMapToggle` · BoardPage · screenshots |
| Eligibility lat+lon; ineligible disabled + helper | PASS | `issueGeo.js` · ListMapToggle tests |
| Pins ⊆ resultset; list = full R | PASS | BoardIssuesMap + list branch |
| Filters preserved both modes | PASS | same `filteredIssues` / URL draft; no bbox invent |
| No pack.json / cluster knobs / Mapbox token | PASS | MapLibre + Carto dark style URL |
| Icons + text labels | PASS | ic-view-list/map + L10N |
| ADR + Architecture | PASS | MapLibre · cluster zoom · popup→open · fitBounds |
| Screenshots full-cycle ≥1 happy | PASS | `screenshots/full-cycle/01…` + `02…` |
| Vitest | PASS | 582 passed / 2 skipped |

## Commands (live 2026-09-02T20:42:09Z)

```bash
cd spa-app && npx vitest run
SSR03_PORT=4180 PHASE=post-implement node tests/puppeteer/ssr03-list-map-screenshot.mjs
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
