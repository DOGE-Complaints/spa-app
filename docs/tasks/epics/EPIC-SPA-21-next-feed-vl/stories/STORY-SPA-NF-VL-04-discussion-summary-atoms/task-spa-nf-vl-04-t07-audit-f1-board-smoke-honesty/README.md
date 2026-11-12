# SPA-NF-VL-04-T07 — Audit F1 honest `#/board` discussion smoke (05)

**Status:** Done · P6 (`2026-10-12T14:46:47Z`) · P5 scaffold (`2026-10-12T14:45:30Z`) · `run_mode=spa_nf_vl_04_audit_2026_10_12`  
**Story:** [`../STORY-SPA-NF-VL-04-discussion-summary-atoms.md`](../STORY-SPA-NF-VL-04-discussion-summary-atoms.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-04-discussion-summary-atoms.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-04-discussion-summary-atoms.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-NF-VL-04-execution-2026-10-12.md`](../../../../../../analysis/audit-STORY-SPA-NF-VL-04-execution-2026-10-12.md) · **F1 Medium**  
**Package:** `pkg-000118` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed` · **ui_anchor:** false · evidence-only  
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose

Re-capture Path A `05` so `#/board` smoke honestly shows **classic** discussion/thread chrome (populated IssueThreadBlock DISCUSSION) and proves absence of VL `data-vl-done-surface="DiscussionSummaryChrome"` — mirror VL-03 board-smoke honesty.

## AC / DoD

- [x] `05` is **not** empty discovery-only board
- [x] `05` shows classic board discussion/thread chrome Present
- [x] Assert no `data-vl-done-surface="DiscussionSummaryChrome"` on `#/board`
- [x] md5 of `05` ≠ prior empty `495fa639b46e`
- [x] Update `screenshots/README.md` + `full-cycle/README.md` md5 / claim for `05`
- [x] No invent threads API · no product code · no mutate board chrome · no reopen NF-08

## Out of scope

Invent API · reopen NF-08 · VL-05 · git push · product feature work

## Implement notes (P6)

Re-captured `05` on live `#/board?view=list` · classic DISCUSSION + `.reaction-controls` / React Present · evaluate no `DiscussionSummaryChrome` · md5 `3d83c80bc9d8` ≠ `495fa639b46e`.

**Closed:** `2026-10-12T14:46:47Z`
