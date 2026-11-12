# SPA-CR-21-T04 — Vitest people affordance + Path A gate

**Status:** Done · `2026-10-18T12:15:16Z`  
**P3 note:** cr21 Present · suite **140**/140 · Path A shots 01–05 · gate BLOCK  
**Story:** [`../STORY-SPA-CR-21-people-affordance-residual.md`](../STORY-SPA-CR-21-people-affordance-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:11:38Z`  
**Package:** `pkg-000157`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md)  
**@mirror:** residual §4 · Path A Partial=BLOCK  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:15:16Z`

## Purpose
AC: Vitest — Reactions≠picker · peopleAnchor=trigger · chip Present · Gap v2 Present · Path A + gate. OP eye Absent = BLOCK.

## Code Facts (verified at P3)
- `reactionsMount.cr21.test.jsx` · 140/140 · md5 prefixes in full-cycle README

## Constraints
- Partial visual = BLOCK without OP eye · no invent SVG/people HTTP

## AC / DoD
- [x] Vitest coverage for affordance holds
- [x] Path A shots + gate updated at P3
- [ ] Visual Done not claimed without OP eye

## Where to change
`reactionsMount.cr21.test.jsx` · gate · screenshots

## Verification
```bash
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
```
