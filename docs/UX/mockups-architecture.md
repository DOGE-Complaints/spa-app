🔵 L1 — Canon Layout Mockups (структурные)

Это high-level экраны без глубоких состояний.

1. Board — Default Layout

/#/board

Фиксируем:

Header

Sidebar

Filters panel

Issue list region

CTA “Create Issue”

Сетка карточек

Иерархию визуального веса

Цель:
Зафиксировать layout grid и приоритет зон.

2. Issue Details — Default Layout

/#/issue/:id

Фиксируем:

Back affordance

Header block

Body block

Metadata block

Вертикальную иерархию

Цель:
Зафиксировать информационную структуру.

🟡 L2 — Screen State Mockups (обязательные для DoR)
A. Board states
3. Board — default (with populated issues)
4. Board — no-issues

Пустая система.
Empty state narrative.
Без CTA в empty-блоке (по канону).

5. Board — no-results

Фильтры применены.
UI показывает “ничего не найдено”.

6. Board — load-error

Ошибка загрузки broadcast / arweave.
Retry affordance (инженерный, не эмоциональный).

7. Board — loading

Skeleton cards.
Skeleton filters (если необходимо).

B. Issue Details states
8. Issue Details — default
9. Issue Details — loading

Header skeleton.
Body skeleton.
Metadata skeleton.

10. Issue Details — not-found

Некорректный ID.
Инженерная формулировка.
Не “Oops”.

11. Issue Details — load-error

Ошибка получения issue.

🟠 L3 — Component State Sheets (атомарные)

Это отдельные страницы Figma.

12. CTA “Create Issue”

Состояния:

default

hover

active

disabled (URL не задан)

Важно:

disabled визуально читаем

не превращается в primary aggressive button

13. Filter Controls

Каждый тип:

status

type

labels

Состояния:

default

hover

selected

disabled

Плюс:

reset action state

14. Issue Card

Состояния:

default

hover

focus (keyboard)

selected (если есть)

loading skeleton variant

Фиксируем:

расположение ID

status badge

labels

optional description preview (если есть)

15. Status Badges

Отдельный sheet:

NEW

VERIFIED

IN_REVIEW

ARCHIVED

Для каждого:

default

на тёмном фоне

в disabled-сценарии

Важно:
VERIFIED вторичен.
Не ярче NEW.

16. Metadata Block (Details)

Варианты:

полный набор полей

только required

только часть optional

Проверка:
if present / if absent.

🔴 L4 — Data & Conditional Logic Sheets (инженерный уровень)

Это часто игнорируют — и потом возникают баги.

17. Field-level Annotation Mockups

На Board:
Подписано:

где Issue.id

где Issue.title

где Issue.type

где Issue.status

где Issue.labels

На Details:
Подписано:

optional: description?

optional: arweave_txid?

optional: image_txid?

optional: created_at?

18. Optional Field Matrix Sheet

Таблица визуальных сценариев:

description	metadata	labels	outcome

Например:

Нет description → body скрывается?

Нет labels → блок скрывается?

Нет metadata → показываем “—”?

Это должен быть отдельный sheet.

19. Routing Behavior Sheet

Сценарии:

Board → Details → Back

Board with filters → Details → Back (сохраняются ли фильтры?)

Direct open /#/issue/42

Invalid ID

Это не визуал, а UX-flow схема.

🟣 L5 — Interaction & Micro-States (опционально, но желательно)
20. Hover & Focus Accessibility Sheet

Keyboard navigation

Focus ring

Tab order

Contrast check

21. Loading Skeleton System

Card skeleton

Header skeleton

Metadata skeleton

В едином стиле.

📦 Минимальный пакет (строго MVP)

Если максимально сжато, но качественно:

Screens (7 required):

Board default

Board no-issues

Board no-results

Board load-error

Issue details default

Issue details not-found

Issue details load-error

Component sheets:

CTA states

Filters states

Issue card states

Status badges

Metadata optional variants

Data annotations:

Field mapping overlay

Optional logic sheet

🧠 Критически важные UX-проверки до разработки

VERIFIED не доминирует.

CTA не выглядит как продуктовый growth-кнопка.

Empty state не нарушает Narrative Rules.

No emotional copy.

Status не зависит только от цвета.

Все optional поля корректно обрабатываются.

---

## Интеграционный лог мокапов (по одному, без смешивания scope)

### M01 — Dashboard Main

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-main.png`
- Детальная спецификация: `docs/UX/mockups/mockup-01-dashboard-main-spec.md`
- Класс мокапа: `L1` (Canon Layout)
- Влияет на задачи:
  - `task-implement-epic03-board-main-visual-parity` (новая)
  - `task-implement-epic03-issue-card-fields`
  - `task-implement-epic03-filters-and-query-state`
  - `task-add-epic03-create-issue-gpt-entrypoint`
  - `task-implement-epic03-branding-and-verified-ui`
- Что фиксируем в SSOT после M01:
  - desktop shell-геометрию;
  - иерархию зон и колонок;
  - dark palette + accent policy;
  - baseline для visual regression в Puppeteer.

### M02 — Dashboard Issue Card

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-card.png`
- Детальная спецификация: `docs/UX/mockups/mockup-02-dashboard-card-spec.md`
- Класс мокапа: `L3` (Component State/Structure baseline для IssueCard)
- Влияет на задачи:
  - `task-implement-epic03-issue-card-fields`
  - `task-implement-epic03-branding-and-verified-ui`
  - `task-implement-epic03-board-main-visual-parity`
- Что фиксируем в SSOT после M02:
  - структуру и ритм `IssueCard`;
  - порядок и визуальный вес полей `id/status/title/labels/date`;
  - card-footer copy внутри рамки;
  - правило: внешняя подпись под карточкой относится к dashboard footer (`M01`), не к card component.

### M03 — Status Badge System

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-status-badge.png`
- Детальная спецификация: `docs/UX/mockups/mockup-03-status-badge-spec.md`
- Класс мокапа: `L3` (Component system sheet)
- Влияет на задачи:
  - `task-implement-epic03-status-badge-system` (новая)
  - `task-implement-epic03-issue-card-fields`
  - `task-implement-epic03-branding-and-verified-ui`
- Что фиксируем в SSOT после M03:
  - единый контракт статусов для badge-компонента;
  - визуальную иерархию `NEW/VERIFIED/IN_REVIEW/ARCHIVED`;
  - правило `VERIFIED`: акцентный, но вторичный;
  - исключение footer-текстов из scope компонента.

### M04 — Issue Card Interaction States

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-status-card-hover.png`
- Детальная спецификация: `docs/UX/mockups/mockup-04-issue-card-interaction-states-spec.md`
- Класс мокапа: `L3` (Component interaction states)
- Влияет на задачи:
  - `task-implement-epic03-issue-card-fields` (основной scope)
  - `task-implement-epic03-board-main-visual-parity`
  - `task-implement-epic03-status-badge-system`
- Решение по декомпозиции:
  - отдельный task не создаем, так как state-sheet напрямую входит в `S03-2` и не расширяет его за пределы атомарного scope карточки.
- Что фиксируем в SSOT после M04:
  - каноничные interaction states карточки (`default/hover/focus/selected`);
  - приоритет `focus > hover` и совместимость `selected + focus`;
  - исключение нижних подпишей/футеров из scope мокапа.

### M05 — Dashboard Loading

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-loader.png`
- Детальная спецификация: `docs/UX/mockups/mockup-05-dashboard-loading-spec.md`
- Класс мокапа: `L2` (Screen State Mockup)
- Влияет на задачи:
  - `task-add-epic03-empty-states` (расширяем до empty/loading/error)
  - `task-implement-epic03-issue-service-integration`
  - `task-implement-epic03-board-main-visual-parity`
- Решение по декомпозиции:
  - новый task не создаем, loading-state логически входит в state-pack board и должен идти рядом с empty/error.
- Что фиксируем в SSOT после M05:
  - структура board во время loading без layout shift;
  - skeleton-card как обязательный placeholder вместо issue-card;
  - отделение loading от empty/error по визуальной семантике.

### M06 — Dashboard No-Issues

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-empty.png`
- Детальная спецификация: `docs/UX/mockups/mockup-06-dashboard-no-issues-spec.md`
- Класс мокапа: `L2` (Screen State Mockup)
- Влияет на задачи:
  - `task-add-epic03-empty-states`
  - `task-implement-epic03-issue-service-integration`
  - `task-implement-epic03-board-main-visual-parity`
- Решение по декомпозиции:
  - новый task не создаем, так как `no-issues` — часть того же state-pack, что и `loading/no-results/load-error`.
- Что фиксируем в SSOT после M06:
  - post-load empty state с централизованным neutral empty-block;
  - четкое различение `loading` vs `no-issues` vs `no-results`;
  - правило без дополнительного CTA внутри empty-блока.

### M07 — Dashboard No-Results (Filters Applied)

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filters-empty.png`
- Детальная спецификация: `docs/UX/mockups/mockup-07-dashboard-no-results-spec.md`
- Класс мокапа: `L2` (Screen State Mockup)
- Влияет на задачи:
  - `task-implement-epic03-filters-and-query-state`
  - `task-add-epic03-empty-states`
  - `task-implement-epic03-issue-service-integration`
- Решение по декомпозиции:
  - новый task не создаем, `no-results` — часть того же state-pack board.
- Что фиксируем в SSOT после M07:
  - состояние filtered-empty с явным контекстом активных фильтров;
  - secondary affordance `Reset Filters`;
  - правило оценки по рабочей области board, не по вариативной шапке.

### M08 — Dashboard Load-Error

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-loading-error.png`
- Детальная спецификация: `docs/UX/mockups/mockup-08-dashboard-load-error-spec.md`
- Класс мокапа: `L2` (Screen State Mockup)
- Влияет на задачи:
  - `task-add-epic03-empty-states`
  - `task-implement-epic03-issue-service-integration`
  - `task-implement-epic03-board-main-visual-parity`
- Решение по декомпозиции:
  - новый task не создаем, `load-error` — часть того же state-pack (`loading/no-issues/no-results/load-error`).
- Что фиксируем в SSOT после M08:
  - `load-error` с централизованным error-block и `Retry`;
  - визуальное отделение error от loading/empty;
  - правило проверки по рабочей области, без учета header-вариативности.

### M09 — Issue Details Main (Read-Only)

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Issue-main.png`
- Детальная спецификация: `docs/UX/mockups/mockup-09-issue-details-main-spec.md`
- Класс мокапа: `L1/L2` (Details default screen)
- Влияет на задачи:
  - `task-implement-epic03-issue-details-route`
  - `task-implement-epic03-issue-service-integration`
  - `task-implement-epic03-status-badge-system`
- Решение по декомпозиции:
  - новый task не создаем, M09 напрямую расширяет спецификацию существующего `S03-4`.
- Что фиксируем в SSOT после M09:
  - read-only details main (`back`, `header`, `body`, `metadata`);
  - правило рендера optional fields;
  - допуск общего shell (header/sidebar) с board-pattern.

### M10 — Dashboard Status Filter Control

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-status.png`
- Детальная спецификация: `docs/UX/mockups/mockup-10-dashboard-filter-status-spec.md`
- Класс мокапа: `L3` (Component state sheet)
- Влияет на задачи:
  - `task-implement-epic03-filters-and-query-state`
  - `task-add-epic03-empty-states`
  - `task-implement-epic03-issue-service-integration`
- Решение по декомпозиции:
  - новый task не создаем, M10 — прямое уточнение существующего `S03-3`.
- Что фиксируем в SSOT после M10:
  - status-filter control с multi-select;
  - режим `Any`, `Clear` и связь с `Reset Filters`;
  - обязательные состояния `default/hover/selected/disabled`.

### M11 — Dashboard Type Filter Control

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-type.png`
- Детальная спецификация: `docs/UX/mockups/mockup-11-dashboard-filter-type-spec.md`
- Класс мокапа: `L3` (Component state sheet)
- Влияет на задачи:
  - `task-implement-epic03-filters-and-query-state`
  - `task-add-epic03-empty-states`
  - `task-implement-epic03-issue-service-integration`
- Решение по декомпозиции:
  - новый task не создаем, M11 — уточнение того же `S03-3` filter-pack.
- Что фиксируем в SSOT после M11:
  - type-filter control (`Any` + single-select values);
  - четкий список MVP типов (`complaint`, `observation`, `absurdity`, `system_bug`);
  - `Clear` type-filter и связь с глобальным `Reset Filters`.

### M12 — Dashboard Labels Filter Control

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-labels.png`
- Детальная спецификация: `docs/UX/mockups/mockup-12-dashboard-filter-labels-spec.md`
- Класс мокапа: `L3` (Component state sheet)
- Влияет на задачи:
  - `task-implement-epic03-filters-and-query-state`
  - `task-add-epic03-empty-states`
  - `task-implement-epic03-issue-service-integration`
- Решение по декомпозиции:
  - новый task не создаем, M12 — часть того же `S03-3` filter-pack.
- Что фиксируем в SSOT после M12:
  - labels-filter control с multi-select и search-in-dropdown;
  - `Clear all` для labels + связь с `Reset Filters`;
  - обязательные состояния `default/hover/selected/disabled`.

### M13 — Dashboard Reset Filters Control

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-reset.png`
- Детальная спецификация: `docs/UX/mockups/mockup-13-dashboard-filter-reset-spec.md`
- Класс мокапа: `L3` (Component state sheet)
- Влияет на задачи:
  - `task-implement-epic03-filters-and-query-state`
  - `task-add-epic03-empty-states`
  - `task-implement-epic03-issue-service-integration`
- Решение по декомпозиции:
  - новый task не создаем, M13 — уточнение global reset внутри существующего `S03-3`.
- Что фиксируем в SSOT после M13:
  - global reset control (`default/hover/disabled`);
  - reset всех фильтров + search;
  - различение global reset и локальных clear-действий.

### M14 — Issue Metadata Variants

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-Issue-metadata.png`
- Детальная спецификация: `docs/UX/mockups/mockup-14-issue-metadata-variants-spec.md`
- Класс мокапа: `L3/L4` (Component state + optional data logic)
- Влияет на задачи:
  - `task-implement-epic03-issue-details-route`
  - `task-implement-epic03-issue-service-integration`
- Решение по декомпозиции:
  - новый task не создаем, M14 — атомарное уточнение metadata-секции в `S03-4`.
- Что фиксируем в SSOT после M14:
  - metadata variants `full/partial/minimal`;
  - conditional rendering optional полей без placeholder-заглушек;
  - вторичную роль `image_hash` в details metadata.

### M15 — Routing Behavior Sheet

- Файл: `docs/UX/mockups/mockup-15-routing-behavior-sheet-spec.md`
- Детальная спецификация: `docs/UX/mockups/mockup-15-routing-behavior-sheet-spec.md`
- Класс мокапа: `L4` (Data & UX flow logic sheet)
- Влияет на задачи:
  - `task-implement-epic03-routing-behavior-sheet` (новая)
  - `task-implement-epic03-filters-and-query-state`
  - `task-implement-epic03-issue-details-route`
- Решение по декомпозиции:
  - создаем отдельный task, потому что это cross-cutting routing contract (board/details/url-state), не только UI конкретного компонента.
- Что фиксируем в SSOT после M15:
  - сценарии A/B/C/D для маршрутизации;
  - стратегию сохранения фильтров в hash query;
  - redirect policy для invalid routes без отдельной 404.

### M16 — Data Annotation Overlay (Field Mapping Sheet)

- Файл: `docs/UX/mockups/mockup-16-data-annotation-overlay-spec.md`
- Детальная спецификация: `docs/UX/mockups/mockup-16-data-annotation-overlay-spec.md`
- Класс мокапа: `L4` (Data mapping & conditional logic)
- Влияет на задачи:
  - `task-implement-epic03-issue-card-fields`
  - `task-implement-epic03-issue-details-route`
  - `task-implement-epic03-issue-service-integration`
- Решение по декомпозиции:
  - новый task не создаем, это cross-reference sheet для уже существующих задач полей и details.
- Что фиксируем в SSOT после M16:
  - board field mapping + явные non-render правила;
  - details field mapping по секциям `header/body/metadata`;
  - единое optional-правило `if present`.

### M17 — I18n Language & Content Behavior Sheet

- Файл: `docs/UX/mockups/mockup-17-i18n-language-and-content-spec.md`
- Детальная спецификация: `docs/UX/mockups/mockup-17-i18n-language-and-content-spec.md`
- Класс мокапа: `L4` (Data/behavior architecture sheet)
- Влияет на задачи:
  - `task-implement-epic03-i18n-foundation-and-switcher` (новая)
  - `task-implement-epic03-issue-card-fields`
  - `task-implement-epic03-issue-details-route`
  - `task-implement-epic03-issue-service-integration`
- Решение по декомпозиции:
  - создаем отдельный task под i18n foundation, потому что это cross-cutting слой (locale detect/store + dictionary + resolver).
- Что фиксируем в SSOT после M17:
  - язык UI и язык content обрабатываются совместно, но разными резолверами;
  - fallback `et -> ru -> en` для UI и content;
  - hash-routing не зависит от переключения языка.

### M18 — Optional Logic Matrix (Details + I18n)

- Файл: `docs/UX/mockups/mockup-18-optional-logic-matrix-spec.md`
- Детальная спецификация: `docs/UX/mockups/mockup-18-optional-logic-matrix-spec.md`
- Класс мокапа: `L4` (Conditional logic matrix)
- Влияет на задачи:
  - `task-implement-epic03-i18n-foundation-and-switcher`
  - `task-implement-epic03-issue-details-route`
  - `task-implement-epic03-issue-service-integration`
- Решение по декомпозиции:
  - новый task не создаем, M18 дополняет уже созданный i18n foundation и details/service задачи.
- Что фиксируем в SSOT после M18:
  - конкретные сценарии optional metadata;
  - fallback matrix для `title/description`;
  - запрет mixed-language и placeholder-заглушек.

### M19 — Header Brand Strip

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-header.png`
- Детальная спецификация: `docs/UX/mockups/mockup-19-header-brand-strip-spec.md`
- Класс мокапа: `L1/L3` (layout strip + component baseline)
- Влияет на задачи:
  - `task-implement-epic03-board-main-visual-parity`
  - `task-implement-epic03-branding-and-verified-ui`
  - `task-implement-epic03-i18n-foundation-and-switcher`
- Решение по декомпозиции:
  - новый task не создаем; header strip распределяется между visual parity + branding + i18n foundation.
- Что фиксируем в SSOT после M19:
  - каноничный header-strip состав (`logo`, `SYNCED`, language trigger);
  - logo asset source: `dist/assets/Logo-Big.png`;
  - размещение locale trigger в right zone header.

### M20 — Header Language Selector (Open State)

- Файл: `docs/UX/mockups/DOGEstonia-Mockup-header-lang.png`
- Детальная спецификация: `docs/UX/mockups/mockup-20-header-language-selector-spec.md`
- Класс мокапа: `L3` (component state sheet)
- Влияет на задачи:
  - `task-implement-epic03-i18n-foundation-and-switcher`
  - `task-implement-epic03-branding-and-verified-ui`
- Решение по декомпозиции:
  - новый task не создаем; это state-уточнение существующего `S03-10`.
- Что фиксируем в SSOT после M20:
  - open/default/selected состояния language selector;
  - строки списка языков и порядок `ET/RU/EN`;
  - route-stable locale switching.