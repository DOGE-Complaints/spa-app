# STORY-SPA-CAB-08-cabinet-layout-story-activity-wire — pipeline mirror

> **Epic:** [EPIC-SPA-07-user-cabinet](../../EPIC-SPA-07-user-cabinet.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/cabinet/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md`](../../../../backlog-stories/cabinet/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md)  
> **Status:** P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) · `2026-10-23T14:56:53Z` · `pkg-000217` · SHAs feat `0b78a80` · test `eb48edc` · docs `bed999b` · `activation: none` · NO PUSH  
> **Package:** `pkg-000217` · cabinet · Interview **P5** · wave `OP-spa nf24-wave4-20261023`  
> **ui_scope:** `cabinet` · **mixed** · Path A **M170+M45** · Partial visual=**BLOCK** · NO BRIEF · no UX gen · no invent PASS · no invent contribution API  
> **Skill declared:** `react-expert`  
> **Depends:** soft NS-11 · CAB-04 UI Present · tip after `pkg-000216`  
> **Runtime:** P5 F1 WAIVED operator · F2 WAIVED info · TASKED=0 · P6 skipped · structure held · OP eye Absent → gate **BLOCK** · Await P8

## Purpose

Hide wallet + contribution (keep components). Compact verified civic. Full-width Story Activity. Wire SPA to `GET /story-activity`. Empty CTA → `/next/feed`. Vitest · OP eye — no invent PASS.

## L1 — FR (backlog verbatim)

- **FR-CAB-08.1** Wallet + Contribution Layer **not shown** (gate — keep components for later).  
- **FR-CAB-08.2** Verified Civic presentation **compact** (badge/slim card) — not oversized overlapping plate.  
- **FR-CAB-08.3** Story Activity **full-width** in main column when wallet/contrib hidden.  
- **FR-CAB-08.4** Wire SPA client to `GET /story-activity` with authenticated session · map to M45 active/empty states (no invent rows).  
- **FR-CAB-08.5** Empty CTA → `/next/feed` (label Go to Feed) — not `/board`.  
- **FR-CAB-08.6** Layout no float/overlap · Vitest · OP eye — no invent PASS · no invent contribution API.

## Acceptance Criteria (backlog verbatim)

- [x] UX tip / M170 + M45·M28·M99 cited · intake PASS  
- [x] Wallet/contrib hidden (structure)  
- [x] Compact verified · full-width Story Activity (structure)  
- [x] Live story-activity when USER logged in (structure)  
- [x] Vitest · OP eye (structure Present · visual **BLOCK**)  

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md) · **PENDING**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cab-08-t01-gate-slots](task-spa-cab-08-t01-gate-slots/README.md) | Hide wallet + contribution slots | **Done** |
| T02 | [task-spa-cab-08-t02-layout](task-spa-cab-08-t02-layout/README.md) | Compact civic · full-width activity · fix overlap | **Done** |
| T03 | [task-spa-cab-08-t03-http](task-spa-cab-08-t03-http/README.md) | Client GET /story-activity + map states | **Done** |
| T04 | [task-spa-cab-08-t04-cta](task-spa-cab-08-t04-cta/README.md) | Go to Feed → /next/feed | **Done** |
| T05 | [task-spa-cab-08-t05-vitest](task-spa-cab-08-t05-vitest/README.md) | Markers · soft auth fixture | **Done** |

**Order:** t01 → t02 → t03 → t04 → t05

## Out of scope (backlog verbatim)

NS-14 brand · invent GW-CAB-03 · invent legal pages

## @mockup handoff

- Continuity: Interview **P5** · [M170](../../../../../UX/mockups/user%20profile/DOGEstonia-M170-cabinet-layout-no-wallet-contrib-spec-v1.0.md) · [M45](../../../../../UX/mockups/user%20profile/mockup-45-story-activity-state-sheet-spec.md) · Path A  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-cabinet-layout-story-activity-wire.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
