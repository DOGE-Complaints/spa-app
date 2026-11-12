# SPA-NF-LAB-03-T02 — Reactions local seam (M154)

**Status:** Done · P3 (`2026-10-13T12:42:25Z`)
**Story:** [`../STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`](../STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T12:29:42Z`
**Package:** `pkg-000129`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK** · ban classic `ReactionControls.css`

## Purpose
Mount reaction strip/picker atoms (`ReactionChrome` / related) with **local in-memory** selection only. Prefer next/lab CSS. **Must not** import classic `ReactionControls.css` as Done skin. Restyle to M154 written §.

## Constraints
- No PUT / gateway / threads HTTP (FR-LAB-03.3).
- Optional reuse `semantics/reactionsV1` catalog — state stays in lab memory.
- Ban classic Controls CSS on lab Done reaction path.
- Partial visual = BLOCK (finalize in T04).

## AC / DoD
- [x] Reactions atoms on each lab card
- [x] Selection local in-memory only
- [x] No classic `ReactionControls.css` import on lab Done path
- [x] Lab CSS aims at M154 must-states (C) · visual OP Pending

## Where to change
- Lab card reactions slot + lab CSS module(s)
- Cite `features/feed/reactions/` atoms — do not re-skin via classic Controls

## Verification
- Grep `ReactionControls.css` absent from lab Done imports
- No fetch/PUT from reaction handlers
- Path A M154 evidence in T04
