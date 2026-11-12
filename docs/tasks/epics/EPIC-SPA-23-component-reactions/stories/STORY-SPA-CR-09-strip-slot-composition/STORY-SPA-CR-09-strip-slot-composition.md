# STORY-SPA-CR-09-strip-slot-composition — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md)  
> **Status:** P3 structure Done · gate **BLOCK** · `2026-10-15T19:48:00Z` · tip active  
> **Package:** `pkg-000145` · component-reactions · REQ-24  
> **ui_scope:** `feed-lab` · **mixed** · UX M154 + OP-UX-MIRROR composition §3.2 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`

## Purpose
A+C+B strip composition on `#/lab/feed`: live React slot in zone 1 · 3 zones · no duplicate root mount under strip. See backlog FR/AC · mirror §3.2.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text. Gate: structure PASS · OP eye Absent → **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-09-t01-strip-react-slot-three-zones](task-spa-cr-09-t01-strip-react-slot-three-zones/README.md) | `reactSlot` · 3 zones · no Reactions text zone | Done · ui_anchor |
| T02 | [task-spa-cr-09-t02-card-detail-wire-slot](task-spa-cr-09-t02-card-detail-wire-slot/README.md) | Wire root `FeedLabReactionsMount` into strip slot | Done |
| T03 | [task-spa-cr-09-t03-remove-root-duplicate-mount](task-spa-cr-09-t03-remove-root-duplicate-mount/README.md) | Remove under-strip root mount · keep comment mounts | Done |
| T04 | [task-spa-cr-09-t04-vitest-strip-composition](task-spa-cr-09-t04-vitest-strip-composition/README.md) | Vitest zones=3 + Path A shots + gate | Done |

## Out of scope
Portal → CR-10 · Theme → CR-08 · M155 · `#/next/feed` · invent HTTP · production `FeedCivicPost` 4-zone

## @mockup handoff
- M154: `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+png)
- Mirror: [OP-UX-MIRROR-lab-feed-composition §3.2](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md)
- Verify URL: `http://127.0.0.1:5173/#/lab/feed`
- Gate: [`story-acceptance-gate-STORY-SPA-CR-09-strip-slot-composition.md`](./story-acceptance-gate-STORY-SPA-CR-09-strip-slot-composition.md)
- Shots: [`screenshots/README.md`](./screenshots/README.md)
