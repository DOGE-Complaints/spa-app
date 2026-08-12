# STORY-SPA-G4 — Design tokens foundation (`tokens.css`)

## Meta

- **Key:** `STORY-SPA-G4-design-tokens-foundation`
- **Пакет:** `design-foundation/` (cross-cutting L0 Foundations)
- **Status:** Done (pkg-000038, 2026-07-28)
- **Severity:** 🟠 Gap G4 (Medium)
- **Источник:** [spa-app-doc-code-gap-report.md](../../../analysis/spa-app-doc-code-gap-report.md) §G4
- **Зависит от:** — (foundation). **Разблокирует:** [G7 self-hosted fonts](STORY-SPA-G7-self-hosted-fonts.md) (использует `--font-family-*`), [G8 app-shell refactor](STORY-SPA-G8-app-shell-refactor.md).
- **G9 note (2026-08-02):** runtime hex в [`tokens.css`](../../../../src/styles/tokens.css) superseded by brand palette cutover — [STORY-SPA-G9](STORY-SPA-G9-brand-color-palette-tokens.md) (`pkg-000042`). G4 consumer API `--color-*` и infra остаются; brand hex SSOT = [DOGEstonia_Color_Palette_v1.0_RU.md](DOGEstonia_Color_Palette_v1.0_RU.md).

## SSOT дизайна (вместо артборда)

Токен-контракт канонизирован в [design-system.md](../../../UX/design-system.md) §2 — это single source of truth для имён и значений:

| Группа | Раздел | Токены |
|--------|--------|--------|
| **Color** | [§2.1](../../../UX/design-system.md) | `--color-bg-primary` (Black-900), `--color-bg-secondary` (Black-800), `--color-text-primary` (White-900), `--color-text-secondary` (White-700), `--color-accent-primary` (Yellow-500), `--color-accent-active` (Yellow-600), `--color-border-default` (Gray-700), `--color-border-muted` (Gray-600) |
| **Typography** | [§2.2](../../../UX/design-system.md) | `--font-family-base` (Inter), `--font-family-mono` (JetBrains Mono), `--font-weight-{regular 400, medium 500, semibold 600}`, `--font-size-{small 12, base 14, medium 16, large 18}` |
| **Spacing** | [§2.3](../../../UX/design-system.md) | `--space-{xs 4, sm 8, md 12, lg 16, xl 24}` |

> ⚠️ **Значения в design-system — семантические** (`Black-900`, `Yellow-500`), не hex. Конкретный hex каждого токена **не задан** — его нужно вывести из фактического кода (см. §Анализ D-G4-1). Это ключевое решение стори, а не механическая замена.

## Зачем простыми словами

Документация (design-system §2) описывает единый набор CSS-переменных (`--color-*`, `--space-*`, `--font-*`), но в коде их **нет** — цвета/отступы захардкожены hex-литералами в каждом файле стилей. Из-за этого одни и те же «жёлтый акцент» и «серый бордер» разъехались на 4–5 почти-одинаковых значений. Нужен `src/styles/tokens.css` как единый источник и миграция литералов на `var(--…)`.

## 🔬 Слой анализа — verified current-state (2026-07-28)

> Все цифры — из `grep`/`read` по фактическому коду; ни одно утверждение не предположение.

**A. Инфраструктуры токенов нет.**
- `src/styles/` — **отсутствует**; `tokens.css` не создан.
- `:root`-блоков и `--*` custom properties в `src/**/*.css` — **0** (проверено grep по 24 файлам).
- [main.jsx](../../../../src/main.jsx) импортирует только `./index.css` — единственная точка подключения глобальных стилей (сюда встанет `tokens.css` **до** `index.css`).
- **Темизации нет:** ни `prefers-color-scheme`, ни `data-theme`. Приложение — фиксированная тёмная тема. → G4 = дедупликация/SSOT, **не** light/dark-темизация.

**B. Объём хардкода — 196 hex-литералов в 23 CSS-файлах.** Топ-офендеры:

| Файл | hex | В исходном scope стори? |
|------|-----|-------------------------|
| [index.css](../../../../src/index.css) | 45 | ✅ |
| [pages/LoginPage.css](../../../../src/pages/LoginPage.css) | 34 | ❌ (не был указан) |
| [components/Filters/Filters.css](../../../../src/components/Filters/Filters.css) | 33 | ✅ |
| [components/IssueCard/IssueCard.css](../../../../src/components/IssueCard/IssueCard.css) | 11 | ✅ |
| [components/StatusBadge.css](../../../../src/components/StatusBadge.css) | 10 | ✅ |
| PhoneVerificationFlow / GptBridge | 9 / 9 | ❌ |
| StoryActivity / ContributionLayer | 6 / 6 | ❌ |
| WalletStatus / AppErrorState | 5 / 5 | ❌ |
| CivicStatus / StoryHandoff / LocaleSelector | 4 каждый | ❌ |
| остальные (Session/Phone-err/Account/Cabinet/Country/EmptyState) | 1–3 | частично |

**C. Реальный drift (то, что токены схлопнут):**
- Жёлтый акцент: `#f5c518` · `#f5c542` · `#ffd600` · `#c7a646` · `#d9c481` — 5 значений на 2 токена (`accent-primary`/`accent-active`).
- Серый бордер/текст: `#9a9da6` · `#8f939f` · `#8f939c` · `#a0a3ac` · `#9ca0ab` — на 2 токена (`border-default`/`border-muted` + text-secondary).
- Тёмный фон: `#141417` · `#1b1c1f` · `#1f2024` · `#17181c` · `#12161e` — на 2 (`bg-primary`/`bg-secondary`).
- Светлый текст: `#f2f2f2` (18×) · `#f5f7fa` (15×) · `#ececf0` (14×).

**D. Контракт design-system неполон для кода.** 8 цвет-токенов §2.1 **не покрывают статус-цвета**, которые реально есть в CSS: error-red `#ff7b7b`/`#ffb4b4`, success-green `#9be28d`. → Либо расширить токен-набор (`--color-danger`/`--color-success`), либо оставить статус-литералы вне миграции (см. D-G4-5).

**E. Scope исходной стори устарел (написана 2026-06-12):**
- `App.css` в scope, но он **не импортируется нигде** (grep пуст) и содержит 0 hex → мёртвый файл, из scope убрать.
- `EmptyState.css` — всего 1 hex (почти нечего мигрировать).
- «Вне scope: токены identity-модуля (ещё не реализован)» — **устарело**: identity/cabinet CSS (CivicStatus, PhoneVerification×2, AppErrorState, StoryActivity, ContributionLayer, WalletStatus, AccountSummary, StoryHandoff, SessionShellState, GptBridge, LoginPage, VerifyPage) уже существуют с ~90+ hex суммарно.
- Все относительные ссылки в исходной стори **битые** (глубина `../../../src` / `../../UX` — на уровень мельче нужного); в этой версии исправлено на `../../../../src` / `../../../UX`.

## Решения (интервью с владельцем — до реализации)

| ID | Вопрос | Варианты | Рекомендация |
|----|--------|----------|--------------|
| **D-G4-1** | Как канонизировать hex каждого токена (design-system даёт только `Black-900`/`Yellow-500`)? | (a) выбрать доминирующий литерал по частоте; (b) владелец задаёт точные hex | (a) + ревью: `accent-primary`=`#f5c518` (доминанта), `bg-primary`=`#141417`, `text-primary`=`#f2f2f2` — таблица маппинга в T02 |
| **D-G4-2** | Поверхность миграции | (a) только 5 board-файлов исходного scope; (b) **весь код** вкл. identity/cabinet | (b) — identity уже реализован; иначе drift останется |
| **D-G4-3** | Глубина spacing-миграции | (a) вместе с цветом; (b) отдельным шагом/позже | (b) — цвет-first (T03/T04), spacing = T05 опционально |
| **D-G4-4** | Шов G4↔G7 | G4 определяет `--font-*` переменные (значения), G7 добавляет `@font-face`+файлы | подтвердить: G4 = только переменные, без `@font-face` |
| **D-G4-5** | Статус-цвета (error/success) вне 8 токенов | (a) расширить: `--color-danger`/`--color-success`; (b) оставить литералами | (a) — тонкий набор статус-токенов, чтобы убрать `#ff7b7b`/`#9be28d` drift |

## Функциональные требования (FR)

- **FR-G4.1** `src/styles/tokens.css` с единственным `:root`, содержащим все токены §2.1–2.3 (8 color + 9 typography + 5 spacing), значения — по решению D-G4-1.
- **FR-G4.2** Подключение в [main.jsx](../../../../src/main.jsx) **первым** импортом (до `index.css`), чтобы каскад видел переменные.
- **FR-G4.3** Замена hex-литералов на `var(--color-*)` в компонентных CSS (поверхность по D-G4-2), с сохранением drift-схлопывания (5 жёлтых → 1–2 токена).
- **FR-G4.4** Опц. `--space-*` вместо px в padding/margin/gap, где значение ∈ {4,8,12,16,24} (D-G4-3).
- **FR-G4.5** `--font-family-base`/`--font-size-*`/`--font-weight-*` определены как переменные; применены к `body`/базовым классам. `@font-face` и файлы — **вне G4** (G7).
- **FR-G4.6** Визуальный паритет: layout board / issue-details / cabinet без регрессий (тёмная тема идентична).
- **FR-G4.7** Статус-токены (`--color-danger`/`--color-success`) — по D-G4-5.

## Субтаски

| Таск | Суть | Швы |
|------|------|-----|
| **T01** | Создать [src/styles/tokens.css](../../../../src/styles/tokens.css) с `:root` + все 3 группы токенов (плейсхолдер-значения); импорт первым в [main.jsx](../../../../src/main.jsx) | `main.jsx`, новый `tokens.css` |
| **T02** | **Token→hex reconciliation** (D-G4-1/D-G4-5): таблица «токен → выбранный hex» из 196 литералов, схлопывание drift; проставить финальные значения в `tokens.css` | `tokens.css`, анализ-таблица |
| **T03** | Миграция board-ядра: `index.css` (45), `Filters.css` (33), `IssueCard.css` (11), `StatusBadge.css` (10), `EmptyState.css` (1) → `var(--…)` | эти 5 файлов |
| **T04** | Миграция identity/cabinet (поверхность из §Анализ E, D-G4-2): `LoginPage.css` (34), `PhoneVerificationFlow/Error`, `GptBridge`, `StoryActivity`, `ContributionLayer`, `WalletStatus`, `AppErrorState`, `CivicStatus`, `AccountSummary`, `StoryHandoff`, `SessionShellState`, `LocaleSelector`, `CountryWaitlist`, `UserCabinetPage`, `VerifyPage` | ~18 файлов |
| **T05** | *(опц., D-G4-3)* Spacing: px → `--space-*` где значение каноническое | те же CSS |
| **T06** | Typography-переменные (значения, без `@font-face`): `--font-family-base` на `body`, `--font-size/weight-*` по месту; задокументировать шов G4↔G7 (D-G4-4) | `tokens.css`, `index.css` |
| **T07** | Визуальный gate: smoke board + issue-details + cabinet (mock+live), before/after сравнение, `npm test` (vitest) зелёный, ноль layout-регрессий | `screenshots/`, тесты |
| **T08** | Doc touchpoints (см. таблицу) + INDEX Todo→Done + gap-report §G4 ✅ | docs |

## Тексты и переводы (en/et/ru)
**N/A** — G4 не вводит UI-строк (инфраструктура стилей). Существующие тексты не меняются.

## Иконки
**N/A** — новых иконок нет; ассеты не затрагиваются.

## Routes / API
**N/A** — нет роутов/эндпоинтов; чисто клиентские стили.

## Зависимости
- **Разблокирует** [G7](STORY-SPA-G7-self-hosted-fonts.md) (`--font-family-*` из T06) и упрощает [G8](STORY-SPA-G8-app-shell-refactor.md).
- **SSOT** значений — [design-system.md §2](../../../UX/design-system.md).

## Вне scope
- **Вне scope:** Полный редизайн палитры (только канонизация существующих цветов) — **superseded:** утверждённый brand cutover = [G9](STORY-SPA-G9-brand-color-palette-tokens.md) **Done** (`pkg-000042`); G4 infra (`--color-*`) остаётся. Leftovers → [G11](STORY-SPA-G11-brand-token-adoption-glue.md).
- Light/dark-темизация и `prefers-color-scheme` (темизации в коде нет — не вводить).
- `@font-face` и файлы шрифтов → [G7](STORY-SPA-G7-self-hosted-fonts.md).
- `App.css` — мёртвый (не импортируется), из миграции исключён.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [design-system.md](../../../UX/design-system.md) §2.1 (l.54) / §2.2 (l.70) / l.235 | Пометки «пока хардкод / planned» + G4-ссылки | Убрать; подтвердить путь `src/styles/tokens.css` + маппинг hex |
| [reusable-ui-components-architecture.md](../../../UX/reusable-ui-components-architecture.md) §L0 (l.24–25) | «не выполнено — gap G4 (L0 tokens)» | Убрать; L0 Foundations = реализовано |
| [ui-mockups-and-states-requirements.md](../../../UX/ui-mockups-and-states-requirements.md) §24.7 | ⚠️ ссылка на `src/styles/tokens.css` **не найдена** grep — проверить, есть ли реально | Если есть — убрать пометку; иначе N/A |
| [gap-report](../../../analysis/spa-app-doc-code-gap-report.md) §G4 (l.19/99–114/269) | G4 open (Medium) | G4 ✅ Done |
| [INDEX.md](INDEX.md) | G4 Todo | Done |

## Acceptance Criteria

- [x] `src/styles/tokens.css` существует, содержит `:root` со всеми токенами §2.1–2.3 и импортирован первым в `main.jsx`.
- [x] Token→hex маппинг зафиксирован (D-G4-1); drift схлопнут (≤2 значения на цвет-токен вместо 4–5).
- [x] В компонентных CSS основные цвета = `var(--color-*)`, не голые hex (поверхность по D-G4-2); остаточные литералы — только осознанные (статус/тени по D-G4-5).
- [x] `npm test` (vitest) зелёный; визуальный smoke board / issue-details / cabinet без layout-регрессий (тёмная тема идентична).
- [x] Статус-цвета решены по D-G4-5 (токенизированы или явно оставлены).
- [x] Документация touchpoints обновлена; INDEX G4 → Done; gap-report §G4 → ✅.

## Швы
- Новый: [src/styles/tokens.css](../../../../src/styles/tokens.css); подключение — [main.jsx](../../../../src/main.jsx).
- Миграция: [index.css](../../../../src/index.css) + ~22 компонентных `*.css` (см. §Анализ B / T03–T04).
