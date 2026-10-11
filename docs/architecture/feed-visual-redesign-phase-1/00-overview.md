# Feed visual redesign Phase 1 — target technical architecture (overview)

| Field | Value |
|-------|--------|
| **Focus** | Technical realization of REQ-22: next-lane **feed** UI (shell + public feed + Issue thread mounts) |
| **Parent REQ** | [`../../requirements/22-feed-visual-redesign-phase-1.md`](../../requirements/22-feed-visual-redesign-phase-1.md) |
| **Interview** | [`../../analysis/zeya888.target-tech-arch-interview-feed-visual-redesign-phase-1-2026-10-09.md`](../../analysis/zeya888.target-tech-arch-interview-feed-visual-redesign-phase-1-2026-10-09.md) |
| **UX SSOT** | [feed INDEX](../../UX/next/feed/INDEX.md) · M149–M160 · [DUI Q01–Q18](../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) |
| **Prep sibling** | [`../ui-modularity-theme-redesign-prep/00-overview.md`](../ui-modularity-theme-redesign-prep/00-overview.md) (REQ-21 Phase 0 Done) |
| **Threads sibling** | [`../threads-feed-ux/00-overview.md`](../threads-feed-ux/00-overview.md) (semantic contracts; prior skin) |
| **Recorded** | 2026-10-09T12:26:56Z |
| **Mode** | Target technical architecture of the focus — **not** implementation tasks / NEW STORY / pkg |
| **Slug** | `feed-visual-redesign-phase-1` |
| **Story scope** | **none** — 0 STORY files read this run |

**Levels:** functional/product = REQ `22` · this folder = how Phase 1 is realized in `spa-app` · work items = later backlog prompts.

---

## 1) Context & functional vs tech split

| Layer | Lives in | Content |
|-------|----------|---------|
| Functional / product | REQ `22` | Goal, OOS, FR/AC, M149–M160 claim matrix, DUI locks |
| Target tech (this package) | `docs/architecture/feed-visual-redesign-phase-1/` | Routes, shell D2, `features/feed`, verify, shelter/retire |
| Design tokens | UX tokens package + `src/styles/tokens.css` / `data-theme` (REQ-21) | Semantic consumption; no dual hex in JSX |
| Work items | backlog (not created here) | NEW STORY/pkg only on explicit later wave |

**Classify:** Mixed functional+tech (REQ product-facing; delivery/home/shell/verify locked in interview → tech here).

**Packaging / runtime image:** **N/A** — Vite `HashRouter` SPA. Method note: Git ownership ≠ image packaging — **packaging N/A**.

**Use case:** Operator ran Architect Studio on REQ-22 to lock **next/feed as permanent product home**, classic as temporary shelter, shell/verify/coexistence — overriding older REQ-21 narrative that assumed in-place cutover onto `#/board` for this focus.

---

## 2) Operator locks (interview 2026-10-09)

| # | Theme | Decision | Rec |
|---|-------|----------|-----|
| Q1 | Delivery home | **C+** Permanent home under `#/next/*`; **no** mandatory cutover that replaces classic URLs with next UI on the same path; classic **retired** when next is ready | overridden (rec was in-place A) |
| Q2 | Classic role | **B** clarified: next = primary entry / only home; classic = **temporary shelter** (family/dev; e.g. profile until redesigned) | accepted |
| Q3 | Hash grammar | **C** `#/next/feed` (board/feed home); `#/next/feed/issue/:id` — *feed* ≈ flow / поток | overridden |
| Q4 | UI package | **B** `features/feed/` visual plane; **one** data plane (services/repos/auth) | accepted |
| Q5 | Shell | **D2** Full new shell from UX **first on next**, then **same composition on classic**; classic look-change accepted | accepted |
| Q6 | Verify | **B** Vitest **and** browser-smoke (puppeteer/analogue) for next shell + critical feed; classic baselines at D2 step 3; gate before retire | accepted |
| Q7 | Shelter | **B** Explicit **shelter-list** in REQ/arch; Phase 1 does not redesign cabinet | accepted |
| Q8 | Default routes | **C** After working next shell + `#/next/feed` mount: `/` and `*` → `/next/feed`; classic stays on shelter-list/nav | accepted |

**Advisory:** recommendations were advisory; operator decides. Audience ≈ zero traffic / greenfield — broken links are **not** a decision veto; risks still documented.

**REQ-21 L7 note:** Prep arch lock «in-place cutover onto `#/board`» is **superseded for REQ-22 focus** by Q1/Q5/Q2 (home = next/feed; classic retire). Prep docs remain historical for Phase 0.

---

## 3) Target shape (summary)

```text
L0  tokens / data-theme (REQ-21)     ← semantic tokens; ThemeToggle
L1  AppShellLayout (sole chrome owner) ← D2: new shell composition → next, then classic
L2  pages (thin)                     ← next/feed orchestrators; classic pages = shelter
L3  features/feed/                   ← Phase 1 visual plane (M149–M160 claim)
    features/board/                  ← residual classic content until retire
L4  services / repos / auth / i18n   ← unchanged data plane (no second client)
```

**Canonical product URLs (Phase 1 claimable):**

- `#/next/feed` — feed home (поток)
- `#/next/feed/issue/:id` — Issue + thread (parity with modal/sheet mounts)

**Classic (shelter, not home):** `#/board`, `#/issue/:id`, plus shelter-list entries — see [`03-verify-shelter-retire.md`](03-verify-shelter-retire.md).

Siblings:

- [`01-routes-shell-coexistence.md`](01-routes-shell-coexistence.md)
- [`02-features-feed-composition.md`](02-features-feed-composition.md)
- [`03-verify-shelter-retire.md`](03-verify-shelter-retire.md)

---

## 4) Open Unknowns

- Exact file names inside `features/feed/` — implement wave (name ≠ create here). **Partial lock 2026-10-11 (AD-VP-05):** visual-parity stories NF-07…12 name presentation responsibilities (civic strip, Discussion reskin, reactions chrome, theme, search FE, live verify); still no invent beyond those stories — see [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../tasks/backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md).
- Final shelter-list after spa-url-page-map sync (seed from `App.jsx` in `03`).
- Profile/cabinet **in next** — later slice; Phase 1 = do not break classic entry.
- Optional alias `#/next` → `#/next/feed` — **not locked**.
- Token gaps vs UX package for new shell — extend `tokens.css` incrementally when semantics missing (default; not a separate lock).

**Related arch deltas (visual parity wave):** AD-VP-01…06 in package tracker above · reskin mandatory [02 §1a](02-features-feed-composition.md) · DUI-Q12 lift [02 §2a](02-features-feed-composition.md) · live↔artboard verify [03 §1](03-verify-shelter-retire.md).

---

## 5) Explicit Not in this doc

- NEW STORY keys, pkg activation, P3, product code, stub `features/feed/**` scaffolds
- Invent gateway/threads HTTP or fields
- Cabinet / Profile **product** redesign
- Greenfield second SPA service
- Treating PNG artboards as API truth

---

## 6) Handoff

- REQ-22 updated for consistency with these locks (same materialize turn).
- Next: req-to-backlog / mixed package / implement **only** on explicit operator go-ahead.
- No second architecture prompt for the same focus.
