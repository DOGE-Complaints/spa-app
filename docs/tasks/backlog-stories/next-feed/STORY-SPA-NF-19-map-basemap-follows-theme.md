# STORY-SPA-NF-19 — Map basemap follows theme (OP mark 3)

## Meta

- **Key:** `STORY-SPA-NF-19-map-basemap-follows-theme`
- **Package:** [next-feed](INDEX.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCH-DELTA…](ARCH-DELTA-live-civic-residual-2026-10-21.md) §7 · **L2** tech subtasks
- **Status:** P5 APPLY Done · T01–T04 **Done** · structure **Present** · visual **BLOCK** · gate **BLOCK** · `pkg-000197` · activation **none** · Await **P8** · P6 not needed · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-19-map-basemap-follows-theme/STORY-SPA-NF-19-map-basemap-follows-theme.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-19-2026-10-21.md)
- **Depends on:** soft NF-03 list\|map Present · REQ-21 theme tokens Present
- **Interview:** [INTERVIEW-NF-18-plus…](INTERVIEW-NF-18-plus-op-residual-map-dark-2026-10-21.md) **M3**
- **Evidence:** [evidence/op-residual-wave2…](../../../analysis/evidence/op-residual-wave2-2026-10-21/) `02-…`
- **Code home:** `src/components/map/MapLibreMap.jsx` · soft `BoardIssuesMap` · `FeedMapArea`

## Зачем

В light theme UI карта остаётся на Carto **dark-matter** — citizen видит тёмные тайлы. Нужен светлый basemap при `data-theme=light`.

## L1 — FR

- **FR-NF-19.1** When `data-theme` is **light**, map basemap is light (tip URL: Carto **positron** GL style).  
- **FR-NF-19.2** When `data-theme` is **dark**, map basemap remains dark-matter (current default).  
- **FR-NF-19.3** Theme change after mount updates basemap (`setStyle` and/or controlled remount) — mount-once ignoring `styleUrl` is not Done.  
- **FR-NF-19.4** `#/next/feed` map view uses themed style · soft classic board map inherits same MapLibre helper (no invent second engine).  
- **FR-NF-19.5** Vitest / honesty for style URL selection · OP eye — no invent PASS.

## Вне scope

Cluster leaves UX (**NF-20**) · strip chrome · dark icons · invent tile vendor beyond free Carto URLs · invent OP PASS

## L1 — Acceptance Criteria

- [x] Light theme → light basemap on feed map  
- [x] Dark theme → dark basemap  
- [x] Theme toggle updates map style  
- [x] Shared MapLibre helper (no duplicate engine)  
- [x] Vitest / markers  
- [ ] OP eye

## L1.5 — Arch locks

Cite [ARCH-DELTA §7](ARCH-DELTA-live-civic-residual-2026-10-21.md). Ownership: `MapLibreMap` reads theme; feed/board hosts do not hardcode dark-only.

## L2 — Technical subtasks

> Skill: `react-expert`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-nf-19-t01-positron-const` | Done | Add light style URL constant | MapLibreMap.jsx | 19.1 |
| `task-spa-nf-19-t02-theme-bind` | Done | Select style from `data-theme` / theme API | MapLibreMap · soft bootTheme | 19.1 · 19.2 |
| `task-spa-nf-19-t03-setstyle` | Done | Apply style on theme change | MapLibreMap.jsx | 19.3 · 19.4 |
| `task-spa-nf-19-t04-vitest` | Done | URL selection / theme switch honesty | tests | 19.5 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Light UI shows light map; dark UI shows dark map; theme toggle updates basemap; no invent OP PASS.
