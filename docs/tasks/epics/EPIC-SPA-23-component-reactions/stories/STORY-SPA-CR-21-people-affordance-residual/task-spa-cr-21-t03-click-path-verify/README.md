# SPA-CR-21-T03 — Click path Reactions/aggregate → people

**Status:** Done · `2026-10-18T12:15:16Z`  
**P3 note:** zone Reactions + aggregate → people · React → picker held · fixture …-002  
**Story:** [`../STORY-SPA-CR-21-people-affordance-residual.md`](../STORY-SPA-CR-21-people-affordance-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:11:38Z`  
**Package:** `pkg-000157`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · [M155](../../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
**@mirror:** residual §4.1 triggers · M155 A  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:15:16Z`

## Purpose
FR-21.1 · 21.3 · 21.5: zone `reactions` → `activateAggregate` → people (not picker); aggregate same path; FixtureAdapter only.

## Code Facts (verified at P3)
- FeedPostCard / IssueDetail / lab pass `anchorEl` · aggregate row passes control · shots 01/03/04

## Constraints
- No invent people HTTP · no reopen picker-on-Reactions · no invent OP PASS

## AC / DoD
- [x] Reactions click → people · picker closed
- [x] Populated aggregate → same people path
- [ ] Visual Done not claimed without OP eye

## Where to change
`FeedPostCard.jsx` · `FeedIssueDetailBody.jsx` · `ReactionsLabCanvas.jsx` · `ReactionAggregateRow.jsx`

## Verification
```bash
rg -n "activateAggregate|anchorEl" spa-app/src/features/feed-lab/post/ spa-app/src/features/reactions-mount/
```
