# STORY-SPA-CT-15-lab-host-residual — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-15-lab-host-residual.md)  
> **Status:** P6 T06 Done · gate **BLOCK** · `2026-10-20T09:00:37Z` · tip active  
> **Package:** `pkg-000173` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX residual §3 **G-M2 · G-M3 · G-M4 · G-L5** · M152-C/E · M153 branch/G · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-01 · CT-06 · CT-08 · soft CR aggregate  
> **Runtime:** P6 T06 Done · Await **P7/P8** · F1 OP eye held · no invent OP PASS

## Purpose

Lab host residual: wire `narrow` / sticky · `branchDisclosure` when fixture needs it · collapsed «Reactions from residents» only if aggregate confirmed · `Discussion · Issue {id}` when id provided · no invent aggregate/people HTTP.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-15-t01-narrow-wire](task-spa-ct-15-t01-narrow-wire/README.md) | Pass `narrow` / sticky stands on lab card or always-on 390 stand | **Done** |
| T02 | [task-spa-ct-15-t02-branch-disclosure-lab](task-spa-ct-15-t02-branch-disclosure-lab/README.md) | Enable `branchDisclosure` when fixture needs it | **Done** |
| T03 | [task-spa-ct-15-t03-residents-row](task-spa-ct-15-t03-residents-row/README.md) | Collapsed «Reactions from residents» only if aggregate confirmed | **Done** |
| T04 | [task-spa-ct-15-t04-heading-issue-id](task-spa-ct-15-t04-heading-issue-id/README.md) | `Discussion · Issue {id}` when fixture/host provides id | **Done** |
| T05 | [task-spa-ct-15-t05-vitest-host](task-spa-ct-15-t05-vitest-host/README.md) | Markers for narrow/branch/omit-residents-without-aggregate | **Done** |
| T06 | [task-spa-ct-15-t06-screenshots-root-readme](task-spa-ct-15-t06-screenshots-root-readme/README.md) | Audit F2 story-root `screenshots/README.md` indexer | **Done** |

## Out of scope

Invent aggregate API · people inside thread-mount · invent OP PASS · spine (CT-14) · `#/next/feed`

## @mockup handoff

- Mirror: [OP-UX residual §3 G-M2 · G-M3 · G-M4 · G-L5](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)
- Artboard: [M152-C/E](../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [M153 branch/G](../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- Verify: `#/lab/feed` narrow · branch · residents omit · issue heading · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-15-lab-host-residual.md) · **BLOCK**
- Shots: [screenshots/README.md](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md) · md5 `b98f9c432ccf` · `cde0cdbe32b5` · `fb2fd10aea90` · `70b92e8cbc66` · `370b470d9a7a`
- NO STORY-UX-MOCKUP-BRIEF
