# STORY-SPA-CT-20 — screenshots (story root indexer)

**Viewport:** lab feed Path A · LAB-1…4 residual  
**Captured UTC:** `2026-10-20T13:13:37Z` (pack)  
**Route:** `#/lab/feed`  
**OP eye:** **Absent** · Partial visual = **BLOCK** (not PASS)  
**Pack SSOT:** [`full-cycle/README.md`](./full-cycle/README.md)

## Happy flow

| ID | State | File | md5 prefix | Claim |
|----|-------|------|------------|-------|
| H1 | LAB-1 statuses | [full-cycle/01-lab1-status-stands.png](./full-cycle/01-lab1-status-stands.png) | `116b10957af0` | loading/empty/unavailable |
| H2 | LAB-2 fail | [full-cycle/02-lab2-force-post-fail.png](./full-cycle/02-lab2-force-post-fail.png) | `48263426ee9f` | forcePostFail |
| H3 | LAB-3 attach-off | [full-cycle/03-lab3-attach-off.png](./full-cycle/03-lab3-attach-off.png) | `66c5f25d9f72` | attachmentsAvailable=false |
| H4 | LAB-4 maxDepth | [full-cycle/04-lab4-maxdepth-reply-block.png](./full-cycle/04-lab4-maxdepth-reply-block.png) | `0a0de40827f0` | Reply block depth≥max |
| H5 | Harness | [full-cycle/05-harness-dual-append-picker.png](./full-cycle/05-harness-dual-append-picker.png) | `00145d81c4db` | dual-append + picker green |

## Edge cases

_(none separate — LAB-1…4 + harness pack is Happy H1–H5)_

## Related

- Gate: [`../story-acceptance-gate-STORY-SPA-CT-20-lab-audit-fixtures.md`](../story-acceptance-gate-STORY-SPA-CT-20-lab-audit-fixtures.md) · Result **BLOCK**
- Visual checklist: [`../visual-checklists-lab-audit-fixtures.md`](../visual-checklists-lab-audit-fixtures.md)
- LAB waiver: [`../lab-waiver-log-STORY-SPA-CT-20.md`](../lab-waiver-log-STORY-SPA-CT-20.md)
- Capture: `spa-app/scripts/tmp-ct20-capture.mjs`

**Locks:** no invent OP PASS · Partial=**BLOCK** until OP eye · no invent HTTP · `#/next/feed` OOS
