# STORY-SPA-NF-LAB-08-greenfield-reactions-plane — pipeline mirror

> **Epic:** [EPIC-SPA-22-next-feed-lab](../../EPIC-SPA-22-next-feed-lab.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md`](../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md)  
> **source:** `backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md`  
> **Status:** Blocked · P3 structure Done (`2026-10-13T16:09:25Z`) · pkg-000134 · gate BLOCK · OP eye Absent  
> **Package:** next-feed-lab · REQ-22 lab · active `pkg-000134`  
> **Depends on:** LAB-07 (strip = single React entry)  
> **Blocks:** LAB-09…10  
> **ui_scope:** `feed-lab` · visual|mixed · Path A M154 · Partial=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five · `#/lab/feed` · `#/next/feed` unchanged  
> **Related:** EPIC-20/21 Related only; do not reopen

## Purpose
Greenfield reactions plane under `features/feed-lab/post/reactions/` per written M154 — strip→picker, local selection, no Deprecated / ReactionChrome / Controls.css / emoji-soup on Done path.

## Target module catalog (verbatim backlog · name ≠ create until P3)

| Working name | Role |
|--------------|------|
| `FeedReactionPlane` | Root lab reactions host · local in-memory selection · no HTTP PUT |
| `FeedReactionAggregate` | Confirmed marks + count only when selection Present; empty = no theatrical zero |
| `FeedReactionPicker` | Anchored panel · layers · capacity «up to N» · Escape/close |
| `FeedReactionOption` | One catalog choice · label required · icon = catalog SVG or omit (no emoji fallback) |
| `FeedReactionLayerGroup` | Emotional / Epistemic; Moderation **absent** at thread-root |

## Artboards
- M154 primary (strip / picker / state sheet)

## FR (verbatim backlog)
- **FR-LAB-08.1** … **FR-LAB-08.6** — see backlog SSOT

## Acceptance Criteria (verbatim backlog)

- [x] Greenfield reaction modules Present under lab post namespace
- [x] Zero Deprecated / ReactionChrome / Controls.css on Done path
- [x] Zero `omit-emoji-catalog` / emoji marks on lab Done
- [x] No second React pill under strip
- [x] Root picker has no active Moderation group
- [ ] M154 gate evidence + OP eye (Partial = BLOCK) · evidence Present · OP Absent → **BLOCK**

## Вне scope (verbatim)
People/M155 · comment-level reactions matrix · invent SVG · product port

## Tasks

| ID | Path | Status |
|----|------|--------|
| T01 | [task-spa-nf-lab-08-t01-scaffold-reactions-home](task-spa-nf-lab-08-t01-scaffold-reactions-home/README.md) | Done |
| T02 | [task-spa-nf-lab-08-t02-wire-strip-picker-selection](task-spa-nf-lab-08-t02-wire-strip-picker-selection/README.md) | Done |
| T03 | [task-spa-nf-lab-08-t03-ban-classic-css-leak](task-spa-nf-lab-08-t03-ban-classic-css-leak/README.md) | Done |
| T04 | [task-spa-nf-lab-08-t04-m154-visual-gate](task-spa-nf-lab-08-t04-m154-visual-gate/README.md) | Done · visual BLOCK |

## Gate
[story-acceptance-gate-STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md](story-acceptance-gate-STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md) · **BLOCK**
