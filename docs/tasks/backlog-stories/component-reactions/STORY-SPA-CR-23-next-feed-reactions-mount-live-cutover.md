# STORY-SPA-CR-23 — `#/next/feed` ReactionsMount Live cutover

## Meta

- **Key:** `STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §1](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY · gate **BLOCK** · **BLOCKED** (OP eye) · [disposition](../../../analysis/p5-disposition-STORY-SPA-CR-23-2026-10-20.md) · [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md) · `pkg-000187` · tip · activation none · F1/F2 WAIVED · TASKED=0 · Await P8 · `2026-10-20T21:21:04Z` · **no UX gen required**
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) · [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.6 / FR-22.15
- **Depends on:** CR-07 lab cutover Present · soft **CT-28** (strip host adjacency)
- **Blocks:** OP eye production reactions chrome on `#/next/feed`
- **Interview:** [INTERVIEW-CT-28-plus…](../component-thread/INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md) N1 · N3 · N6
- **Gap:** [analysis-next-feed-thread-reactions-cutover…](../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)
- **Code home (targets):** `features/reactions-mount/` · `adapters/LiveAdapter.js` · `FeedCivicPost` / strip · retire Done `FeedReactionsStrip` / `ReactionChrome` on next/feed

## Зачем

Lab feed uses `reactions-mount` (CR-07). Production `#/next/feed` still uses `FeedReactionsStrip` + `ReactionChrome`. LiveAdapter already wraps `ThreadsSocialClient.react`. Cutover presentation Done path to ReactionsMount on next/feed (root + comment with CT-28).

## L1 — FR

- **FR-CR-23.1** `#/next/feed*` civic strip React / Reactions zones mount **`reactions-mount`** (LiveAdapter · issueId).  
- **FR-CR-23.2** Comment-node React plugs same package `target=comment` when ThreadMount cutover Present (CT-28).  
- **FR-CR-23.3** `FeedReactionsStrip` / classic `ReactionChrome` ≠ Done claim on `#/next/feed*` after cutover.  
- **FR-CR-23.4** One data plane: Closed `ThreadsSocialClient` only · no invent paths.  
- **FR-CR-23.5** People Live fail-closed (lab fixtures may stay lab-only).  
- **FR-CR-23.6** Lab `#/lab/feed` / `#/lab/reactions` Fixture path unchanged.  
- **FR-CR-23.7** Vitest: next-feed hosts `data-testid="reactions-mount"` · Live adapter kind.

## Вне scope

ThreadMount bind (CT-28) · media stub (CT-29) · invent people HTTP · invent OP PASS · `#/board`

## L1 — Acceptance Criteria

- [x] ReactionsMount on next/feed strip (structure)  
- [x] Comment target when CT-28 Present (structure)  
- [x] FeedReactionsStrip not Done surface (structure)  
- [x] ThreadsSocialClient only (structure)  
- [x] People Live fail-closed (structure)  
- [x] Lab held (structure)  
- [x] Vitest (structure)  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§1](ARCHITECTURE.md) · P1.3 APPLY · `pkg-000187` · after CT-28

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-cr-23-t01-strip-live` | Done | Wire ReactionsMount Live on civic strip | FeedCivicPost / next-feed host | 23.1 · 23.4 |
| `task-spa-cr-23-t02-comment-plug` | Done | Comment target mount with ThreadMount | next-feed thread host | 23.2 |
| `task-spa-cr-23-t03-retire-done` | Done | Strip Done claim → ReactionsMount | FeedReactionsStrip path | 23.3 |
| `task-spa-cr-23-t04-vitest` | Done | reactions-mount · live · lab hold | `__tests__` | 23.6 · 23.7 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Production next/feed reactions chrome is reactions-mount Live on Closed client.
