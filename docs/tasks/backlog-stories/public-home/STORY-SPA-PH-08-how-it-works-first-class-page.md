# STORY-SPA-PH-08 — How it works as first-class public page

## Meta
- **Key:** `STORY-SPA-PH-08-how-it-works-first-class-page`
- **Epic:** [`EPIC-SPA-11-uat-inbound-2026-08`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md)
- **Pipeline:** [`pipeline`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/STORY-SPA-PH-08-how-it-works-first-class-page.md)
- **Package:** [public-home/](README.md) · **`pkg-000058`**
- **Status:** Done — P3 gate PASS 2026-08-09T07:46:54Z (`pkg-000058`) · **P7 WAVE COMPLETE** 2026-08-09T08:43:10Z ([reaudit](../../../analysis/reaudit-STORY-SPA-PH-08-gap-closure-2026-08-09.md) · F1/F2/F3 CLOSED · `run_mode` retired)
- **Severity:** Fix-before-demo
- **Wave:** Demo polish
- **Source inbound:** [`../inbound/DOGEstonia-Story-How-It-Works-First-Class-Public-Page.md`](../inbound/DOGEstonia-Story-How-It-Works-First-Class-Public-Page.md)
- **decision_ref:** UAT inbound 2026-08-06

## Зачем простыми словами

Маршрут `/how-it-works` (PH-05 Done) существовал, но композиция читалась как widget в board-workspace. **As-of-Done:** first-class step progression без filled marketing cards; PH-09 sidebar constant не тронут.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **Current** | Transparent step separators · `how-it-works-shell` · HowItWorksPage.css/jsx |
| **Historical** | bordered `.how-it-works-step` cards |
| Route + 4 steps | PH-05 · preserved |

## Функциональные требования

- **FR-PH-08.1** How it works читается как самостоятельная публичная страница (не utility-card в панели).
- **FR-PH-08.2** Единая публичная шапка + полноценный footer; 4 шага — главная последовательность; CTA продолжает путь.
- **FR-PH-08.3** Убраны/ослаблены конкурирующие вложенные рамки в main composition (CSS/markup).
- **FR-PH-08.4** Desktop + narrow: порядок intro→steps→CTA→footer сохранён; визуальный язык согласован с public board.
- **FR-PH-08.5** Не меняет sidebar display (это PH-09).

## Acceptance Criteria

- [x] Нет ощущения «карточка в панели» на desktop.
- [x] 4 steps + CTA + footer first-class.
- [x] Narrow order preserved.
- [x] PH-09 не требуется для закрытия composition AC (может сосуществовать).

## Nested tasks / pipeline

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-ph-08-t01-composition-audit-m133`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/task-spa-ph-08-t01-composition-audit-m133/README.md) | Done |
| T02 | [`task-spa-ph-08-t02-page-layout-reduce-nesting`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/task-spa-ph-08-t02-page-layout-reduce-nesting/README.md) | Done · ui_anchor |
| T03 | [`task-spa-ph-08-t03-desktop-narrow-regression`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/task-spa-ph-08-t03-desktop-narrow-regression/README.md) | Done |
| T04 | [`task-spa-ph-08-t04-story-gate-ph-08`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-PH-08-how-it-works-first-class-page/task-spa-ph-08-t04-story-gate-ph-08/README.md) | Done · gate PASS |

## Вне scope

- Sidebar on/off (PH-09)
- GPT/submit business logic
- Placeholder icons
- Auth/cabinet features

## Next (process)

1. ~~P1.3 / P2 / P3~~ — Done 2026-08-09T07:46:54Z.
2. ~~P4 audit~~ — Ready 2026-08-09T07:59:19Z ([audit](../../../analysis/audit-STORY-SPA-PH-08-execution-2026-08-09.md)).
3. ~~P5/P6/P7~~ — WAVE COMPLETE 2026-08-09T08:43:10Z · `run_mode` retired. Commits — только по явной команде.
