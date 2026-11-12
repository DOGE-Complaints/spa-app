# SPA-NF-VL-10-T07 — Audit F1 distinct MapIssuePreview Path A (03)

**Status:** Done · P6 (`2026-10-12T16:20:30Z`) · P5 scaffold (`2026-10-12T16:18:23Z`) · `run_mode=spa_nf_vl_10_audit_2026_10_12`  
**Story:** [`../STORY-SPA-NF-VL-10-map-chrome-atoms.md`](../STORY-SPA-NF-VL-10-map-chrome-atoms.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-NF-VL-10-execution-2026-10-12.md`](../../../../../../analysis/audit-STORY-SPA-NF-VL-10-execution-2026-10-12.md) · **F1 Medium**  
**Package:** `pkg-000124` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed` · **ui_anchor:** false · evidence-only  
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose

Close Path A honesty gap: `03` must be **distinct** from `01` (md5 ≠ `5dd4539e3131`) with live **MapIssuePreview** Present (pin-select) — not a byte-identical host duplicate.

## AC / DoD

- [x] `03` shows `data-vl-done-surface="MapIssuePreview"` (title / Open issue)
- [x] md5 of `03` ≠ `5dd4539e3131` (≠ 01)
- [x] Update `screenshots/README.md` + `full-cycle/README.md` for `03`
- [x] No invent map API/tiles · no product feature invent · no mutate `#/board` · no git push

## Out of scope

Invent API · Info F3–F5 · git push · classic board (→ T08)

## Implement notes (P6)

Re-captured `03-map-issue-preview-pin-select-demo-live-1536x1024.png` with MapIssuePreview Present (session harness `nf-vl-10-demo-pin-preview=1` · mirrors nf03-demo-map-error) · sips **1536×1024** · md5 `b0be6d533420` ≠ `5dd4539e3131`.

**Closed:** `2026-10-12T16:20:30Z`
