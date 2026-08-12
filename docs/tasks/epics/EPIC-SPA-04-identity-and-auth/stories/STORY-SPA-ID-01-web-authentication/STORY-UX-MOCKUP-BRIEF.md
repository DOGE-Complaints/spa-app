# STORY-UX-MOCKUP-BRIEF — STORY-SPA-ID-01-web-authentication

> **Назначение:** вход для **отдельного UX-диалога** (до P3 Execute с UI). Агент-UX подтверждает/дополняет mockup SSOT; оператор переносит пути в P3 `@mockup:`.
> **Создаётся в:** P1.3 (Plan) при materialize visual/mixed story + pkg.
> **Не путать с:** `ui-mockup-spec.md` в task-folder (UI-1, после baseline в P3).

---

## Meta

| Поле | Значение |
|------|----------|
| **Story key** | `STORY-SPA-ID-01-web-authentication` |
| **Parent epic** | `spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/EPIC-SPA-04-identity-and-auth.md` |
| **Pkg** | `pkg-000013-20260627-epic-spa-04-id01-web-authentication.yaml` |
| **Pipeline story** | `spa-app/docs/tasks/epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-01-web-authentication/STORY-SPA-ID-01-web-authentication.md` |
| **Backlog source** | `spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-01-web-authentication.md` |
| **ui_scope** | `visual` |
| **ui_complexity** | `standard` |
| **UI routes** | `/login` (HashRouter: `/#/login`) |
| **Viewport** | desktop auth card (M121 artboard) |
| **Anchor task (pkg)** | `task-spa-id-01-t03-login-route-page-shell` (`ui_anchor: true`) |
| **puppeteer_gate (ожидаемый)** | `test:ui:auth-login` (T07) |

---

## Роль агента (UX-диалог)

Ты **UX/UI специалист** для spa-app. Твоя задача — **не писать код**, а подтвердить **target mockup SSOT** для P3 (UI Visual Pipeline).

**Принципы:**

- M121 **уже существует** — brief **extends**, не duplicate.
- Опирайся только на факты из brief, pipeline story, M121 spec и code facts.
- Структура delta-spec — как эталон [mockup-01-dashboard-main-spec.md](../../../../../../UX/mockups/initiation/mockup-01-dashboard-main-spec.md): layout-метрики, токены, states, selectors для puppeteer.
- Operator gate «принято» до P3 Execute.

---

## SSOT mockup (extends, не новый артборд)

| Mockup | Путь | Что покрывает |
|--------|------|---------------|
| **M121** | [mockup-121-web-authentication-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.md) | States A–F: Login, Signup, Magic Link Sent, Forgot Password, Auth Error (5 codes), Auth Success |
| PNG | [mockup-121-web-authentication-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.png) | Visual reference |

**P3 handoff:**

```text
@mockup: spa-app/docs/UX/mockups/epic-04/mockup-121-web-authentication-state-sheet-spec.md
```

---

## Code facts (analysis.mdc — не выдумывать)

| Зона | Факт |
|------|------|
| Routing | [`App.jsx`](../../../../../../src/App.jsx) — только `/`, `/board`, `/issue/:id`; **нет `/login`** |
| Auth runtime | `spa-app/src/**` — **grep `supabase\|auth\|login\|/me` → 0 matches** |
| Dependencies | [`package.json`](../../../../../../package.json) — **нет `@supabase/supabase-js`** |
| Env | [`.env.example`](../../../../../../.env.example) — **нет `VITE_SUPABASE_*` / `VITE_IDENTITY_*`** |
| Requirements | [03–07 planned](../../../../requirements/README-index.md) — NOT IMPLEMENTED |

---

## Контекст story (verbatim из pipeline)

### Зачем (1–3 предложения)

Первичный, **account-first** вход на DOGEstonia напрямую с веба (без GPT-контекста, без story-draft). Регистрация по email; телефон **не спрашивается** при signup. Фундамент для кабинета и защищённых действий.

### States (M121)

| State | ID | Описание |
|-------|-----|----------|
| A | Login | email/password, Remember me, magic link entry, forgot password |
| B | Signup | email/password/confirm; support text «Phone verification happens later when required» |
| C | Magic Link Sent | metadata sent/expiry; Resend; «Use password instead» |
| D | Forgot Password | email → Send Reset Link |
| E | Auth Error | 5 codes: invalid_credentials, network_error, rate_limited, magic_link_expired, account_not_found |
| F | Auth Success | «Welcome Back» → redirect target route |

### Вне scope (UI)

- Story-draft / GPT context (ID-06/08)
- Phone verify field (ID-04)
- OAuth code entry (ID-08)

### Acceptance Criteria (UI-relevant)

- [ ] Login/signup по email; телефон при signup не запрашивается.
- [ ] Magic-link и forgot-password — отдельные состояния C/D.
- [ ] 5 auth-ошибок различимы (state E).
- [ ] Success (F) → целевой роут.
- [ ] Экран автономный (без story-draft/GPT).

---

## Puppeteer selectors (checklist для P3)

Реализовать в T03+; smoke в T07:

| Selector | Назначение |
|----------|------------|
| `[data-auth-state="login"]` | State A |
| `[data-auth-state="signup"]` | State B |
| `[data-auth-state="magic-link-sent"]` | State C |
| `[data-auth-state="forgot-password"]` | State D |
| `[data-auth-state="auth-error"]` | State E |
| `[data-auth-state="auth-success"]` | State F |
| `[data-testid="auth-email"]` | Email field |
| `[data-testid="auth-password"]` | Password field |
| `[data-testid="auth-submit"]` | Primary submit |

---

## Operator checklist (gate до P3)

- [ ] M121 states A–F покрывают все 5 story AC с UI-аспектом
- [ ] Brief согласован с pipeline story FR-01.1…FR-01.7
- [ ] Code facts актуальны (greenfield — нет auth в src)
- [ ] `@mockup:` path зафиксирован для P3 Execute
- [ ] Operator sign-off: **принято** / дата: ___________
