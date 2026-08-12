# STORY-SPA-PH-08-how-it-works-first-class-page — How it works as first-class public page

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-08-how-it-works-first-class-page`
- **Parent Epic:** [`../../EPIC-SPA-11-uat-inbound-2026-08.md`](../../EPIC-SPA-11-uat-inbound-2026-08.md)
- **Package:** `pkg-000058`
- **Status:** Done — P3 gate PASS 2026-08-09T07:46:54Z (`pkg-000058`) · **P7 WAVE COMPLETE** 2026-08-09T08:43:10Z ([reaudit](../../../../analysis/reaudit-STORY-SPA-PH-08-gap-closure-2026-08-09.md) · F1/F2/F3 CLOSED · `run_mode` retired)
- **Severity:** Fix-before-demo
- **Wave:** Demo polish
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-08-how-it-works-first-class-page.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-08-how-it-works-first-class-page.md)
- **decision_ref:** UAT inbound 2026-08-06 + inbound How-It-Works-First-Class
- **ui_scope:** `page` (T02 ui_anchor · M133)
- **P1.3:** 2026-08-09T07:36:09Z · **P3 Done:** 2026-08-09T07:46:54Z

## Зачем простыми словами

Маршрут `/how-it-works` (PH-05 Done) существует, но композиция читалась как вложенный widget в board-workspace. **As-of-Done:** steps без filled marketing cards; route shell classes; PH-09 sidebar constant untouched.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **Current** composition | Transparent step separators · `how-it-works-shell` · [`HowItWorksPage.css`](../../../../../../src/pages/HowItWorksPage.css) |
| **Historical** pre-PH-08 | bordered `.how-it-works-step` cards + secondary fill |
| Route + 4 steps | PH-05 Done · preserved |
| Sidebar | PH-09 `PUBLIC_SHELL_SHOW_SIDEBAR` unchanged |

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

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-ph-08-t01-…](./task-spa-ph-08-t01-composition-audit-m133/README.md) | **Done** · Audit |
| **T02** | [task-spa-ph-08-t02-…](./task-spa-ph-08-t02-page-layout-reduce-nesting/README.md) | **Done** · ui_anchor |
| **T03** | [task-spa-ph-08-t03-…](./task-spa-ph-08-t03-desktop-narrow-regression/README.md) | **Done** · Regression |
| **T04** | [task-spa-ph-08-t04-…](./task-spa-ph-08-t04-story-gate-ph-08/README.md) | **Done** · gate PASS |
| **T05** | [task-spa-ph-08-t05-…](./task-spa-ph-08-t05-screenshots-pack-hygiene/README.md) | **Done** · F1 **P7 CLOSED** |
| **T06** | [task-spa-ph-08-t06-…](./task-spa-ph-08-t06-as-of-done-t01-code-facts/README.md) | **Done** · F2 **P7 CLOSED** |
| **T07** | [task-spa-ph-08-t07-…](./task-spa-ph-08-t07-vitest-describe-ph08-label/README.md) | **Done** · F3 **P7 CLOSED** |

## Вне scope

- Sidebar on/off (PH-09)
- GPT/submit business logic
- Placeholder icons
- Auth/cabinet features

## Notes

- Gate: [`task-spa-ph-08-t04-story-gate-ph-08/acceptance-verification-spa-ph-08.md`](./task-spa-ph-08-t04-story-gate-ph-08/acceptance-verification-spa-ph-08.md)
- Screenshots: [`screenshots/`](./screenshots/)
- ≠ PH-09
- P6 gap closure: T05–T07 Done · **P7 WAVE COMPLETE** · `run_mode=spa_ph_08_audit_2026_08_09` **retired**.
