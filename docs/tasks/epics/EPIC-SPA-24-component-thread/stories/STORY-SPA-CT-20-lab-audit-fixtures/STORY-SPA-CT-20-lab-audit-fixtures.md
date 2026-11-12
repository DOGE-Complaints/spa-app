# STORY-SPA-CT-20-lab-audit-fixtures — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-20-lab-audit-fixtures.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-20-lab-audit-fixtures.md)  
> **Status:** P5 APPLY · gate **BLOCK** (OP eye Absent) · `2026-10-20T13:18:05Z` · `activation: none`  
> **Package:** `pkg-000178` · component-thread · REQ-22 FR-22.4 · **unchanged**  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A LAB-1…4 · M152/M153/M153a coverage (not new gen) · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-15 · CT-16 · CT-17  
> **Runtime:** P5 TASKED=0 · F1 WAIVED operator · F2 WAIVED info · Await **P8** · no invent HTTP/OP PASS

## Purpose

Make M152 loading/empty/unavailable, M153 post-fail, attach-off, and max-depth≥3 Reply block **reachable** on `#/lab/feed` (LAB-1…4). Expand puppeteer harness for CT-16 dual-append green + CT-17 real picker (no synthetic-only Ready). Any LAB not closed in-wave → OP-WAIVE with explicit note.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-20-t01-status-stands](task-spa-ct-20-t01-status-stands/README.md) | Wire loading/empty/unavailable stands on feed lab | **Done** |
| T02 | [task-spa-ct-20-t02-fail-attach-depth](task-spa-ct-20-t02-fail-attach-depth/README.md) | forcePostFail · attach-off · depth≥maxDepth fixtures | **Done** |
| T03 | [task-spa-ct-20-t03-harness-expand](task-spa-ct-20-t03-harness-expand/README.md) | Assert dual-append + picker + no synthetic-only Ready | **Done** |
| T04 | [task-spa-ct-20-t04-lab-waiver-log](task-spa-ct-20-t04-lab-waiver-log/README.md) | Document closed vs OP-WAIVED LAB items | **Done** |

## Out of scope

Invent new artboard states beyond M152/M153/M153a · invent HTTP · invent OP PASS · product CSS tokens (CT-18/19) · HOLD reactions · `#/next/feed`

## @mockup handoff

- Mirror: [OP-UX M153a/b gaps · LAB-1…4](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)
- Analysis: [puppeteer gaps LAB-1…4](../../../../analysis/analysis-lab-feed-thread-puppeteer-gaps-2026-10-20.md)
- Coverage (not new gen): M152 A–E · M153 F/G · M153a F
- Arch: [§12.4](../../../../backlog-stories/component-thread/ARCHITECTURE.md)
- Verify: `#/lab/feed` residual stands · puppeteer dual-append+picker · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-20-lab-audit-fixtures.md) · **BLOCK**
- Shots: [visual-checklists](./visual-checklists-lab-audit-fixtures.md) · [screenshots/README.md](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
- LAB log: [lab-waiver-log](./lab-waiver-log-STORY-SPA-CT-20.md) · all CLOSED
- Disposition: [p5-disposition-STORY-SPA-CT-20-2026-10-20.md](../../../../analysis/p5-disposition-STORY-SPA-CT-20-2026-10-20.md)
- NO STORY-UX-MOCKUP-BRIEF
