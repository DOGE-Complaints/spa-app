# STORY-SPA-NF-VL-08 — Board heading & results context

## Meta
- **Key:** `STORY-SPA-NF-VL-08-board-results-context`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P3 (`2026-10-12T15:43:39Z`) · gate PASS · `pkg-000122`
- **Depends on:** NF-01 Done; VL-02 soft; DS §4; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** DS board chrome — `(no query)` routing line ≠ `ResultsContext`
- **Concern folder:** `features/feed/board/`
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `board/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02 |
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §4 |

## Зачем
Toolbar heading/query string is developer-ish; missing `ResultsContext` / `StaleResultsNotice` as named surfaces.

## UX elements (DS names)
- `BoardHeading`
- `ResultsContext`
- `StaleResultsNotice`
- `BoardFeedState` (alignment)

## UX SSOT
- [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)

## Функциональные требования (FR)
- **FR-VL-08.1** `BoardHeading` = product title + explaining line (not raw routing dump as primary UI).
- **FR-VL-08.2** `ResultsContext` communicates confirmed result context / refresh.
- **FR-VL-08.3** Stale retained cards + `StaleResultsNotice` distinct from empty/error.
- **FR-VL-08.4** Classic board toolbar unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Happy | Heading + context |
| Stale | Notice + cards kept |
| Empty vs error | Distinct |
| `#/board` | Unchanged |

## Anti-mixing AC
- [x] PASS ≠ `(no query)` as Done ResultsContext
- [x] `#/board` not regressed

## Вне scope
Invent metrics APIs

## Acceptance Criteria
- [x] Live board chrome matches DS + M149 context states
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** developer-ish heading / anon stale banner.
- **Шаги:**
  1. `FeedToolbar.jsx` copy: `<h2>{t('nextFeed.toolbar.title')}</h2>` + `.feed-routing-query` showing `normalizedSearch || '(no query)'` (~46–50).
  2. Stale UX: `FeedListArea.jsx` `.feed-stale-banner` `data-testid="feed-stale"` (~63–82) — not named `StaleResultsNotice`.
  3. Ban: `(no query)` routing dump as Done `ResultsContext` ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
- **AC/DoD:**
  - [x] As-is cites
  - [x] Ban named
- **Out:** runtime this wave
- **Проверка:** Grep `feed-routing-query` / `feed-stale`

### t02 — DS modules (target `board/`)
- **Цель:** named heading/context/stale.
- **Шаги:**
  1. Target `features/feed/board/` — `BoardHeading`, `ResultsContext`, `StaleResultsNotice`, align `BoardFeedState`.
  2. Heading = product title + explaining line (FR-VL-08.1).
  3. Stale distinct from empty/error (existing empty/error blocks in `FeedListArea` stay separate).
- **AC/DoD:**
  - [x] Named exports
  - [x] Stale keeps cards + notice
- **Out:** invent metrics API
- **Проверка:** happy/stale/empty/error live

### t03 — Semantics seam
- **Цель:** list state flags already in host — no invent.
- **Шаги:**
  1. `stale` / `showResults` / fetch from `NextFeedHostPage` → props — keep Closed list fetch; pure state helpers → `semantics/` if extracted.
  2. Do not invent board metrics endpoints.
- **AC/DoD:**
  - [x] No invent APIs
  - [x] Presentation-only DS modules
- **Out:** gateway changes
- **Проверка:** existing list fetch unchanged

### t04 — Wire / displace shelter
- **Цель:** toolbar + list host DS surfaces.
- **Шаги:**
  1. Replace toolbar copy block with `BoardHeading` + `ResultsContext`.
  2. Replace stale banner with `StaleResultsNotice`.
  3. Coord VL-02: search field sibling in toolbar, not conflated with ResultsContext.
- **AC/DoD:**
  - [x] Live chrome named
  - [x] `#/board` toolbar unchanged
- **Out:** board mutate
- **Проверка:** local-five stale + happy

### t05 — Anti-mixing + verify
- **Шаги:** local-five; reject `(no query)` as ResultsContext Done; board smoke ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [x] Anti-mixing AC
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual
- **AC/DoD:**
  - [x] Gap map VL-08 when Done
- **Out:** NEW STORY
- **Проверка:** links
