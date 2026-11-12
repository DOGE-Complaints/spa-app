# STORY-SPA-NF-VL-05 — DiscussionLayout + light CommentTree plane

## Meta
- **Key:** `STORY-SPA-NF-VL-05-discussion-layout-light-plane`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P3 (`2026-10-12T14:57:13Z`) · gate PASS · `pkg-000119`
- **Depends on:** VL-04; NF-08; DS §2 `DiscussionLayout` · §6 `CommentTree`; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** next-feed Discussion layout + light tree plane; classic M143 CommentTree skin ≠ Done on `#/next/feed*`
- **Concern folder:** `features/feed/comments/`
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `comments/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02 |
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) |

## Зачем
Expanded tree still classic dark-oriented CommentTree under feed.

## UX elements (DS names)
- `DiscussionLayout`
- `CommentTree`
- `CommentNode`
- `ThreadConnector`
- `ReplyDepthNotice`

## UX SSOT
- [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)

## Функциональные требования (FR)
- **FR-VL-05.1** Expanded Discussion owned by `DiscussionLayout` slot contract (header / tree / composer / stub).
- **FR-VL-05.2** Next-feed `CommentTree` plane matches light artboard language (not classic dark board skin as Done).
- **FR-VL-05.3** Visual depth / `max_depth` honesty via `ThreadConnector` / `ReplyDepthNotice` when applicable.
- **FR-VL-05.4** Classic board tree chrome unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Expand | Light plane + layout slots |
| Deep reply | Depth notice/connector honest |
| `#/board` | Unchanged |

## Anti-mixing AC
- [x] PASS ≠ unre-skinned classic CommentTree as next-feed Done
- [x] `#/board` not regressed

## Вне scope
Composer atoms → VL-06 · M155 · invent threads API

## Acceptance Criteria
- [x] Live expanded Discussion matches DS + M152/M153
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** expanded tree still classic.
- **Шаги:**
  1. `FeedDiscussionBlock.jsx` imports `CommentTree` (L3); expanded block ~165+ mounts `<CommentTree` (~194).
  2. Ban: classic CommentTree dark board skin as Done on `#/next/feed*` ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
- **AC/DoD:**
  - [x] As-is cites
  - [x] Ban named
- **Out:** runtime this wave
- **Проверка:** Grep `CommentTree` under `features/feed`

### t02 — DS modules (target `comments/`)
- **Цель:** layout + light tree plane.
- **Шаги:**
  1. `DiscussionLayout` slot contract: header / tree / composer / stub (composer stub may still be classic until VL-06 — document seam).
  2. Next-feed `CommentTree` / `CommentNode` / `ThreadConnector` / `ReplyDepthNotice` under `comments/` — light language per M152/M153.
  3. Do not treat classic `CommentTree.jsx` CSS as Done chrome (new plane or fully re-skinned next-owned module).
- **AC/DoD:**
  - [x] Named layout + tree exports
  - [x] Light plane vs artboard
- **Out:** invent max_depth API
- **Проверка:** expand discussion live

### t03 — Semantics seam
- **Цель:** tree data / depth rules without classic UI dependency.
- **Шаги:**
  1. Thread tree props already passed into `CommentTree` — keep Closed threads contracts.
  2. Extract pure tree-mapping / depth helpers to `semantics/` if currently inside classic CommentTree UI file.
  3. Board continues classic presentation; both may share seam (Q3).
- **AC/DoD:**
  - [x] No invent threads fields
  - [x] Next Done path does not import classic CommentTree as chrome
- **Out:** board tree rewrite
- **Проверка:** import graph

### t04 — Wire / displace shelter
- **Цель:** expanded `FeedDiscussionBlock` uses `DiscussionLayout` + light tree.
- **Шаги:**
  1. Replace expanded region (~165–…) structure with layout slots.
  2. Remove classic `CommentTree` import from next Done path.
  3. Composer / Invite still may be shelter until VL-06/VL-12 — do not claim those Done here.
- **AC/DoD:**
  - [x] Expanded live = light plane
  - [x] `#/board` CommentTree unchanged
- **Out:** composer DS (VL-06)
- **Проверка:** local-five expand/collapse

### t05 — Anti-mixing + verify
- **Шаги:** local-five; deep reply honesty; ban classic CommentTree Done; board smoke ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [x] Anti-mixing AC
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual
- **AC/DoD:**
  - [x] Gap map VL-05 when Done
  - [x] Explicit handoff composer → VL-06
- **Out:** NEW STORY
- **Проверка:** links
