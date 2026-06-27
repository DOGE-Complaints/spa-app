# 02. Routing Architecture

> **Статус:** НЕ реализовано. Критический файл — читать перед любыми изменениями в `App.jsx` или `main.jsx`.
> **Текущий код:** `src/main.jsx:4` — `HashRouter`. `src/App.jsx` — 2 routes.
> **Связь:** Влияет на файлы 06 (LoginPage), 09 (VerifyPage), 13 (OAuthAuthorizePage).

---

## КРИТИЧНО: HashRouter и eID callback

**Текущий факт:** spa-app использует `HashRouter`. URL выглядит как:
```
https://dogestonia.ee/#/board
https://dogestonia.ee/#/verify
```

**Проблема:** Authentigate (backend) делает redirect обратно на SPA после верификации. Backend знает только path — не hash. Стандартный redirect:
```
https://dogestonia.ee/verify?context=story_submission&draft_id=abc
```

Но HashRouter отображает это как `https://dogestonia.ee/#/` — без `/verify` в hash, SPA не знает куда перейти.

**Решение: backend redirect должен включать `#`:**

```
# Правильно (backend redirect из identity-service /auth/eid/callback):
https://dogestonia.ee/#/verify?context=story_submission&draft_id=abc

# Неправильно:
https://dogestonia.ee/verify?context=story_submission&draft_id=abc
```

**Это требование к identity-service (backend):** `return_url` в allowlist и redirect ДОЛЖНЫ использовать hash-формат.

**Значит allowlist в identity-service (из файла 11 бека) ДОЛЖЕН быть:**
```python
ALLOWED_RETURN_URLS = [
    "https://dogestonia.ee/#/verify",
    "https://dogestonia.ee/#/dashboard/verify",
]
```

**Для local development (localhost):**
```
http://localhost:5173/#/verify?context=story_submission
```

### Альтернатива: переход на BrowserRouter

Если потребуется переход на BrowserRouter (для чистых URL), это требует:
1. Изменения `main.jsx` (HashRouter → BrowserRouter).
2. Настройки web-сервера: fallback всех маршрутов на `index.html`.
3. Обновления `vite.config.js` с `base: '/'` вместо `'./'`.
4. Может нарушить Arweave деплой (статический контент без server routing).

**MVP решение: остаться на HashRouter, адаптировать backend redirect URLs.**

---

## Полная карта routes (после реализации identity)

### Существующие (не менять)

| Route | Component | Публичный | Описание |
|-------|-----------|----------|---------|
| `/` | Navigate to `/board` | ✅ | Redirect |
| `/board` | `BoardPage` | ✅ | Список issues |
| `/issue/:id` | `IssuePage` | ✅ | Детальная страница |
| `*` | Navigate to `/board` | ✅ | Fallback |

### Новые (добавить)

| Route | Component | Публичный | Описание |
|-------|-----------|----------|---------|
| `/login` | `LoginPage` | ✅ | Login/signup через Supabase Auth |
| `/dashboard` | `DashboardPage` | 🔐 | Личный кабинет (ProtectedRoute) |
| `/verify` | `VerifyPage` | 🔐* | eID verification (* публичный, но с login redirect) |
| `/oauth/authorize` | `OAuthAuthorizePage` | ✅ | OAuth 2.0 authorize (ChatGPT redirect сюда) |

\* `/verify` — технически публичен (ChatGPT может дать ссылку), но при отсутствии сессии показывает login prompt внутри.

---

## Целевой `App.jsx` (после реализации)

```jsx
import { Navigate, Route, Routes } from 'react-router-dom'
import { BoardPage } from './pages/BoardPage.jsx'
import { IssuePage } from './pages/IssuePage.jsx'
import { LoginPage } from './auth/LoginPage.jsx'
import { DashboardPage } from './dashboard/DashboardPage.jsx'
import { VerifyPage } from './verification/VerifyPage.jsx'
import { OAuthAuthorizePage } from './auth/OAuthAuthorizePage.jsx'
import { ProtectedRoute } from './auth/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      {/* Existing — DO NOT MODIFY */}
      <Route path="/" element={<Navigate to="/board" replace />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/issue/:id" element={<IssuePage />} />

      {/* New identity routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/oauth/authorize" element={<OAuthAuthorizePage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback — keep last */}
      <Route path="*" element={<Navigate to="/board" replace />} />
    </Routes>
  )
}

export default App
```

---

## ProtectedRoute Component

```jsx
// src/auth/ProtectedRoute.jsx

import { Navigate, useLocation } from 'react-router-dom'
import { useAuthSession } from './useAuthSession.js'

export function ProtectedRoute({ children }) {
  const { session, loading } = useAuthSession()
  const location = useLocation()

  if (loading) {
    return <div className="auth-loading" aria-live="polite">Loading...</div>
  }

  if (!session) {
    // Preserve intended destination for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
```

**Правило:** `ProtectedRoute` НЕ применяется к `/board`, `/issue/:id` — они публичны.

---

## URL Query Params для identity routes

### /verify query params

| Param | Значения | Источник |
|-------|---------|---------|
| `context` | `story_submission` \| `custom_gpt_submit` \| `dashboard_verification` | Backend redirect / direct link |
| `draft_id` | UUID | Backend redirect после eID callback |
| `error` | `identity_already_linked` \| `eid_verification_failed` \| `eid_session_expired` | Backend redirect при ошибке |

Пример full URL (HashRouter):
```
https://dogestonia.ee/#/verify?context=story_submission&draft_id=abc123
```

### /login query params

| Param | Значения | Источник |
|-------|---------|---------|
| `redirect` | encoded path | ProtectedRoute state |
| `oauth_request_id` | UUID | /oauth/authorize (при OAuth login flow) |

### /oauth/authorize query params

| Param | Значения | Источник |
|-------|---------|---------|
| `oauth_request_id` | UUID | Identity-service (redirect от `/oauth/authorize` backend) |

---

## Работа с hash-based query params

`HashRouter` помещает query params в hash fragment. Для правильного парсинга:

```javascript
// ПРАВИЛЬНО с HashRouter:
import { useSearchParams } from 'react-router-dom'

function VerifyPage() {
  const [searchParams] = useSearchParams()
  const context = searchParams.get('context')    // работает
  const draftId = searchParams.get('draft_id')   // работает
  const error = searchParams.get('error')         // работает
}
```

react-router-dom 7 корректно парсит query params даже в HashRouter режиме.

---

## Acceptance Criteria

- [ ] `/board` и `/issue/:id` работают без изменений после добавления новых routes
- [ ] `/login` отображает LoginPage без сессии
- [ ] `/dashboard` без сессии → redirect на `/login` с сохранением пути (state.from)
- [ ] `/dashboard` с сессией → отображает DashboardPage
- [ ] `/verify` без сессии → показывает login prompt внутри VerifyPage
- [ ] `/verify?context=story_submission&draft_id=abc` → VerifyPage читает оба params
- [ ] `/verify?error=identity_already_linked` → VerifyPage показывает error экран
- [ ] Backend redirect `https://dogestonia.ee/#/verify?...` корректно открывает VerifyPage в HashRouter
- [ ] `/oauth/authorize` отображает OAuthAuthorizePage (не защищён ProtectedRoute)
