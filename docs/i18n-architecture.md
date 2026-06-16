# DOGEstonia SPA I18n Architecture (MVP)

**Status:** persistent architecture spec  
**Scope:** `EPIC-03` UI Dashboard & Issue Board  
**Runtime model:** read-only SPA, no backend session, no cookies

---

## 1) Цель

Зафиксировать базовую мультиязычную архитектуру для MVP:
- локализованный UI (`et`, `ru`, `en`);
- локализованный контент issue без runtime-перевода;
- предсказуемый fallback и отсутствие смешивания языков в одной issue;
- zero-tracking подход (без аналитики/cookies).

---

## 2) Языковая политика (Language Strategy)

### 2.1 Поддерживаемые языки

**Источник истины (SSOT):** реестр `SUPPORTED_LOCALES` в [`src/i18n/core.js`](../src/i18n/core.js) — массив объектов `{ code, endonym, flag, dir }`. Порядок записей задаёт fallback-цепочку UI и контента.

Текущий MVP (3 локали, `dir: 'ltr'`):

| code | endonym | flag |
|---|---|---|
| `et` | Eesti | `/assets/ET.svg` |
| `ru` | Русский | `/assets/RU.svg` |
| `en` | English | `/assets/US.svg` |

Производные экспорты: `LOCALE_CODES`, `DEFAULT_LOCALE` (первая запись реестра), `LOCALE_SELECTOR_OPTIONS` (селектор Board/Issue).

### 2.2 Автовыбор языка

Алгоритм (`resolveLanguage` / `normalizeLocale`):
1. Проверяем `navigator.languages`, затем `navigator.language` (или сохранённый `localStorage`).
2. Для каждого значения ищем префикс, совпадающий с `code` из реестра.
3. Иначе fallback → `DEFAULT_LOCALE` (сейчас `et`).

### 2.3 Ручной выбор и сохранение

- Пользователь может вручную переключать язык.
- Выбор сохраняется в `localStorage` (например, ключ `doge.locale`).
- Cookies не используются.
- Трекинг и аналитика не добавляются.

---

## 3) Разделение уровней i18n

Архитектурная формула:

`i18n(UI) + i18n(Content)`

### 3.1 UI i18n

Локализуются:
- header/sidebar;
- filters и кнопки;
- status labels;
- empty/error/not-found copy;
- metadata labels (`Created`, `Arweave TXID` и т.д.).

### 3.2 Content i18n (Issue payload)

Контент issues хранится сразу в 3 языках.

Пример:

```json
{
  "title": { "et": "...", "ru": "...", "en": "..." },
  "description": { "et": "...", "ru": "...", "en": "..." }
}
```

Это:
- совместимо с read-only/event-sourcing подходом;
- не требует runtime AI-перевода;
- совместимо с Arweave-хранением.

---

## 4) Runtime контракт модели Issue (i18n-aware)

Минимальный целевой контракт (для EPIC-03 UI):

```json
{
  "id": "DE-042",
  "status": "NEW",
  "type": "complaint",
  "labels": ["bureaucracy", "healthcare"],
  "title": { "et": "...", "ru": "...", "en": "..." },
  "description": { "et": "...", "ru": "...", "en": "..." },
  "created_at": "2026-02-01T10:00:00Z",
  "arweave_txid": "...",
  "image_txid": "...",
  "image_hash": "sha256:..."
}
```

Примечание: для backward compatibility допускается временный mixed-режим, где `title/description` еще строка; UI обязан иметь безопасный resolver.

---

## 5) Fallback алгоритмы

### 5.1 Выбор UI language

Реализация: [`resolveLanguage`](../src/i18n/core.js) читает коды из `SUPPORTED_LOCALES`; дефолт — `DEFAULT_LOCALE`.

```js
export function resolveLanguage(browserLanguages = []) {
  for (const locale of normalized) {
    const resolved = normalizeLocale(locale) // prefix match по registry.code
    if (resolved) return resolved
  }
  return DEFAULT_LOCALE
}
```

### 5.2 Выбор локализованного контента

Реализация: [`resolveLocalizedText`](../src/i18n/core.js) — активная локаль, затем `LOCALE_CODES` в порядке реестра.

```js
export function resolveLocalizedText(field, locale) {
  if (!field) return ""
  if (typeof field === "string") return field // transitional compatibility
  if (field[locale]) return field[locale]
  for (const code of LOCALE_CODES) {
    if (field[code]) return field[code]
  }
  return ""
}
```

---

## 6) Правило консистентности контента

- В рамках одного issue на экране показывается один UI-язык.
- Для конкретного текстового поля используется единая fallback-цепочка.
- Смешивание языков в одном поле не допускается.

---

## 7) Labels и Status

### 7.1 Status

- `status` остается enum.
- Канонические enum-значения (данные/API): `NEW`, `VERIFIED`, `IN_REVIEW`, `ARCHIVED`.
- Перевод делается UI-слоем через словарь.
- Правило без двусмысленности: `IN_REVIEW` (enum) -> `IN REVIEW` (EN display label).

Минимальный i18n-словарь статусов:

| Enum | et | ru | en |
|---|---|---|---|
| `NEW` | UUS | НОВОЕ | NEW |
| `VERIFIED` | KINNITATUD | ПОДТВЕРЖДЕНО | VERIFIED |
| `IN_REVIEW` | LÄBIVAATUSEL | НА РАССМОТРЕНИИ | IN REVIEW |
| `ARCHIVED` | ARHIIVIS | В АРХИВЕ | ARCHIVED |

### 7.2 Labels

Для MVP принято:
- хранение labels как canonical key (`"bureaucracy"`, `"healthcare"`),
- отображение через UI dictionary (`label key -> localized label`),
- построение списка фильтра label **из загруженных issues** (L10N-02, D9).

Минимальный контракт label keys (MVP baseline, translated core — `AVAILABLE_LABELS` в [`src/i18n/labelKeys.js`](../src/i18n/labelKeys.js); product SSOT — [label-taxonomy-G2-approved.md](analysis/label-taxonomy-G2-approved.md)):
- `bureaucracy`
- `infrastructure`
- `healthcare`
- `pensions`
- `education`
- `housing`
- `tax`
- `digital`
- `social`
- `language`

> **Статус реализации (2026-06-16):** `AVAILABLE_LABELS` используется как «гарантированно переведённое ядро», а не как источник фильтра доски.

Это проще и чище на MVP, чем хранить i18n-объект внутри каждого label.

> **Статус реализации (2026-06-16):** Gap G2/GL-2 закрыт — `BoardPage` агрегирует `availableLabels` из загруженных issues (union с ядром), UI через `formatLabelKey` ([`labelDisplay.js`](../src/i18n/labelDisplay.js)).

Пример: `t('labels.bureaucracy')` → et `Bürokraatia`, ru `Бюрократия`, en `Bureaucracy`.

---

## 8) UX и размещение language selector

Для MVP размещение:
- **header right zone** (рядом с sync-индикатором).

Причины:
- соответствует каноническому mockup header (`M19`/`M20`);
- делает переключение языка доступным на board/details без доп. скролла;
- сохраняет чистый layout action-зон board.

Формат selector (фактический MVP в коде):
- dropdown с endonym (`Eesti`, `Русский`, `English`) и флагами из реестра (`LOCALE_SELECTOR_OPTIONS`);
- `BoardPage` / `IssuePage` импортируют опции из [`core.js`](../src/i18n/core.js), без локального `LANGUAGE_OPTIONS`;
- без анимаций.

> **Статус реализации (2026-06-16):** L10N-01 — реестр `SUPPORTED_LOCALES` SSOT; селектор и fallback читают из реестра. Мёртвый словарь `languages.*` удалён из `dictionaries.js` (HK-001 closed).

---

## 9) Поведение Dashboard/Details

- Переключение языка выполняется мгновенно без reload.
- Hash-routing не меняется при смене языка.
- Перерисовываются:
  - UI-тексты,
  - `title` / `description` preview,
  - metadata labels,
  - status/label локализация.

---

## 10) Риски и требования к верстке

- Эстонский может давать более длинные строки.
- Кириллица меняет плотность текста в карточках.
- Обязателен стабильный truncation для title/description preview.
- Layout должен выдерживать i18n без reflow-катастроф.

---

## 11) Security/Privacy

- No cookies.
- No analytics.
- No runtime translation services.
- Хранится только `locale` в `localStorage`.

---

## 12) Трассировка в EPIC-03

- `S03-2` Issue card fields (localized title/preview + truncation).
- `S03-3` Filters and query state (localized control labels).
- `S03-4` Issue details route (localized content + metadata labels).
- `S03-5` issueService integration (i18n-aware resolver contract).
- `S03-10` i18n foundation and language switcher (new).
