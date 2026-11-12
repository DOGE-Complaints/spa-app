# Story acceptance gate — STORY-SPA-PH-14-how-it-works-deep-redesign

- **Story:** How It Works deep redesign
- **Package:** `pkg-000218-20261023-epic-spa-09-ph-14-how-it-works-deep-redesign.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-23T15:05:33Z
- **Note:** P3 Execute Done · T01–T04 **Done** · Path A M171 · Interview H6 · Partial visual=**BLOCK** · OP eye **Absent** · CAPTURE-META `fails: []` · RU verbatim · no invent ET · no invent Telegram URL / OP PASS · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| UX tip cited / intake PASS (M171) | Present | ui-mockup-spec · M171 |
| Visuals + copy tip | Structure Present · OP Absent | shots 01·03·04·05 · md5 `c90ad5486efc`… |
| CTA grouping leftward | Structure Present · OP Absent | shot 02 · md5 `50402c0625b4` · `justify-content: flex-start` |
| Routes held · Vitest · OP eye | Vitest green · OP Absent → **BLOCK** | HowItWorksPage.test **8/8** · Partial visual |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/HowItWorksPage.test.jsx
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" PH14_BASE=http://127.0.0.1:5173 node scripts/tmp-ph14-capture.mjs
```

## Visual checklists

[`visual-checklists-how-it-works-deep-redesign.md`](./visual-checklists-how-it-works-deep-redesign.md) · Path A Present · OP eye Absent → **BLOCK**

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
