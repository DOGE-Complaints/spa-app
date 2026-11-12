# STORY-SPA-NF-VL-09-board-page-layouts — pipeline mirror

> **Epic:** [EPIC-SPA-21-next-feed-vl](../../EPIC-SPA-21-next-feed-vl.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-09-board-page-layouts.md`](../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-09-board-page-layouts.md)  
> **source:** `backlog-stories/next-feed-vl/STORY-SPA-NF-VL-09-board-page-layouts.md`  
> **Status:** Done · P8 (`2026-10-12T16:02:23Z`) · SHAs `ded3e85`/`ee8a605`/`f5ba109` · `pkg-000123`  
> **Package:** next-feed-vl · REQ-22 VL · active `pkg-000123`  
> **ui_scope:** `feed` · UX ready M149 + dashboard-layout-spec · DS §2 · AD-VL-01/02  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five **mandatory**  
> **Arch delta:** AD-VL-01 · AD-VL-02  
> **Related:** VL-07/08 Done — Related soft; shell rails = next-shell OOS; PublicHeader/ProfileRail OOS

## Purpose
Named DS `BoardLayout` / `PageContentLayout` for `#/next/feed*` content column width/gutters; absent side modules leave no empty columns; shell chrome ownership unchanged.

## Acceptance Criteria (verbatim backlog)
- [x] Live feed content geometry matches DS layout variants
- [x] Anti-mixing / shell OOS checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-vl-09-t01-as-is-shelter-map](task-spa-nf-vl-09-t01-as-is-shelter-map/README.md) | As-is / shelter map | Done |
| T02 | [task-spa-nf-vl-09-t02-ds-layout-modules](task-spa-nf-vl-09-t02-ds-layout-modules/README.md) | DS layout modules | Done · ui_anchor |
| T03 | [task-spa-nf-vl-09-t03-semantics-seam](task-spa-nf-vl-09-t03-semantics-seam/README.md) | Semantics seam | Done |
| T04 | [task-spa-nf-vl-09-t04-wire-displace-shelter](task-spa-nf-vl-09-t04-wire-displace-shelter/README.md) | Wire / displace shelter | Done · ui_anchor |
| T05 | [task-spa-nf-vl-09-t05-anti-mixing-verify](task-spa-nf-vl-09-t05-anti-mixing-verify/README.md) | Anti-mixing + verify / gate | Done · ui_anchor |
| T06 | [task-spa-nf-vl-09-t06-docs-residual](task-spa-nf-vl-09-t06-docs-residual/README.md) | Docs residual | Done |
| T07 | [task-spa-nf-vl-09-t07-audit-f1-page-content-crop-honesty](task-spa-nf-vl-09-t07-audit-f1-page-content-crop-honesty/README.md) | Audit F1 `04` crop honesty | Done · P6 |

## Out of scope
PublicHeader / ProfileRail implement · invent endpoints · shell rewrite

## @mockup handoff (P2/P3 Path A)
- M149 artboard (md/png Present) · dashboard-layout-spec Present · DS §2 BoardLayout / PageContentLayout
- ARCH-DELTA AD-VL-01/02
