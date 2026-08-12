# STORY-SPA-L10N-03 — Маркеры fallback и машинного перевода

## Meta

- **Key:** `STORY-SPA-L10N-03-translation-fallback-markers`
- **Parent Epic:** [`../../../../EPIC-SPA-02-localization-l10n.md`](../../../../EPIC-SPA-02-localization-l10n.md)
- **Status:** Done
- **Gap:** GL-3 (🟠) + GL-7 часть «маркер» (🟡) — [localization-target-and-gap-analysis-2026-06-15.md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)
- **Решения:** D4 (откат + видимая пометка), D10 (помечать машинный перевод)
- **Зависит от:** ✅ **РАЗБЛОКИРОВАНО** — бэк выкатил `original_locale` (GW-L10N-02) и реально различающийся мультиязычный контент (GW-L10N-01). Мост: [backend-l10n-integration-bridge-2026-06-16.md](../../../../../../analysis/backend-l10n-integration-bridge-2026-06-16.md). Требование закрыто: [REQUIREMENTS-BACKEND-L10N.md](../../../../../../backlog-stories/localization/REQUIREMENTS-BACKEND-L10N.md) REQ-BE-1.
- **source:** [`spa-app/docs/tasks/backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md)
- **Decision Ref:** [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md); [localization/README.md](../../../../../../backlog-stories/localization/README.md); [localization-target-and-gap-analysis-2026-06-15.md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md); [backend-l10n-integration-bridge-2026-06-16.md](../../../../../../analysis/backend-l10n-integration-bridge-2026-06-16.md)

## ✅ Контракт бэка (доставлен, verified 2026-06-16)

- Поле `original_locale: string[]` в каждом issue в ответах `GET /tallinn/issues` и `/{id}` — [`dto.py:24,49`](../../../../../../../doge-complaints-gateway/src/core/projection/dto.py#L24), [`openapi.yaml:331`](../../../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/openapi.yaml).
- **Значения:** уникальные из `["et","ru","en"]`, в каноническом порядке `et, ru, en` (НЕ в порядке появления).
- **Семантика:** языки, на которых issue реально **подан людьми**. Локаль **вне** списка = **машинный перевод (MT)**.
- **Опциональность:** поле **опускается**, когда язык неизвестен (и у старых issue до бэкфилла). `dto.py:49` сериализует только при непустом значении.
- **Контент** `title/summary/description{et,ru,en}` теперь **реально различается** по локалям (раньше были идентичные копии) — MT-маркер стал осмысленным.

## Зачем простыми словами

Сейчас если перевода нет, приложение **молча** показывает текст на другом языке. Для гражданских жалоб это нечестно: человек должен видеть, что читает не запрошенный язык или машинный перевод, а не оригинальные слова автора. Нужны видимые, спокойные пометки.

## Целевое (из интервью + контракт бэка)

Два независимых типа маркера контента + один для метки:
- **MT-маркер (основной, по `original_locale`):** текущая локаль ∈ `original_locale` → без маркера; локаль ∉ `original_locale` → маркер «машинный перевод»; `original_locale` отсутствует/пуст → **маркер НЕ показываем** (канон, подтверждено по открытому вопросу bridge §7).
- **Fallback-маркер «показано на ⟨язык⟩»:** когда у запрошенной локали текст пуст и `resolveLocalizedText` откатился на другую (по цепочке et→ru→en). С учётом GW-L10N-01 контент обычно заполнен во всех 3 локалях (пустые добиваются fallback-текстом на бэке), поэтому этот случай реже MT.
- **Метка без перевода (humanize):** маркер «нет перевода» (мягкий, не ошибка).
- Маркеры спокойные, не «ошибочные»; не ломают вёрстку.

## Scope (фактические точки)

- [src/i18n/core.js](../../../../../../../src/i18n/core.js): `resolveLocalizedText` ([:48-57](../../../../../../../src/i18n/core.js#L48)) сейчас возвращает только строку — расширить, чтобы вызывающий мог узнать, **какая локаль фактически использована** (для решения «показывать ли маркер»). Способ — на усмотрение разработчика (доп. функция/возврат метаданных), без слома существующих вызовов.
- [src/i18n/labelDisplay.js](../../../../../../../src/i18n/labelDisplay.js): ветка humanize ([:19-26](../../../../../../../src/i18n/labelDisplay.js#L19)) — дать вызывающему признак «использован humanize-fallback».
- [src/domain/types.js](../../../../../../../src/domain/types.js): добавить в `Issue` опциональное поле `original_locale?: string[]` (typedef + `isIssue` валидатор — принимать отсутствие/массив строк, не падать).
- [src/repositories/GatewayIssueRepository.js](../../../../../../../src/repositories/GatewayIssueRepository.js) / [InMemoryIssueRepository.js](../../../../../../../src/repositories/InMemoryIssueRepository.js): пробросить `original_locale` без потерь (gateway уже отдаёт; для моков — опционально проставить в части `ROUTING_DEMO_ISSUES` для демонстрации MT-маркера в `FAKE-OLD`).
- [src/components/IssueCard/IssueCard.jsx](../../../../../../../src/components/IssueCard/IssueCard.jsx), [src/pages/IssuePage.jsx](../../../../../../../src/pages/IssuePage.jsx): отрисовать MT-маркер (по `original_locale`), fallback-маркер и humanize-маркер метки.
- **Мягкая деградация:** `issue.original_locale ?? []`; нет поля → MT-маркер не показываем (старые issue до бэкфилла — это переходное состояние, не баг).

## Вне scope

- Изменение контракта бэка — **уже доставлено** (GW-L10N-01/02); здесь только потребление.
- Реальный перевод/догенерация — не задача фронта.
- Телеметрия (L10N-04).

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [i18n-architecture.md](../../../../../../i18n-architecture.md) §fallback | молчаливый откат | откат + видимая пометка; описание индикаторов |
| [mockup-17](../../../../../../UX/mockups/mockup-17-i18n-language-and-content-spec.md) | нет маркеров | добавить состояние «маркер языка/перевода» |
| [localization-target…md](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) | GL-3 open (+GL-4 контракт) | GL-3 ✅; GL-4 закрыт со стороны бэка — `original_locale` доставлен |

## Точки в коде (P1 facts, 2026-06-16)

| Факт | Путь |
|------|------|
| `resolveLocalizedText` возвращает только `string`; fallback et→ru→en без метаданных | [`core.js:48-57`](../../../../../../../src/i18n/core.js) |
| `formatLabelKey` humanize без признака «нет перевода» | [`labelDisplay.js:19-26`](../../../../../../../src/i18n/labelDisplay.js) |
| `Issue` typedef без `original_locale`; `isIssue` не валидирует поле | [`types.js:55-67,129-146`](../../../../../../../src/domain/types.js) |
| `original_locale` в `spa-app/src/**` — 0 matches | grep 2026-06-16 |
| Gateway repo — pass-through JSON без `assertIssue` | [`GatewayIssueRepository.js:54-65`](../../../../../../../src/repositories/GatewayIssueRepository.js) |
| InMemory seed — `assertIssue` на каждом issue | [`InMemoryIssueRepository.js:4-6`](../../../../../../../src/repositories/InMemoryIssueRepository.js) |
| UI рендерит контент/метки без маркеров | [`IssueCard.jsx:42-48`](../../../../../../../src/components/IssueCard/IssueCard.jsx), [`IssuePage.jsx:91-105`](../../../../../../../src/pages/IssuePage.jsx) |

## Acceptance Criteria

- [x] `original_locale` читается из проекции; локаль ∉ списка → MT-маркер; ∈ списка → без маркера.
- [x] Нет `original_locale` (отсутствует/пусто) → MT-маркер НЕ показывается, рендер не падает (мягкая деградация для старых issue).
- [x] При откате контента на нерасзапрошенную локаль виден индикатор фактического языка (fallback-маркер).
- [x] Метка без перевода (humanize) визуально помечена как непереведённая.
- [x] Маркеры не ломают вёрстку карточки/деталей; не выглядят как ошибка.
- [x] `npx vitest run` — green; тесты: MT-маркер по `original_locale` (включая отсутствие поля), «какая локаль использована» в резолвере.

## Nested tasks

| Order | Task folder | Wave | Notes |
|---|---|---|---|
| 1 | [`task-spa-l10n-03-t01-issue-original-locale-domain-and-repository-passthrough`](./task-spa-l10n-03-t01-issue-original-locale-domain-and-repository-passthrough/README.md) | pkg-000005 | Domain + repo passthrough + mock seed |
| 2 | [`task-spa-l10n-03-t02-resolve-localized-text-with-resolved-locale`](./task-spa-l10n-03-t02-resolve-localized-text-with-resolved-locale/README.md) | pkg-000005 | Resolver metadata API |
| 3 | [`task-spa-l10n-03-t03-label-display-humanize-fallback-metadata`](./task-spa-l10n-03-t03-label-display-humanize-fallback-metadata/README.md) | pkg-000005 | Humanize fallback signal |
| 4 | [`task-spa-l10n-03-t04-translation-marker-helpers-and-ui-component`](./task-spa-l10n-03-t04-translation-marker-helpers-and-ui-component/README.md) | pkg-000005 | MT/fallback/humanize helpers + UI |
| 5 | [`task-spa-l10n-03-t05-issue-card-and-details-marker-integration`](./task-spa-l10n-03-t05-issue-card-and-details-marker-integration/README.md) | pkg-000005 | IssueCard + IssuePage wire |
| 6 | [`task-spa-l10n-03-t06-tests-translation-fallback-markers`](./task-spa-l10n-03-t06-tests-translation-fallback-markers/README.md) | pkg-000005 | Test coverage AC #6 |
| 7 | [`task-spa-l10n-03-t07-sync-doc-touchpoints-l10n03`](./task-spa-l10n-03-t07-sync-doc-touchpoints-l10n03/README.md) | pkg-000005 | Doc touchpoints |
| 8 | [`task-spa-l10n-03-t08-story-acceptance-verification`](./task-spa-l10n-03-t08-story-acceptance-verification/README.md) | pkg-000005 | Story gate |
| 9 | [`task-spa-l10n-03-t09-mock-empty-locale-fallback-seed`](./task-spa-l10n-03-t09-mock-empty-locale-fallback-seed/README.md) | `run_mode=spa_l10n_03_audit_2026_06_16` | Post-audit F1; mock empty-locale seed |
| 10 | [`task-spa-l10n-03-t10-institution-field-fallback-marker`](./task-spa-l10n-03-t10-institution-field-fallback-marker/README.md) | `run_mode=spa_l10n_03_audit_2026_06_16` | Post-audit F2; institution fallback marker |
