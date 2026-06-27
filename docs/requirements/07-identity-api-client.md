# 07. Identity API Client

> **Статус:** НЕ реализовано. Spec для `src/services/identityService.js`.
> **Предусловие:** Файл 04 (env vars), файл 05 (Supabase Client для токенов).
> **Паттерн:** Идентичен `src/services/issueService.js` — factory function + singleton export.
> **Связь:** Используется в файлах 08 (useMe), 09 (VerifyPage — /auth/eid/start).

---

## Назначение

Единственная точка для всех HTTP вызовов к `doge-identity-service`. Инкапсулирует:
- Bearer token injection (из Supabase session)
- Base URL из `VITE_IDENTITY_SERVICE_URL`
- Error normalization
- Mock mode при `VITE_IDENTITY_MOCK_MODE=true`

SPA вызывает только 3 endpoints identity-service:
1. `GET /me` — загрузка профиля и статуса
2. `POST /auth/eid/start` — запуск eID верификации
3. (опционально) `GET /health` — проверка доступности

---

## `src/services/identityService.js`

```javascript
import { supabase } from '../auth/supabaseClient.js'

const IDENTITY_SERVICE_URL = import.meta.env.VITE_IDENTITY_SERVICE_URL ?? 'http://localhost:8100'
const IDENTITY_MOCK_MODE = import.meta.env.VITE_IDENTITY_MOCK_MODE === 'true'

// ── Mock responses для dev без backend ──────────────────────────────────────
const MOCK_ME_VERIFIED = Object.freeze({
  user_id: 'mock-user-verified',
  display_name: 'Demo User',
  eid_verified: true,
  eid_country: 'EE',
  eid_method: 'smart_id',
  eid_verified_at: '2026-05-25T10:00:00Z',
  wallet_linked: false,
  permissions: ['stories:create', 'stories:draft', 'profile:read'],
  created_at: '2026-05-01T00:00:00Z',
})

const MOCK_ME_UNVERIFIED = Object.freeze({
  user_id: 'mock-user-unverified',
  display_name: 'New User',
  eid_verified: false,
  wallet_linked: false,
  permissions: ['stories:draft', 'profile:read'],
  created_at: '2026-05-25T00:00:00Z',
})

// ── Token helper ────────────────────────────────────────────────────────────
async function getAccessToken() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

// ── Core fetch helper ───────────────────────────────────────────────────────
async function identityFetch(path, options = {}) {
  const token = await getAccessToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }
  const response = await fetch(`${IDENTITY_SERVICE_URL}${path}`, {
    ...options,
    headers,
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new IdentityApiError(body.error ?? 'unknown_error', response.status, body)
  }
  return response.json()
}

// ── Error type ──────────────────────────────────────────────────────────────
export class IdentityApiError extends Error {
  constructor(code, status, body = {}) {
    super(code)
    this.code = code        // machine-readable: "verification_required", "authentication_required"
    this.status = status    // HTTP status
    this.body = body        // full response body
  }
}

// ── Service factory ─────────────────────────────────────────────────────────
export function createIdentityService(baseUrl = IDENTITY_SERVICE_URL, mockMode = IDENTITY_MOCK_MODE) {
  return {
    /**
     * GET /me — загрузка профиля текущего пользователя.
     * @returns {Promise<MeResponse>}
     * @throws {IdentityApiError} code: "authentication_required"
     */
    async getMe() {
      if (mockMode) {
        await delay(200)
        return { ...MOCK_ME_UNVERIFIED }
      }
      return identityFetch('/me')
    },

    /**
     * POST /auth/eid/start — запуск eID верификации.
     * @param {{ return_context: string, return_url: string, requested_action: string }} params
     * @returns {Promise<{ redirect_url: string, expires_at: string }>}
     * @throws {IdentityApiError} code: "authentication_required" | "already_verified" | "invalid_return_url"
     */
    async startEidVerification({ return_context, return_url, requested_action }) {
      if (mockMode) {
        await delay(300)
        return { redirect_url: '#', expires_at: new Date(Date.now() + 600_000).toISOString() }
      }
      return identityFetch('/auth/eid/start', {
        method: 'POST',
        body: JSON.stringify({ return_context, return_url, requested_action }),
      })
    },
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Singleton — используется в useMe, VerifyPage
export const identityService = createIdentityService()
```

---

## Типы (JSDoc)

```javascript
/**
 * @typedef {Object} MeResponse
 * @property {string} user_id
 * @property {string | null} display_name
 * @property {string | null} avatar_url
 * @property {boolean} eid_verified
 * @property {string | null} eid_country
 * @property {string | null} eid_method
 * @property {string | null} eid_verified_at
 * @property {boolean} wallet_linked
 * @property {string[]} permissions
 * @property {string} created_at
 */

/**
 * @typedef {Object} EidStartResponse
 * @property {string} redirect_url
 * @property {string} expires_at
 */
```

---

## Обработка ошибок

`IdentityApiError.code` — machine-readable код для UI логики:

| Code | HTTP | Обработка в UI |
|------|------|---------------|
| `authentication_required` | 401 | Redirect на `/login` |
| `verification_required` | 403 | Показать VerificationPrompt |
| `already_verified` | 200 | Refresh `/me`, продолжить |
| `identity_already_linked` | 403 | Показать conflict экран |
| `invalid_return_url` | 400 | Generic error |
| `rate_limit_exceeded` | 429 | "Too many attempts, try later" |

---

## Acceptance Criteria

- [ ] `identityService.getMe()` с валидной Supabase сессией → возвращает `MeResponse`
- [ ] `identityService.getMe()` без сессии → выбрасывает `IdentityApiError` с `code='authentication_required'`
- [ ] `identityService.startEidVerification(...)` → возвращает `{ redirect_url, expires_at }`
- [ ] `VITE_IDENTITY_MOCK_MODE=true` → `getMe()` возвращает mock данные без HTTP запроса
- [ ] `IdentityApiError` содержит `code`, `status`, `body`
- [ ] Bearer token обновляется при каждом вызове (через `getSession()`, не кэшируется)
