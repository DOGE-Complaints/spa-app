# STORY-SPA-CT-15 — screenshots (story root indexer)

**Viewport:** lab feed Path A  
**Captured UTC:** `2026-10-19T13:03:59Z` (pack) · indexer P6 `2026-10-20T09:00:37Z`  
**Route:** `http://127.0.0.1:5173/#/lab/feed`  
**OP eye:** **Absent** · Partial visual = **BLOCK** (not PASS)  
**Pack SSOT:** [`full-cycle/README.md`](./full-cycle/README.md)

## Happy flow

| ID | State | File | md5 prefix | Claim |
|----|-------|------|------------|-------|
| H1 | Narrow stand G-M3 | [full-cycle/01-narrow-stand.png](./full-cycle/01-narrow-stand.png) | `b98f9c432ccf` | greenfield card 004 · narrow |
| H2 | Branch disclosure G-M4 | [full-cycle/02-branch-disclosure-lab.png](./full-cycle/02-branch-disclosure-lab.png) | `cde0cdbe32b5` | card 002 nest · branchDisclosure |
| H3 | Residents omit G-M2 | [full-cycle/03-residents-omit.png](./full-cycle/03-residents-omit.png) | `fb2fd10aea90` | aggregate absent · no residents row |
| H4 | Residents aggregate G-M2 | [full-cycle/04-residents-aggregate.png](./full-cycle/04-residents-aggregate.png) | `70b92e8cbc66` | confirmed aggregate · residents crop |
| H5 | Heading issue id G-L5 | [full-cycle/05-heading-issue-id.png](./full-cycle/05-heading-issue-id.png) | `370b470d9a7a` | Discussion · Issue {publicId} |

## Edge cases

_(none separate — Path A residual pack is Happy H1–H5; crops 04/05 held as structure evidence)_

## Related

- Gate: [`../story-acceptance-gate-STORY-SPA-CT-15-lab-host-residual.md`](../story-acceptance-gate-STORY-SPA-CT-15-lab-host-residual.md) · Result **BLOCK**
- Visual checklist: [`../visual-checklists-lab-host.md`](../visual-checklists-lab-host.md)
- Capture: `spa-app/scripts/tmp-ct15-capture.mjs`
- Audit F2 close: [`../task-spa-ct-15-t06-screenshots-root-readme/README.md`](../task-spa-ct-15-t06-screenshots-root-readme/README.md)
- Disposition: [`../../../../../../analysis/p5-disposition-STORY-SPA-CT-15-2026-10-19.md`](../../../../../../analysis/p5-disposition-STORY-SPA-CT-15-2026-10-19.md)

**Locks:** no invent OP PASS · Partial=**BLOCK** until OP eye · no invent aggregate/HTTP · `#/next/feed` OOS
