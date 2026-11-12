# SPA-THR-01-T09 — As-of-Done backlog + INDEX verified SSOT (F2)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** [audit-STORY-SPA-THR-01-execution-2026-09-22.md](../../../../../../analysis/audit-STORY-SPA-THR-01-execution-2026-09-22.md) §F2  
**Depends on:** SPA-THR-01-T07 Done  
**ui_scope:** `none`  
**Skill declared:** `code-reviewer`  
**Scaffolded:** 2026-09-22T20:51:21Z  
**Closed:** 2026-09-22T20:56:00Z  
**Package:** `pkg-000077` **unchanged** · wave `spa_thr_01_audit_2026_09_22`

## Purpose
Doc-only: backlog §«Текущее состояние» still claims no BoardIssuePost/IssueThreadBlock; AC `[ ]` lag; package INDEX tip «dictionary not on disk» / THR-01 Todo contradict Done Meta.

## Risk
Reopening product AC; rewriting pkg-000077.

## Code Facts (re-verify at execute)
- Updated: [`STORY-SPA-THR-01-….md`](../../../../../backlog-stories/threads-feed/STORY-SPA-THR-01-board-issue-post-mounts.md) §Текущее состояние → As-of-Done + Historical
- Updated: [`threads-feed/INDEX.md`](../../../../../backlog-stories/threads-feed/INDEX.md) THR-01 Done + dictionary on disk
- Disk: `BoardIssuePost` / `IssueThreadBlock` / `threadsFeedDictionary.js` · Meta Done

## Gap
Audit F2 Medium — backlog/INDEX verified SSOT lag. **CLOSED**

## AC / DoD
- [x] (P0) Backlog §Текущее состояние → As-of-Done + Historical
- [x] (P0) Backlog AC `[x]` aligned with pipeline Done
- [x] (P0) package INDEX THR-01 Done + dictionary on disk tip
- [x] (P0) Doc-only; pkg unchanged

## Where changed
- `spa-app/docs/tasks/backlog-stories/threads-feed/STORY-SPA-THR-01-board-issue-post-mounts.md`
- `spa-app/docs/tasks/backlog-stories/threads-feed/INDEX.md`
- [acceptance-verification-spa-thr-01-t09.md](./acceptance-verification-spa-thr-01-t09.md)

## Out of scope
Product code · F1 harness · F3 arch · git push

## Verification
```bash
rg -n 'As-of-Done|BoardIssuePost|threadsFeedDictionary|Todo|Done' spa-app/docs/tasks/backlog-stories/threads-feed/STORY-SPA-THR-01-board-issue-post-mounts.md spa-app/docs/tasks/backlog-stories/threads-feed/INDEX.md
```
