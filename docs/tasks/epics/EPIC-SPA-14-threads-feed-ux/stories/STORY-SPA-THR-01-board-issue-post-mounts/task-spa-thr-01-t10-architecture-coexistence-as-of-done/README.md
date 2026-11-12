# SPA-THR-01-T10 — Architecture coexistence As-of-Done (F3)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** [audit-STORY-SPA-THR-01-execution-2026-09-22.md](../../../../../../analysis/audit-STORY-SPA-THR-01-execution-2026-09-22.md) §F3  
**Depends on:** SPA-THR-01-T07 Done  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-22T20:51:21Z  
**Closed:** 2026-09-22T20:56:30Z  
**Package:** `pkg-000077` **unchanged** · wave `spa_thr_01_audit_2026_09_22`

## Purpose
Doc-only: [`01-composition-and-mounts.md`](../../../../../architecture/threads-feed-ux/01-composition-and-mounts.md) L23 still «No thread/comment product chrome in spa src».

## Risk
Re-interview arch; product code edits.

## Code Facts (re-verify at execute)
- Updated coexistence → As-of-Done mounts + Historical note
- Disk: `src/components/threads/BoardIssuePost.jsx` · `IssueThreadBlock.jsx`

## Gap
Audit F3 Low — architecture coexistence phrasing lag. **CLOSED**

## AC / DoD
- [x] (P0) Coexistence table → As-of-Done mounts present + Historical note
- [x] (P0) Doc-only; do not rewrite pkg-000077

## Where changed
- `spa-app/docs/architecture/threads-feed-ux/01-composition-and-mounts.md`
- [acceptance-verification-spa-thr-01-t10.md](./acceptance-verification-spa-thr-01-t10.md)

## Out of scope
Product code · F1/F2 · git push

## Verification
```bash
rg -n 'As-of-Done|BoardIssuePost|No thread|Historical' spa-app/docs/architecture/threads-feed-ux/01-composition-and-mounts.md
```
