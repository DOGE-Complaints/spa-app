# UI mockup spec — SPA-SSR-02-T01 (extends M141)

**Path A ready** — no invent artboard.

```text
extends mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md
extends mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png
```

## Delta (this task)

| Item | Target |
|------|--------|
| Host | Compact `IssueCard` on `/#/board` |
| When | `issue.schema_card` non-empty object |
| Block | `Additional details` / `schemaRuntime.overlay.sectionTitle` |
| Rows | Only keys present on `schema_card`; labels `schemaRuntime.cardField.<path>` |
| Absent | No empty chrome; no `structured_payload` |
| Selector | `[data-testid="schema-card-overlay"]` · `data-density="compact"` |

## Baseline

[`ui-baseline/pre-implement/01-board-1536x1024.png`](./ui-baseline/pre-implement/01-board-1536x1024.png) — civic-only, overlay absent.

## Compact collapse bound (disk)

- **Implemented bound:** `COMPACT_COLLAPSE_AFTER = 4` in `SchemaCardOverlay.jsx` — compact density with **>4** `schema_card` leaves shows first 4 rows + static `<p data-testid="schema-card-overlay-more">` (`schemaRuntime.overlay.showMore`). Non-interactive by design (product happy AC unchanged).
- **M141 recommend:** artboard notes «up to 3» visible rows — intentional disk bound is **4**, not a product reopen. Evidence: vitest collapse cases + Edge many PNG (`screenshots/full-cycle/03-…`).
