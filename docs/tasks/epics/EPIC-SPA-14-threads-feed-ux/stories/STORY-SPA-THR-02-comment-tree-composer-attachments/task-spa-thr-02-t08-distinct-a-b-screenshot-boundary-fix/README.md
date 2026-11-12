# SPA-THR-02-T08 — Distinct A/B screenshots + boundary visibility fix (F1+F3)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-02-comment-tree-composer-attachments.md`](../STORY-SPA-THR-02-comment-tree-composer-attachments.md)  
**Decision Ref:** [audit-STORY-SPA-THR-02-execution-2026-09-22.md](../../../../../../analysis/audit-STORY-SPA-THR-02-execution-2026-09-22.md) §F1 · §F3  
**Depends on:** SPA-THR-02-T07 Done  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Scaffolded:** 2026-09-22T21:09:31Z  
**Closed:** 2026-09-22T21:11:15Z  
**Package:** `pkg-000078` **unchanged** · wave `spa_thr_02_audit_2026_09_22`

## Purpose
Fix `CommentTree` so max-depth banner shows **only** for `scene==='max-depth'`. Recapture `01`/`02` so `cmp` differs; A shows root composer in frame.

## Gap
Audit F1 Medium + F3 Low. **CLOSED**

## AC / DoD
- [x] (P0) Boundary copy only when `scene==='max-depth'`
- [x] (P0) Nested scene atMax: no Reply, **no** maxDepthReached banner
- [x] (P0) Recapture 01 ≠ 02 (`cmp` exit 1)
- [x] (P0) 01 scrolls root composer into frame
- [x] (P0) Vitest nested omits banner; max-depth has it
- [x] (P0) No invent social HTTP

## Where changed
- `CommentTree.jsx` · `thr02-comment-tree-screenshot.mjs` · screenshots 01/02 · vitest
- [acceptance-verification-spa-thr-02-t08.md](./acceptance-verification-spa-thr-02-t08.md)
