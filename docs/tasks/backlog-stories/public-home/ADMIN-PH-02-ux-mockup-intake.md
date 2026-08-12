# ADMIN-PH-02 — UX mockup intake (слой 4.1 → specs)

## Meta

- **Key:** `ADMIN-PH-02-ux-mockup-intake`
- **Status:** Done (2026-08-01)
- **Depends on:** [ADMIN-PH-01](ADMIN-PH-01-product-ux-prompts.md) Done + UX-диалог выполнен оператором
- **Blocks:** ADMIN-PH-03, ADMIN-PH-05; freeze для ADMIN-PH-04
- **Skill:** docs / UX SSOT curation

## Цель

Зафиксировать результаты UX-генерации как **SSOT mockup specs** в репозитории (как `user profile/*-spec.md`).

## Целевая директория (факт intake)

```
spa-app/docs/UX/mockups/home/
```

> Черновик ADMIN-PH-02 предлагал `mockups/public-home/`. Оператор положил спеки в **`home/`** с номерами M129–M133 — SSOT = эта папка; дубликат `public-home/` **не создавался**.

Индекс: [`docs/UX/mockups/home/README.md`](../../../UX/mockups/home/README.md)

| Artboard | Mockup | File |
|----------|--------|------|
| PH-H | M129 | [mockup-129-public-header-chrome-state-sheet-spec.md](../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) |
| PH-A | M130 | [mockup-130-public-header-account-control-state-sheet-spec.md](../../../UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md) |
| PH-F | M131 | [mockup-131-public-footer-chrome-state-sheet-spec.md](../../../UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md) |
| PH-B | M132 | [mockup-132-public-board-home-feed-state-sheet-spec.md](../../../UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md) |
| PH-T | M133 | [mockup-133-public-how-it-works-page-state-sheet-spec.md](../../../UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md) |
| PH-T L10N | M133 appendix | [mockup-133-public-how-it-works-localized-copy-appendix.md](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md) |

PNG артборды, на которые ссылаются спеки, в репо **отсутствуют** → **PNG pending** (зафиксировано в `home/README.md`).

## Deliverable

1. ~~Папка `public-home/`~~ → **`docs/UX/mockups/home/`** + specs M129–M133  
2. [`docs/UX/mockups/home/README.md`](../../../UX/mockups/home/README.md) — индекс + PRODUCT-BRIEF  
3. Таблица Mockup ID → file в [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
4. Legacy: M01/M19 **superseded** where conflicting (файлы не удалены)  
5. L10N appendix M133 — copy SSOT en/et/ru для `/how-it-works`

## Acceptance

- [x] Все 5 surfaces имеют `*-spec.md` (M129–M133)
- [x] States из ADMIN-01 покрыты в спеках (или явно в state sheets)
- [x] Nav labels и routes (`/board`, `/how-it-works`, external GPT) согласованы с brief
- [x] INDEX: ADMIN-PH-02 → Done
- [x] How-it-works L10N appendix проиндексирован

## Как выполнять

После UX-сессии: «Выполни ADMIN-PH-02 — зафиксируй спеки из `docs/UX/mockups/home/` как SSOT пакета public-home».
