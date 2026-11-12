# STORY-SPA-NF-LAB-09-greenfield-discussion-plane — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md`  
> **Status:** Blocked · P3 structure Done (`2026-10-13T16:30:20Z`) · pkg-000135 · gate BLOCK · OP eye Absent  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000135`  
> **Depends on:** LAB-07 · LAB-08  
> **Blocks:** LAB-10  
> **ui_scope:** `feed-lab` · visual|mixed · Path A M152 (+M153 tip-light) · Partial=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · `#/lab/feed` · `#/next/feed` unchanged  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Greenfield discussion plane under `features/feed-lab/post/discussion/` per written M152/M153 — collapsed/expanded thread under strip, no Deprecated discussion / classic dual / `FeedDiscussionBlock` on Done path.

## Target module catalog (verbatim backlog · name ≠ create until P3)

| Working name | Role |
|--------------|------|
| `FeedDiscussionPlane` | Region under strip · continuous card · hairline divider |
| `FeedDiscussionSummary` | Collapsed: title count · literal previews · View action |
| `FeedDiscussionHeader` | «Thread» / DS copy — **no** classic DISCUSSION uppercase |
| `FeedCommentTree` / `FeedCommentNode` | Expanded literal bodies · light plane · depth tip-light |
| `FeedComposerEntry` | «Write a comment…» local only · no threads HTTP |

## Artboards
- M152 primary · M153 tip-light (tree/composer; attachments OOS unless Closed)

## FR (verbatim backlog)
- **FR-LAB-09.1** … **FR-LAB-09.6** — see backlog SSOT

## Acceptance Criteria (verbatim backlog)

- [x] Greenfield discussion modules Present
- [x] No Deprecated discussion mount on greenfield Done path
- [x] Comment strip → expand works
- [x] No classic DISCUSSION uppercase Done chrome
- [x] Literal bodies in collapsed + expanded
- [ ] M152/M153 tip gate + OP eye (Partial = BLOCK) · evidence Present · OP Absent → **BLOCK**

## Вне scope (verbatim)
Full attach matrix · deep reply product seam · M155 · invent API · port

## Tasks

| ID | Path | Status |
|----|------|--------|
| T01 | [task-spa-nf-lab-09-t01-scaffold-discussion-home](task-spa-nf-lab-09-t01-scaffold-discussion-home/README.md) | Done |
| T02 | [task-spa-nf-lab-09-t02-wire-comment-strip-reaction-adjacency](task-spa-nf-lab-09-t02-wire-comment-strip-reaction-adjacency/README.md) | Done |
| T03 | [task-spa-nf-lab-09-t03-collapsed-expanded-composer](task-spa-nf-lab-09-t03-collapsed-expanded-composer/README.md) | Done |
| T04 | [task-spa-nf-lab-09-t04-m152-m153-visual-gate](task-spa-nf-lab-09-t04-m152-m153-visual-gate/README.md) | Done · visual BLOCK |

## Gate
[story-acceptance-gate-STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md](story-acceptance-gate-STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md) · **BLOCK**
