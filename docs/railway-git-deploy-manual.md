# Railway deploy — spa-app (Git → Railway)

Короткая инструкция для деплоя `spa-app` из GitHub на [railway.com](https://railway.com). Полный гайд (localhost, Arweave, troubleshooting): [deploy-guide.md](./deploy-guide.md).

## 1. Подключить репозиторий

1. Railway → **New Project** → **Deploy from GitHub repo**
2. Выбери репозиторий **DOGEstonia** и ветку (обычно `main`)
3. **Settings → Root Directory → `spa-app`** — обязательно для monorepo

Railway подхватит [`railway.toml`](../railway.toml):

| Этап | Команда |
|------|---------|
| Build | `npm run build` |
| Start | `npm start` (`serve -s dist -l tcp://0.0.0.0:$PORT`) |

`$PORT` задаёт Railway автоматически — не трогать.

## 2. Variables (build-time)

Все `VITE_*` встраиваются в бандл **только при сборке**. После изменения переменной Railway пересобирает проект.

| Variable | Значение (Tallinn demo) |
|----------|-------------------------|
| `VITE_LIFE_REALITY_MODE` | `GFL-DRIVEN` |
| `VITE_GATEWAY_BASE_URL` | `https://dogestonia-tallinn.up.railway.app` |
| `VITE_IDENTITY_SERVICE_URL` | `https://doge-identity-service-tallinn-demo.up.railway.app` |
| `VITE_SUPABASE_URL` | из Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | anon key (не service_role) |
| `VITE_STORY_GPT_URL` | URL вашего Custom GPT |
| `VITE_IDENTITY_MOCK_MODE` | `false` |

Секреты backend (service_role, OAuth secrets) **не** добавлять в spa — только публичные `VITE_*`.

## 3. Deploy

- Push в подключённую ветку → автодеплой, или
- **Deployments → Deploy** вручную

После успешного деплоя Railway покажет URL вида `https://<service>.up.railway.app`.

## 4. CORS на identity (обязательно)

Браузер шлёт `Authorization` на identity (`GET /me`). В сервисе **doge-identity-service** на Railway:

1. **Variables** → `CORS_ALLOWED_ORIGINS` = `https://<ваш-spa>.up.railway.app` (origin spa, без trailing slash)
2. Redeploy identity

Gateway в коде уже разрешает `*` ([`asgi_app.py`](../../doge-complaints-gateway/src/core/api/asgi_app.py)); identity требует явный origin.

## 5. Post-deploy проверки

Замени `<spa>` на реальный URL из Railway.

```bash
cd spa-app

# M-5: доска без логина
SPA_BASE_URL=https://<spa>.up.railway.app npm run verify:railway:live

# CORS preflight gateway + identity
SPA_ORIGIN=https://<spa>.up.railway.app \
GATEWAY_BASE_URL=https://dogestonia-tallinn.up.railway.app \
IDENTITY_SERVICE_URL=https://doge-identity-service-tallinn-demo.up.railway.app \
  npm run verify:cors:preflight
```

Ручная проверка в браузере (без логина):

- `https://<spa>.up.railway.app/#/board`
- `https://<spa>.up.railway.app/#/issue/<id>`

Pre-deploy guards (локально, перед push):

```bash
npm run verify:bundle:no-service-role
VITE_LIFE_REALITY_MODE=GFL-DRIVEN \
VITE_GATEWAY_BASE_URL=https://dogestonia-tallinn.up.railway.app \
VITE_IDENTITY_SERVICE_URL=https://doge-identity-service-tallinn-demo.up.railway.app \
VITE_SUPABASE_URL=https://<project>.supabase.co \
VITE_SUPABASE_ANON_KEY=<anon> \
VITE_STORY_GPT_URL=https://chatgpt.com/g/<your-gpt> \
  npm run verify:build:env-bake
```

## 6. Частые проблемы

| Симптом | Решение |
|---------|---------|
| Пустой экран | Root Directory = `spa-app`; смотри Build Logs |
| Issues не грузятся | `VITE_GATEWAY_BASE_URL` задан и gateway доступен |
| Auth /me падает в консоли | `CORS_ALLOWED_ORIGINS` на identity = origin spa |
| Изменил env — нет эффекта | `VITE_*` только при build; нужен redeploy |

## Ссылки

- [deploy-guide.md](./deploy-guide.md) — полный гайд
- [04-env-configuration.md](./requirements/04-env-configuration.md) — спецификация env
- [STORY-SPA-DEPLOY-01](./tasks/backlog-stories/railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) — acceptance criteria
