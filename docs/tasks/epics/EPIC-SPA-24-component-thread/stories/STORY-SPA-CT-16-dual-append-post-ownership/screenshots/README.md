# STORY-SPA-CT-16 — screenshots (story root indexer)

**Viewport:** lab feed Path A  
**Captured UTC:** `2026-10-20T11:42:13Z` (pack) · indexer P6 `2026-10-20T11:48:47Z`  
**Route:** `http://127.0.0.1:5173/#/lab/feed`  
**OP eye:** **Absent** · Partial visual = **BLOCK** (not PASS)  
**Pack SSOT:** [`full-cycle/README.md`](./full-cycle/README.md)

## Happy flow

| ID | State | File | md5 prefix | Claim |
|----|-------|------|------------|-------|
| H1 | Reply unique ids BUG-1 | [full-cycle/01-reply-unique-ids.png](./full-cycle/01-reply-unique-ids.png) | `6355b33fdaf9` | nest · reply · dup=[] · forest=tree · owner=host |
| H2 | Root post unique ids | [full-cycle/02-root-post-unique-ids.png](./full-cycle/02-root-post-unique-ids.png) | `698ce06921c7` | flat card · root · dup=[] |
| H3 | Nest forest held | [full-cycle/03-nest-forest-held.png](./full-cycle/03-nest-forest-held.png) | `fb2a895c8dea` | nest reply · not flat from duplicate-id |

## Edge cases

_(none separate — Path A dual-append pack is Happy H1–H3)_

## Related

- Gate: [`../story-acceptance-gate-STORY-SPA-CT-16-dual-append-post-ownership.md`](../story-acceptance-gate-STORY-SPA-CT-16-dual-append-post-ownership.md) · Result **BLOCK**
- Visual checklist: [`../visual-checklists-dual-append.md`](../visual-checklists-dual-append.md)
- Capture: `spa-app/scripts/tmp-ct16-capture.mjs`
- Audit F2 close: [`../task-spa-ct-16-t05-screenshots-root-readme/README.md`](../task-spa-ct-16-t05-screenshots-root-readme/README.md)
- Disposition: [`../../../../../../analysis/p5-disposition-STORY-SPA-CT-16-2026-10-20.md`](../../../../../../analysis/p5-disposition-STORY-SPA-CT-16-2026-10-20.md)

**Locks:** no invent OP PASS · Partial=**BLOCK** until OP eye · no invent HTTP · `#/next/feed` OOS
