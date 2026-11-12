# STORY-SPA-NF-VL-07 — Presentation & overlay layouts

## Meta
- **Key:** `STORY-SPA-NF-VL-07-presentation-overlay-layouts`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P3 (`2026-10-12T15:28:13Z`) · gate PASS · `pkg-000121`
- **Depends on:** NF-06 Done; DS §2 layouts; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** named layouts for next-feed mounts; classic modal chrome ≠ Done without DS layout contract
- **Concern folder:** `features/feed/presentation/`
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `presentation/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02 |
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §2 |

## Зачем
Mounts work; `IssuePresentationLayout` / `OverlayLayout` / `OverlayHost` never owned as DS surfaces.

## UX elements (DS names)
- `IssuePresentationLayout` (`page` | `modal` | `fullScreenSheet`)
- `OverlayLayout`
- `OverlayHost`
- `KeyboardComposerLayout` (narrow)

## UX SSOT
- [M158](../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md) · [M159](../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md)

## Функциональные требования (FR)
- **FR-VL-07.1** Modal / sheet / route share one `IssuePresentationLayout` contract for Issue content slots.
- **FR-VL-07.2** Overlay stack/focus return owned by `OverlayHost` + `OverlayLayout` geometry.
- **FR-VL-07.3** Narrow composer uses `KeyboardComposerLayout` expectations (web translate of keyboard inset).
- **FR-VL-07.4** Classic board/issue mounts outside next-feed unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Modal | Layout slots Present |
| Sheet 390 | Safe chrome + composer |
| Route | Same product body |
| Escape/back | Top overlay closes · focus return |

## Anti-mixing AC
- [x] PASS ≠ ad-hoc CSS only without named layout contract
- [x] `#/board` not regressed

## Вне scope
Shell chrome · invent routes

## Acceptance Criteria
- [x] Live mounts match DS layout roles + M158
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** mounts exist without DS-named layout ownership.
- **Шаги:**
  1. `FeedIssueMount.jsx`: presentation `auto|modal|sheet|route` (~21–40); Escape → back (~86–94); chrome header/body (~105–156); route vs overlay root (~158–179+).
  2. Host: `NextFeedHostPage.jsx` imports `FeedIssueMount` (~25) and opens issue mount alongside feed.
  3. Ban: ad-hoc CSS-only without named DS layout contract as Done ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
- **AC/DoD:**
  - [x] As-is cites
  - [x] Ban named
- **Out:** runtime this wave
- **Проверка:** Grep `feed-issue-mount`

### t02 — DS modules (target `presentation/`)
- **Цель:** named layout surfaces.
- **Шаги:**
  1. Target `features/feed/presentation/` — `IssuePresentationLayout`, `OverlayHost`, `OverlayLayout`, `KeyboardComposerLayout`.
  2. Single contract for modal/sheet/route content slots (FR-VL-07.1).
  3. OverlayHost owns stack + focus return; OverlayLayout geometry (FR-VL-07.2).
- **AC/DoD:**
  - [x] Named exports
  - [x] Variants `page|modal|fullScreenSheet` explicit
- **Out:** invent routes
- **Проверка:** three presentations same body

### t03 — Semantics seam
- **Цель:** fetch/navigation stay non-UI.
- **Шаги:**
  1. `issueService.getIssue` in `FeedIssueMount` (~42–67) is already semantic — keep/move under `semantics/` if shared; do not pull classic board modal UI.
  2. No invent issue HTTP.
- **AC/DoD:**
  - [x] Closed getIssue only
  - [x] Presentation modules do not import classic board modal chrome
- **Out:** shell ownership
- **Проверка:** import graph

### t04 — Wire / displace shelter
- **Цель:** `FeedIssueMount` composes DS layouts.
- **Шаги:**
  1. Refactor mount chrome into `OverlayHost`/`OverlayLayout` + `IssuePresentationLayout` slots wrapping `FeedIssueDetail`.
  2. Preserve Escape/back and open-as-page behaviors.
  3. Narrow composer inset via `KeyboardComposerLayout` when composer present (coord VL-06).
- **AC/DoD:**
  - [x] Live modal/sheet/route use named layouts
  - [x] Classic board mounts unchanged
- **Out:** shell rewrite
- **Проверка:** local-five three presentations + Escape

### t05 — Anti-mixing + verify
- **Шаги:** local-five M158 matrix; named contract Present; board smoke ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [x] Anti-mixing AC
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual
- **AC/DoD:**
  - [x] Gap map VL-07 when Done
  - [x] No invent routes documented
- **Out:** NEW STORY
- **Проверка:** links
