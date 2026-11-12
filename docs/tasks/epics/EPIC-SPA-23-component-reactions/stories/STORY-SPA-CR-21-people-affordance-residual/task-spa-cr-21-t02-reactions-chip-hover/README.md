# SPA-CR-21-T02 — Reactions chip hover parity

**Status:** Done · `2026-10-18T12:15:16Z`  
**P3 note:** chip wrapper all zones · CSS hover paints chip only · `feed-post-action-reactions-chip`  
**Story:** [`../STORY-SPA-CR-21-people-affordance-residual.md`](../STORY-SPA-CR-21-people-affordance-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:11:38Z`  
**Package:** `pkg-000157`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md)  
**@mirror:** residual §4 · CR-16 chip grammar  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:15:16Z`

## Purpose
FR-21.4: Reactions zone hover/focus uses **inner chip** (icon+label), not full 56px cell fill — parity with CR-16 React. Comment/Share same grammar.

## Code Facts (verified at P3)
- `data-lab-reactions-chip=true` · chip testid Present · zone cell hover background transparent

## Constraints
- Hold CR-16 React chip · no invent SVG · Partial visual = BLOCK

## AC / DoD
- [x] Reactions hover = chip, not full-cell slab
- [ ] Visual Done not claimed without OP eye

## Where to change
`FeedPostActionStrip.{jsx,css}`

## Verification
```bash
rg -n "reactions-chip|zone-chip|feed-post-action-strip__chip" spa-app/src/features/feed-lab/post/
```
