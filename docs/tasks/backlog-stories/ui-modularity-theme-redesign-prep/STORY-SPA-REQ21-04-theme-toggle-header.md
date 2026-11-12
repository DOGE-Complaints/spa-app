# STORY-SPA-REQ21-04 — ThemeToggle in Public Header + localStorage

## Meta

- **Key:** `STORY-SPA-REQ21-04-theme-toggle-header`
- **Пакет:** [`ui-modularity-theme-redesign-prep/`](./INDEX.md)
- **Status:** Done · P3 `2026-10-06T20:27:07Z` · `pkg-000095`
- **Pipeline:** [`epics/…/STORY-SPA-REQ21-04-theme-toggle-header.md`](../../epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-04-theme-toggle-header/STORY-SPA-REQ21-04-theme-toggle-header.md)
- **Package:** `pkg-000095-20261006-epic-spa-18-req21-04-theme-toggle-header.yaml`
- **Тип:** chrome control / theme UX
- **Parent REQ:** [`21-…`](../../../requirements/21-ui-modularity-theme-and-redesign-prep.md) AC-21-04 · §4.4 п.6
- **Architecture:** [`01-shell-layout-pages.md`](../../../architecture/ui-modularity-theme-redesign-prep/01-shell-layout-pages.md) · [`02-tokens-theme-css.md`](../../../architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md)
- **Skill declared (future P3):** `react-expert`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/react-expert/SKILL.md`  
  Soft: `javascript-pro` @ `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`
- **ui_scope:** `mixed` · UX BRIEF
- **Зависит от:** [REQ21-03](STORY-SPA-REQ21-03-theme-tokens-data-theme.md) (hard); REQ21-01 preferred
- **Operator locks:** L2 `localStorage` key **`dogestonia.theme`**; UI host Public Header (locale \| theme \| …); user-only
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)

---

## Зачем простыми словами

В шапке рядом с языком — переключатель светлой/тёмной темы; выбор запоминается в браузере.

---

## Scope

1. `ThemeToggle` in Header cluster: locale → theme → (bell if present) → account.
2. Persist to `localStorage` key **`dogestonia.theme`**; values `dark` \| `light`; no account sync (OOS).
3. User-only; toggling sets `document.documentElement` `data-theme` (+ `color-scheme`).
4. i18n keys et/ru/en; a11y (button/switch, pressed/label).
5. Tests for toggle + persistence mock.

## Out of scope

- Account preference API; System/OS mode; redesign Header beyond slot; token scheme invent (→ 03)

---

## Verified current state

| Fact | Path |
|------|------|
| ThemeToggle in Header | `src/components/ThemeToggle/ThemeToggle.jsx` · `Header.jsx` |
| Persistence | `src/theme/bootTheme.js` · FOUC `index.html` · key `dogestonia.theme` |
| mockup-150 | `docs/UX/mockups/home/mockup-150-public-header-theme-toggle-spec.md` |
| Tests | bootTheme + ThemeToggle + Header.publicNav **15/15 PASS** |

---

## Target / AC

- [x] **AC-SPA-REQ2104-01:** toggle in Header switches light/dark (AC-21-04)
- [x] **AC-SPA-REQ2104-02:** preference survives reload via `localStorage['dogestonia.theme']`
- [x] **AC-SPA-REQ2104-03:** i18n + a11y minimum

---

## Техническое решение

По [arch 01 §1](../../../architecture/ui-modularity-theme-redesign-prep/01-shell-layout-pages.md) + [02 theme runtime](../../../architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md): `ThemeToggle` в Header (locale → theme → bell → account); `localStorage['dogestonia.theme']`; sets `data-theme` + `color-scheme`; user-only. Schemes must exist (REQ21-03).

## Субтаски

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-req21-04-t01-theme-storage-helper` | Helper read/write `localStorage['dogestonia.theme']` (`dark`\|`light`) |
| **T02** | `task-spa-req21-04-t02-theme-toggle-component` | `ThemeToggle` a11y control; sets `data-theme` + `color-scheme` |
| **T03** | `task-spa-req21-04-t03-header-slot` | Mount in Header: locale → theme → (bell) → account (arch 01 §1) |
| **T04** | `task-spa-req21-04-t04-i18n-keys` | et/ru/en keys for toggle |
| **T05** | `task-spa-req21-04-t05-tests-toggle-persist` | Tests: toggle + reload persistence |
| **T06** | `task-spa-req21-04-t06-story-gate` | Gate AC-SPA-REQ2104-01…03 |

## Точки в коде

- `src/components/AppShell/Header.jsx` (+ layout-owned header after REQ21-01)
- ThemeToggle module + storage helper (paths TBD in implement)
- `src/i18n/dictionaries.js` (et/ru/en)

## Dependencies

- REQ21-03; after REQ21-01 preferred
