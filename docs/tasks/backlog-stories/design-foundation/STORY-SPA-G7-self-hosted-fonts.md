# STORY-SPA-G7 — Self-hosted шрифты (Inter + JetBrains Mono)

## Meta

- **Key:** `STORY-SPA-G7-self-hosted-fonts`
- **Пакет:** `design-foundation/` (cross-cutting L0 Foundations)
- **Status:** ✅ Done (`pkg-000039`)
- **Severity:** 🟡 Gap G7 (Low)
- **Источник:** [spa-app-doc-code-gap-report.md](../../../analysis/spa-app-doc-code-gap-report.md) §G7
- **Зависит от:** [STORY-SPA-G4](STORY-SPA-G4-design-tokens-foundation.md) **Done** (`pkg-000038`) — токены `--font-family-base`/`--font-family-mono` уже определены ([tokens.css:29-30](../../../../src/styles/tokens.css#L29-L30)). G7 добавляет `@font-face`+файлы и до-вешивает mono-токен.
- **Решения:** зафиксированы 2026-07-29 (см. §Решения) — стори готова к реализации.

> **📌 Decision record — Arweave deploy отменён (2026-07-29).** Arweave был *одним* из драйверов self-hosting, но **не единственным**: требование «без внешних CDN/шрифтов/аналитики» имеет самостоятельный якорь — [ui-mockups-and-states-requirements.md:225](../../../UX/ui-mockups-and-states-requirements.md#L225) (privacy/self-containment) + ТЗ §10. Чисто-Arweave якорь — только [deploy-arweave.md:68](../../../deploy-arweave.md#L68) (deploy-checklist). **Вывод: отмена Arweave НЕ отменяет G7** — self-hosting сохраняется по privacy-требованию; меняется только обоснование. ⚠️ Если владелец продукта отдельно снимет и требование ui-mockups:225 — тогда G7 можно свести к CDN-варианту (Google Fonts); это отдельное продуктовое решение, здесь не принимается.

## SSOT дизайна (вместо артборда)

Типографика канонизирована в [design-system.md §2.2](../../../UX/design-system.md#L56) + требование локальности ассетов ([ui-mockups §24:225](../../../UX/ui-mockups-and-states-requirements.md#L225) «без внешних CDN/шрифтов/аналитики»; ТЗ §10):

| Токен | Значение | Уже в коде? |
|-------|----------|-------------|
| `--font-family-base` | **Inter** | ✅ определён + применён к body ([index.css:2,12](../../../../src/index.css#L2)); но Inter **не self-hosted** → рендерится system-fallback |
| `--font-family-mono` | **JetBrains Mono** | ⚠️ определён ([tokens.css:30](../../../../src/styles/tokens.css#L30)), но **0 использований** (dangling) |
| `--font-weight-{regular,medium,semibold}` | 400 / 500 / 600 | частично (см. §Анализ E) |

> Требование [design-system.md:70](../../../UX/design-system.md#L70): «Target: `public/fonts/` + `@font-face` — G7 (пока системный Inter fallback)». G4 намеренно оставил `@font-face` за G7 ([tokens.css:4](../../../../src/styles/tokens.css#L4) «G7 owns @font-face + font files»).

## Зачем простыми словами

Продукт требует **самодостаточности без внешних зависимостей** — никаких `fonts.googleapis.com` (privacy/self-containment, ui-mockups §24 + ТЗ §10; ранее это же диктовал и Arweave-деплой, ныне отменённый). Дизайн требует Inter (текст) и JetBrains Mono (txid/hash). Сейчас Inter только в fallback-стеке (реально показывается system-ui), а JetBrains Mono **не подключён вообще** — mono-поля рендерятся системным `ui-monospace`. Нужно положить файлы в `public/fonts/`, подключить через `@font-face` и до-вешать mono-токен на реальные места.

## 🔬 Слой анализа — verified current-state (2026-07-28)

> Все факты — из `grep`/`read`/`ls` по коду; ни одно утверждение не предположение.

**A. Инфраструктуры шрифтов нет.**
- `public/fonts/` — **отсутствует** (`public/` = `assets/`, `favicon.svg`, `icons/`).
- `@font-face` в `src`/`public` — **0** (единственное упоминание — коммент-заглушка [tokens.css:4](../../../../src/styles/tokens.css#L4)).
- Формат подачи: Vite отдаёт `public/` как есть → файлы будут по `/fonts/*`; `@font-face src: url('/fonts/…')`. Отдельный конфиг не нужен.

**B. Base-семейство: токен есть, файла нет.** `--font-family-base: Inter, system-ui, …` ([tokens.css:29](../../../../src/styles/tokens.css#L29)) применён к `body`/`:root` ([index.css:2,12](../../../../src/index.css#L2)). Т.к. Inter не установлен и не self-hosted → **фактически рендерится `system-ui`**, не Inter. Работа G7 по base = только добавить `@font-face` Inter + файлы; body-wiring уже сделан (G4).

**C. Mono-токен висит вхолостую (dangling).** `--font-family-mono` определён, но `var(--font-family-mono)` — **0 использований** (проверено grep). Вместо него **5 мест хардкодят** monospace-стек:

| # | Файл:строка | Селектор/контекст |
|---|-------------|-------------------|
| 1 | [index.css:458](../../../../src/index.css#L458) | `.issue-details-metadata-monospace` |
| 2 | [StoryHandoff.css:149](../../../../src/components/StoryHandoff/StoryHandoff.css#L149) | — |
| 3 | [AppErrorState.css:46](../../../../src/components/AppErrorState/AppErrorState.css#L46) | error-code |
| 4 | [ContributionLayer.css:123](../../../../src/components/ContributionLayer/ContributionLayer.css#L123) | receipt-id |
| 5 | [WalletStatus.css:73](../../../../src/components/WalletStatus/WalletStatus.css#L73) | wallet address |

→ Реальная поверхность mono-миграции = эти 5, а не только `.issue-details-metadata-monospace` из исходного scope.

**D. Mono-таргет существует и уже применён.** `.issue-details-metadata-monospace` ([index.css:457](../../../../src/index.css#L457)) навешан в [IssuePage.jsx:185,191,197](../../../../src/pages/IssuePage.jsx#L185) на `arweave_txid` / `image_txid` / `image_hash` (3 поля). Т.е. AC «monospace на txid/hash IssuePage» уже **частично** выполнен — класс есть, но семейство = system `ui-monospace`, не JetBrains Mono.

**E. Веса: код шире канона design-system.** Фактическое `font-weight` в CSS: `600`×35, `500`×7, `400`×3, **`700`×2**. design-system §2.2 канон = только 400/500/600. → 2× `font-weight:700` — вне контракта: либо доставить Inter 700, либо свести к 600 (см. D-G7-2). JetBrains Mono веса не указаны → нужен только 400.

**F. Scope исходной стори неполон/устарел:**
- Не учитывает **dangling mono-токен** и 4 из 5 хардкод-мест (только `.issue-details-metadata-monospace` назван; StoryHandoff/AppErrorState/ContributionLayer/WalletStatus пропущены).
- «Применить к body» — избыточно: body уже на `var(--font-family-base)` (G4).
- Touchpoint «design-system §типографика» неточен → это §2.2 [l.70](../../../UX/design-system.md#L70).
- `ui-mockups §24.7` как touchpoint — grep по файлу ссылки на `tokens.css`/`src/styles`/шрифты **не находит** (как и в G4-аудите) → touchpoint под вопросом.
- Все относительные ссылки исходной стори **битые** (глубина `../../analysis` / `../../UX` — на уровень мельче); в этой версии исправлено на `../../../…` / `../../../../src`.

## Решения (зафиксированы 2026-07-29)

| ID | Вопрос | ✅ Решение | Обоснование |
|----|--------|-----------|-------------|
| **D-G7-1** | Формат файлов | **woff2 only** | все целевые браузеры поддерживают; минимальный вес. Отмена Arweave это не меняет. |
| **D-G7-2** | Веса Inter | **400 / 500 / 600** (канон §2.2); 2× `font-weight:700` свести к `600` | держать контракт design-system; оба стрея — в [LoginPage.css:50,195](../../../../src/pages/LoginPage.css#L50) → правятся в T04 |
| **D-G7-3** | Охват mono | **все 5** хардкод-мест → `var(--font-family-mono)` | иначе токен полу-висящий, drift сохранится |
| **D-G7-4** | `font-display` | **swap** | контент виден сразу (FOUT), без invisible-text |
| **D-G7-5** | Дистрибуция Inter | **static per-weight woff2** (не variable) | variable вне scope; 3 веса — приемлемый вес бандла |
| **D-G7-6** | Куда `@font-face` | **новый `src/styles/fonts.css`**, импорт в `main.jsx` **перед** `tokens.css` | отделить ассет-подключение от токен-значений |

## Функциональные требования (FR)

- **FR-G7.1** `public/fonts/` содержит self-hosted **woff2**: Inter **400/500/600** + JetBrains Mono **400**.
- **FR-G7.2** `@font-face` в новом `src/styles/fonts.css` с `font-family: 'Inter'`/`'JetBrains Mono'`, корректными `font-weight` и `font-display: swap`; импорт в `main.jsx` **перед** `tokens.css`.
- **FR-G7.3** Inter рендерится self-hosted (не system-fallback) на body и наследуется.
- **FR-G7.4** `--font-family-mono` до-вешан на **все 5** mono-мест (§Анализ C): txid/hash IssuePage + прочие рендерятся JetBrains Mono.
- **FR-G7.5** Лицензии OFL (Inter, JetBrains Mono) в `public/fonts/`.
- **FR-G7.6** Без внешних CDN-запросов; визуальный паритет — без layout-сдвигов от метрик шрифта.
- **FR-G7.7** 2× `font-weight:700` ([LoginPage.css:50,195](../../../../src/pages/LoginPage.css#L50)) сведены к `600` (канон §2.2 — 700 не доставляется).

## Субтаски

| Таск | Суть | Швы |
|------|------|-----|
| **T01** | Положить **woff2**: `public/fonts/inter/` (400/500/600) + `public/fonts/jetbrains-mono/` (400) + OFL-лицензии | `public/fonts/` |
| **T02** | Новый `src/styles/fonts.css`: `@font-face` Inter (400/500/600) + JetBrains Mono (400), `font-display: swap`; импорт в [main.jsx](../../../../src/main.jsx) **перед** `tokens.css` | `src/styles/fonts.css`, `main.jsx` |
| **T03** | До-вешать mono-токен: заменить все 5 хардкод `ui-monospace,…` на `var(--font-family-mono)` (§Анализ C) | index.css:458, StoryHandoff:149, AppErrorState:46, ContributionLayer:123, WalletStatus:73 |
| **T04** | Свести 2× `font-weight:700` → `600` ([LoginPage.css:50,195](../../../../src/pages/LoginPage.css#L50)) — 700 не доставляется | `LoginPage.css` |
| **T05** | Visual smoke: board (Inter) + issue-details (JetBrains Mono на txid/hash) before/after; проверить **отсутствие CDN-запросов** (Network) и layout-сдвига; `npm test` зелёный | `screenshots/`, тесты |
| **T06** | Doc touchpoints (см. таблицу) + INDEX Todo→Done + gap-report §G7 ✅ | docs |

## Тексты и переводы (en/et/ru)
**N/A** — UI-строк не вводит.

## Иконки
**N/A** — иконки не затрагиваются.

## Routes / API
**N/A** — статические ассеты (`/fonts/*`), без роутов/эндпоинтов.

## Зависимости
- **G4 Done** — токены `--font-family-*` уже есть; G7 их наполняет ассетами + до-вешивает mono.
- **SSOT** — [design-system.md §2.2](../../../UX/design-system.md#L56); требование локальности — [ui-mockups §24:225](../../../UX/ui-mockups-and-states-requirements.md#L225) + ТЗ §10.

## Вне scope
- Внешние CDN (запрещены требованием локальности ui-mockups §24 / ТЗ §10).
- Variable fonts (решено D-G7-5: static per-weight).
- Новые веса сверх 400/500/600 (2× bold-700 сводятся к 600, FR-G7.7).
- Токенизация `font-size`/`font-weight` в компонентах (это добор G4, не G7).
- Отмена/правки Arweave-деплоя как таковые (deploy-track вне этой стори — см. §Follow-ups).

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [design-system.md §2.2](../../../UX/design-system.md#L70) (l.70) | «Target: public/fonts/ + @font-face — G7 (пока системный Inter fallback)» | Заменить на «Реализовано: public/fonts/ + @font-face; Done (pkg-XXXXXX)» |
| [reusable-ui-components-architecture.md](../../../UX/reusable-ui-components-architecture.md) §L0 | L0 Foundations (шрифты) | Подтвердить: fonts self-hosted |
| [ui-mockups-and-states-requirements.md](../../../UX/ui-mockups-and-states-requirements.md) §24.7 | ⚠️ ссылка на шрифты grep **не найдена** — проверить, есть ли реально | Если есть — убрать; иначе N/A |
| [gap-report](../../../analysis/spa-app-doc-code-gap-report.md) §G7 (l.22/147/266) | G7 open (Low) | G7 ✅ Done |
| [INDEX.md](INDEX.md) | G7 Todo | Done |

## Acceptance Criteria

- [x] `public/fonts/` содержит self-hosted **woff2** Inter 400/500/600 + JetBrains Mono 400 + OFL-лицензии.
- [x] `@font-face` (`src/styles/fonts.css`, `font-display: swap`) подключён; Inter и JetBrains Mono рендерятся **без** системных шрифтов и **без** внешних CDN-запросов (проверка Network).
- [x] `var(--font-family-mono)` до-вешан на все 5 mono-мест; txid/hash на IssuePage ([IssuePage.jsx:185-197](../../../../src/pages/IssuePage.jsx#L185)) показаны JetBrains Mono.
- [x] 2× `font-weight:700` сведены к `600` ([LoginPage.css:50,195](../../../../src/pages/LoginPage.css#L50)).
- [x] `npm test` зелёный; визуальный smoke board/issue-details без layout-регрессий.
- [x] Документация touchpoints обновлена; INDEX G7 → Done; gap-report §G7 → ✅.

## Швы
- Новое: `public/fonts/**`; `@font-face` в `src/styles/fonts.css` + импорт в [main.jsx](../../../../src/main.jsx) перед `tokens.css`.
- Mono-домешивание: [index.css:458](../../../../src/index.css#L458) + [StoryHandoff.css:149](../../../../src/components/StoryHandoff/StoryHandoff.css#L149) + [AppErrorState.css:46](../../../../src/components/AppErrorState/AppErrorState.css#L46) + [ContributionLayer.css:123](../../../../src/components/ContributionLayer/ContributionLayer.css#L123) + [WalletStatus.css:73](../../../../src/components/WalletStatus/WalletStatus.css#L73).
- Веса: [LoginPage.css:50,195](../../../../src/pages/LoginPage.css#L50) (700→600).

## Follow-ups (вне scope G7 — отдельный deploy-track)
Отмена Arweave-деплоя оставляет в репо согласующие правки (findings, не входят в G7):
- [deploy-arweave.md](../../../deploy-arweave.md) — deploy-checklist больше не актуален (кандидат на архив/пометку).
- [requirements/README-index.md:113](../../../requirements/README-index.md#L113), [03-package-dependencies.md:80](../../../requirements/03-package-dependencies.md#L80), [02-routing-architecture.md:55](../../../requirements/02-routing-architecture.md#L55) — обоснование `HashRouter`/`base:'./'` через «Arweave» устарело (сам HashRouter может остаться по другим причинам — решать отдельно).
- Railway-деплой ([EPIC-SPA-06](../../epics/EPIC-SPA-06-railway-deploy/EPIC-SPA-06-railway-deploy.md)) становится единственным — подтвердить у владельца.
