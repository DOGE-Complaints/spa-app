# STORY-SPA-CR-07-lab-feed-cutover — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md)  
> **Status:** **BLOCKED** (OP eye Absent · Partial visual) · structure Done · P5 TASKED=0 · P8 Done · `2026-10-15T11:11:48Z` · tip residual  


> **Package:** `pkg-000143` · component-reactions · REQ-24  
> **ui_scope:** `feed-lab` · UX M154 + OP-UX-MIRROR §3.4 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert` (T04 `test-master`)

## Purpose
Replace lab-local `FeedReactionPlane` with greenfield `ReactionsMount` on `#/lab/feed` (post-root + comment slots) so OP can full-cycle test CR-05/06 in post/thread context. See backlog FR/AC · mirror §3.4.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-07-t01-root-reactions-mount-wire](task-spa-cr-07-t01-root-reactions-mount-wire/README.md) | Root slot → ReactionsMount + FixtureAdapter | Done · ui_anchor |
| T02 | [task-spa-cr-07-t02-comment-reactions-mount-wire](task-spa-cr-07-t02-comment-reactions-mount-wire/README.md) | Comment slots → ReactionsMount (`target=comment`) | Done |
| T03 | [task-spa-cr-07-t03-retire-feed-reaction-plane](task-spa-cr-07-t03-retire-feed-reaction-plane/README.md) | Retire/Deprecated FeedReaction* · no dual live · ban classic | Done |
| T04 | [task-spa-cr-07-t04-vitest-lab-feed-cutover](task-spa-cr-07-t04-vitest-lab-feed-cutover/README.md) | Vitest/lab smoke + Path A shots + gate notes | Done |

## Out of scope
`#/next/feed` production · M155 · invent HTTP · delete `#/lab/reactions` stands (CR-03/04 may remain)

## @mockup handoff
- M154: `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+png)
- Mirror: [OP-UX-MIRROR §3.4](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md)
- Verify URL: `http://127.0.0.1:5173/#/lab/feed`
