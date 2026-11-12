# SPA-NF-VL-09-T07 — Audit F1 honest PageContentLayout crop (04)

**Status:** Done · P6 (`2026-10-12T15:59:47Z`) · P5 scaffold (`2026-10-12T15:58:14Z`) · `run_mode=spa_nf_vl_09_audit_2026_10_12`  
**Story:** [`../STORY-SPA-NF-VL-09-board-page-layouts.md`](../STORY-SPA-NF-VL-09-board-page-layouts.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-09-board-page-layouts.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-09-board-page-layouts.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-NF-VL-09-execution-2026-10-12.md`](../../../../../../analysis/audit-STORY-SPA-NF-VL-09-execution-2026-10-12.md) · **F1 Medium**  
**Package:** `pkg-000123` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed` · **ui_anchor:** false · evidence-only  
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose

Close Path A honesty gap on `04`: filename/claim `…1440x1024` must match disk pixels (prefer honest viewport capture **1440×1024** showing PageContentLayout slots — not full-height element dump `824×8800`).

## AC / DoD

- [x] `04` disk px match claimed viewport (1440×1024 preferred) **or** filename/README claim corrected to match disk
- [x] md5 of `04` ≠ prior weak `d92082630184`
- [x] Update `screenshots/README.md` + `full-cycle/README.md` md5 / dims for `04`
- [x] No invent endpoints · no product code · no mutate `#/board` · no git push

## Out of scope

Invent API · shell rails · Info F2–F3 · git push · product feature work

## Implement notes (P6)

Re-captured `04` via CDP viewport clip `{0,0,1440,1024}` (PageContentLayout in-view ~824×933) · sips **1440×1024** · md5 `1eef797f0669` ≠ `d92082630184`.

**Closed:** `2026-10-12T15:59:47Z`
