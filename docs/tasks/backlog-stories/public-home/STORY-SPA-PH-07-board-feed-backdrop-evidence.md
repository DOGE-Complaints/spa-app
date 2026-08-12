# STORY-SPA-PH-07 — Board feed backdrop for chrome evidence

## Meta
- **Key:** `STORY-SPA-PH-07-board-feed-backdrop-evidence`
- **Epic:** [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) · Wave 4
- **Pipeline:** [pipeline story](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-07-board-feed-backdrop-evidence/STORY-SPA-PH-07-board-feed-backdrop-evidence.md)
- **Package:** [public-home/](README.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · active `pkg-000052`
- **Status:** Done — P3 gate PASS 2026-08-06T13:45:10Z (`pkg-000052`)
- **Severity:** 🟡 MED
- **Source:** [audit-STORY-SPA-PH-06-execution-2026-08-06.md](../../../analysis/audit-STORY-SPA-PH-06-execution-2026-08-06.md) §F6
- **Depends on:** [PH-04 Board feed](STORY-SPA-PH-04-board-feed-home.md) Done; [PH-01](STORY-SPA-PH-01-header-brand-nav.md) / [PH-06](STORY-SPA-PH-06-submit-story-gpt-cta.md) chrome surfaces Done
- **Out of scope for this file:** tech decomposition details live in pipeline tasks; AC/FR below unchanged

## Зачем простыми словами

Когда мы снимаем `/board` как фон для шапки, Submit CTA или других chrome-историй, в середине экрана часто висит **«Unable To Load The Board»**. Сами кнопки Submit при этом видны, но картинка выглядит как «сломана лента», хотя проверяли не ленту.

Нужно, чтобы **фон ленты на evidence-скринах был управляемым**: либо нормальная/пустая лента по задумке, либо явный load-error только когда именно его и проверяем (как в PH-04 / M132). Случайный сбой gateway не должен «заражать» скрины chrome/CTA.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| PH-06 H1/H2 board shots show load-error while Submit CTAs visible | [audit PH-06 §F6](../../../analysis/audit-STORY-SPA-PH-06-execution-2026-08-06.md); story-root `screenshots/full-cycle/01-…` / `02-…` |
| Load-error UI exists and is in product scope of PH-04 / M132 | [STORY-SPA-PH-04](STORY-SPA-PH-04-board-feed-home.md) FR-PH-04.7; `data-testid="board-load-error"` in BoardPage |
| PH-06 AC / DoD do **not** require healthy feed | audit: «board feed health out of PH-06 DoD»; Submit surfaces still readable |
| Same backdrop noise can affect any board-context chrome evidence (header, footer, Submit) | PH-01/PH-06 capture routes use `/#/board` |

## Артборд (контекст, не новый MVP artboard)

| Мокап | Роль |
|-------|------|
| **M132** | Канон состояний ленты: Results · Empty · Filtered empty · **Load error** — load-error остаётся валидным **когда** evidence про error |
| **M129** / chrome | Submit / header на `/board` — фон ленты не должен случайно быть error, если цель кадра = chrome |

## Функциональные требования (первый слой — проблема → исход)

- **FR-PH-07.1** Для visual evidence на `/board`, где цель кадра — **chrome / CTA / shell** (не состояние ленты), фон ленты должен быть **намеренным**: results или empty (по сценарию), а не случайный load-error из недоступного gateway.
- **FR-PH-07.2** Состояние **Load error** остаётся допустимым и снимаемым **только** когда story/gate явно проверяет M132 load-error (как PH-04), и это должно быть **явно названо** в индексаторе скринов.
- **FR-PH-07.3** Аудиты chrome/CTA не должны получать Medium/Info «шум» из‑за случайного load-error backdrop, если Submit/header сами по AC закрыты.
- **FR-PH-07.4** Live и mock пути evidence не должны молча подменять «healthy board home» картинкой ошибки ленты без пометки в README.

> Детали *как* добиться (mock feed, env, scroll, отдельный runner) — **вне** этого файла; решать на PA.3 / P1.

## Acceptance Criteria (problem-level)

- [x] Есть зафиксированный способ получить board chrome evidence **без** случайного load-error backdrop, когда цель — не error-state.
- [x] Load-error evidence остаётся возможным и помеченным, когда цель — M132 error.
- [x] Chrome/CTA story gates больше не зависят от «gateway сегодня жив» как скрытого условия фона.

## Вне scope

- Переработка UX load-error / empty (уже PH-04).
- Новый list API / gateway contract (SEARCH / G1).
- Закрытие PH-06 F1–F5 (commit, backlog stale, H3 CTA fold, placeholder icon, ADMIN-06 note).
- Реализация в этом intake.

## Связи

- Вынесено из PH-06 post-audit **F6** (`follow_up=new_story→PA.3`).
- Сосед по домену: [PH-04](STORY-SPA-PH-04-board-feed-home.md) (состояния ленты); chrome: [PH-01](STORY-SPA-PH-01-header-brand-nav.md), [PH-06](STORY-SPA-PH-06-submit-story-gpt-cta.md).

## Швы (только указатели, без плана работ)

- `/board` feed surface · story-root `screenshots/` · puppeteer full-cycle runners · M132 states

## Next (process)

1. **P4** hard-audit (operator).  
2. Commits — explicit ask only.  
3. Do not mix with EPIC-SPA-10 / EPIC-SPA-11 without operator command.
