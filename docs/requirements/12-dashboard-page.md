# 12. DashboardPage — Личный Кабинет

> **Статус:** НЕ реализовано. Spec для `src/dashboard/DashboardPage.jsx`, `ProfileCard.jsx`, `CivicStatusPanel.jsx`.
> **Предусловие:** Файл 06 (ProtectedRoute), файл 08 (useVerificationStatus).
> **Связь:** За ProtectedRoute. Главная страница авторизованного пользователя.

---

## Назначение

Dashboard — личный кабинет авторизованного пользователя. Показывает:
1. Кто ты (ProfileCard).
2. Верифицирован ли твой civic account (CivicStatusPanel).
3. Что можно делать (placeholder для story submission через GPT).
4. Что будет потом (wallet placeholder).

**Строгое разграничение:** Dashboard НЕ содержит форму подачи истории. Stories идут через Custom GPT. Dashboard только отображает статус и даёт entry point для верификации.

---

## Route

```
/dashboard
```

Защищён `ProtectedRoute` — без сессии redirect на `/login`.

---

## Структура файлов

```
src/dashboard/
├── DashboardPage.jsx        ← страница целиком, оркестрирует данные
├── ProfileCard.jsx          ← имя пользователя, email, дата регистрации
└── CivicStatusPanel.jsx     ← VerificationStatusBadge + CTA + wallet placeholder
```

---

## `src/dashboard/DashboardPage.jsx`

```jsx
import { useVerificationStatus } from '../verification/useVerificationStatus.js'
import { useAuthSession } from '../auth/useAuthSession.js'
import { ProfileCard } from './ProfileCard.jsx'
import { CivicStatusPanel } from './CivicStatusPanel.jsx'
import { useI18n } from '../i18n/useI18n.js'

export function DashboardPage() {
  const { t } = useI18n()
  const { user } = useAuthSession()
  const { profile, loading, error, refresh } = useVerificationStatus()

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">{t('identity.dashboard.title')}</h1>
      {/* "Your Civic Account" */}

      <ProfileCard user={user} profile={profile} loading={loading} />

      <CivicStatusPanel
        profile={profile}
        loading={loading}
        error={error}
        onRefresh={refresh}
      />
    </div>
  )
}
```

---

## `src/dashboard/ProfileCard.jsx`

```jsx
import { useI18n } from '../i18n/useI18n.js'

export function ProfileCard({ user, profile, loading }) {
  const { t } = useI18n()

  if (loading) {
    return <div className="profile-card profile-card--loading" />
  }

  return (
    <div className="profile-card">
      <div className="profile-card__name">
        {profile?.display_name ?? user?.email ?? t('identity.profile.anonymous')}
        {/* display_name из /me, fallback на email, fallback на "Anonymous" */}
      </div>
      <div className="profile-card__email">{user?.email}</div>
      {profile?.created_at && (
        <div className="profile-card__joined">
          {t('identity.profile.joinedAt', { date: formatDate(profile.created_at) })}
          {/* "Member since May 2026" */}
        </div>
      )}
    </div>
  )
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}
```

---

## `src/dashboard/CivicStatusPanel.jsx`

```jsx
import { useNavigate } from 'react-router-dom'
import { VerificationStatusBadge } from '../verification/useVerificationStatus.js'
import { useI18n } from '../i18n/useI18n.js'

export function CivicStatusPanel({ profile, loading, error, onRefresh }) {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <div className="civic-status-panel">
      <h2 className="civic-status-panel__heading">{t('identity.dashboard.civicStatus')}</h2>
      {/* "Civic Status" */}

      <VerificationStatusBadge profile={profile} loading={loading} />

      {/* Unverified state — description + CTA */}
      {!loading && profile && !profile.eid_verified && (
        <div className="civic-status-panel__unverified">
          <p>{t('identity.dashboard.unverifiedDescription')}</p>
          {/*
            "You can browse DOGEstonia, but story submission requires
            a one-time eID verification."
          */}
          <button
            className="civic-status-panel__verify-cta"
            onClick={() => navigate('/#/verify?context=dashboard_verification')}
          >
            {t('identity.dashboard.verifyCta')}
            {/* "Verify when needed" */}
          </button>
        </div>
      )}

      {/* Verified state — description */}
      {!loading && profile?.eid_verified && (
        <div className="civic-status-panel__verified">
          <p>{t('identity.dashboard.verifiedDescription')}</p>
          {/*
            "Your account can submit stories and participate in civic signals."
          */}
        </div>
      )}

      {/* GPT entry point — always visible after login */}
      {!loading && (
        <div className="civic-status-panel__gpt-hint">
          <p>{t('identity.dashboard.gptHint')}</p>
          {/* "Stories are submitted through DOGEstonia Custom GPT." */}
        </div>
      )}

      {/* Wallet placeholder — always visible, post-MVP */}
      <div className="civic-status-panel__wallet-placeholder">
        <p>{t('identity.dashboard.walletPlaceholder')}</p>
        {/*
          "Wallet signatures will be added later to prove authorship of each story
          cryptographically. For now, eID verification protects the early network
          from bots and duplicate civic accounts."
        */}
      </div>

      {/* Error retry */}
      {error && (
        <div className="civic-status-panel__error">
          <p>{t('identity.error.profileLoadFailed')}</p>
          <button onClick={onRefresh}>{t('common.retry')}</button>
        </div>
      )}
    </div>
  )
}
```

---

## Canonical copy (зафиксировано в FR)

### Dashboard status card — Unverified

```
Civic account not verified yet

You can browse DOGEstonia, but story submission requires a one-time eID verification.
```
CTA: `Verify when needed`

### Dashboard status card — Verified

```
Verified civic participant

Your account can submit stories and participate in civic signals.
```

### Wallet placeholder

```
Wallet signatures will be added later to prove authorship of each story cryptographically.
For now, eID verification protects the early network from bots and duplicate civic accounts.
```

---

## Навигация из Dashboard

| Действие | Куда |
|----------|------|
| "Verify when needed" | `/#/verify?context=dashboard_verification` |
| Нет кнопки "Submit story" | Stories только через Custom GPT |

---

## Интеграция в App.jsx

```jsx
// App.jsx — добавить маршрут
import { DashboardPage } from './dashboard/DashboardPage.jsx'
import { ProtectedRoute } from './auth/ProtectedRoute.jsx'

// В <Routes>:
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

---

## Acceptance Criteria

- [ ] `/dashboard` без сессии → redirect на `/login` (ProtectedRoute)
- [ ] `/dashboard` с сессией → загружает `useVerificationStatus()` → показывает ProfileCard + CivicStatusPanel
- [ ] `eid_verified=false` → показывает "Civic account not verified yet" + CTA "Verify when needed"
- [ ] `eid_verified=true` → показывает "Verified civic participant" + verified description
- [ ] Wallet placeholder присутствует всегда (независимо от статуса верификации)
- [ ] Нет кнопки "Submit story" на Dashboard — stories через GPT
- [ ] `error` от `useVerificationStatus` → показывает retry кнопку
- [ ] ProfileCard показывает `display_name` или email пользователя
- [ ] Все строки через i18n, не hardcoded
