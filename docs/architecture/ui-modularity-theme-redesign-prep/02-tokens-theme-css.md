# 02 — Tokens, theme runtime, CSS ownership

Parent: [`00-overview.md`](00-overview.md) · REQ [`21`](../../requirements/21-ui-modularity-theme-and-redesign-prep.md) §4.3–4.4, FR-21.2/21.3, AC-21-02–04  
Tokens SSOT: [`../../UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md`](../../UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md)

---

## 1) Theme runtime (locks)

| Concern | Decision |
|---------|----------|
| Default first visit | **dark** |
| User control | Toggle only — **no** OS `prefers-color-scheme` as theme source |
| Persistence | Key **`dogestonia.theme`** · **R/W Done** (REQ21-04 · `bootTheme.js` + ThemeToggle); account sync = **OOS** (future REQ) |
| DOM switch | **`data-theme="dark" \| "light"`** on `document.documentElement` + matching `color-scheme` |
| Toggle UI | Header cluster (locale \| theme \| …) — **Done** REQ21-04 |
| Components | Consume **semantic** tokens only — no dual hex palettes in JSX |

**Boot (As-of-Done REQ21-03 + 04):** FOUC in `index.html` reads `dogestonia.theme` or defaults `data-theme="dark"`; `applyDefaultTheme()` / `setThemeAttribute` reinforce + sync `color-scheme`. **No** OS `prefers-color-scheme`.

---

## 2) Token SSOT

| Scheme | Source |
|--------|--------|
| **Light** | Design tokens package v1.0 (Light column / light primitives) |
| **Dark** | Same package §3.4 Night primitives + §4.1 Dark column — mapped from as-is [`src/styles/tokens.css`](../../../src/styles/tokens.css) (G9); *ext.* marked in package |

**Primary CTA:** light uses civic-yellow (`#F5C542`); dark uses signal-orange (`#F5A623`) per as-is SPA — documented in package §4.1.

**Legacy bridge:** during Phase 0, map existing `--color-*` / `--button-*` / `--doge-*` consumers to semantic values under `[data-theme]` so call sites need not all rename in one PR.

Implementation may later project package → CSS/TS/JSON **without** renaming semantic token paths (package §19).

---

## 3) CSS ownership (FR-21.2)

| Layer | Home |
|-------|------|
| Tokens / theme | `src/styles/` (behavior-preserving migrate toward scheme files; paths TBD in theme stories — name ≠ create here) |
| Shell | `components/AppShell/AppShell.css` (+ related shell chrome, e.g. `LocaleSelector.css` for header-locale*) |
| Feature | colocated next to component / `features/*` (e.g. Filters, map, post) |
| Page-only | `pages/BoardPage.css` · `pages/IssuePage.css` (minimum) |
| `index.css` | reset + rare globals only — **not** board layout dump (**As-of-Done REQ21-02:** ~23 LOC · **0** `.board-*`) |

**As-of-Done (REQ21-02 · `pkg-000093`):** board/shell layout rules moved out of `index.css` into AppShell / BoardPage / IssuePage (behavior-preserving; class names retained).

**Historical (pre-REQ21-03):** Theme schemes / `data-theme` were OOS → REQ21-03+.

**As-of-Done (REQ21-03 · `pkg-000094`):** Light/Dark under `[data-theme]` + default-dark boot — see §4 Theme runtime.  
**As-of-Done (REQ21-04 · `pkg-000095`):** ThemeToggle + `dogestonia.theme` R/W + Header slot order.

---

## 4) As-is

### Theme runtime (As-of-Done · REQ21-03/04 · `pkg-000094`/`095`)

| Fact | Evidence |
|------|----------|
| `data-theme` + `color-scheme` Light/Dark | `src/styles/tokens.css` · `src/theme/bootTheme.js` |
| Default first paint dark | `index.html` FOUC + `applyDefaultTheme()` |
| No OS theme source | no `prefers-color-scheme` |
| Persistence Done | `localStorage['dogestonia.theme']` R/W · ThemeToggle `persist: true` |
| ThemeToggle in Header | locale → theme → account (`Header.jsx`) |
| Single night `:root` fallback | dark vars on `:root` (= Night column) |

### CSS ownership (As-of-Done · REQ21-02)

| Fact | Evidence |
|------|----------|
| `index.css` reset-only | `src/index.css` · ~23 LOC · **0** `.board-*` |
| Shell layout homes | `AppShell.css` · `LocaleSelector.css` |
| Board / issue page CSS | `BoardPage.css` · `IssuePage.css` |

---

## 5) Not in this doc

Invent light hex outside package; invent account sync API; implement CSS files.
