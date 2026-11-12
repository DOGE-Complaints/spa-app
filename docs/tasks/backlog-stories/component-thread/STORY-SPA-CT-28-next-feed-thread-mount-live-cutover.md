# STORY-SPA-CT-28 — `#/next/feed` ThreadMount Live cutover

## Meta

- **Key:** `STORY-SPA-CT-28-next-feed-thread-mount-live-cutover`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §15.1](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY · gate **BLOCK** · **BLOCKED** (OP eye) · [disposition](../../../analysis/p5-disposition-STORY-SPA-CT-28-2026-10-20.md) · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover/STORY-SPA-CT-28-next-feed-thread-mount-live-cutover.md) · `pkg-000186` · tip · activation none · F1/F2 WAIVED · TASKED=0 · Await P8 · `2026-10-20T20:57:07Z` · **no UX gen required**
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4 · M158
- **Depends on:** CT-08 lab Present · soft CT-21…27 · sibling **CR-23**
- **Blocks:** OP eye production discussion chrome on `#/next/feed`
- **Interview:** [INTERVIEW-CT-28-plus…](INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md) N1 · N2 · N5
- **Gap:** [analysis-next-feed-thread-reactions-cutover…](../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)
- **Code home (targets):** `features/feed/FeedThreadMount.jsx` · `thread-mount/` · `adapters/LiveAdapter.js` · `LiveIssueThreadMount` / `ThreadsSocialClient`

## Зачем

Lab discussion chrome = `ThreadMount`. Production `#/next/feed` still mounts `FeedDiscussionBlock` via `FeedThreadMount` → `LiveIssueThreadMount`. Backend client Present; presentation package cutover Absent. Bind `thread-mount` LiveAdapter to Closed `ThreadsSocialClient` (no invent HTTP).

## L1 — FR

- **FR-CT-28.1** `#/next/feed*` issue mounts (modal / sheet / route) use **`thread-mount`** presentation as Done discussion surface.  
- **FR-CT-28.2** Live data via **existing** `ThreadsSocialClient` tree/knobs/write seams — no second client · no invent paths.  
- **FR-CT-28.3** `createLiveAdapter` unbound stub replaced by real bind (or host wires LiveIssueThreadMount → ThreadMount Block without invent).  
- **FR-CT-28.4** `FeedDiscussionBlock` ≠ Done claim on `#/next/feed*` after cutover (may remain on disk deprecated).  
- **FR-CT-28.5** Lab `#/lab/feed` FixtureAdapter path unchanged.  
- **FR-CT-28.6** Attach: no invent upload/bind · local intent / fail-closed honesty.  
- **FR-CT-28.7** Vitest: next-feed mount uses ThreadMount markers · Live snapshot not `live-adapter-unwired` when issueId Present.

## Вне scope

Reactions chrome (CR-23) · civic media stub (CT-29) · `#/board` · Early Signal · invent OP PASS · people Live API

## L1 — Acceptance Criteria

- [x] ThreadMount Present on `#/next/feed` issue detail path (structure)  
- [x] Live threads read/write via ThreadsSocialClient (structure)  
- [x] FeedDiscussionBlock not Done surface (structure)  
- [x] Lab Fixture path held (structure)  
- [x] Attach honesty / no invent upload (structure)  
- [x] Vitest  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§15.1](ARCHITECTURE.md) · P3 Done · gate BLOCK

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-28-t01-live-bind` | Done | Bind LiveAdapter / host to ThreadsSocialClient | `LiveAdapter.js` · FeedThreadMount | 28.2 · 28.3 |
| `task-spa-ct-28-t02-block-cutover` | Done | ThreadMount as BlockComponent / replace FeedDiscussionBlock Done | FeedThreadMount · FeedIssueDetail | 28.1 · 28.4 |
| `task-spa-ct-28-t03-lab-hold` | Done | Assert lab FixtureAdapter unchanged | feed-lab tests | 28.5 |
| `task-spa-ct-28-t04-vitest` | Done | next-feed ThreadMount · live not unwired | `__tests__` | 28.7 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Production next/feed discussion uses thread-mount Live chrome on Closed threads client.
