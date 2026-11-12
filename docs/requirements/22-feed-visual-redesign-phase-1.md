# 22. Feed visual redesign — Phase 1 (public feed + Issue thread)

Parent: operator ask 2026-10-08 — полноценный REQ на редизайн ленты Phase 1 по UX pack `docs/UX/next/feed/`  
Parent-id: spa-feed-visual-redesign-phase-1  
Status: Draft — **tech-arch locked** 2026-10-09; awaiting backlog / implement go-ahead  
Дата: 2026-10-08T15:12:49Z · **Consistency patch:** 2026-10-09T12:26:56Z  

**UX SSOT (holistic):** [feed INDEX](../UX/next/feed/INDEX.md)  
**Phase 1 product locks:** [DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md](../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md)  
**Data↔UI:** [DOGEstonia-data-to-ui-contract-v1.0.md](../UX/next/feed/DOGEstonia-data-to-ui-contract-v1.0.md)  
**Architecture:** [feed-visual-redesign-phase-1/00-overview.md](../architecture/feed-visual-redesign-phase-1/00-overview.md)  
**Interview:** [zeya888.target-tech-arch-interview-feed-visual-redesign-phase-1-2026-10-09.md](../analysis/zeya888.target-tech-arch-interview-feed-visual-redesign-phase-1-2026-10-09.md)  
**Backlog (shell ADMIN):** [next-shell/INDEX.md](../tasks/backlog-stories/next-shell/INDEX.md) · ADMIN-NS-01…06 Todo  
**Backlog (feed content ADMIN):** [next-feed/INDEX.md](../tasks/backlog-stories/next-feed/INDEX.md) · ADMIN-NF-01…05 Todo (rework: no UX-PROMPTS layer)  
**Analysis:** [analysis-spa-ux-next-feed-redesign-readiness-for-tech-arch-2026-10-08.md](../analysis/analysis-spa-ux-next-feed-redesign-readiness-for-tech-arch-2026-10-08.md)  
**Visual polish backlog (non-blocking):** [ux-process-feed-artboard-remediation-2026-10-08.md](../UX/next/feed/ux-process-feed-artboard-remediation-2026-10-08.md)

**Parents / siblings (do not duplicate):**
- [21-ui-modularity-theme-and-redesign-prep.md](21-ui-modularity-theme-and-redesign-prep.md) — Phase 0 prep **Done** (shell ownership, CSS, `data-theme`, ThemeToggle, `features/board/`). Prep L7 in-place cutover onto `#/board` is **superseded for this REQ** by delivery locks §2a (home = `#/next/feed`; classic retire).
- [17-issue-thread-feed-ux-and-reactions.md](17-issue-thread-feed-ux-and-reactions.md) — threads shell on prior skin (THR package Done)
- [24-reactions-mount-lab.md](24-reactions-mount-lab.md) — child slice: greenfield pluggable reactions mount + `#/lab/reactions` toward **FR-22.6** / M154 (does not amend this REQ)
- [spa-url-page-map.md](../spa-url-page-map.md) · [technical-architecture.md](../technical-architecture.md)
- As-is hosts (not yet new visual): [`App.jsx`](../../src/App.jsx) · [`AppShellLayout.jsx`](../../src/layout/AppShellLayout.jsx) · [`BoardPage.jsx`](../../src/pages/BoardPage.jsx) · [`features/board/`](../../src/features/board/) · [`styles/tokens.css`](../../src/styles/tokens.css) · threads under [`components/threads/`](../../src/components/threads/)

**Scope class:** requirements + locked target tech-arch. Code scaffolds (`#/next/feed*`, `features/feed/`, backlog stories) = **acceptance targets** — create only on explicit implement / story waves (analysis.mdc: name ≠ create).

**Authority when sources disagree:** this REQ (product) → Phase 1 decision record → feed Coverage backlog → Unified State Inventory → Component & Variants → Interaction → Tokens → Layout/Mobile → Data-to-UI (API truth) → generated PNG (tone only). Written specs override imperfect pixels.

---

## 1) Goal

Выполнить **визуальный редизайн публичной ленты** `spa-app` (Phase 1) по принятому UX-пакету `docs/UX/next/feed/`:

1. Новый civic **feed** (слово *feed* ≈ flow / поток) как **дом продукта** на `#/next/feed` с shared Issue/thread mounts (modal / mobile sheet / `#/next/feed/issue/:id`).
2. Поведение и данные — строго **confirmed slice** + locks `DUI-Q01`–`Q18` (без invent HTTP/полей).
3. Кабинет **не** редизайнить (Profile / My stories = navigate-only chrome); вход сохраняется через classic **shelter**.
4. Classic `#/board` / `#/issue/:id` — **временное убежище** (не дом); после готовности next — **retire**, не in-place cutover «next UI на `#/board`».

Это **не** Phase 0 prep (уже Done в REQ-21) и **не** полный API wave (schema/media/people/search — Out of Phase 1 production).

---

## 2) Scope / Out of scope

### 2a) Delivery locks (Architect Studio 2026-10-09)

| Lock | Decision |
|------|----------|
| Home | `#/next/feed` (+ `#/next/feed/issue/:id`) — единственный long-term дом ленты |
| Classic | Temporary shelter; not home; removed when next ready enough |
| UI package | `features/feed/` visual plane; one shared data plane |
| Shell (D2) | Full new shell from UX **first on next**, then **same composition on classic** |
| Default `/` `*` | After working next shell + feed route → `/next/feed` |
| Verify | Vitest **and** browser-smoke for next shell + critical feed; extend/fix tests under new theme/shell — **обязательный** фокус |
| Shelter-list | Explicit list in arch [`03-verify-shelter-retire`](../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) |
| Link breakage | Non-blocking for accepting this delivery model (greenfield / family-only); still mitigate via map + smoke |

Full analytics: [interview report](../analysis/zeya888.target-tech-arch-interview-feed-visual-redesign-phase-1-2026-10-09.md).

### In scope (FR)

| ID | Тема | UX anchor |
|----|------|-----------|
| FR-22.0 | Next-lane routes + `features/feed` + shell D2 + `/` flip per §2a (code on implement wave) | Arch 01–03 |
| FR-22.1 | Shell + feed + structural filters + query load/empty/error on **home** URLs | M149 · Layout · USI |
| FR-22.2 | Civic Issue-as-post without schema overlay / without media-from-txid | M150 · Q02/Q03 |
| FR-22.3 | List \| Map toggle; eligible pins only; received-count honesty | M151 · Q13/Q14 |
| FR-22.4 | Thread block under post: load/empty/populated/unavailable; fail-soft vs civic | M152 · DUI §29 |
| FR-22.5 | Nested text tree + text composer + draft; no Attach / no author-time invent | M153 · Q04–Q06/Q10 |
| FR-22.6 | Aggregate reactions + local `reactions.v1` picker; no people lists | M154 · Q08/Q09 |
| FR-22.7 | Collaboration invitation as **local stub** (no send/persist) | M156 · Q18 |
| FR-22.8 | Write gate: draft preserve; generic 403 ≠ auto `/verify` | M157 · Q07 |
| FR-22.9 | Mount parity modal / sheet / `#/next/feed/issue/:id` | M158 |
| FR-22.10 | Responsive critical widths | M159 · Mobile pack |
| FR-22.11 | Theme / L10n / interaction stress targets (reuse REQ-21 `data-theme`) | M160 · Tokens · A11y |
| FR-22.12 | Lazy bounded thread fetches for visible/expanded Issues | Q11 · Interaction |
| FR-22.13 | Hide active text search; empty/omit production right rail | Q12/Q16 · M149 |
| FR-22.14 | Own-story rail: metrics/status only + navigation | Q15 |
| FR-22.15 | One data plane — no duplicate clients for redesign | DUI · REQ-21 AC-21-06 |
| FR-22.16 | Verify: Vitest + browser-smoke next shell/feed; repair/extend tests for new shell/theme | Arch 03 · §2a |
| FR-22.17 | Keep shelter-list classic entries reachable until retire / next coverage | Arch 03 |

### Out of scope (explicit)

- Редизайн кабинета / account product surfaces (Profile / My stories product).
- Production: `schema_card`, media from `image_txid`/`image_hash`, comment authors/avatars/times, attachment read/display, people/Connect, server text search, comment sort/pagination claims, production right-rail module, real org invite send.
- Invent gateway/threads endpoints or fields to «закрыть mockup».
- Early Signal / Emerging discovery (M149 excludes).
- Greenfield **second** SPA service / parallel deployable app.
- Treating classic `#/board` as permanent product home or claiming hybrid «new shell + old cards on classic» as Phase 1 Product Done for feed.
- In-place cutover that makes `#/board` the canonical next UI (superseded — home stays `#/next/feed`).
- Treating artboard PNG as regression golden (M160: written + browser checks govern).

---

## 3) Verified current state (spa + UX)

| Fact | Evidence |
|------|----------|
| Phase 0 modularity/theme Done | REQ-21 AC-21-01…07; layout owns chrome; `data-theme`; ThemeToggle; `features/board/` |
| Threads shell on prior skin Done | REQ-17 / threads-feed package; historical M143–M148 semantic scaffold |
| Next visual SSOT accepted | [feed INDEX](../UX/next/feed/INDEX.md) · M149–M160 accepted for handoff |
| Phase 1 data/product locks closed | [DUI-Q01–Q18 decision record](../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) |
| New visual **not** yet production code | As-is board/thread still prior skin; `#/next/feed*` not registered — implement later |
| Tech delivery locked | Arch + interview 2026-10-09 — home next/feed, shell D2, shelter/retire classic |

---

## 4) UX package map (holistic)

Canonical reading order — [feed INDEX §1](../UX/next/feed/INDEX.md):

| # | Pack | Path |
|---|------|------|
| 1 | Coverage & backlog | [DOGEstonia-current-design-state-artboard-coverage-and-generation-backlog-v1.0.md](../UX/next/feed/DOGEstonia-current-design-state-artboard-coverage-and-generation-backlog-v1.0.md) |
| 2 | Layout | [DOGEstonia-dashboard-layout-spec-v1.0.md](../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md) · artboard [svg](../UX/next/feed/DOGEstonia-dashboard-layout-artboard-v1.0.svg) / [png](../UX/next/feed/DOGEstonia-dashboard-layout-artboard-v1.0.png) |
| 3 | Mobile | [DOGEstonia-mobile-responsive-design-pack-v1.0.md](../UX/next/feed/DOGEstonia-mobile-responsive-design-pack-v1.0.md) · [svg](../UX/next/feed/DOGEstonia-mobile-responsive-design-artboard-v1.0.svg) / [png](../UX/next/feed/DOGEstonia-mobile-responsive-design-artboard-v1.0.png) |
| 4 | States | [DOGEstonia-unified-state-inventory-v1.0.md](../UX/next/feed/DOGEstonia-unified-state-inventory-v1.0.md) |
| 5 | Components | [DOGEstonia-component-and-variants-specification-v1.0.md](../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) |
| 6 | Interaction | [DOGEstonia-interaction-and-behavior-specification-v1.0.md](../UX/next/feed/DOGEstonia-interaction-and-behavior-specification-v1.0.md) |
| 7 | Tokens | [DOGEstonia-design-tokens-package-v1.0.md](../UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md) |
| 8 | Data↔UI | [DOGEstonia-data-to-ui-contract-v1.0.md](../UX/next/feed/DOGEstonia-data-to-ui-contract-v1.0.md) |
| 8a | Phase 1 locks | [DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md](../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) |
| 9 | A11y / L10n | [DOGEstonia-accessibility-and-localization-pack-v1.0.md](../UX/next/feed/DOGEstonia-accessibility-and-localization-pack-v1.0.md) |
| 10 | Assets | [DOGEstonia-asset-manifest-v1.0.md](../UX/next/feed/DOGEstonia-asset-manifest-v1.0.md) |
| 11 | Icons | [dogestonia-icon-system-v1.0/](../UX/next/feed/dogestonia-icon-system-v1.0/) |
| 12 | Design QA | [DOGEstonia-design-qa-and-visual-regression-pack-v1.0.md](../UX/next/feed/DOGEstonia-design-qa-and-visual-regression-pack-v1.0.md) |

Non-authoritative: [../UX/next/references/](../UX/next/references/) · historical [threads-feed mockups M143–M148](../UX/mockups/threads-feed/README.md).

---

## 5) Artboards M149–M160 (detailed)

Colocated deliverable: `artboards/mockup-mNNN-….md` + `.png`. Provenance names `generated_images/exec-*.png` inside specs are labels, not required runtime paths.

### M149 — Board shell, feed & query states

- **Spec:** [mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md](../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) · **PNG:** [same stem `.png`](../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
- **Purpose:** How shell + feed behave when Issue query loads, succeeds, empty, fails, or refreshes with cache; stable query controls; page-level ownership.
- **Includes:** `PublicHeader`, `ProfileRail`, `BoardToolbar`, `BoardFeed`, `NodeContextRail`, list Issue cards, retry; one mobile shell expectation.
- **Phase 1 production:** shell, feed, structural filters, load/error states.
- **Demo / gated:** active text search; invented right-rail content (`DUI-Q12`, `DUI-Q16`).
- **Locks:** `DUI-Q01`, `Q11`–`Q13`, `Q15`–`Q16`. Accepted limitation: Clear filters may be missing in one panel — written toolbar rule still binds.

### M150 — Issue post content + schema overlay (SSR-C)

- **Spec:** [mockup-m150-…](../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
- **Purpose:** Lock civic Issue-as-post across no-media / media / long-content variants; show where optional `SchemaCardOverlay` would sit; keep absent-overlay unambiguous.
- **Phase 1 production:** civic Issue without media; natural collapse of missing fields.
- **Demo / gated:** schema overlay; images (`DUI-Q02`, `DUI-Q03`).

### M151 — List \| Map toggle (SSR-M)

- **Spec:** [mockup-m151-…](../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png)
- **Purpose:** Same filtered result set in List (all received Issues) vs Map (only valid numeric coordinates); partial map, load/fail, pin preview, narrow behavior.
- **Phase 1 production:** list/map, eligible pins, partial map, errors; count = received array only.
- **Demo / gated:** illustrative streets/labels; **public pin release** waits Gateway/Privacy (`DUI-Q14`).

### M152 — BoardIssuePost / IssueThreadBlock states (THR-P)

- **Spec:** [mockup-m152-…](../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)
- **Purpose:** Civic Issue remains useful while social loads / empty / populated-collapsed / unavailable; thread subordinate under action strip.
- **Phase 1 production:** empty/populated text Discussion, load/error; fail-soft.
- **Demo / gated:** author, time, attachments, sort claims (`DUI-Q04`, `Q05`, `Q10`).

### M153 — Comment tree, composer & attachments (THR-T)

- **Spec:** [mockup-m153-…](../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png)
- **Purpose:** Nested comment tree, composer, attachment affordances as designed; Phase 1 implements **text path only**.
- **Phase 1 production:** tree, text reply, draft, send errors.
- **Demo / gated:** Attach, media, tombstones, author rows (`DUI-Q04`–`Q06`).

### M154 — `reactions.v1` strip & picker (THR-R)

- **Spec:** [mockup-m154-…](../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
- **Purpose:** Compact React + aggregate → accessible picker; three semantic layers; catalog not permanently in feed row.
- **Phase 1 production:** aggregates, picker, `selected[]`, limits, errors; **local** pinned catalog (`DUI-Q09`).
- **Demo / gated:** PNG icons as goldens; people; auto-verify redirect until `DUI-Q07`.

### M155 — Reaction people surfaces

- **Spec:** [mockup-m155-…](../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.png)
- **Purpose:** Target visual for people lists / distribution / Connect — **target contract**, not Phase 1 ship.
- **Phase 1 production:** entry only via confirmed aggregate (no people UI).
- **Demo / gated:** all people lists, tabs, Connect (`DUI-Q08`, `Q17`).

### M156 — Collaboration invitation stub (THR-E)

- **Spec:** [mockup-m156-…](../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.png)
- **Purpose:** Soft collaboration invitation chrome without org API.
- **Phase 1 production:** local informational stub — click explains unavailable; invite **not sent / not persisted** (`DUI-Q18`).
- **Demo / gated:** real invite send.

### M157 — Verify-before-write gate (THR-V)

- **Spec:** [mockup-m157-…](../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.png)
- **Purpose:** Unverified write attempt → verification handoff rules; Issue/discussion remain readable.
- **Phase 1 production:** draft + return context preserve; **honest generic 403** (no auto `/verify`).
- **Demo / gated:** automatic verify until discriminator (`DUI-Q07`).

### M158 — Modal / sheet / `#/next/feed/issue/:id` parity (THR-I)

- **Spec:** [mockup-m158-…](../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png)
- **Purpose:** Parent chrome changes; same Issue + Discussion product across mounts; loading/empty/unavailable/not-found/focus restore.
- **Phase 1 production:** one Issue/thread across modal, sheet, `#/next/feed/issue/:id` (classic `#/issue/:id` shelter until retire).
- **Demo / gated:** illustrative media; unconfirmed social fields.

### M159 — Mobile & responsive critical states

- **Spec:** [mockup-m159-…](../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.png)
- **Purpose:** High-fidelity critical states at 390/360/320/768/1024; shared components through narrow + keyboard + tablet rails.
- **Phase 1 production:** responsive mounts, text composer, eligible map.
- **Demo / gated:** people sheets, Attach, unconfirmed labels.

### M160 — Theme, localization & interaction stress

- **Spec:** [mockup-m160-…](../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md) · [PNG](../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png)
- **Purpose:** Same Issue/thread across light/dark, ET/RU/EN fixtures, pointer/keyboard, 200% text, 320 reflow — QA reference, no new product flow.
- **Phase 1 production:** theme/focus/reflow targets (align with REQ-21 runtime).
- **Demo / gated:** test translations/media; PNG ≠ regression golden.

---

## 6) Target behavior (Phase 1)

1. Public list/detail request uses `status=PUBLISHED`; client may discard unexpected DRAFT (**not** substitute for Gateway guarantee — release gate).
2. Civic Issue card/detail without schema overlay and without media-from-hash/txid; missing optional regions collapse.
3. Structural filters work; **no** live text search; received-count only (not global total).
4. List shows all received Issues; Map only eligible coordinate pins; no invented geo labels.
5. Lazy-load thread trees with bounded concurrency for visible/expanded posts; until tree returns, do not present social counts as confirmed.
6. Comment UI: `body` + parent/depth tree; text composer; draft survives interruptions; no Attach; no invent author/time.
7. Reactions: aggregates + local `reactions.v1` picker + `selected[]` when authenticated; **no** people lists / Connect.
8. Invitation: local stub only (`DUI-Q18`).
9. Generic Threads `403` → honest denial; keep draft; submit after return requires new user action; auto-verify only after future discriminator.
10. Modal / sheet / `#/next/feed/issue/:id` share Issue+thread components and states (classic `#/issue/:id` = shelter until retire).
11. Theme via existing `data-theme` / `dogestonia.theme` (REQ-21); a11y token overrides from A11y pack until tokens revision.
12. Right rail: no production module without data owner; left own-stories: metrics/status + nav only.
13. Fail-soft: social failure never removes civic Issue.

---

## 7) Public-release gates (outside FE invent)

| Gate | Owner | Until then |
|------|-------|------------|
| Anonymous never returns DRAFT | Gateway (+ client PUBLISHED) | FE may still implement Phase 1 against fixtures/dev with honesty |
| Public coordinates safe for pins | Gateway + Privacy | Eligible-pin UI OK; **shipping** pins waits affirmation |
| Verify auto-handoff discriminator | Threads + Identity | Ship honest denial + draft |

---

## 8) Acceptance criteria

- [ ] **AC-SPA-REQ22-01** Phase 1 UI on **`#/next/feed*`** implements production-claimable slices of M149–M154, M156–M160 per §5 claim matrix; written specs override PNG.
- [ ] **AC-SPA-REQ22-02** No invent of gateway/threads fields/endpoints; Confirmed + decision-record behaviors only ([Data-to-UI §29](../UX/next/feed/DOGEstonia-data-to-ui-contract-v1.0.md) + [Q01–Q18](../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md)).
- [ ] **AC-SPA-REQ22-03** Schema overlay, media-from-txid, people/Connect, live search, production right-rail, real invite, Attach/author-time **not** claimed as production (`DUI-Q02`–`Q06`, `Q08`, `Q12`, `Q16`–`Q18`).
- [ ] **AC-SPA-REQ22-04** Mount parity: same Issue+thread semantics on feed modal, mobile sheet, `#/next/feed/issue/:id` (M158).
- [ ] **AC-SPA-REQ22-05** Fail-soft civic vs social (M152 / Interaction principles).
- [ ] **AC-SPA-REQ22-06** Reactions use local `reactions.v1` catalog; aggregates without people (M154 · Q08/Q09).
- [ ] **AC-SPA-REQ22-07** Write gate preserves draft; generic 403 does not auto-navigate `/verify` (M157 · Q07).
- [ ] **AC-SPA-REQ22-08** Invitation stub does not send or persist (M156 · Q18).
- [ ] **AC-SPA-REQ22-09** Theme light/dark works via existing document `data-theme` (M160 · REQ-21); no OS theme as source.
- [ ] **AC-SPA-REQ22-10** Cabinet product redesign absent; Profile/My stories remain navigation via shelter-list (Q15 · feed INDEX OOS).
- [ ] **AC-SPA-REQ22-11** No second data-plane clients for redesign (FR-22.15).
- [ ] **AC-SPA-REQ22-12** This REQ + feed INDEX state clearly: Phase 1 ≠ full mockup-as-API; public-release gates §7 remain explicit.
- [ ] **AC-SPA-REQ22-13** Delivery matches §2a: home `#/next/feed*`; `features/feed` (when implemented); shell D2 order; `/`→`/next/feed` after working next shell; classic is shelter not home.
- [ ] **AC-SPA-REQ22-14** Verify surfaces include Vitest **and** browser-smoke for next shell + critical feed states; broken shell/theme tests are repaired and extended (FR-22.16) — not left stale.

---

## 9) Dependencies

- REQ-21 Phase 0 Done (modularity + theme runtime).
- REQ-17 / threads-feed (semantic thread behaviors on prior skin — reskin, don’t reinvent contracts).
- UX feed packs + artboards M149–M160 accepted.
- DUI-Q01–Q18 Phase 1 locks recorded.
- Gateway/Privacy/Identity for **release** gates only (not blockers to start Architect Studio / implement against confirmed APIs + fixtures).

---

## 10) Risks

| Risk | Mitigation |
|------|------------|
| PNG treated as API truth | Decision record + AC-SPA-REQ22-02/03 |
| Scope creep into people/media/schema | OOS list + claim matrix |
| Dual shell / theme regression | AC-14 + arch 03: fix/extend Vitest **and** browser-smoke |
| False Done: new shell on classic + old cards | Claim URLs = `#/next/feed*`; hybrid classic = temporary only |
| Catch-all eats `/next/*` | Register next routes above `*` (arch 01) |
| Early `/` flip to WIP feed | Honest empty/error; shelter board still linked |
| Retire classic too early (e.g. profile) | Shelter-list + retire checklist (arch 03) |
| Map privacy | Q14 release gate |
| Blind verify redirect | Q07 |
| Broken deep links during transition | Accepted non-veto for decision; spa-url-page-map + smoke |

---

## 11) Next (process)

1. ~~Architect Studio~~ — **Done** 2026-10-09 ([arch](../architecture/feed-visual-redesign-phase-1/00-overview.md) · [interview](../analysis/zeya888.target-tech-arch-interview-feed-visual-redesign-phase-1-2026-10-09.md)).  
2. Req-to-backlog / mixed package / P1.3 only on explicit go-ahead.  
3. Implement `#/next/feed*`, `features/feed/`, shell D2 — **only** on explicit implement wave (name ≠ create from this REQ alone).  
4. UX residual visual polish — [remediation](../UX/next/feed/ux-process-feed-artboard-remediation-2026-10-08.md) — parallel, non-blocking for AC written-spec authority.
