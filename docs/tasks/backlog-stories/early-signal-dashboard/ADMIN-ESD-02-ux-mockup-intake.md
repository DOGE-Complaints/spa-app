# ADMIN-ESD-02 — UX mockup intake (слой 4.1 → specs)

## Meta

- **Key:** `ADMIN-ESD-02-ux-mockup-intake`
- **Status:** Done
- **Depends on:** [ADMIN-ESD-01](ADMIN-ESD-01-product-ux-prompts.md) Done + UX-диалог выполнен оператором
- **Blocks:** ADMIN-ESD-03, ADMIN-ESD-05; freeze для ADMIN-ESD-04
- **Skill:** docs / UX SSOT curation

## Цель

Зафиксировать результаты UX-генерации как **SSOT mockup specs** в репозитории.

## Целевая директория (факт intake)

```
spa-app/docs/UX/mockups/early-discovery-dashboard/
```

> Черновик ADMIN-ESD-02 предлагал `mockups/early-signal-dashboard/`. Оператор положил спеки и PNG в **`early-discovery-dashboard/`** с номерами M136–M140 — SSOT = эта папка; дубликат `early-signal-dashboard/` **не создавался**.

| Artboard | Mockup | Future story | Spec | PNG |
|----------|--------|--------------|------|-----|
| ESD-D | M136 | ES-01 | [mockup-136-early-signal-discovery-composition-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md) | [mockup-136-early-signal-discovery-composition-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.png) |
| ESD-P | M137 | ES-02 | [mockup-137-network-pulse-block-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md) | [mockup-137-network-pulse-block-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png) |
| ESD-E | M138 | ES-03 | [mockup-138-emerging-signals-provisional-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md) | [mockup-138-emerging-signals-provisional-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png) |
| ESD-C | M139 | ES-04 | [mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.md) | [mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-139-coverage-trio-picture-missing-help-state-sheet-spec.png) |
| ESD-I | M140 | ES-05 | [mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md](../../../UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md) | [mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png](../../../UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png) |

PNG артборды **на диске** (basename = spec без расширения `.md` → `.png`). Используются далее для extract icons / assets (ADMIN-ESD-03+).

## Deliverable

1. ~~Папка `early-signal-dashboard/`~~ → **`docs/UX/mockups/early-discovery-dashboard/`** + specs M136–M140 + PNG
2. Таблица Artboard → Mockup → Spec → PNG выше (SSOT intake)
3. Link from PRODUCT-BRIEF Mockup table (при закрытии слоя)
4. Explicit note: do not invent gateway fields in visual specs

## Acceptance

- [x] All five surfaces have `*-spec.md` on disk (M136–M140) — **files present**; layer close → INDEX Done
- [x] Matching PNG artboards on disk for extract
- [x] States / Pulse omit-vs-bind covered in specs (or explicitly in state sheets)
- [x] Routes agree with brief (`/board` only)
- [x] INDEX: ADMIN-ESD-02 → Done

## Как выполнять

«Закрой ADMIN-ESD-02 — спеки и PNG в `docs/UX/mockups/early-discovery-dashboard/` уже на диске; обнови PRODUCT-BRIEF / INDEX → Done».
