# STORY-SPA-CR-18-reactions-dialog — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-18-reactions-dialog.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-18-reactions-dialog.md)  
> **Status:** P3 Done · gate **BLOCK** · `2026-10-18T10:47:25Z` · tip active  
> **Package:** `pkg-000154` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` / `feed-lab` · **mixed** · UX M155 B + polish §4.4 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-17 structure Present · visual BLOCK residual held

## Purpose
Full distribution dialog (M155 B): tabs · Connect stub · You · empty/loading/error. Popover→View all→dialog. Lab fixtures only.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-18-t01-reactions-dialog-shell](task-spa-cr-18-t01-reactions-dialog-shell/README.md) | Dialog shell · focus trap · Escape | Done |
| T02 | [task-spa-cr-18-t02-tabs-filter](task-spa-cr-18-t02-tabs-filter/README.md) | All + type tabs · filter fixtures | Done |
| T03 | [task-spa-cr-18-t03-row-connect-stub](task-spa-cr-18-t03-row-connect-stub/README.md) | Connect/You/unavailable stubs | Done |
| T04 | [task-spa-cr-18-t04-popover-to-dialog](task-spa-cr-18-t04-popover-to-dialog/README.md) | View all → dialog wire | Done |
| T05 | [task-spa-cr-18-t05-vitest-dialog](task-spa-cr-18-t05-vitest-dialog/README.md) | Vitest + Path A shots + gate | Done |

## Out of scope
Invent people HTTP · real Connect product · picker inside dialog · CR-19 sheet · invent OP PASS · `#/next/feed`

## @mockup handoff
- Mirror: [OP-UX-MIRROR-strip-polish §4.4](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 Panel B](../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)
- Verify: `#/lab/feed` · light/dark · View all → dialog
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-18-reactions-dialog.md) · **BLOCK** · Await P4
