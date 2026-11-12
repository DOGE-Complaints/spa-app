# SPA-CR-21-T01 — People popover anchor to Reactions zone

**Status:** Done · `2026-10-18T12:15:16Z`  
**P3 note:** `activateAggregate({ anchorEl })` · `peopleAnchorRef` · `data-rm-people-anchor=trigger` · popLeft≡Reactions  
**Story:** [`../STORY-SPA-CR-21-people-affordance-residual.md`](../STORY-SPA-CR-21-people-affordance-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:11:38Z`  
**Package:** `pkg-000157`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · [M155](../../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
**@mirror:** residual §4 · M155 A  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:15:16Z`

## Purpose
FR-21.2 · 21.7: Measure/position people popover from **Reactions zone** trigger ref (apiRef/open path), not React slot alone.

## Code Facts (verified at P3)
- `peopleAnchorRef` + `activateAggregate({ anchorEl })` Present
- Capture: `popLeft===reactionsLeft` (`732.5`) · `data-rm-people-anchor=trigger`

## Constraints
- No invent people HTTP · no invent SVG · Partial visual = BLOCK · no invent OP PASS

## AC / DoD
- [x] Popover positions relative to Reactions zone / opening trigger
- [ ] Visual Done not claimed without OP eye

## Where to change
`ReactionsMount.jsx` · `FeedPostCard` / `FeedIssueDetailBody` / lab · `ReactionAggregateRow`

## Verification
```bash
rg -n "peopleAnchorRef|people-anchor|activateAggregate" spa-app/src/features/
```
