# STORY-SPA-NF-VL-06-composer-atoms — pipeline mirror

> **Epic:** [EPIC-SPA-21-next-feed-vl](../../EPIC-SPA-21-next-feed-vl.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-06-composer-atoms.md`](../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-06-composer-atoms.md)  
> **source:** `backlog-stories/next-feed-vl/STORY-SPA-NF-VL-06-composer-atoms.md`  
> **Status:** Done · P3 (`2026-10-12T15:13:32Z`) · gate PASS · `pkg-000120`
> **Package:** next-feed-vl · REQ-22 VL · active `pkg-000120`  
> **ui_scope:** `feed` · UX ready M153 + DS §7 · AD-VL-01/02  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five **mandatory**  
> **Arch delta:** AD-VL-01 · AD-VL-02  
> **Related:** EPIC-SPA-20 NF-08 Done — **do not reopen oval as body**; VL-01…05 Done — Related only; verify chrome → VL-11

## Purpose
DS composer atoms on `#/next/feed*` DiscussionLayout composer slot; classic `#/board` CommentComposer unchanged; Closed submit contracts retained; attachments production OOS.

## Acceptance Criteria (verbatim backlog)
- [x] Live composer atoms match DS + M153
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-vl-06-t01-as-is-shelter-map](task-spa-nf-vl-06-t01-as-is-shelter-map/README.md) | As-is / shelter map | Done |
| T02 | [task-spa-nf-vl-06-t02-ds-composer-modules](task-spa-nf-vl-06-t02-ds-composer-modules/README.md) | DS composer modules | Done · ui_anchor |
| T03 | [task-spa-nf-vl-06-t03-semantics-seam](task-spa-nf-vl-06-t03-semantics-seam/README.md) | Semantics seam | Done |
| T04 | [task-spa-nf-vl-06-t04-wire-displace-shelter](task-spa-nf-vl-06-t04-wire-displace-shelter/README.md) | Wire / displace shelter | Done · ui_anchor |
| T05 | [task-spa-nf-vl-06-t05-anti-mixing-verify](task-spa-nf-vl-06-t05-anti-mixing-verify/README.md) | Anti-mixing + verify / gate | Done · ui_anchor |
| T06 | [task-spa-nf-vl-06-t06-docs-residual](task-spa-nf-vl-06-t06-docs-residual/README.md) | Docs residual | Done |
| T07 | [task-spa-nf-vl-06-t07-audit-f1-composer-slot-crop-honesty](task-spa-nf-vl-06-t07-audit-f1-composer-slot-crop-honesty/README.md) | Audit F1 composer-slot crop | Done · P6 |

## Out of scope
Attachments production · invent POST fields · reopen NF-08 oval as body · mutate `#/board` · VL-11 verify chrome claim as Done

## @mockup handoff (P2/P3 Path A)
- M153 artboard (md/png Present) · DS §7 ComposerEntry / ThreadComposer / ReplyContext / CommentTextInput / ComposerActionRow / SubmitCommentAction / ComposerFeedback / DraftDiscardDialog
- ARCH-DELTA AD-VL-01/02
