# Story acceptance gate — STORY-SPA-REQ10-02-reaction-selected-reload

- **Story:** Actor `selected` on reload (H5 client · Option A)
- **Package:** `pkg-000088-20260928-epic-spa-16-req10-02-reaction-selected-reload.yaml`
- **Result:** PASS
- **Date:** 2026-09-28T18:22:01Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| AC-SPA-REQ1002-01 (H5) | PASS | Mapper maps `selected[]` → nodes/root; Mount→Block `threadRootSelected`→`initialSelected`; CommentTree `node.selected`→`initialSelected` |
| AC-SPA-REQ1002-02 | PASS | Counts still from `summary_marks` / `aggregate_count` (vitest selected map keeps summary counts) |
| AC-SPA-REQ1002-03 (H7 Keep) | PASS | ReactionControls Keep test: empty marks → no `data-reaction-id` strip entries · count 0 |
| AC-SPA-REQ1002-04 | PASS | No new Closed path; `CLOSED_SOCIAL_PATHS` unchanged; Option A tree field only |
| AC-SPA-REQ1002-05 | PASS | ReactionControls onReact applies `data.selected` + `summary_marks`; client react PUT U2 still green |
| AC-SPA-REQ1002-06 (H9) | N/A optional | stretch — not Pass blocker |

## Commands (live verification 2026-09-28T18:22:01Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# ok 5 paths · pkg-000088
cd spa-app && npx vitest run src/repositories/__tests__/ThreadsSocialClient.test.js src/components/threads/__tests__/ReactionControls.test.jsx
# 38 passed (27 + 11)
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
# ok date-check
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
