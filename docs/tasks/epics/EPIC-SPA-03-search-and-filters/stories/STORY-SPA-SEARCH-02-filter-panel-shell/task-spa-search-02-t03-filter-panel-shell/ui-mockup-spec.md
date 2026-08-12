# UI mockup spec — FilterPanel shell (T03)

**extends:** [`mockup-01-dashboard-main-spec.md`](../../../../../../UX/mockups/mockup-01-dashboard-main-spec.md)  
**delta refs:** [`mockup-10-dashboard-filter-status-spec.md`](../../../../../../UX/mockups/mockup-10-dashboard-filter-status-spec.md), [`mockup-13-dashboard-filter-reset-spec.md`](../../../../../../UX/mockups/mockup-13-dashboard-filter-reset-spec.md)  
**Route:** `/#/board`  
**Viewport:** `1536×1024` (desktop); `390×844` (narrow drawer)  
**Env:** `FAKE-OLD` (default dev)  
**Interview:** [`ui-interview-decisions.md`](./ui-interview-decisions.md) — принято 2026-06-17

---

## Layout

| Zone | Component | Selector |
|------|-----------|----------|
| Toolbar left | Search + Filters toggle + Reset | `.board-filters-row` |
| Filters toggle | `FilterPanel` trigger | `.board-filter-panel-toggle` |
| Panel body | Status/Type/Labels + extension slots | `.board-filter-panel-body` |
| Panel footer | Apply + Reset | `.board-filter-panel-footer` |
| Below toolbar | Active chips | `.board-active-filter-chips` |

---

## States

### 1. Panel closed (default)

- Toggle visible; `aria-expanded="false"`.
- No `.board-filter-panel-body` in DOM.
- Apply N/A; toolbar Reset disabled if no filters.

### 2. Panel open (pending draft)

- Toggle `aria-expanded="true"`.
- Body visible with three filter triggers inside `.board-filter-panel-primary`.
- Extension slots empty: `data-slot="institution|date|geo"`.
- Apply **disabled** when `pending === applied` (not dirty).

### 3. Panel open (dirty)

- User changed status/type/labels in panel.
- Apply **enabled** (`.board-filter-apply:not(:disabled)`).
- URL **unchanged** until Apply click.

### 4. Applied filters

- Chips row visible (`.board-active-filter-chips`).
- URL hash contains `status=`, `type=`, `labels=` as CSV.
- Panel may be open or closed.

### 5. Narrow viewport (`max-width: 768px`)

- Panel body = bottom-sheet (`.board-filter-panel-body` fixed bottom).
- Backdrop `.board-filter-panel-backdrop` closes panel on click.

---

## Interactions

| Action | Expected |
|--------|----------|
| Click «Фильтры» | Toggle panel open/close |
| Toggle status in panel | Updates pending only |
| Click Apply | `pending → applied`, URL update, fetch |
| Click toolbar Reset | Clears all + URL clean |
| Remove chip | Immediate apply for that filter |
| Deep link `?status=NEW&type=INCIDENT` | Restores applied state on load |

---

## Enum canon (gateway)

- Status: `NEW`, `IN_REVIEW`, `PUBLISHED`
- Type: `IMPROVEMENT`, `SERVICE_REQUEST`, `INCIDENT`

---

## Verification

- Vitest: `FilterPanel.test.jsx`, `BoardPage.filterPanel.test.jsx`
- Puppeteer: `npm run test:ui:filters`
- Screenshots: `ui-baseline/` + `ui-baseline/post-implement/`
