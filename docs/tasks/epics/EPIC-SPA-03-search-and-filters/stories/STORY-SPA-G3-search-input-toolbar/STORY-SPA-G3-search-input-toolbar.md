# STORY-SPA-G3 — SearchInput + контракт фильтров (foundation пакета search-and-filters)

## Meta (pipeline)

- **Key:** `STORY-SPA-G3-search-input-toolbar`
- **Parent Epic:** [`../../../../EPIC-SPA-03-search-and-filters.md`](../../../../EPIC-SPA-03-search-and-filters.md)
- **Status:** Done (2026-06-16)
- **Wave:** `pkg-000007`
- **Gap:** G3 (Medium)
- **source:** [`spa-app/docs/tasks/backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md)
- **Decision Ref:** [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md); [search-and-filters/README.md](../../../../../../backlog-stories/search-and-filters/README.md); [spa-app-doc-code-gap-report.md](../../../../../../analysis/spa-app-doc-code-gap-report.md) §G3; [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Источник:** [spa-app-doc-code-gap-report.md](../../../../../../analysis/spa-app-doc-code-gap-report.md) §G3
- **Зависит от:** [G1](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G1-gateway-endpoint-alignment.md) (gateway connection — done)

---

> **📍 SEARCH-00b — фундамент пакета (состыковка с реальным API).** Эта стори перенесена в пакет [search-and-filters](../../../../../../backlog-stories/search-and-filters/README.md) и поставлена **первой** (вместе с [G1](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G1-gateway-endpoint-alignment.md)) как точка состыковки с реальным API для получения issues с фильтрами.
> **Роль в пакете:** §1–8 ниже — **SSOT контракта фильтр-API** (data flow, endpoint, query-мэппинг, словарный блокёр), который потребляют [SEARCH-01](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md) / [SEARCH-04](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md) / [SEARCH-05](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md). Сам ввод поиска (кросс-язычный) материализован в [SEARCH-03](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md) — здесь не дублируется.
> Решения пакета: [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md).

## Зачем простыми словами

Поиск по title/description уже работает через URL-параметр `?search=`, но пользователь не может ввести запрос в интерфейсе — только вручную править адрес. Нужно поле поиска в тулбаре доски.

## Scope

- Компонент `SearchInput` (например `src/components/Filters/SearchInput.jsx` или `src/components/SearchInput/`).
- Вставка в тулбар [BoardPage.jsx](../../../../../../../src/pages/BoardPage.jsx) рядом с фильтрами.
- Связка с `parseBoardQuery` / `serializeBoardQuery` / `applyFilters` (инфраструктура в [boardQuery.js](../../../../../../../src/router/boardQuery.js) уже есть).
- Reset Filters очищает search (уже есть — проверить после UI).
- i18n placeholder через `dictionaries.js` при необходимости.

## Вне scope

- Полнотекстовый поиск на стороне gateway (только client-side filter как сейчас).
- Поиск на IssuePage.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [reusable-ui-components-architecture.md](../../../../../../UX/reusable-ui-components-architecture.md) | Пометка G3, SearchInput как planned | Убрать пометку; зафиксировать путь к файлу компонента |
| [ui-mockups-and-states-requirements.md](../../../../../../UX/ui-mockups-and-states-requirements.md) §24.2 | Пометка G3 | Убрать |
| [mockup-01](../../../../../../UX/mockups/mockup-01-dashboard-main-spec.md) | Пометка G3 | Убрать |
| [mockup-15](../../../../../../UX/mockups/mockup-15-routing-behavior-sheet-spec.md) | Пометка G3 | Убрать |
| [gap-report](../../../../../../analysis/spa-app-doc-code-gap-report.md) §5 | G3 open | G3 ✅ |
| [INDEX.md](../../../../../../backlog-stories/INDEX.md) | Todo | в пакете search-and-filters |

## Acceptance Criteria

- [x] На `/board` видно поле поиска с иконкой/placeholder.
- [x] Ввод обновляет `?search=` в hash-URL без полной перезагрузки.
- [x] Фильтрация списка совпадает с текущей логикой BoardPage.
- [x] Reset Filters сбрасывает search.
- [x] Документация touchpoints обновлена.

---

# Backend integration: поиск и фильтры (полный контракт)

> Составлено по фактическому коду (`.cursor/rules/analysis.mdc`) на 2026-06-03. Каждое утверждение проверено в исходниках; пути указаны. SSOT по фильтр-API — [`API_REFERENCE.md §7`](../../../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md); ниже — выжимка + то, чего там нет.

## 0. TL;DR (что нужно знать FE до начала)

1. **Серверного поиска НЕТ.** На gateway нет параметра `search`/`q`/full-text. Endpoint `GET /tallinn/issues` имеет ровно 15 фильтров (verified: [`asgi_app.py` route](../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py), [`handle_tallinn_issues_list`](../../../../../../../doge-complaints-gateway/src/core/api/handlers.py)). Поиск по тексту — **только client-side**, как сейчас в [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx).
2. **Поиск идёт по `title` + `description` текущей локали**, case-insensitive substring (`includes`). Это уже реализовано — стори лишь добавляет UI-ввод, контракт менять не нужно.
3. **Фильтры (status/type/labels/geo/institution/dates) — серверные.** SPA-репозиторий сейчас шлёт на gateway только `status`, `type`, `labels`; geo/institution/dates не прокидываются ([`GatewayIssueRepository.js`](../../../../../../../src/repositories/GatewayIssueRepository.js)).
4. **⚠️ Словари status/type/labels в SPA НЕ совпадают с тем, что реально отдаёт gateway** (см. §5). Это блокер для `GFL-DRIVEN` режима — фильтры вернут пусто. Поиск (client-side) от этого не страдает.

## 1. Data flow (как issues попадают на доску)

```
BoardPage.fetchIssues()                       // src/pages/BoardPage.jsx:48
  → issueService.getIssues({status,type,labels})   // src/services/issueService.js:20
    → repository.getIssues(options)
        ├─ FAKE-OLD (default): InMemoryIssueRepository (mockIssues)
        └─ GFL-DRIVEN:        GatewayIssueRepository → GET /tallinn/issues
  → issues (массив)
BoardPage.filteredIssues = client-side search по issues   // BoardPage.jsx:74-81
```

- Режим выбирается env-флагом `VITE_LIFE_REALITY_MODE` (`'FAKE-OLD'` по умолчанию → mock; `'GFL-DRIVEN'` → реальный gateway), база — `VITE_GATEWAY_BASE_URL` (verified: [`issueService.js:30-41`](../../../../../../../src/services/issueService.js)).
- Порядок строгий: **сначала серверная фильтрация** (сужает набор), **потом client-side поиск** по тексту внутри полученного набора. Поиск НЕ переобращается к серверу — он чистит уже загруженный `issues` (`useEffect` перезапрашивает только при смене `location.search`, [`BoardPage.jsx:70-72`](../../../../../../../src/pages/BoardPage.jsx)).

## 2. Client-side поиск — точная семантика (как есть сегодня)

Реализация: [`BoardPage.jsx:74-81`](../../../../../../../src/pages/BoardPage.jsx).

```js
const q = boardFilters.search.toLowerCase().trim()
issues.filter(issue => {
  const text = `${resolveLocalizedText(issue.title)} ${resolveLocalizedText(issue.description)}`.toLowerCase()
  return text.includes(q)
})
```

| Свойство | Значение | Источник |
|----------|----------|----------|
| Поля | `title` + `description` (через пробел) | `BoardPage.jsx:78` |
| Локаль | текущая (`resolveLocalizedText` берёт активный locale, не все языки) | `I18nProvider` |
| Регистр | нечувствителен (`toLowerCase` с обеих сторон) | `BoardPage.jsx:76,78` |
| Совпадение | подстрока (`includes`), не токены, не fuzzy | `BoardPage.jsx:79` |
| Пустой запрос | возвращает все `issues` без фильтрации | `BoardPage.jsx:75` |
| `summary`, `labels`, `institution`, `geo` | **в поиск НЕ входят** | `BoardPage.jsx:78` |

**Последствие для UI стори:** поле ищет только в видимом языке. Если пользователь на ET ищет русское слово — не найдёт, пока не переключит локаль. Если нужен кросс-язычный поиск — это изменение скоупа (искать по `title.et/ru/en` + `description.*`), требует правки `filteredIssues`, не бэкенда.

## 3. URL-контракт поиска и фильтров (SPA-сторона)

SSOT парсинга/сериализации — [`boardQuery.js`](../../../../../../../src/router/boardQuery.js).

- Формат **CSV в одном параметре**, не повторяющиеся ключи: `?status=NEW,IN_REVIEW&type=complaint&labels=infrastructure,housing&search=дорога` (verified: `serializeBoardQuery` использует `.join(',')`, [`boardQuery.js:41-62`](../../../../../../../src/router/boardQuery.js)).
- `search` хранится как есть, `.trim()` (`boardQuery.js:34, 60`).
- `parseBoardQuery` валидирует `status`/`type` против SPA-словарей `ISSUE_STATUS`/`ISSUE_TYPE` и **молча отбрасывает неизвестные** (`boardQuery.js:27-29`); `labels` не валидируются.
- Reset: `applyFilters({ status: [], type: '', labels: [], search: '' })` очищает всё, включая search ([`BoardPage.jsx:192,225`](../../../../../../../src/pages/BoardPage.jsx)) — AC «Reset сбрасывает search» уже покрыт инфраструктурой.

> ⚠️ Несовпадение форматов: SPA-URL = **CSV**, а gateway ждёт **повторяющиеся** параметры. Конвертацию делает репозиторий (см. §4) — не отправляйте CSV напрямую на gateway.

## 4. Серверный endpoint `GET /tallinn/issues` (контракт для FE)

- Биндинг: [`asgi_app.py` `@app.get("/tallinn/issues")`](../../../../../../../doge-complaints-gateway/src/core/api/asgi_app.py) → [`handle_tallinn_issues_list`](../../../../../../../doge-complaints-gateway/src/core/api/handlers.py).
- Auth: **публичный**, токен не нужен.
- Ответ: `200`, конверт `{ data: { issues: [...] }, trace_id }`. Полная схема карточки — `DOGEIssue.to_public_dict()` ([`dto.py:25-48`](../../../../../../../doge-complaints-gateway/src/core/projection/dto.py)).

### 4.1 Параметры (15) и формат

Полная таблица — [`API_REFERENCE.md §7`](../../../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md). Кратко:

| Параметр | HTTP-имя | Multi | Семантика (verified в [`read_filters.py`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)) |
|----------|----------|-------|----------|
| status | `status` | да (OR) | exact, **case-sensitive**; `payload.status not in values` ([`read_filters.py:210-213`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)) |
| type | `type` | нет | exact, case-sensitive (HTTP `type` → внутр. `issue_type`, [`asgi_app.py` route]) ([`read_filters.py:161`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)) |
| labels | `labels` | да (OR) | issue содержит ≥1 из переданных; exact, case-sensitive ([`read_filters.py:163-169`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)) |
| institution | `institution` | нет | exact по любому из `et/ru/en` (i18n) или legacy scalar ([`read_filters.py:134-142`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)) |
| created_after / created_before | те же | нет | **строковое** ISO-сравнение, обе границы inclusive ([`read_filters.py:214-217`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)) |
| geo bbox | `geo_lat_min/max`, `geo_lon_min/max` | нет | float, inclusive; issue без числовых lat/lon выпадает ([`read_filters.py:84-99`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)) |
| geo admin | `geo_district/settlement/region/country/postal_code` | да (OR) | сравнение по `normalize_geo_token` ([`read_filters.py:101-129`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)) |

### 4.2 Комбинирование фильтров

- **Между разными параметрами — AND** (issue должен пройти все активные). Внутри одного multi-value — **OR**. Verified: последовательные `if ...: continue` в [`filter_projection_rows`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py) + `any(...)` внутри каждого.
- **Issue без `geo` выпадает, если активен ЛЮБОЙ geo-фильтр** (`return not any_geo_filter_active(...)`, [`read_filters.py:69-80`](../../../../../../../doge-complaints-gateway/src/core/projection/read_filters.py)). Без geo-фильтров — остаётся.
- `normalize_geo_token` = `strip().lower()` + только alnum → убирает дефисы/пробелы/регистр, **но диакритику сохраняет** ([`scope.py`](../../../../../../../doge-complaints-gateway/src/core/geo/scope.py)). Пример: `Põhja-Tallinn`==`põhja tallinn`==`põhjatallinn`, но `pohja-tallinn` (без `õ`) ≠ `põhjatallinn`. Для geo-фильтров пишите значения с правильной диакритикой.

### 4.3 Что реально шлёт SPA-репозиторий

[`GatewayIssueRepository.buildIssuesQuery`](../../../../../../../src/repositories/GatewayIssueRepository.js) прокидывает **только** `status` (repeated), `type`, `labels` (repeated). `institution`, `created_*`, `geo_*` — **не реализованы** на клиенте. Если они нужны для доски — это отдельная задача (расширить `buildIssuesQuery` + `getIssues` options), бэкенд уже готов.

## 5. ⚠️ Расхождение словарей (БЛОКЕР для GFL-DRIVEN)

Проверено по enum/pipeline gateway. Реально gateway пишет и фильтрует значения из [`enums.py`](../../../../../../../doge-complaints-gateway/src/core/projection/enums.py); deterministic-пайплайн всегда создаёт `status=PUBLISHED` ([`extraction_policy.py:155`](../../../../../../../doge-complaints-gateway/src/core/projection/extraction_policy.py)) и маппит входные типы в 3 значения ([`extraction_policy.py:15-37`](../../../../../../../doge-complaints-gateway/src/core/projection/extraction_policy.py)).

| Измерение | Gateway отдаёт (код) | SPA фильтрует (`types.js`/`labelKeys.js`) | API_REFERENCE §7 |
|-----------|----------------------|-------------------------------------------|------------------|
| **status** | `NEW`, `IN_REVIEW`, `PUBLISHED` (пайплайн пишет `PUBLISHED`) | `NEW`, `VERIFIED`, `IN_REVIEW`, `ARCHIVED` | `DRAFT`, `PUBLISHED` (устар.) |
| **type** | `INCIDENT`, `IMPROVEMENT`, `SERVICE_REQUEST` | `complaint`, `observation`, `absurdity`, `system_bug` | `complaint`/… (устар.) |
| **labels** | `waste`, `district`, `infrastructure`, `safety` | `bureaucracy`, `infrastructure`, `healthcare`, `pensions`, `education`, `housing`, `tax`, `digital`, `social`, `language` | не перечислены |

Источники: SPA — [`types.js:1-13`](../../../../../../../src/domain/types.js), [`labelKeys.js`](../../../../../../../src/i18n/labelKeys.js); gateway — [`enums.py:6-29`](../../../../../../../doge-complaints-gateway/src/core/projection/enums.py).

**Следствие:** в `GFL-DRIVEN` любой серверный фильтр по status/type/labels из SPA-словаря почти всегда даст пусто (пересечение: status — `NEW`/`IN_REVIEW` (но данные = `PUBLISHED`); type — нет; labels — только `infrastructure`). **Поиск (client-side) работает независимо** — он не использует эти словари, бьёт по тексту `title`/`description`.

**Что решить продукту/бэку (вне этой стори, но нужно для интеграции):** свести словари к single source — выровнять SPA `ISSUE_STATUS`/`ISSUE_TYPE`/`AVAILABLE_LABELS` под `enums.py` (или наоборот), и обновить устаревший `API_REFERENCE §7` (там `DRAFT`/`complaint`). До этого фильтры на реальном gateway не функциональны; SearchInput из этой стори — функционален.

## 6. Форма ответа (что доступно поиску/отображению)

`to_public_dict()` ([`dto.py:25-48`](../../../../../../../doge-complaints-gateway/src/core/projection/dto.py)) — поля карточки:

| Поле | Тип | Примечание |
|------|-----|-----------|
| `id`, `status`, `type` | string | см. §5 для словарей |
| `labels` | string[] | governed set |
| `title`, `summary`, `description` | i18n-объект `{et,ru,en}` | поиск идёт по `title`+`description` |
| `institution` | i18n-объект \| отсутствует | опционально |
| `created_at` | string ISO \| отсутствует | для date-фильтров (строковое сравнение) |
| `geo` | объект \| отсутствует | `admin_district/settlement/region/country`, `lat`, `lon` |
| `arweave_txid`, `image_txid`, `image_hash` | string \| отсутствует | опционально |

Опциональные поля **отсутствуют в JSON** если null (не `null`-значение). FE должен делать guard.

## 7. Примеры

Серверная фильтрация (repeated-параметры, не CSV):
```bash
curl "$GATEWAY/tallinn/issues?status=PUBLISHED&type=INCIDENT&labels=infrastructure&labels=safety&geo_district=Kesklinn"
```

Поиск (client-side, уже работает) — пользователь печатает в SearchInput → `applyFilters({...boardFilters, search})` → URL `?search=...` → `filteredIssues` фильтрует загруженный набор. Серверного запроса по тексту нет.

## 8. Чек-лист интеграции (чтобы не спрашивать бэк)

- [x] SearchInput пишет в `?search=` через `serializeBoardQuery` (НЕ слать `search` на gateway).
- [x] Поиск остаётся client-side над `title`+`description` текущей локали.
- [ ] Учитывать, что geo/institution/date серверные фильтры в репозитории не прокинуты (бэк готов, клиент — нет).
- [ ] Перед включением `GFL-DRIVEN` выровнять словари status/type/labels (§5) — иначе серверные фильтры дадут пусто (поиск не затронут).
- [ ] Помнить про формат: SPA-URL CSV ↔ gateway repeated-params (конвертит репозиторий).

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-spa-g3-t01-search-input-component`](./task-spa-g3-t01-search-input-component/README.md) | pkg-000007 |
| 2 | [`task-spa-g3-t02-board-page-toolbar-integration`](./task-spa-g3-t02-board-page-toolbar-integration/README.md) | pkg-000007 |
| 3 | [`task-spa-g3-t03-search-placeholder-i18n`](./task-spa-g3-t03-search-placeholder-i18n/README.md) | pkg-000007 |
| 4 | [`task-spa-g3-t04-tests-search-url-and-reset`](./task-spa-g3-t04-tests-search-url-and-reset/README.md) | pkg-000007 |
| 5 | [`task-spa-g3-t05-sync-doc-touchpoints-g3`](./task-spa-g3-t05-sync-doc-touchpoints-g3/README.md) | pkg-000007 |
| 6 | [`task-spa-g3-t06-story-acceptance-verification`](./task-spa-g3-t06-story-acceptance-verification/README.md) | pkg-000007 |
| 7 | [`task-spa-g3-t07-issueservice-singleton-test-hermetic`](./task-spa-g3-t07-issueservice-singleton-test-hermetic/README.md) | `run_mode=spa_g3_audit_2026_06_16` |
| 8 | [`task-spa-g3-t08-board-page-search-fetch-decouple`](./task-spa-g3-t08-board-page-search-fetch-decouple/README.md) | `run_mode=spa_g3_audit_2026_06_16` |
| 9 | [`task-spa-g3-t09-gateway-base-url-trim-hygiene`](./task-spa-g3-t09-gateway-base-url-trim-hygiene/README.md) | `run_mode=spa_g3_audit_2026_06_16` |
