# STORY-SPA-REQ21-01 — Shell chrome ownership (pipeline)

- **Status:** Done · P3 `2026-10-06T19:33:20Z` · `pkg-000092`
- **Epic:** [EPIC-SPA-18-ui-modularity-theme-redesign-prep](../../EPIC-SPA-18-ui-modularity-theme-redesign-prep.md) (**CREATE**)
- **Backlog:** [`spa-app/docs/tasks/backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-01-shell-chrome-ownership.md`](../../../../backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-01-shell-chrome-ownership.md)
- **Package:** `pkg-000092-20261006-epic-spa-18-req21-01-shell-chrome-ownership.yaml`
- **ui_scope:** `mixed` · shell DOM ownership · **UX brief:** [STORY-UX-MOCKUP-BRIEF.md](STORY-UX-MOCKUP-BRIEF.md) · **ui-mockup-spec:** [task-spa-req21-01-t01…/ui-mockup-spec.md](task-spa-req21-01-t01-inventory-page-shell-mounts/ui-mockup-spec.md)
- **Skill declared:** `react-expert`
- **Gate:** [acceptance-verification-spa-req21-01.md](task-spa-req21-01-t06-story-gate/acceptance-verification-spa-req21-01.md) · **PASS** `2026-10-06T19:33:20Z`

## Зачем простыми словами

Сейчас публичные страницы сами рисуют шапку/подвал через `AppShell`, а layout для public — «прозрачный». Нужен один хозяин chrome — `AppShellLayout`, страницы только контент.

## Verified facts

### Historical (pre-P3)

| Fact | Evidence |
|------|----------|
| Public mounts AppShell | `BoardPage.jsx` / Issue / HowItWorks |
| Public pass-through | `AppShellLayout.jsx` pass-through branch |
| Sidebar flag | `publicShell.js` `PUBLIC_SHELL_SHOW_SIDEBAR = false` |

### As-of-Done (P3 · `2026-10-06T19:33:20Z`)

| Fact | Evidence |
|------|----------|
| Layout owns public chrome | `AppShellLayout.jsx` Header/PublicFooter/PH-09 |
| Pages content-only | Board/Issue/HowItWorks no AppShell import |
| PH-09 preserved | `showSidebar={PUBLIC_SHELL_SHOW_SIDEBAR}` in layout; vitest + board-shell smoke |

## AC (verbatim backlog)

| ID | Criterion | P3 |
|----|-----------|-----|
| AC-SPA-REQ2101-01 | production pages do not import/mount AppShell chrome (AC-21-01) | PASS |
| AC-SPA-REQ2101-02 | public + protected routes visual/nav parity; PH-09 preserved | PASS |
| AC-SPA-REQ2101-03 | related vitest (/ puppeteer shell) green; selectors updated if DOM moved | PASS |

## Scope / Out

**In:** layout chrome ownership; strip pages; PH-09/nav/overlay parity; tests; gate.  
**Out:** ThemeToggle · CSS migrate · features extract · `#/next` · visual redesign

## Субтаски

| Task | Folder | Status |
|------|--------|--------|
| T01 | [task-spa-req21-01-t01-inventory-page-shell-mounts](task-spa-req21-01-t01-inventory-page-shell-mounts/README.md) | Done |
| T02 | [task-spa-req21-01-t02-layout-owns-public-chrome](task-spa-req21-01-t02-layout-owns-public-chrome/README.md) | Done |
| T03 | [task-spa-req21-01-t03-strip-chrome-from-pages](task-spa-req21-01-t03-strip-chrome-from-pages/README.md) | Done |
| T04 | [task-spa-req21-01-t04-nav-parity-ph09](task-spa-req21-01-t04-nav-parity-ph09/README.md) | Done |
| T05 | [task-spa-req21-01-t05-tests-shell](task-spa-req21-01-t05-tests-shell/README.md) | Done |
| T06 | [task-spa-req21-01-t06-story-gate](task-spa-req21-01-t06-story-gate/README.md) | Done |

## Code targets

- `src/layout/AppShellLayout.jsx`
- `src/pages/BoardPage.jsx`, `IssuePage.jsx`, `HowItWorksPage.jsx`
- `src/config/publicShell.js`, `src/router/sessionRoutePolicy.js`
