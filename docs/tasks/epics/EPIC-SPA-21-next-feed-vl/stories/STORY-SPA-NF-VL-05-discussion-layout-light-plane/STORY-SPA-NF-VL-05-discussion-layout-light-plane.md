# STORY-SPA-NF-VL-05-discussion-layout-light-plane — pipeline mirror

> **Epic:** [EPIC-SPA-21-next-feed-vl](../../EPIC-SPA-21-next-feed-vl.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-05-discussion-layout-light-plane.md`](../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-05-discussion-layout-light-plane.md)  
> **source:** `backlog-stories/next-feed-vl/STORY-SPA-NF-VL-05-discussion-layout-light-plane.md`  
> **Status:** Done · P3 (`2026-10-12T14:57:13Z`) · gate PASS · `pkg-000119`
> **Package:** next-feed-vl · REQ-22 VL · active `pkg-000119`  
> **ui_scope:** `feed` · UX ready M152/M153 + DS §2/§6 · AD-VL-01/02  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five **mandatory**  
> **Arch delta:** AD-VL-01 · AD-VL-02  
> **Related:** EPIC-SPA-20 NF-08 Done — **do not reopen**; VL-01…04 Done — Related only; composer → VL-06

## Purpose
DiscussionLayout + light CommentTree plane on `#/next/feed*` expanded Discussion; classic `#/board` CommentTree unchanged; Closed threads contracts retained.

## Acceptance Criteria (verbatim backlog)
- [x] Live expanded Discussion matches DS + M152/M153
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-vl-05-t01-as-is-shelter-map](task-spa-nf-vl-05-t01-as-is-shelter-map/README.md) | As-is / shelter map | Done |
| T02 | [task-spa-nf-vl-05-t02-ds-comments-layout-tree](task-spa-nf-vl-05-t02-ds-comments-layout-tree/README.md) | DS layout + light tree | Done · ui_anchor |
| T03 | [task-spa-nf-vl-05-t03-semantics-seam](task-spa-nf-vl-05-t03-semantics-seam/README.md) | Semantics seam | Done |
| T04 | [task-spa-nf-vl-05-t04-wire-displace-shelter](task-spa-nf-vl-05-t04-wire-displace-shelter/README.md) | Wire / displace shelter | Done · ui_anchor |
| T05 | [task-spa-nf-vl-05-t05-anti-mixing-verify](task-spa-nf-vl-05-t05-anti-mixing-verify/README.md) | Anti-mixing + verify / gate | Done · ui_anchor |
| T06 | [task-spa-nf-vl-05-t06-docs-residual](task-spa-nf-vl-05-t06-docs-residual/README.md) | Docs residual | Done |
| T07 | [task-spa-nf-vl-05-t07-audit-f1-board-smoke-honesty](task-spa-nf-vl-05-t07-audit-f1-board-smoke-honesty/README.md) | Audit F1 board-smoke honesty | Done · P6 |

## Out of scope
Composer atoms (VL-06) · invent threads API · reopen NF-08 body · mutate `#/board` · M155

## @mockup handoff (P2/P3 Path A)
- M152 + M153 artboards (md/png Present) · DS §2 DiscussionLayout · §6 CommentTree / CommentNode / ThreadConnector / ReplyDepthNotice
- ARCH-DELTA AD-VL-01/02
