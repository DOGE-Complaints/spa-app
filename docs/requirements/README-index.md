# spa-app Identity Requirements — Index

> **Проект:** spa-app — React/Vite браузерный SPA  
> **Контекст:** Расширение существующего приложения (BoardPage, IssuePage) новым identity-модулем.  
> **Источник:** `docs/Identify/identity-frontend.md`  
> **Обновлено:** 2026-06-12

> **ВАЖНО:** это **план расширения**, не текущее состояние SPA. В коде identity-модуль **не реализован (0%)** — см. [gap-report §G10](../analysis/spa-app-doc-code-gap-report.md). Статус «Planned — NOT IMPLEMENTED» ниже отражает спецификацию, а не готовность.

> **Статус реализации (2026-06-12):** соответствует коду (MVP). Gap G10 закрыт документально — planned/not implemented.

---

## Что строится

SPA расширяется для двух задач:
1. **Аутентификация** — login/signup через Supabase Auth.
2. **eID верификация** — один раз, для подтверждения civic account.

Stories подаются **только через Custom GPT** — SPA не содержит форм подачи историй.

---

## Таблица файлов

| # | Файл | Компоненты | Статус |
|---|------|-----------|--------|
| 01 | [01-spa-context-and-extension-strategy.md](01-spa-context-and-extension-strategy.md) | Обзор, принципы расширения, не трогать | Planned — NOT IMPLEMENTED |
| 02 | [02-routing-architecture.md](02-routing-architecture.md) | App.jsx, HashRouter, ProtectedRoute, маршруты | Planned — NOT IMPLEMENTED |
| 03 | [03-package-dependencies.md](03-package-dependencies.md) | `@supabase/supabase-js`, package.json | Planned — NOT IMPLEMENTED |
| 04 | [04-env-configuration.md](04-env-configuration.md) | `.env`, `.env.local`, VITE_* переменные | Planned — NOT IMPLEMENTED |
| 05 | [05-supabase-auth-client.md](05-supabase-auth-client.md) | `supabaseClient.js`, `useAuthSession.js` | Planned — NOT IMPLEMENTED |
| 06 | [06-login-page.md](06-login-page.md) | `LoginPage.jsx`, `ProtectedRoute.jsx` | Planned — NOT IMPLEMENTED |
| 07 | [07-identity-api-client.md](07-identity-api-client.md) | `identityService.js`, `IdentityApiError` | Planned — NOT IMPLEMENTED |
| 08 | [08-me-hook-and-status.md](08-me-hook-and-status.md) | `useVerificationStatus.js`, `VerificationStatusBadge.jsx`, `hasPermission()` | Planned — NOT IMPLEMENTED |
| 09 | [09-verify-page.md](09-verify-page.md) | `VerifyPage.jsx` — /verify маршрут | Planned — NOT IMPLEMENTED |
| 10 | [10-verification-prompt.md](10-verification-prompt.md) | `VerificationPrompt.jsx` — eID UI | Planned — NOT IMPLEMENTED |
| 11 | [11-oauth-authorize-page.md](11-oauth-authorize-page.md) | `OAuthAuthorizePage.jsx` — /oauth/authorize | Planned — NOT IMPLEMENTED |
| 12 | [12-dashboard-page.md](12-dashboard-page.md) | `DashboardPage.jsx`, `ProfileCard.jsx`, `CivicStatusPanel.jsx` | Planned — NOT IMPLEMENTED |
| 13 | [13-error-handling.md](13-error-handling.md) | Горизонтальная обработка ошибок | Planned — NOT IMPLEMENTED |
| 14 | [14-i18n-identity-strings.md](14-i18n-identity-strings.md) | Новые ключи для `dictionaries.js` (et/ru/en) | Planned — NOT IMPLEMENTED |

---

## Порядок реализации (блок-зависимости)

```
Блок 1 — Инфраструктура (нет зависимостей между собой):
  03  package.json: добавить @supabase/supabase-js
  04  .env / .env.local: добавить VITE_SUPABASE_* и VITE_IDENTITY_*

Блок 2 — Auth слой (требует Блок 1):
  05  supabaseClient.js + useAuthSession.js
  07  identityService.js (можно параллельно с 05)

Блок 3 — Hooks + Routing (требует Блок 2):
  08  useVerificationStatus.js + VerificationStatusBadge.jsx
  02  App.jsx маршруты + ProtectedRoute.jsx
  14  dictionaries.js новые ключи

Блок 4 — Страницы (требует Блок 3):
  06  LoginPage.jsx
  09  VerifyPage.jsx + VerificationPrompt.jsx (10)
  11  OAuthAuthorizePage.jsx
  12  DashboardPage.jsx + ProfileCard.jsx + CivicStatusPanel.jsx

Блок 5 — Горизонтальное (применяется по мере реализации Блока 4):
  13  Error handling — встраивается в компоненты Блока 4
```

---

## Целевая файловая структура

```
src/
├── auth/
│   ├── supabaseClient.js          (05)
│   ├── useAuthSession.js          (05)
│   ├── LoginPage.jsx              (06)
│   ├── ProtectedRoute.jsx         (06)
│   └── OAuthAuthorizePage.jsx     (11)
│
├── verification/
│   ├── useVerificationStatus.js   (08)
│   ├── VerificationStatusBadge.jsx(08)
│   ├── VerificationPrompt.jsx     (10)
│   └── VerifyPage.jsx             (09)
│
├── dashboard/
│   ├── DashboardPage.jsx          (12)
│   ├── ProfileCard.jsx            (12)
│   └── CivicStatusPanel.jsx       (12)
│
├── services/
│   └── identityService.js         (07)  ← рядом с существующим issueService.js
│
├── shared/
│   └── ErrorMessage.jsx           (13)
│
├── i18n/
│   └── dictionaries.js            (14)  ← добавить identity/* и common ключи
│
└── App.jsx                        (02)  ← добавить новые маршруты
```

---

## Критичные архитектурные решения

| Решение | Обоснование |
|---------|-------------|
| HashRouter остаётся | Arweave deploy требует base: './' без BrowserRouter |
| Backend return_url ДОЛЖЕН содержать `#` | `https://dogestonia.ee/#/verify?...` иначе SPA не получит query params |
| `window.location.href` для Authentigate | Полноценный redirect, не popup/iframe — стандарт OIDC в браузере |
| Stories только через GPT | SPA = auth + eID + dashboard. Нет форм подачи историй |
| `verified_person_hash` никогда в SPA | Privacy-by-design, зафиксировано в FR |

---

## Открытые вопросы

| # | Вопрос | Кому | Срок |
|---|--------|------|------|
| Q-FE-01 | Эстонские переводы в файле 14 — ревью носителем языка | CPO | До production |
| Q-FE-02 | `useI18n` поддерживает interpolation `{{date}}`? | Developer | До реализации 12 |
| Q-FE-03 | `common.retry` уже есть в ET (`Proovi uuesti`) — проверить конфликт с новым `common.retry` ключом | Developer | До реализации 14 |
| Q-FE-04 | Wallet placeholder — нужно ли скрывать за feature flag или всегда показывать? | CPO | До реализации 12 |

---

## Scope (что входит / не входит)

**Входит в эти requirements:**
- Supabase auth (login/signup/session)
- eID верификация через identity-service
- Dashboard с civic status
- OAuth flow для ChatGPT

**НЕ входит:**
- Story submit форма (только через Custom GPT)
- React Native / mobile deep links
- Wallet linking (заглушка в Dashboard, реализация post-MVP)
- Admin UI
- Story list/feed в SPA (читается через BoardPage — существующее)
