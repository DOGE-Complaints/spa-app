# 01 — Shell, layout, pages

Parent: [`00-overview.md`](00-overview.md) · REQ [`21`](../../requirements/21-ui-modularity-theme-and-redesign-prep.md) §4.1–4.2, FR-21.1, AC-21-01

---

## 1) Target: one chrome owner

| Rule | Target |
|------|--------|
| Chrome (Header / Footer / Sidebar) | Only `AppShellLayout` (+ slots / route meta from `sessionRoutePolicy` / `publicShell`) |
| Pages | Content for `<Outlet />` only — **do not** import `AppShell` / `Header` / `PublicFooter` on production routes after Phase 0 |
| Variants | `public` \| `workspace` via props (`showSidebar`, header slot content) |
| Nav | Single nav config (paths + i18n keys); Header/Sidebar = presentation |

**ThemeToggle** lives in **Public Header** cluster (operator lock):  
`LocaleSelector` → **ThemeToggle** → notifications (if present) → account slot.  
Same control component reused in workspace header after shell unify.

---

## 2) Pages as orchestrators

Page responsibilities:

1. Data via existing `services` / hooks  
2. URL/query state (`router/boardQuery`, etc.)  
3. Compose feature blocks from `components/` and/or `features/`  
4. No chrome; no long filter JSX trees (extract to features/hooks)

Criterion: swap visual feature folder without rewriting fetch/query.

---

## 3) Folder option (lock L6-A)

| Area | Location |
|------|----------|
| Existing UI | `src/components/…` (AppShell, map, threads, …) |
| Extracted / next feature slices | `src/features/…` (e.g. board toolbar/feed) |
| **Not** required | `src/ui/next/` tree |

Next shell may be `AppShellNext` (or equivalent) under `components/` during sidecar; still mounted from layout or `#/next` pages per Phase 2 rules — **name ≠ create** until implement wave.

---

## 4) Coexistence with as-is

| As-is | Evidence | Target change |
|-------|----------|---------------|
| Public pages mount AppShell | `BoardPage.jsx` ~198–205; Issue/HowItWorks same pattern | Move chrome to layout |
| Public = pass-through | `AppShellLayout.jsx` ~30–49 | Layout always owns shell; variant differs |
| Sidebar flag | `publicShell.js` `PUBLIC_SHELL_SHOW_SIDEBAR = false` | Keep SSOT; layout reads it |

Preserve G8 / PH-09 tests when moving DOM; update selectors only if chrome node moves.

---

## 5) Not in this doc

Task lists, STORY keys, code patches.
