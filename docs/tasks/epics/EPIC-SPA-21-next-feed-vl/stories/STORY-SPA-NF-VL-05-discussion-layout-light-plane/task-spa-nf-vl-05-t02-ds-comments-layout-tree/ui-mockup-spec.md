# UI-1 mockup-spec — STORY-SPA-NF-VL-05 DiscussionLayout + light tree

**Date:** `2026-10-12T14:57:13Z` · **Path A** · ui_gate: auto (UX ready M152/M153 Present)  
**@mockup:** M152 + M153 md/png  
**DS SSOT:** §2 DiscussionLayout · §6 CommentTree / CommentNode / ThreadConnector / ReplyDepthNotice

## Must-states

| Claim | Source | Implement |
|-------|--------|-----------|
| DiscussionLayout slots header/body/composer/stub | DS §2 | `DiscussionLayout` · `data-vl-done-surface="DiscussionLayout"` |
| Light CommentTree plane | M153 light-first | `comments/CommentTree` · `data-plane="light"` |
| CommentNode + ThreadConnector | M153 / DS §6 | Named surfaces · no classic dark card / identity disk |
| ReplyDepthNotice at max_depth scene | M153 THR-T-B | `ReplyDepthNotice` · Closed `maxDepth` prop |
| Classic board tree unchanged | AD-VL-01/02 | No mutate `#/board` CommentTree |

## Shelter (not Done here)

Composer atoms → VL-06 · Invite stub → VL-12 · invent threads API OOS

## Human gate

Path A — artboards Present; auto-accepted for P3.
