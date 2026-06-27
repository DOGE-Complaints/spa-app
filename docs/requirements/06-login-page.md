# 06. Login Page

> **Статус:** НЕ реализовано. Spec для `src/auth/LoginPage.jsx` и `src/auth/ProtectedRoute.jsx`.
> **Предусловие:** Файл 05 (Supabase Auth Client) реализован.
> **Связь:** Используется как redirect target из ProtectedRoute. Также entry point OAuth login flow для ChatGPT (файл 11).

---

## Назначение

`LoginPage` — единственная страница входа для DOGEstonia. Два сценария использования:

**Сценарий A (прямой):** Пользователь открывает `/dashboard` без сессии → `ProtectedRoute` редиректит на `/login`.

**Сценарий B (OAuth):** ChatGPT редиректит пользователя на `/oauth/authorize` → identity-service backend перенаправляет на `/login?oauth_request_id=<uuid>` → после логина пользователь возвращается в OAuth flow.

Оба сценария — **один и тот же компонент** `LoginPage.jsx`.

---

## Route

```
/login
```

Публичный маршрут (не требует сессии — это же страница входа).  
Если пользователь уже залогинен → redirect на `/dashboard`.

---

## `src/auth/LoginPage.jsx` — спецификация

### Поведение при монтировании

```
1. Проверить useAuthSession().session
2. Если session существует:
   a. Если есть state.from (от ProtectedRoute) → navigate(state.from)
   b. Если есть oauth_request_id в URL → navigate('/oauth/authorize?oauth_request_id=...')
   c. Иначе → navigate('/dashboard')
3. Показать форму логина
```

### Поддерживаемые методы входа (MVP)

| Метод | Supabase API | Priority |
|-------|-------------|---------|
| **Email + Password** | `supabase.auth.signInWithPassword()` | Primary |
| **Magic Link (OTP)** | `supabase.auth.signInWithOtp()` | Secondary |

UI: две вкладки или переключатель между методами.

### Логика email/password login

```javascript
async function handleEmailLogin(email, password) {
  setLoading(true)
  setError(null)
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    setError(error.message)
  }
  // onAuthStateChange в useAuthSession сам обработает redirect
  setLoading(false)
}
```

### Логика magic link / OTP

```javascript
async function handleMagicLink(email) {
  setLoading(true)
  setError(null)
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/#/dashboard`,
    },
  })
  if (!error) {
    setEmailSent(true)  // показать "Check your email"
  } else {
    setError(error.message)
  }
  setLoading(false)
}
```

### Signup (регистрация)

Supabase handleет signup через тот же `signInWithPassword` с флагом `signUp`:

```javascript
async function handleSignup(email, password) {
  const { error } = await supabase.auth.signUp({ email, password })
  if (!error) {
    setEmailSent(true)  // "Confirm your email"
  }
}
```

UI переключатель: "Log in" / "Sign up" — одна форма, разное действие.

---

## UI структура

```
┌─────────────────────────────────────────┐
│  🐕 DOGEstonia                          │
│                                         │
│  Join DOGEstonia                        │
│                                         │
│  ○ Log in   ● Sign up                   │
│                                         │
│  Email ________________________         │
│  Password ______________________       │
│                                         │
│  [ Log in / Sign up ]                   │
│                                         │
│  ─── or ───                             │
│                                         │
│  [ Send magic link ]                    │
│                                         │
│  [Magic link sent: check your email]    │
└─────────────────────────────────────────┘
```

---

## Redirect после успешного логина

```javascript
// В useEffect при изменении session:
useEffect(() => {
  if (!session) return
  
  const oauthRequestId = searchParams.get('oauth_request_id')
  if (oauthRequestId) {
    // OAuth flow: продолжить OAuth authorize
    navigate(`/oauth/authorize?oauth_request_id=${oauthRequestId}`)
    return
  }
  
  // ProtectedRoute сохраняет intended destination в location.state.from
  const from = location.state?.from?.pathname ?? '/dashboard'
  navigate(from, { replace: true })
}, [session])
```

---

## `src/auth/ProtectedRoute.jsx`

```jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthSession } from './useAuthSession.js'

export function ProtectedRoute({ children }) {
  const { session, loading } = useAuthSession()
  const location = useLocation()

  if (loading) {
    return <div className="auth-loading">Loading...</div>
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
```

**Правило:** `ProtectedRoute` только для `/dashboard`. НЕ применяется к `/board`, `/issue/:id`, `/verify`, `/oauth/authorize`.

---

## i18n strings (ключи)

```javascript
// dictionaries.js ключи (подробно в файле 14)
t('identity.login.title')         // "Join DOGEstonia" / "Liitu DOGEstoniaga"
t('identity.login.email')         // "Email"
t('identity.login.password')      // "Password"
t('identity.login.submit')        // "Log in"
t('identity.signup.submit')       // "Sign up"
t('identity.login.magicLink')     // "Send magic link"
t('identity.login.checkEmail')    // "Check your email"
t('identity.login.switchSignup')  // "Sign up"
t('identity.login.switchLogin')   // "Log in"
```

---

## Acceptance Criteria

- [ ] `/login` без сессии → показывает форму
- [ ] `/login` с существующей сессией → немедленный redirect на `/dashboard`
- [ ] Успешный email/password login → redirect на `/dashboard` (или `state.from`)
- [ ] Успешный magic link → показывает "Check your email" (не redirect)
- [ ] Неверный пароль → показывает error message (не crash)
- [ ] Signup → показывает "Confirm your email"
- [ ] После login в OAuth flow (`?oauth_request_id=...`) → redirect на `/oauth/authorize?oauth_request_id=...`
- [ ] ProtectedRoute: `/dashboard` без сессии → redirect `/login?` с сохранением `state.from`
- [ ] Все строки через i18n, не hardcoded
