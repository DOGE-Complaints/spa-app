# STORY-SPA-CT-13 — Comment React/Reply action chrome (G-H5)

## Meta

- **Key:** `STORY-SPA-CT-13-comment-action-chrome`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P3/P5 Done · gate BLOCK · `pkg-000171` · `2026-10-19T12:42:31Z`
- **Pipeline:** [STORY-SPA-CT-13-comment-action-chrome](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-13-comment-action-chrome/STORY-SPA-CT-13-comment-action-chrome.md)
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-09 · soft CR package
- **Blocks:** OP eye comment actions
- **UX mirror:** [OP-UX residual 10-19](OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H5
- **Analysis:** [ux-gaps 2026-10-19](../../../analysis/analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md) G-H5
- **Artboard:** [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) React/Reply
- **Code home:** `CommentNode.jsx` · `CommentNode.css` · host `renderCommentReactions`

## Зачем

Mockup: paired icon+label pills (thumbs-up React, speech Reply), blue, separator. Lab: React = full `FeedLabReactionsMount` / strip DNA; Reply = underlined grey text link · no icon · no separator.

## FR

- **FR-CT-13.1** Under each bubble: **React** and **Reply** as compact icon+label pills with vertical separator.  
- **FR-CT-13.2** React remains **plug** to `reactions-mount` (`target=comment`) — density/chrome wrap only · no second reactions stack.  
- **FR-CT-13.3** Reply pill: speech/reply glyph (reuse Present `reply.svg` if applicable) + label · not underline-only link.  
- **FR-CT-13.4** Blue / primary action grammar per M153 tone (tokens; no purple invent).  
- **FR-CT-13.5** No people/picker ownership inside thread-mount (CT-09 R-bound holds).  
- **FR-CT-13.6** Share / Reactions strip zones remain host strip only · not on comment node.

## Вне scope

Rewrite CR package · invent people HTTP · spine (CT-14) · invent OP PASS

## Acceptance Criteria

- [ ] Comment node shows pill pair React | Reply with separator  
- [ ] React still opens comment reactions via plug (not strip DNA full width)  
- [ ] Reply underline-only chrome gone  
- [ ] OP eye gate (Absent = BLOCK)

## Technical subtasks

> Skill: `react-expert` · Arch [§11.3](ARCHITECTURE.md) · P3 Done · gate BLOCK

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-13-t01-pill-row-css` | Done | React \| Reply pill row + separator tokens | `CommentNode.css` | 13.1 · 13.4 |
| `task-spa-ct-13-t02-react-density-wrap` | Done | Compact wrap around `renderCommentReactions` · no strip DNA width | `CommentNode.jsx` · host plug | 13.2 · 13.5 |
| `task-spa-ct-13-t03-reply-pill-icon` | Done | Reply icon+label (`reply.svg`) · remove underline-only link | CommentNode · CSS | 13.3 |
| `task-spa-ct-13-t04-vitest-actions` | Done | Markers for pill pair · R-bound no people import | `__tests__` · CT-09 tests | 13.5 · 13.6 |

### Constraints

- No people/picker in thread-mount  
- Plug boundary: reactions-mount owns reaction open · Arch §11.3  

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Comment action chrome matches M153 paired pills without breaking CT-09 plug.
