# UI-1 mockup-spec — STORY-SPA-NF-VL-06 composer atoms

**Date:** `2026-10-12T15:13:32Z` · **Path A** · ui_gate: auto (UX ready M153 Present)  
**@mockup:** M153 md/png  
**DS SSOT:** §7 ComposerEntry / ThreadComposer / ReplyContext / CommentTextInput / ComposerActionRow / SubmitCommentAction / ComposerFeedback / DraftDiscardDialog

## Must-states

| Claim | Source | Implement |
|-------|--------|-----------|
| ComposerEntry compact → full | DS §7 / M153 | `ComposerEntry` · `data-vl-done-surface` |
| ThreadComposer Closed submit | FR-VL-06.4 | `ThreadComposer` · no invent POST |
| ReplyContext | FR-VL-06.2 | `ReplyContext` |
| DraftDiscardDialog dirty leave | FR-VL-06.3 | `DraftDiscardDialog` |
| Classic board composer unchanged | AD-VL-01/02 | No mutate `#/board` |

## Out

Attachments production · invent POST · reopen NF-08 body · VL-11 verify chrome Done claim

## Human gate

Path A — artboard Present; auto-accepted for P3.
