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

Приоритет fallback chain:
1. `et` (Эстонский)
2. `ru` (Русский)
3. `en` (Английский)

### 2.2 Автовыбор языка

Алгоритм:
1. Проверяем `navigator.languages`, затем `navigator.language`.
2. Если найден префикс `et` -> `et`.
3. Иначе `ru` -> `ru`.
4. Иначе `en` -> `en`.
5. Иначе fallback -> `et`.

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

```js
function resolveLanguage(browserLangs) {
  const normalized = (browserLangs || []).map((l) => String(l).toLowerCase());
  if (normalized.some((l) => l.startsWith("et"))) return "et";
  if (normalized.some((l) => l.startsWith("ru"))) return "ru";
  if (normalized.some((l) => l.startsWith("en"))) return "en";
  return "et";
}
```

### 5.2 Выбор локализованного контента

```js
function resolveLocalizedText(field, lang) {
  if (!field) return "";
  if (typeof field === "string") return field; // transitional compatibility
  if (field[lang]) return field[lang];
  if (field.et) return field.et;
  if (field.ru) return field.ru;
  return field.en || "";
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
- отображение через UI dictionary (`label key -> localized label`).

Минимальный контракт label keys (MVP baseline):
- `bureaucracy`
- `infrastructure`
- `healthcare`
- `road_safety`
- `storm_damage`

Это проще и чище на MVP, чем хранить i18n-объект внутри каждого label.

---

## 8) UX и размещение language selector

Для MVP размещение:
- **header right zone** (рядом с sync-индикатором).

Причины:
- соответствует каноническому mockup header (`M19`/`M20`);
- делает переключение языка доступным на board/details без доп. скролла;
- сохраняет чистый layout action-зон board.

Формат selector:
- компактный dropdown `ET / RU / EN`;
- без флагов;
- без анимаций.

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
