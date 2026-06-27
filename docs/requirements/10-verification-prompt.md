# 10. VerificationPrompt — eID Verification UI

> **Статус:** НЕ реализовано. Spec для `src/verification/VerificationPrompt.jsx`.
> **Предусловие:** Файл 09 (VerifyPage) — родительский компонент.
> **Связь:** Используется в VerifyPage (файл 09), Dashboard CivicStatusPanel (файл 12).

---

## Назначение

`VerificationPrompt` — изолированный UI компонент, который показывает объяснение eID верификации и CTA.

**Не содержит бизнес-логики** — только UI. Логика запуска (`startEidVerification`) передаётся через `onVerify` prop из VerifyPage.

---

## `src/verification/VerificationPrompt.jsx`

```jsx
import { useI18n } from '../i18n/useI18n.js'

/**
 * @param {{ onVerify: () => void, loading: boolean, error: string | null }} props
 */
export function VerificationPrompt({ onVerify, loading, error }) {
  const { t } = useI18n()

  return (
    <div className="verification-prompt">
      <h2 className="verification-prompt__title">
        {t('identity.prompt.title')}
        {/* "Verify your civic account" */}
      </h2>

      <p className="verification-prompt__body">
        {t('identity.prompt.body')}
        {/*
          "DOGEstonia uses Estonian eID only to confirm that one civic account
          belongs to one real person."
        */}
      </p>

      <ul className="verification-prompt__assurances">
        <li>{t('identity.prompt.assurance1')}</li>
        {/* "Your legal identity is not shown publicly." */}
        <li>{t('identity.prompt.assurance2')}</li>
        {/* "Your personal code is not stored in readable form." */}
        <li>{t('identity.prompt.assurance3')}</li>
        {/* "No identity information is written to blockchain." */}
      </ul>

      {error && (
        <p className="verification-prompt__error" role="alert">
          {getErrorMessage(error, t)}
        </p>
      )}

      <button
        className="verification-prompt__cta"
        onClick={onVerify}
        disabled={loading}
      >
        {loading ? t('common.loading') : t('identity.prompt.cta')}
        {/* "Verify with Estonian eID" */}
      </button>
    </div>
  )
}

function getErrorMessage(code, t) {
  switch (code) {
    case 'already_verified':
      return t('identity.error.alreadyVerified')
      // Не должно показываться — caller вызывает refresh()
    case 'rate_limit_exceeded':
      return t('identity.error.rateLimitExceeded')
      // "Too many attempts. Please try again later."
    case 'network_error':
    default:
      return t('identity.error.generic')
      // "Something went wrong during verification. Please try again."
  }
}
```

---

## Canonical copy (зафиксированный текст)

Эти тексты зафиксированы в FR и **не изменяются** без явного обновления требований.

### Заголовок
```
Verify your civic account
```

### Тело
```
DOGEstonia uses Estonian eID only to confirm that one civic account belongs to one real person.
```

### Три assurance-пункта
```
Your legal identity is not shown publicly.
Your personal code is not stored in readable form.
No identity information is written to blockchain.
```

### CTA кнопка
```
Verify with Estonian eID
```

### Запрещённые термины (не использовать нигде в UI)
```
KYC
Government identity check
Legal identity login
Bank verification
```

---

## Размещение на Dashboard (inline вариант)

На Dashboard `VerificationPrompt` показывается inline в `CivicStatusPanel` — не как отдельная страница, а как часть панели статуса:

```jsx
// CivicStatusPanel.jsx
{!profile?.eid_verified && (
  <VerificationPrompt
    onVerify={() => navigate('/#/verify?context=dashboard_verification')}
    loading={false}
    error={null}
  />
)}
```

Навигация на `/verify` — не inline запуск. VerifyPage содержит полную логику.

---

## Accessibility

- `role="alert"` на блоке ошибки — screen reader объявит ошибку автоматически.
- `disabled` на кнопке при `loading=true` — предотвращает двойной submit.
- Список assurances через `<ul><li>` — семантический список для screen readers.
- Заголовок через `<h2>` — иерархия headers.

---

## Acceptance Criteria

- [ ] Компонент показывает заголовок "Verify your civic account"
- [ ] Три assurance-пункта соответствуют canonical copy — без изменений
- [ ] CTA "Verify with Estonian eID" вызывает `onVerify()`
- [ ] `loading=true` → кнопка задизейблена, показывается индикатор загрузки
- [ ] `error='network_error'` → показывает generic error с `role="alert"`
- [ ] `error='rate_limit_exceeded'` → показывает "Too many attempts. Please try again later."
- [ ] Не содержит слов: "KYC", "Government identity check", "Legal identity login", "Bank verification"
- [ ] Компонент не делает HTTP вызовы самостоятельно — только UI
