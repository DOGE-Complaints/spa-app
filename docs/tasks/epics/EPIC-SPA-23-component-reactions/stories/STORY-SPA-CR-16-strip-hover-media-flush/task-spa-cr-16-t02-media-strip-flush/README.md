# SPA-CR-16-T02 — Media–strip flush

**Status:** Done · `2026-10-17T13:58:39Z`  
**P3 note:** feed-card-media-flush · detail __media · strip hugs media  
**Story:** [`../STORY-SPA-CR-16-strip-hover-media-flush.md`](../STORY-SPA-CR-16-strip-hover-media-flush.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md)  
**ui_scope:** `feed-lab` · **visual**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-17T13:55:57Z`  
**Package:** `pkg-000152`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §3 (chip hover + media flush)  
**Runtime:** OP go (queueSpec) — story Await «делай» superseded for this wave

## Purpose
FR-16.4–16.5: Card media bottom flush with action strip top; detail overlay parity.

## Code Facts (verified at scaffold)
- AS-IS: media inside `__body` with padding → large gap under image before strip
- CR-11…15 structure Present · Partial visual BLOCK until OP eye

## Implement notes
- Full-bleed media segment or zero bottom padding · identity/title/summary keep side padding · detail body match
- OOS: invent HTTP · M155 people · invent SVG · invent OP PASS · `#/next/feed`

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Chip hover not full-cell · media–strip flush
- Keep 4-zone strip (CR-11) · theme tokens only (CR-08)
- No invent HTTP · no M155 · no invent SVG

## AC / DoD
- [x] Structure for FR 16.4–16.5 Present
- [ ] Visual Done not claimed without OP eye

## Where to change
`FeedPostCard.jsx` + `.css` · `FeedIssueDetailBody`

## Verification
```bash
rg -n "feed-post-card__body|FeedPostMedia|padding" spa-app/src/features/feed-lab/post/FeedPostCard.css spa-app/src/features/feed-lab/post/FeedPostCard.jsx
```
