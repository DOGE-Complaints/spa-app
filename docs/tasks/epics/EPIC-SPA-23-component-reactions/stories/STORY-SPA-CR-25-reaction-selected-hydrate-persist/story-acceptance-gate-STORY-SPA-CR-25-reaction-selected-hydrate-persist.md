# Story acceptance gate — STORY-SPA-CR-25-reaction-selected-hydrate-persist

- **Story:** Hydrate actor selected reactions after reload
- **Package:** `pkg-000209-20261022-epic-spa-23-cr-25-reaction-selected-hydrate-persist.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-22T15:32:35Z
- **Note:** P3 Execute Done · T01–T04 **Done** · Path A Interview Rp12 · persist analysis · Partial visual=**BLOCK** · OP eye **Absent** · CAPTURE-META `fails: []` · no invent OP PASS · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Analysis cited | Present | Path A ui-mockup-spec · persist analysis |
| Post + comment selected survive reload (Bearer) | Structure Present · OP Absent | shots 01–02 · md5 `95f4ebcd293a` · `49d0172702af` |
| Summaries hydrate | Structure Present · OP Absent | shot 03 · md5 `95f4ebcd293a` |
| Vitest · OP eye | Vitest green · OP Absent → **BLOCK** | `feed.cr25.test.jsx` 7/7 · Partial visual |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed/__tests__/feed.cr25.test.jsx
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" CR25_BASE=http://127.0.0.1:5173 node scripts/tmp-cr25-capture.mjs
```

## Visual checklists

[`visual-checklists-reaction-selected-hydrate-persist.md`](./visual-checklists-reaction-selected-hydrate-persist.md) · Path A Present · OP eye Absent → **BLOCK**

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
