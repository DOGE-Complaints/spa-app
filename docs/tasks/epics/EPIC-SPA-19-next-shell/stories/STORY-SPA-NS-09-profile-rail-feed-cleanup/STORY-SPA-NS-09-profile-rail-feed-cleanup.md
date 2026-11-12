# STORY-SPA-NS-09-profile-rail-feed-cleanup — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-09-profile-rail-feed-cleanup.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-09-profile-rail-feed-cleanup.md)  
> **Status:** P8 local close · structure **Present** · gate **BLOCK** · `2026-10-22T13:19:51Z` · tip · `activation: none` · Story **BLOCKED** (OP eye) OK · NO PUSH  
> **Package:** `pkg-000202` · next-shell · Interview **R2** · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `shell` · soft `#/next/feed` host · **mixed** · Path A code lock · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft NS-03 ProfileRail Present · soft NS-07 mask · soft NS-08 closed  
> **Runtime:** T01–T04 **Done** · AppShell **25/25** (P4) · ns03+ns09 **7/7** · Path A 01–05 Present · [disposition](../../../../../analysis/p5-disposition-STORY-SPA-NS-09-2026-10-22.md) F1 WAIVED operator · F2 WAIVED info · TASKED=**0** · P6 not needed · no invent OP PASS · no invent activity API

## Purpose

ProfileRail still shows top summary Profile block (icon + meta + non-working chevron), nav label **Board**, and «No stories yet» empty copy. Need one Profile entry · **Feed** label · honest empty omit.

## L1 — FR (backlog verbatim)

- **FR-NS-09.1** Remove top summary Profile block (icon + meta + non-working chevron).  
- **FR-NS-09.2** Keep lower nav **Profile** only.  
- **FR-NS-09.3** Nav label **Feed** (was Board) · `to=/next/feed` held.  
- **FR-NS-09.4** Soft MobileBottomNav label Feed.  
- **FR-NS-09.5** Remove «No stories yet» empty copy (honest omit or metrics-only).  
- **FR-NS-09.6** Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] One Profile entry (structure)  
- [x] Feed label + /next/feed (structure)  
- [x] No empty «No stories yet» (structure)  
- [x] Vitest · Path A  
- [ ] OP eye — Absent → gate **BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-09-profile-rail-feed-cleanup.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-09-t01-remove-summary](task-spa-ns-09-t01-remove-summary/README.md) | Drop summary block | **Done** |
| T02 | [task-spa-ns-09-t02-feed-label](task-spa-ns-09-t02-feed-label/README.md) | i18n Board→Feed · mobile soft | **Done** |
| T03 | [task-spa-ns-09-t03-empty](task-spa-ns-09-t03-empty/README.md) | Remove empty copy | **Done** |
| T04 | [task-spa-ns-09-t04-vitest](task-spa-ns-09-t04-vitest/README.md) | Update NS-03 tests | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Logo UX · locale · invent activity API

## DoD (backlog verbatim)

One Profile entry · Feed label + /next/feed · no empty «No stories yet» · Vitest / Path A · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **R2** · soft M149 / Component §10 ProfileRail · Path A code lock  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-profile-rail-feed-cleanup.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
