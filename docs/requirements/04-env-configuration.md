# 04. Environment Configuration

> **Статус:** Реализовано. SSOT: [`.env.example`](../../.env.example), [railway-git-deploy-manual.md](../../railway-git-deploy-manual.md).
> **Текущий паттерн (верифицировано):** `issueService.js:30-31` — `import.meta.env.VITE_*` с `?? 'default'`.
> **Связь:** Используется в файлах 05 (Supabase Client), 07 (API Client).

---

## Vite env vars — правила

1. Все env vars для SPA имеют префикс `VITE_` (Vite requirement).
2. Хранятся в `.env.local` (локальный дев), `.env` (дефолты, можно коммитить без секретов).
3. Паттерн чтения: `import.meta.env.VITE_VAR_NAME ?? 'fallback'`.
4. Никогда НЕ хранить в env: access tokens, service role keys, секреты backend — только публичные keys (anon key).

---

## Новые переменные окружения

| Переменная | Required | Default | Описание |
|-----------|---------|---------|---------|
| `VITE_IDENTITY_SERVICE_URL` | No | `http://localhost:8100` | Base URL для doge-identity-service. Production: `https://identity.dogestonia.ee` |
| `VITE_SUPABASE_URL` | Yes (prod) | — | Supabase project URL. Dashboard → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes (prod) | — | Supabase anon/public key. Безопасно включать в frontend — RLS защищает данные. |
| `VITE_IDENTITY_MOCK_MODE` | No | `false` | `true` — mock identity in browser (режим A); `false` — HTTP к identity (режим B, file sink). |
| `VITE_STORY_GPT_URL` | No | — | Custom GPT URL для web-entry «создать историю» ([`StorySubmitPage.jsx:29`](../../src/pages/StorySubmitPage.jsx)). Railway: build-time only. |
| `VITE_GATEWAY_BASE_URL` | Yes (GFL-DRIVEN) | — | Gateway base URL. Railway: публичный URL, не localhost. |
| `VITE_LIFE_REALITY_MODE` | No | `FAKE-OLD` | `GFL-DRIVEN` для real gateway на railway. |

**Примечание по `VITE_SUPABASE_ANON_KEY`:** Supabase anon key — публичный ключ, предназначен для браузера. RLS (Row Level Security) на стороне Supabase обеспечивает защиту. Это не секрет — его можно коммитить в `.env` (не `.env.local`).

**Не добавлять в env:**
- `VITE_SUPABASE_SERVICE_ROLE` — только backend, никогда в браузер.
- Любые access tokens или JWT secrets.

---

## `.env` (дефолты, без секретов — коммитить)

```env
# doge-identity-service base URL
VITE_IDENTITY_SERVICE_URL=http://localhost:8100

# Supabase (заполнить перед dev-сессией, anon key — публичный)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Mock mode: true = UI-only без HTTP phone API; false = file E2E через identity
VITE_IDENTITY_MOCK_MODE=false

# Существующие (не трогать)
VITE_LIFE_REALITY_MODE=FAKE-OLD
VITE_GATEWAY_BASE_URL=

# Custom GPT (M-3 web-entry)
# VITE_STORY_GPT_URL=https://chatgpt.com/g/your-custom-gpt
```

## `.env.local` (локальный, в .gitignore)

```env
# Заполнить реальными значениями из Supabase Dashboard
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Identity service (если запущен локально)
VITE_IDENTITY_SERVICE_URL=http://localhost:8100

# Если тестируем с real doge-complaints-gateway:
VITE_LIFE_REALITY_MODE=GFL-DRIVEN
VITE_GATEWAY_BASE_URL=http://localhost:8000
```

---

## Паттерн чтения в коде (идентично существующему)

```javascript
// src/auth/supabaseClient.js
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

// src/auth/resolveIdentityServiceUrl.js (+ wired from identityService / oauthService / identityReadyClient)
import { resolveIdentityServiceUrl } from './resolveIdentityServiceUrl.js'
const IDENTITY_SERVICE_URL = resolveIdentityServiceUrl()
// PROD (import.meta.env.PROD): missing/blank VITE_IDENTITY_SERVICE_URL → throw (HL-04; no silent localhost)
// non-PROD: missing/blank → http://localhost:8100
const IDENTITY_MOCK_MODE = import.meta.env.VITE_IDENTITY_MOCK_MODE === 'true'
```

---

## Mock mode (VITE_IDENTITY_MOCK_MODE)

| Значение | Режим | Phone API |
|----------|-------|-----------|
| `true` | A — UI-only | mock в браузере, HTTP не идёт (`skippedHttp: true` в Console) |
| `false` | B — file E2E | `POST` на `VITE_IDENTITY_SERVICE_URL/auth/phone/*` |

При `VITE_IDENTITY_MOCK_MODE=true` identity service вызовы возвращают mock данные:

```javascript
// Пример mock /me response
const MOCK_ME_VERIFIED = {
  user_id: 'mock-user-1',
  display_name: 'Demo User',
  eid_verified: true,
  eid_country: 'EE',
  eid_method: 'smart_id',
  eid_verified_at: '2026-05-25T10:00:00Z',
  wallet_linked: false,
  permissions: ['stories:create', 'stories:draft', 'profile:read'],
}

const MOCK_ME_UNVERIFIED = {
  user_id: 'mock-user-2',
  display_name: 'New User',
  eid_verified: false,
  wallet_linked: false,
  permissions: ['stories:draft', 'profile:read'],
}
```

Переключение режима A: `VITE_IDENTITY_MOCK_MODE=true` (+ опционально пустой Supabase для полностью offline dev).

---

## .gitignore

Убедиться что `.env.local` в `.gitignore` (стандарт Vite — уже включён по умолчанию):

```
# .gitignore (проверить наличие)
.env.local
.env.*.local
```

---

## Acceptance Criteria

- [ ] `VITE_IDENTITY_SERVICE_URL` читается в `identityService.js` по паттерну `import.meta.env.*`
- [ ] `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` используются только в `supabaseClient.js`
- [ ] `.env` с пустыми секретами коммитится (документирует список vars)
- [ ] `.env.local` в `.gitignore`
- [ ] `VITE_IDENTITY_MOCK_MODE=true` — SPA работает без запущенного identity-service
- [ ] Существующие `VITE_LIFE_REALITY_MODE` и `VITE_GATEWAY_BASE_URL` не затронуты
