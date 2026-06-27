# 08. useMe Hook и Verification Status

> **Статус:** НЕ реализовано. Spec для `src/verification/useVerificationStatus.js` и `useMe` pattern.
> **Предусловие:** Файл 05 (useAuthSession), файл 07 (identityService).
> **Связь:** Используется в DashboardPage (файл 12), VerifyPage (файл 09), CivicStatusPanel.

---

## Назначение

`useVerificationStatus` — React hook, который:
1. Вызывает `GET /me` при наличии Supabase сессии.
2. Возвращает `eid_verified` статус и `permissions`.
3. Умеет **обновляться** — для случая после eID callback (пользователь вернулся с Authentigate).
4. Не блокирует рендер при загрузке — возвращает `loading=true` пока данные не пришли.

---

## `src/verification/useVerificationStatus.js`

```javascript
import { useState, useEffect, useCallback } from 'react'
import { useAuthSession } from '../auth/useAuthSession.js'
import { identityService, IdentityApiError } from '../services/identityService.js'

/**
 * @typedef {Object} VerificationStatus
 * @property {boolean | null} eid_verified
 * @property {string | null} eid_country
 * @property {string | null} eid_method
 * @property {string | null} eid_verified_at
 * @property {boolean} wallet_linked
 * @property {string[]} permissions
 * @property {string | null} user_id
 * @property {string | null} display_name
 */

/**
 * @typedef {Object} UseVerificationStatusResult
 * @property {VerificationStatus | null} profile
 * @property {boolean} loading
 * @property {string | null} error
 * @property {() => Promise<void>} refresh
 */

/**
 * Returns verification status from /me endpoint.
 * Auto-fetches when session exists. Exposes refresh() for post-eID-callback update.
 * @returns {UseVerificationStatusResult}
 */
export function useVerificationStatus() {
  const { session, loading: sessionLoading } = useAuthSession()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProfile = useCallback(async () => {
    if (!session) {
      setProfile(null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const me = await identityService.getMe()
      setProfile(me)
    } catch (err) {
      if (err instanceof IdentityApiError && err.code === 'authentication_required') {
        // Session exists in Supabase but backend rejected — token may be stale
        setProfile(null)
        setError('authentication_required')
      } else {
        setError('network_error')
      }
    } finally {
      setLoading(false)
    }
  }, [session])

  // Auto-fetch when session changes
  useEffect(() => {
    if (!sessionLoading) {
      fetchProfile()
    }
  }, [session, sessionLoading, fetchProfile])

  return {
    profile,
    loading: sessionLoading || loading,
    error,
    refresh: fetchProfile,  // call after eID callback to update status
  }
}
```

---

## Паттерн использования refresh()

Ключевой сценарий: пользователь вернулся из Authentigate (URL содержит `?context=...`). VerifyPage вызывает `refresh()` чтобы получить актуальный `eid_verified=true`:

```javascript
// В VerifyPage.jsx — после обнаружения успешного callback
useEffect(() => {
  const context = searchParams.get('context')
  const error = searchParams.get('error')

  if (context && !error) {
    // Пользователь вернулся после успешной верификации
    refresh()
  }
}, [])
```

---

## Кэширование и staleness

`/me` response кэшируется в React state пока hook смонтирован.

**Правила:**
- Для отображения в UI (dashboard, badge) — кэш достаточен.
- **Backend — source of truth.** При финальном submit (в GPT) backend снова проверит `eid_verified`. Frontend кэш — только для UX.
- `refresh()` вызывается явно: после eID callback, после logout/login.

---

## `src/verification/VerificationStatusBadge.jsx`

Компонент для Dashboard — показывает текущий статус одной строкой:

```jsx
export function VerificationStatusBadge({ profile, loading }) {
  if (loading) return <span className="status-badge status-loading">...</span>

  if (!profile) return null

  if (profile.eid_verified) {
    return (
      <span className="status-badge status-verified">
        {t('identity.status.verified')}
        {/* "Verified civic participant" */}
      </span>
    )
  }

  return (
    <span className="status-badge status-unverified">
      {t('identity.status.unverified')}
      {/* "Civic account not verified yet" */}
    </span>
  )
}
```

**Canonical label rules (из FR):**

| State | Canonical label EN |
|-------|-------------------|
| Unverified | `Civic account not verified yet` |
| Verified | `Verified civic participant` |

Не заменять синонимами: `civic member`, `verified user`, `verified participant` — запрещено.

---

## Permissions derivation

```javascript
// Утилита для проверки разрешений
export function hasPermission(profile, permission) {
  return profile?.permissions?.includes(permission) ?? false
}

// Использование:
// hasPermission(profile, 'stories:create')  → можно подавать story
// hasPermission(profile, 'stories:draft')   → можно создавать черновики
// hasPermission(profile, 'profile:read')    → можно читать профиль
```

---

## Acceptance Criteria

- [ ] `useVerificationStatus()` с активной сессией → fetches `/me`, возвращает `profile`
- [ ] `useVerificationStatus()` без сессии → `profile=null, loading=false`
- [ ] `refresh()` — повторный вызов `/me`, обновляет `profile`
- [ ] `eid_verified=true` после `refresh()` → отражается в VerificationStatusBadge без перезагрузки страницы
- [ ] `VerificationStatusBadge` с `eid_verified=true` → показывает "Verified civic participant"
- [ ] `VerificationStatusBadge` с `eid_verified=false` → показывает "Civic account not verified yet"
- [ ] Никакой `verified_person_hash` не отображается в UI нигде
