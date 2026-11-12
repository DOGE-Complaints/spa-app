# STORY-SPA-CT-01 — IssueThreadBlock states (M152 A–E)

## Meta

- **Key:** `STORY-SPA-CT-01-issue-thread-block-states`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P3 Done · gate BLOCK · `2026-10-18T13:01:37Z` · `pkg-000159` · **tip** · Await P4 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-01-issue-thread-block-states/STORY-SPA-CT-01-issue-thread-block-states.md)
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** —
- **Blocks:** CT-02 · CT-08
- **UX mirror:** [OP-UX-MIRROR…](OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.1
- **Arch:** [ARCHITECTURE.md](ARCHITECTURE.md) §3–6
- **Artboard:** [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)
- **Code home (target):** `thread-mount/IssueThreadBlock.jsx` · `ThreadMount.jsx`

## Зачем

Пять семантических состояний обсуждения под strip при целой civic Issue: loading / empty / populated-collapsed / unavailable / narrow.

## FR

- **FR-CT-01.1** `status=loading`: Discussion heading · Loading discussion… · skeleton lines only in thread region.  
- **FR-CT-01.2** `status=empty`: No comments yet · constructive invitation · composer entry when capability permits.  
- **FR-CT-01.3** `status=populated` collapsed: literal comment body previews · View discussion · no gray bars for loaded bodies.  
- **FR-CT-01.4** `status=unavailable`: Discussion unavailable · Try again · no fake comments.  
- **FR-CT-01.5** Narrow ~390: same populated-collapsed semantics · no horizontal overflow.  
- **FR-CT-01.6** Civic Issue chrome above strip remains interactive in all states.  
- **FR-CT-01.7** No invented authors/avatars/times/counts.

## Вне scope

M153 nest detail · M157 · reactions people · invent HTTP · `#/next/feed`

## Acceptance Criteria

- [ ] Fixture stands cover A/B/C/D (+ E stress)  
- [ ] Literal bodies in C · skeletons only in A  
- [ ] Vitest status → chrome markers  
- [ ] Verify lab after CT-08 · OP eye  

## Technical subtasks

> Skill: `react-expert` · Await P1.3 · Arch §§3–6

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-01-t01-issue-thread-block` | Todo | Greenfield IssueThreadBlock status chrome A–D | `thread-mount/IssueThreadBlock.*` | 01.1–01.4 · 01.7 |
| `task-spa-ct-01-t02-thread-mount-status` | Todo | ThreadMount owns status prop + collapsed summary slot | `ThreadMount.jsx` | 01.3 |
| `task-spa-ct-01-t03-fixture-states` | Todo | FixtureAdapter snapshots for A–D | `adapters/FixtureAdapter.js` | 01.1–01.4 |
| `task-spa-ct-01-t04-narrow-e` | Todo | CSS/stack for 390 lab stress | thread-mount CSS · lab stress attrs | 01.5 |
| `task-spa-ct-01-t05-vitest-states` | Todo | Status → testids / no fake identity | `__tests__` | AC |

### Constraints

- No invent HTTP · no gray loaded bodies · name≠create until P1.3  
- Do not own reactions surfaces  

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

M152 state matrix presentable from ThreadMount fixtures.
