# 09. VerifyPage — eID Verification Entry Point

> **Статус:** НЕ реализовано. Spec для `src/verification/VerifyPage.jsx`.
> **Предусловие:** Файл 05 (useAuthSession), файл 07 (identityService), файл 08 (useVerificationStatus).
> **Связь:** Вызывается из Dashboard (файл 12), из ChatGPT verification link, и принимает callback после Authentigate.

---

## Назначение

`VerifyPage` — единственная точка входа для eID верификации. Обрабатывает два сценария запуска и один сценарий возврата:

**Сценарий 1 — Запуск верификации:**
- Пользователь нажимает "Verify with Estonian eID" на Dashboard или в VerificationPrompt.
- URL: `/verify` или `/verify?context=custom_gpt_submit` или `/verify?context=dashboard_verification`.

**Сценарий 2 — Возврат из Authentigate:**
- Пользователь вернулся из Authentigate. Backend сделал redirect на `https://dogestonia.ee/#/verify?context=...`.
- URL содержит `?context=...` — нет параметра `error`.
- VerifyPage вызывает `refresh()`, ждёт обновлённый `eid_verified`.

**Сценарий 3 — Ошибка от Authentigate/backend:**
- URL содержит `?error=...` — показать специфическое сообщение без перезапуска потока.

> **Важно:** Stories идут через Custom GPT. VerifyPage НЕ содержит `draft_id` логику и не возобновляет story draft. Единственный контекст после верификации — вернуться в ChatGPT или на Dashboard.

---

## Route

```
/verify
/verify?context=custom_gpt_submit
/verify?context=dashboard_verification
/verify?context=custom_gpt_submit&error=identity_already_linked
/verify?context=...&error=eid_session_expired
```

Публичный в смысле routing, но при отсутствии сессии → redirect на `/login` (через ProtectedRoute или inline check).

---

## `src/verification/VerifyPage.jsx`

```jsx
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useVerificationStatus } from './useVerificationStatus.js'
import { useAuthSession } from '../auth/useAuthSession.js'
import { identityService, IdentityApiError } from '../services/identityService.js'
import { VerificationPrompt } from './VerificationPrompt.jsx'
import { useI18n } from '../i18n/useI18n.js'

export function VerifyPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { session, loading: sessionLoading } = useAuthSession()
  const { profile, loading: profileLoading, error: profileError, refresh } = useVerificationStatus()

  const context = searchParams.get('context')   // 'custom_gpt_submit' | 'dashboard_verification' | null
  const errorParam = searchParams.get('error')  // 'identity_already_linked' | 'eid_session_expired' | 'verification_failed' | null

  const [startLoading, setStartLoading] = useState(false)
  const [startError, setStartError] = useState(null)

  // Redirect to login if no session
  useEffect(() => {
    if (!sessionLoading && !session) {
      const target = `/login?return_to=${encodeURIComponent(window.location.hash)}`
      navigate(target, { replace: true })
    }
  }, [session, sessionLoading, navigate])

  // After return from Authentigate: context present, no error → refresh /me
  useEffect(() => {
    if (context && !errorParam && !profileLoading) {
      refresh()
    }
  }, []) // run once on mount only

  async function handleStartVerification() {
    setStartLoading(true)
    setStartError(null)
    try {
      const returnUrl = buildReturnUrl(context)
      const { redirect_url } = await identityService.startEidVerification({
        return_context: context ?? 'dashboard_verification',
        return_url: returnUrl,
        requested_action: 'identity:verify',
      })
      // Full browser redirect — same tab, not popup/iframe
      window.location.href = redirect_url
    } catch (err) {
      if (err instanceof IdentityApiError) {
        if (err.code === 'already_verified') {
          await refresh()
        } else {
          setStartError(err.code)
        }
      } else {
        setStartError('network_error')
      }
      setStartLoading(false)
    }
  }

  if (sessionLoading || profileLoading) {
    return <div className="verify-loading">{t('common.loading')}</div>
  }

  // Error returned from Authentigate/backend (URL param)
  if (errorParam) {
    return <VerifyErrorScreen errorCode={errorParam} context={context} />
  }

  // Already verified
  if (profile?.eid_verified) {
    return <VerifySuccessScreen context={context} />
  }

  // Not verified → show prompt
  return (
    <VerificationPrompt
      onVerify={handleStartVerification}
      loading={startLoading}
      error={startError}
    />
  )
}
```

---

## `buildReturnUrl(context)` — helper

```javascript
function buildReturnUrl(context) {
  // HashRouter requires hash in return_url for spa-app to handle the callback route.
  // Backend allowlist must contain this exact URL format.
  const base = `${window.location.origin}/#/verify`
  const params = new URLSearchParams()
  if (context) params.set('context', context)
  return `${base}?${params.toString()}`
}

// Examples:
// context='custom_gpt_submit' → 'https://dogestonia.ee/#/verify?context=custom_gpt_submit'
// context=null               → 'https://dogestonia.ee/#/verify?'
```

> **Критично для backend:** allowlist в identity-service ДОЛЖЕН содержать `https://dogestonia.ee/#/verify`. Без `#` callback вернётся на BrowserRouter URL и spa-app не получит query params.

---

## `VerifySuccessScreen`

```jsx
function VerifySuccessScreen({ context }) {
  const { t } = useI18n()
  return (
    <div className="verify-success">
      <h2>{t('identity.verify.successTitle')}</h2>
      {/* "Your civic account is verified." */}
      <p>{t('identity.verify.successBody')}</p>
      {/* "You can now submit stories and participate as a verified civic participant." */}

      {context === 'custom_gpt_submit' ? (
        <p className="verify-gpt-hint">{t('identity.verify.returnToGpt')}</p>
        // "Your account is verified. You can now return to ChatGPT and retry submitting your story."
      ) : (
        <a href="#/dashboard">{t('identity.verify.goToDashboard')}</a>
        // "Go to Dashboard"
      )}
    </div>
  )
}
```

---

## `VerifyErrorScreen`

```jsx
function VerifyErrorScreen({ errorCode, context }) {
  const { t } = useI18n()

  if (errorCode === 'identity_already_linked') {
    return (
      <div className="verify-error verify-error--conflict">
        <h2>{t('identity.error.conflictTitle')}</h2>
        {/* "This eID is already linked to another DOGEstonia account." */}
        <p>{t('identity.error.conflictBody')}</p>
        {/* "For safety, we cannot attach the same eID to multiple civic accounts automatically." */}
        <a href="mailto:support@dogestonia.ee">{t('identity.error.contactSupport')}</a>
        <button onClick={() => supabase.auth.signOut()}>
          {t('identity.error.signOutAndSwitch')}
        </button>
        {/* "Log out and use another account" */}
      </div>
    )
  }

  return (
    <div className="verify-error">
      <h2>{t('identity.error.verificationFailed')}</h2>
      {/* "Something went wrong during verification. Please try again." */}
      <a href={`#/verify${context ? `?context=${context}` : ''}`}>
        {t('identity.error.tryAgain')}
      </a>
    </div>
  )
}
```

---

## Состояния компонента (state machine)

```
loading             → показываем spinner
errorParam present  → VerifyErrorScreen
profile.eid_verified=true  → VerifySuccessScreen
profile.eid_verified=false → VerificationPrompt
  startLoading=true         → кнопка задизейблена, spinner
  startError present        → inline error под кнопкой
```

---

## Параметры `context`

| context value | Источник | Поведение после успеха |
|--------------|----------|----------------------|
| `custom_gpt_submit` | ChatGPT verification link | Показать "Return to ChatGPT" hint |
| `dashboard_verification` | Dashboard CTA | Показать "Go to Dashboard" link |
| `null` (отсутствует) | Прямой URL | Показать "Go to Dashboard" link |

---

## Параметры `error`

| error value | Источник | Сообщение |
|------------|----------|-----------|
| `identity_already_linked` | Backend callback | Conflict screen (специфический) |
| `eid_session_expired` | Backend callback | Generic retry |
| `verification_failed` | Backend callback | Generic retry |
| `verification_cancelled` | Пользователь отменил | Тихий возврат (возможно, не показывать как ошибку) |

---

## Acceptance Criteria

- [ ] `/verify` без сессии → redirect на `/login` с `return_to` параметром
- [ ] `/verify` без context и без error → показывает VerificationPrompt
- [ ] Нажатие "Verify with Estonian eID" → вызывает `POST /auth/eid/start` → `window.location.href = redirect_url`
- [ ] Return URL имеет формат `https://dogestonia.ee/#/verify?context=...` (с `#`)
- [ ] Возврат из Authentigate без `error` → вызывает `refresh()` → при `eid_verified=true` → показывает VerifySuccessScreen
- [ ] `context=custom_gpt_submit` после успеха → показывает "Return to ChatGPT" hint
- [ ] `?error=identity_already_linked` → показывает conflict screen с кнопкой "Contact support" и "Sign out"
- [ ] `?error=verification_failed` → показывает generic retry message
- [ ] `already_verified` от API → вызывает `refresh()`, показывает VerifySuccessScreen
- [ ] Никакого `draft_id` нигде — SPA не управляет story drafts
