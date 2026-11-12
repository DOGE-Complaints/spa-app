# ADMIN-THR-02 — UX mockup intake

## Meta

- **Key:** `ADMIN-THR-02-ux-mockup-intake`
- **Status:** Done (2026-09-22)
- **Depends on:** [ADMIN-THR-01](ADMIN-THR-01-product-ux-prompts.md) Done + UX-диалог выполнен оператором
- **Blocks:** ADMIN-THR-03, ADMIN-THR-05 (ui_first refine); freeze для ADMIN-THR-04 needs
- **Skill:** docs / UX SSOT curation

## Цель

Зафиксировать UX output как **SSOT mockup specs** (+ PNG) в репозитории.

## Целевая директория (факт intake)

```
spa-app/docs/UX/mockups/threads-feed/
```

Индекс: [`docs/UX/mockups/threads-feed/README.md`](../../../UX/mockups/threads-feed/README.md)

Оператор положил спеки и PNG **M143–M148** в эту папку. **M132** не переписывался (AC-SPA-THR-04).

| Artboard | Mockup | Future story | Spec | PNG |
|----------|--------|--------------|------|-----|
| THR-P | M143 | THR-01 | [mockup-143-board-issue-post-feed-slot-state-sheet-spec.md](../../../UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.md) | [mockup-143-…-spec.png](../../../UX/mockups/threads-feed/mockup-143-board-issue-post-feed-slot-state-sheet-spec.png) |
| THR-T | M144 | THR-02 | [mockup-144-comment-tree-composer-attachments-state-sheet-spec.md](../../../UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.md) | [mockup-144-…-spec.png](../../../UX/mockups/threads-feed/mockup-144-comment-tree-composer-attachments-state-sheet-spec.png) |
| THR-R | M145 | THR-03 | [mockup-145-reactions-v1-strip-picker-state-sheet-spec.md](../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md) | [mockup-145-…-spec.png](../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.png) |
| THR-E | M146 | THR-04 | [mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md](../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.md) | [mockup-146-…-spec.png](../../../UX/mockups/threads-feed/mockup-146-escalation-collaboration-invitation-stub-state-sheet-spec.png) |
| THR-V | M147 | THR-05 | [mockup-147-verify-before-write-gate-state-sheet-spec.md](../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.md) | [mockup-147-…-spec.png](../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.png) |
| THR-I | M148 | THR-01 | [mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md](../../../UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.md) | [mockup-148-…-spec.png](../../../UX/mockups/threads-feed/mockup-148-issue-page-shared-thread-mount-state-sheet-spec.png) |

PNG артборды **на диске** (basename = spec без `.md` → `.png`). Используются далее для extract icons / assets (ADMIN-THR-03+).

## Deliverable

1. **`docs/UX/mockups/threads-feed/`** + specs M143–M148 + PNG + [README](../../../UX/mockups/threads-feed/README.md)
2. Таблица Artboard → Mockup → Spec → PNG выше (SSOT intake)
3. Link from PRODUCT-BRIEF Mockup table
4. ui_first stories §Артборд + FR enriched from specs (this wave)
5. Explicit note: do not invent gateway/threads HTTP in visual specs

## Acceptance

- [x] All six surfaces have `*-spec.md` on disk (M143–M148)
- [x] Matching PNG artboards on disk
- [x] ui_first stories cite real paths
- [x] INDEX: ADMIN-THR-02 → Done

## TODO (layer execution)

- [x] Confirm UX chat output on disk
- [x] Curate specs; no invent numbers
- [x] Update INDEX + story §Артборд + FR

## Как выполнять

«Закрой ADMIN-THR-02 — спеки и PNG в `docs/UX/mockups/threads-feed/` уже на диске; обнови PRODUCT-BRIEF / INDEX / stories → Done».
