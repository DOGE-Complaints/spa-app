# STORY-SPA-CR-05-strip-open-dismiss — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md)  
> **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · P8 Done · `2026-10-15T10:38:10Z` · tip residual CR-06  
> **Package:** `pkg-000141` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` · UX M154 + OP-UX-MIRROR §3.1–3.2 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert` (T04 `test-master`)

## Purpose
Facebook-like open/dismiss: empty → React opens picker; populated → aggregate hover/highlight/open (React hidden); dismiss outside + icon-only NS close + Escape. See backlog FR/AC · mirror normative.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-05-t01-empty-react-populated-hide](task-spa-cr-05-t01-empty-react-populated-hide/README.md) | Empty React visible; populated hide React | Done · ui_anchor |
| T02 | [task-spa-cr-05-t02-aggregate-hover-open](task-spa-cr-05-t02-aggregate-hover-open/README.md) | Aggregate hover highlight + open picker | Done |
| T03 | [task-spa-cr-05-t03-dismiss-outside-icon-close](task-spa-cr-05-t03-dismiss-outside-icon-close/README.md) | Outside dismiss + icon-only close + Escape | Done |
| T04 | [task-spa-cr-05-t04-vitest-open-dismiss](task-spa-cr-05-t04-vitest-open-dismiss/README.md) | Vitest empty/populated + outside dismiss | Done |

## Out of scope
M155 people · invent HTTP · `#/next/feed` cutover · CR-06 hug/hint · CR-07 lab-feed cutover · invent close SVG

## @mockup handoff
- M154: `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+png)
- Mirror: [OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.1–3.2
- Icons: [STORY-SPA-CR-icon-assets.md](../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md)
