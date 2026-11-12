# SPA-NF-VL-11-T07 — Audit F1 honest classic board verify gate smoke (05)

**Status:** Done · P6 (`2026-10-12T16:38:16Z`) · P5 scaffold (`2026-10-12T16:35:24Z`) · `run_mode=spa_nf_vl_11_audit_2026_10_12`  
**Story:** [`../STORY-SPA-NF-VL-11-verify-gate-chrome.md`](../STORY-SPA-NF-VL-11-verify-gate-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-11-verify-gate-chrome.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-11-verify-gate-chrome.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-NF-VL-11-execution-2026-10-12.md`](../../../../../../analysis/audit-STORY-SPA-NF-VL-11-execution-2026-10-12.md) · **F1 Medium**  
**Package:** `pkg-000125` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed` · **ui_anchor:** false · evidence-only  
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose

Close FR-VL-11.4 / anti-mixing evidence: `05` must show **populated** `#/board` discussion write with **classic** `.verify-write-gate` Present — not empty List — and assert **no** VL `data-vl-done-surface` for VerifyWriteGate / VerifyReturnFeedback / WriteDeniedNotice.

## AC / DoD

- [x] `05` shows populated board + classic VerifyWriteGate chrome (`.verify-write-gate` / `data-testid="verify-write-gate"` without VL done-surface)
- [x] No `data-vl-done-surface` for VerifyWriteGate / VerifyReturnFeedback / WriteDeniedNotice
- [x] md5 of `05` ≠ `9ee8e17a31b6`
- [x] Update README indexers if Present · no invent verify API · no mutate board product beyond smoke open/post · no git push

## Out of scope

Invent API · VL next-feed product · Info F2–F6 · git push

## Implement notes (P6)

`#/board?view=list` · wait populated `board-issue-post` · `__THR05_FORCE_SCENE__=unverified` · classic `.verify-write-gate--blocked` Present · no VL DS / `nf-verify-*` · md5 `8a501201d76e` ≠ `9ee8e17a31b6`.

**Closed:** `2026-10-12T16:38:16Z`
