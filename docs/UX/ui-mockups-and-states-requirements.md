# UI Mockups & States Requirements (EPIC-03)

**Scope:** `EPIC-03` UI Dashboard & Issue Board (MVP)  
**Purpose:** SSOT для подготовки детальных мокапов и state-поведения до кодовой реализации.  
**Data alignment source:** `docs/issue-intake-data-model.md` + `src/domain/types.js`.

---

## 1) Роль документа

Этот документ отвечает на 3 вопроса для дизайна и разработки:

1. Какие экраны и фрагменты экрана обязательно нужны для MVP.
2. Какие данные в каждом фрагменте должны отображаться и из какого источника они берутся.
3. Какие состояния (`loading/empty/error/...`) должны быть визуализированы для каждого фрагмента.

Важно:
- SPA в MVP **read-only**.
- Create-flow идет через `Create Issue -> Custom GPT`, без локальной формы submit.

> **Статус реализации (2026-06-12):** соответствует коду (MVP). Gap G9 закрыт документально — CTA всегда активная ссылка на GPT URL (hardcoded в `BoardPage.jsx`).

> **Статус реализации (2026-06-12):** не выполнено — gap G3 (SearchInput в тулбаре).  
> Backlog: [STORY-SPA-G3-search-input-toolbar](../tasks/backlog-stories/STORY-SPA-G3-search-input-toolbar.md)

---

## 2) Data-model сопоставление (Issue vs Intake)

### 2.1 Runtime модель UI (основная)

UI в `EPIC-03` рендерит `Issue`:
- `id`
- `type`
- `title` (`LocalizedText` or transitional string)
- `description?` (`LocalizedText` or transitional string)
- `status`
- `labels`
- `arweave_txid?`
- `image_txid?`
- `image_hash?`
- `created_at?`

### 2.2 Intake модель (контекстная, не runtime submit)

`IssueIntakePayload` из `docs/issue-intake-data-model.md`:
- не рендерится напрямую как submit-форма в SPA;
- влияет на UX/копирайтинг/семантику полей (labels, status copy, metadata expectations);
- используется как справочный контекст для `Create Issue` entrypoint и будущего отображения enriched-полей.

### 2.3 Mapping table (для mockups)

| UI поле | Источник | Обязательность | Где показывать |
|---|---|---|---|
| `Issue.id` | `Issue.id` | required | Board card + Issue details header |
| `Issue.title` | `Issue.title.{et|ru|en}` | required | Board card + Issue details |
| `Issue.type` | `Issue.type` | required | Board card meta + filter chip |
| `Issue.status` | `Issue.status` | required | badge в card/details + status filter |
| `Issue.labels` | `Issue.labels[]` | required | card chips + labels filter |
| `Issue.description` | `Issue.description?.{et|ru|en}` | optional | Issue details body |
| `Issue.arweave_txid` | `Issue.arweave_txid?` | optional | Details metadata block |
| `Issue.image_txid` | `Issue.image_txid?` | optional | Details metadata block |
| `Issue.image_hash` | `Issue.image_hash?` | optional | Details metadata block |
| `Issue.created_at` | `Issue.created_at?` | optional | Board secondary/meta + Details |
| `Create Issue CTA` | external GPT URL contract | required | Board top actions |

---

## 3) Screen-by-screen requirements

### 3.0 Enum Contract (canonical)

- `Issue.status` (domain/API enum): `NEW`, `VERIFIED`, `IN_REVIEW`, `ARCHIVED`.
- UI-display rule: `IN_REVIEW` рендерится как `IN REVIEW` в EN.
- Во всех документах и коде:
  - данные/контракты используют только `IN_REVIEW`;
  - текст на UI может использовать `IN REVIEW` как label.

## 3.1 Screen A — Board (`/#/board`)

### Required fragments

1. **Header / Top bar**
   - Brand: `DOGEstonia` + logo asset from `dist/assets/Logo-Big.png`
   - Read-only sync indicator `SYNCED`
   - Language trigger (`ET/RU/EN`) в header strip

2. **Sidebar**
   - Навигационные пункты (минимум Board, возможно Details return affordance)
   - Активный пункт с явным visual marker

3. **Filters panel**
   - `status` filter
   - `type` filter
   - `labels` filter
   - clear/reset action

Правило для status-filter:
- поддерживает multi-select и режим `Any` (без фильтра);
- различаются `clear status` и `reset all filters`.

Правило для type-filter:
- поддерживает `Any` + `single-select` (`complaint`, `observation`, `absurdity`, `system_bug`);
- различаются `clear type` и `reset all filters`.

Правило для labels-filter:
- поддерживает multi-select по label;
- содержит поиск по label внутри dropdown;
- различаются `clear labels` и `reset all filters`.

Правило для global reset:
- `Reset Filters` очищает все фильтры и search query;
- в состоянии default-filters control должен быть `disabled`.

4. **Issue list / board region**
   - список карточек issue
   - сортировка может быть фиксированной в MVP (без отдельного control)
   - Create Issue action размещается вне header (в board action zone)
5. **Board footer (экранный)**
   - вторичная строка бренда `DOGEstonia — Decentralized Civic Issue Tracker`
   - footer не является частью карточек issue
6. **Header language selector**
   - compact control `ET / RU / EN` in header right zone
   - open-state dropdown по `M20`
   - переключает UI/content без page reload

### Board state matrix

| Fragment | default | hover | active/selected | loading | empty | error | disabled |
|---|---|---|---|---|---|---|---|
| Top CTA `Create Issue` | ✅ | ✅ | ✅ | - | - | - | — (в MVP всегда активная `<a>` на GPT URL) |
| Sidebar item | ✅ | ✅ | ✅ | - | - | - | - |
| Filter control | ✅ | ✅ | ✅ | - | - | - | ✅ |
| Issue list container | ✅ | - | - | ✅ skeleton | ✅ no-issues/no-results | ✅ load-error | - |
| Issue card | ✅ | ✅ | ✅ (focus/selected) | ✅ skeleton-card | - | - | - |

Требование к state precedence для карточки:
- `focus` приоритетнее `hover`;
- `selected` может сочетаться с `focus` (без потери читаемости).

### Empty/error variants (обязательные отдельные мокапы)

- `no-issues`: “данных пока нет”
- `no-results`: “ничего не найдено по текущим фильтрам”
- `load-error`: “ошибка загрузки, retry”
- `loading`: структура board + skeleton cards без реального контента

Правила различения board states:
- `loading`: показываем skeleton-card, данные еще не загружены;
- `no-issues`: загрузка завершена, полный список пуст;
- `no-results`: данные есть, но фильтры дали пустую выборку.
- `load-error`: загрузка завершилась ошибкой, показываем error-block + `Retry`.

Примечание по quality-check:
- для `no-results` оцениваем в первую очередь рабочую область board;
- вариативность header-рендера в генеративных мокапах не используем как SSOT.

---

## 3.2 Screen B — Issue Details (`/#/issue/:id`)

### Required fragments

1. **Back affordance** к Board
2. **Issue header**
   - `id`, `title`, `status`, `type`
3. **Issue body**
   - `description` (если есть)
4. **Metadata block**
   - `labels`
   - `created_at`, `arweave_txid`, `image_txid`, `image_hash` (если есть)
5. **Read-only policy**
   - нет edit controls и нет локального submit/update flow

Примечание по shell:
- default details-экран использует общий app-shell (header/sidebar) по Jira-паттерну;
- валидация M09 идет по основной content area.

Правило для metadata variants:
- metadata следует матрице `full/partial/minimal` из `M14`;
- отсутствующие optional поля скрываются без placeholder-заглушек.

### Details state matrix

| Fragment | default | loading | not-found | error |
|---|---|---|---|---|
| Issue header | ✅ | ✅ skeleton | - | - |
| Issue body | ✅ | ✅ skeleton | - | - |
| Metadata block | ✅ | ✅ skeleton | - | - |
| Details screen container | ✅ | ✅ | ✅ no-such-id | ✅ load-error |

---

## 3.3 Cross-screen interaction rules

- Routing в MVP: только hash-based (`/#/board`, `/#/issue/:id`) без server fallback.
- Переход card -> details: клик по карточке ведет на `/#/issue/:id`.
- Возврат details -> board: `Back to Board` возвращает на `/#/board` с восстановлением filter-state из hash query.
- Strategy: фильтры board сериализуются в URL (`status/type/labels/search`), чтобы direct-open/back работали предсказуемо.
- Direct open details (`/#/issue/:id`) рендерит details сразу, без промежуточного board.
- Некорректный route (например, `/#/unknown`) редиректит на `/#/board` без отдельной 404-страницы.
- Некорректный `issue id` на details дает `not-found` состояние details.

---

## 3.4 I18n behavior rules

- Поддерживаемые UI-языки: `et`, `ru`, `en`.
- Browser detection: `navigator.languages`/`navigator.language`.
- Locale fallback chain: `et -> ru -> en`, default `et`.
- Manual override сохраняется в `localStorage`, без cookies.
- При смене языка:
  - hash route не меняется;
  - UI перерисовывается без reload;
  - `title/description` и текстовые labels/status рендерятся в выбранном locale.
- Content fallback per field: если нет текущего locale, используем `et`, затем `ru`, затем `en`.
- В одном поле не смешиваем языки.

---

## 4) Требования к визуалу и брендингу

- Цвета/типографика/spacing — по `docs/UX/design-system.md`.
- Brand casing в UI: `DOGEstonia`.
- `VERIFIED` визуально вторичен (не доминирует над issue content).
- Без внешних CDN/шрифтов/аналитики.
- Контраст и читаемость соблюдаются в default + hover + disabled состояниях.
- Status-badges используют единый контракт: `NEW`, `VERIFIED`, `IN_REVIEW`, `ARCHIVED`.
- Для `VERIFIED` разрешен doge-marker, но без усиления яркости относительно NEW.

---

## 5) Definition of Ready для handoff мокапов

## 5.1 Минимальный пакет экранов

- [ ] Board default
- [ ] Board no-issues
- [ ] Board no-results
- [ ] Board load-error
- [ ] Issue details default
- [ ] Issue details not-found
- [ ] Issue details load-error

## 5.2 Компонентные state sheets

- [ ] CTA `Create Issue` (`default/hover/active` — disabled не используется в MVP)
- [ ] Filter controls (`default/hover/active/disabled`)
- [ ] Issue card (`default/hover/selected/loading`)
- [ ] Status badges (`NEW/VERIFIED/IN_REVIEW/ARCHIVED`)
- [ ] Status filter dropdown (`default/hover/multi-select/disabled`)
- [ ] Type filter dropdown (`default/hover/selected/disabled`)
- [ ] Labels filter dropdown (`default/hover/multi-select+search/disabled`)
- [ ] Reset filters control (`default/hover/disabled`)
- [ ] Issue metadata variants (`full/partial/minimal`)
- [ ] Routing behavior sheet (`board<->details`, `direct-open`, `invalid-route`)
- [ ] Language selector (`ET/RU/EN`, instant switch, no reload)
- [ ] Header strip (`logo + SYNCED + locale trigger`)
- [ ] Language selector open state (`ET Eesti`, `RU Русский`, `EN English`)

## 5.3 Data annotations в макетах

- [ ] Для каждого блока подписано, какое поле `Issue` там рендерится.
- [ ] Optional-поля помечены как conditional (`if present`).
- [ ] Отдельно зафиксировано, что `IssueIntakePayload` не означает локальную submit-форму.
- [ ] Board overlay фиксирует исключения: `description/arweave_txid/image_txid/image_hash` не рендерятся в card.
- [ ] Details overlay фиксирует mapping для `header/body/metadata` и optional policy.
- [ ] I18n overlay фиксирует UI/content fallback и язык хранения в localStorage.
- [ ] Optional logic matrix фиксирует `metadata` + `localized content` fallback сценарии.

---

## 6) Что разработка берет из мокапов

- layout grid и приоритет визуальных зон;
- field-level mapping (что и где показывается);
- правила отображения optional данных;
- state matrix для каждого фрагмента;
- CTA contract (`Create Issue -> Custom GPT URL`);
- copy для empty/error состояний.

---

## 7) Связанные документы

- `docs/epics/EPIC-03-issue-board-mvp.md`
- `docs/UX/design-system.md`
- `docs/UX/reusable-ui-components-architecture.md`
- `docs/domain-facade-contract.md`
- `docs/issue-intake-data-model.md`
- `docs/i18n-architecture.md`

---

## 8) Интегрированные мокапы (итеративный процесс)

### Mockup 01 — Dashboard Main (Board default)

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-main.png`
- Спецификация: `docs/UX/mockups/mockup-01-dashboard-main-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - desktop shell-структура (`top header`, `sidebar`, `toolbar`, `4 columns`);
  - visual hierarchy и dark-mode тональность;
  - базовые токены для фона/панелей/акцентного yellow;
  - правило точности верстки (layout parity + допуски).
- Что еще не покрыто этим мокапом:
  - `loading/empty/error/no-results`;
  - details states (`/#/issue/:id`);
  - компонентные state-sheets для hover/focus/disabled.

### Mockup 02 — Dashboard Issue Card

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-card.png`
- Спецификация: `docs/UX/mockups/mockup-02-dashboard-card-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - каноничная структура `IssueCard` (`meta`, `title`, `labels`, `date`, `card-footer`);
  - field mapping для `Issue.id/status/title/type/labels/created_at`;
  - card-level visual tokens и правила визуального веса;
  - граница между footer карточки и footer экрана.
- Что еще не покрыто этим мокапом:
  - hover/focus/selected/loading state-sheet карточки;
  - поведение карточки в узкой колонке (responsive variants);
  - подробный pattern для optional fields в card-variant.

### Mockup 03 — Status Badge System

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-status-badge.png`
- Спецификация: `docs/UX/mockups/mockup-03-status-badge-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - единая шкала статусов (`NEW`, `VERIFIED`, `IN_REVIEW`, `ARCHIVED`);
  - визуальная иерархия badge states и роль `VERIFIED`;
  - token-orientиры для neutral/muted/accent бейджей;
  - runtime-contract `StatusBadge` + fallback policy.
- Что еще не покрыто этим мокапом:
  - покадровые hover/active анимации;
  - привязка к фильтрам (это отдельный scope);
  - behavior для нестандартных кастомных статусов вне MVP.

### Mockup 04 — Issue Card Interaction States

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-status-card-hover.png`
- Спецификация: `docs/UX/mockups/mockup-04-issue-card-interaction-states-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - состояния `default`, `hover`, `keyboard-focus`, `selected`;
  - визуальные маркеры: focus-ring и selected left-accent;
  - правила приоритета состояний и совместимости `selected + focus`;
  - accessibility требования (`focusable`, `aria-selected` policy).
- Что еще не покрыто этим мокапом:
  - loading skeleton variant карточки;
  - motion/transition timing;
  - поведение multi-select (в MVP не обязателен).

### Mockup 05 — Dashboard Loading

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-loader.png`
- Спецификация: `docs/UX/mockups/mockup-05-dashboard-loading-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - board-shell полностью видим во время загрузки;
  - в колонках отображаются `skeleton-card` блоки вместо real `IssueCard`;
  - loading визуально отличим от empty/error;
  - CTA/filters остаются в предсказуемой позиции.
- Что еще не покрыто этим мокапом:
  - loading details-route (`/#/issue/:id`);
  - спецификация shimmer motion;
  - финальный runtime-policy для статусных счетчиков в момент загрузки.

### Mockup 06 — Dashboard No-Issues

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-empty.png`
- Спецификация: `docs/UX/mockups/mockup-06-dashboard-no-issues-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - `no-issues` как post-load состояние с пустым набором данных;
  - централизованный empty-block (icon + нейтральный текст);
  - отсутствие skeleton и отсутствие error-признаков;
  - правило: дополнительный CTA внутри empty-блока не добавляем.
- Что еще не покрыто этим мокапом:
  - `no-results` вариант при активных фильтрах;
  - `load-error` copy и retry affordance;
  - details-route empty semantics.

### Mockup 07 — Dashboard No-Results (Filters Applied)

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filters-empty.png`
- Спецификация: `docs/UX/mockups/mockup-07-dashboard-no-results-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - `no-results` как состояние с активными фильтрами и пустой выборкой;
  - neutral copy в рабочей области (`No issues match current filters.`);
  - secondary affordance `Reset Filters`;
  - правило: validation по рабочей области, вариативность header игнорируем.
- Что еще не покрыто этим мокапом:
  - стандартизация формата filter chips на уровне design tokens;
  - поведение no-results при частичном оффлайн-кеше;
  - details-route фильтров (в MVP вне scope).

### Mockup 08 — Dashboard Load-Error

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-loading-error.png`
- Спецификация: `docs/UX/mockups/mockup-08-dashboard-load-error-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - `load-error` как отдельный post-fetch state;
  - централизованный error-block (`title`, `description`, `Retry`);
  - `Retry` как secondary action в рабочей области;
  - правило: оценка по рабочей области board, header-вариативность игнорируется.
- Что еще не покрыто этим мокапом:
  - детализация error-code specific copy;
  - retry backoff/limit policy;
  - унификация error-state для details-route.

### Mockup 09 — Issue Details Main (Read-Only)

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Issue-main.png`
- Спецификация: `docs/UX/mockups/mockup-09-issue-details-main-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - default details-view с `Back to Board`, header, body и metadata;
  - read-only характер экрана (без редактирования);
  - правила рендера optional metadata (`if present`);
  - допуск общего shell header/sidebar как на board (Jira-подобно).
- Что еще не покрыто этим мокапом:
  - details loading/not-found/load-error states;
  - поведение длинных текстов (expand/collapse);
  - deep-linking policy для metadata ссылок.

### Mockup 10 — Dashboard Status Filter Control

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-status.png`
- Спецификация: `docs/UX/mockups/mockup-10-dashboard-filter-status-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - status-filter states (`default/hover/selected-multi/disabled`);
  - режим `Any`, multi-select chips и `Clear` внутри контрола;
  - связь с `Reset Filters` как глобальным действием;
  - фокус валидации на toolbar + рабочей области board.
- Что еще не покрыто этим мокапом:
  - детали keyboard interaction matrix для dropdown;
  - точный компонентный выбор реализации (popover/select/listbox);
  - стандартизация текста для локализации.

### Mockup 11 — Dashboard Type Filter Control

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-type.png`
- Спецификация: `docs/UX/mockups/mockup-11-dashboard-filter-type-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - type-filter states (`default/hover/selected/disabled`);
  - `Type: Any` + выбор одного типа (`complaint/observation/absurdity/system_bug`);
  - `Clear` для type-filter и связь с глобальным `Reset Filters`;
  - фокус валидации на toolbar + рабочей области board.
- Что еще не покрыто этим мокапом:
  - локализация значений типов;
  - расширение списка типов за пределы MVP;
  - углубленная keyboard matrix для dropdown.

### Mockup 12 — Dashboard Labels Filter Control

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-labels.png`
- Спецификация: `docs/UX/mockups/mockup-12-dashboard-filter-labels-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - labels-filter states (`default/hover/selected-multi/disabled`);
  - multi-select чекбоксы + `Search labels` внутри dropdown;
  - `Clear all` для labels-filter и связь с глобальным `Reset Filters`;
  - фокус валидации на toolbar + рабочей области board.
- Что еще не покрыто этим мокапом:
  - стратегия компрессии длинного списка выбранных label;
  - sorting/ranking policy списка label;
  - расширенная keyboard matrix dropdown.

### Mockup 13 — Dashboard Reset Filters Control

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-reset.png`
- Спецификация: `docs/UX/mockups/mockup-13-dashboard-filter-reset-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - global `Reset Filters` как отдельный toolbar control;
  - состояния `default/hover/disabled`;
  - reset всех фильтров + search query;
  - отличия от локальных `Clear` действий внутри отдельных фильтров.
- Что еще не покрыто этим мокапом:
  - keyboard shortcuts/undo behavior;
  - детализация локализации текста;
  - telemetry/analytics around reset action.

### Mockup 14 — Issue Metadata Variants

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-Issue-metadata.png`
- Спецификация: `docs/UX/mockups/mockup-14-issue-metadata-variants-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - три варианта metadata (`full`, `partial`, `minimal`);
  - conditional rendering optional-полей (`created_at/arweave_txid/image_txid/image_hash`);
  - правило отсутствия placeholder-заглушек при missing optional;
  - стабилизированный порядок строк metadata.
- Что еще не покрыто этим мокапом:
  - link behavior для txid;
  - форматирование/маскирование hash beyond truncation;
  - details lifecycle states (`loading/not-found/error`).

### Mockup 15 — Routing Behavior Sheet

- Источник: `docs/UX/mockups/mockup-15-routing-behavior-sheet-spec.md`
- Спецификация: `docs/UX/mockups/mockup-15-routing-behavior-sheet-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - сценарии `Board -> Details`, `Details -> Board`, `Direct open details`, `Invalid route`;
  - стратегия URL-state: filters сериализуются в hash query;
  - redirect policy: `/#/unknown` -> `/#/board`;
  - rule: invalid issue id -> details `not-found`.
- Что еще не покрыто этим мокапом:
  - SEO/history оптимизации вне MVP;
  - расширенная стратегия для неизвестных query params beyond ignore;
  - аналитика пользовательских переходов.

### Mockup 16 — Data Annotation Overlay (Field Mapping Sheet)

- Источник: `docs/UX/mockups/mockup-16-data-annotation-overlay-spec.md`
- Спецификация: `docs/UX/mockups/mockup-16-data-annotation-overlay-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - field-level mapping для board card и details (`header/body/metadata`);
  - явные исключения для board (без `description/arweave_txid/image_txid/image_hash`);
  - optional policy `if present` для details;
  - правила читаемости технических аннотаций (тонкие линии, mono-font, light-gray).
- Что еще не покрыто этим мокапом:
  - визуальная стилистика самих UI-компонентов;
  - interaction states/animations;
  - runtime telemetry mapping.

### Mockup 17 — I18n Language & Content Behavior Sheet

- Источник: `docs/UX/mockups/mockup-17-i18n-language-and-content-spec.md`
- Спецификация: `docs/UX/mockups/mockup-17-i18n-language-and-content-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - language policy `et/ru/en` и fallback chain;
  - UI localization + content localization разделены по слоям;
  - language switch без reload и без изменения hash route;
  - fallback для content fields (`title/description`) и non-mixing policy.
- Что еще не покрыто этим мокапом:
  - расширенные ICU/pluralization cases;
  - runtime lazy-loading translation bundles;
  - post-MVP locale expansion beyond `et/ru/en`.

### Mockup 18 — Optional Logic Matrix (Details + I18n)

- Источник: `docs/UX/mockups/mockup-18-optional-logic-matrix-spec.md`
- Спецификация: `docs/UX/mockups/mockup-18-optional-logic-matrix-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - матрица metadata-вариантов (`full/partial/minimal`);
  - матрица fallback для `title/description` (`et -> ru -> en`);
  - transitional compatibility для legacy string-полей;
  - анти-правила: без mixed-language и без placeholder-заглушек.
- Что еще не покрыто этим мокапом:
  - ICU/plural and grammatical gender rules;
  - автоматизированные snapshot matrices в CI;
  - post-MVP locale expansion beyond `et/ru/en`.

### Mockup 19 — Header Brand Strip

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-header.png`
- Спецификация: `docs/UX/mockups/mockup-19-header-brand-strip-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - header strip c `DOGEstonia` brand-block;
  - использование logo asset `dist/assets/Logo-Big.png`;
  - read-only индикатор `SYNCED`;
  - правый language trigger в шапке.
- Что еще не покрыто этим мокапом:
  - runtime логика вычисления `SYNCED`;
  - offline/degraded status variants;
  - header keyboard-nav details.

### Mockup 20 — Header Language Selector (Open State)

- Источник: `docs/UX/mockups/DOGEstonia-Mockup-header-lang.png`
- Спецификация: `docs/UX/mockups/mockup-20-header-language-selector-spec.md`
- Статус интеграции: `active`
- Что зафиксировано:
  - visual open state dropdown для locale selector;
  - список языков `ET Eesti`, `RU Русский`, `EN English`;
  - selected state + route-stable switching behavior.
- Что еще не покрыто этим мокапом:
  - полный keyboard/accessibility contract;
  - motion preferences;
  - расширение locale list beyond MVP.
