# STORY-SPA-CT-19 — screenshots (story root indexer)

**Viewport:** lab feed Path A · AttachmentRef Ready/Denied  
**Captured UTC:** `2026-10-20T12:34:40Z` (pack) · indexer P6 `2026-10-20T12:43:47Z`  
**Route:** `#/lab/feed` (01–02 · 04–05) · `#/lab/thread` stand O (03)  
**OP eye:** **Absent** · Partial visual = **BLOCK** (not PASS)  
**Pack SSOT:** [`full-cycle/README.md`](./full-cycle/README.md)

## Happy flow

| ID | State | File | md5 prefix | Claim |
|----|-------|------|------------|-------|
| H1 | C Ready | [full-cycle/01-c-ready.png](./full-cycle/01-c-ready.png) | `65ae5db3c4af` | `Ready to post` · `#FFFDF8` · no green |
| H2 | D Denied | [full-cycle/02-d-denied.png](./full-cycle/02-d-denied.png) | `d9b516a282a5` | `#F7F6F2`/`#B54708` · allow-family helper |
| H3 | E safety Denied | [full-cycle/03-e-denied-safety.png](./full-cycle/03-e-denied-safety.png) | `a5f1c81d1e47` | safety sentence known |
| H4 | Remove accent | [full-cycle/04-remove.png](./full-cycle/04-remove.png) | `7dfc21407821` | Remove `#B54708` crop |
| H5 | Honesty | [full-cycle/05-honesty.png](./full-cycle/05-honesty.png) | `9e8f734e508c` | local intent · not published |

## Edge cases

_(none separate — Path A M153b §7 / M153a C–E pack is Happy H1–H5)_

## Related

- Gate: [`../story-acceptance-gate-STORY-SPA-CT-19-attachment-ref-token-paint.md`](../story-acceptance-gate-STORY-SPA-CT-19-attachment-ref-token-paint.md) · Result **BLOCK**
- Visual checklist: [`../visual-checklists-attachment-ref-token-paint.md`](../visual-checklists-attachment-ref-token-paint.md)
- Capture: `spa-app/scripts/tmp-ct19-capture.mjs`
- Audit F2 close: [`../task-spa-ct-19-t05-screenshots-root-readme/README.md`](../task-spa-ct-19-t05-screenshots-root-readme/README.md)
- Disposition: [`../../../../../../analysis/p5-disposition-STORY-SPA-CT-19-2026-10-20.md`](../../../../../../analysis/p5-disposition-STORY-SPA-CT-19-2026-10-20.md)

**Locks:** no invent OP PASS · Partial=**BLOCK** until OP eye · no invent MIME/HTTP · `#/next/feed` OOS
