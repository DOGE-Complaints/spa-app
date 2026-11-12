# STORY-SPA-NS-09 — ProfileRail Feed cleanup

## Meta

- **Key:** `STORY-SPA-NS-09-profile-rail-feed-cleanup`
- **Package:** [next-shell](INDEX.md)
- **Status:** P8 local close · T01–T04 **Done** · structure **Present** · visual **BLOCKED** (OP eye) OK · gate **BLOCK** · `pkg-000202` closed · `activation: none` · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-09-profile-rail-feed-cleanup/STORY-SPA-NS-09-profile-rail-feed-cleanup.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-NS-09-2026-10-22.md)
- **Interview:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **R2**
- **Code home:** `ProfileRail.jsx` · `MobileBottomNav.jsx` · i18n nextShell.rail

## L1 — FR

- **FR-NS-09.1** Remove top summary Profile block (icon + meta + non-working chevron).  
- **FR-NS-09.2** Keep lower nav **Profile** only.  
- **FR-NS-09.3** Nav label **Feed** (was Board) · `to=/next/feed` held.  
- **FR-NS-09.4** Soft MobileBottomNav label Feed.  
- **FR-NS-09.5** Remove «No stories yet» empty copy (honest omit or metrics-only).  
- **FR-NS-09.6** Vitest · OP eye — no invent PASS.

## OOS

Logo UX · locale · invent activity API

## AC

- [ ] One Profile entry  
- [ ] Feed label + /next/feed  
- [ ] No empty «No stories yet»  
- [ ] Vitest · OP eye  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-09-t01-remove-summary` | **Done** | Drop summary block | 09.1 |
| `task-spa-ns-09-t02-feed-label` | **Done** | i18n Board→Feed · mobile soft | 09.3 · 09.4 |
| `task-spa-ns-09-t03-empty` | **Done** | Remove empty copy | 09.5 |
| `task-spa-ns-09-t04-vitest` | **Done** | Update NS-03 tests | 09.6 |

### Order

`t01` → `t02` → `t03` → `t04` · skill `react-expert`
