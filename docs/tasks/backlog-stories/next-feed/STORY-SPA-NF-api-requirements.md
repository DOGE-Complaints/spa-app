# Next Feed (NF) — требования к API (сверено с кодом + docs)

> Консолидация API/данных для стори **NF-01…06** (Done) + **NF-07…12** visual parity (**Done**).  
> **Легенда:** ✅ есть в API / контракт готов · ⚠️ частично / FE gap · ❌ отсутствует / Deferred / OOS.  
> **Verified:** 2026-10-10 — gateway issues ([`GatewayIssueRepository.js`](../../../../src/repositories/GatewayIssueRepository.js)); board query ([`boardQuery.js`](../../../../src/router/boardQuery.js)); threads Closed ([`ThreadsSocialClient.js`](../../../../src/repositories/ThreadsSocialClient.js)); identity `GET /me` ([`identityService.js`](../../../../src/auth/identityService.js)); Data-to-UI · DUI-Q01–Q18 · [threads 02](../../../architecture/threads-feed-ux/02-clients-and-write-gates.md).  
> **REQ-56 / NF-12:** gateway **Ready** — `search` on `GET /node/issues`. **FE enable Done** ([STORY-SPA-NF-12](STORY-SPA-NF-12-text-search-fe-enable.md) P3): `buildIssuesQuery` appends `search` (`GatewayIssueRepository.js` ~L60–62); `serializeServerBoardQuery` keeps trimmed `search` (`boardQuery.js` ~L131–137). AD-VP-03/06.
>
> **Образец формата:** [`STORY-SPA-NS-api-requirements.md`](../next-shell/STORY-SPA-NS-api-requirements.md) · detail sibling [`STORY-SPA-THR-api-requirements.md`](../threads-feed/STORY-SPA-THR-api-requirements.md).  
> **Admin:** [ADMIN-NF-03](ADMIN-NF-03-api-requirements.md) · **Product lock:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · **UX register:** [NF-feed-mockup-intake-register.md](NF-feed-mockup-intake-register.md).

## Режим MVP (решение ADMIN-NF-03)

- **Новых HTTP endpoints для feed не invent.** Reuse gateway issues + Closed threads social + identity `/me`.
- **List** = `GET {gateway}/node/issues` via `issueService` / `GatewayIssueRepository.getIssues` + `buildIssuesQuery`.
- **Public Phase 1 lock** = request `status=PUBLISHED` (DUI-Q01 / REQ-22) — ⚠️ next-feed host must enforce; classic `BoardPage` only sends status if present in URL.
- **Text search** = ✅ gateway [REQ-56](../../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md) **Ready** — optional query param **`search`** on `GET /node/issues` (D-S1). **DUI-Q12 lift Done (NF-12):** live toolbar wired; `buildIssuesQuery` + `serializeServerBoardQuery` pass `search` (no invent param).
- **Threads** = Closed `GET/POST/PUT` on doge-threads (THR-07…09 client).
- **Invite** = ❌ no send API — stub UI only (DUI-Q18).
- **People / Connect / schema / media production** = ❌ OOS.
- **Shell chrome / session** = NS ([STORY-SPA-NS-api-requirements](../next-shell/STORY-SPA-NS-api-requirements.md)); not duplicated here.
- **Icons** = static `/icons/next-feed/…` ([STORY-SPA-NF-icon-assets](STORY-SPA-NF-icon-assets.md)) — not HTTP API.

---

## §0. Контракты (сводка по стори)

| Контракт | Бекенд / слой | Форма (data) | Backend | Для стори |
|----------|---------------|--------------|---------|-----------|
| Issues list + structural filters | gateway `GET /node/issues` | status/type/labels/institution/dates/geo | ✅ | NF-01, NF-03 |
| Default `status=PUBLISHED` | same query param | public feed lock | ✅ BE supports; ⚠️ FE host | NF-01 |
| URL text `search` | gateway `search` + optional SPA client filter | HTTP query `search` | ✅ BE Ready · ✅ FE Done ([NF-12](STORY-SPA-NF-12-text-search-fe-enable.md)) | NF-01 · **NF-12** |
| Issue-as-post fields | gateway issue payload | civic fields; no schema/media prod | ✅ | NF-02 |
| Map pin eligibility | issue `geo.lat`/`geo.lon` | numeric pair | ✅ data; ⚠️ Q14 ship gate | NF-03 |
| Thread tree + knobs | threads `GET /threads/issues/{id}` · `GET /threads/knobs` | comments tree | ✅ Closed | NF-04 |
| Comment create/reply | threads `POST …/comments` + Bearer | `{ body, parent_id }` | ✅ Closed | NF-04 |
| Attach ref | threads `POST …/attachment-refs` | refs only | ✅ Closed; ⚠️ UI gated Q06 | NF-04 |
| Reactions | threads `PUT …/reactions` + local catalog | reactions.v1 ids | ✅ Closed | NF-05 |
| Invite organization | — | stub chrome | ❌ no HTTP | NF-05 |
| Verify-before-write | identity `GET /me` → `identity_verified` | boolean gate | ✅ | NF-05 |
| Mounts / responsive / theme stress | SPA layout + static icons | no new API | ✅ none | NF-06 |
| People / Connect (M155) | — | — | ❌ OOS | — |
| Shell session / rail | identity + gateway CAB | — | ✅ → NS | — (next-shell) |

---

## §1. GATEWAY — Issues list (NF-01, NF-02, NF-03)

### 1.1 List + structural filters

**SPA today:**
- [`GatewayIssueRepository.js`](../../../../src/repositories/GatewayIssueRepository.js) — `buildIssuesQuery` → `GET {base}/node/issues?…` (`status`, `type`, `labels`, `institution`, dates, geo, **`search`** when trimmed — NF-12).
- [`issueService`](../../../../src/services/issueService.js) — façade over repository.
- [`boardQuery.js:63-78`](../../../../src/router/boardQuery.js) — `parseBoardQuery` (includes structural + `search` in URL).
- [`boardQuery.js`](../../../../src/router/boardQuery.js) — `serializeServerBoardQuery` **keeps** trimmed `search` (AD-VP-03 / NF-12).
- [`BoardPage.jsx:38-84,115-117`](../../../../src/pages/BoardPage.jsx) — classic options → `getIssues`; **client** filter via `issueMatchesSearchQuery` when `search` set (shelter).
- [`NextFeedHostPage.jsx`](../../../../src/pages/NextFeedHostPage.jsx) — next-feed list host; public `status=PUBLISHED`; search via toolbar + server query.

| Стори | Нужно | Источник | Статус |
|-------|-------|----------|--------|
| **NF-01** BoardFeed / toolbar | list load/empty/error/retry + structural filters | gateway issues | ✅ reuse |
| **NF-01** public default | `status=PUBLISHED` always in request | DUI-Q01 · [REQ-22 §](../../../requirements/22-feed-visual-redesign-phase-1.md) L227 | ✅ next-feed host locks; classic BoardPage still URL-conditional |
| **NF-01** text search | live server search on `GET /node/issues?search=` | [REQ-56](../../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md) **Ready**; param **`search`** | ✅ BE; FE via **NF-12 Done** |
| **NF-12** text search FE enable | wire `search` in `buildIssuesQuery` + serialize + toolbar enable + empty/edges | Same Closed param **`search`** only · AD-VP-03/06 | ✅ BE · ✅ FE Done |
| **NF-01** classic client search | optional filter of loaded issues | `BoardPage.jsx:115-117` · `issueSearchMatch.js` | ⚠️ honesty only if shown; not Phase-1 production toolbar; D-S1 = BE parity target (REQ-56 Done) |

### 1.2 Issue-as-post (NF-02)

| Нужно | Источник | Статус |
|-------|----------|--------|
| Civic issue fields for post chrome | gateway issue object (list/detail) | ✅ reuse existing payload |
| Schema overlay / media production | — | ❌ OOS (PRODUCT-BRIEF · register NF-P) |
| Detail by id | `GET …/node/issues/{id}` ([`GatewayIssueRepository.js:98`](../../../../src/repositories/GatewayIssueRepository.js)) | ✅ when mount needs |

### 1.3 List \| Map (NF-03)

| Нужно | Источник | Статус |
|-------|----------|--------|
| Same issues list as NF-01 | gateway | ✅ |
| Pin eligibility | numeric `geo.lat` + `geo.lon` ([`issueGeo.js:3-13`](../../../../src/map/issueGeo.js); Data-to-UI §9–10) | ✅ data shape |
| Public pin ship | Privacy/Gateway gate | ⚠️ DUI-Q14 — product ship gate, not new endpoint |
| Map tile / streets invent | — | ❌ OOS |

---

## §2. THREADS — Closed social (NF-04, NF-05)

**SSOT paths:** [`ThreadsSocialClient.js:16-38`](../../../../src/repositories/ThreadsSocialClient.js) · arch [02-clients-and-write-gates.md](../../../architecture/threads-feed-ux/02-clients-and-write-gates.md) · sibling [THR api](../threads-feed/STORY-SPA-THR-api-requirements.md).

| Op | Method / path | Auth | Статус | Стори |
|----|---------------|------|--------|-------|
| knobs | `GET /threads/knobs` | public | ✅ Closed | NF-04 |
| tree_read | `GET /threads/issues/{issue_id}` | public read (optional Bearer; 401 retry) | ✅ Closed · `getThreadTree` L407-414 | NF-04 |
| comment_create / reply | `POST /threads/issues/{issue_id}/comments` | Bearer | ✅ Closed · body `{ body, parent_id }` L420-441 | NF-04 |
| react | `PUT /threads/issues/{issue_id}/reactions` | Bearer | ✅ Closed · catalog gate `isReactionsV1Id` L454-478 | NF-05 |
| attach_ref | `POST /threads/issues/{issue_id}/attachment-refs` | Bearer | ✅ Closed · refs only L482+ | NF-04 |
| `/threads/by-issue` | — | — | ❌ forbidden (client guards) | — |
| multipart blob upload | — | — | ❌ OOS | — |

### 2.1 Composer / attach (NF-04)

| Нужно | Статус |
|-------|--------|
| Text path only in UI | ✅ DUI-Q06 |
| Attach affordance | ⚠️ UI gated — capability may deny; do not invent upload HTTP |
| Write failures | map Closed fail kinds (`verify` / `max_depth` / `post_fail` / `attach_denied`) — see THR api |

### 2.2 Reactions catalog (NF-05)

| Нужно | Источник | Статус |
|-------|----------|--------|
| Local reactions.v1 ids | [`reactionsV1Catalog.js:6-31,75-76`](../../../../src/components/threads/reactionsV1Catalog.js) | ✅ FE catalog |
| Persist mark | Closed PUT reactions | ✅ |
| People who reacted / Connect | — | ❌ M155 OOS · no people API |

### 2.3 Invite stub (NF-05)

| Нужно | Источник | Статус |
|-------|----------|--------|
| Invite organization control | [`InviteOrganizationStub.jsx:6-7`](../../../../src/components/threads/InviteOrganizationStub.jsx) — feedback only; **No invent escalate HTTP** | ❌ no send/persist API (DUI-Q18) |

---

## §3. IDENTITY — Verify-before-write (NF-05)

| Нужно | Источник | Статус |
|-------|----------|--------|
| Profile after auth | `identityService.fetchMe` → `GET /me` ([`identityService.js:166-174`](../../../../src/auth/identityService.js)) | ✅ |
| Gate | `profile.identity_verified === true` ([`verifyWriteGate.js:2-10`](../../../../src/components/threads/verifyWriteGate.js) · [`meIdentityVerified.js`](../../../../src/auth/meIdentityVerified.js)) | ✅ |
| Auto `/verify` on generic 403 | — | ❌ DUI-Q07 — no auto handoff until discriminator |

Shell session reuse: [NS §1](../next-shell/STORY-SPA-NS-api-requirements.md).

---

## §4. Static assets (not API)

| Need | Path | Статус |
|------|------|--------|
| Feed icons | `/icons/next-feed/<group>/<name>.svg` (24 on disk) | ✅ [ADMIN-NF-02](ADMIN-NF-02-icon-assets-catalog.md) |
| Shared chrome icons | `/icons/next-shell/…` | ✅ reuse |
| Logo | `/assets/DOGEstonia-logo-*` | ✅ NS |

---

## §5. Gaps FE-only (no new backend)

1. **next-feed host** must always pass `status=PUBLISHED` on public list/detail (DUI-Q01) — classic board does not default it.
2. **FE enable live text search** — owner **[NF-12](STORY-SPA-NF-12-text-search-fe-enable.md)** **Done** (DUI-Q12 Amendment 2026-10-11). Gateway [REQ-56](../../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md) **Ready** with param **`search`**. Implemented: (a) `buildIssuesQuery` passes `search`, (b) `serializeServerBoardQuery` keeps it, (c) toolbar wired on next-feed host.
3. **Wire UI** to `/icons/next-feed/…` (promote done; feed components not yet citing paths).
4. **Q14** pin release gate — product/privacy, not invent endpoint.
5. **Reuse** threads modules behind `features/feed/` presentation (PRODUCT-BRIEF) — same Closed client.

---

## §6. OOS

| Item | Why |
|------|-----|
| People / Connect / `connect` icon | M155 · PRODUCT-BRIEF |
| Schema overlay / media production | NF-P lock |
| Real org invite send/persist | DUI-Q18 |
| Invent gateway/threads fields or `/threads/by-issue` | analysis.mdc · client guard |
| Invent search param / endpoint | Forbidden — Closed param `search` only ([NF-12](STORY-SPA-NF-12-text-search-fe-enable.md) Done) |
| Shell PublicHeader / ProfileRail / `/` flip | next-shell Done |
| Multipart blob upload | threads Closed = refs only |

---

## Handoff

- Stories NF-01…06 (ADMIN-NF-04) cite **this** contract table + THR/NS siblings where needed.  
- Next admin: [ADMIN-NF-04](ADMIN-NF-04-backlog-stories-l10n.md).
