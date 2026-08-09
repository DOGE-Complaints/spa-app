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

> **Короткий мануал (Git → Railway):** [railway-git-deploy-manual.md](./railway-git-deploy-manual.md)

### Как это работает

Railway обнаруживает `package.json` и `railway.toml` в корне сервиса (`spa-app/`):

| Этап | Команда | SSOT |
|------|---------|------|
| **Build** | `npm run build` | `railway.toml` → `[build] buildCommand`, `package.json` |
| **Start** | `npm start` → `serve -s dist -l tcp://0.0.0.0:$PORT` | `railway.toml` → `[deploy] startCommand`, `package.json` |

`$PORT` — переменная, которую Railway инжектирует автоматически. Менять не нужно.

### Monorepo (DOGEstonia)

1. Railway → **New Project → Deploy from GitHub repo**
2. Выбери репозиторий и ветку
3. **Settings → Root Directory → `spa-app`** (обязательно для monorepo)
4. Railway подхватит `spa-app/railway.toml` и `spa-app/package.json`

### Переменные окружения (Variables tab)

Все `VITE_*` — **build-time only** (пересборка при изменении). Чеклист для production:

| Переменная | Обязательность | Пример (Railway) |
|------------|----------------|------------------|
| `VITE_LIFE_REALITY_MODE` | Да (prod) | `GFL-DRIVEN` |
| `VITE_GATEWAY_BASE_URL` | Да при GFL-DRIVEN | `https://your-gateway.railway.app` |
| `VITE_IDENTITY_SERVICE_URL` | Да (auth) | `https://your-identity.railway.app` |
| `VITE_SUPABASE_URL` | Да (prod) | `https://<project>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Да (prod) | `eyJ...` (anon, не service_role) |
| `VITE_IDENTITY_MOCK_MODE` | Да (prod) | `false` |
| `VITE_STORY_GPT_URL` | Рекомендуется | `https://chatgpt.com/g/...` |

Локальная разработка — см. `.env.example` и [04-env-configuration.md](./requirements/04-env-configuration.md).

Пример минимального prod-набора:

```
VITE_LIFE_REALITY_MODE=GFL-DRIVEN
VITE_GATEWAY_BASE_URL=https://your-gateway.railway.app
VITE_IDENTITY_SERVICE_URL=https://your-identity.railway.app
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_IDENTITY_MOCK_MODE=false
VITE_STORY_GPT_URL=https://chatgpt.com/g/your-custom-gpt
```

5. Нажми **Deploy** (или пуш в ветку запустит автодеплой).

> **Домен SPA не в `.env`:** публичный URL (`https://….up.railway.app`) назначает Railway. В `.env` / Railway Variables нужны только `VITE_*` (build-time). Production serve — static `dist/` через [`serve`](https://www.npmjs.com/package/serve) (`npm start`); локальная проверка бандла — `npm run preview` (Vite).

### Post-deploy smoke (M-5)

> **Story Done (SPA-ID-13):** локальный gate — `npm run test:ui:board-shell` (без Railway URL).  
> `verify:railway:live` — **post-deploy pointer only**, не AC Done для ID-13.

После первого деплоя:

```bash
SPA_BASE_URL=https://<your-spa>.railway.app npm run verify:railway:live
```

Локальная проверка скрипта (static serve, как на Railway):

```bash
cd spa-app && npm run build && PORT=4173 npm start
# другой терминал:
ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173 npm run verify:railway:live
```

### M-5 public paths (post-deploy smoke)

После деплоя проверь **без логина** (HashRouter):

- `https://<app>.railway.app/#/board`
- `https://<app>.railway.app/#/issue/<id>`
- `https://<app>.railway.app/#/` (редирект на board)

Защищённые маршруты (`/dashboard`, `/profile`, `/verify`, `/story/submit`) без сессии показывают **SessionShell overlay** (контент заблокирован); ссылки Sign In ведут на `/login` ([`sessionShellState.js`](../src/auth/sessionShellState.js)).

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
| `npm run preview` | Vite preview server | localhost:4173 (локальная проверка бандла) |
| `npm start` | `serve -s dist -l tcp://0.0.0.0:$PORT` | Railway (static production serve) |
| `npm run deploy` | деплой `dist/` на Arweave через `arkb` | Arweave |
| `npm run verify:bundle:no-service-role` | build + scan dist на `service_role` | pre-deploy guard (SEC-01) |
| `npm run verify:build:env-bake` | build с public `VITE_*` + scan dist (gateway, identity, Supabase, GPT); **падает** на localhost needles | **Обязательный** pre-**release** gate (HL-02 / DEPLOY-01) |
| `npm run verify:railway:live` | HTTP shell + puppeteer `/#/board` без login (M-5) | post-deploy smoke (DEPLOY-01) |
| `npm run verify:cors:preflight` | OPTIONS preflight к gateway `/tallinn/issues` и identity `/me` | post-deploy CORS (DEPLOY-01 AC #4) |

`npm run deploy` требует `ARWEAVE_WALLET_PATH` — без него завершается ошибкой. Случайно задеплоить на Arweave нельзя.

---

## Release checklist — env-bake (HL-02)

**Local smoke dist ≠ shippable release.**

| Dist kind | How built | May contain `127.0.0.1:8000` / `:8100`? | Ship to Railway / Arweave? |
|-----------|-----------|------------------------------------------|----------------------------|
| Local smoke | `npm run build` / `verify:security` with local `.env` | Yes (expected) | **No** — not a release artifact |
| Release | `npm run verify:build:env-bake` with **public** `VITE_*` | Must be **absent** | Only after gate exit 0 |

### Mandatory before any production release

1. Set **public** (non-localhost) values for:
   - `VITE_GATEWAY_BASE_URL`
   - `VITE_IDENTITY_SERVICE_URL`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_STORY_GPT_URL`
   - (recommended) `VITE_LIFE_REALITY_MODE=GFL-DRIVEN`
2. Run from `spa-app/`:

```bash
VITE_GATEWAY_BASE_URL=https://… \
VITE_IDENTITY_SERVICE_URL=https://… \
VITE_SUPABASE_URL=https://… \
VITE_SUPABASE_ANON_KEY=eyJ… \
VITE_STORY_GPT_URL=https://… \
VITE_LIFE_REALITY_MODE=GFL-DRIVEN \
npm run verify:build:env-bake
```

3. Gate **must** exit 0. Without these env vars, or if any service base is `localhost` / `127.0.0.1`, the script **fails** (by design).
4. Do **not** deploy a `dist/` that was baked from local `.env` with `127.0.0.1` service bases — that artifact is **not** a release.

Script entrypoint: [`package.json`](../package.json) → `verify:build:env-bake` → [`scripts/verify-build-env-bake.mjs`](../scripts/verify-build-env-bake.mjs).

---

## Troubleshooting

**Пустой экран / ничего не загружается на Railway**
- Проверь что Railway запускает именно из `spa-app/` (Root Directory)
- Проверь Build Logs — должно быть `vite build` без ошибок
- Проверь что `npm start` в Deploy Logs запустился и слушает PORT

**Текст «Blocked request. This host is not allowed»**
- Устаревший деплой на `vite preview` — production должен использовать `npm start` → `serve -s dist` (см. [`package.json`](../package.json))
- Если ошибка сохраняется после redeploy — проверь Deploy Logs: процесс должен быть `serve`, не `vite preview`

**Issues не загружаются (GFL-DRIVEN режим)**
- Убедись что `VITE_GATEWAY_BASE_URL` задан и доступен из браузера
- Gateway: CORS `allow_origins=["*"]` в коде ([`asgi_app.py`](../../doge-complaints-gateway/src/core/api/asgi_app.py))
- Identity: на Railway задай `CORS_ALLOWED_ORIGINS` = origin spa (см. [railway-git-deploy-manual.md](./railway-git-deploy-manual.md) §4)
- В консоли браузера: `import.meta.env.VITE_LIFE_REALITY_MODE` — должно быть `GFL-DRIVEN`
- Pre-deploy (**required for release**, HL-02): same command as [Release checklist — env-bake](#release-checklist--env-bake-hl-02). Dist with `127.0.0.1` service bases is **not** release.

**Роуты открываются только с `#`-префиксом**
- Это ожидаемое поведение (`HashRouter`). URL вида `https://app.railway.app/#/board` — корректны.
- Прямые URL без `#` (например `https://app.railway.app/board`) не поддерживаются и не нужны.

**`npm run deploy` вылетает с ошибкой кошелька**
- Это нормально для Railway/localhost — `npm run deploy` предназначен только для Arweave
- Убедись что не запускаешь `npm run deploy` вместо `npm start`
