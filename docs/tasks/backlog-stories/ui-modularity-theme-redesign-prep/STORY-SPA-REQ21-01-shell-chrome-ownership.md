# STORY-SPA-REQ21-01 — Shell chrome ownership (layout-only)

## Meta

- **Key:** `STORY-SPA-REQ21-01-shell-chrome-ownership`
- **Пакет:** [`ui-modularity-theme-redesign-prep/`](./INDEX.md)
- **Status:** Done · P3 `2026-10-06T19:33:20Z`
- **Тип:** layout / shell ownership (behavior-preserving)
- **Epic:** [`EPIC-SPA-18-ui-modularity-theme-redesign-prep`](../../epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/EPIC-SPA-18-ui-modularity-theme-redesign-prep.md)
- **Pipeline:** [`../../epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-01-shell-chrome-ownership/STORY-SPA-REQ21-01-shell-chrome-ownership.md`](../../epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-01-shell-chrome-ownership/STORY-SPA-REQ21-01-shell-chrome-ownership.md)
- **Package:** `pkg-000092-20261006-epic-spa-18-req21-01-shell-chrome-ownership.yaml`
- **Parent REQ:** [`21-ui-modularity-theme-and-redesign-prep.md`](../../../requirements/21-ui-modularity-theme-and-redesign-prep.md) §4.1 · FR-21.1 · AC-21-01
- **Architecture:** [`01-shell-layout-pages.md`](../../../architecture/ui-modularity-theme-redesign-prep/01-shell-layout-pages.md)
- **Skill declared (future P3):** `react-expert`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/react-expert/SKILL.md`
- **Зависит от:** —
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)

---

## Зачем простыми словами

Сейчас публичные страницы сами рисуют шапку/подвал через `AppShell`, а layout для public — «прозрачный». Нужен один хозяин chrome — `AppShellLayout`, страницы только контент.

---

## Scope

1. Production pages (`BoardPage`, `IssuePage`, `HowItWorksPage`) stop mounting `<AppShell>` / `Header` / `PublicFooter`.
2. `AppShellLayout` always owns chrome; public vs workspace via props / `PUBLIC_SHELL_SHOW_SIDEBAR` / `sessionRoutePolicy`.
3. Preserve PH-09 sidebar-off, session overlay, nav parity.
4. Update shell/page tests (`BoardPage.shell`, HowItWorks, Issue integration, `AppShell.showSidebar`).

## Out of scope

- ThemeToggle (→ REQ21-04); CSS board migrate (→ REQ21-02); features extract (→ REQ21-05)
- `#/next` routes; visual redesign; new SPA / HashRouter change

---

## Verified current state

| Fact | Path |
|------|------|
| Public mounts AppShell | `src/pages/BoardPage.jsx:198–205` (Issue/HowItWorks same pattern) |
| Public pass-through | `src/layout/AppShellLayout.jsx:30–49` |
| Sidebar flag | `src/config/publicShell.js:5` `PUBLIC_SHELL_SHOW_SIDEBAR = false` |

---

## Target / AC

- [x] **AC-SPA-REQ2101-01:** production pages do not import/mount AppShell chrome (AC-21-01)
- [x] **AC-SPA-REQ2101-02:** public + protected routes visual/nav parity; PH-09 preserved
- [x] **AC-SPA-REQ2101-03:** related vitest (/ puppeteer shell) green; selectors updated if DOM moved

---

## Техническое решение

По [arch 01-shell-layout-pages](../../../architecture/ui-modularity-theme-redesign-prep/01-shell-layout-pages.md): единственный владелец chrome — `AppShellLayout` (public/workspace props + `PUBLIC_SHELL_SHOW_SIDEBAR`); production pages отдают только content в `<Outlet />`. ThemeToggle / CSS migrate / features extract — соседние стори.

## Субтаски

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-req21-01-t01-inventory-page-shell-mounts` | Inventory: Board/Issue/HowItWorks AppShell mounts + layout pass-through (`BoardPage.jsx:198+`, `AppShellLayout.jsx:30–49`) |
| **T02** | `task-spa-req21-01-t02-layout-owns-public-chrome` | `AppShellLayout`: всегда chrome; public/workspace props; читать `PUBLIC_SHELL_SHOW_SIDEBAR` / `sessionRoutePolicy` |
| **T03** | `task-spa-req21-01-t03-strip-chrome-from-pages` | Убрать AppShell/Header/PublicFooter из production pages → только Outlet content |
| **T04** | `task-spa-req21-01-t04-nav-parity-ph09` | Nav + PH-09 sidebar-off + session overlay parity |
| **T05** | `task-spa-req21-01-t05-tests-shell` | Vitest shell/page tests; selectors if DOM moved (AC-SPA-REQ2101-03) |
| **T06** | `task-spa-req21-01-t06-story-gate` | Gate AC-SPA-REQ2101-01…03 |

## Точки в коде

- `src/layout/AppShellLayout.jsx`
- `src/components/AppShell/*`
- `src/pages/BoardPage.jsx`, `IssuePage.jsx`, `HowItWorksPage.jsx`
- `src/router/sessionRoutePolicy.js`, `src/config/publicShell.js`

## Dependencies

- Parent REQ-21 FR-21.1; G8 AppShell **Done** (foundation exists)
