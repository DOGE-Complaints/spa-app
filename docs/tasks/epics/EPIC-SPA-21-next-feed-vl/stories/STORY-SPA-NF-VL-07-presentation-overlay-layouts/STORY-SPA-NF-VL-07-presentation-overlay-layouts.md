# STORY-SPA-NF-VL-07-presentation-overlay-layouts — pipeline mirror

> **Epic:** [EPIC-SPA-21-next-feed-vl](../../EPIC-SPA-21-next-feed-vl.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-07-presentation-overlay-layouts.md`](../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-07-presentation-overlay-layouts.md)  
> **source:** `backlog-stories/next-feed-vl/STORY-SPA-NF-VL-07-presentation-overlay-layouts.md`  
> **Status:** Done · P6 (`2026-10-12T15:34:56Z`) · F1 CLOSED · gate PASS · `pkg-000121`
> **Package:** next-feed-vl · REQ-22 VL · active `pkg-000121`  
> **ui_scope:** `feed` · UX ready M158+M159 + DS §2 · AD-VL-01/02  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five **mandatory**  
> **Arch delta:** AD-VL-01 · AD-VL-02  
> **Related:** EPIC-SPA-20 NF-06 Done — Related only; VL-01…06 Done — Related only; shell chrome OOS

## Purpose
Named DS presentation/overlay layouts on `#/next/feed*` issue mounts; classic `#/board` mounts unchanged; Closed getIssue retained; no invent routes.

## Acceptance Criteria (verbatim backlog)
- [x] Live mounts match DS layout roles + M158
- [x] Anti-mixing AC checked
- [x] Technical subtasks t01–t06 DoD checked at implement

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-vl-07-t01-as-is-shelter-map](task-spa-nf-vl-07-t01-as-is-shelter-map/README.md) | As-is / shelter map | Done |
| T02 | [task-spa-nf-vl-07-t02-ds-presentation-modules](task-spa-nf-vl-07-t02-ds-presentation-modules/README.md) | DS presentation modules | Done · ui_anchor |
| T03 | [task-spa-nf-vl-07-t03-semantics-seam](task-spa-nf-vl-07-t03-semantics-seam/README.md) | Semantics seam | Done |
| T04 | [task-spa-nf-vl-07-t04-wire-displace-shelter](task-spa-nf-vl-07-t04-wire-displace-shelter/README.md) | Wire / displace shelter | Done · ui_anchor |
| T05 | [task-spa-nf-vl-07-t05-anti-mixing-verify](task-spa-nf-vl-07-t05-anti-mixing-verify/README.md) | Anti-mixing + verify / gate | Done · ui_anchor |
| T06 | [task-spa-nf-vl-07-t06-docs-residual](task-spa-nf-vl-07-t06-docs-residual/README.md) | Docs residual | Done |
| T07 | [task-spa-nf-vl-07-t07-audit-f1-overlay-host-focus-return](task-spa-nf-vl-07-t07-audit-f1-overlay-host-focus-return/README.md) | Audit F1 focus-return | Done |

## Out of scope
Shell chrome · invent routes · invent mounts API · mutate `#/board`

## @mockup handoff (P2/P3 Path A)
- M158 + M159 artboards (md/png Present) · DS §2 IssuePresentationLayout / OverlayLayout / OverlayHost / KeyboardComposerLayout
- ARCH-DELTA AD-VL-01/02
