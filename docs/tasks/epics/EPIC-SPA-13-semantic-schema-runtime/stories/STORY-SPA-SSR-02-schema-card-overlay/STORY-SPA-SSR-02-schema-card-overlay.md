# STORY-SPA-SSR-02-schema-card-overlay — Schema card overlay

## Meta (pipeline)

- **Key:** `STORY-SPA-SSR-02-schema-card-overlay`
- **Parent Epic:** [`../../EPIC-SPA-13-semantic-schema-runtime.md`](../../EPIC-SPA-13-semantic-schema-runtime.md)
- **Epic:** EPIC-SPA-13 Semantic Schema Runtime · **Wave 1**
- **Status:** Done
- **Severity:** HIGH
- **orientation:** ui_first
- **source:** [`../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-02-schema-card-overlay.md`](../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-02-schema-card-overlay.md)
- **decision_ref:** backlog + [M141](../../../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md) + [api-req §2.1](../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-api-requirements.md) + [icons](../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-icon-assets.md)
- **ui_scope:** `visual`
- **mockup SSOT:** `docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md`
- **Depends on:** SSR-01 (recommended) · PH-04 · M141
- **P1.3 APPLY:** 2026-09-02T19:53:04Z · [`pkg-000075`](../../../../spa-active-packages/pkg-000075-20260902-epic-spa-13-ssr-02-schema-card-overlay.yaml)
- **P3 Done:** 2026-09-02T20:06:33Z · gate [acceptance-verification-spa-ssr-02.md](./task-spa-ssr-02-t05-vitest-story-gate-ssr-02/acceptance-verification-spa-ssr-02.md)

```text
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png
```

## Артборд (SSOT дизайна)

| Мокап | Artboard | Состояние | Спека (.md) | PNG |
|-------|----------|-----------|-------------|-----|
| **M141** | SSR-C | Card + detail overlay when `schema_card` non-empty; civic-only when absent | [mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md](../../../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md) | [PNG](../../../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png) |

> SSOT folder: [`docs/UX/mockups/semantic-schema/`](../../../../../UX/mockups/semantic-schema/README.md) (not `semantic-schema-runtime/`).

## Зачем

When `issue.schema_card` is non-empty, show Additional details on card + detail; civic-only when absent.

## Субтаски (pipeline)

| Таск | Folder | Суть |
|------|--------|------|
| **T01** | [task-spa-ssr-02-t01-overlay-compact-card](./task-spa-ssr-02-t01-overlay-compact-card/README.md) | Compact card overlay · **ui_anchor** |
| **T02** | [task-spa-ssr-02-t02-overlay-issue-detail](./task-spa-ssr-02-t02-overlay-issue-detail/README.md) | Detail page overlay · extends ui-mockup |
| **T03** | [task-spa-ssr-02-t03-l10n-cardfield-resolver](./task-spa-ssr-02-t03-l10n-cardfield-resolver/README.md) | `schemaRuntime.cardField.*` 1:1 |
| **T04** | [task-spa-ssr-02-t04-sec-no-structured-payload](./task-spa-ssr-02-t04-sec-no-structured-payload/README.md) | SEC — never dump payload |
| **T05** | [task-spa-ssr-02-t05-vitest-story-gate-ssr-02](./task-spa-ssr-02-t05-vitest-story-gate-ssr-02/README.md) | Vitest + story gate |

## Вне scope

Map (SSR-03) · invent field names · pack.json UI · `structured_payload`
