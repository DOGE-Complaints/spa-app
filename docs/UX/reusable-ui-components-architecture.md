# Reusable UI Components Architecture (EPIC-03)

**Status:** persistent architecture doc  
**Scope:** `EPIC-03` full UI surface (`M01..M20`)  
**Purpose:** единый каркас реюзабл-компонентов для board/details, без дублирования и без двусмысленностей.
**Decision link:** `docs/analysis/EPIC-03-componentization-decision.md`

---

## 1) Audit вывод (критичное)

На текущем этапе в документации хорошо покрыты screens/states, но компонентный каркас ранее не был собран в единый контракт. Риск без архитектуры:
- дублирование верстки между stories;
- конфликт ownership между `empty-states` и `service-integration`;
- повторная переразметка shell на каждом таске.

Этим документом фиксируется целевая компонентная архитектура как SSOT.

**Фактический MVP (2026-06-17):** L3 `StatusBadge`, `StatusFilter`/`TypeFilter`/`LabelsFilter`, `InstitutionFilter`/`DateRangeFilter`/`GeoFilter`, `FilterPanel`, `ActiveFilterChips`, `ResetFiltersControl`, `SearchInput`; hook `useBoardFilterDraft` ([`src/hooks/useBoardFilterDraft.js`](../../src/hooks/useBoardFilterDraft.js)); state SSOT [`boardFilterState.js`](../../src/router/boardFilterState.js) + [`boardQuery.js`](../../src/router/boardQuery.js). L2 `IssueCard`, L4 `EmptyState`; `AppShell` — inline в `BoardPage`/`IssuePage` (G8 backlog).

> **Статус реализации (2026-06-12):** не выполнено — gap G8 (AppShell refactor).  
> Backlog: [STORY-SPA-G8-app-shell-refactor](../tasks/backlog-stories/STORY-SPA-G8-app-shell-refactor.md)

> **Статус реализации (2026-06-12):** не выполнено — gap G4 (design tokens L0).  
> Backlog: [STORY-SPA-G4-design-tokens-foundation](../tasks/backlog-stories/STORY-SPA-G4-design-tokens-foundation.md)

---

## 2) Принципы архитектуры

1. **Shell-first:** общий app-shell (header/sidebar/content) единый для board/details.
2. **State as component:** loading/empty/error/not-found реализуются отдельными реюзабл-компонентами.
3. **Data-agnostic UI:** компоненты не знают про репозитории, только про props/contract.
4. **I18n-aware by default:** текст и labels проходят через i18n слой, без runtime переводов.
5. **Enum-safe rendering:** domain enum (`IN_REVIEW`) отделен от display label (`IN REVIEW`).

---

## 3) Слои компонентов

### L0 — Foundations

- Токены, цвета, spacing, typography.
- Глобальные utility classes.
- Иконки/ассеты (`Logo-Big.png`, verified marker).

### L1 — Layout / Shell

- `AppShell`
- `HeaderStrip`
- `SidebarNav`
- `BoardContentLayout`
- `DetailsContentLayout`

### L2 — Domain UI blocks

- `BoardToolbar`
- `BoardColumns`
- `BoardColumn`
- `IssueCard`
- `IssueDetailsView`
- `IssueMetadataBlock`

### L3 — Controls / atoms

- `StatusBadge`
- `TypeChip`
- `LabelChip`
- `SearchInput`
- `FilterStatusControl`
- `FilterTypeControl`
- `FilterLabelsControl`
- `ResetFiltersControl`
- `LanguageSelector`

### L4 — State components

- `SkeletonCard`
- `BoardLoadingState`
- `BoardNoIssuesState`
- `BoardNoResultsState`
- `BoardLoadErrorState`
- `IssueNotFoundState`
- `IssueLoadErrorState`

---

## 4) Компонентный каталог (ownership)

| Component | Responsibility | Owner story |
|---|---|---|
| `AppShell` | общий каркас board/details | `S03-1A` |
| `HeaderStrip` | logo + synced + locale trigger | `S03-1A`, `S03-7`, `S03-10` |
| `SidebarNav` | nav items + active marker | `S03-1A` |
| `BoardToolbar` | search/filters/create zone layout | `S03-1A`, `S03-3`, `S03-8` |
| `BoardColumns` | 4-column structure | `S03-1A` |
| `StatusBadge` | status enum -> display + style | `S03-1B` |
| `IssueCard` | card content + interaction states | `S03-2` |
| `Filter*Control` | status/type/labels/institution/date/geo in `FilterPanel` (batch apply) | SEARCH-02, SEARCH-04, SEARCH-05 |
| `FilterPanel` | collapsible panel + extension slots (`institution`/`date`/`geo`) | [`FilterPanel.jsx`](../../src/components/Filters/FilterPanel.jsx) |
| `ActiveFilterChips` | applied filter chips with immediate remove | [`ActiveFilterChips.jsx`](../../src/components/Filters/ActiveFilterChips.jsx) |
| `InstitutionFilter` | single-select institution from loaded issues (D-S8); `?institution=` | [`InstitutionFilter.jsx`](../../src/components/Filters/InstitutionFilter.jsx) — [SEARCH-04](../../tasks/epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-04-institution-date-filters/STORY-SPA-SEARCH-04-institution-date-filters.md) |
| `DateRangeFilter` | created_at from/to (`?created_after=` / `?created_before=`) | [`DateRangeFilter.jsx`](../../src/components/Filters/DateRangeFilter.jsx) — SEARCH-04 |
| `GeoFilter` | admin geo dimensions from loaded issues (D-S8); multi-value OR per dimension; `?geo_*=` CSV | [`GeoFilter.jsx`](../../src/components/Filters/GeoFilter.jsx) — [SEARCH-05](../../tasks/epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-05-geo-filter/STORY-SPA-SEARCH-05-geo-filter.md); helpers [`collectGeoAdminOptionsFromIssues.js`](../../src/i18n/collectGeoAdminOptionsFromIssues.js), [`normalizeGeoToken.js`](../../src/i18n/normalizeGeoToken.js); panel slot `data-slot="geo"` |
| `SearchInput` | board toolbar text search (`?search=` debounced); cross-locale match; clear button | [`SearchInput.jsx`](../../src/components/Filters/SearchInput.jsx) — [SEARCH-03](../../tasks/epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-03-cross-language-search-input/STORY-SPA-SEARCH-03-cross-language-search-input.md) |
| `ResetFiltersControl` | global clear (toolbar + panel footer + no-results) | SEARCH-02 |
| `IssueDetailsView` | read-only details screen | `S03-4` |
| `IssueMetadataBlock` | metadata variants full/partial/minimal | `S03-4` |
| `*State` components | all loading/empty/error variants | `S03-6` |
| `BrandElements` | verified icon, brand style | `S03-7` |
| `CreateIssueEntry` | CTA to Custom GPT | `S03-8` |
| `RoutingStateGlue` | url-state parse/serialize | `S03-9` |
| `I18nProvider + LanguageSelector` | locale detect/store/switch | `S03-10` |

---

## 5) Contracts (без трактовок)

### 5.1 Status contract

- Domain enum: `NEW`, `VERIFIED`, `IN_REVIEW`, `ARCHIVED`.
- EN display labels: `NEW`, `VERIFIED`, `IN REVIEW`, `ARCHIVED`.
- Status UI i18n labels берутся из словаря, enum значения не переводятся в данных.

### 5.2 Content contract

- `title`, `description`: `LocalizedText` (`{et,ru,en}`) или transitional string.
- Resolver fallback: `et -> ru -> en`.
- В одном поле язык не смешивается.

### 5.3 Labels contract

- Data: canonical keys (`bureaucracy`, `infrastructure`, ...).
- UI: dictionary mapping per locale.

---

## 6) Screen composition

### Board (`/#/board`)

`AppShell`
-> `HeaderStrip`
-> `SidebarNav`
-> `BoardContentLayout`
-> `BoardToolbar` (`SearchInput`, `Filter*Control`, `ResetFiltersControl`, `CreateIssueEntry`)
-> `BoardColumns` (`BoardColumn` + `IssueCard`/`SkeletonCard`)
-> `BoardFooter`

### Details (`/#/issue/:id`)

`AppShell`
-> `HeaderStrip`
-> `SidebarNav`
-> `DetailsContentLayout`
-> `IssueDetailsView`
-> `IssueMetadataBlock`

---

## 7) State ownership policy

- `S03-6` поставляет только UI-компоненты состояний (без fetch lifecycle).
- `S03-5` управляет lifecycle (`loading/success/error`) и подключает state-компоненты.
- `S03-3` владеет filter UI + query state.
- `S03-9` владеет routing contract и URL-state glue.

---

## 8) Traceability to mockups

- Shell/layout: `M01`, `M19`
- Header lang open: `M20`
- Status system: `M03`
- Card + states: `M02`, `M04`
- Board states: `M05`, `M06`, `M07`, `M08`
- Details + metadata: `M09`, `M14`, `M18`
- Filters: `M10`, `M11`, `M12`, `M13`
- Routing behavior: `M15`
- Field mapping: `M16`
- I18n behavior: `M17`

---

## 9) Implementation guardrails

1. Не добавлять data source logic внутрь UI-компонентов.
2. Не дублировать header/sidebar между board/details.
3. Не использовать raw status labels в компонентах (только enum + mapper).
4. Не вводить runtime translation.
5. Не смешивать responsibilities `S03-6` и `S03-5`.

---

## 10) Что это меняет в текущем процессе

- `S03-1A` временно paused до согласования этого документа.
- После согласования:
  1. finalize decision points,
  2. solution architecture,
  3. implementation plan,
  4. resume `S03-1A` по run-task.
