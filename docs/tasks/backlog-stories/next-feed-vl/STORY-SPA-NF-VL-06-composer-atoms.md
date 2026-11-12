# STORY-SPA-NF-VL-06 — Composer atoms

## Meta
- **Key:** `STORY-SPA-NF-VL-06-composer-atoms`
- **Package:** [next-feed-vl](INDEX.md)
- **Epic:** [EPIC-SPA-21](../../epics/EPIC-SPA-21-next-feed-vl/EPIC-SPA-21-next-feed-vl.md)
- **Status:** Done · P3 (`2026-10-12T15:13:32Z`) · gate PASS · `pkg-000120`
- **Depends on:** VL-05 soft; NF-08 oval; DS §7; AD-VL-01/02
- **Runtime prerequisite:** local-five
- **Code boundary:** DS composer atoms on next-feed; classic CommentComposer ≠ Done alone
- **Concern folder:** `features/feed/composer/`
- **ui_scope:** `feed`

## Related (Architecture)

| Doc | Link |
|-----|------|
| Overview | [00-overview.md](../../../architecture/next-feed-vl/00-overview.md) |
| Dual plane / ban-matrix | [01-dual-plane-and-boundaries.md](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md) |
| DS surface map | [02-ds-surface-map.md](../../../architecture/next-feed-vl/02-ds-surface-map.md) → `composer/` |
| Verify / shelter | [03-verify-and-coexistence.md](../../../architecture/next-feed-vl/03-verify-and-coexistence.md) |
| Interview | [interview](../../../analysis/zeya888.target-tech-arch-interview-next-feed-vl-2026-10-12.md) |
| ARCH-DELTA | [ARCH-DELTA](ARCH-DELTA-visual-language-plane-2026-10-12.md) AD-VL-01/02 |
| DS SSOT | [component DS v1.0](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §7 |

## Зачем
Oval send Match ≠ full composer DS (`ComposerEntry`, `ReplyContext`, discard dialog).

## UX elements (DS names)
- `ComposerEntry`
- `ThreadComposer`
- `ReplyContext`
- `CommentTextInput`
- `ComposerActionRow`
- `SubmitCommentAction`
- `ComposerFeedback`
- `DraftDiscardDialog`

## UX SSOT
- [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- Attachments chips = OOS-contract

## Функциональные требования (FR)
- **FR-VL-06.1** Compact vs full composer split via `ComposerEntry` / `ThreadComposer`.
- **FR-VL-06.2** Reply uses `ReplyContext`; cancel reply honest.
- **FR-VL-06.3** Dirty draft discard path uses `DraftDiscardDialog` when leaving would lose draft.
- **FR-VL-06.4** Submit/feedback semantics Closed; classic board composer unchanged.

## Verify / edge matrix
| Direction | Expect |
|-----------|--------|
| Root compose | Entry → composer |
| Reply | ReplyContext Present |
| Discard dirty | Dialog when required |
| `#/board` | Unchanged |

## Anti-mixing AC
- [x] PASS ≠ classic composer unre-skinned as sole Done
- [x] `#/board` not regressed

## Вне scope
Media attachments production · invent POST fields · verify gate chrome → VL-11 (classic `VerifyWriteGate` may still mount inside composer until VL-11)

## Acceptance Criteria
- [x] Live composer atoms match DS + M153
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Technical subtasks

### t01 — As-is / shelter map
- **Цель:** classic composer on next path.
- **Шаги:**
  1. `FeedDiscussionBlock.jsx` imports `CommentComposer` (L2); mounts root composers ~241 and ~252 with `composerShared`.
  2. Ban: classic `CommentComposer` alone as Done ([01](../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)).
  3. Note: `CommentComposer.jsx` also embeds classic `VerifyWriteGate` (~299+) — VL-11 owns DS gate chrome; this story must not claim verify Done.
- **AC/DoD:**
  - [x] As-is cites
  - [x] Ban + VL-11 boundary noted
- **Out:** runtime this wave
- **Проверка:** Grep `CommentComposer` under `features/feed`

### t02 — DS modules (target `composer/`)
- **Цель:** full atom set.
- **Шаги:**
  1. Target `features/feed/composer/` — Entry, ThreadComposer, ReplyContext, text input, action row, submit, feedback, DraftDiscardDialog.
  2. Compact vs full split per DS §7 / M153.
  3. Discard dialog only when dirty leave would lose draft (FR-VL-06.3).
- **AC/DoD:**
  - [x] Named exports
  - [x] Reply cancel honest
- **Out:** attachments production
- **Проверка:** root + reply + discard paths

### t03 — Semantics seam
- **Цель:** POST/submit Closed; extract from classic composer UI if mixed.
- **Шаги:**
  1. Submit/feedback contracts stay Closed — no invent POST fields.
  2. Move non-UI submit helpers to `semantics/` if currently trapped in `CommentComposer.jsx`.
  3. Board keeps classic composer presentation; shared seam for submit (Q3).
  4. Write-gate **policy** helpers may already live in `verifyWriteGate.js` — reuse via semantics; DS chrome = VL-11.
- **AC/DoD:**
  - [x] No invent POST
  - [x] Next Done path does not use unre-skinned CommentComposer as sole chrome
- **Out:** invent API
- **Проверка:** import graph + board smoke

### t04 — Wire / displace shelter
- **Цель:** discussion layout composer slot uses DS atoms.
- **Шаги:**
  1. Replace `CommentComposer` mounts in `FeedDiscussionBlock` with `ComposerEntry` / `ThreadComposer` composition.
  2. Wire into VL-05 `DiscussionLayout` composer slot when present.
  3. Remove classic CommentComposer import from next Done path when DS complete.
- **AC/DoD:**
  - [x] Live composer = DS atoms
  - [x] `#/board` CommentComposer unchanged
- **Out:** VL-11 verify chrome claim
- **Проверка:** local-five compose/reply/discard

### t05 — Anti-mixing + verify
- **Шаги:** local-five matrix; ban classic composer Done; board smoke ([03](../../../architecture/next-feed-vl/03-verify-and-coexistence.md)).
- **AC/DoD:**
  - [x] Anti-mixing AC
- **Out:** unit-only proof
- **Проверка:** gate checklist

### t06 — Docs residual + VL-11 handoff
- **AC/DoD:**
  - [x] Gap map VL-06 when Done
  - [x] Explicit: verify chrome remaining → VL-11
- **Out:** reopen NF-08
- **Проверка:** links
