# Story acceptance gate — STORY-SPA-CR-27-list-own-reactions-hydrate

- **Story:** List feed hydrate own reactions on page load
- **Package:** `pkg-000225-20261024-epic-spa-23-cr-27-list-own-reactions-hydrate.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-24T10:33:50Z
- **Note:** P3 Execute Done · T01–T03 **Done** · Path A list `FeedIssueCard` lifts `thread_root_reactions` via CR-25 `onThreadRootReactions` → `initialSelected*` · **no invent gateway schema** · CAPTURE-META `fails: []` · feed.cr27 **2/2** · list markers Present · lab CR-25 regression held · OP eye **Absent** · Partial visual=**BLOCK** · **no invent PASS** · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| List cards show own selected after reload (Bearer) | Structure Present · OP Absent | FeedListArea lift · shots 01–02 · listProbe `data-feed-cr27` · Bearer session may show count>0; anon/empty selected=0 held |
| Detail path CR-25 regression held | Structure Present | shot 03 · labProbe stripCount=1 · own acknowledge |
| Vitest · OP eye | Vitest green · visual **BLOCK** | feed.cr27 **2/2** · OP eye Absent → Partial=**BLOCK** |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed/__tests__/feed.cr27.test.jsx
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" CR27_BASE=http://127.0.0.1:5173 node scripts/tmp-cr27-capture.mjs
```

## Visual checklists

[`visual-checklists-list-own-reactions-hydrate.md`](./visual-checklists-list-own-reactions-hydrate.md) · Path A Present · OP eye Absent → **BLOCK**

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
