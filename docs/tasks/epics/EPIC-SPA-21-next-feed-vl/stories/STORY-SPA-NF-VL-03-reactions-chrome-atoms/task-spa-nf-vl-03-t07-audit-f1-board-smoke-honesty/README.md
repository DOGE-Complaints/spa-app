# SPA-NF-VL-03-T07 — Audit F1 honest `#/board` reactions smoke (05)

**Status:** Done · P6 (`2026-10-12T14:32:42Z`) · P5 scaffold (`2026-10-12T14:29:21Z`) · `run_mode=spa_nf_vl_03_audit_2026_10_12`  
**Story:** [`../STORY-SPA-NF-VL-03-reactions-chrome-atoms.md`](../STORY-SPA-NF-VL-03-reactions-chrome-atoms.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-03-reactions-chrome-atoms.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-03-reactions-chrome-atoms.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-NF-VL-03-execution-2026-10-12.md`](../../../../../../analysis/audit-STORY-SPA-NF-VL-03-execution-2026-10-12.md) · **F1 Medium**  
**Package:** `pkg-000117` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed` · **ui_anchor:** false · evidence-only  
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose

Re-capture Path A `05` so `#/board` smoke honestly shows **classic** reactions chrome (populated issue / thread with `ReactionControls`) and proves absence of VL `data-vl-done-surface="ReactionChrome"` — mirror VL-01 crop-honesty pattern (fixable evidence, not product invent).

## AC / DoD

- [x] `05` is **not** empty discovery-only board (no classic reactions visible)
- [x] `05` shows classic board reactions surface (`ReactionControls` / thread reaction chrome) **or** navigable issue on `#/board` with classic strip Present
- [x] Assert no `data-vl-done-surface="ReactionChrome"` on `#/board` (evaluate + visual)
- [x] md5 of `05` ≠ prior empty `104acd276325`
- [x] Update `screenshots/README.md` + `full-cycle/README.md` md5 / claim for `05`
- [x] No invent reaction ids/M155/SVG · no product code required · no mutate board chrome

## Out of scope

Invent SVG · reopen NF-09 body · invent reaction ids · M155 · git push · product feature work

## Implement notes (P6)

Re-captured `05` on live `#/board?view=list` · classic `.reaction-controls` / React Present (Acknowledge mark) · evaluate `data-vl-done-surface="ReactionChrome"` = false · md5 `470778d8715b` ≠ `104acd276325`.

**Closed:** `2026-10-12T14:32:42Z`
