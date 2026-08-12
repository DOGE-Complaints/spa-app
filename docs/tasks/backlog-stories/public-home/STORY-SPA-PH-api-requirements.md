# Public Home (PH) — требования к API (сверено с backend-доками + кодом)

> Консолидация API/данных для будущих стори PH-01…06, **разбито по бекендам** и **сверено** с:
> - Identity: [`doge-identity-service/.../api-reference/API_REFERENCE.md`](../../../../../doge-identity-service/docs/runtime-docs/api-reference/API_REFERENCE.md)
> - Gateway: [`doge-complaints-gateway/.../api-reference/API_REFERENCE.md`](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md)
> - SPA code: [`issueService.js`](../../../../src/services/issueService.js), [`BoardPage.jsx`](../../../../src/pages/BoardPage.jsx), [`useSessionShellState.js`](../../../../src/auth/useSessionShellState.js), [`identityService.js`](../../../../src/auth/identityService.js)
>
> **Легенда:** ✅ есть в API / контракт готов · ⚠️ частично / FE gap · ❌ отсутствует / Deferred / out of scope.  
> **Verified:** 2026-08-01 — gateway `GET /tallinn/issues` ([API_REFERENCE.md:570-596](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md)); identity routes inventory + `GET /me` ([API_REFERENCE.md:18-33,79+](../../../../../doge-identity-service/docs/runtime-docs/api-reference/API_REFERENCE.md)); `signOut` в `spa-app/src` = 0 hits.
>
> **Образец формата:** [`STORY-SPA-CAB-api-requirements.md`](../cabinet/STORY-SPA-CAB-api-requirements.md).  
> **Product lock:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md).

## ⚙️ Режим MVP (решение ADMIN-PH-04)

- **Gateway issues — live:** PH-04 = layout cutover (колонки → лента); **no new list API required**. Reuse `issueService.getIssues` + SEARCH filter contract.
- **Identity session / `GET /me` — live:** PH-01/02 reuse ID-02 shell patterns (`useSessionShell` / `fetchMe`).
- **Logout — FE client** `supabase.auth.signOut` (identity **не** имеет `/logout`). Нет backend story.
- **PH-05 How it works / PH-03 Footer — static** (i18n + optional `#` / external links). Нет CMS API.
- **PH-06 Submit — env** `VITE_STORY_GPT_URL` (parity с [`StorySubmitPage.jsx`](../../../../src/pages/StorySubmitPage.jsx)); не HTTP endpoint.
- **Collective metrics — out of scope v1** (brief). Не предлагать endpoints.

---

## §0. Контракты (сводка по стори)

| Контракт | Бекенд / слой | Форма (data) | Backend | Для стори |
|----------|---------------|--------------|---------|-----------|
| Session guest vs auth | Supabase client + identity `GET /me` | session token → profile \| logged_out | ✅ | PH-01, PH-02 |
| Account chrome fields | identity `GET /me` | `avatar_url`, `display_name`, … | ✅ | PH-02 |
| Logout | Supabase client `signOut` | clear session | ✅ (no BE route) | PH-02 |
| Issues feed + filters | gateway `GET /tallinn/issues` | `data.issues[]` | ✅ | PH-04 |
| Issue details navigation | gateway `GET /tallinn/issues/{id}` (уже IssuePage) | `data.issue` | ✅ | PH-04 (link only) |
| How it works copy | SPA i18n (M133 appendix) | static strings | ✅ none | PH-05 |
| Footer brand/links | SPA i18n / config `#` | static | ✅ none | PH-03 |
| Submit GPT CTA | `VITE_STORY_GPT_URL` | URL string | ✅ env | PH-06 |
| Public board aggregates | — | — | ❌ out of scope | — |

---

## §1. IDENTITY (`doge-identity-service`)

### 1.1 Session + `GET /me` (PH-01, PH-02)

**Routes inventory** ([API_REFERENCE](../../../../../doge-identity-service/docs/runtime-docs/api-reference/API_REFERENCE.md)): есть `GET /me`; **нет** `POST/GET /logout`.

**SPA today:**
- Guest vs auth: Supabase session → [`useSessionShellState.js`](../../../../src/auth/useSessionShellState.js) (`fetchMe` при токене).
- Profile: [`identityService.fetchMe`](../../../../src/auth/identityService.js) → identity `GET /me` (поля включают `avatar_url`, `display_name` — API_REFERENCE §`/me`).

| Стори | Нужно | Источник | Статус |
|-------|-------|----------|--------|
| **PH-01** header chrome | знать guest/auth для account slot | session + `/me` | ✅ |
| **PH-02** account icon | profile/avatar/display | `/me` | ✅ (UI wiring = FE) |
| **PH-02** guest → login | route `/login` | SPA router | ✅ none API |
| **PH-02** logout | clear session → `/board` | client `supabase.auth.signOut` | ✅ no BE; ⚠️ **FE gap:** `signOut` не вызывается нигде в `src` |

### 1.2 Logout — не backend gap

- Identity **не** экспортирует logout endpoint (inventory 2026-07-10).
- Product: clear session + redirect `/board` ([PRODUCT-BRIEF](PRODUCT-BRIEF.md) §4).
- **Не создавать** backend story на logout.

---

## §2. GATEWAY (`doge-complaints-gateway`)

### 2.1 PH-04 — issues feed — **no new list API**

| Нужно | Endpoint | Статус |
|-------|----------|--------|
| Public issue list | `GET /tallinn/issues` | ✅ public, no token ([API_REFERENCE:570-574](../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md)) |
| SPA call | `issueService.getIssues(options)` → [`GatewayIssueRepository.getIssues`](../../../../src/repositories/GatewayIssueRepository.js) → `/tallinn/issues` | ✅ |

**Filter matrix (Board → gateway, verified [`BoardPage.jsx:87-97`](../../../../src/pages/BoardPage.jsx)):**

| Param | Board sends | Gateway | Note |
|-------|-------------|---------|------|
| `status` | ✅ | ✅ `string[]` | |
| `type` | ✅ | ✅ | |
| `labels` | ✅ | ✅ `string[]` | |
| `institution` | ✅ | ✅ | |
| `created_after` / `created_before` | ✅ | ✅ | |
| `geo_district` … `geo_postal_code` | ✅ | ✅ `string[]` | |
| `search` | client-only filter | ❌ not a gateway query | SEARCH contract; `serializeServerBoardQuery` strips search |
| bbox `geo_lat_*` / `geo_lon_*` | not sent by Board | ✅ exist on gateway | future; not PH v1 |

> **Вывод PH-04:** backend list **готов**. Нужен только FE layout (лента) + reuse filters. **Новый list/aggregate endpoint не требуется.**

### 2.2 Issue detail (navigation only)

`GET /tallinn/issues/{issue_id}` — ✅ уже используется IssuePage. PH-04 feed cards → `/issue/:id` без нового API.

### 2.3 Out of scope — aggregates

| Need | Reality | Статус |
|------|---------|--------|
| Collective counters / top labels / institutions | brief deferred | ❌ out of scope v1 |
| `GET /metrics` | ops endpoint, не public board product feed | ❌ не использовать для PH |
| `GET /story-activity` metrics | user-scoped cabinet (CAB) | ❌ не public home |

**Не предлагать** Proposal endpoints под метрики в этой волне.

---

## §3. NONE / ENV (не HTTP API)

### 3.1 PH-05 — How it works

- Copy SSOT: [M133 L10N appendix](../../../UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md)
- Route `/how-it-works` — FE only (сегодня нет в [`App.jsx`](../../../../src/App.jsx))
- **API:** none ✅

### 3.2 PH-03 — Footer

- Brand + `[TAGLINE_TBD]` + About / Privacy / Contact (статические `#` или внешние URL в v1)
- **As-of-Done (PH-03 · 2026-08-04):** `<PublicFooter />` on Board / Issue / HowItWorks via AppShell `footer` prop; L10N `publicHome.footer.*`; links `href="#about|#privacy|#contact"` placeholders; **no CMS**. Cabinet / default AppShell (when `footer` omitted) still uses legacy one-liner `t('appShell.footer')`.
- **API / CMS:** none ✅

### 3.3 PH-06 — Submit a story → GPT

| Нужно | Источник | Статус |
|-------|----------|--------|
| GPT URL | `VITE_STORY_GPT_URL` | ✅ env ([`.env.example`](../../../../.env.example); [`StorySubmitPage.jsx:29`](../../../../src/pages/StorySubmitPage.jsx)) |
| Board CTA today | hardcoded `https://chatgpt.com/g/g-RkVU9xLWN-dogestonia` | ⚠️ FE gap — выровнять на env в PH-06 |

Не HTTP API к gateway/identity.

---

## §4. Gaps (только FE wiring; без новых BE stories)

| Gap | Тип | Закрывает |
|-----|-----|-----------|
| Account control + logout UI | FE | PH-02 (`signOut` + menu) |
| Board CTA hardcode → env | FE | PH-06 |
| `/how-it-works` route + page | FE | PH-05 |
| Footer meaningful links | FE / content | PH-03 |
| Board columns → feed layout | FE | PH-04 |
| Collective metrics | Product deferred | — (не API story) |

---

## §5. Documentation touchpoints (для ADMIN-PH-05)

Каждая PH-story должна ссылаться на строки этого файла:

| Story | API section |
|-------|-------------|
| PH-01 | §1.1 session |
| PH-02 | §1.1 `/me` + §1.2 logout |
| PH-03 | §3.2 none |
| PH-04 | §2.1 no new list API |
| PH-05 | §3.1 none |
| PH-06 | §3.3 env |
