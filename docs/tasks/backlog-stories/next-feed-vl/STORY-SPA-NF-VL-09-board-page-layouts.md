# STORY-SPA-NF-VL-09 — Board & page content layouts

## Meta
- **Key:** `STORY-SPA-NF-VL-09-board-page-layouts`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P8 (`2026-10-12T16:02:23Z`) · SHAs `ded3e85`/`ee8a605`/`f5ba109` · `pkg-000123`
- **Depends on:** VL-07/08 soft; DS §2; layout pack; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** named `BoardLayout` / `PageContentLayout` for next-feed content column — shell rails remain next-shell
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
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §2 |
| Layout pack | [dashboard-layout-spec](../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md) |

## Зачем
Geometry exists in packs; no story owns explicit layout variants for feed content.

## UX elements (DS names)
- `BoardLayout` (`compact` | `medium` | `wide`)
- `PageContentLayout`

## UX SSOT
- [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
- [dashboard-layout-spec](../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md)
- Shell rails = next-shell OOS ownership

## Функциональные требования (FR)
- **FR-VL-09.1** Next-feed content column follows `BoardLayout` / `PageContentLayout` width/gutter contracts.
- **FR-VL-09.2** Absent side modules do not leave empty columns (per DS).
- **FR-VL-09.3** Shell chrome ownership unchanged (next-shell).

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| 1440 | Wide composition |
| 768 | Medium/centered |
| 390 | Compact single column |
| Shell | Not owned here |

## Anti-mixing AC
- [x] PASS ≠ implicit CSS only without named layout claim
- [x] Shell not rewritten as feed story

## Вне scope
PublicHeader / ProfileRail implement

## Acceptance Criteria
- [x] Live feed content geometry matches DS layout variants
- [x] Anti-mixing / shell OOS checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** content column exists without named BoardLayout claim.
- **Шаги:**
  1. Host: `NextFeedHostPage.jsx` `board-shell next-feed-host-route` + `main.feed-host` (~198–204) hosts toolbar + list — geometry via CSS, not DS-named layout modules.
  2. Ban: implicit CSS-only without named layout claim as Done ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
  3. Shell rails = next-shell OOS (do not rewrite here).
- **AC/DoD:**
  - [x] As-is cites
  - [x] Shell OOS restated
- **Out:** runtime this wave
- **Проверка:** Grep `feed-host`

### t02 — DS modules (target `board/`)
- **Цель:** `BoardLayout` / `PageContentLayout`.
- **Шаги:**
  1. Target `features/feed/board/` — layout variants `compact|medium|wide` + page content gutters per DS / dashboard-layout-spec.
  2. Absent side modules → no empty columns (FR-VL-09.2).
- **AC/DoD:**
  - [x] Named exports
  - [x] Variants documented in props
- **Out:** shell components
- **Проверка:** 1440 / 768 / 390

### t03 — Semantics seam
- **Цель:** layout is presentation; no data invent.
- **Шаги:**
  1. Breakpoints may reuse `useFeedNarrow` / media queries — pure hooks stay in feed or `semantics/` if shared; no API invent.
- **AC/DoD:**
  - [x] No invent endpoints
- **Out:** shell mutate
- **Проверка:** N/A data contracts

### t04 — Wire / displace shelter
- **Цель:** wrap feed content column in named layouts.
- **Шаги:**
  1. Compose `BoardLayout`/`PageContentLayout` around toolbar+list (and route mount content) inside `feed-host` without owning shell rails.
  2. Coord VL-07/08: presentation overlays and board heading live inside content column.
- **AC/DoD:**
  - [x] Live geometry named
  - [x] Shell unchanged
- **Out:** PublicHeader/ProfileRail
- **Проверка:** local-five widths

### t05 — Anti-mixing + verify
- **Шаги:** local-five viewport matrix; named claim Present; shell not rewritten ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [x] Anti-mixing / shell OOS AC
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual
- **AC/DoD:**
  - [x] Gap map VL-09 when Done
- **Out:** NEW STORY
- **Проверка:** links
