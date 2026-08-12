# UI baseline — SEARCH-03 story anchor (T01)

**Route:** `/#/board`  
**Viewport:** `1536×1024`  
**Env:** `FAKE-OLD` (default dev)  
**Captured:** 2026-06-18 (pre SEARCH-03 code — reference state from SEARCH-02 closure)

## Purpose

Story-level UI anchor baseline per [spa-ui-visual-pipeline.md](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/spa-ui-visual-pipeline.md). SEARCH-03 visual delta (clear button) — T04 `ui-mockup-spec.md`.

## Selectors

| Zone | Selector |
|------|----------|
| Toolbar search row | `.board-filters-row` |
| Search input | `.board-search-input` |
| Search wrap | `.board-search-input-wrap` |

## Notes

- Pre-SEARCH-03: SearchInput without `.board-search-clear`.
- Post-SEARCH-03: verify clear button via `npm run test:ui:filters` + T04 spec.
