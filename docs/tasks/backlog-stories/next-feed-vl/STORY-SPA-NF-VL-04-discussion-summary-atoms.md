# STORY-SPA-NF-VL-04 — Discussion summary atoms

## Meta
- **Key:** `STORY-SPA-NF-VL-04-discussion-summary-atoms`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P3 (`2026-10-12T14:41:59Z`) · gate PASS · `pkg-000118`
- **Depends on:** NF-08 Done; DS §6; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** DS-named summary surfaces on next-feed; classic DISCUSSION copy chrome ≠ Done
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
Collapsed Discussion still reads classic («DISCUSSION / Existing discussion»). Need DS atoms.

## UX elements (DS names)
- `DiscussionHeader`
- `ThreadSummary`
- `CommentPreview`
- `ViewDiscussionAction` (retain/align)

## UX SSOT
- [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)

## Функциональные требования (FR)
- **FR-VL-04.1** Collapsed Discussion uses named `DiscussionHeader` + `ThreadSummary` + `CommentPreview`.
- **FR-VL-04.2** Preview bodies remain literal Closed `body` text.
- **FR-VL-04.3** Classic `#/board` thread summary chrome unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Empty | Honest empty summary |
| Populated collapsed | Previews + DS header |
| `#/board` | Unchanged |

## Anti-mixing AC
- [ ] PASS ≠ classic IssueThreadBlock collapsed chrome as Done
- [ ] `#/board` not regressed

## Вне scope
Full tree light plane → VL-05 · reopen NF-08

## Acceptance Criteria
- [ ] Live collapsed Discussion matches DS + M152 summary must-states
- [ ] Anti-mixing AC checked
- [ ] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** collapsed chrome today.
- **Шаги:**
  1. `FeedDiscussionBlock.jsx` collapsed populated block ~129–162: `feed-discussion-summary-title` uses `threadsFeed.post.existingDiscussion`; preview list `previewBodies` ~135–141; view button ~153–161.
  2. Label header ~94–96 still classic Discussion copy.
  3. Ban: classic IssueThreadBlock / DISCUSSION chrome as Done ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
- **AC/DoD:**
  - [ ] As-is cites
  - [ ] Ban named
- **Out:** runtime this wave
- **Проверка:** Grep `feed-discussion-collapsed`

### t02 — DS modules (target `comments/`)
- **Цель:** named summary atoms.
- **Шаги:**
  1. Target `features/feed/comments/` — `DiscussionHeader`, `ThreadSummary`, `CommentPreview`, `ViewDiscussionAction`.
  2. Preview renders **literal** Closed `body` strings only (FR-VL-04.2).
  3. Empty/loading honesty stay distinct states (existing status machine in `FeedDiscussionBlock`).
- **AC/DoD:**
  - [ ] Named exports
  - [ ] No paraphrased/fake preview text
- **Out:** tree light plane (VL-05)
- **Проверка:** collapsed populated + empty

### t03 — Semantics seam
- **Цель:** thread fetch/preview mapping without classic UI.
- **Шаги:**
  1. Preview body selection likely already in `FeedDiscussionBlock` / mount — keep pure mapping in component or move to `semantics/` if shared with board.
  2. Do not import `IssueThreadBlock` presentation for next summary Done.
- **AC/DoD:**
  - [ ] Closed body fields only
  - [ ] No banned chrome import
- **Out:** invent thread fields
- **Проверка:** import graph

### t04 — Wire / displace shelter
- **Цель:** collapsed region uses DS atoms.
- **Шаги:**
  1. Replace collapsed markup (~129–162) and discussion label header with DS composition.
  2. Keep expand control behavior (`setExpanded(true)`).
  3. Reaction slot may still host VL-03 strip — compose, don’t reintroduce classic discussion chrome.
- **AC/DoD:**
  - [ ] Live collapsed reads DS
  - [ ] `#/board` unchanged
- **Out:** board mutate
- **Проверка:** local-five collapsed issue with comments

### t05 — Anti-mixing + verify
- **Шаги:** local-five; empty vs populated; ban IssueThreadBlock as Done; board smoke ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [ ] Anti-mixing AC
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual
- **AC/DoD:**
  - [ ] Gap map VL-04 when Done
  - [ ] No reopen NF-08
- **Out:** VL-05 scope creep
- **Проверка:** links
