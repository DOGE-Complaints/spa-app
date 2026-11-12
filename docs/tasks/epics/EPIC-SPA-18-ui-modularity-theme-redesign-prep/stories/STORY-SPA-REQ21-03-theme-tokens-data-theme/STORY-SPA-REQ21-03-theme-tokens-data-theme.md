# STORY-SPA-REQ21-03 — Theme-capable tokens + data-theme runtime (pipeline)

- **Status:** Done · P3 `2026-10-06T20:14:06Z` · P6 gap CLOSED `2026-10-06T20:17:57Z` · `pkg-000094`
- **Epic:** [EPIC-SPA-18-ui-modularity-theme-redesign-prep](../../EPIC-SPA-18-ui-modularity-theme-redesign-prep.md) (**REUSE**)
- **Backlog:** [`spa-app/docs/tasks/backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-03-theme-tokens-data-theme.md`](../../../../backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-03-theme-tokens-data-theme.md)
- **Package:** `pkg-000094-20261006-epic-spa-18-req21-03-theme-tokens-data-theme.yaml`
- **ui_scope:** `none` · L0 theme / CSS variables · **UX:** SKIP (no artboard / brief)
- **Skill declared:** `javascript-pro`
- **Gate:** [acceptance-verification-spa-req21-03.md](task-spa-req21-03-t05-story-gate/acceptance-verification-spa-req21-03.md) · **PASS** `2026-10-06T20:14:06Z`

## Зачем простыми словами

Токены умеют светлую и тёмную схему через `data-theme` на корне — без двух палитр внутри каждого компонента. Toggle UI → REQ21-04.

## Verified facts

### Historical (P1.3 · `2026-10-06T20:08:53Z`)

| Fact | Evidence |
|------|----------|
| Single `:root` night tokens | `src/styles/tokens.css` (~123 LOC) |
| No `data-theme` / ThemeProvider | `rg` empty under `src/` |
| Package SSOT Present | `docs/UX/next/DOGEstonia-design-tokens-package-v1.0.md` §3.4 / §4.1 |

### As-of-Done (P3 · `2026-10-06T20:14:06Z`)

| Fact | Evidence |
|------|----------|
| Dark + Light under `[data-theme]` | `src/styles/tokens.css` |
| Default dark FOUC + boot | `index.html` · `src/theme/bootTheme.js` · `main.jsx` |
| No OS theme / no persistence invent | no `prefers-color-scheme` · no `localStorage` write |
| Vitest | `src/theme/__tests__/bootTheme.test.js` **6/6** |

## AC (verbatim backlog)

| ID | Criterion |
|----|-----------|
| AC-SPA-REQ2103-01 | dark+light via semantic tokens + `data-theme` (AC-21-03) |
| AC-SPA-REQ2103-02 | components on migration path do not hardcode dual palettes |
| AC-SPA-REQ2103-03 | default first paint theme = dark when no stored preference |

## Scope / Out

**In:** Map package Light/Dark → CSS under `[data-theme]`; bridge legacy vars; default dark before paint; no OS theme; unit tests; gate.  
**Out:** ThemeToggle / `dogestonia.theme` persistence (→ REQ21-04) · account sync · MapLibre · invent hex beyond package · visual redesign invent

## Operator locks (this pkg)

| Lock | Value |
|------|-------|
| Default | **dark** |
| DOM | `data-theme="dark"\|"light"` + `color-scheme` |
| Persistence | **OOS** — `dogestonia.theme` → REQ21-04 |
| OS | **Forbidden** as theme source |

## Субтаски

| Task | Folder | Status |
|------|--------|--------|
| T01 | [task-spa-req21-03-t01-map-package-to-css-vars](task-spa-req21-03-t01-map-package-to-css-vars/README.md) | Done |
| T02 | [task-spa-req21-03-t02-data-theme-selectors](task-spa-req21-03-t02-data-theme-selectors/README.md) | Done |
| T03 | [task-spa-req21-03-t03-boot-default-dark](task-spa-req21-03-t03-boot-default-dark/README.md) | Done |
| T04 | [task-spa-req21-03-t04-unit-tests-scheme](task-spa-req21-03-t04-unit-tests-scheme/README.md) | Done |
| T05 | [task-spa-req21-03-t05-story-gate](task-spa-req21-03-t05-story-gate/README.md) | Done |
| T06 | [task-spa-req21-03-t06-audit-f1-f2-arch-theme-locks-as-of-done](task-spa-req21-03-t06-audit-f1-f2-arch-theme-locks-as-of-done/README.md) | Done · P6 F1+F2 |

## Code targets

- `src/styles/tokens.css`
- `src/theme/bootTheme.js` · `src/main.jsx` · `index.html`
- `src/theme/__tests__/bootTheme.test.js`
