# Story acceptance gate — STORY-SPA-NF-23-board-deprecate-redirect

- **Story:** Deprecate `#/board` → `/next/feed`
- **Package:** `pkg-000206-20261022-epic-spa-20-nf-23-board-deprecate-redirect.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-22T14:32:33Z
- **Note:** P3 Execute Done · T01–T04 **Done** · Path A Interview B11 / ARCH-DELTA §11 · Partial visual=**BLOCK** · OP eye **Absent** · no invent OP PASS · inventory Present · no mass-delete · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| /board → /next/feed | Pass (code) | `App.jsx` Navigate replace · nf23 + NS-06 vitest |
| Soft CTA retargets | Pass (code) | Header · HowItWorks · Footer · soft AppShell nav |
| Inventory note Present | Pass | [`inventory-board-vs-shared.md`](./inventory-board-vs-shared.md) |
| Vitest · OP eye | **BLOCK** | Vitest green · OP Absent · Partial visual |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/App.nf23BoardRedirect.test.jsx
cd spa-app && PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:ui:board-shell
```

## Visual checklists

[`visual-checklists-board-deprecate-redirect.md`](./visual-checklists-board-deprecate-redirect.md) · CAPTURE-META `fails: []` · md5 prefixes `838e83497a03` · `838e83497a03` · `941e5fc12220` · `441a3961132e` · `16134b5fe982`

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
