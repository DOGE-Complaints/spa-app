# STORY-SPA-CT-18 — screenshots (story root indexer)

**Viewport:** lab feed Path A · CT-08 TREE  
**Captured UTC:** `2026-10-20T12:21:04Z` (pack) · indexer P6 `2026-10-20T12:27:40Z`  
**Route:** `#/lab/feed` · M153b A–D  
**OP eye:** **Absent** · Partial visual = **BLOCK** (not PASS)  
**Pack SSOT:** [`full-cycle/README.md`](./full-cycle/README.md)

## Happy flow

| ID | State | File | md5 prefix | Claim |
|----|-------|------|------------|-------|
| H1 | A bubble | [full-cycle/01-a-bubble.png](./full-cycle/01-a-bubble.png) | `038c0c15b72e` | `#F7F6F2` / 1px `#E7E4DC` / 12 / 12×16 |
| H2 | B spine/elbow | [full-cycle/02-b-spine-elbow.png](./full-cycle/02-b-spine-elbow.png) | `923915bee67c` | 1px `#667085` · r 6 · indent 44px |
| H3 | C pills ≥44 | [full-cycle/03-c-pills-44.png](./full-cycle/03-c-pills-44.png) | `7dc35d9bd31d` | shared group · `#B54708` · no `#2E90FA` |
| H4 | D reply parent | [full-cycle/04-d-reply-parent.png](./full-cycle/04-d-reply-parent.png) | `4cb87448f3e3` | inset 3px `#B54708` · fill unchanged |
| H5 | Depth 2.0 A–D | [full-cycle/05-depth2-audit.png](./full-cycle/05-depth2-audit.png) | `133ecf58c616` | TREE overview · A–D computed Match |

## Edge cases

_(none separate — Path A M153b A–D pack is Happy H1–H5)_

## Related

- Gate: [`../story-acceptance-gate-STORY-SPA-CT-18-depth2-token-chrome.md`](../story-acceptance-gate-STORY-SPA-CT-18-depth2-token-chrome.md) · Result **BLOCK**
- Visual checklist: [`../visual-checklists-depth2-token-chrome.md`](../visual-checklists-depth2-token-chrome.md)
- Capture: `spa-app/scripts/tmp-ct18-capture.mjs`
- Audit F2 close: [`../task-spa-ct-18-t06-screenshots-root-readme/README.md`](../task-spa-ct-18-t06-screenshots-root-readme/README.md)
- Disposition: [`../../../../../../analysis/p5-disposition-STORY-SPA-CT-18-2026-10-20.md`](../../../../../../analysis/p5-disposition-STORY-SPA-CT-18-2026-10-20.md)

**Locks:** no invent OP PASS · Partial=**BLOCK** until OP eye · no invent hex outside M153b · px not rem · `#/next/feed` OOS
