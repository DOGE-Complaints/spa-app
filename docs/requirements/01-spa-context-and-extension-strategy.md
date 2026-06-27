# 01. SPA Context и стратегия расширения

> **Статус:** НЕ реализовано. Requirements document.
> **Проект:** `spa-app` — существующий React/Vite браузерный SPA.
> **Метод:** Расширение существующего проекта. НЕ переписывать с нуля. НЕ трогать существующие pages/components без явной необходимости.

---

## Что существует сейчас (верифицировано по коду)

| Файл/Директория | Что делает | Трогать? |
|----------------|-----------|---------|
| `src/App.jsx` | Router: 2 routes (`/board`, `/issue/:id`) | Расширить (добавить routes) |
| `src/main.jsx` | Entry point: StrictMode + I18nProvider + **HashRouter** + App | Только если нужна смена Router |
| `src/pages/BoardPage.jsx` | Список issues с фильтрами | НЕ трогать |
| `src/pages/IssuePage.jsx` | Детальная страница issue | НЕ трогать |
| `src/components/` | IssueCard, StatusBadge, Filters, EmptyState | НЕ трогать |
| `src/domain/types.js` | Domain types: Issue, ISSUE_STATUS | НЕ трогать |
| `src/services/issueService.js` | Facade: getIssues, getIssue | Паттерн для identityService |
| `src/repositories/` | GatewayIssueRepository, InMemoryIssueRepository | Паттерн для identityRepository |
| `src/i18n/` | I18nProvider, core.js, **dictionaries.js** | Расширить dictionaries.js |
| `src/router/boardQuery.js` | URL query param parsing | Паттерн для identity params |
| `vite.config.js` | base: './', plugin: react | НЕ трогать (осторожно) |
| `package.json` | React 18, react-router-dom 7, vitest, puppeteer | Добавить зависимости |

**Верифицированные env vars (из кода):**
- `VITE_LIFE_REALITY_MODE` (`issueService.js:30`) — `FAKE-OLD` | `GFL-DRIVEN`
- `VITE_GATEWAY_BASE_URL` (`issueService.js:31`) — base URL для API gateway

**Верифицированный Router тип:** `HashRouter` (`main.jsx:4`) — URL выглядит как `https://dogestonia.ee/#/board`.

---

## Что нужно добавить (identity layer)

```
src/
├── auth/                         ← НОВОЕ (не пересекается с существующим)
│   ├── supabaseClient.js
│   ├── useAuthSession.js
│   ├── LoginPage.jsx
│   └── OAuthAuthorizePage.jsx
│
├── verification/                 ← НОВОЕ
│   ├── VerificationStatusBadge.jsx
│   ├── VerificationPrompt.jsx
│   ├── VerifyPage.jsx
│   ├── startEidVerification.js
│   └── useVerificationStatus.js
│
├── dashboard/                    ← НОВОЕ
│   ├── DashboardPage.jsx
│   ├── ProfileCard.jsx
│   └── CivicStatusPanel.jsx
│
├── stories/                      ← НОВОЕ (рядом с существующими pages, не внутри)
│   ├── StorySubmitGate.jsx
│   ├── StoryDraftForm.jsx
│   └── submitStory.js
│
├── services/
│   ├── issueService.js           ← СУЩЕСТВУЮЩЕЕ (не трогать)
│   └── identityService.js        ← НОВОЕ (по паттерну issueService.js)
│
└── wallet/                       ← НОВОЕ (заглушка post-MVP)
    └── FutureWalletLinkPlaceholder.jsx
```

---

## Принцип расширения: не нарушить существующий функционал

**Правило 1:** Добавление новых routes в `App.jsx` НЕ должно менять поведение `/board` и `/issue/:id`.

**Правило 2:** ProtectedRoute wrapper — добавляется к новым routes, не к существующим. `BoardPage` и `IssuePage` остаются публичными.

**Правило 3:** Суpabase Client НЕ должен влиять на загрузку `issueService`. Identity state — опциональный overlay, не блокировщик для публичных страниц.

**Правило 4:** Все новые UI строки — через `i18n/dictionaries.js`. Паттерн: `t('identity.login.title')`, не hardcoded строки в JSX.

**Правило 5:** HashRouter — не менять. Все URL планируются с учётом hash-routing. Подробности — в файле 02.

---

## Паттерны из существующего кода (использовать)

### Паттерн сервиса (из `issueService.js`)
```javascript
// VITE env var с дефолтом
const IDENTITY_SERVICE_URL = import.meta.env.VITE_IDENTITY_SERVICE_URL ?? 'http://localhost:8100'

// Factory function
export function createIdentityService(baseUrl) { ... }

// Singleton export
export const identityService = createIdentityService(IDENTITY_SERVICE_URL)
```

### Паттерн env vars (из `issueService.js:30-31`)
```javascript
// Существующий паттерн:
const REALITY_MODE = import.meta.env.VITE_LIFE_REALITY_MODE ?? 'FAKE-OLD'
const GATEWAY_BASE_URL = import.meta.env.VITE_GATEWAY_BASE_URL ?? ''

// Новый (идентичный паттерн):
const IDENTITY_SERVICE_URL = import.meta.env.VITE_IDENTITY_SERVICE_URL ?? 'http://localhost:8100'
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
```

### Паттерн hook (из существующих hooks — нет в коде, но паттерн React стандартный)
```javascript
// useAuthSession.js
export function useAuthSession() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  // ...
  return { session, user: session?.user ?? null, loading }
}
```

---

## Текущее состояние identity в spa-app

**Ничего identity-related не реализовано.**

Верификации:
- ❌ Нет `@supabase/supabase-js` в `package.json`
- ❌ Нет auth routes в `App.jsx`
- ❌ Нет ProtectedRoute
- ❌ Нет login/signup экрана
- ❌ Нет identity strings в `dictionaries.js`
- ❌ Нет `/me` вызовов нигде в коде

**Всё создаётся с нуля, без миграции существующего кода.**
