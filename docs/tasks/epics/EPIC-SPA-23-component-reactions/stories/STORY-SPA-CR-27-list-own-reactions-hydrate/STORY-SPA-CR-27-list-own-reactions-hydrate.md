# STORY-SPA-CR-27-list-own-reactions-hydrate — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md)  
> **Status:** P1.3 activated · T01–T03 **Todo** · gate **PENDING** · `2026-10-24T10:29:17Z` · `pkg-000225` · `activation: active` · Await P2  
> **Package:** `pkg-000225` · component-reactions · Interview **M10** · wave `OP-spa nf25-wave5-20261024`  
> **ui_scope:** reactions-mount / next-feed list · **mixed** · Path A arch Present · Partial visual=**BLOCK** · NO BRIEF · no invent PASS / gateway schema  
> **Skill declared:** `react-expert`  
> **Depends:** CR-25 Present · tip after `pkg-000224`  
> **Runtime:** P1.3 only · no product code this call · OP eye Absent → Partial=**BLOCK** · no invent OP PASS / gateway schema

## Purpose

On `#/next/feed` **list** load (Bearer), each card’s own React strip hydrates actor `selected[]` — reuse CR-25 mapping · no invent gateway schema · Vitest · OP eye.

## L1 — FR (backlog verbatim)

- **FR-CR-27.1** On `#/next/feed` **list** load (authenticated), each card’s own React strip hydrates actor `selected[]` — not only on issue detail.  
- **FR-CR-27.2** Prefer reuse CR-25 mapping (`thread_root_reactions` / tree) · if list payload lacks selected, document honesty + minimal fetch path (no invent gateway schema).  
- **FR-CR-27.3** Anonymous omit held · Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [ ] List cards show own selected after reload (Bearer)  
- [ ] Detail path CR-25 regression held  
- [ ] Vitest · OP eye Absent → **BLOCK**  

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-27-list-own-reactions-hydrate.md) · **PENDING**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-27-t01-probe](task-spa-cr-27-t01-probe/README.md) | Confirm list payload vs tree lift | **Todo** |
| T02 | [task-spa-cr-27-t02-wire](task-spa-cr-27-t02-wire/README.md) | Pass initialSelected into list FeedCivicPost | **Todo** |
| T03 | [task-spa-cr-27-t03-vitest](task-spa-cr-27-t03-vitest/README.md) | List hydrate markers | **Todo** |

**Order:** t01 → t02 → t03

## Out of scope (backlog verbatim)

Own empty UX (CR-26) · invent people API · invent CDN

## DoD (backlog verbatim)

List cards show own selected after reload (Bearer) · CR-25 detail held · Vitest · OP eye — no invent PASS · no invent gateway schema.

## @mockup handoff

```text
@mockup: spa-app/docs/architecture/component-reactions/27-list-own-reactions-hydrate.md
@mockup: spa-app/docs/analysis/analysis-reaction-persist-reload-gap-2026-10-22.md
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md
```

Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
Shots: [visual-checklists](./visual-checklists-list-own-reactions-hydrate.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
