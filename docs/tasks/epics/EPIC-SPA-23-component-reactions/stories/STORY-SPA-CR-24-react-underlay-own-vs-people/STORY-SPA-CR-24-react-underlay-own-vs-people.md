# STORY-SPA-CR-24-react-underlay-own-vs-people — pipeline mirror

> **Epic:** [EPIC-SPA-23-component-reactions](../../EPIC-SPA-23-component-reactions.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-reactions/STORY-SPA-CR-24-react-underlay-own-vs-people.md`](../../../../backlog-stories/component-reactions/STORY-SPA-CR-24-react-underlay-own-vs-people.md)  
> **Status:** P8 local close · T01–T04 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-22T15:12:28Z` · tip · `activation: none`  
> **Disposition:** [p5-disposition-STORY-SPA-CR-24-2026-10-22.md](../../../../analysis/p5-disposition-STORY-SPA-CR-24-2026-10-22.md) · [p7](../../../../analysis/reaudit-STORY-SPA-CR-24-p7-2026-10-22.md) · [arch](../../../../architecture/component-reactions/24-react-underlay-own-vs-people.md) · F1/F2 **WAIVED** · TASKED=**0** · NO PUSH  
> **Package:** `pkg-000208` · component-reactions · Interview **Rx7** · M163/M164 · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `reactions-mount` / next-feed soft host · **mixed** · Path A p13UxReady · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** CR-23 Live Present · soft NF-18 · soft CR-25 hydrate · tip after `pkg-000207` CT-33 P8  
> **Runtime:** wide underlay · ownInZone · Reactions text-only · vitest · Path A shots · no invent OP PASS · no invent CDN · no invent M163 PNG · no invent people

## Purpose

React control needs one wide underlay (M163); own selected icons stay inside React zone with stable geometry (M164); React→picker · Reactions→people — no invent people / OP PASS.

## L1 — FR (backlog verbatim)

- **FR-CR-24.1** React control has **one wide** underlay spanning its zone — no double nest / inner pill (M163).  
- **FR-CR-24.2** Tap React → own M154 picker — not people.  
- **FR-CR-24.3** Tap rightmost `Reactions` text → M155 people path (honesty if unavailable) — not picker · no glyph stack on right.  
- **FR-CR-24.4** Own selected icons render **inside** React underlay (lower row) · outer React geometry **stable** for 0/1/2/3 · default max 3 · **no** page-wide aggregate row below strip (M164 supersedes draft “below”).  
- **FR-CR-24.5** Zero-selected: entry thumb **above** `React` label · peer-aligned with Comment/Share.  
- **FR-CR-24.6** Comment/Share stay flat · Vitest · OP eye — no invent PASS · no invent people.

## Acceptance Criteria (backlog verbatim)

- [x] M163/M164 + intake cited  
- [x] Wide underlay · React≠people · Reactions≠picker (structure)  
- [x] Own icons in-zone · stable geometry · no below-row (structure)  
- [ ] Vitest · OP eye — Vitest green · OP Absent → **BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CR-24-react-underlay-own-vs-people.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-cr-24-t01-underlay](task-spa-cr-24-t01-underlay/README.md) | Wide single underlay CSS (M163) | **Done** |
| T02 | [task-spa-cr-24-t02-wire](task-spa-cr-24-t02-wire/README.md) | React→picker · Reactions→people | **Done** |
| T03 | [task-spa-cr-24-t03-own-in-zone](task-spa-cr-24-t03-own-in-zone/README.md) | Own icons inside React · stable box · zero layout | **Done** |
| T04 | [task-spa-cr-24-t04-vitest](task-spa-cr-24-t04-vitest/README.md) | Markers | **Done** |

**Order:** Intake PASS → t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

CR-25 hydrate/persist · CT-33 · invent CDN · invent M163 PNG

## DoD (backlog verbatim)

Wide underlay · React≠people · Reactions≠picker · own icons in-zone · stable geometry · no below-row · Vitest · OP eye — no invent PASS · no invent people.

## UI Screenshots (P3)

| ID | Path | md5 prefix |
|----|------|------------|
| 01 | [screenshots/full-cycle/01-react-wide-underlay.png](./screenshots/full-cycle/01-react-wide-underlay.png) | bc27f8fe30dd |
| 02 | [screenshots/full-cycle/02-react-opens-picker.png](./screenshots/full-cycle/02-react-opens-picker.png) | be91f9a93568 |
| 03 | [screenshots/full-cycle/03-reactions-opens-people.png](./screenshots/full-cycle/03-reactions-opens-people.png) | 93d0082d897f |
| 04 | [screenshots/full-cycle/04-own-icons-in-zone.png](./screenshots/full-cycle/04-own-icons-in-zone.png) | a6ddceecd990 |
| 05 | [screenshots/full-cycle/05-zero-selected-thumb.png](./screenshots/full-cycle/05-zero-selected-thumb.png) | a6ddceecd990 |

Story-root indexer: [screenshots/README.md](./screenshots/README.md) · CAPTURE-META `fails: []` · `op_eye: Absent` · `partial: BLOCK`

## @mockup handoff

- Continuity: Interview **Rx7** · [M163](../../../../UX/next/feed/artboards/DOGEstonia-M163-feed-civic-react-underlay-spec-v1.0.md) · [M164](../../../../UX/next/feed/artboards/DOGEstonia-M164-stable-react-own-vs-people-spec-v1.0.md) · [intake](../../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md) · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-react-underlay-own-vs-people.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
