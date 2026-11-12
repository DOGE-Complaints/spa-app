# STORY-SPA-NS-11-profile-next-shell — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-11-profile-next-shell.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-11-profile-next-shell.md)  
> **Status:** P8 local close · T01–T03 **Done** · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-23T13:56:51Z` · `pkg-000213` closed · `activation: none` · NO PUSH · [disposition](../../../../../run-reports/p5-disposition-STORY-SPA-NS-11-2026-10-23.md) · [p7](../../../../../analysis/reaudit-STORY-SPA-NS-11-p7-2026-10-23.md) · [arch](../../../../../architecture/next-feed-vl/11-profile-next-shell.md)  
> **Package:** `pkg-000213` · next-shell · Interview **S3** · wave `OP-spa nf24-wave4-20261023`  
> **ui_scope:** `shell` · **mixed** · Path A evidence 03 + next/feed chrome parity · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft NS-01…06 shell Present · soft NS-03 ProfileRail · soft NS-05 classic chrome pattern · tip after `pkg-000212` NF-24 P8  
> **Runtime:** Path A shots 01–05 Present · CAPTURE-META `fails: []` · ns11 **4/4** · cabinet **9/9** · OP eye Absent → gate **BLOCK** · no invent OP PASS · no invent CDN · no invent CAB-08 · no invent NS-12

## Purpose

`/profile` renders next public shell: Header + ProfileRail (+ PublicFooter as next/feed pattern) — not classic Workspace/Board AppShell defaults. Cabinet content held in main region. Vitest · OP eye — no invent PASS.

## L1 — FR (backlog verbatim)

- **FR-NS-11.1** `/profile` renders next public shell: Header + ProfileRail (+ footer as next/feed pattern) — not classic Workspace/Board AppShell defaults.  
- **FR-NS-11.2** Cabinet page content held inside next shell main region.  
- **FR-NS-11.3** Soft: other protected routes OOS unless already next-shelled.  
- **FR-NS-11.4** Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Profile shows Header + ProfileRail — structure Present · OP eye Absent  
- [x] No Workspace/Board classic sidebar — structure Present · OP eye Absent  
- [x] Vitest · OP eye — vitest green · OP Absent → Partial=**BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-11-profile-next-shell.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-11-t01-layout](task-spa-ns-11-t01-layout/README.md) | AppShellLayout profile → next shell props | **Done** |
| T02 | [task-spa-ns-11-t02-footer](task-spa-ns-11-t02-footer/README.md) | PublicFooter on profile if next/feed parity | **Done** |
| T03 | [task-spa-ns-11-t03-vitest](task-spa-ns-11-t03-vitest/README.md) | Route shell markers | **Done** |

**Order:** t01 → t02 → t03

## Out of scope (backlog verbatim)

CAB-08 layout · invent CDN · My stories freeze (NS-12)

## DoD (backlog verbatim)

Profile shows Header + ProfileRail · No Workspace/Board classic sidebar · Vitest · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **S3** · [evidence 03](../../../../../analysis/evidence/op-residual-wave4-2026-10-23/03-profile-wrong-shell.png) · next-shell chrome parity (`#/next/feed` / NS-05) · Path A  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-profile-next-shell.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
