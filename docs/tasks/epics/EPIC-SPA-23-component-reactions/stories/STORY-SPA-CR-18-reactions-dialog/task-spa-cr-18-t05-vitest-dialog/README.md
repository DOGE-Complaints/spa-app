# SPA-CR-18-T05 — Vitest dialog + gate/shots

**Status:** Done · `2026-10-18T10:47:25Z`  
**P3 note: vitest 125/125 · Path A shots 01–05 · gate BLOCK**  
**Story:** [`../STORY-SPA-CR-18-reactions-dialog.md`](../STORY-SPA-CR-18-reactions-dialog.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-18-reactions-dialog.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-18-reactions-dialog.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T10:44:10Z`  
**Package:** `pkg-000154`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 artboard](../../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §4.4 · M155 Panel B  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T10:47:25Z`

## Purpose
AC: Vitest tabs · Connect stub · You · empty/loading/error · Path A shots · gate BLOCK if OP Absent.

## Code Facts (verified at scaffold)
- AS-IS: CR-17 ReactorsPopover Present · dialog Absent · people fixtures Present · Live fail-closed
- Prior CR-17 visual BLOCK residual (OP eye · Gap v2) · Partial visual BLOCK until OP eye

## Implement notes
- Lab fixtures only · Live fail-closed · no invent people HTTP · no picker inside dialog · Connect stub only
- OOS: invent people HTTP · real Connect product · CR-19 sheet · invent OP PASS · `#/next/feed`

## Constraints
- Partial visual = BLOCK · prior Gap/OP residual OK · no invent OP PASS
- Popover→View all→dialog · fixtures only · Live fail-closed
- No invent people HTTP · no picker inside dialog · Connect stub only

## AC / DoD
- [x] Structure for AC Present
- [ ] Visual Done not claimed without OP eye

## Where to change
reactions-mount + feed-lab tests · gate/shots

## Verification
```bash
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
```
