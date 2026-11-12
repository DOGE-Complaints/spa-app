# ADMIN-SSR-02 — UX mockup intake (слой 4.1 → specs)

## Meta

- **Key:** `ADMIN-SSR-02-ux-mockup-intake`
- **Status:** Done (2026-09-02)
- **Depends on:** [ADMIN-SSR-01](ADMIN-SSR-01-product-ux-prompts.md) Done + UX-диалог выполнен оператором
- **Blocks:** ADMIN-SSR-03, ADMIN-SSR-05; freeze для ADMIN-SSR-04 visuals
- **Skill:** docs / UX SSOT curation

## Цель

Зафиксировать результаты UX-генерации как **SSOT mockup specs** в репозитории. **Не** invent `mockup-NN` пока файлов нет на диске.

## Целевая директория (факт intake)

```
spa-app/docs/UX/mockups/semantic-schema/
```

> Черновик ADMIN-SSR-02 предлагал `mockups/semantic-schema-runtime/`. Оператор положил спеки и PNG в **`semantic-schema/`** как **M141–M142** — SSOT = эта папка; дубликат `semantic-schema-runtime/` **не создавался**.

| Artboard | Mockup | Future story | Spec | PNG |
|----------|--------|--------------|------|-----|
| SSR-C | M141 | STORY-SPA-SSR-02 | [mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.md) | [mockup-141-…-spec.png](../../../UX/mockups/semantic-schema/mockup-141-schema-card-overlay-issue-card-detail-state-sheet-spec.png) |
| SSR-M | M142 | STORY-SPA-SSR-03 | [mockup-142-board-list-map-toggle-state-sheet-spec.md](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md) | [mockup-142-…-spec.png](../../../UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png) |

PNG артборды **на диске** (basename = spec без `.md` → `.png`). Используются далее для extract icons / assets (ADMIN-SSR-03+).

Indexer: [`docs/UX/mockups/semantic-schema/README.md`](../../../UX/mockups/semantic-schema/README.md).

Mockup specs document:

- overlay label source = `schemaRuntime.cardField.<pack-dotted-path>` (see ADMIN-SSR-05)
- geo pin popup fields = public `issue.geo.*` keys only (`lat`, `lon`, `label`, `district`, …)

## Deliverable

1. ~~Папка `semantic-schema-runtime/`~~ → **`docs/UX/mockups/semantic-schema/`** + specs M141–M142 + PNG + [README.md](../../../UX/mockups/semantic-schema/README.md)
2. Таблица Artboard → Mockup → Spec → PNG выше (SSOT intake)
3. Link from [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) Mockup table
4. Explicit note: do not invent gateway fields in visual specs; story §Артборд paths → **ADMIN-SSR-05**

## TODO (layer execution)

- [x] Verify каждый `*-spec.md` exists (read/glob); missing → STOP
- [x] Не invent mockup-NN
- [ ] Прописать реальные paths в SSR-02/03 (ADMIN-SSR-05)
- [x] PNG on disk — documented in table above

## Acceptance

- [x] SSR-C и SSR-M имеют `*-spec.md` on disk (M141, M142)
- [x] States из ADMIN-01 покрыты (SSR-C-civic/overlay-compact/detail/many/narrow · SSR-M-list/map/ineligible/partial/filtered/narrow)
- [x] Nav/route `/board` согласован с brief (M142)
- [x] INDEX: ADMIN-SSR-02 → Done

## Как выполнять

«Закрой ADMIN-SSR-02 — спеки и PNG в `docs/UX/mockups/semantic-schema/` уже на диске; обнови PRODUCT-BRIEF / INDEX → Done».
