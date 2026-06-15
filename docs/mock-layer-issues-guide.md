# Инструкция: Mock-слой для Issues

**Статус:** persistent reference  
**Область:** `spa-app`, EPIC-03  
**Связано:** `docs/i18n-architecture.md`, `docs/domain-facade-contract.md`, `mockup-16-data-annotation-overlay-spec.md`

> **Статус реализации (2026-06-12):** соответствует коду (MVP). Gap G11 закрыт документально — канон моков: `src/router/mockIssues.js`.

> **Статус реализации (2026-06-12):** соответствует коду (MVP). Gap G2 закрыт — `labels.*` в [`dictionaries.js`](../src/i18n/dictionaries.js), SSOT ключей [`labelKeys.js`](../src/i18n/labelKeys.js) ([STORY-SPA-G2](tasks/epics/EPIC-SPA-01-labels-i18n-dictionary/stories/STORY-SPA-G2-labels-i18n-dictionary/STORY-SPA-G2-labels-i18n-dictionary.md), pkg-000002).

---

## 1. Где хранятся моки

| Что | Путь |
|-----|------|
| **Список моков** | `src/router/mockIssues.js` |
| **Константа** | `ROUTING_DEMO_ISSUES` (Object.freeze) |
| **Потребление** | `src/services/issueService.js` (ветка `FAKE-OLD`) → `createInMemoryIssueRepository([...ROUTING_DEMO_ISSUES])` |

Цепочка в mock-режиме: `mockIssues.js` → `issueService` (`VITE_LIFE_REALITY_MODE=FAKE-OLD`) → `InMemoryIssueRepository` → BoardPage / IssuePage.

Если `VITE_LIFE_REALITY_MODE=GFL-DRIVEN`, данные берутся не из mock-слоя, а через `GatewayIssueRepository`.

---

## 2. Структура одного Issue (мок)

### Обязательные поля

| Поле | Тип | Пример |
|------|-----|--------|
| `id` | `string` | `'DE-001'` |
| `status` | `ISSUE_STATUS` | `ISSUE_STATUS.NEW`, `ISSUE_STATUS.VERIFIED`, `ISSUE_STATUS.IN_REVIEW`, `ISSUE_STATUS.ARCHIVED` |
| `type` | `ISSUE_TYPE` | `ISSUE_TYPE.COMPLAINT`, `ISSUE_TYPE.OBSERVATION`, `ISSUE_TYPE.ABSURDITY`, `ISSUE_TYPE.SYSTEM_BUG` |
| `labels` | `string[]` | `['bureaucracy', 'infrastructure']` |
| `title` | `{ et: string, ru: string, en: string }` | см. ниже |
| `summary` | `{ et: string, ru: string, en: string }` | **Опционально.** Краткий текст для карточки. Если нет — используется `title`. |
| `description` | `{ et: string, ru: string, en: string }` | Полный текст для страницы деталей. |

### Опциональные поля

| Поле | Тип | Правило |
|------|-----|---------|
| `institution` | `{ et: string, ru: string, en: string }` | **Опционально.** Инстанция/ведомство. Показывается в metadata на странице деталей. |
| `created_at` | `string` (ISO 8601) | Можно добавить, если нужна дата. Пример: `'2025-02-01T12:00:00Z'` |
| `arweave_txid` | `string` | Только если есть реальное значение. **Не подставлять фиктивные значения.** |
| `image_txid` | `string` | Аналогично. |
| `image_hash` | `string` | Аналогично. |

---

## 3. Контент на трёх языках (title, summary, description, institution)

`title`, `summary`, `description`, `institution` задаются как объект с ключами `et`, `ru`, `en`:

```js
import { ISSUE_STATUS, ISSUE_TYPE } from '../domain/types.js'

{
  id: 'DE-001',
  status: ISSUE_STATUS.VERIFIED,
  type: ISSUE_TYPE.COMPLAINT,
  labels: ['pensions', 'social'],
  title: {
    et: 'Pensionide indekseerimine ja tegelikud kulud',
    ru: 'Пенсионная индексация и реальные расходы',
    en: 'Pension indexation and real expenses',
  },
  summary: {
    et: 'Pension tõusis, kuid kommunaalid ja ravimid kallinesid. Palun selgitada indekseerimise arvutust.',
    ru: 'Пенсия выросла, но выросли коммунальные и лекарства. Прошу разъяснить учёт реальных расходов.',
    en: 'Pension increased but utilities and medicine costs rose. Request for clarification on real expenses.',
  },
  description: {
    et: 'Sain teate pensioni tõusust, kuid samas tõusid kommunaalmaksud ja ravimite hind...',
    ru: 'Я получила уведомление о повышении пенсии, но при этом выросли коммунальные...',
    en: 'I received notice of a pension increase, but utility bills and medicine costs also rose...',
  },
  institution: {
    et: 'Sotsiaalkindlustusamet',
    ru: 'Sotsiaalkindlustusamet',
    en: 'Social Insurance Board',
  },
  created_at: '2025-01-15T10:00:00Z',
}
```

- **Карточка:** `resolveLocalizedText(issue.summary ?? issue.title)`
- **Страница деталей:** `resolveLocalizedText(issue.description)`; `institution` — в блоке metadata.

---

## 4. Как добавить новый мок

### Шаг 1. Открыть `src/router/mockIssues.js`

### Шаг 2. Добавить объект в массив `ROUTING_DEMO_ISSUES`

```js
{
  id: 'DE-XXX',
  status: ISSUE_STATUS.NEW, // или VERIFIED, IN_REVIEW, ARCHIVED
  type: ISSUE_TYPE.COMPLAINT, // или OBSERVATION
  labels: ['bureaucracy'], // см. Шаг 3
  title: { et: '...', ru: '...', en: '...' },
  summary: { et: '...', ru: '...', en: '...' },  // кратко для карточки
  description: { et: '...', ru: '...', en: '...' },
  institution: { et: '...', ru: '...', en: '...' }, // опционально
  created_at: '2025-XX-XXT00:00:00Z',
},
```

### Шаг 3. Новые labels

Если используете новый label (например `'healthcare'`):

1. Добавить его в `AVAILABLE_LABELS` в `src/pages/BoardPage.jsx`:

   ```js
   const AVAILABLE_LABELS = ['bureaucracy', 'infrastructure', 'healthcare', 'новый_ключ']
   ```

2. Labels в моках — строковые ключи; UI показывает их в фильтре и на карточке как есть (uppercase).

3. Переводимые названия labels — через `labels.*` в `UI_DICTIONARY` (`src/i18n/dictionaries.js`); ключи — [`labelKeys.js`](../src/i18n/labelKeys.js); product SSOT — [label-taxonomy-G2-approved.md](analysis/label-taxonomy-G2-approved.md).

---

## 5. Чего не делать

| Действие | Почему |
|----------|--------|
| Подставлять `arweave_txid`, `image_txid`, `image_hash` «на всякий случай» | M16: не показываем фиктивные значения в UI. |
| Писать `title`/`description` как одну строку | Контент всегда i18n-объект `{ et, ru, en }`. |
| Добавлять label в мок без добавления в `AVAILABLE_LABELS` | Фильтр по labels не покажет его в выпадающем списке. |
| Менять `findDemoIssueById` для получения данных | Используется `issueService.getIssue(id)`; моки — только seed для `InMemoryIssueRepository`. |

---

## 6. Референс: полный пример

```js
import { ISSUE_STATUS, ISSUE_TYPE } from '../domain/types.js'

export const ROUTING_DEMO_ISSUES = Object.freeze([
  {
    id: 'DE-001',
    status: ISSUE_STATUS.VERIFIED,
    type: ISSUE_TYPE.COMPLAINT,
    labels: ['pensions', 'social'],
    title: { et: '...', ru: '...', en: '...' },
    summary: { et: '...', ru: '...', en: '...' },
    description: { et: '...', ru: '...', en: '...' },
    institution: { et: 'Sotsiaalkindlustusamet', ru: '...', en: '...' },
    created_at: '2025-01-15T10:00:00Z',
  },
  {
    id: 'DE-002',
    status: ISSUE_STATUS.NEW,
    type: ISSUE_TYPE.COMPLAINT,
    labels: ['education', 'language'],
    title: { et: '...', ru: '...', en: '...' },
    summary: { et: '...', ru: '...', en: '...' },
    description: { et: '...', ru: '...', en: '...' },
    institution: { et: 'Haridus- ja Teadusministeerium', ru: '...', en: '...' },
    created_at: '2025-01-18T14:30:00Z',
  },
  // ... всего 12 issues (DE-001 … DE-012) — канонический источник: src/router/mockIssues.js ROUTING_DEMO_ISSUES
])
```

---

## 7. Проверка

```bash
cd spa-app
npm run test -- --run
npm run dev
```

Моки применяются через `InMemoryIssueRepository`; UI читает данные только через `issueService.getIssues()` и `issueService.getIssue(id)`.
