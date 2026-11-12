# STORY-SPA-CR-10-picker-portal-escape — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md)  
> **Status:** P3 structure Done · gate **BLOCK** · `2026-10-15T19:58:06Z` · tip active  
> **Package:** `pkg-000146` · component-reactions · REQ-24  
> **ui_scope:** `feed-lab` · **mixed** · UX M154 + OP-UX-MIRROR composition §3.3 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`

## Purpose
Desktop picker portal escape on `#/lab/feed`: `createPortal` → `document.body` · `position: fixed` from zone-1 caret · CR-05 dismiss + CR-06 layout held · forbid removing `FeedPostCard` `overflow: hidden` as primary fix. See backlog FR/AC · mirror §3.3.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Gate: structure PASS · OP eye Absent → **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-10-t01-popover-portal-fixed](task-spa-cr-10-t01-popover-portal-fixed/README.md) | Portal + fixed popover · sheet untouched | Done · ui_anchor |
| T02 | [task-spa-cr-10-t02-anchor-measure-reposition](task-spa-cr-10-t02-anchor-measure-reposition/README.md) | Anchor measure · scroll/resize reposition | Done |
| T03 | [task-spa-cr-10-t03-dismiss-zindex-portal](task-spa-cr-10-t03-dismiss-zindex-portal/README.md) | CR-05 dismiss on portal · z-index · CR-06 held | Done |
| T04 | [task-spa-cr-10-t04-vitest-portal-escape](task-spa-cr-10-t04-vitest-portal-escape/README.md) | Vitest portal host + Path A shots + gate | Done |

## Out of scope
Theme → CR-08 · strip zones → CR-09 · M155 · `#/next/feed` · invent HTTP · primary remove card `overflow:hidden` (P2)

## @mockup handoff
- M154: `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+png)
- Mirror: [OP-UX-MIRROR-lab-feed-composition §3.3](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md)
- Verify URL: `http://127.0.0.1:5173/#/lab/feed`
- Gate: [`story-acceptance-gate-STORY-SPA-CR-10-picker-portal-escape.md`](./story-acceptance-gate-STORY-SPA-CR-10-picker-portal-escape.md)
- Shots: [`screenshots/README.md`](./screenshots/README.md)
