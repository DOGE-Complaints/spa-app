# STORY-SPA-HL-03-handoff-return-path-tests — Handoff return-path automated tests

## Meta (pipeline)

- **Key:** `STORY-SPA-HL-03-handoff-return-path-tests`
- **Parent Epic:** [`../../EPIC-SPA-10-hardening-cto-audit.md`](../../EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** `pkg-000061`
- **Status:** Done — P3 gate PASS 2026-08-09T13:08:31Z (`pkg-000061`) · **P4 Ready** 2026-08-09T13:15:03Z
- **Severity:** High (fix-before-launch)
- **Wave:** Fix-before-launch
- **Finding:** F2 / S5 Partial ([audit](../../../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md))
- **P4 audit:** [audit-STORY-SPA-HL-03-execution-2026-08-09.md](../../../../../analysis/audit-STORY-SPA-HL-03-execution-2026-08-09.md)
- **source:** [`../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-03-handoff-return-path-tests.md`](../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-03-handoff-return-path-tests.md)
- **decision_ref:** backlog STORY-SPA-HL-03 + audit §F2 / S5 · HEAD `eaec8bb` (audit-time)
- **ui_scope:** `none` (tests only; no product UX)
- **P1.3:** 2026-08-09T12:56:53Z · **P3 Done:** 2026-08-09T13:08:31Z · **P4:** 2026-08-09T13:15:03Z

## Зачем простыми словами

После логина SPA возвращает пользователя по query `next` / `redirect` (критично для GPT draft handoff: вернуться на `/story/submit?draft_id=…`). Логика отсекает опасные варианты (`//…`, не-`/`), но **автотестов на функцию нет** — регрессия open-redirect может пройти незаметно.

Нужен фиксированный набор проверок «разрешено / запрещено → fallback `/board`».

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **As-of-Done** | Dedicated vitest 9/9 · gate PASS 2026-08-09T13:08:31Z |
| **Historical** (audit) | `rg resolveHandoffReturnPath` in `__tests__` empty · S5 Partial |
| Helper | [`storyHandoffFlowState.js`](../../../../../../src/auth/storyHandoffFlowState.js) L75–84 |
| Tests | [`storyHandoffFlowState.test.js`](../../../../../../src/auth/__tests__/storyHandoffFlowState.test.js) |

## Функциональные требования (первый слой)

- **FR-HL-03.1** Существуют автоматизированные тесты на return-path helper (или эквивалентный контракт Login), покрывающие как минимум: валидный internal path; path с query (`draft_id`); пустой/absent → `/board`; `//…` → `/board`; absolute URL / non-`/` → `/board`.
- **FR-HL-03.2** Тесты входят в обычный CI/`verify:security` (или `vitest run`) без ручного шага.
- **FR-HL-03.3** Criterion S5 аудита может быть переоценен в Pass при re-audit с evidence тестов.

## Acceptance Criteria (problem-level)

- [x] Dedicated tests существуют и зелёные.
- [x] Опасные candidates стабильно режутся в тестах.
- [x] Handoff happy `next=/story/submit?draft_id=…` остаётся разрешённым.

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-hl-03-t01-…](./task-spa-hl-03-t01-unit-resolveHandoffReturnPath/README.md) | **Done** · Unit tests resolveHandoffReturnPath |
| **T02** | [task-spa-hl-03-t02-…](./task-spa-hl-03-t02-story-gate-hl-03/README.md) | **Done** · Story gate PASS |

## Вне scope

- Изменение product redirect UX.
- Puppeteer full handoff (отдельные runners уже есть).
- OAuth GPT bridge return URL (другой контур — HL-08).
- Смена правил allowlist путей; полный e2e pentest open-redirect.

## Швы (указатели)

- `storyHandoffFlowState.js` · `LoginPage.jsx` · vitest · ID-12 handoff

## Notes

- Gate: [`task-spa-hl-03-t02-story-gate-hl-03/acceptance-verification-spa-hl-03.md`](./task-spa-hl-03-t02-story-gate-hl-03/acceptance-verification-spa-hl-03.md) PASS 2026-08-09T13:08:31Z
- Run-summary: [`../../../../run-reports/run-summary-20260809-1308-spa-hl-03-p3.md`](../../../../run-reports/run-summary-20260809-1308-spa-hl-03-p3.md)
