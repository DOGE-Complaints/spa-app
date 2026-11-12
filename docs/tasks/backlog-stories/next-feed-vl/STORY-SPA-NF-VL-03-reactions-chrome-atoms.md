# STORY-SPA-NF-VL-03 — Reactions chrome atoms

## Meta
- **Key:** `STORY-SPA-NF-VL-03-reactions-chrome-atoms`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P3 (`2026-10-12T14:24:43Z`) · P1.3 (`2026-10-12T14:08:24Z`) · pipeline Materialized · `pkg-000117` active · Await OP P2/P3
- **Depends on:** NF-09 Done; VL-01 soft (civic Reactions zone); DS §8; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** DS atoms on next-feed — classic `ReactionControls` ≠ Done presentation
- **Concern folder:** `features/feed/reactions/` (+ `semantics/` for catalog/PUT)
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `reactions/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02/**03** |
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §8 |

## Зачем
NF-09 wrapped classic picker; F3 Partial. Need DS strip/picker/footer language.

## UX elements (DS names)
- `ReactionAggregateStrip`
- `ReactionMark`
- `ReactionPicker`
- `ReactionLayerGroup`
- `ReactionOption`
- `ReactionSelectionFooter`
- `ReactionScopeHint`

## UX SSOT
- [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · [png](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
- People surfaces (`ReactorsPopover`, …) = **OOS** (M155)

## Функциональные требования (FR)
- **FR-VL-03.1** Next-feed exposes named `ReactionAggregateStrip` + picker atoms per DS.
- **FR-VL-03.2** Desktop popover / mobile sheet placement per DS; chrome ≥ M154 mood.
- **FR-VL-03.3** `ReactionSelectionFooter` / limit honesty Present; `ReactionScopeHint` when knobs restrict.
- **FR-VL-03.4** Closed reactions.v1 / PUT unchanged; no invent ids.
- **FR-VL-03.5** Classic board reactions chrome unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Empty strip | Honest empty |
| Open picker | DS layers visible |
| Capacity | Footer/limit honest |
| `#/board` | Unchanged |

## Anti-mixing AC
- [ ] PASS ≠ unre-skinned `ReactionControls` as next-feed Done
- [ ] `#/board` not regressed

## Вне scope
M155 people · invent reaction ids · reopen NF-09

## Acceptance Criteria
- [ ] Live strip/picker match DS + M154 must-states
- [ ] Anti-mixing AC checked
- [ ] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** classic chrome still owns Done path.
- **Шаги:**
  1. `FeedReactionsStrip.jsx` imports `ReactionControls` (L2) and mounts it as ready chrome (80–87); loading/error shells 31–68.
  2. Civic bridge via `FeedReactionOpenContext` + `useFeedNarrow` for sheet vs popover (70).
  3. Ban: `ReactionControls` as Done presentation ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
- **AC/DoD:**
  - [ ] As-is cites path:line
  - [ ] Ban named
- **Out:** runtime this wave
- **Проверка:** Grep `ReactionControls` under `features/feed`

### t02 — DS modules (target `reactions/`)
- **Цель:** named atoms per DS §8 / UX list.
- **Шаги:**
  1. Target folder `features/feed/reactions/` — exports for aggregate strip, mark, picker, layer group, option, selection footer, scope hint.
  2. Layout: desktop popover / mobile sheet (reuse narrow signal pattern from `useFeedNarrow.js`, not classic chrome).
  3. Loading/error honesty stay on strip surface (parity with current stripStatus).
- **AC/DoD:**
  - [ ] Named exports match DS
  - [ ] M154 mood without classic ReactionControls chrome
- **Out:** M155 people UI
- **Проверка:** visual strip + open picker

### t03 — Semantics seam (critical for this story)
- **Цель:** catalog + PUT leave classic UI; next owns seam.
- **Шаги:**
  1. Inspect `ReactionControls.jsx` / related threads helpers: extract **non-UI** catalog, selection limits, PUT client into `features/feed/semantics/` (target).
  2. Board `#/board` and next both call the **same** seam after move (Q3); classic keeps its presentation.
  3. DS atoms call seam only — never mount `ReactionControls` as Done.
  4. Closed reactions.v1 ids only — no invent.
- **AC/DoD:**
  - [ ] Semantics pocket has no JSX chrome
  - [ ] Board still works via same seam or temporary dual until cutover complete per arch A
  - [ ] Deleting classic presentation later must not delete seam
- **Out:** invent reaction ids
- **Проверка:** import graph + board smoke + next smoke

### t04 — Wire / displace shelter
- **Цель:** replace `FeedReactionsStrip` inner classic mount.
- **Шаги:**
  1. Rewire `FeedReactionsStrip` (or replace with DS strip) to compose `ReactionAggregateStrip` + picker atoms.
  2. Keep bridge API used by `FeedCivicPost` / `FeedDiscussionBlock` reaction slots.
  3. Remove `ReactionControls` import from next Done path.
- **AC/DoD:**
  - [ ] Civic + discussion reaction slots use DS chrome
  - [ ] `#/board` ReactionControls path unchanged
- **Out:** board mutate
- **Проверка:** local-five open picker civic + thread-root

### t05 — Anti-mixing + verify (AD-VL-03)
- **Цель:** reactions atoms Partial = **block**.
- **Шаги:** local-five; empty/open/capacity; ban-list import gate; board smoke ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [ ] Anti-mixing AC
  - [ ] AD-VL-03 reactions Partial not accepted
- **Out:** unit-only proof
- **Проверка:** gate evidence

### t06 — Icon lock residual (paw/orb)
- **Цель:** promote-or-lock; no invent SVG (Q6).
- **Шаги:** lock table rows for reaction marks; existing catalog refs in `FeedCivicPost` REACTIONS_ZONE_MARKS (`/icons/next-feed/reactions/*.svg` ~44–48) may Promote if verified — do not invent orb masters.
- **AC/DoD:**
  - [ ] Lock rows written
  - [ ] Gap map VL-03 when Done
- **Out:** invent SVG
- **Проверка:** OP if Absent
