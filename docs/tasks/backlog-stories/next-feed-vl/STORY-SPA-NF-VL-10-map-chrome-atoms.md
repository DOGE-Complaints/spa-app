# STORY-SPA-NF-VL-10 — Map chrome atoms

## Meta
- **Key:** `STORY-SPA-NF-VL-10-map-chrome-atoms`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P8 (`2026-10-12T16:23:21Z`) · SHAs `a065efb`/`b83a676`/`20b5462` · `pkg-000124`
- **Depends on:** NF-03 Done; DS §9; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** DS map notices/preview on next-feed; classic map chrome ≠ Done without atoms
- **Concern folder:** `features/feed/map/`
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `map/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02 |
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §9 |

## Зачем
Map toggle works; `MapSubsetNotice` / `MapIssuePreview` / attribution not story-owned DS atoms.

## UX elements (DS names)
- `BoardMap`
- `IssueMapPin`
- `MapSubsetNotice`
- `MapIssuePreview`
- `MapAttribution`
- `MapStatePanel`

## UX SSOT
- [M151](../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md)

## Функциональные требования (FR)
- **FR-VL-10.1** Partial eligibility explained via `MapSubsetNotice`.
- **FR-VL-10.2** Selected pin uses `MapIssuePreview` (title, public context, open).
- **FR-VL-10.3** Attribution slot Present and not covered.
- **FR-VL-10.4** Same result set as List; classic board map unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Partial map | Subset notice |
| Select pin | Preview |
| Error | MapStatePanel |
| `#/board` | Unchanged |

## Anti-mixing AC
- [x] PASS ≠ map without DS notice/preview when required
- [x] `#/board` not regressed

## Вне scope
Invent geo fields · pick map library in story text

## Acceptance Criteria
- [x] Live map chrome matches DS + M151
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** map works; DS atoms not owned.
- **Шаги:**
  1. `FeedMapArea.jsx` wraps `BoardIssuesMap` (L2, ~85–92); partial text `<p className="feed-map-partial">` (~74–78) — not `MapSubsetNotice`.
  2. Geo filter: `listPinCapableIssues` from `map/issueGeo.js` (L3, ~30–31).
  3. Error panel ~44–66 — not named `MapStatePanel`.
  4. Ban: classic map chrome without required DS notice/preview as Done ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
- **AC/DoD:**
  - [x] As-is cites
  - [x] Ban named
- **Out:** runtime this wave
- **Проверка:** Grep `feed-map-partial` / `BoardIssuesMap`

### t02 — DS modules (target `map/`)
- **Цель:** named map chrome atoms.
- **Шаги:**
  1. Target `features/feed/map/` — `MapSubsetNotice`, `MapIssuePreview`, `MapAttribution`, `MapStatePanel`, pin/board map surfaces per DS.
  2. Preview: title, public context, open — Closed fields only.
  3. Attribution slot Present and not covered (FR-VL-10.3).
- **AC/DoD:**
  - [x] Named exports
  - [x] Partial/error/preview states covered
- **Out:** invent geo fields
- **Проверка:** partial + pin select + error

### t03 — Semantics seam
- **Цель:** geo eligibility shared; map lib UI not classic Done.
- **Шаги:**
  1. Keep `listPinCapableIssues` / issueGeo as semantic (already outside threads UI) — may live under `semantics/` or stay `map/issueGeo.js` as shared seam both board and next call (Q3).
  2. If `BoardIssuesMap` mixes UI+logic, extract non-UI; next map presentation must not claim classic board map chrome as Done.
  3. Same result set as List — no invent search/geo HTTP.
- **AC/DoD:**
  - [x] No invent geo/search HTTP
  - [x] Shared eligibility helper
- **Out:** library swap as story invent
- **Проверка:** list↔map same set

### t04 — Wire / displace shelter
- **Цель:** `FeedMapArea` composes DS atoms; toggle stays in toolbar.
- **Шаги:**
  1. Replace partial `<p>` with `MapSubsetNotice`.
  2. Add/wire `MapIssuePreview` for selected pin (may extend BoardIssuesMap props or next-owned wrapper).
  3. Error → `MapStatePanel`; attribution slot explicit.
  4. `FeedListArea` continues to mount `FeedMapArea` when `feedView==='map'` (~156–163).
- **AC/DoD:**
  - [x] Live DS map chrome
  - [x] `#/board` map unchanged
- **Out:** board mutate
- **Проверка:** local-five map toggle

### t05 — Anti-mixing + verify
- **Шаги:** local-five M151; required notice/preview Present; board smoke ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [x] Anti-mixing AC
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual
- **AC/DoD:**
  - [x] Gap map VL-10 when Done
  - [x] Pin asset promote-or-lock if needed (existing `/icons/next-feed/map/map-pin.*` ~8–9 — do not invent)
- **Out:** invent SVG
- **Проверка:** links
