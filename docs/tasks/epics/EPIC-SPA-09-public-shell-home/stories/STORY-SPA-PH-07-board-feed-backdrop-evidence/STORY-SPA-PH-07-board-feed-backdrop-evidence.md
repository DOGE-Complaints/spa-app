# STORY-SPA-PH-07-board-feed-backdrop-evidence — Board feed backdrop for chrome evidence

## Meta (pipeline)

- **Key:** `STORY-SPA-PH-07-board-feed-backdrop-evidence`
- **Parent Epic:** [`../../EPIC-SPA-09-public-shell-home.md`](../../EPIC-SPA-09-public-shell-home.md)
- **Epic:** EPIC-SPA-09 Public Shell + Home · **Wave 4**
- **Пакет:** `public-home/` · active `pkg-000052-20260806-epic-spa-09-ph-07-board-feed-backdrop.yaml`
- **Status:** Done — P3 gate PASS 2026-08-06T13:45:10Z (`pkg-000052`)
- **Severity:** 🟡 MED
- **source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md)
- **decision_ref:** backlog story + [audit-STORY-SPA-PH-06-execution-2026-08-06.md](../../../../analysis/audit-STORY-SPA-PH-06-execution-2026-08-06.md) §F6 + M132 / M129
- **ui_scope:** `mixed`
- **mockup SSOT:** M132 feed states (results / empty / load-error) · M129 chrome on `/board`
- **Scaffolded:** 2026-08-06T13:24:06Z · **P3 Done:** 2026-08-06T13:45:10Z
- **Depends on:** PH-04 Board feed Done; PH-01 / PH-06 chrome surfaces Done

## Артборд (контекст, не новый MVP artboard)

| Мокап | Роль |
|-------|------|
| **M132** | Канон состояний ленты: Results · Empty · Filtered empty · **Load error** — load-error остаётся валидным **когда** evidence про error · [mockup-132-…](../../../../../UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md) |
| **M129** / chrome | Submit / header на `/board` — фон ленты не должен случайно быть error, если цель кадра = chrome · [mockup-129-…](../../../../../UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md) |

## Зачем простыми словами

Когда мы снимаем `/board` как фон для шапки, Submit CTA или других chrome-историй, в середине экрана часто висит **«Unable To Load The Board»**. Сами кнопки Submit при этом видны, но картинка выглядит как «сломана лента», хотя проверяли не ленту.

Нужно, чтобы **фон ленты на evidence-скринах был управляемым**: либо нормальная/пустая лента по задумке, либо явный load-error только когда именно его и проверяем (как в PH-04 / M132). Случайный сбой gateway не должен «заражать» скрины chrome/CTA.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| PH-06 H1/H2 board shots show load-error while Submit CTAs visible | [audit PH-06 §F6](../../../../analysis/audit-STORY-SPA-PH-06-execution-2026-08-06.md); story-root `screenshots/full-cycle/01-…` / `02-…` |
| Load-error UI exists and is in product scope of PH-04 / M132 | [STORY-SPA-PH-04](../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) FR-PH-04.7; `data-testid="board-load-error"` in BoardPage |
| PH-06 AC / DoD do **not** require healthy feed | audit: «board feed health out of PH-06 DoD»; Submit surfaces still readable |
| Same backdrop noise can affect any board-context chrome evidence (header, footer, Submit) | PH-01/PH-06 capture routes use `/#/board` |

## Текущее состояние (verified P3 2026-08-06T13:45:10Z)

- Shared helper: [`tests/puppeteer/lib/boardFeedBackdrop.mjs`](../../../../../../tests/puppeteer/lib/boardFeedBackdrop.mjs) — `installBoardFeedBackdrop` / `assertNoBoardLoadError`.
- PH-06 chrome runner uses intentional `results` backdrop + assert; dual-writes PH-07 screenshots.
- PH-04 full-cycle imports shared helper (error path preserved).
- Screenshots: [`screenshots/`](./screenshots/) · gate: [`task-spa-ph-07-t06-story-gate-ph-07/acceptance-verification-spa-ph-07.md`](./task-spa-ph-07-t06-story-gate-ph-07/acceptance-verification-spa-ph-07.md).

## Функциональные требования (первый слой — проблема → исход)

- **FR-PH-07.1** Для visual evidence на `/board`, где цель кадра — **chrome / CTA / shell** (не состояние ленты), фон ленты должен быть **намеренным**: results или empty (по сценарию), а не случайный load-error из недоступного gateway.
- **FR-PH-07.2** Состояние **Load error** остаётся допустимым и снимаемым **только** когда story/gate явно проверяет M132 load-error (как PH-04), и это должно быть **явно названо** в индексаторе скринов.
- **FR-PH-07.3** Аудиты chrome/CTA не должны получать Medium/Info «шум» из‑за случайного load-error backdrop, если Submit/header сами по AC закрыты.
- **FR-PH-07.4** Live и mock пути evidence не должны молча подменять «healthy board home» картинкой ошибки ленты без пометки в README.

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
- Сосед по домену: [PH-04](../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) (состояния ленты); chrome: [PH-01](../../../../backlog-stories/public-home/STORY-SPA-PH-01-header-brand-nav.md), [PH-06](../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md).

## Tasks

- [SPA-PH-07-T01](task-spa-ph-07-t01-shared-board-feed-backdrop-helper/README.md) — Shared board-feed backdrop helper
- [SPA-PH-07-T02](task-spa-ph-07-t02-wire-chrome-evidence-runners/README.md) — Wire chrome evidence runners (`ui_anchor`)
- [SPA-PH-07-T03](task-spa-ph-07-t03-preserve-labeled-load-error-path/README.md) — Preserve labeled load-error path
- [SPA-PH-07-T04](task-spa-ph-07-t04-screenshot-indexer-backdrop-labels/README.md) — Screenshot indexer backdrop labels
- [SPA-PH-07-T05](task-spa-ph-07-t05-vitest-or-runner-assert-no-accidental-error/README.md) — Assert no accidental load-error on chrome mode
- [SPA-PH-07-T06](task-spa-ph-07-t06-story-gate-ph-07/README.md) — Story gate PH-07

## UX ready

Path A — brief skip. `@mockup` SSOT on T02 README (M129 + M132 context).
