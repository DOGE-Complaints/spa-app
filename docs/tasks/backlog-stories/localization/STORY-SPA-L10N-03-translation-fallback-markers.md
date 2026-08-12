# STORY-SPA-L10N-03 — Маркеры fallback и машинного перевода

## Meta

- **Key:** `STORY-SPA-L10N-03-translation-fallback-markers`
- **Status:** Todo
- **Gap:** GL-3 (🟠) + GL-7 часть «маркер» (🟡) — [localization-target-and-gap-analysis-2026-06-15.md](../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)
- **Решения:** D4 (откат + видимая пометка), D10 (помечать машинный перевод)
- **Зависит от:** ✅ **РАЗБЛОКИРОВАНО** — бэк выкатил `original_locale` (GW-L10N-02) и реально различающийся мультиязычный контент (GW-L10N-01). Мост: [backend-l10n-integration-bridge-2026-06-16.md](../../../analysis/backend-l10n-integration-bridge-2026-06-16.md). Требование закрыто: [REQUIREMENTS-BACKEND-L10N.md](REQUIREMENTS-BACKEND-L10N.md) REQ-BE-1.

## ✅ Контракт бэка (доставлен, verified 2026-06-16)

- Поле `original_locale: string[]` в каждом issue в ответах `GET /tallinn/issues` и `/{id}` — [`dto.py:24,49`](../../../../../doge-complaints-gateway/src/core/projection/dto.py#L24), [`openapi.yaml:331`](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/openapi.yaml).
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

- [src/i18n/core.js](../../../../src/i18n/core.js): `resolveLocalizedText` ([:27-37](../../../../src/i18n/core.js#L27)) сейчас возвращает только строку — расширить, чтобы вызывающий мог узнать, **какая локаль фактически использована** (для решения «показывать ли маркер»). Способ — на усмотрение разработчика (доп. функция/возврат метаданных), без слома существующих вызовов.
- [src/i18n/labelDisplay.js](../../../../src/i18n/labelDisplay.js): ветка humanize ([:25](../../../../src/i18n/labelDisplay.js#L25)) — дать вызывающему признак «использован humanize-fallback».
- [src/domain/types.js](../../../../src/domain/types.js): добавить в `Issue` опциональное поле `original_locale?: string[]` (typedef + `isIssue` валидатор — принимать отсутствие/массив строк, не падать).
- [src/repositories/GatewayIssueRepository.js](../../../../src/repositories/GatewayIssueRepository.js) / [InMemoryIssueRepository.js](../../../../src/repositories/InMemoryIssueRepository.js): пробросить `original_locale` без потерь (gateway уже отдаёт; для моков — опционально проставить в части `ROUTING_DEMO_ISSUES` для демонстрации MT-маркера в `FAKE-OLD`).
- [src/components/IssueCard/IssueCard.jsx](../../../../src/components/IssueCard/IssueCard.jsx), [src/pages/IssuePage.jsx](../../../../src/pages/IssuePage.jsx): отрисовать MT-маркер (по `original_locale`), fallback-маркер и humanize-маркер метки.
- **Мягкая деградация:** `issue.original_locale ?? []`; нет поля → MT-маркер не показываем (старые issue до бэкфилла — это переходное состояние, не баг).

## Вне scope

- Изменение контракта бэка — **уже доставлено** (GW-L10N-01/02); здесь только потребление.
- Реальный перевод/догенерация — не задача фронта.
- Телеметрия (L10N-04).

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [i18n-architecture.md](../../../i18n-architecture.md) §fallback | молчаливый откат | откат + видимая пометка; описание индикаторов |
| [mockup-17](../../../UX/mockups/mockup-17-i18n-language-and-content-spec.md) | нет маркеров | добавить состояние «маркер языка/перевода» |
| [localization-target…md](../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) | GL-3 open (+GL-4 контракт) | GL-3 ✅; GL-4 закрыт со стороны бэка — `original_locale` доставлен |

## Acceptance Criteria

- [ ] `original_locale` читается из проекции; локаль ∉ списка → MT-маркер; ∈ списка → без маркера.
- [ ] Нет `original_locale` (отсутствует/пусто) → MT-маркер НЕ показывается, рендер не падает (мягкая деградация для старых issue).
- [ ] При откате контента на нерасзапрошенную локаль виден индикатор фактического языка (fallback-маркер).
- [ ] Метка без перевода (humanize) визуально помечена как непереведённая.
- [ ] Маркеры не ломают вёрстку карточки/деталей; не выглядят как ошибка.
- [ ] `npx vitest run` — green; тесты: MT-маркер по `original_locale` (включая отсутствие поля), «какая локаль использована» в резолвере.
