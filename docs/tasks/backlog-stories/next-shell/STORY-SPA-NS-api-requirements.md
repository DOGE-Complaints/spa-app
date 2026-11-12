# Next Shell (NS) — требования к API (сверено с backend-доками + кодом)

> Консолидация API/данных для планируемых стори **NS-01…06** (shell slice only).  
> **Легенда:** ✅ есть в API / контракт готов · ⚠️ частично / FE gap · ❌ отсутствует / Deferred / out of scope.  
> **Verified:** 2026-10-09 — identity `GET /me` ([API_REFERENCE.md:24,81+](../../../../../doge-identity-service/docs/runtime-docs/api-reference/API_REFERENCE.md)); SPA [`useSessionShellState.js`](../../../../src/auth/useSessionShellState.js) + [`identityService.fetchMe`](../../../../src/auth/identityService.js:169-174); logout [`AccountControl.jsx:96`](../../../../src/components/AccountControl/AccountControl.jsx); gateway `GET /story-activity` ([API_REFERENCE.md:558+](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md)) via [CAB §2.2](../cabinet/STORY-SPA-CAB-api-requirements.md); SPA HTTP к `/story-activity` **не** wired.
>
> **Образец формата:** [`STORY-SPA-PH-api-requirements.md`](../public-home/STORY-SPA-PH-api-requirements.md).  
> **Admin:** [ADMIN-NS-04](ADMIN-NS-04-api-requirements.md) · **Product lock:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md).

## ⚙️ Режим MVP (решение ADMIN-NS-04)

- **Новых HTTP endpoints для shell не требуется.**
- **Identity session / `GET /me` — live reuse** (ID-02 / PH-02 / AccountControl).
- **Logout — FE client** `supabase.auth.signOut` (identity **не** имеет `/logout`).
- **Nav / shelter / home — static hash routes** (`HashRouter` + React Router paths). Нет API.
- **Own-story rail (DUI-Q15)** — cite existing gateway `GET /story-activity` (CAB); SPA wiring optional FE gap; metrics/status + nav only — **не** invent fields.
- **Issues list / threads / reactions** — ❌ OOS → [next-feed](../next-feed/INDEX.md).
- **Right rail (DUI-Q16)** — ❌ no production module; empty layout slot only; **no API**.
- **Icons / logo** — static public assets; not HTTP API.

---

## §0. Контракты (сводка по стори)

| Контракт | Бекенд / слой | Форма (data) | Backend | Для стори |
|----------|---------------|--------------|---------|-----------|
| Next routes + shell host | SPA router | `#/next/feed*`, layout host | ✅ none | NS-01 |
| Session guest vs auth | Supabase + identity `GET /me` | session → profile \| logged_out | ✅ | NS-02 |
| Account chrome fields | identity `GET /me` | `avatar_url`, `display_name`, … | ✅ | NS-02 |
| Logout | Supabase `signOut` | clear session | ✅ (no BE route) | NS-02 |
| Brand / home → feed | SPA `Link` | route change | ✅ none | NS-02 |
| Theme / locale | existing client (`data-theme`, LocaleSelector) | local state / storage | ✅ none | NS-02 |
| Own-story metrics + list (Q15) | gateway `GET /story-activity` | metrics + stories[] (CAB/DUI) | ✅ BE; ⚠️ SPA HTTP | NS-03 |
| Shelter nav (Profile / My stories) | SPA `NavLink` | hash routes | ✅ none | NS-03 |
| Shell grid / empty right slot (Q16) | layout CSS | empty host | ✅ none / ❌ no rail API | NS-04 |
| Mobile shell chrome | layout / CSS | breakpoints | ✅ none | NS-04 |
| Classic shelter apply | same shell composition | routes under AppShellLayout | ✅ none | NS-05 |
| `/` flip + verify + page-map | SPA + Vitest/browser | no backend | ✅ none | NS-06 |
| Icon promote verify | static files under `public/icons/next-shell/` | 404-free URLs | ✅ none | NS-06 |
| Issues / threads feed | — | — | ❌ OOS shell | — (next-feed) |
| Right-rail production data | — | — | ❌ Q16 locked | — |

---

## §1. IDENTITY (`doge-identity-service`)

### 1.1 Session + `GET /me` (NS-02)

**Routes inventory:** есть `GET /me`; **нет** logout HTTP ([API_REFERENCE](../../../../../doge-identity-service/docs/runtime-docs/api-reference/API_REFERENCE.md) inventory + §`/me`).

**SPA today:**
- [`useSessionShellState.js:10-49`](../../../../src/auth/useSessionShellState.js) — `getSession` (via `useAuth`) + `identityService.fetchMe(accessToken)`.
- [`identityService.js:169-174`](../../../../src/auth/identityService.js) — `fetchMe` → `identityFetch('/me')`.
- [`AccountControl.jsx`](../../../../src/components/AccountControl/AccountControl.jsx) — guest → `/login`; auth → `profile.display_name` / `avatar_url`.

| Стори | Нужно | Источник | Статус |
|-------|-------|----------|--------|
| **NS-02** account chrome | guest/auth + profile | session + `/me` | ✅ reuse |
| **NS-02** guest → login | route `/login` | SPA router | ✅ none API |
| **NS-02** logout | clear session | client `supabase.auth.signOut` ([AccountControl.jsx:96](../../../../src/components/AccountControl/AccountControl.jsx)) | ✅ no BE |
| **NS-02** post-logout home | today `navigate('/board')` L98 | FE | ⚠️ retarget → `/next/feed` when shell home locks |

### 1.2 Logout — не backend gap

- Identity **не** экспортирует `/logout`.
- **Не создавать** identity story на logout.

---

## §2. GATEWAY (`doge-complaints-gateway`)

### 2.1 NS-03 — own-story rail — **reuse CAB; no new endpoint**

| Нужно | Endpoint | Статус |
|-------|----------|--------|
| User-scoped metrics + stories | `GET /story-activity` (GW-CAB-01) | ✅ backend ([API_REFERENCE §story-activity](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md); [CAB §2.2](../cabinet/STORY-SPA-CAB-api-requirements.md)) |
| SPA call today | — | ⚠️ **not wired** in `src` — cabinet uses demo [`StoryActivityCard`](../../../../src/components/StoryActivity/StoryActivityCard.jsx) |
| Product shape (Q15) | metrics/status/date + nav to Profile / My stories | ✅ [DUI-Q15 decision](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) · fields cite [data-to-ui contract](../../../UX/next/feed/DOGEstonia-data-to-ui-contract-v1.0.md) |

> **Вывод NS-03:** backend list/metrics **готов** (CAB). Shell нужен только FE bind (или demo до wiring). **Новый gateway endpoint не требуется.** Не invent title/`issue_id` beyond Q15 lock.

### 2.2 Explicit OOS — issues / threads

| Need | Reality | Статус |
|------|---------|--------|
| Issues list / feed cards | next-feed package | ❌ OOS shell |
| Threads / reactions | next-feed | ❌ OOS shell |
| Right-rail data model | Q16: no production module | ❌ no API |

**Не предлагать** Proposal endpoints под shell.

---

## §3. NONE / ENV (не HTTP API)

### 3.1 Routes + shell host (NS-01, NS-05, NS-06)

- [`App.jsx`](../../../../src/App.jsx) — as-is: `/board`, `/issue/:id`, …; **no** `#/next/*` yet (FE story).
- [`AppShellLayout.jsx`](../../../../src/layout/AppShellLayout.jsx) — chrome owner.
- **API:** none ✅

### 3.2 Theme / locale (NS-02)

- Existing ThemeToggle / `data-theme` / LocaleSelector — client only.
- **API:** none ✅

### 3.3 Icons / logo (NS-02, NS-06)

- Runtime (planned): `/icons/next-shell/<group>/<name>.svg` — [STORY-SPA-NS-icon-assets.md](STORY-SPA-NS-icon-assets.md); promote later.
- Logo reuse: `/assets/DOGEstonia-logo-horizontal.png` (+ fallback).
- **API:** none ✅

### 3.4 Right slot / mobile chrome (NS-04)

- Empty right-rail **host** only (Q16); mobile breakpoints — CSS/layout.
- **API:** none ✅

---

## §4. Gaps (только FE wiring; без новых BE stories)

| Gap | Тип | Закрывает |
|-----|-----|-----------|
| `#/next/feed*` routes + shell host | FE | NS-01 |
| Header home→feed + account/theme/locale chrome | FE | NS-02 |
| Logout redirect `/board` → feed home | FE | NS-02 |
| ProfileRail + shelter nav + optional `GET /story-activity` bind | FE | NS-03 |
| Shell grid + empty right slot + mobile chrome | FE | NS-04 |
| Apply same shell to classic | FE | NS-05 |
| `/` flip + Vitest/browser shell + page-map + icon 404 | FE / verify | NS-06 |
| Issues / threads / right-rail product | Deferred packages | — (не API story shell) |

---

## §5. Documentation touchpoints

| Doc | Role |
|-----|------|
| [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) | Shell locks Q15/Q16, OOS feed |
| [ADMIN-NS-04](ADMIN-NS-04-api-requirements.md) | This layer |
| [STORY-SPA-CAB-api-requirements.md](../cabinet/STORY-SPA-CAB-api-requirements.md) | SSOT for `GET /story-activity` |
| [STORY-SPA-PH-api-requirements.md](../public-home/STORY-SPA-PH-api-requirements.md) | Session/logout pattern peer |
| [DUI-Q01–Q18 decision record](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) | Q15 / Q16 |
| [next-feed INDEX](../next-feed/INDEX.md) | Issues/threads API later |
| ADMIN-NS-05 stories | Materialize NS-01…06 citing this doc |
