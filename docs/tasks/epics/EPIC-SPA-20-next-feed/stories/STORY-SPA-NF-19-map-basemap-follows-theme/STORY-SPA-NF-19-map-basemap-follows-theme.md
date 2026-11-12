# STORY-SPA-NF-19-map-basemap-follows-theme — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-19-map-basemap-follows-theme.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-19-map-basemap-follows-theme.md)  
> **Status:** P5 APPLY Done · structure **Present** · gate **BLOCK** · `2026-10-21T19:45:42Z` · tip · activation **none** · Await **P8** · P6 not needed  
> **Package:** `pkg-000197` · next-feed · REQ-22 · ARCH-DELTA §7 · Interview M3  
> **ui_scope:** `map` · soft `feed` · **mixed** · Path A code lock · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft NF-03 list|map Present · REQ-21 theme tokens Present  
> **Runtime:** T01–T04 **Done** · MapLibreMap.nf19 **5/5** · map suite **10/10** · Path A shots 01–05 Present · no invent OP PASS

## Purpose

In light theme UI the map stays on Carto **dark-matter** — citizen sees dark tiles. Need light basemap when `data-theme=light`.

## L1 — FR (backlog verbatim)

- **FR-NF-19.1** When `data-theme` is **light**, map basemap is light (tip URL: Carto **positron** GL style).  
- **FR-NF-19.2** When `data-theme` is **dark**, map basemap remains dark-matter (current default).  
- **FR-NF-19.3** Theme change after mount updates basemap (`setStyle` and/or controlled remount) — mount-once ignoring `styleUrl` is not Done.  
- **FR-NF-19.4** `#/next/feed` map view uses themed style · soft classic board map inherits same MapLibre helper (no invent second engine).  
- **FR-NF-19.5** Vitest / honesty for style URL selection · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Light theme → light basemap on feed map  
- [x] Dark theme → dark basemap  
- [x] Theme toggle updates map style  
- [x] Shared MapLibre helper (no duplicate engine)  
- [x] Vitest / markers  
- [ ] OP eye

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-19-map-basemap-follows-theme.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-19-t01-positron-const](task-spa-nf-19-t01-positron-const/README.md) | Add light style URL constant | **Done** |
| T02 | [task-spa-nf-19-t02-theme-bind](task-spa-nf-19-t02-theme-bind/README.md) | Select style from `data-theme` / theme API | **Done** |
| T03 | [task-spa-nf-19-t03-setstyle](task-spa-nf-19-t03-setstyle/README.md) | Apply style on theme change | **Done** |
| T04 | [task-spa-nf-19-t04-vitest](task-spa-nf-19-t04-vitest/README.md) | URL selection / theme switch honesty | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Cluster leaves UX (**NF-20**) · strip chrome · dark icons · invent tile vendor beyond free Carto URLs · invent OP PASS

## DoD (backlog verbatim)

Light UI shows light map; dark UI shows dark map; theme toggle updates basemap; no invent OP PASS.

## @mockup handoff

- Continuity: [ARCH-DELTA §7](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · evidence [`02-map-light-theme-dark-tiles.png`](../../../../analysis/evidence/op-residual-wave2-2026-10-21/02-map-light-theme-dark-tiles.png) · Interview **M3**
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-map-basemap-follows-theme.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
