# 13. Error Handling — Состояния ошибок

> **Статус:** НЕ реализовано. Spec для обработки ошибок во всех identity-компонентах.
> **Предусловие:** Файлы 07 (IdentityApiError), 09 (VerifyPage), 11 (OAuthAuthorizePage), 12 (Dashboard).
> **Связь:** Применяется горизонтально — каждый компонент следует этим правилам.

---

## Принцип

Ошибки делятся на два класса:

1. **Специфические** — имеют собственный экран или сообщение с конкретными инструкциями.
2. **Generic** — один общий текст, кнопка retry.

**Запрещено:** показывать технические коды ошибок пользователю (`IdentityApiError.code`, HTTP статусы, stack trace).

---

## Таблица ошибок

| `IdentityApiError.code` / источник | Класс | Поведение | Canonical UI copy |
|------------------------------------|-------|-----------|------------------|
| `authentication_required` | Generic | Redirect на `/login` | (redirect, не сообщение) |
| `verification_required` | Generic | Показать VerificationPrompt | (VerificationPrompt, не сообщение) |
| `already_verified` | Silent | `refresh()` → обновить статус, продолжить | Нет UI — прозрачно |
| `identity_already_linked` | Специфический | Conflict screen | см. ниже |
| `verification_failed` | Generic | Retry message | "Something went wrong during verification. Please try again." |
| `verification_cancelled` | Silent | Тихий возврат | Нет UI — пользователь сам отменил |
| `eid_session_expired` | Generic | Retry message | "Verification session expired. Please try again." |
| `rate_limit_exceeded` | Generic | Retry later message | "Too many attempts. Please try again later." |
| `invalid_oauth_request` | Generic | Dashboard redirect | "This authorization request is invalid or has expired." |
| `oauth_request_expired` | Generic | Dashboard redirect | "This authorization request is invalid or has expired." |
| `network_error` (fetch failed) | Generic | Retry message | "Something went wrong. Please check your connection and try again." |
| `authentication_required` от useVerificationStatus | Generic | Retain in state; login prompt | (loginPage) |

---

## Identity Conflict Screen (специфический)

Источник: `?error=identity_already_linked` в URL (от backend callback) или `IdentityApiError.code === 'identity_already_linked'`.

```
Этот eID уже привязан к другому аккаунту DOGEstonia.

В целях безопасности мы не можем автоматически привязать один и тот же
eID к нескольким гражданским аккаунтам.
```

Canonical EN copy:
```
This eID is already linked to another DOGEstonia account.

For safety, we cannot attach the same eID to multiple civic accounts automatically.
```

**CTA (два варианта):**
- `Contact support` — ссылка на `mailto:support@dogestonia.ee`
- `Log out and use another account` — вызывает `supabase.auth.signOut()`, redirect на `/login`

**Ограничения:**
- MVP MUST NOT предлагать automatic merge аккаунтов.
- Conflict screen ДОЛЖЕН очистить любой pending verification state (не перезапускать автоматически).

---

## Generic Error Component

```jsx
// src/shared/ErrorMessage.jsx
export function ErrorMessage({ messageKey, onRetry }) {
  const { t } = useI18n()
  return (
    <div className="error-message" role="alert">
      <p>{t(messageKey)}</p>
      {onRetry && (
        <button onClick={onRetry}>{t('common.retry')}</button>
      )}
    </div>
  )
}
```

Использование:
```jsx
{error === 'network_error' && (
  <ErrorMessage messageKey="identity.error.generic" onRetry={handleRetry} />
)}
{error === 'rate_limit_exceeded' && (
  <ErrorMessage messageKey="identity.error.rateLimitExceeded" />
)}
```

---

## Правила обработки в каждом компоненте

### VerifyPage (файл 09)

```
URL ?error=identity_already_linked  → VerifyErrorScreen с conflict UI
URL ?error=*                        → generic retry
API error already_verified          → refresh(), VerifySuccessScreen
API error rate_limit_exceeded       → inline message под кнопкой
API error *                         → inline generic error
```

### OAuthAuthorizePage (файл 11)

```
API error invalid_oauth_request     → "authorization request is invalid" + Dashboard link
API error oauth_request_expired     → "authorization request is invalid" + Dashboard link
API error *                         → inline generic error
```

### Dashboard / CivicStatusPanel (файл 12)

```
useVerificationStatus error='authentication_required'  → LoginPage redirect
useVerificationStatus error='network_error'            → retry кнопка
```

### useVerificationStatus (файл 08)

```
IdentityApiError authentication_required  → setError('authentication_required')
Any other error                           → setError('network_error')
```

---

## Что НЕ отображается пользователю

- HTTP status codes (401, 403, 429, 500)
- `IdentityApiError.code` в сыром виде
- Stack trace
- `verified_person_hash` — никогда, ни при каких ошибках
- Внутренние UUID (session_id, user_id в error messages)

---

## Acceptance Criteria

- [ ] `identity_already_linked` → показывает conflict screen с canonical EN copy
- [ ] Conflict screen содержит "Contact support" и "Log out" CTA, НЕ "Try again"
- [ ] `rate_limit_exceeded` → показывает "Too many attempts. Please try again later."
- [ ] `network_error` → показывает generic message с retry кнопкой
- [ ] `verification_cancelled` → тихий возврат, нет error UI
- [ ] `already_verified` → refresh() без показа ошибки
- [ ] `authentication_required` → redirect на `/login`, не error screen
- [ ] Ни один компонент не отображает HTTP status code напрямую
- [ ] Ни один компонент не отображает `verified_person_hash` ни в каком контексте
