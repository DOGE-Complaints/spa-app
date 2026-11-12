# STORY-SPA-CR-17-reactors-popover — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-17-reactors-popover.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-17-reactors-popover.md)  
> **Status:** P3 Done · gate **BLOCK** · `2026-10-18T10:39:51Z` · tip active  
> **Package:** `pkg-000153` · component-reactions · REQ-24  
> **ui_scope:** `reactions-mount` / `feed-lab` · **mixed** · UX M155 A + polish §4.1–4.3 · Path A · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Prior:** CR-16 P8 · Gap v2 `reactions.svg` **Absent** → Runtime URL wired · visual BLOCK residual OK

## Purpose
Reactions/aggregate open people popover (not picker). Compact `ReactorsPopover` M155 A. FixtureAdapter people · Live fail-closed.

## Acceptance Criteria
See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-17-t01-stop-picker-on-aggregate](task-spa-cr-17-t01-stop-picker-on-aggregate/README.md) | People open ≠ picker | Done |
| T02 | [task-spa-cr-17-t02-reactors-popover-ui](task-spa-cr-17-t02-reactors-popover-ui/README.md) | ReactorsPopover UI A | Done |
| T03 | [task-spa-cr-17-t03-fixture-list-reactors](task-spa-cr-17-t03-fixture-list-reactors/README.md) | Fixture people · Live fail-closed | Done |
| T04 | [task-spa-cr-17-t04-reactions-icon-wire](task-spa-cr-17-t04-reactions-icon-wire/README.md) | Wire reactions.svg Runtime URL | Done |
| T05 | [task-spa-cr-17-t05-vitest-popover](task-spa-cr-17-t05-vitest-popover/README.md) | Vitest + Path A shots + gate | Done |

## Out of scope
Invent people HTTP · invent SVG bodies · Connect in compact popover · CR-18 dialog · CR-19 sheet · `#/next/feed` · invent OP PASS

## @mockup handoff
- Mirror: [OP-UX-MIRROR-strip-polish §4.1–4.3](../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 Panel A](../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)
- Verify: `#/lab/feed` · light/dark · Reactions ≠ picker
- Gap v2 residual → visual **BLOCK** OK (no invent SVG)
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-17-reactors-popover.md) · **BLOCK** · Await P4
