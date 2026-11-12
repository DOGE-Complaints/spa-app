# Story acceptance gate — STORY-SPA-CT-19-attachment-ref-token-paint

- **Story:** AttachmentRef Ready/Denied paint (M153b §7 · M153a C–E)
- **Package:** `pkg-000177-20261020-epic-spa-24-ct-19-attachment-ref-token-paint.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T12:34:40Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots Present · no invent MIME/HTTP/OP PASS

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Ready label `Ready to post` · no green wash | Match | capture 01 · CSS `#101828` · no `#067647` |
| Denied fill/border/title Match M153b §7 | Match | `#F7F6F2` / `#B54708` · capture 02–03 |
| D/E copy Match M153a | Match | type helper · safety sentence · denyReason |
| Remove accent Match §7 | Match | `#B54708` · capture 04 |
| Honesty present where required | Match | Local intent · not published · capture 05 |
| Chip computedStyle audit vs §7 PASS | Match | CAPTURE-META fails=[] · ct19 vitest |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct19-capture.mjs
```

## Visual checklists

[`visual-checklists-attachment-ref-token-paint.md`](./visual-checklists-attachment-ref-token-paint.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
