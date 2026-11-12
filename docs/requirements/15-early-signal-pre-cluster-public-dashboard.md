# 15. Early Signal / Pre-Cluster — Public Board Discovery State

Parent: docs/requirements backlog/DOGEstonia-Early-Signal-Dashboard-Pre-Cluster-Product-Requirements.md §1–31, §33–38  
Parent-id: early-signal-dashboard-pre-cluster  
Siblings: gateway [48](../../../doge-complaints-gateway/docs/requirements/48-early-signal-pre-cluster-data-readiness.md) inventory · [49](../../../doge-complaints-gateway/docs/requirements/49-early-signal-network-pulse-l1-api.md) `GET /node/network-pulse` · [50](../../../doge-complaints-gateway/docs/requirements/50-early-signal-emerging-l2-api.md) `GET /node/emerging-signals` · spa consumer [STORY-SPA-ES-api-requirements.md](../tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md)  
Status: Draft — awaiting PA.2  

Дата: 2026-08-09 (verified paths sync 2026-08-16)  
Проект: spa-app  
Фокус: Pre-Cluster discovery state на публичном board continuum (`/board`), не личный кабинет `/dashboard`

---

## 1) Goal

Сделать отсутствие confirmed Issues **discovery state**, а не empty state: пользователь видит, что Stories уже формируют коллективную картину, без преждевременной уверенности Issue и без Offers.

Источник: parent §1, §4, §31.

---

## 2) Scope / Out of scope

### In scope

- Host: тот же public continuum, что Issue board — route `/board` (parent §31; verified: `spa-app/src/App.jsx` `/` → `/board`).
- Пять концептуальных блоков (parent §9): Network Pulse; The Picture Is Forming; Emerging Signals; What's Missing; Help Complete the Picture.
- Progressive states A–E (parent §15–20); Story counts — illustrative UX only (parent §15).
- Terminology: Story / Emerging Signal / Issue; Level 2 ≠ Level 3 (parent §5–6).
- Honest data UX (parent §22): no fake completeness %, no «N Stories until Issue», no manufactured trends/majority.
- Anti-gaming copy (parent §23): no «3 more Stories unlock Issue».
- Privacy UX (parent §29): aggregates / anonymized framing; no personal contacts.
- Continuum when Issues appear (parent §31 / State E §20): Issues may appear without removing discovery framing for remaining unclustered/emerging content where data allows.
- UX AC hooks from parent §34–35 (IA, state sheet A–E, responsive); artboards — dependency on future UX mockups, not delivered by this REQ alone.
- i18n et/ru/en for new strings.

### Out of scope

- spa REQ-12 personal `/dashboard` / cabinet (`spa-app/docs/requirements/12-dashboard-page.md`; code: `DashboardPage.jsx`).
- Offers / Solutions (parent §32).
- Inventing gateway HTTP paths or fields.
- Voices / unique-person metrics (parent §10.2) — identity/privacy ADR.
- Civic Search & Matching / Companions.
- Clustering algorithm thresholds (parent §33).
- Implementing spa FE consumers for Pulse/Emerging (gateway paths already shipped; see siblings 49/50).

---

## 3) Verified current state

| Fact | Path |
|------|------|
| Public board route | `spa-app/src/App.jsx` — `/` → `/board`, `/board` → `BoardPage` |
| Issues load | `BoardPage.jsx` → `issueService.getIssues` (~L100–101) |
| Gateway URL | `GatewayIssueRepository.js:77` — `GET {base}/node/issues` |
| Empty board today | `BoardPage.jsx:161,325–335` — `data-testid="board-empty"`; title/message i18n `publicHome.board.empty.*` — **not** Early Signal discovery |
| `/dashboard` = civic status, not Issue board | `DashboardPage.jsx:7–26` |
| EmptyState component (favicon glyph) exists separately | `EmptyState.jsx` — not the board empty path above |
| No Early Signal / Pulse / Emerging UI in spa src | grep — no product matches (`network-pulse` / `emerging-signals` = 0 in `spa-app/src`) |
| Network Pulse L1 (gateway) | `GET /node/network-pulse` — REQ-49 Accepted; public; [API_REFERENCE](../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md) |
| Emerging L2 (gateway) | `GET /node/emerging-signals` — REQ-50 Accepted; public; query `top_n` |
| SPA API requirements SSOT | [`STORY-SPA-ES-api-requirements.md`](../tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) (ADMIN-ESD-04 Done) |

**FE gap (not path Unknown):** Pulse/Emerging backend contracts exist; spa has no HTTP consumer yet. Bind only approved fields **or omit** (AC-SPA-ES-08).

---

## 4) Target behavior

1. When there are **zero** confirmed Issues (empty `issues` from current read path), `/board` shows Pre-Cluster discovery composition covering the five conceptual blocks (§9), not only «no issues» placeholder.
2. UI language distinguishes Level 1 (raw activity), Level 2 (emerging / forming / gaining signal), Level 3 (Issue) — never collapse 2→3 (§5–6).
3. Network Pulse / Emerging may show metrics **only** when bound to REQ-49 / REQ-50 fields (or omitted); UI may show Story-presence framing that does not invent fake counts (honest-data §22; AC-SPA-ES-08).
4. Emerging Signal cards/sections labeled as provisional; may weaken/disappear (§6.2, §34.5) without looking like deleted Issues.
5. What's Missing / Help Complete the Picture drive contribution loop (invite / share Story via existing GPT entry points already on board) — civic coverage language, not gamified referral (§8, §14).
6. When ≥1 Issue exists: show Issue feed (existing Board behavior) **and** keep continuum (§31) — do not hard-cut to a different product shell.
7. Never show Offers before Issue (§32 out of slice, still binding prohibition).
8. States A–E are UX modes driven by available data density; **do not** hard-code Story counts as clustering thresholds (§15).

---

## 5) Acceptance criteria

1. AC-SPA-ES-01: With mocked/zero Issues list, `/board` does **not** rely solely on current empty copy as the only product message; discovery blocks or equivalent single composition for Pre-Cluster is present (`data-testid` for discovery root required in PA.2 refine).
2. AC-SPA-ES-02: Copy/tests assert Topic/taxonomy language ≠ Issue language (parent §10 Topics / §6.3).
3. AC-SPA-ES-03: No UI string matching prohibited patterns from §22.1–22.3 and §23 («% understood», «N more Stories to unlock Issue», «trending/majority/consensus» for small-N) in Early Signal strings.
4. AC-SPA-ES-04: Documented state sheet A–E in REQ or linked UX artifact (§34.2); implementation maps to modes without using illustrative counts as server thresholds.
5. AC-SPA-ES-05: When Issues length ≥ 1, existing Issue cards/feed still render (regression on `BoardPage` issue list path).
6. AC-SPA-ES-06: No Offers/Solutions surface on Pre-Cluster or Issue-less board.
7. AC-SPA-ES-07: REQ-12 `/dashboard` behavior unchanged by this story (regression).
8. AC-SPA-ES-08: If Pulse metrics rendered, each metric either bound to sibling-approved field **or** omitted — no client-side fabricated counts.

---

## 6) Open questions

1. Ship UX shell with Issues-only continuum + omit Pulse/Emerging until FE wiring, or bind live REQ-49/50 in first ES stories? (paths no longer TBD — FE decision.)
2. Host: confirm `/board` only (plan default) vs additional route?
3. Voices metric — defer forever for MVP?
4. Who owns UX artboards §34.3–34.5 before P3 visual tasks?
5. When Issues exist, how much Pre-Cluster chrome remains (parent §20 / §31)?

---

## 7) Dependencies

- Parent §§1–31, 33–38 (`early-signal-dashboard-pre-cluster`).
- Sibling gateway 48 (inventory) + **49/50** (named public Pulse/Emerging paths) + spa [STORY-SPA-ES-api-requirements.md](../tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md).
- Existing Issue read: gateway `GET /node/issues` + spa `GatewayIssueRepository` (Level 3 today; Pulse/Emerging FE unwired).
- Not blocked on identity/gpt for MVP slice.
