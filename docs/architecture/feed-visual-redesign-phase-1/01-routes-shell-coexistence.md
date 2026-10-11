# 01 — Routes, shell D2, coexistence

Parent: [`00-overview.md`](00-overview.md) · REQ [`22`](../../requirements/22-feed-visual-redesign-phase-1.md) · locks Q1–Q3, Q5, Q8

---

## 1) Product home vs shelter

| Role | Hash paths | Meaning |
|------|------------|---------|
| **Home (canonical Phase 1)** | `#/next/feed`, `#/next/feed/issue/:id` | Feed ≈ flow / поток; only long-term public feed surface |
| **Shelter (temporary)** | Classic `#/board`, `#/issue/:id`, + shelter-list | Data peek / reach screens not yet in next (e.g. profile); **not** the product home |
| **Retire** | Classic feed/board paths | Removed when next is ready enough (see [`03`](03-verify-shelter-retire.md)) |

**Naming grammar (conscious triple):** `next` = lane · `feed` = product/flow · classic `board` = residual shelter label until retire. Do not invent a fourth synonym.

---

## 2) Router (HashRouter)

As-is: [`spa-app/src/App.jsx`](../../../src/App.jsx) — `/board`, `/issue/:id`; `/` and `*` → `/board`; **no** `#/next/*` yet.

**Target (implement wave — name ≠ create until then):**

1. Register `#/next/feed` and `#/next/feed/issue/:id` **above** catch-all `*`.
2. After working **next shell** + feed route mount (**Q8-C**): change `/` and `*` → `/next/feed`.
3. Keep classic routes until retire; list them on shelter-list / nav.
4. Update [`spa-url-page-map.md`](../../spa-url-page-map.md) when routes exist.

Modal / mobile sheet mounts share Issue+thread semantics with `#/next/feed/issue/:id` (AC mount parity) — chrome parent may differ; product state one.

---

## 3) Shell delivery order (D2)

**Owner:** `AppShellLayout` remains sole chrome owner (REQ-21 Phase 0).

| Step | What | Where |
|------|------|--------|
| D2.1 | Build **full new shell** from UX (M149 chrome) | Compose for `#/next/*` (feed routes) |
| D2.2 | Ship feed **content** (`features/feed`) | `#/next/feed*` |
| D2.3 | Apply **same shell composition** to classic routes | Shelter URLs get new chrome; content may still be `features/board` until migrated/retired |
| D2.4 | Retire classic feed/board surfaces | When gates in [`03`](03-verify-shelter-retire.md) pass |

**Accepted hybrid (temporary):** after D2.3, classic may show **new shell + old board content** — honesty: that is **not** Phase 1 Product Done for feed cards; claimable feed UI is on `#/next/feed*`.

Theme: keep `data-theme` / `dogestonia.theme` / Header ThemeToggle cluster per REQ-21; restyle placement per M149 as needed without inventing account theme sync.

---

## 4) Coexistence rules

1. One data plane — no parallel API clients for redesign.
2. Two content visual planes until retire: `features/feed` (home) vs `features/board` (shelter content).
3. One shell owner; D2 sequences compositions, not a second layout framework (**not** a long-lived NextShell fork).
4. Primary nav / home affordances point to `#/next/feed` once Q8 flip is live.
5. Broken deep links during greenfield are non-blocking for the **decision**; still mitigate in verify + docs.
6. Name ≠ create: no empty `#/next` trees from docs alone.

---

## 5) Divergence from REQ-21 prep Phase 4

Prep [`03-sidecar-coexistence-verify.md`](../ui-modularity-theme-redesign-prep/03-sidecar-coexistence-verify.md) assumed Phase 4 **in-place** cutover onto `#/board` (L7-A).  
**This focus:** home stays `#/next/feed`; classic is shelter then **deleted**, not promoted as canonical.
