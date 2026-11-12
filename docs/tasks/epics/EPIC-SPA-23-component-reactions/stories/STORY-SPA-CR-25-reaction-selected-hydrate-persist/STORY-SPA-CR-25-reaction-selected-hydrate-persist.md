# STORY-SPA-CR-25-reaction-selected-hydrate-persist — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-25-reaction-selected-hydrate-persist.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-25-reaction-selected-hydrate-persist.md)  
> **Status:** P8 local close · T01–T04 **Done** · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-22T17:51:19Z` · `pkg-000209` closed · `activation: none`  
> **Package:** `pkg-000209` · component-reactions · Interview **Rp12** · persist analysis · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `reactions-mount` / next-feed soft hosts · **mixed** · Path A p13UxReady · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** CR-23 Live Present · soft CR-24 visual · mapThreadTreeToBlock selected mapper Present · tip after `pkg-000208` CR-24 P8  
> **Runtime:** P8 local close · Path A shots Present · CAPTURE-META `fails: []` · OP eye Absent → gate **BLOCK** · no invent OP PASS · no invent people API · no invent gateway schema · no invent CDN · NO PUSH

## Purpose

Hydrate actor `selected[]` + summaries from authenticated tree on mount/reload (post + comment) so prior PUT does not vanish — analysis Rp12 · no invent people/gateway.

## L1 — FR (backlog verbatim)

- **FR-CR-25.1** On mount / tree load, Live strip shows actor `selected[]` from authenticated tree (`thread_root_reactions` / comment) — not empty after successful prior PUT.  
- **FR-CR-25.2** Same for comment-node plugs (`target=comment`) — hydrate per `commentId`.  
- **FR-CR-25.3** `summary_marks` / `aggregate_count` hydrate from tree (not only post-PUT local write snapshot).  
- **FR-CR-25.4** After PUT ok, local state and next tree reload stay consistent (no silent drop).  
- **FR-CR-25.5** Anonymous: omit selected honesty held · Vitest · OP eye — no invent PASS · no invent people API.

## Acceptance Criteria (backlog verbatim)

- [x] Analysis cited  
- [x] Post + comment selected survive reload (Bearer) — structure Present · OP eye Absent  
- [x] Summaries hydrate — structure Present · OP eye Absent  
- [x] Vitest · OP eye — vitest green · OP Absent → Partial=**BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-25-reaction-selected-hydrate-persist.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-25-t01-props](task-spa-cr-25-t01-props/README.md) | FeedReactionsMount initialSelected/summary props + sync | **Done** |
| T02 | [task-spa-cr-25-t02-hosts](task-spa-cr-25-t02-hosts/README.md) | FeedCivicPost + FeedThreadMount pass tree mapped fields | **Done** |
| T03 | [task-spa-cr-25-t03-reload](task-spa-cr-25-t03-reload/README.md) | After write → reload path keeps selected | **Done** |
| T04 | [task-spa-cr-25-t04-vitest](task-spa-cr-25-t04-vitest/README.md) | Markers | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

CR-24 underlay/own-icons visual · invent gateway schema · invent CDN

## DoD (backlog verbatim)

Post + comment selected survive reload (Bearer) · summaries hydrate · Vitest · OP eye — no invent PASS · no invent people API.

## @mockup handoff

- Continuity: Interview **Rp12** · [persist analysis](../../../../analysis/analysis-reaction-persist-reload-gap-2026-10-22.md) · ARCHITECTURE soft §3 · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-reaction-selected-hydrate-persist.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
