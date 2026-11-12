# STORY-SPA-CT-12 — Inline reply placement (G-H4)

## Meta

- **Key:** `STORY-SPA-CT-12-inline-reply-placement`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P3/P5 Done · gate BLOCK · `pkg-000170` · `2026-10-19T12:30:53Z`
- **Pipeline:** [STORY-SPA-CT-12-inline-reply-placement](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-12-inline-reply-placement/STORY-SPA-CT-12-inline-reply-placement.md)
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-03 · CT-04
- **Blocks:** CT-13 · CT-14 (soft) · OP eye in-context reply
- **UX mirror:** [OP-UX residual 10-19](OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H4
- **Analysis:** [ux-gaps 2026-10-19](../../../analysis/analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md) G-H4
- **Artboard:** [M153-C](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- **Code home:** `ThreadMount.jsx` · `CommentNode.jsx` · `ThreadComposer.jsx`

## Зачем

Reply mode strings Present, but composer mounts as sibling **after** entire `IssueThreadBlock` — always below all comments. OP/M153: composer under parent in tree with L-connector.

## FR

- **FR-CT-12.1** When `replyTarget` set: `ThreadComposer` (reply mode) renders **under the parent comment node** in the tree (inline / portal / slot), not after the whole block.  
- **FR-CT-12.2** Root compose (no reply target) may remain at bottom of mount (root entry).  
- **FR-CT-12.3** L-connector / spine relationship to inline reply reads as in-context (with CT-14 spine).  
- **FR-CT-12.4** Cancel reply clears target · composer leaves inline slot.  
- **FR-CT-12.5** Draft / fail F / verify gate still owned by composer + ThreadMount (CT-04 · CT-07).  
- **FR-CT-12.6** Vitest: reply mode → composer DOM under parent node testid/structure.

## Вне scope

Composer icons (CT-11) · action pills (CT-13) · invent HTTP · invent OP PASS

## Acceptance Criteria

- [ ] Reply on nested comment → composer appears under that parent · not below entire thread  
- [ ] Root Write a comment still usable at root position  
- [ ] Cancel reply restores prior layout  
- [ ] OP eye gate (Absent = BLOCK)

## Technical subtasks

> Skill: `react-expert` · Arch [§11.2](ARCHITECTURE.md) · P3 Done · gate BLOCK

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-12-t01-reply-slot-contract` | Done | CommentNode slot / renderReplyComposer when replyTarget matches | `CommentNode.jsx` · ThreadMount props | 12.1 · 12.3 |
| `task-spa-ct-12-t02-mount-split` | Done | Root composer stays bottom; reply composer leaves post-block sibling | `ThreadMount.jsx` | 12.1 · 12.2 |
| `task-spa-ct-12-t03-cancel-clear` | Done | Cancel reply clears target · unmounts inline slot | ThreadMount · ThreadComposer | 12.4 |
| `task-spa-ct-12-t04-draft-gate-hold` | Done | Draft / fail F / verify still single-owner | ThreadComposer · VerifyWriteGate | 12.5 |
| `task-spa-ct-12-t05-vitest-inline` | Done | Reply mode → composer under parent node structure | `__tests__` | 12.6 |

### Constraints

- Single draft/replyTarget owner · no dual composers fighting  
- No invent HTTP · Arch §11.2  

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

In-context reply placement matches M153-C / OP eye.
