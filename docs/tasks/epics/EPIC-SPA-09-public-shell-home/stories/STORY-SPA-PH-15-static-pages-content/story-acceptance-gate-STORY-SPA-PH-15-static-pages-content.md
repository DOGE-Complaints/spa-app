# Story acceptance gate — STORY-SPA-PH-15-static-pages-content

- **Story:** About / Privacy / Contact content frames
- **Package:** `pkg-000219-20261023-epic-spa-09-ph-15-static-pages-content.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-23T15:20:04Z
- **Note:** P3 Execute Done · T01–T04 **Done** · Path A M172 + privacy downloads · Interview S8 · Partial visual=**BLOCK** · OP eye **Absent** · CAPTURE-META `fails: []` · no invent legal body · no invent RU/ET download labels · no invent form POST / OP PASS · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| UX tip cited / intake PASS (M172 + privacy downloads) | Present | ui-mockup-spec · M172 · privacy downloads |
| About / Contact structured beyond pending stub | Structure Present · OP Absent | shots 01·03·05 · md5 `649b02313f8d` · `67f37f7131f9` |
| Privacy: three PDF downloads · no fake in-page legal | Structure Present · OP Absent | shot 02·04 · md5 `381c87b144e0` · `7c1cb1052f8f` |
| Vitest · OP eye | Vitest green · OP Absent → **BLOCK** | StaticPublicPage.test **4/4** · Partial visual |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/StaticPublicPage.test.jsx
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" PH15_BASE=http://127.0.0.1:5173 node scripts/tmp-ph15-capture.mjs
```

## Visual checklists

[`visual-checklists-static-pages-content.md`](./visual-checklists-static-pages-content.md) · Path A Present · OP eye Absent → **BLOCK**

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
