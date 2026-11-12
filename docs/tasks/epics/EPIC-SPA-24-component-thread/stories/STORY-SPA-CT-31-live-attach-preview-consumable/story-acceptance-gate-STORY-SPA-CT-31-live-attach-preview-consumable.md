# Story acceptance gate — STORY-SPA-CT-31-live-attach-preview-consumable

- **Story:** Live attach preview consumable (policy A)
- **Package:** `pkg-000195-20261021-epic-spa-24-ct-31-live-attach-preview-consumable.yaml`
- **Result:** **BLOCK** (P3 structure Present · OP eye Absent · Partial visual)
- **Date:** 2026-10-21T18:04:58Z
- **Note:** P3 Execute · policy **A** · T01–T05 Done · Path A shots 01–05 · CAPTURE-META `fails: []` · `visual_gate: BLOCK` · no invent OP PASS/CDN/HTTP-09

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| OP locked **A** or **B** | Match (**A**) | pipeline Meta · ARCH §17 |
| Live discussion shows image for tree attachment with `published_url` | structure Match · visual **BLOCK** | vitest ct31 · feed.ct31 · Path A host markers |
| Honesty when null / deny | Match | ATTACH_NODE_UNAVAILABLE_COPY · ct31 deny test |
| Lab held | Match | Fixture omit getAccessToken · fxProbe ct31OnFixture=false |
| Vitest for chosen strategy | Match | threadMount.ct31 · feed.ct31 |
| No invent CDN / OP PASS | Match / held | no invent this P3 |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed src/repositories
```

## Visual checklists

[`visual-checklists-live-attach-preview-consumable.md`](./visual-checklists-live-attach-preview-consumable.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
