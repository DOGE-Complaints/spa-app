# 05. Supabase Auth Client

> **Статус:** НЕ реализовано. Spec для `src/auth/supabaseClient.js` и `src/auth/useAuthSession.js`.
> **Предусловие:** Файл 03 (зависимости) + файл 04 (env vars) выполнены.
> **Связь:** Используется в файлах 06 (LoginPage), 07 (API Client bearer), 08 (useMe).

---

## Назначение

`supabaseClient.js` — единственный файл, создающий Supabase JS Client instance. Singleton.  
`useAuthSession.js` — React hook, предоставляющий текущую Supabase Auth сессию всему приложению.

**Принцип:** Supabase Client не связан с identity-service. Он только управляет аутентификацией (login/logout/session). Затем SPA использует Supabase `access_token` как Bearer при вызовах к identity-service.

---

## `src/auth/supabaseClient.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set. Auth will not work.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Supabase JS Client по умолчанию хранит сессию в localStorage.
    // persistSession: true — включено по умолчанию.
    // autoRefreshToken: true — включено по умолчанию.
    storageKey: 'dogestonia-auth',  // кастомный ключ чтобы избежать конфликтов
  },
})
```

**Правила:**
- Никогда не импортировать `createClient` напрямую из других файлов — только через `supabaseClient.js`.
- Singleton: один `supabase` instance на всё приложение.
- `SUPABASE_SERVICE_ROLE` — никогда в браузерный код. Только `SUPABASE_ANON_KEY`.

---

## `src/auth/useAuthSession.js`

React hook, который:
1. При mount — восстанавливает существующую сессию из localStorage.
2. Подписывается на `supabase.auth.onAuthStateChange`.
3. Предоставляет `session`, `user`, `loading` всему дереву компонентов.

```javascript
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'

/**
 * @typedef {Object} AuthSessionState
 * @property {import('@supabase/supabase-js').Session | null} session
 * @property {import('@supabase/supabase-js').User | null} user
 * @property {boolean} loading
 */

/**
 * Returns current Supabase auth session.
 * Automatically restores session from localStorage on mount.
 * Subscribes to auth state changes (login, logout, token refresh).
 * @returns {AuthSessionState}
 */
export function useAuthSession() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    session,
    user: session?.user ?? null,
    loading,
  }
}
```

---

## Получение Bearer token для identity-service

```javascript
// Паттерн: получить access_token из текущей сессии
async function getAccessToken() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

// Или через авто-refresh (рекомендуется):
async function getValidAccessToken() {
  // getSession() автоматически обновит токен если он истёк
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) return null
  return session.access_token
}
```

Это используется в `identityApiClient.js` (файл 07) при формировании `Authorization: Bearer` header.

---

## Session Storage

Supabase JS Client хранит session в `localStorage` под ключом `dogestonia-auth` (как задано в конфиге).

Что хранится: `{ access_token, refresh_token, expires_at, user: {...} }`.

**Не хранить вручную:**
- Никаких `localStorage.setItem('token', ...)` в коде — всё через Supabase Client.
- `access_token` не читать напрямую из localStorage — только через `supabase.auth.getSession()`.

---

## AuthSessionContext (опционально)

Если `useAuthSession` нужен в глубоко вложенных компонентах без prop drilling — добавить Context:

```javascript
// src/auth/AuthSessionContext.jsx
import { createContext, useContext } from 'react'
import { useAuthSession } from './useAuthSession.js'

const AuthSessionContext = createContext(null)

export function AuthSessionProvider({ children }) {
  const auth = useAuthSession()
  return <AuthSessionContext.Provider value={auth}>{children}</AuthSessionContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthSessionContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthSessionProvider')
  return ctx
}
```

Добавить `<AuthSessionProvider>` в `main.jsx` рядом с `I18nProvider`:
```jsx
<I18nProvider>
  <AuthSessionProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthSessionProvider>
</I18nProvider>
```

---

## Acceptance Criteria

- [ ] `import { supabase } from './auth/supabaseClient.js'` — не выбрасывает ошибку при пустых env vars (только warning)
- [ ] `useAuthSession()` при наличии сессии в localStorage → `loading=false, session≠null` после mount
- [ ] `useAuthSession()` при отсутствии сессии → `loading=false, session=null`
- [ ] После `supabase.auth.signOut()` → `useAuthSession()` возвращает `session=null`
- [ ] После `supabase.auth.signInWithPassword(...)` → `useAuthSession()` обновляется без перезагрузки страницы
- [ ] `access_token` из `getValidAccessToken()` принимается identity-service как валидный Bearer
