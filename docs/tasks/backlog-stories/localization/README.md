# Localization backlog (тематический набор стори)

> **Тема:** локализация spa-app (UI-строки, enum, метки/таксономия, контент, имена языков).
> **Целевое состояние:** [localization-target-and-gap-analysis-2026-06-15.md](../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) (T0–T6).
> **Решения:** [localization-architecture-cto-interview-2026-06-15.md](../../../analysis/localization-architecture-cto-interview-2026-06-15.md) (D1–D12).
> **Хостинг:** Arweave-деплой **снят** → Railway/подобное. В стори используется «обычный redeploy», без рационализации permaweb-иммутабельности. Жёсткое ограничение «только build-time» больше не действует (D3 «словари в бандле» остаётся как выбор, не как вынужденность).
> **🟢 Обновление 2026-06-16 — бэк выкатил L10N.** Мост: [backend-l10n-integration-bridge-2026-06-16.md](../../../analysis/backend-l10n-integration-bridge-2026-06-16.md). `original_locale: string[]` в проекции и `POST /telemetry/label-misses` доставлены → **L10N-03 и L10N-04 разблокированы** (REQ-BE-1/2 Done; REQ-BE-3 отложен бэком, совпадает с D9).

## Карта gap → стори

| Стори | Gap (severity) | Репозиторий | Зависит от |
|-------|----------------|-------------|------------|
| [L10N-01 — Реестр локалей (фундамент)](STORY-SPA-L10N-01-locale-registry-foundation.md) | GL-1 🟠, GL-6 🟡 | SPA | — |
| [L10N-02 — Динамический фильтр меток](STORY-SPA-L10N-02-dynamic-label-filter.md) | GL-2 🟠, GL-7(фильтр) 🟡 | SPA | — |
| [L10N-03 — Маркеры fallback/перевода](STORY-SPA-L10N-03-translation-fallback-markers.md) | GL-3 🟠, GL-7(маркер) 🟡 | SPA | ✅ REQ-BE-1 доставлен (`original_locale`) |
| [L10N-04 — Телеметрия непереведённых меток + privacy](STORY-SPA-L10N-04-untranslated-label-telemetry.md) | GL-5 🟠 | SPA + governance | ✅ REQ-BE-2 доставлен (sink); ⏳ решение privacy |
| [REQ-BE — Требования к бэку (от фронта)](REQUIREMENTS-BACKEND-L10N.md) | GL-4, sink GL-5 | gateway | ✅ Done (GW-L10N-01/02/03); REQ-BE-3 ⏸️ |

## Рекомендуемый порядок

1. **L10N-01** — фундамент (реестр локалей); другие опираются на него и на единый источник локалей.
2. **L10N-02** — независим; видимый UX-выигрыш на доске.
3. **L10N-03** — ✅ разблокирован: `original_locale` доставлен. MT-маркер по контракту бэка + мягкая деградация при отсутствии поля.
4. **L10N-04** — sink ✅ доставлен; materialized `pkg-000006` (2026-06-16); governance privacy T01 → runtime T02–T04.
- **REQ-BE** — ✅ исполнено бэком (GW-L10N-01/02/03); документ остаётся как требования + статус доставки.

## Принципы набора

- **Чистый код / dev-связность:** объединены gap, трогающие один и тот же код (GL-1+GL-6 — `i18n/core.js` и селектор; GL-7 расщеплён между L10N-02 и L10N-03 по месту правки).
- **Бэк — только требования.** [REQUIREMENTS-BACKEND-L10N.md](REQUIREMENTS-BACKEND-L10N.md) описывает, **что фронту нужно от бэка** и текущее наблюдаемое состояние; **не** содержит инструкций по реализации бэка — это заготовка для последующей проработки оператором.
- **Стори = требования + scope + проверяемые AC.** Без пошаговых how-to сверх необходимого; реализацию выбирает разработчик.

## Связь с остальным backlog

- Закрывает/поглощает: **HK-001** (мёртвый `languages.*` уходит в составе L10N-01), пересекается с **G6** (флаги/языки) и **G8** (дедупликация `LANGUAGE_OPTIONS`).
- **Словарь меток бэк(4)↔фронт(10)** (открытый вопрос моста §7): зона — [SEARCH-01](../search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md) (выравнивание словарей под канон gateway). L10N-02 (динамический фильтр) и переводы `labels.*` следуют за SEARCH-01 — не дублируем здесь.
- Регистрация в общем индексе: [../INDEX.md](../INDEX.md).
