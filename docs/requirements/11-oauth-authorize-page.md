# 11. OAuthAuthorizePage — ChatGPT OAuth Flow

> **Статус:** НЕ реализовано. Spec для `src/auth/OAuthAuthorizePage.jsx`.
> **Предусловие:** Файл 05 (useAuthSession), файл 06 (LoginPage — redirect сюда после логина).
> **Связь:** Точка входа OAuth 2.0 для Custom GPT. После логина LoginPage редиректит обратно сюда.

---

## Назначение

`OAuthAuthorizePage` — экран подтверждения OAuth авторизации. Пользователь видит его когда ChatGPT запрашивает доступ к его DOGEstonia аккаунту.

**Полный OAuth flow (Authorization Code):**

```
ChatGPT
↓  GET /oauth/authorize?response_type=code&client_id=...&redirect_uri=...&state=...
identity-service backend
↓  redirect → /login?oauth_request_id=<uuid>   (если нет сессии)
LoginPage.jsx
↓  успешный логин → navigate('/oauth/authorize?oauth_request_id=<uuid>')
OAuthAuthorizePage.jsx
↓  показывает запрос на доступ
↓  пользователь нажимает "Allow"
↓  POST /oauth/authorize/complete { oauth_request_id }  →  { redirect_url }
↓  window.location.href = redirect_url   (redirect обратно в ChatGPT с code)
ChatGPT
↓  POST /oauth/token   (identity-service)
↓  access_token
```

---

## Route

```
/oauth/authorize?oauth_request_id=<uuid>
```

**Публичный маршрут** (не за ProtectedRoute). Если сессии нет → самостоятельно редиректит на `/login?oauth_request_id=...`.

---

## `src/auth/OAuthAuthorizePage.jsx`

```jsx
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuthSession } from './useAuthSession.js'
import { identityService, IdentityApiError } from '../services/identityService.js'
import { useI18n } from '../i18n/useI18n.js'

export function OAuthAuthorizePage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { session, loading: sessionLoading } = useAuthSession()

  const oauthRequestId = searchParams.get('oauth_request_id')

  const [approving, setApproving] = useState(false)
  const [error, setError] = useState(null)

  // No oauth_request_id → invalid entry point
  useEffect(() => {
    if (!oauthRequestId) {
      navigate('/dashboard', { replace: true })
    }
  }, [oauthRequestId, navigate])

  // No session → redirect to login, preserve oauth_request_id
  useEffect(() => {
    if (!sessionLoading && !session && oauthRequestId) {
      navigate(`/login?oauth_request_id=${oauthRequestId}`, { replace: true })
    }
  }, [session, sessionLoading, oauthRequestId, navigate])

  async function handleAllow() {
    setApproving(true)
    setError(null)
    try {
      const { redirect_url } = await identityService.completeOAuthAuthorize({
        oauth_request_id: oauthRequestId,
      })
      // Redirect back to ChatGPT with auth code
      window.location.href = redirect_url
    } catch (err) {
      if (err instanceof IdentityApiError) {
        setError(err.code)
      } else {
        setError('network_error')
      }
      setApproving(false)
    }
  }

  function handleDeny() {
    // Redirect back to ChatGPT with error=access_denied
    navigate('/dashboard', { replace: true })
  }

  if (sessionLoading || !session) {
    return <div className="oauth-loading">{t('common.loading')}</div>
  }

  return (
    <div className="oauth-authorize">
      <h2 className="oauth-authorize__title">
        {t('identity.oauth.title')}
        {/* "ChatGPT wants to access your DOGEstonia account" */}
      </h2>

      <p className="oauth-authorize__description">
        {t('identity.oauth.description')}
        {/* "This will allow DOGEstonia Custom GPT to submit civic stories on your behalf." */}
      </p>

      <ul className="oauth-authorize__scopes">
        <li>{t('identity.oauth.scopeProfileRead')}</li>
        {/* "Read your civic profile and verification status" */}
        <li>{t('identity.oauth.scopeStoriesDraft')}</li>
        {/* "Create story drafts" */}
        <li>{t('identity.oauth.scopeStoriesCreate')}</li>
        {/* "Submit verified civic stories" */}
      </ul>

      {error && (
        <p className="oauth-authorize__error" role="alert">
          {t('identity.error.generic')}
        </p>
      )}

      <div className="oauth-authorize__actions">
        <button
          className="oauth-authorize__allow"
          onClick={handleAllow}
          disabled={approving}
        >
          {approving ? t('common.loading') : t('identity.oauth.allow')}
          {/* "Allow" */}
        </button>
        <button
          className="oauth-authorize__deny"
          onClick={handleDeny}
          disabled={approving}
        >
          {t('identity.oauth.deny')}
          {/* "Deny" */}
        </button>
      </div>
    </div>
  )
}
```

---

## `identityService.completeOAuthAuthorize` — дополнение к файлу 07

Добавить метод в `createIdentityService()`:

```javascript
/**
 * POST /oauth/authorize/complete — завершает OAuth authorize flow.
 * Вызывается со стороны SPA после того как пользователь нажал "Allow".
 * @param {{ oauth_request_id: string }} params
 * @returns {Promise<{ redirect_url: string }>}
 * @throws {IdentityApiError} code: "invalid_oauth_request" | "oauth_request_expired"
 */
async completeOAuthAuthorize({ oauth_request_id }) {
  if (mockMode) {
    await delay(200)
    return { redirect_url: '#mock-oauth-complete' }
  }
  return identityFetch('/oauth/authorize/complete', {
    method: 'POST',
    body: JSON.stringify({ oauth_request_id }),
  })
},
```

---

## Scope display mapping

| Scope | Человекочитаемое описание EN |
|-------|------------------------------|
| `profile:read` | Read your civic profile and verification status |
| `stories:draft` | Create story drafts |
| `stories:create` | Submit verified civic stories |

Scope-список приходит из `/me.permissions` — показывать только те, которые запрашивает ChatGPT.

---

## Состояния компонента

```
sessionLoading=true        → spinner
session=null               → redirect на /login?oauth_request_id=...
oauthRequestId=null        → redirect на /dashboard
нормальный вид             → форма Allow/Deny
approving=true             → кнопки задизейблены
error present              → inline error
```

---

## Acceptance Criteria

- [ ] `/oauth/authorize?oauth_request_id=<uuid>` без сессии → redirect на `/login?oauth_request_id=<uuid>`
- [ ] После логина LoginPage редиректит обратно на `/oauth/authorize?oauth_request_id=...`
- [ ] Показывает список запрашиваемых scopes
- [ ] Нажатие "Allow" → `POST /oauth/authorize/complete` → `window.location.href = redirect_url`
- [ ] Нажатие "Deny" → redirect на `/dashboard` (ChatGPT получит `error=access_denied` от backend)
- [ ] `/oauth/authorize` без `oauth_request_id` → redirect на `/dashboard`
- [ ] Ошибка от API → показывает generic error, не крашится
