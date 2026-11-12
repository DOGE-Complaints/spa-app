# SPA-NF-08-T06 — Two preview bodies Path A (F1)

**Status:** ✅ Done · P6 `2026-10-11T13:49:27Z`  
**Story:** [`../STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md`](../STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md)  
**Decision Ref:** [audit-STORY-SPA-NF-08-execution-2026-10-11.md](../../../../../../analysis/audit-STORY-SPA-NF-08-execution-2026-10-11.md) · F1 Medium  
**ui_scope:** `feed`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-11T13:46:06Z`  
**Package:** `pkg-000110` (unchanged · `run_mode=spa_nf_08_audit_2026_10_11`)  
**Gaps:** F1 → **CLOSED**  
**Done:** `2026-10-11T13:49:27Z`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)

## Purpose

Close F1: M152 Panel C requires **two** literal preview bodies (thr02 illustrative strings). Adjust collapsed preview selection and/or fixture so Path A `01`/`04` show both bodies — not roots-only single `depth:0`.

## AC / DoD

- [x] Collapsed previews show both M152 bodies from thr02-shaped comments
- [x] `full-cycle/01` evidence shows two preview rows
- [x] Vitest covers thr02 one-root+reply → two previews
- [x] Gap F1 CLOSED in P6

## Where to change

- `src/features/feed/FeedDiscussionBlock.jsx` (+ test)
- `…/screenshots/full-cycle/01-…png` (+ post-implement if used)
- `screenshots/README.md` · `full-cycle/README.md`

## Out of scope

M155 · shell invent · F2 AppBar crop (T07) · F3–F4 WAIVED · P7/P8
