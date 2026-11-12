# SPA-NF-11-T04 — Audit F5 Major: oval composer chrome Match M153 (NF-08 residual)

**Status:** Done · P6 (`2026-10-11T15:47:08Z`)
**Story:** [`../STORY-SPA-NF-11-live-artboard-parity-verify.md`](../STORY-SPA-NF-11-live-artboard-parity-verify.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-11-live-artboard-parity-verify.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-11-live-artboard-parity-verify.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**extends mockup:** [`../task-spa-nf-11-t01-live-capture-matrix/README.md`](../task-spa-nf-11-t01-live-capture-matrix/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-11T15:38:33Z`
**Package:** `pkg-000113` · `run_mode=spa_nf_11_audit_2026_10_11`
**Gap:** G0 / parity **F5 Major** · owner NF-08 residual · AD-VP-01
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)
**Arch delta:** AD-VP-01 · AD-VP-04

## Purpose
Product presentation fix in `features/feed`: oval composer chrome Match M153 on expand (paperclip + circular send; no labelled yellow «Post reply» pill). Do **not** WAIVE Major.

## Constraints
- Presentation in `src/features/feed/` only (wrap/CSS) — reuse Closed `CommentComposer` semantics · no invent endpoints · no M155 · no shell invent.
- Recapture F5 evidence after fix · update parity scores / gate toward PASS if no Major remains.

## AC / DoD
- [x] Live expanded (and entry) composer shows oval bar + circular icon send (aria name preserved)
- [x] `data-composer-chrome="oval"` / oval-entry Present · vitest/assert presentation
- [x] Evidence recapture · F5 → **Match** · gate **PASS**
- [x] No invent M155 · no git push

**Evidence:** `04c`/`04e` · `FeedDiscussionBlock.css` oval chrome · vitest nf08
