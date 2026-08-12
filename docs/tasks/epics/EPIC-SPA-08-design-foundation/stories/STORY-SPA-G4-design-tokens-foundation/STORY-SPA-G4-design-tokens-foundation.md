# STORY-SPA-G4 — Design tokens foundation (`tokens.css`)

## Meta (pipeline)

- **Key:** `STORY-SPA-G4-design-tokens-foundation`
- **Parent Epic:** [`../../EPIC-SPA-08-design-foundation.md`](../../EPIC-SPA-08-design-foundation.md)
- **Epic:** EPIC-SPA-08 Design Foundation · Wave 1 (tokens)
- **Пакет:** `design-foundation/` (cross-cutting L0 Foundations)
- **Status:** ✅ Done
- **Severity:** 🟠 Gap G4 (Medium)
- **Wave:** `pkg-000038`
- **Scaffolded:** 2026-07-28T16:01:20Z
- **source:** [`spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md`](../../../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md)
- **decision_ref:** [`../../../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md`](../../../../../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md); [design-system.md §2](../../../../../../UX/design-system.md); [spa-app-doc-code-gap-report.md §G4](../../../../../analysis/spa-app-doc-code-gap-report.md); D-G4-1…D-G4-5 (backlog §Решения)
- **ui_scope:** `mixed`
- **Gate:** [acceptance-verification-spa-g4.md](./task-spa-g4-t07-story-gate-g4/acceptance-verification-spa-g4.md) **PASS** 2026-07-28T16:20:38Z

## SSOT дизайна (вместо артборда)

Токен-контракт канонизирован в [design-system.md](../../../../../../UX/design-system.md) §2 — это single source of truth для имён и значений:

| Группа | Раздел | Токены |
|--------|--------|--------|
| **Color** | [§2.1](../../../../../../UX/design-system.md) | `--color-bg-primary` (Black-900), `--color-bg-secondary` (Black-800), `--color-text-primary` (White-900), `--color-text-secondary` (White-700), `--color-accent-primary` (Yellow-500), `--color-accent-active` (Yellow-600), `--color-border-default` (Gray-700), `--color-border-muted` (Gray-600) |
| **Typography** | [§2.2](../../../../../../UX/design-system.md) | `--font-family-base` (Inter), `--font-family-mono` (JetBrains Mono), `--font-weight-{regular 400, medium 500, semibold 600}`, `--font-size-{small 12, base 14, medium 16, large 18}` |
| **Spacing** | [§2.3](../../../../../../UX/design-system.md) | `--space-{xs 4, sm 8, md 12, lg 16, xl 24}` |

> ⚠️ **Значения в design-system — семантические** (`Black-900`, `Yellow-500`), не hex. Конкретный hex каждого токена **не задан** — его нужно вывести из фактического кода (D-G4-1). Это ключевое решение стори, а не механическая замена.

## Зачем простыми словами

Документация (design-system §2) описывает единый набор CSS-переменных (`--color-*`, `--space-*`, `--font-*`), но в коде их **нет** — цвета/отступы захардкожены hex-литералами в каждом файле стилей. Из-за этого одни и те же «жёлтый акцент» и «серый бордер» разъехались на 4–5 почти-одинаковых значений. Нужен `src/styles/tokens.css` как единый источник и миграция литералов на `var(--…)`.

## Scope — Функциональные требования (FR)

- **FR-G4.1** `src/styles/tokens.css` с единственным `:root`, содержащим все токены §2.1–2.3 (8 color + 9 typography + 5 spacing), значения — по решению D-G4-1.
- **FR-G4.2** Подключение в [main.jsx](../../../../../../../src/main.jsx) **первым** импортом (до `index.css`), чтобы каскад видел переменные.
- **FR-G4.3** Замена hex-литералов на `var(--color-*)` в компонентных CSS (поверхность по D-G4-2), с сохранением drift-схлопывания (5 жёлтых → 1–2 токена).
- **FR-G4.4** Опц. `--space-*` вместо px в padding/margin/gap, где значение ∈ {4,8,12,16,24} (D-G4-3) — **deferred** вне этой волны.
- **FR-G4.5** `--font-family-base`/`--font-size-*`/`--font-weight-*` определены как переменные; применены к `body`/базовым классам. `@font-face` и файлы — **вне G4** (G7).
- **FR-G4.6** Визуальный паритет: layout board / issue-details / cabinet без регрессий (тёмная тема идентична).
- **FR-G4.7** Статус-токены (`--color-danger`/`--color-success`) — по D-G4-5.

## Scope — Субтаски (backlog T01–T08 → pipeline)

| Backlog | Pipeline task | Суть |
|---------|---------------|------|
| **T01** | [SPA-G4-T01](./task-spa-g4-t01-create-tokens-css-main-import/README.md) | `tokens.css` + first import in `main.jsx` |
| **T02+FR.7** | [SPA-G4-T02](./task-spa-g4-t02-token-hex-reconciliation-status-colors/README.md) | Token→hex table + danger/success |
| **T03** | [SPA-G4-T03](./task-spa-g4-t03-migrate-board-core-css/README.md) | Board-core CSS → `var(--…)` |
| **T04** | [SPA-G4-T04](./task-spa-g4-t04-migrate-identity-cabinet-css/README.md) | Identity/cabinet CSS → `var(--…)` |
| **T06** | [SPA-G4-T05](./task-spa-g4-t05-typography-css-vars-g7-seam/README.md) | Typography vars + G4↔G7 seam doc |
| **T07** | [SPA-G4-T06](./task-spa-g4-t06-visual-smoke-board-issue-cabinet/README.md) | Visual smoke board/issue/cabinet |
| **T08** | [SPA-G4-T07](./task-spa-g4-t07-story-gate-g4/README.md) | Story gate + doc touchpoints |

## Решения (D-G4-1…5) — SSOT backlog

| ID | Рекомендация (backlog) |
|----|------------------------|
| **D-G4-1** | (a) доминирующий литерал + ревью; таблица в T02 |
| **D-G4-2** | (b) весь код вкл. identity/cabinet |
| **D-G4-3** | (b) spacing отдельно/позже — **не в pkg-000038** |
| **D-G4-4** | G4 = переменные font; G7 = `@font-face`+файлы |
| **D-G4-5** | (a) `--color-danger` / `--color-success` |

## Тексты и переводы (en/et/ru)
**N/A** — G4 не вводит UI-строк (инфраструктура стилей). Существующие тексты не меняются.

## Иконки
**N/A** — новых иконок нет; ассеты не затрагиваются.

## Routes / API
**N/A** — нет роутов/эндпоинтов; чисто клиентские стили.

## Зависимости
- **Разблокирует** [G7](../../../../../../backlog-stories/design-foundation/STORY-SPA-G7-self-hosted-fonts.md) (`--font-family-*` из T05) и упрощает [G8](../../../../../../backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md).
- **SSOT** значений — [design-system.md §2](../../../../../../UX/design-system.md).

## Вне scope
- Полный редизайн палитры (только канонизация существующих цветов).
- Light/dark-темизация и `prefers-color-scheme` (темизации в коде нет — не вводить).
- `@font-face` и файлы шрифтов → [G7](../../../../../../backlog-stories/design-foundation/STORY-SPA-G7-self-hosted-fonts.md).
- `App.css` — мёртвый (не импортируется), из миграции исключён.
- **Spacing** px → `--space-*` (D-G4-3 deferred; backlog T05) — вне этой волны.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [design-system.md](../../../../../../UX/design-system.md) §2.1 / §2.2 | Пометки «пока хардкод / planned» + G4-ссылки | Убрать; подтвердить путь `src/styles/tokens.css` + маппинг hex |
| [reusable-ui-components-architecture.md](../../../../../../UX/reusable-ui-components-architecture.md) §L0 | «не выполнено — gap G4» | Убрать; L0 Foundations = реализовано |
| [ui-mockups-and-states-requirements.md](../../../../../../UX/ui-mockups-and-states-requirements.md) §24.7 | ⚠️ tokens.css не найден | Убрать пометку после Done |
| [gap-report](../../../../../analysis/spa-app-doc-code-gap-report.md) §G4 | G4 open (Medium) | G4 ✅ Done |
| [INDEX.md](../../../../../../backlog-stories/design-foundation/INDEX.md) | G4 Todo | Done |

## Acceptance Criteria
- [x] `src/styles/tokens.css` существует, содержит `:root` со всеми токенами §2.1–2.3 и импортирован первым в `main.jsx`.
- [x] Token→hex маппинг зафиксирован (D-G4-1); drift схлопнут (≤2 значения на цвет-токен вместо 4–5).
- [x] В компонентных CSS основные цвета = `var(--color-*)`, не голые hex (поверхность по D-G4-2); остаточные литералы — только осознанные (статус/тени по D-G4-5).
- [x] `npm test` (vitest) зелёный; визуальный smoke board / issue-details / cabinet без layout-регрессий (тёмная тема идентична).
- [x] Статус-цвета решены по D-G4-5 (токенизированы или явно оставлены).
- [x] Документация touchpoints обновлена; INDEX G4 → Done; gap-report §G4 → ✅.

## Швы
- Новый: [src/styles/tokens.css](../../../../../../../src/styles/tokens.css); подключение — [main.jsx](../../../../../../../src/main.jsx).
- Миграция: [index.css](../../../../../../../src/index.css) + ~22 компонентных `*.css` (см. backlog §Анализ B / T03–T04).
