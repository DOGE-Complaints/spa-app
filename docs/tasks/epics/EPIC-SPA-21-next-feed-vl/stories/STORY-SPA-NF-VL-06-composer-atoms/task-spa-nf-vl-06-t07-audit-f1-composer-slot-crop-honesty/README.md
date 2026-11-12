# SPA-NF-VL-06-T07 — Audit F1 honest DiscussionLayout composer-slot crop (03)

**Status:** Done · P6 (`2026-10-12T15:18:15Z`) · P5 scaffold (`2026-10-12T15:17:00Z`) · `run_mode=spa_nf_vl_06_audit_2026_10_12`  
**Story:** [`../STORY-SPA-NF-VL-06-composer-atoms.md`](../STORY-SPA-NF-VL-06-composer-atoms.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-06-composer-atoms.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-06-composer-atoms.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-NF-VL-06-execution-2026-10-12.md`](../../../../../../analysis/audit-STORY-SPA-NF-VL-06-execution-2026-10-12.md) · **F1 Medium**  
**Package:** `pkg-000120` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed` · **ui_anchor:** false · evidence-only  
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose

Re-crop Path A `03` so pixels honestly show **DiscussionLayout composer slot** with ThreadComposer / oval Write a comment — not a truncated DISCUSSION header-only crop.

## AC / DoD

- [x] `03` shows DiscussionLayout context **and** composer slot (oval / ThreadComposer Present)
- [x] md5 of `03` ≠ prior weak `4d8c022ef84d`
- [x] Update `screenshots/README.md` + `full-cycle/README.md` md5 / claim for `03`
- [x] No invent POST · no product code · no mutate `#/board` · no reopen NF-08 body

## Out of scope

Invent API · reopen NF-08 · VL-11 · git push · product feature work

## Implement notes (P6)

Re-captured `03` via element screenshot of `[data-testid="feed-discussion-block"]` · DISCUSSION + Existing discussion + oval Write a comment / send Present · md5 `9008730420a1` ≠ `4d8c022ef84d`.

**Closed:** `2026-10-12T15:18:15Z`
