# Estonia artboards — functional parity (2026-08-03)

> **Метод:** `@.cursor/rules/analysis.mdc` — сверка PNG `*-estonia` с предыдущей версией (или written SSOT).  
> **Декор ETM** (floral band / skirt stripe / watermark) = cultural layer; **не** functional bug, если controls читаемы.  
> **Не перегенерировать** в этом шаге — только findings + copy-paste промпты для диалога генерации.

## Verdict table

| Estonia PNG | Previous / SSOT | Functional verdict |
|-------------|-----------------|-------------------|
| [`mockup-129-…-estonia.png`](mockup-129-public-header-chrome-state-sheet-spec-estonia.png) | [`…-spec.png`](mockup-129-public-header-chrome-state-sheet-spec.png) | **MATCH** (revalidated 2026-08-03; prior 2 gaps closed) |
| [`mockup-130-…-estonia.png`](mockup-130-public-header-account-control-state-sheet-spec-estonia.png) | [`…-spec.png`](mockup-130-public-header-account-control-state-sheet-spec.png) | **MATCH** (декор only) |
| [`mockup-131-…-estonia.png`](mockup-131-public-footer-chrome-state-sheet-spec-estonia.png) | [`…-spec.png`](mockup-131-public-footer-chrome-state-sheet-spec.png) | **MATCH** (декор only) |
| [`mockup-132-…-estonia.png`](mockup-132-public-board-home-feed-state-sheet-spec-estonia.png) | [`…-spec.png`](mockup-132-public-board-home-feed-state-sheet-spec.png) + [spec.md](mockup-132-public-board-home-feed-state-sheet-spec.md) | **MATCH** (revalidated 2026-08-03; G1–G5 closed) |
| [`mockup-133-…-appendix-estonia.png`](mockup-133-public-how-it-works-localized-copy-appendix-estonia.png) | **нет** previous PNG; SSOT = [appendix.md](mockup-133-public-how-it-works-localized-copy-appendix.md) | **MATCH** (revalidated 2026-08-03; G1–G2 closed) |

Written SSOT empty/error/filtered M132 = [mockup-132 … .md](mockup-132-public-board-home-feed-state-sheet-spec.md) (= Base PNG). Search placeholder в MD уже `Search issues` (= EE OK).

Cultural assets catalog: [STORY-SPA-PH-icon-assets.md](../../tasks/backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) §ETM.

---

## M129 — Public Header Chrome (PH-H)

### Verdict: MATCH (revalidated 2026-08-03)

- States **A–D**; nav `Dashboard` / `How it works` / `Submit a story`
- Locale menu: `EN English`, `ET Eesti`, `RU Русский`
- Mobile drawer: Close, Dashboard, How it works, Submit a story, Sign in, Create account, locale row
- COMPONENTS: seventh sample **`Mobile Menu Control`** / **`Opens nav drawer`** — present (parity with base)
- State C open-locale chevron — **UP** (parity with base); closed controls correctly use **DOWN**
- ETM-FLORAL bands + ETM-STRIPE left rail — decorative OK; does not replace controls

### Prior gaps (CLOSED)

| # | Gap | Status |
|---|-----|--------|
| 1 | COMPONENTS missing `Mobile Menu Control` / `Opens nav drawer` | ✅ CLOSED on current EE PNG |
| 2 | State C open-locale chevron down vs base up | ✅ CLOSED — chevron ↑ |

### Regen prompt
**Not required** for functional parity.

---

## M130 — Account Control (PH-A)

### Verdict: MATCH
- States A/B/C; `Sign in` → `/login`; auth `AN` + menu; `Profile` → `/profile`; `Log out` → clear session → `/board`
- EE decorative only: floral frame, dropdown stripe-cap, faint watermarks

### Regen
**Not required** for functional parity.

---

## M131 — Footer Chrome (PH-F)

### Verdict: MATCH
- Desktop: About / Privacy / Contact; `[TAGLINE_TBD]`; no social icon clusters
- Mobile: full-width rows + chevrons
- EE decorative only: floral bands, vertical stripe brand marker, optional watermark

### Regen
**Not required** for functional parity.

---

## M132 — Board Home Feed (PH-B)

### Verdict: MATCH (revalidated 2026-08-03, post-G5 regen)

- States A–E codes, chrome, titles, CTAs **Reset filters** / **Try Again** — match
- Search placeholder **`Search issues`** — match MD
- Empty / error / filtered **body copy** — match MD/base
- Card anatomy — **CLOSED**: discrete label chips + meta `location · date` + status badge + `Open issue →`
- ETM floral/stripe / empty rosette / card floral thumb — decorative OK beside functional fields

### Gap status

| # | Gap | Status | Evidence (current EE) |
|---|-----|--------|------------------------|
| G1 | Empty body | ✅ CLOSED | `Public civic issues will appear here when they become available.` |
| G2 | Error body | ✅ CLOSED | `We couldn't load public issues right now. Please try again.` |
| G3 | Filtered body | ✅ CLOSED | `…to see more issues.` |
| G4 | Search placeholder | ✅ CLOSED | `Search issues` |
| G5 | Card anatomy | ✅ CLOSED | Sample `DE-042`: ID + badge **NEW** + title + summary + chips **Transport** / **Accessibility** / **BUREAUCRACY** + meta **Tallinn · May 2, 2025** + `Open issue →`; floral thumb + ETM-STRIPE beside |

### Regen prompt
**Not required** for functional parity.

---

## M133 appendix — How it works L10N / cultural (PH-T)

### Verdict: MATCH (revalidated 2026-08-03)

- Previous PNG `mockup-133-…-appendix.png` **missing** — compare EE ↔ [appendix.md](mockup-133-public-how-it-works-localized-copy-appendix.md)
- Route `/how-it-works`; steps **01–04** EN titles; mobile accordion; ETM decorative OK
- CTA: **Go to Dashboard** (internal `/board`, no external glyph) + **Submit a story** (external affordance OK)
- Page-state PNG still **missing** — out of scope (appendix only)

### Gap status

| # | Gap | Status | Evidence |
|---|-----|--------|----------|
| G1 | CTA lead-in `Ready to take the next step?` | ✅ CLOSED | Absent on PNG; no such key in appendix MD |
| G2 | External glyph on Go to Dashboard | ✅ CLOSED | Dashboard without external icon; Submit keeps square-arrow / external handoff |

### Regen prompt
**Not required** for functional parity vs appendix SSOT.

---

## Decorative-only (all EE sheets)

| Motif | Typical placement | Asset track |
|-------|-------------------|-------------|
| ETM-FLORAL | Header/footer/shell horizontal bands | [PH icon catalog](../../tasks/backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) E1 |
| ETM-STRIPE vertical | Left shell rail / footer brand marker | E2 |
| ETM-STRIPE horizontal micro | Card top / account menu stripe-cap | E3 |
| Watermark | Footer/board faint | E4 |
| Empty rosette / divider / feed thumb / step shell | M132 / M133 | E5–E8 |

Rule (from EE sheets): *Motif frames the interface. It never replaces functional hierarchy.* No textile inside icons, labels, or avatars.

---

*Claims based on visual read of PNG pairs + MD grep 2026-08-03. Implementation of PNG regen is operator/generation dialogue — not this doc step.*
