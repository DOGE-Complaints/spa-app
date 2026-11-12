# STORY-UX-MOCKUP-BRIEF — REQ21-01 shell chrome ownership

> Copy this file into a dedicated UX chat. Do **not** implement product code here.

---

## 1) Роль и задача

Ты UX/UI spec writer для **spa-app**. Цель: один или несколько `mockup-*-spec.md` для P3 `@mockup:` (layout/selectors/states), **без кода**. Описать ownership chrome после переноса из pages → `AppShellLayout` — behavior-preserving parity (не visual redesign).

## 2) Контекст story (verbatim)

### Meta

- **Key:** `STORY-SPA-REQ21-01-shell-chrome-ownership`
- **Пакет:** ui-modularity-theme-redesign-prep
- **Тип:** layout / shell ownership (behavior-preserving)
- **Parent REQ:** 21-ui-modularity-theme-and-redesign-prep §4.1 · FR-21.1 · AC-21-01
- **Architecture:** `01-shell-layout-pages.md`
- **Skill:** `react-expert`
- **ui_scope:** `mixed`

### Зачем

Сейчас публичные страницы сами рисуют шапку/подвал через `AppShell`, а layout для public — «прозрачный». Нужен один хозяин chrome — `AppShellLayout`, страницы только контент.

### Scope

1. Production pages (`BoardPage`, `IssuePage`, `HowItWorksPage`) stop mounting `<AppShell>` / `Header` / `PublicFooter`.
2. `AppShellLayout` always owns chrome; public vs workspace via props / `PUBLIC_SHELL_SHOW_SIDEBAR` / `sessionRoutePolicy`.
3. Preserve PH-09 sidebar-off, session overlay, nav parity.
4. Update shell/page tests (`BoardPage.shell`, HowItWorks, Issue integration, `AppShell.showSidebar`).

### Вне scope

- ThemeToggle (→ REQ21-04); CSS board migrate (→ REQ21-02); features extract (→ REQ21-05)
- `#/next` routes; visual redesign; new SPA / HashRouter change

### UI-relevant AC

| ID | Criterion |
|----|-----------|
| AC-SPA-REQ2101-01 | production pages do not import/mount AppShell chrome (AC-21-01) |
| AC-SPA-REQ2101-02 | public + protected routes visual/nav parity; PH-09 preserved |
| AC-SPA-REQ2101-03 | related vitest (/ puppeteer shell) green; selectors updated if DOM moved |

## 3) Code facts (verified)

| Зона UI | Файл | Что сейчас |
|---------|------|------------|
| Board chrome mount | `spa-app/src/pages/BoardPage.jsx:198–205` (+ close ~427) | Page mounts `<AppShell header={<Header />} footer={<PublicFooter />}>` |
| Issue chrome mount | `spa-app/src/pages/IssuePage.jsx:222–234` | Same AppShell/Header/PublicFooter pattern |
| HowItWorks chrome | `spa-app/src/pages/HowItWorksPage.jsx:44–49` | Same pattern |
| Public layout | `spa-app/src/layout/AppShellLayout.jsx:30–49` | Public → `app-shell-pass-through` + Outlet; protected → `<AppShell>{content}</AppShell>` |
| PH-09 sidebar SSOT | `spa-app/src/config/publicShell.js:5` | `PUBLIC_SHELL_SHOW_SIDEBAR = false` |
| Target architecture | `spa-app/docs/architecture/ui-modularity-theme-redesign-prep/01-shell-layout-pages.md` | Single chrome owner = `AppShellLayout` |

## 4) Уже есть (extends)

- Viewport: **1536×1024** (spa default)
- Routes: `/#/board`, `/#/issue/:id`, `/#/how-it-works` (+ protected shell routes)
- Extends (do not invent new look):
  - `spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md`
  - `spa-app/docs/UX/mockups/home/mockup-131-public-footer-chrome-state-sheet-spec.md`
  - `spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md`
  - `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md`
  - `spa-app/docs/UX/mockups/epic-04/mockup-124-session-shell-state-sheet-spec.md`
  - `spa-app/docs/UX/mockups/initiation/mockup-01-dashboard-main-spec.md` (structure reference)

## 5) Что нарисовать / описать

| screen/state | описание | must/should |
|--------------|----------|-------------|
| Public board default | Header + content + PublicFooter; sidebar **off** (PH-09); chrome owned by layout DOM | **must** |
| Public issue / how-it-works | Same chrome ownership; page = content only | **must** |
| Protected / workspace shell | AppShell with sidebar per existing workspace; parity with today | **must** |
| Session overlay | Overlay still overlays shell content (no double chrome) | **must** |
| PH-09 sidebar-off callout | Explicit note: public sidebar hidden via `PUBLIC_SHELL_SHOW_SIDEBAR` | **must** |
| Mobile breakpoint | Only if existing home mockups already document; no new redesign | should |

## 6) Deliverables

- Catalog: `spa-app/docs/UX/mockups/ui-modularity-theme-redesign-prep/`
- Name: `mockup-150-shell-chrome-ownership-layout-state-sheet-spec.md` (next free after 148; adjust if collision)
- Structure like `mockup-01-dashboard-main-spec.md`: layout, tokens (reuse), components, states, selectors/`data-testid`
- **No PNG invent required** if state-sheet text + selectors suffice for parity; PNG optional

## 7) Handoff (P3 copy-paste)

```text
@mockup: spa-app/docs/UX/mockups/ui-modularity-theme-redesign-prep/mockup-150-shell-chrome-ownership-layout-state-sheet-spec.md
```

(Update path if UX renames file.)

## 8) Checklist DoD

- [ ] AC-SPA-REQ2101-01…02 covered as layout/ownership diagrams (not redesign pixels)
- [ ] Selectors / `data-testid` for shell chrome after move (puppeteer-ready)
- [ ] No ThemeToggle / `#/next` / CSS migrate in mockup scope
- [ ] Operator gate «принято» before P3 Path A
