# UI mockup spec — SearchInput clear affordance (T04)

**extends:** [`mockup-01-dashboard-main-spec.md`](../../../../../../UX/mockups/initiation/mockup-01-dashboard-main-spec.md)  
**Route:** `/#/board`  
**Viewport:** `1536×1024`  
**Env:** `FAKE-OLD`  
**Operator gate:** mockup-01 SSOT + this delta (SEARCH-03 P3)

---

## Layout delta (toolbar SearchInput)

| Element | Selector | Metrics |
|---------|----------|---------|
| Wrap | `.board-search-input-wrap` | flex row; min-width 200px; max-width 280px; padding 6px 10px |
| Search icon | `.board-search-icon` | left; 14×14 svg |
| Input | `.board-search-input` | flex 1; transparent bg; no native cancel (`::-webkit-search-cancel-button` hidden) |
| Clear | `.board-search-clear` | 20×20; right of input; visible only when `value.length > 0` |

---

## States

### 1. Empty (default)

- No `.board-search-clear` in DOM.
- Placeholder from i18n `searchPlaceholder`.

### 2. With text

- `.board-search-clear` visible with `aria-label` = i18n `clear`.
- Click clear → empty value + URL `search` removed (debounced commit).

### 3. Focus

- `.board-search-input-wrap:focus-within` border highlight (existing Filters.css).

---

## Puppeteer selectors

```text
.board-search-input
.board-search-clear
.board-filters-row
```

## AC mapping

| AC | State |
|----|-------|
| #1 placeholder + clear | states 1–2 |
| #2 debounced URL | behavior (not layout) — vitest + BoardPage |
