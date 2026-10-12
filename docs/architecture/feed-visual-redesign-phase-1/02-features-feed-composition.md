# 02 — features/feed composition & data plane

Parent: [`00-overview.md`](00-overview.md) · REQ [`22`](../../requirements/22-feed-visual-redesign-phase-1.md) · locks Q4, FR-22.*, DUI Q01–Q18

---

## 1) Boundaries

| Plane | Home | Notes |
|-------|------|--------|
| **Feed visual (Phase 1)** | `src/features/feed/` (target) | Shell pieces + feed list/cards/filters/map chrome per M149–M151; Issue/thread presentation per M152–M160 claim matrix |
| **Classic visual (shelter)** | `src/features/board/` (as-is) | Unchanged Phase 1 redesign scope; may sit under new shell after D2.3 |
| **Pages** | Thin orchestrators | e.g. next/feed pages under `pages/` (exact paths — implement); classic `BoardPage` / `IssuePage` remain shelter hosts |
| **Threads semantics** | Prefer reuse of existing thread/reaction modules (`components/threads/`, board mounts) **behind** feed presentation | Do not reinvent contracts from REQ-17; **reskin/compose into feed** |
| **Data** | `services` / `repositories` / `auth` / `i18n` | **One** plane (FR-22.15 / AC-11) |

**Name ≠ create:** folder `features/feed/` appears only in an implement wave.

### 1a) Reskin mandatory on `#/next/feed*` (AD-VP-01 · 2026-10-11)

| Rule | Meaning |
|------|---------|
| **Done presentation** | Matches written M152–M154 (etc.) composition — collapsed Discussion, four-zone civic strip, reactions chrome — not historical M143/M148 dark shell chrome |
| **Reuse** | Closed `ThreadsSocialClient`, knobs/tree/reactions **contracts** and catalogs may stay in `components/threads` / repos |
| **Not Done** | Mounting classic `IssueThreadBlock` / `ReactionControls` chrome unchanged and claiming NF visual PASS |

**Why:** Live parity audit 2026-10-10 (F1/F4, H2/H5): «behind presentation» was read as mount-without-restyle. Tracker: [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../tasks/backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md) AD-VP-01. Stories NF-07…09.

### 1b) Feed presentation boundary (AD-VP-02 · 2026-10-11)

| Layer | Lives in | Owns |
|-------|----------|------|
| **Presentation** | `src/features/feed/` | Card strip, Discussion collapsed/expanded chrome, composer geometry, reactions strip/picker chrome, light token application for feed surfaces |
| **Semantics / clients** | `components/threads/*`, repositories, catalogs | Tree model, write gates, reactions.v1 ids, Closed HTTP |

Presentation may wrap or replace chrome of shared modules; it must not fork a second HTTP client.

### 1b′) Dual plane / anti-mixing (AD-VL-01 · AD-VL-02 · 2026-10-12)

| Plane | Routes | Done chrome |
|-------|--------|-------------|
| Classic | `#/board` | Existing board/threads chrome — **preserved**; do not break |
| Next-feed DS | `#/next/feed*` | **Named** surfaces from [component DS v1.0](../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md); classic modules **deprecated as next-feed Done presentation** (Closed semantics OK behind adapters) |

Tracker: [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../tasks/backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · package [next-feed-vl](../../tasks/backlog-stories/next-feed-vl/INDEX.md) · EPIC-SPA-21 · target tech arch [`../next-feed-vl/00-overview.md`](../next-feed-vl/00-overview.md). Extends AD-VP-01/02; does not reopen NF-01…12.

### 1c) Discussion collapsed presentation (NF-08 · M152/M153 · NF-11 F5)

| Fact | Home |
|------|------|
| Collapsed / expand chrome | `src/features/feed/FeedDiscussionBlock.jsx` (+ CSS) · `data-presentation="m152-collapsed"` / expand → M153 tree |
| Oval composer | `data-oval-composer` · `data-composer-chrome="oval"` / `oval-entry` · paperclip + circular icon send (no labelled Post reply pill) · Closed `CommentComposer` semantics |
| Mount | `FeedThreadMount` → Closed `LiveIssueThreadMount` with `BlockComponent={FeedDiscussionBlock}` |
| Forbidden | Classic `issue-thread-actions` Discussion/Invite primary row competing with civic strip · invent second threads HTTP plane · M155 |

### 1d) Reactions strip + picker presentation (NF-09 · M154)

| Fact | Home |
|------|------|
| Compact strip / picker chrome | `src/features/feed/FeedReactionsStrip.jsx` (+ CSS) · `data-presentation="m154-strip"` · sheet\|popover |
| Civic bridge | `FeedReactionOpenContext` · `feed-civic-action-reactions` → thread-root picker |
| Semantics reuse | Closed `ReactionControls` + `reactionsV1Catalog` / PUT — no invent ids · THREAD-ROOT no Moderation |
| Forbidden | M155 people list · Facebook-like default · Moderation selectable at root |

---

## 2) Trust & honesty

- Browser never embeds `service_role` / `SERVICE_API_TOKEN`.
- Confirmed API slice + [DUI Q01–Q18](../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) only — no invent fields/endpoints (AC-02).
- Fixtures/dev allowed for build with **honest** labeling; public-release gates stay in REQ §7.
- Fail-soft: social/thread failure must not remove civic Issue (AC-05).
- Write gate: draft preserve; generic 403 ≠ auto `/verify` (AC-07).

### 2a) Board text search FE enable (AD-VP-03 · NF-12 Done · 2026-10-11)

| Fact | Status |
|------|--------|
| Gateway | REQ-56 **Ready** — optional query param **`search`** on `GET /node/issues` (D-S1) |
| DUI-Q12 (2026-10-08) | Hid **active** production toolbar search **until server semantics exist** |
| Lift | Condition satisfied; operator lock 2026-10-11 → next-feed enables live search |
| Wiring | `FeedToolbar` enable · `buildFeedListOptions` / `GatewayIssueRepository` / `serializeServerBoardQuery` keep **`search`** only · empty copy via `searchActive` · no alternate endpoint |
| Forbidden | Invent alternate search endpoint/param name; claim search Done without wiring HTTP `search` |

Amendment: [DUI decision record](../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) DUI-Q12 · tracker AD-VP-03 / AD-VP-06. Story NF-12 Done unblocks NF-11 search matrix cell.

---

## 3) Tokens & theme

- Consume semantic tokens via existing `[data-theme]` runtime (REQ-21).
- **NF-10:** feed content plane (`FeedHost` toolbar/list/skeleton, civic/discussion/reactions chrome) uses `--color-*` / `[data-theme]` — light-first M149; dark smoke M160; no second palette invent.
- UX [tokens package](../../UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md) remains design SSOT; extend `src/styles/tokens.css` when shell/feed needs missing semantics — incremental, not a silent second palette in JSX.
- A11y overrides per A11y pack until tokens revision (REQ-22 behavior §6).

---

## 4) Mounts (parity)

Same Issue + Discussion product across:

- Feed card → modal (desktop pattern per UX)
- Mobile sheet
- Route `#/next/feed/issue/:id`

Classic `#/issue/:id` remains shelter parity host until retire — not the AC primary claim URL after next exists.

---

## 5) Cabinet / profile

- **OOS** product redesign (AC-10).
- Navigation entry must remain reachable via shelter-list (classic `#/profile`, `#/dashboard`, etc.) while feed work proceeds.
- Next-lane profile = later process — not invented here.

---

## 6) Not in this doc

NEW STORY/pkg; copying entire `features/board` as ungoverned fork without feed boundary; second HTTP client.
