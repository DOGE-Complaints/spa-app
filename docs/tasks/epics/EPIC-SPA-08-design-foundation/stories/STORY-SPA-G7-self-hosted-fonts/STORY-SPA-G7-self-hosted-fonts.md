# STORY-SPA-G7 — Self-hosted шрифты (Inter + JetBrains Mono)

## Meta (pipeline)

- **Key:** `STORY-SPA-G7-self-hosted-fonts`
- **Parent Epic:** [`../../EPIC-SPA-08-design-foundation.md`](../../EPIC-SPA-08-design-foundation.md)
- **Epic:** EPIC-SPA-08 Design Foundation · Wave 2 (fonts)
- **Пакет:** `design-foundation/` (cross-cutting L0 Foundations)
- **Status:** ✅ Done
- **Severity:** 🟡 Gap G7 (Low)
- **Wave:** `pkg-000039`
- **Scaffolded:** 2026-07-28T21:48:40Z
- **source:** [`spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G7-self-hosted-fonts.md`](../../../../../../backlog-stories/design-foundation/STORY-SPA-G7-self-hosted-fonts.md)
- **decision_ref:** [`../../../../../../backlog-stories/design-foundation/STORY-SPA-G7-self-hosted-fonts.md`](../../../../../../backlog-stories/design-foundation/STORY-SPA-G7-self-hosted-fonts.md); [design-system.md §2.2](../../../../../../UX/design-system.md); [spa-app-doc-code-gap-report.md §G7](../../../../../analysis/spa-app-doc-code-gap-report.md); D-G7-1…D-G7-6 (backlog §Решения)
- **ui_scope:** `mixed`
- **Gate:** [acceptance-verification-spa-g7.md](./task-spa-g7-t06-story-gate-g7/acceptance-verification-spa-g7.md) **PASS** 2026-07-28T21:57:46Z
- **Зависит от:** [STORY-SPA-G4](../STORY-SPA-G4-design-tokens-foundation/STORY-SPA-G4-design-tokens-foundation.md) **Done** (`pkg-000038`)

> **📌 Decision record — Arweave deploy отменён (2026-07-29).** Arweave был *одним* из драйверов self-hosting, но **не единственным**: требование «без внешних CDN/шрифтов/аналитики» имеет самостоятельный якорь — [ui-mockups-and-states-requirements.md:225](../../../../../../UX/ui-mockups-and-states-requirements.md) (privacy/self-containment) + ТЗ §10. **Вывод: отмена Arweave НЕ отменяет G7** — self-hosting сохраняется по privacy-требованию.

## SSOT дизайна (вместо артборда)

Типографика канонизирована в [design-system.md §2.2](../../../../../../UX/design-system.md) + требование локальности ассетов ([ui-mockups §24:225](../../../../../../UX/ui-mockups-and-states-requirements.md) «без внешних CDN/шрифтов/аналитики»; ТЗ §10):

| Токен | Значение | Уже в коде? |
|-------|----------|-------------|
| `--font-family-base` | **Inter** | ✅ определён + применён к body; Inter **не self-hosted** → system-fallback |
| `--font-family-mono` | **JetBrains Mono** | ⚠️ определён, **0 использований** (dangling) |
| `--font-weight-{regular,medium,semibold}` | 400 / 500 / 600 | частично |

> G4 оставил `@font-face` за G7 ([tokens.css](../../../../../../../src/styles/tokens.css) «G7 owns @font-face + font files»).

## Зачем простыми словами

Продукт требует самодостаточности без внешних CDN. Нужны Inter (текст) и JetBrains Mono (txid/hash) в `public/fonts/` через `@font-face`, плюс до-вешивание mono-токена на реальные места.

## Scope — Функциональные требования (FR)

- **FR-G7.1** `public/fonts/` содержит self-hosted **woff2**: Inter **400/500/600** + JetBrains Mono **400**.
- **FR-G7.2** `@font-face` в новом `src/styles/fonts.css` с `font-family: 'Inter'`/`'JetBrains Mono'`, корректными `font-weight` и `font-display: swap`; импорт в `main.jsx` **перед** `tokens.css`.
- **FR-G7.3** Inter рендерится self-hosted (не system-fallback) на body и наследуется.
- **FR-G7.4** `--font-family-mono` до-вешан на **все 5** mono-мест: txid/hash IssuePage + прочие рендерятся JetBrains Mono.
- **FR-G7.5** Лицензии OFL (Inter, JetBrains Mono) в `public/fonts/`.
- **FR-G7.6** Без внешних CDN-запросов; визуальный паритет — без layout-сдвигов от метрик шрифта.
- **FR-G7.7** 2× `font-weight:700` ([LoginPage.css:50,195](../../../../../../../src/pages/LoginPage.css)) сведены к `600`.

## Scope — Субтаски (backlog T01–T06 → pipeline)

| Backlog | Pipeline task | Суть |
|---------|---------------|------|
| **T01** | [SPA-G7-T01](./task-spa-g7-t01-public-fonts-woff2-ofl/README.md) | woff2 + OFL in `public/fonts/` |
| **T02** | [SPA-G7-T02](./task-spa-g7-t02-fonts-css-main-import/README.md) | `fonts.css` + import before tokens |
| **T03** | [SPA-G7-T03](./task-spa-g7-t03-migrate-mono-token-five-sites/README.md) | 5× mono → `var(--font-family-mono)` |
| **T04** | [SPA-G7-T04](./task-spa-g7-t04-loginpage-weight-700-to-600/README.md) | LoginPage 700→600 |
| **T05** | [SPA-G7-T05](./task-spa-g7-t05-visual-smoke-board-issue-fonts/README.md) | Visual smoke + no CDN |
| **T06** | [SPA-G7-T06](./task-spa-g7-t06-story-gate-g7/README.md) | Story gate + docs |

## Решения (D-G7-1…6) — SSOT backlog

| ID | Решение |
|----|---------|
| **D-G7-1** | woff2 only |
| **D-G7-2** | Inter 400/500/600; 700→600 |
| **D-G7-3** | все 5 mono-мест |
| **D-G7-4** | `font-display: swap` |
| **D-G7-5** | static per-weight (не variable) |
| **D-G7-6** | `src/styles/fonts.css`, import before `tokens.css` |

## Тексты и переводы (en/et/ru)
**N/A** — UI-строк не вводит.

## Иконки
**N/A**

## Routes / API
**N/A** — статические ассеты `/fonts/*`.

## Зависимости
- **G4 Done** — токены `--font-family-*` уже есть.
- **SSOT** — design-system §2.2; локальность — ui-mockups §24 + ТЗ §10.

## Вне scope
- Внешние CDN.
- Variable fonts.
- Новые веса сверх 400/500/600.
- Токенизация `font-size`/`font-weight` в компонентах (добор G4).
- Отмена/правки Arweave-деплоя (deploy-track вне этой стори).

## Documentation touchpoints (обновить при закрытии)

| Файл | После Done |
|------|------------|
| design-system.md §2.2 | Реализовано: public/fonts/ + @font-face; Done (pkg-000039) |
| reusable-ui L0 | fonts self-hosted |
| ui-mockups §24.7 | N/A или убрать пометку если есть |
| gap-report §G7 | ✅ Done |
| design-foundation INDEX | Done |

## Acceptance Criteria
- [x] `public/fonts/` содержит self-hosted **woff2** Inter 400/500/600 + JetBrains Mono 400 + OFL-лицензии.
- [x] `@font-face` (`src/styles/fonts.css`, `font-display: swap`) подключён; Inter и JetBrains Mono рендерятся **без** системных шрифтов и **без** внешних CDN-запросов (проверка Network).
- [x] `var(--font-family-mono)` до-вешан на все 5 mono-мест; txid/hash на IssuePage показаны JetBrains Mono.
- [x] 2× `font-weight:700` сведены к `600` (LoginPage.css).
- [x] `npm test` зелёный; визуальный smoke board/issue-details без layout-регрессий.
- [x] Документация touchpoints обновлена; INDEX G7 → Done; gap-report §G7 → ✅.

## Швы
- Новое: `public/fonts/**`; `src/styles/fonts.css` + импорт в [main.jsx](../../../../../../../src/main.jsx) перед `tokens.css`.
- Mono: index.css, StoryHandoff, AppErrorState, ContributionLayer, WalletStatus.
- Веса: LoginPage.css (700→600).
