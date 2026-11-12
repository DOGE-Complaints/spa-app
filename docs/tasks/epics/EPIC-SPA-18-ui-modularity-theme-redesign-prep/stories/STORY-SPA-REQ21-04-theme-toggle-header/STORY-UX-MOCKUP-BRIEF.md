# STORY-UX-MOCKUP-BRIEF — REQ21-04 ThemeToggle Header

> Copy this file into a dedicated UX chat. Do **not** implement product code here.

---

## 1) Роль и задача

Ты UX/UI spec writer для **spa-app**. Цель: один `mockup-*-spec.md` (или state sheet) для P3 `@mockup:` на Header theme control — **без кода**. Описать ThemeToggle в Public Header cluster (locale → theme → …) с a11y; **не** redesign Header chrome beyond slot; schemes уже есть (REQ21-03).

## 2) Контекст story (verbatim)

### Meta

- **Key:** `STORY-SPA-REQ21-04-theme-toggle-header`
- **Пакет:** ui-modularity-theme-redesign-prep
- **Тип:** chrome control / theme UX
- **Parent REQ:** 21 · AC-21-04 · §4.4 п.6
- **Architecture:** `01-shell-layout-pages.md` · `02-tokens-theme-css.md`
- **Skill:** `react-expert`
- **ui_scope:** `mixed`
- **Depends:** REQ21-03 Done (data-theme schemes)

### Зачем

В шапке рядом с языком — переключатель светлой/тёмной темы; выбор в `localStorage['dogestonia.theme']`.

### Scope

1. `ThemeToggle` in Header: locale → theme → (bell) → account.
2. Persist `dogestonia.theme` = `dark` \| `light`; no account sync.
3. Sets `document.documentElement` `data-theme` + `color-scheme`.
4. i18n et/ru/en; a11y (button/switch, pressed/label).
5. Tests toggle + persistence.

### Вне scope

- Account preference API; System/OS mode
- Redesign Header beyond theme slot
- Token scheme invent (REQ21-03 Done)
- MapLibre / `#/next`

### UI-relevant AC

| ID | Criterion |
|----|-----------|
| AC-SPA-REQ2104-01 | toggle in Header switches light/dark |
| AC-SPA-REQ2104-02 | preference survives reload via `localStorage['dogestonia.theme']` |
| AC-SPA-REQ2104-03 | i18n + a11y minimum |

## 3) Code facts (verified)

| Зона UI | Файл | Что сейчас |
|---------|------|------------|
| Public Header | `src/components/AppShell/Header.jsx` | Brand \| nav \| session & locale · **no** ThemeToggle |
| Locale control | LocaleSelector in header cluster | Present |
| Theme schemes | `src/styles/tokens.css` | `[data-theme=dark\|light]` Done (03) |
| Boot | `index.html` + `src/theme/bootTheme.js` | default dark; key reserved **no** R/W yet |
| Arch host | `01-shell-layout-pages.md` · `02` §1 | Header cluster · persistence → 04 |

## 4) Уже есть (extends)

- Viewport: **1536×1024** (spa default)
- Extends (do not invent new Header look):
  - `spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md`
  - REQ21-01 shell ownership (layout owns Header)
- Schemes: tokens package Light/Dark (civic-yellow / signal-orange CTA)

## 5) Что нарисовать / описать

| screen/state | описание | must/should |
|--------------|----------|-------------|
| Header dark + toggle | Cluster locale → **theme** → account; dark scheme active; control a11y label | **must** |
| Header light + toggle | Same slot; light scheme after toggle | **must** |
| Toggle pressed / focus | Keyboard focus + aria-pressed or equivalent | **must** |
| Reload persistence note | Preference restores from `dogestonia.theme` | **must** (annotation ok) |
| Mobile header cluster | Only if mockup-129 already covers mobile; no invent | should |

## 6) Deliverable

- One or more `mockup-*-spec.md` under `docs/UX/mockups/` (or story-local pointer)
- Wire `@mockup:` into T02/T03 READMEs after UX chat
- **Do not** invent OS theme · account sync · new Header redesign

## 7) Handoff

UX chat → specs → operator → **P2** build window → **P3** `pkg-000095`.
