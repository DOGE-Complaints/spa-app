# SPA-NF-VL-10-T08 — Audit F2 honest classic board map smoke (05)

**Status:** Done · P6 (`2026-10-12T16:20:30Z`) · P5 scaffold (`2026-10-12T16:18:23Z`) · `run_mode=spa_nf_vl_10_audit_2026_10_12`  
**Story:** [`../STORY-SPA-NF-VL-10-map-chrome-atoms.md`](../STORY-SPA-NF-VL-10-map-chrome-atoms.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-NF-VL-10-execution-2026-10-12.md`](../../../../../../analysis/audit-STORY-SPA-NF-VL-10-execution-2026-10-12.md) · **F2 Medium**  
**Package:** `pkg-000124` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed` · **ui_anchor:** false · evidence-only  
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose

Close FR-VL-10.4 / anti-mixing evidence: `05` must show **classic** `#/board` **map** chrome (Map toggle active · `board-issues-map` Present) — not List/empty — and assert **no** VL `BoardMap` / `MapSubsetNotice` / `MapIssuePreview` / `MapStatePanel`.

## AC / DoD

- [x] `05` shows classic map view (`board-view-map` pressed · `board-issues-map` or classic map surface)
- [x] No `data-vl-done-surface` for BoardMap / MapSubsetNotice / MapIssuePreview / MapStatePanel
- [x] md5 of `05` ≠ `ac89a6778422`
- [x] Update README indexers · no invent map API · no mutate board product beyond click-to-map for smoke · no git push

## Out of scope

Invent API · VL next-feed product · Info F3–F5 · git push

## Implement notes (P6)

`#/board` → click `[data-testid="board-view-map"]` (URL `?view=map` does not set React `boardView`) · classic `board-issues-map` Present · no VL DS surfaces · md5 `ea7f1a5b718f` ≠ `ac89a6778422`.

**Closed:** `2026-10-12T16:20:30Z`
