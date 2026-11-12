# STORY-SPA-NF-VL-10-map-chrome-atoms — pipeline mirror

> **Epic:** [EPIC-SPA-21-next-feed-vl](../../EPIC-SPA-21-next-feed-vl.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md`](../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md)  
> **source:** `backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md`  
> **Status:** Done · P8 (`2026-10-12T16:23:21Z`) · SHAs `a065efb`/`b83a676`/`20b5462` · `pkg-000124`  
> **Package:** next-feed-vl · REQ-22 VL · active `pkg-000124`  
> **ui_scope:** `feed` · UX ready M151 · DS §9 · AD-VL-01/02  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five **mandatory**  
> **Arch delta:** AD-VL-01 · AD-VL-02  
> **Related:** NF-03 Done — Related soft; VL-01…09 Done soft; classic `#/board` map OOS mutate

## Purpose
Named DS map chrome (`MapSubsetNotice` / `MapIssuePreview` / attribution / state) on `#/next/feed*` map view; same result set as List; classic board map unchanged.

## Acceptance Criteria (verbatim backlog)
- [x] Live map chrome matches DS + M151
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-vl-10-t01-as-is-shelter-map](task-spa-nf-vl-10-t01-as-is-shelter-map/README.md) | As-is / shelter map | Done |
| T02 | [task-spa-nf-vl-10-t02-ds-map-modules](task-spa-nf-vl-10-t02-ds-map-modules/README.md) | DS map modules | Done · ui_anchor |
| T03 | [task-spa-nf-vl-10-t03-semantics-seam](task-spa-nf-vl-10-t03-semantics-seam/README.md) | Semantics seam | Done |
| T04 | [task-spa-nf-vl-10-t04-wire-displace-shelter](task-spa-nf-vl-10-t04-wire-displace-shelter/README.md) | Wire / displace shelter | Done · ui_anchor |
| T05 | [task-spa-nf-vl-10-t05-anti-mixing-verify](task-spa-nf-vl-10-t05-anti-mixing-verify/README.md) | Anti-mixing + verify / gate | Done · ui_anchor |
| T06 | [task-spa-nf-vl-10-t06-docs-residual](task-spa-nf-vl-10-t06-docs-residual/README.md) | Docs residual | Done |
| T07 | [task-spa-nf-vl-10-t07-audit-f1-map-issue-preview-path-a](task-spa-nf-vl-10-t07-audit-f1-map-issue-preview-path-a/README.md) | Audit F1 MapIssuePreview Path A | Done · P6 |
| T08 | [task-spa-nf-vl-10-t08-audit-f2-classic-board-map-smoke](task-spa-nf-vl-10-t08-audit-f2-classic-board-map-smoke/README.md) | Audit F2 classic board map smoke | Done · P6 |

## Out of scope
Invent geo fields · invent map API/HTTP · pick map library in story text · mutate `#/board` map

## @mockup handoff (P2/P3 Path A)
- M151 artboard (md/png Present) · DS §9 map chrome
- ARCH-DELTA AD-VL-01/02
