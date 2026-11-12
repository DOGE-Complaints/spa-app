# SPA-THR-01-T08 — Edge loading/populated/unavailable screenshot pack (F1)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-01-board-issue-post-mounts.md`](../STORY-SPA-THR-01-board-issue-post-mounts.md)  
**Decision Ref:** [audit-STORY-SPA-THR-01-execution-2026-09-22.md](../../../../../../analysis/audit-STORY-SPA-THR-01-execution-2026-09-22.md) §F1  
**Depends on:** SPA-THR-01-T07 Done  
**ui_scope:** `none`  
**Skill declared:** `test-master`  
**Scaffolded:** 2026-09-22T20:51:21Z  
**Closed:** 2026-09-22T20:55:00Z  
**Package:** `pkg-000077` **unchanged** · wave `spa_thr_01_audit_2026_09_22`

## Purpose
Evidence-only: capture story-root Edge PNGs for M143 `THR-P-A` loading / `THR-P-C` populated / `THR-P-D` unavailable and M148 narrow + non-empty parity. Force local `status` in harness — **do not** invent social HTTP. Optional vitest `populated` slots.

## Risk
Inventing social HTTP; reopening T01–T07 product; start THR-02.

## Code Facts (re-verify at execute)
- States: [`IssueThreadBlock.jsx`](../../../../../../../src/components/threads/IssueThreadBlock.jsx) `status` props
- Harness: [`thr01-board-issue-post-screenshot.mjs`](../../../../../../../tests/puppeteer/thr01-board-issue-post-screenshot.mjs)
- Force: [`resolveHarnessThreadStatus.js`](../../../../../../../src/components/threads/resolveHarnessThreadStatus.js) + `window.__THR01_FORCE_THREAD_STATUS__`
- Pack: [`screenshots/README.md`](../screenshots/README.md) · Happy + Edge

## Gap
Audit F1 Medium — missing Edge visual evidence. **CLOSED**

## AC / DoD
- [x] (P0) Edge PNG: THR-P-A loading
- [x] (P0) Edge PNG: THR-P-C populated (placement slots)
- [x] (P0) Edge PNG: THR-P-D unavailable
- [x] (P0) Edge PNG: M148 narrow and/or non-empty parity
- [x] (P0) `screenshots/README.md` Edge table
- [x] (P0) Optional: vitest populated slots
- [x] (P0) No invent social HTTP

## Where changed
- `tests/puppeteer/thr01-board-issue-post-screenshot.mjs`
- `src/components/threads/resolveHarnessThreadStatus.js`
- `src/pages/BoardPage.jsx` / `IssuePage.jsx` (harness resolve only)
- `…/screenshots/full-cycle/04–08*` + README
- `IssueThreadBlock.test.jsx` populated case
- [acceptance-verification-spa-thr-01-t08.md](./acceptance-verification-spa-thr-01-t08.md)

## Out of scope
Reopen T01–T07 product · invent HTTP · THR-02…06 · git push

## Verification
```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-01-board-issue-post-mounts/screenshots/full-cycle/
rg -n 'Edge|loading|populated|unavailable' spa-app/docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-01-board-issue-post-mounts/screenshots/README.md
```
