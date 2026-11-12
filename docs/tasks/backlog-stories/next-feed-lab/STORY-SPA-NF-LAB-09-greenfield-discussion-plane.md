# STORY-SPA-NF-LAB-09 — Greenfield discussion plane (M152 / M153)

## Meta
- **Key:** `STORY-SPA-NF-LAB-09-greenfield-discussion-plane`
- **Package:** [next-feed-lab](INDEX.md) · [VISUAL-DoD.md](VISUAL-DoD.md) · [pipeline](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-09-greenfield-discussion-plane/STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md)
- **Status:** Todo · P1.3 scaffolded (`pkg-000135` · `2026-10-13T16:21:15Z`) · gate PENDING · **M152–157 depth residual → [component-thread](../component-thread/INDEX.md)** (CT-01…08 cutover)
- **Depends on:** LAB-07 · LAB-08 (strip Comment target + reaction slot adjacency)
- **Code boundary:** new modules under `features/feed-lab/post/discussion/` · **ban** `FeedLabDiscussionDeprecated` · **ban** classic `feed-discussion-*` class dual-mount as Done · **ban** product `FeedDiscussionBlock`
- **Related learn-only:** fixture comment bodies · optional read of VL CommentTree **contracts** — rewrite chrome; do not claim VL CommentTree as lab Done if it still carries classic dual-class / shallow skin
- **ui_scope:** `feed-lab`

## Зачем
Тред сразу под action strip: collapsed summary + View · expanded tree + composer — light DS mood, literal bodies, header ≠ DISCUSSION uppercase classic.

## Artboards
- [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)  
- [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) — tree/composer tip-light (attachments OOS unless already Closed)

## Target module catalog (name ≠ create)

| Working name | Role |
|--------------|------|
| `FeedDiscussionPlane` | Region under strip · continuous card · hairline divider |
| `FeedDiscussionSummary` | Collapsed: title count · literal previews · View action |
| `FeedDiscussionHeader` | «Thread» / DS copy — **no** `feed-discussion-label` classic uppercase |
| `FeedCommentTree` / `FeedCommentNode` | Expanded literal bodies · light plane · depth tip-light |
| `FeedComposerEntry` | «Write a comment…» local only · no threads HTTP |

## Wire rules (from research deltas)
- Strip **Comment** → expand discussion + focus composer entry.  
- Reaction aggregate/picker slot **inside** discussion region (M152 C), not between strip and thread as competing chrome.  
- Preview / View controls: new `feed-discussion-*` **lab** prefix or neutral names — do not attach global classic `feed-discussion-view` if product CSS still forces accent-pill.  
- No author/avatar/time invent.

## Функциональные требования (FR)
- **FR-LAB-09.1** Collapsed + expanded states on fixtures; literal comment bodies.
- **FR-LAB-09.2** Strip Comment expands/focuses discussion.
- **FR-LAB-09.3** Header copy ≠ classic DISCUSSION; no classic label dual-class on Done.
- **FR-LAB-09.4** No HTTP; composer local stub OK.
- **FR-LAB-09.5** Visual Done M152 (+ M153 tip-light): checklist + screenshot + OP; Partial = **BLOCK**.
- **FR-LAB-09.6** `#/next/feed` unchanged.

## Acceptance Criteria
- [ ] Greenfield discussion modules Present
- [ ] No Deprecated discussion mount on greenfield Done path
- [ ] Comment strip → expand works
- [ ] No classic DISCUSSION uppercase Done chrome
- [ ] Literal bodies in collapsed + expanded
- [ ] M152/M153 tip gate + OP eye (Partial = BLOCK)

## Вне scope
Full attach matrix · deep reply product seam · M155 · invent API · port

## Technical subtasks
### t01 — Scaffold discussion modules + CSS
### t02 — Wire Comment strip + reaction slot adjacency
### t03 — Collapsed/expanded states + composer entry
### t04 — M152/M153 visual gate pack
