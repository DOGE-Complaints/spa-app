# dogeestonia SPA — Technical Architecture

**Статус:** draft  
**Назначение:** целостный техдок, который собирается по мере проработки эпиков  
**Текущий фокус:** архитектурный фрагмент EPIC-00 (Domain, Repository, Facade)

---

## 0) Зеркало намерения (перед работой)

Что вы хотите получить:

- сначала построить в SPA функциональный слой как "внутренний бэкенд", без привязки к визуальной части;
- сделать удобный фасад для UI, чтобы UI не знал про конкретный источник данных;
- разрабатывать bottom-up: домен и контракт -> локальная реализация -> фасад -> внешние адаптеры (Arweave, Broadcast);
- иметь документ, по которому легко проверить: "делаем ли мы именно это".

Этот документ фиксирует именно такую траекторию.

**Root-level runtime контур (Custom GPT -> Edge -> Dogeparty/Arweave -> SPA):** `docs/architecture/dogeestonia-ingest-runtime-architecture.md`

---

## 1) Контекст общей архитектуры (каркас)

Целевая архитектура SPA делится на слои:

1. **Domain Layer** — типы и правила доменных сущностей (`Issue`, `IssueIntakePayload`, `CreateIssueCommand`, `CreateIssueResult`, статусы, типы).
2. **Repository Contract Layer** — интерфейс доступа к данным (`IssueRepository`).
3. **Repository Implementations** — подменяемые реализации:
   - `InMemoryIssueRepository` (EPIC-00, для TDD/dev),
   - `Arweave write path` (EPIC-05),
   - `BroadcastIssueRepository` (EPIC-04).
4. **Service Facade Layer** — `issueService`, единая точка для UI.
5. **UI Layer** — Board, карточки, форма submit (EPIC-03/05), работает только через фасад.

---

## 2) Архитектурный фрагмент EPIC-00

EPIC-00 формирует фундаментальные части пунктов 1-4:

- доменная модель;
- контракт репозитория;
- in-memory реализация;
- фасад сервиса;
- документация контракта.

### 2.1 Маппинг тасков EPIC-00 -> архитектурные элементы

| Task | Архитектурный элемент | Роль |
|---|---|---|
| `task-implement-domain-types-issue.md` | Domain Model | Фиксирует структуру сущностей и стабильный словарь полей |
| `task-add-issue-repository-interface.md` | Repository Contract | Разводит "что нужно от данных" и "как именно данные получаются" |
| `task-implement-in-memory-issue-repository.md` | Repository Implementation #1 | Даёт изолированный источник данных для TDD и ранней интеграции |
| `task-implement-issue-service-facade.md` | Service Facade | Стабилизирует API для UI и скрывает детали репозитория |
| `task-add-domain-facade-documentation.md` | Architectural Documentation | Фиксирует контракт для следующих эпиков (EPIC-04/05/06) |

### 2.2 Контракт границ

#### Domain contract

- `Issue`
- `IssueIntakePayload`
- `CreateIssueCommand`
- `CreateIssueResult`
- `IssueStatus`
- `IssueType`

#### Repository contract

- `getIssues(options?) -> Promise<Issue[]>`
- `getIssue(id) -> Promise<Issue | null>`
- `createIssue(command) -> Promise<CreateIssueResult>`

#### Facade contract (для UI)

- `issueService.getIssues(options?)`
- `issueService.getIssue(id)`
- `issueService.createIssue(command)`

**Ключевой принцип:** UI не импортирует и не вызывает репозитории напрямую.

---

## 3) Потоки данных в рамках EPIC-00

### 3.1 Read flow (без внешних сетей)

`UI -> issueService.getIssues() -> InMemoryIssueRepository.getIssues() -> Issue[]`

### 3.2 Read by id flow

`UI -> issueService.getIssue(id) -> InMemoryIssueRepository.getIssue(id) -> Issue | null`

### 3.3 Create flow (локальный baseline)

`UI -> issueService.createIssue(command) -> InMemoryIssueRepository.createIssue(command) -> CreateIssueResult`

На уровне EPIC-00 `createIssue` может быть локальным. Внешняя персистентность добавляется в EPIC-05/EPIC-10/EPIC-11 через замену реализации репозитория/адаптера.

---

## 4) MVP Decision Points (аналитический слой EPIC-00)

Ниже точки, где без явного выбора контракт начинает "плыть" между EPIC-00/09/10/11.

### D1. Где нормализовать intake: в фасаде или в Edge?

**Варианты:**

1. Нормализация в `issueService` (SPA)
2. Нормализация только в Edge ingest
3. Двухступенчатая: lightweight в SPA + canonical в Edge

**Рекомендация для MVP:** вариант 3.

- SPA: базовая нормализация формата (`time` aliases, trim, безопасные дефолты) для предсказуемых локальных тестов.
- Edge: authoritative нормализация и валидация перед hash/dedup/mint.

**Почему:** сохраняем тестируемость в EPIC-00 и не переносим trust/безопасность на клиент.

### D2. Семантика `createIssue`: команда или payload?

**Варианты:**

1. Принимать raw intake payload
2. Принимать нормализованный command

**Рекомендация для MVP:** вариант 2 (`CreateIssueCommand`), raw intake держать отдельным типом.

**Почему:** контракт UI и write-path стабилен; mapping из GPT не "протекает" в репозитории.

### D3. Идемпотентность в контракте: bool-флаг или тип результата?

**Варианты:**

1. Только `duplicate: boolean`
2. Расширенный `CreateIssueResult` с `existing_issue_id`, `content_hash`, `status`

**Рекомендация для MVP:** вариант 2.

**Почему:** UI/оркестрация сразу понимают, был ли re-use existing issue, и могут корректно отрисовать результат без повторных запросов.

### D4. Генерация `content_hash`: SPA или Edge?

**Варианты:**

1. Только Edge
2. SPA + Edge

**Рекомендация для MVP:** вариант 2 (SPA preview hash + Edge final hash).

**Почему:** developer ergonomics и предсказуемые тесты в EPIC-00; при этом финальный source of truth остаётся за Edge.

### D5. Ошибки контракта: исключения vs типизированный error result?

**Варианты:**

1. throw exceptions
2. `Result<T, E>` / типизированный error envelope

**Рекомендация для MVP:** начать с контролируемых исключений + минимальный error shape (`code`, `message`, `details?`) и зафиксировать в фасаде.

**Почему:** быстрее запуск, меньше инфраструктурной сложности; легко эволюционировать в typed-result в Phase 2.

---

## 5) Что это даёт для дальнейшей сборки по эпикам

### EPIC-05 (Arweave)

- расширяет create-path: `createIssue` начинает писать артефакты в Arweave через ingest orchestration;
- фасад не меняет контракт, меняется только реализация/оркестрация.

### EPIC-04 (Broadcast)

- добавляет репозиторий, который читает (и при необходимости пишет) Dogeparty broadcast;
- UI всё ещё работает через тот же `issueService`.

### EPIC-10/11 (Edge + Signer)

- фиксируют authoritative validate/normalize/hash/dedup/sign/publish;
- сохраняют contract surface `CreateIssueResult`, согласованный в EPIC-00.

### EPIC-06 (Live updates)

- подписка/поллинг обновляет репозиторий/кеш;
- UI получает свежие данные без смены API.

---

## 6) Критерии валидации "делаем ли то, что нужно"

Чеклист для вашей быстрой проверки:

- [ ] Можно сменить источник данных без изменений в UI-коде.
- [ ] UI знает только про `issueService`, а не про Dogeparty/Arweave.
- [ ] Доменные типы едины (`IntakePayload` отделён от `Command`) и используются репозиторием и фасадом.
- [ ] In-memory реализация позволяет разрабатывать и тестировать логику без внешней сети.
- [ ] Контракт `CreateIssueResult` покрывает dedup/idempotency сценарии.
- [ ] EPIC-04/05/10/11 добавляются как адаптеры/оркестраторы, а не ломают контракт.

Если все пункты истинны — архитектура соответствует вашему запросу про "SPA как front/back по функционалу".

---

## 7) Статус фрагментов (дорожная карта документа)

| Фрагмент | Эпик | Статус |
|---|---|---|
| Domain + Repository + Facade | EPIC-00 | **описано** |
| SPA foundation (build/routing/deploy) | EPIC-02 | в работе |
| Broadcast adapter | EPIC-04 | запланировано |
| Arweave write path + submit | EPIC-05 | запланировано |
| Live subscription | EPIC-06 | запланировано |
| UI board | EPIC-03 | запланировано |
| Visual system integration | EPIC-01 | запланировано |

