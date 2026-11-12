# Story acceptance gate — STORY-SPA-PH-13-how-it-works-content-cta

- **Story:** How It Works content + CTA + landing link
- **Package:** `pkg-000210-20261022-epic-spa-09-ph-13-how-it-works-content-cta.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-22T18:01:08Z
- **Note:** P3 Execute Done · T01–T04 **Done** · Path A M168 + wave3 intake · Interview H10 · Partial visual=**BLOCK** · OP eye **Absent** · CAPTURE-META `fails: []` · no invent OP PASS · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| M168 + intake cited | Present | ui-mockup-spec · M168 · intake |
| No Opens `/board` | Structure Present · OP Absent | shot 01 · md5 `1254e3972db2` |
| CTA → next/feed · landing link Present | Structure Present · OP Absent | shots 02 · 04 · md5 `26ced8a830bb` · `90de1aa2acd7` |
| Vitest · OP eye | Vitest green · OP Absent → **BLOCK** | HowItWorksPage.test **6/6** · Partial visual |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/HowItWorksPage.test.jsx
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" PH13_BASE=http://127.0.0.1:5173 node scripts/tmp-ph13-capture.mjs
```

## Visual checklists

[`visual-checklists-how-it-works-content-cta.md`](./visual-checklists-how-it-works-content-cta.md) · Path A Present · OP eye Absent → **BLOCK**

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
