# Acceptance verification — SPA-THR-01-T08 Edge screenshot pack

- **Date:** 2026-09-22T20:53:58Z (+ execute)
- **Task:** SPA-THR-01-T08 · Gap F1
- **Package:** `pkg-000077` **unchanged**
- **run_mode:** `spa_thr_01_audit_2026_09_22`

## Result: **PASS**

| AC | Evidence |
|----|----------|
| Edge PNG THR-P-A loading | `screenshots/full-cycle/04-board-edge-loading-1536x1024.png` |
| Edge PNG THR-P-C populated | `screenshots/full-cycle/05-board-edge-populated-1536x1024.png` |
| Edge PNG THR-P-D unavailable | `screenshots/full-cycle/06-board-edge-unavailable-1536x1024.png` |
| M148 non-empty + narrow | `07-issue-edge-populated-…` · `08-issue-edge-narrow-populated-…` |
| README Edge table | `screenshots/README.md` |
| Optional populated vitest | `IssueThreadBlock.test.jsx` populated slots |
| No invent social HTTP | `window.__THR01_FORCE_THREAD_STATUS__` + `resolveHarnessThreadStatus` only |

## Verify

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-01-board-issue-post-mounts/screenshots/full-cycle/
rg -n 'Edge|loading|populated|unavailable' spa-app/docs/tasks/epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-01-board-issue-post-mounts/screenshots/README.md
```
