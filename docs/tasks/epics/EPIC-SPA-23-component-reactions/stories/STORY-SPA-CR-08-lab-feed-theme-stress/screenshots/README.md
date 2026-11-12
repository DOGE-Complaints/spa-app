# STORY-SPA-CR-08 — screenshots (story root indexer)

**Viewport:** 1536×1024  
**Captured UTC:** `2026-10-15T19:33:38Z` (pack) · indexer P6 `2026-10-15T19:39:31Z`  
**Route:** `http://127.0.0.1:5173/#/lab/feed`  
**OP eye:** **Absent** · Partial visual = **BLOCK** (not PASS)  
**Pack SSOT:** [`full-cycle/README.md`](./full-cycle/README.md)

## Happy flow

| ID | State | File | md5 prefix | Claim |
|----|-------|------|------------|-------|
| H1 | M160 stress host Present | [full-cycle/01-lab-feed-cr08-stress-controls-1536x1024.png](./full-cycle/01-lab-feed-cr08-stress-controls-1536x1024.png) | `ad015abf8b67` | `rm-lab-stress-controls` · locale×theme×320×200% |
| H2 | Light theme · root picker | [full-cycle/02-lab-feed-cr08-theme-light-picker-1536x1024.png](./full-cycle/02-lab-feed-cr08-theme-light-picker-1536x1024.png) | `4a7c0c2e3781` | Light strip/picker tokens |

## Edge cases

| ID | State | File | md5 prefix | Claim |
|----|-------|------|------------|-------|
| E1 | Dark theme · picker/card | [full-cycle/03-lab-feed-cr08-theme-dark-picker-1536x1024.png](./full-cycle/03-lab-feed-cr08-theme-dark-picker-1536x1024.png) | `0bc91cb67108` | Dark surfaces · no light island |
| E2 | ET locale × 320 viewport | [full-cycle/04-lab-feed-cr08-locale-et-320-1536x1024.png](./full-cycle/04-lab-feed-cr08-locale-et-320-1536x1024.png) | `bb5130b459a5` | Prefer-reuse L10N + narrow |
| E3 | 200% text zoom | [full-cycle/05-lab-feed-cr08-text-200-1536x1024.png](./full-cycle/05-lab-feed-cr08-text-200-1536x1024.png) | `f35877f84316` | Prefer-reuse text zoom |

## Related

- Gate: [`../story-acceptance-gate-STORY-SPA-CR-08-lab-feed-theme-stress.md`](../story-acceptance-gate-STORY-SPA-CR-08-lab-feed-theme-stress.md) · Result **BLOCK**
- Visual checklist: [`../visual-checklists-m160-lab-feed-theme-stress.md`](../visual-checklists-m160-lab-feed-theme-stress.md)
- Capture: `spa-app/scripts/tmp-cr08-capture.mjs`
- Audit F2 close: [`../task-spa-cr-08-t05-audit-f2-story-root-screenshots-readme/README.md`](../task-spa-cr-08-t05-audit-f2-story-root-screenshots-readme/README.md)

**Locks:** no invent OP PASS · `data-lab-visual-done=false` until OP eye · M155 OOS · CR-09/10 OOS
