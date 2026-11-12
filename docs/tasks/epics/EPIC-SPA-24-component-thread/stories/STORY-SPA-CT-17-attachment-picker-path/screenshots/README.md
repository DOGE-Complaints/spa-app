# STORY-SPA-CT-17 — screenshots (story root indexer)

**Viewport:** lab feed / lab thread Path A  
**Captured UTC:** `2026-10-20T12:00:47Z` (pack) · indexer P6 `2026-10-20T12:08:05Z`  
**Route:** `#/lab/feed` (01–04) · `#/lab/thread` stand Q (05)  
**OP eye:** **Absent** · Partial visual = **BLOCK** (not PASS)  
**Pack SSOT:** [`full-cycle/README.md`](./full-cycle/README.md)

## Happy flow

| ID | State | File | md5 prefix | Claim |
|----|-------|------|------------|-------|
| H1 | A zero chips | [full-cycle/01-a-zero-chips.png](./full-cycle/01-a-zero-chips.png) | `3bda8d25590c` | Attach + file input · no chips |
| H2 | B native picker | [full-cycle/02-b-native-picker.png](./full-cycle/02-b-native-picker.png) | `d839842d56f8` | `input[type=file]` Path A reveal |
| H3 | C Ready from pick | [full-cycle/03-c-ready-from-pick.png](./full-cycle/03-c-ready-from-pick.png) | `1895b4e24676` | local Ready · not published |
| H4 | D/E Denied from pick | [full-cycle/04-de-denied-from-pick.png](./full-cycle/04-de-denied-from-pick.png) | `6b2c0f49d9d4` | fail-closed · draft intact |
| H5 | F attach off | [full-cycle/05-f-attach-off.png](./full-cycle/05-f-attach-off.png) | `876f9a920fd3` | Attach omitted · no fake Denied |

## Edge cases

_(none separate — Path A M153a A–F pack is Happy H1–H5)_

## Related

- Gate: [`../story-acceptance-gate-STORY-SPA-CT-17-attachment-picker-path.md`](../story-acceptance-gate-STORY-SPA-CT-17-attachment-picker-path.md) · Result **BLOCK**
- Visual checklist: [`../visual-checklists-attachment-picker.md`](../visual-checklists-attachment-picker.md)
- Capture: `spa-app/scripts/tmp-ct17-capture.mjs`
- Audit F2 close: [`../task-spa-ct-17-t06-screenshots-root-readme/README.md`](../task-spa-ct-17-t06-screenshots-root-readme/README.md)
- Disposition: [`../../../../../../analysis/p5-disposition-STORY-SPA-CT-17-2026-10-20.md`](../../../../../../analysis/p5-disposition-STORY-SPA-CT-17-2026-10-20.md)

**Locks:** no invent OP PASS · Partial=**BLOCK** until OP eye · no invent MIME/HTTP · `#/next/feed` OOS
