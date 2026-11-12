# SPA-NF-VL-05-T07 — Audit F1 honest `#/board` discussion smoke (05)

**Status:** Done · P6 (`2026-10-12T15:03:25Z`) · P5 scaffold (`2026-10-12T15:00:23Z`) · `run_mode=spa_nf_vl_05_audit_2026_10_12`  
**Story:** [`../STORY-SPA-NF-VL-05-discussion-layout-light-plane.md`](../STORY-SPA-NF-VL-05-discussion-layout-light-plane.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-05-discussion-layout-light-plane.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-05-discussion-layout-light-plane.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-NF-VL-05-execution-2026-10-12.md`](../../../../../../analysis/audit-STORY-SPA-NF-VL-05-execution-2026-10-12.md) · **F1 Medium**  
**Package:** `pkg-000119` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed` · **ui_anchor:** false · evidence-only  
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose

Re-capture Path A `05` so `#/board` smoke honestly shows **classic** discussion/thread chrome (populated IssueThreadBlock DISCUSSION / CommentTree) and proves absence of VL `data-vl-done-surface="DiscussionLayout"` / light `CommentTree` — mirror VL-03/04 board-smoke honesty.

## AC / DoD

- [x] `05` is **not** empty discovery-only board
- [x] `05` shows classic board discussion/thread chrome Present
- [x] Assert no `data-vl-done-surface="DiscussionLayout"` / light CommentTree on `#/board`
- [x] md5 of `05` ≠ prior empty `ff7e1ef08da1`
- [x] Update `screenshots/README.md` + `full-cycle/README.md` md5 / claim for `05`
- [x] No invent threads API · no product code · no mutate board chrome · no reopen NF-08

## Out of scope

Invent API · reopen NF-08 · VL-06 composer · git push · product feature work

## Implement notes (P6)

Re-captured `05` on live `#/board?view=list` · seeded issue `5111bcba-…` · classic DISCUSSION + React|Discussion|Invite · ReactionControls + CommentTree Present · evaluate no VL DiscussionLayout / light CommentTree · md5 `50b05999fc1b` ≠ `ff7e1ef08da1`.

**Closed:** `2026-10-12T15:03:25Z`
