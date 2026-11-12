# UI modularity, theme & redesign-prep — target technical architecture (overview)

| Field | Value |
|-------|--------|
| **Focus** | Prep architecture: modular layout/pages/CSS; dark/light theme; sidecar redesign process — **not** visual redesign delivery |
| **Parent REQ** | [`../../requirements/21-ui-modularity-theme-and-redesign-prep.md`](../../requirements/21-ui-modularity-theme-and-redesign-prep.md) |
| **Interview** | [`../../analysis/zeya888.target-tech-arch-interview-ui-modularity-theme-redesign-prep-2026-10-06.md`](../../analysis/zeya888.target-tech-arch-interview-ui-modularity-theme-redesign-prep-2026-10-06.md) |
| **Analysis companion** | [`../../analysis/analysis-spa-ui-modularity-and-redesign-sidecar-strategy-2026-10-06.md`](../../analysis/analysis-spa-ui-modularity-and-redesign-sidecar-strategy-2026-10-06.md) |
| **Tokens SSOT (next)** | [`../../UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md`](../../UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md) · [feed INDEX](../../UX/next/feed/INDEX.md) |
| **Recorded** | 2026-10-06T18:51:59Z |
| **Mode** | Target technical architecture of the REQ focus — **not** implementation tasks / STORY / pkg |
| **Slug** | `ui-modularity-theme-redesign-prep` |
| **Story scope** | Phase 0 backlog Done — [ui-modularity INDEX](../../tasks/backlog-stories/ui-modularity-theme-redesign-prep/INDEX.md) REQ21-01…05 · `pkg-000092`…`096` |
| **Validated** | AC-21-01…07 PASS 2026-10-07T08:31:09Z |

**Levels:** functional/process = REQ `21` · this folder = how prep is realized in `spa-app` · work items = backlog Phase 0 Done; Phase 1–4 elsewhere.

---

## 1) Context & functional vs tech split

| Layer | Lives in | Content |
|-------|----------|---------|
| Functional / process | REQ `21` | Goal, OOS, FR/AC, Phase 0–4 narrative, decision-lock *questions* |
| Target tech (this package) | `docs/architecture/ui-modularity-theme-redesign-prep/` | Shell ownership, theme runtime, CSS ownership, sidecar routes, verify |
| Design token values | `docs/UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md` | Light (package) + Dark (SPA Night integrated) |
| Work items | backlog [ui-modularity…](../../tasks/backlog-stories/ui-modularity-theme-redesign-prep/INDEX.md) | Phase 0 REQ21-01…05 **Done**; do not invent Phase 1–4 stories here |

**Classify:** Mixed functional+tech (REQ product-facing; locks closed in interview → tech here).

**Packaging / runtime image:** **N/A** — Vite HashRouter SPA; focus is UI composition/theme, not deployability-gap. Method note: Git ownership ≠ image packaging — **packaging N/A**.

**Sibling etalon:** [`../threads-feed-ux/00-overview.md`](../threads-feed-ux/00-overview.md) (system folder layout).

**As-of-Done (Phase 0 · code):** layout owns chrome (`AppShellLayout`); pages content-only; `index.css` **0** `.board-*`; `[data-theme]` Light/Dark + `ThemeToggle` + `dogestonia.theme`; `features/board/` UI only — data plane unchanged.  
**Historical friction (pre-Phase 0):** dual shell (pages mounted AppShell); layout pass-through for public; single `:root` night tokens; no theme toggle.

---

## 2) Operator locks (interview)

| # | Theme | Decision | Rec |
|---|-------|----------|-----|
| L1 | Default first visit | **A dark** | accepted |
| L2 | Persistence | **C** `localStorage` key **`dogestonia.theme`**; account sync **OOS** follow-up | overridden (rec was A-only) |
| L3 | OS / `prefers-color-scheme` as theme source | **None** — user toggle only | accepted (clarified) |
| L4 | Light / Dark SSOT | Light = tokens package; Dark = Night from `tokens.css` integrated into package | Other / accepted |
| L5 | Sidecar UAT prefix | **B `#/next/*`** | overridden (rec A `#/design`) |
| L6 | Source folders | **A** keep `components/` + add `features/` | accepted |
| L7 | Cutover | **A in-place** (`#/board` → next UI) | accepted |
| DOM | Theme switch | **A `data-theme="dark\|light"`** + `color-scheme` | accepted |
| UI | Toggle host | **A Public Header** (locale \| **theme** \| notifications \| account) | accepted |

Advisory note: recommendations were advisory; operator decides.

---

## 3) Target shape (summary)

```text
L0  tokens (scheme-aware)     ← package SSOT; data-theme on <html>
L1  layout + AppShell         ← sole chrome owner; ThemeToggle in Header
L2  pages                     ← content-only orchestrators
L3  components/ + features/   ← UI blocks + colocated CSS
L4  services/repos/auth/i18n  ← unchanged data plane
```

Siblings:

- [`01-shell-layout-pages.md`](01-shell-layout-pages.md)
- [`02-tokens-theme-css.md`](02-tokens-theme-css.md)
- [`03-sidecar-coexistence-verify.md`](03-sidecar-coexistence-verify.md)

---

## 4) Open Unknowns

- ~~Exact `localStorage` key string~~ → **`dogestonia.theme`** (operator 2026-10-06)
- Dark status *ext.* pairs — design affirm optional later
- Lab contrast re-measure for remapped dark text pairs
- Post-cutover fate of `#/next/*` (delete vs short alias)
- Bell/notifications product — placement neighbor only in this focus

---

## 5) Explicit Not in this doc

- NEW STORY keys, pkg activation, P3, product code, stub `ui/next/**` scaffolds
- Invent gateway/threads HTTP
- Account theme sync API
- Visual redesign pixel delivery (Phase 1–4 process only; implement elsewhere)

---

## 6) Handoff

- Phase 0 implement Done · REQ AC validated 2026-10-07  
- Next: Phase 1–4 sidecar (`#/next/*`, cutover) only on explicit operator go-ahead — not from this arch alone  
- No second architecture prompt for Phase 0.
