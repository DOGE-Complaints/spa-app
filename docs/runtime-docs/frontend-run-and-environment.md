# spa-app — запуск фронтенда, переменные окружения, требования к бэку

> **Тип:** runtime-docs / operator manual
> **Метод:** `.cursor/rules/analysis.mdc` — всё сверено с фактическим кодом; указаны `file:line`.
> **Дата сверки:** 2026-06-17.
> **SSOT по переменным:** [`.env.example`](../../.env.example). Этот мануал — пошаговый разбор поверх него.

---

## 1. Что это и стек (verified)

- **Тип:** SPA — read-only доска гражданских обращений (issue tracker).
- **Стек:** React 18 + Vite 6 + react-router-dom 7 — [package.json:22-33](../../package.json#L22).
- **Роутинг:** `HashRouter`, маршруты `/board`, `/issue/:id`, `*`→`/board` — [src/main.jsx](../../src/main.jsx), [src/App.jsx](../../src/App.jsx). URL вида `https://host/#/board`.
- **Сборка:** `base: './'` (относительные пути ассетов — статик-хостинг) — [vite.config.js:5](../../vite.config.js#L5).
- **Точка входа:** [index.html](../../index.html) → `src/main.jsx`.

> Identity/Supabase/login и т.п. в коде **нет** (только в requirements-планах). Этот мануал описывает то, что реально запускается.

---

## 2. Требования к среде

- **Node.js:** локально проверено на **v22.12.0**; Vite 6 / Vitest 4 требуют Node ≥18. Пина версии (`.nvmrc`/`engines`) в репозитории нет.
- **Пакетный менеджер:** npm (в репо `package-lock.json`).
- **ОС:** любая (dev — macOS/Linux/WSL).

---

## 3. Установка и команды (verified — [package.json:6-21](../../package.json#L6))

```bash
cd spa-app
npm install            # установка зависимостей
```

| Команда | Что делает |
|---------|-----------|
| `npm run dev` | dev-сервер Vite (HMR). По умолчанию `http://localhost:5173`. |
| `npm run build` | прод-сборка статики в `dist/`. |
| `npm run preview` | локальный предпросмотр прод-сборки (Vite preview). |
| `npm run start` | прод-превью для хостинга: `vite preview --host 0.0.0.0 --port ${PORT:-4173}`. |
| `npm test` | юнит-тесты в watch-режиме (Vitest). |
| `npm run test:run` | юнит-тесты один прогон (`--passWithNoTests`). |
| `npm run test:ui:*` | puppeteer smoke-тесты (board-shell, status-badge, i18n, routing, filters, details, epic03). |
| `npm run deploy` | деплой `dist/` на Arweave (нужны `ARWEAVE_*`, см. §6). |

**Минимальный запуск (моки, без бэка):**
```bash
cd spa-app && npm install && npm run dev   # откроется на :5173, режим FAKE-OLD по умолчанию
```

---

## 4. Переменные окружения

Только переменные с префиксом **`VITE_`** попадают в код (`import.meta.env`) и **вшиваются на этапе сборки** (dev/build), не на рантайме → после изменения нужен перезапуск/пересборка. Vite читает `.env` в корне `spa-app/`.

| Переменная | Обяз. | Значения / дефолт | Где в коде |
|-----------|-------|-------------------|------------|
| `VITE_LIFE_REALITY_MODE` | нет | `FAKE-OLD` (дефолт) \| `GFL-DRIVEN` | [issueService.js:30,34](../../src/services/issueService.js#L30) |
| `VITE_GATEWAY_BASE_URL` | да в `GFL-DRIVEN` | URL gateway без пути (трейлинг-слэш/пробел срезаются) | [issueService.js:31](../../src/services/issueService.js#L31), [GatewayIssueRepository.js:4-7](../../src/repositories/GatewayIssueRepository.js#L4) |
| `VITE_TELEMETRY_ENABLED` | нет | по умолч. выкл; включается ровно `true` | [labelMissTelemetry.js:8](../../src/i18n/labelMissTelemetry.js#L8) |
| `PORT` | нет | порт для `npm run start`; иначе `4173` | [package.json:10](../../package.json#L10) |
| `ARWEAVE_WALLET_PATH` / `ARWEAVE_USE_BUNDLER` / `ARWEAVE_BUNDLER_NODE` | только для `npm run deploy` | — | [scripts/deploy-arweave.mjs:57,72,74](../../scripts/deploy-arweave.mjs#L57) (`process.env`, **не** `VITE_`) |

> ⚠️ `VITE_LIFE_REALITY_MODE` сопоставляется **строго и регистрозависимо**: реальный бэк включает только ровно `GFL-DRIVEN`; любое другое значение (пусто, опечатка, `gfl-driven`) → молча моки.

---

## 5. Режимы данных

Источник данных доски выбирается один раз при загрузке модуля — [issueService.js:30-44](../../src/services/issueService.js#L30).

### FAKE-OLD (по умолчанию)
- Данные — 13 встроенных мок-issue (`ROUTING_DEMO_ISSUES`, [src/router/mockIssues.js](../../src/router/mockIssues.js)) через `InMemoryIssueRepository`.
- Бэк **не нужен**. Идеален для UI-разработки/демо.

### GFL-DRIVEN (реальный бэк)
- `GatewayIssueRepository` ходит в gateway (см. §6).
- **Требует** `VITE_GATEWAY_BASE_URL`; при пустом — ошибка `VITE_GATEWAY_BASE_URL is required in GFL-DRIVEN mode` ещё на инициализации ([GatewayIssueRepository.js:6](../../src/repositories/GatewayIssueRepository.js#L6)).

**Рецепт «работать с реальным бэком»:**
```bash
# spa-app/.env
VITE_LIFE_REALITY_MODE=GFL-DRIVEN
VITE_GATEWAY_BASE_URL=http://localhost:8000
# затем: npm run dev  (или пересборка npm run build)
```

---

## 6. Требования к бэку (gateway) — для режима GFL-DRIVEN

Бэк — `doge-complaints-gateway`. В `FAKE-OLD` он **не требуется**.

### 6.1 Эндпоинты, которые зовёт SPA (verified — [GatewayIssueRepository.js:52,60](../../src/repositories/GatewayIssueRepository.js#L52))
```
GET {VITE_GATEWAY_BASE_URL}/tallinn/issues            # список
GET {VITE_GATEWAY_BASE_URL}/tallinn/issues/{id}       # одна issue
```
- **Формат ответа (конверт):** `{ "data": { "issues": [...] } }` для списка и `{ "data": { "issue": {...} } }` для одной — SPA читает `data.issues` / `data.issue` ([GatewayIssueRepository.js:53-66](../../src/repositories/GatewayIssueRepository.js#L53)).
- **404** на одиночном → SPA трактует как «не найдено» (`null`).
- Любой не-2xx (кроме 404) → ошибка `Gateway error: <status>` → доска показывает load-error + Retry.
- **Auth:** SPA токен не шлёт (публичный read).

### 6.2 CORS (обязательно)
Gateway должен отдавать CORS-заголовки для домена, где крутится SPA, — иначе браузер заблокирует запросы. Эндпоинты помечены `@app.options(...)` в gateway ([asgi_app.py](../../../doge-complaints-gateway/src/core/api/asgi_app.py)).

### 6.3 Словарный контракт (канон gateway — без него серверные фильтры дают пусто)
SPA выровнен под канон gateway (SEARCH-01). Серверные фильтры по `status/type/labels` работают только если значения совпадают:
- **status:** `NEW`, `IN_REVIEW`, `PUBLISHED` — [types.js:3-7](../../src/domain/types.js#L3) ↔ gateway [enums.py](../../../doge-complaints-gateway/src/core/projection/enums.py).
- **type:** `IMPROVEMENT`, `SERVICE_REQUEST`, `INCIDENT` — [types.js:9-13](../../src/domain/types.js#L9).
- **labels (governed):** `waste`, `district`, `infrastructure`, `safety` — [labelKeys.js](../../src/i18n/labelKeys.js).
- Какие фильтры SPA реально прокидывает сейчас: `status` (повторяемый), `type`, `labels` (повторяемый) — [GatewayIssueRepository.js:19-35](../../src/repositories/GatewayIssueRepository.js#L19). (institution/дата/geo — пока не прокидываются; см. backlog SEARCH-04/05.)

### 6.4 Контент-поля issue (i18n)
`title/summary/description/institution` ожидаются как i18n-объекты `{et,ru,en}`; опционально `original_locale: string[]` (языки оригинала — для маркера машинного перевода). Оба поддержаны на бэке (gateway projection) и потребляются SPA. Отсутствие `original_locale` — мягкая деградация (маркер не показывается).

### 6.5 Телеметрия меток (опционально)
Если `VITE_TELEMETRY_ENABLED=true` **и** задан `VITE_GATEWAY_BASE_URL`, SPA анонимно шлёт непереведённые метки:
```
POST {VITE_GATEWAY_BASE_URL}/telemetry/label-misses   body { label_key, locale }
```
[labelMissTelemetry.js:15-17](../../src/i18n/labelMissTelemetry.js#L15). Без PII/куки; при недоступности — тихий no-op. По умолчанию выключено.

---

## 7. Хостинг (Railway / статик-превью)

- `npm run build` → статика в `dist/` (с `base: './'` — работает из любого подкаталога).
- `npm run start` поднимает прод-превью на `0.0.0.0:${PORT:-4173}`; платформы вроде Railway сами выставляют `PORT`.
- Все `VITE_*` фиксируются **на этапе build** — на хостинге задавайте их **до** сборки (build-time env), не как рантайм-переменные контейнера.

---

## 8. Тесты

- Юнит: `npm run test:run` (Vitest). Smoke-UI: `npm run test:ui:*` (Puppeteer; требуют поднятого dev/preview).
- **Puppeteer / Chrome:** smoke-скрипты используют `puppeteer.launch()`. При ошибке `Could not find Chrome` один раз установите браузер:
  ```bash
  cd spa-app
  npx puppeteer browsers install chrome
  ```
  Затем повторите, например: `npm run test:ui:filters`.
- **Builder Queue P3 (spa visual):** шаг 0b после `--verify` — тот же Chrome install + `npm run <puppeteer_gate>` из anchor task; см. [workflow.md](../../../docs/methodology/Zeya888-builder-queue/core/workflow.md) §P3 spa UI appendix.
- ⚠️ **Vitest читает `.env`.** Юнит-тесты должны быть герметичны и не зависеть от `VITE_LIFE_REALITY_MODE`; для надёжного прогона держите `.env` в `FAKE-OLD` либо запускайте без `.env`. (Контекст: ранее негерметичный тест падал при `.env=GFL-DRIVEN` — исправлено.)

---

## 9. Траблшутинг

| Симптом | Причина | Что проверить |
|---------|---------|---------------|
| На старте ошибка `VITE_GATEWAY_BASE_URL is required...` | `GFL-DRIVEN` без URL | задать `VITE_GATEWAY_BASE_URL` или вернуть `FAKE-OLD` |
| Доска пустая / load-error в `GFL-DRIVEN` | gateway недоступен, CORS, или несовпадение словаря (§6.3) | gateway запущен? CORS включён? фильтры в каноне? |
| Поиск/фильтры «не находят» в `GFL-DRIVEN` | фильтр по значению вне канона gateway | использовать канон status/type/labels (§6.3) |
| Изменил `.env`, эффекта нет | `VITE_*` вшиты на build | перезапустить `npm run dev` / пересобрать |
| `Could not find Chrome` при `test:ui:*` | браузер не установлен для Puppeteer | `npx puppeteer browsers install chrome` (§8) |
| Метки на доске на «английском слаге» | у метки нет перевода в словаре (humanize) | добавить перевод в `labels.*` (`src/i18n/dictionaries.js`) |

---

*Все команды, переменные и эндпоинты сверены с фактическим кодом (`package.json`, `vite.config.js`, `src/services/issueService.js`, `src/repositories/GatewayIssueRepository.js`, `src/i18n/labelMissTelemetry.js`, `.env.example`) и gateway-роутами. SSOT переменных — `.env.example`.*
