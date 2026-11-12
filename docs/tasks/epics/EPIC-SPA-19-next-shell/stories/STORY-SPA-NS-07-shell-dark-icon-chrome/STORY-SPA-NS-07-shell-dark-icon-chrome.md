# STORY-SPA-NS-07-shell-dark-icon-chrome — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-07-shell-dark-icon-chrome.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-07-shell-dark-icon-chrome.md)  
> **Status:** P5 APPLY Done · structure **Present** · gate **BLOCK** · `2026-10-21T20:14:40Z` · tip · activation **none** · Await **P8** · P6 not needed  
> **Package:** `pkg-000199` · next-shell · REQ-22 · Interview D5  
> **ui_scope:** `shell` · soft `#/next/feed` host · **mixed** · Path A code lock · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** NS-02…06 Done · REQ21-03 theme tokens Present  
> **Runtime:** T01–T04 **Done** · ShellChromeIcon.ns07 **4/4** · AppShell suite **30/30** · Path A shots 01–05 Present · probe maskCount 15 · no invent OP PASS

## Purpose

In dark mode shell icons (search · language · bell · account · rail · mobile nav) stay black on dark — `<img src=*.svg>` with `currentColor` does not inherit button color. Need theme-safe mask/currentColor (reuse CrReactionIcon).

## L1 — FR (backlog verbatim)

- **FR-NS-07.1** Header chrome icons (search · language chevron · notifications · account) are readable on dark surfaces.  
- **FR-NS-07.2** Profile rail / shelter nav icons readable on dark.  
- **FR-NS-07.3** Mobile bottom nav icons readable on dark.  
- **FR-NS-07.4** Pattern tip: mask / `currentColor` (reuse CrReactionIcon approach) — not invent per-file black SVG masters unless needed.  
- **FR-NS-07.5** Light theme icons remain readable (no invert-only hack that breaks light).  
- **FR-NS-07.6** Vitest / Path A · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Header icons readable on dark  
- [x] Rail / shelter icons readable on dark  
- [x] Mobile nav icons readable on dark  
- [x] Theme-safe pattern (mask/currentColor or locked equivalent)  
- [x] Light theme held  
- [x] Vitest / Path A  
- [ ] OP eye

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NS-07-shell-dark-icon-chrome.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ns-07-t01-header-icons](task-spa-ns-07-t01-header-icons/README.md) | Theme-safe header glyphs | **Done** |
| T02 | [task-spa-ns-07-t02-rail-mobile](task-spa-ns-07-t02-rail-mobile/README.md) | Rail + mobile nav glyphs | **Done** |
| T03 | [task-spa-ns-07-t03-light-hold](task-spa-ns-07-t03-light-hold/README.md) | Verify light theme not broken | **Done** |
| T04 | [task-spa-ns-07-t04-vitest](task-spa-ns-07-t04-vitest/README.md) | Markers / honesty | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Thread bubbles (**CT-32**) · feed civic strip (**NF-18**) · map · invent OP PASS · new icon artboards

## DoD (backlog verbatim)

Shell chrome icons readable in dark and light on `#/next/feed` host; no invent OP PASS.

## @mockup handoff

- Continuity: evidence wave2 `05`/`06` · Interview **D5** · soft [STORY-SPA-NS-icon-assets](../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md)
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-shell-dark-icon-chrome.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
