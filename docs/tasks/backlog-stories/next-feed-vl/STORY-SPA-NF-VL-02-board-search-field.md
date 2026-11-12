# STORY-SPA-NF-VL-02 — BoardSearchField

## Meta
- **Key:** `STORY-SPA-NF-VL-02-board-search-field`
- **Package:** [next-feed-vl](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P3 (`2026-10-12T13:59:07Z`) · gate PASS · `pkg-000116`
- **Depends on:** NF-12 Done (search wire); DS §4 `BoardSearchField`; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** next-feed `BoardSearchField` surface — Filters `SearchInput` / `board-search-*` **not** Done chrome on `#/next/feed*`
- **Concern folder:** `features/feed/search/` ([02](../../../architecture/next-feed-vl/02-ds-surface-map.md))
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `search/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02/(03) |
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) |

## Зачем
NF-12 enabled `search` param; UI still classic Filters search. Eye: «поиск старый».

## UX elements (DS names)
- `BoardSearchField`
- Parts of `BoardToolbar` that host search (not whole toolbar rewrite)

## UX SSOT
- [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) · search control panels
- Param remains Closed **`search`** (REQ-56) — no invent

## Функциональные требования (FR)
- **FR-VL-02.1** `#/next/feed` exposes DS-named `BoardSearchField` (label, value, clear).
- **FR-VL-02.2** Visual/language must-states ≥ M149 search — not classic board-search chrome as Done.
- **FR-VL-02.3** Continues to pass gateway `search`; empty/no-results honesty retained.
- **FR-VL-02.4** Classic `#/board` search unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Type query | Live search works + DS field chrome |
| Clear | Clear action Present |
| Empty results | Honest empty |
| `#/board` | Unchanged |

## Anti-mixing AC
- [x] PASS ≠ Filters `SearchInput` unre-skinned as next-feed Done
- [x] `#/board` not regressed

## Вне scope
Invent search param · shell · reopen NF-12 body

## Acceptance Criteria
- [x] Live search field reads as DS `BoardSearchField` vs M149
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** найти classic search chrome on next path.
- **Шаги:**
  1. `FeedToolbar.jsx` imports Filters `SearchInput` (lines 2–12) and mounts it in `.feed-search` (54–60).
  2. Ban-matrix: Filters `SearchInput` / `board-search-*` ≠ Done ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
- **AC/DoD:**
  - [ ] As-is cite recorded
  - [ ] Ban item named
- **Out:** runtime this wave
- **Проверка:** Grep `SearchInput` under `features/feed`

### t02 — DS modules (target `search/`)
- **Цель:** `BoardSearchField` named surface.
- **Шаги:**
  1. Target `features/feed/search/BoardSearchField.jsx` (logical; name ≠ create now).
  2. Contract: label, value, onChange, clear action, a11y labels — map from current `SearchInput` props used in toolbar (value=`searchDraft`, onChange=`setSearchDraft`, placeholders from `t('nextFeed.toolbar.*')`).
  3. Visual language ≥ M149; not Filters CSS as Done.
- **AC/DoD:**
  - [ ] Named export `BoardSearchField`
  - [ ] Clear Present
- **Out:** invent query param
- **Проверка:** component + live

### t03 — Semantics seam
- **Цель:** keep Closed `search` wiring; one seam.
- **Шаги:**
  1. Query build already outside Filters chrome (`buildFeedListOptions.js`, gateway `search` via NF-12) — do not pull Filters presentation into semantics.
  2. If Filters module mixes UI+query helpers, extract pure query helpers to `features/feed/semantics/` and let **both** board and next call them (Q3); next presentation only uses `BoardSearchField`.
- **AC/DoD:**
  - [ ] Gateway `search` unchanged
  - [ ] No invent param names
- **Out:** new HTTP
- **Проверка:** existing NF-12 tests still meaningful; ban import of SearchInput on Done path

### t04 — Wire / displace shelter
- **Цель:** toolbar hosts DS field.
- **Шаги:**
  1. In `FeedToolbar.jsx`, replace `<SearchInput …>` (54–60) with `<BoardSearchField …>`.
  2. Remove Filters `SearchInput` import from next-feed Done path.
  3. Host remains `NextFeedHostPage` → `FeedToolbar` (`NextFeedHostPage.jsx` ~207).
- **AC/DoD:**
  - [ ] Live `#/next/feed` shows DS search chrome
  - [ ] `#/board` Filters search untouched
- **Out:** board mutate
- **Проверка:** local-five type/clear/empty

### t05 — Anti-mixing + verify (AD-VL-03 search skin)
- **Цель:** Partial search skin = block Done.
- **Шаги:** local-five + visual vs M149; import gate no `SearchInput` on next Done path ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [ ] Anti-mixing AC
  - [ ] Empty/no-results honesty retained (`FeedListArea` filtered-empty ~133–154)
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual
- **Цель:** gap map / NF-12 Related only.
- **AC/DoD:**
  - [ ] Gap map VL-02 cite when Done
  - [ ] No reopen NF-12 body
- **Out:** NEW STORY
- **Проверка:** links
