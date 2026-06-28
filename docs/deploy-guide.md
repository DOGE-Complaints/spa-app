# SPA Deploy Guide: Localhost / Railway / Arweave

## Архитектурный контекст

`spa-app` — статическое React SPA. Все три таргета используют **один и тот же бандл** (`dist/`):

| Таргет | Когда использовать | Команда |
|--------|--------------------|---------|
| Localhost dev | разработка, hot-reload | `npm run dev` |
| Localhost preview | проверка production бандла локально | `npm run build && npm run preview` |
| Railway.com | staging / демо / публичный URL | `npm run build` → Railway запускает `npm start` |
| Arweave | постоянная публикация на блокчейн | `npm run build && npm run deploy` |

Роутинг: `HashRouter` — все URL содержат `#`. Это означает что **любой HTTP-сервер** может отдавать статику без SPA-редиректов.

---

## Переменные окружения (VITE_*)

Переменные `VITE_*` встраиваются в бандл **на этапе сборки**. Один собранный `dist/` = одна конфигурация.

```bash
# Источник данных (обязательно)
VITE_LIFE_REALITY_MODE=FAKE-OLD     # моки (по умолчанию, не требует бекенда)
# VITE_LIFE_REALITY_MODE=GFL-DRIVEN  # реальный gateway

# URL gateway (обязательно только при GFL-DRIVEN)
# VITE_GATEWAY_BASE_URL=http://localhost:8000
# VITE_GATEWAY_BASE_URL=https://pilot.example.com
```

Создай `.env` (в корне `spa-app`, не коммитить) на основе `.env.example`.

---

## 1. Localhost — dev-режим

**Для разработки.** Hot-reload, source maps, без предварительной сборки.

```bash
cd spa-app
npm install
npm run dev
# → http://localhost:5173
```

С указанием источника данных:

```bash
# Моки (по умолчанию):
npm run dev

# Реальный gateway (запущен локально):
VITE_LIFE_REALITY_MODE=GFL-DRIVEN VITE_GATEWAY_BASE_URL=http://localhost:8000 npm run dev
```

---

## 2. Localhost — production preview

**Для проверки собранного бандла** перед деплоем на Railway или Arweave. Поведение идентично production.

```bash
cd spa-app
npm run build
npm run preview
# → http://localhost:4173
```

С указанием источника данных:

```bash
VITE_LIFE_REALITY_MODE=GFL-DRIVEN VITE_GATEWAY_BASE_URL=http://localhost:8000 npm run build
npm run preview
```

Проверь:
- `http://localhost:4173/#/board` — список issues
- `http://localhost:4173/#/issue/<id>` — карточка issue

---

## 3. Railway.com (без Docker)

### Как это работает

Railway обнаруживает `package.json` и запускает автоматически:
- **Build:** `npm run build` (Nixpacks/Node.js buildpack)
- **Start:** `npm start` → `vite preview --host 0.0.0.0 --port $PORT`

`$PORT` — переменная, которую Railway инжектирует автоматически. Менять не нужно.

### Первый деплой

1. Railway → **New Project → Deploy from GitHub repo**
2. Выбери репозиторий и ветку
3. Если Railway не определил корректно root (monorepo):
   - Settings → **Root Directory** → `spa-app`
4. Настрой переменные окружения (Variables tab):

```
VITE_LIFE_REALITY_MODE=FAKE-OLD
```

Или для реального gateway:

```
VITE_LIFE_REALITY_MODE=GFL-DRIVEN
VITE_GATEWAY_BASE_URL=https://your-gateway.railway.app
```

5. Нажми **Deploy** (или пуш в ветку запустит автодеплой).

### После деплоя

Railway выдаст URL вида `https://dogeestonia-spa-production.up.railway.app`.

Проверь:
- `https://<app>.railway.app/#/board`
- `https://<app>.railway.app/#/issue/<id>`

### Смена источника данных без кода

Меняешь значение `VITE_GATEWAY_BASE_URL` в Railway Variables → Railway пересобирает и передеплоит.

> **Важно:** `VITE_*` переменные инжектируются только во время **сборки** (`npm run build`). Изменение переменной без повторного деплоя не имеет эффекта.

### Команды Railway CLI (опционально)

```bash
# Установка Railway CLI
npm install -g @railway/cli

# Логин
railway login

# Деплой из текущей папки
cd spa-app
railway up
```

---

## 4. Arweave (постоянный деплой)

Полная инструкция: [deploy-arweave.md](./deploy-arweave.md)

Краткий флоу:

```bash
cd spa-app

# Создай .env с Arweave кошельком
cp .env.example .env
# Отредактируй: ARWEAVE_WALLET_PATH=<путь к keyfile>

# Собери с нужными VITE_ переменными:
VITE_LIFE_REALITY_MODE=GFL-DRIVEN VITE_GATEWAY_BASE_URL=https://your-gateway.example.com npm run build

# Задеплой:
npm run deploy
# → печатает txid и https://arweave.net/<txid>
```

`npm run deploy` читает только `ARWEAVE_*` переменные. `VITE_*` переменные уже зафиксированы в `dist/` на этапе `npm run build`.

---

## Таблица: какой скрипт для чего

| Скрипт | Что делает | Таргет |
|--------|-----------|--------|
| `npm run dev` | Vite dev server, hot-reload | localhost:5173 |
| `npm run build` | собирает `dist/` | подготовка к любому деплою |
| `npm run preview` | Vite preview server | localhost:4173 (тест бандла) |
| `npm start` | `vite preview --host 0.0.0.0 --port $PORT` | Railway (запускается платформой) |
| `npm run deploy` | деплой `dist/` на Arweave через `arkb` | Arweave |

`npm run deploy` требует `ARWEAVE_WALLET_PATH` — без него завершается ошибкой. Случайно задеплоить на Arweave нельзя.

---

## Troubleshooting

**Пустой экран / ничего не загружается на Railway**
- Проверь что Railway запускает именно из `spa-app/` (Root Directory)
- Проверь Build Logs — должно быть `vite build` без ошибок
- Проверь что `npm start` в Deploy Logs запустился и слушает PORT

**Issues не загружаются (GFL-DRIVEN режим)**
- Убедись что `VITE_GATEWAY_BASE_URL` задан и доступен из браузера
- Gateway должен быть запущен с CORS (`Access-Control-Allow-Origin: *`)
- В консоли браузера: `import.meta.env.VITE_LIFE_REALITY_MODE` — должно быть `GFL-DRIVEN`

**Роуты открываются только с `#`-префиксом**
- Это ожидаемое поведение (`HashRouter`). URL вида `https://app.railway.app/#/board` — корректны.
- Прямые URL без `#` (например `https://app.railway.app/board`) не поддерживаются и не нужны.

**`npm run deploy` вылетает с ошибкой кошелька**
- Это нормально для Railway/localhost — `npm run deploy` предназначен только для Arweave
- Убедись что не запускаешь `npm run deploy` вместо `npm start`
