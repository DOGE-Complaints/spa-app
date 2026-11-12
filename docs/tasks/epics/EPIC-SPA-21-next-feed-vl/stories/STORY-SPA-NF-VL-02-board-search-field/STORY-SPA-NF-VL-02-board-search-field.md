# STORY-SPA-NF-VL-02-board-search-field — pipeline mirror

> **Epic:** [EPIC-SPA-21-next-feed-vl](../../EPIC-SPA-21-next-feed-vl.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-02-board-search-field.md`](../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-02-board-search-field.md)  
> **source:** `backlog-stories/next-feed-vl/STORY-SPA-NF-VL-02-board-search-field.md`  
> **Status:** Done · P3 (`2026-10-12T13:59:07Z`) (`2026-10-12T13:06:20Z`) · `pkg-000116` **active**  
> **Package:** next-feed-vl · REQ-22 VL · active `pkg-000116`  
> **ui_scope:** `feed` · UX ready M149 + DS SSOT §4 · AD-VL-01/02/(03)  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five **mandatory**  
> **Arch delta:** AD-VL-01 · AD-VL-02 · (AD-VL-03 verify search skin)  
> **Related:** EPIC-SPA-20 NF-12 Done (search wire) — **do not reopen**; VL-01 Done — Related only

## Purpose
BoardSearchField on `#/next/feed*` — DS-named search chrome; classic `#/board` search unchanged; Closed `search` param retained.

## Acceptance Criteria (verbatim backlog)
- [x] Live search field reads as DS `BoardSearchField` vs M149
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-vl-02-t01-as-is-shelter-map](task-spa-nf-vl-02-t01-as-is-shelter-map/README.md) | As-is / shelter map | Done |
| T02 | [task-spa-nf-vl-02-t02-ds-search-modules](task-spa-nf-vl-02-t02-ds-search-modules/README.md) | DS search modules | Done · ui_anchor |
| T03 | [task-spa-nf-vl-02-t03-semantics-seam](task-spa-nf-vl-02-t03-semantics-seam/README.md) | Semantics seam | Done |
| T04 | [task-spa-nf-vl-02-t04-wire-displace-shelter](task-spa-nf-vl-02-t04-wire-displace-shelter/README.md) | Wire / displace shelter | Done · ui_anchor |
| T05 | [task-spa-nf-vl-02-t05-anti-mixing-verify](task-spa-nf-vl-02-t05-anti-mixing-verify/README.md) | Anti-mixing + verify / gate | Done · ui_anchor |
| T06 | [task-spa-nf-vl-02-t06-docs-residual](task-spa-nf-vl-02-t06-docs-residual/README.md) | Docs residual | Done |

## Out of scope
Invent search param · shell · mutate `#/board` · reopen NF-12 body · invent icons/API

## @mockup handoff (P2/P3 Path A)
- M149 artboard (md/png Present) · DS SSOT §4 `BoardSearchField`
- ARCH-DELTA AD-VL-01/02

## Gate
[acceptance-verification-spa-nf-vl-02.md](task-spa-nf-vl-02-t05-anti-mixing-verify/acceptance-verification-spa-nf-vl-02.md) **PASS** · [screenshots](screenshots/README.md)
