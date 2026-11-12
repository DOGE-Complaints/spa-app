# STORY-SPA-REQ21-03 — Theme-capable tokens + data-theme runtime

## Meta

- **Key:** `STORY-SPA-REQ21-03-theme-tokens-data-theme`
- **Пакет:** [`ui-modularity-theme-redesign-prep/`](./INDEX.md)
- **Status:** Done · P3 `2026-10-06T20:14:06Z` · P6 gap CLOSED `2026-10-06T20:17:57Z` · `pkg-000094`
- **Pipeline:** [`epics/…/STORY-SPA-REQ21-03-theme-tokens-data-theme.md`](../../epics/EPIC-SPA-18-ui-modularity-theme-redesign-prep/stories/STORY-SPA-REQ21-03-theme-tokens-data-theme/STORY-SPA-REQ21-03-theme-tokens-data-theme.md)
- **Package:** `pkg-000094-20261006-epic-spa-18-req21-03-theme-tokens-data-theme.yaml`
- **Тип:** L0 theme / CSS variables
- **Parent REQ:** [`21-…`](../../../requirements/21-ui-modularity-theme-and-redesign-prep.md) §4.4 · FR-21.3 · AC-21-03
- **Tokens SSOT:** [`DOGEstonia-design-tokens-package-v1.0.md`](../../../UX/next/DOGEstonia-design-tokens-package-v1.0.md)
- **Architecture:** [`02-tokens-theme-css.md`](../../../architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md)
- **Skill declared (future P3):** `javascript-pro`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`
- **ui_scope:** `none` · UX SKIP
- **Зависит от:** G4/G9 Done (design-foundation) · soft after REQ21-02
- **Operator locks:** L1 dark default · L3 no OS · L4 package light + Night dark · DOM `data-theme` · `dogestonia.theme` persistence **OOS→REQ21-04**
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)

---

## Зачем простыми словами

Токены должны уметь светлую и тёмную схему через один переключатель на корне документа — без двух палитр внутри каждого компонента.

---

## Scope

1. Project package Light/Dark into CSS under `[data-theme="light"|"dark"]` (+ `color-scheme`); default **dark**.
2. Bridge legacy `--color-*` / `--doge-*` / `--button-*` to semantic scheme values (no dual consumer APIs in components).
3. Ensure default `data-theme="dark"` before paint when no preference yet (coordinate storage apply with REQ21-04).
4. No OS `prefers-color-scheme` as theme source.
5. Unit tests for scheme variable presence / attribute switch.

## Out of scope

- ThemeToggle UI (→ REQ21-04); account sync; MapLibre basemap swap; invent hex beyond tokens package

---

## Verified current state

### Historical (pre-P3)

| Fact | Path |
|------|------|
| Single `:root` night | `src/styles/tokens.css:7+` |
| No `data-theme` / ThemeProvider | grep empty in `src/` |
| Package SSOT ready | `docs/UX/next/DOGEstonia-design-tokens-package-v1.0.md` |

### As-of-Done (P3 · `2026-10-06T20:14:06Z`)

| Fact | Path |
|------|------|
| Dark + Light `[data-theme]` | `src/styles/tokens.css` |
| Default dark boot | `index.html` · `src/theme/bootTheme.js` · `src/main.jsx` |
| Scheme tests 6/6 | `src/theme/__tests__/bootTheme.test.js` |
| Persistence OOS | no `localStorage` `dogestonia.theme` write (→ REQ21-04) |

---

## Target / AC

- [x] **AC-SPA-REQ2103-01:** dark+light via semantic tokens + `data-theme` (AC-21-03)
- [x] **AC-SPA-REQ2103-02:** components on migration path do not hardcode dual palettes
- [x] **AC-SPA-REQ2103-03:** default first paint theme = dark when no stored preference

---

## Техническое решение

По [arch 02-tokens-theme-css](../../../architecture/ui-modularity-theme-redesign-prep/02-tokens-theme-css.md) + [tokens package](../../../UX/next/DOGEstonia-design-tokens-package-v1.0.md): Light/Dark → CSS под `[data-theme]`; bridge legacy `--color-*`/`--doge-*`/`--button-*`; default **dark**; **no** OS theme. Toggle UI → REQ21-04 (`dogestonia.theme`).

## Субтаски

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-req21-03-t01-map-package-to-css-vars` | Map tokens package Light/Dark (§3.4/§4.1) → CSS vars; bridge `--color-*`/`--doge-*`/`--button-*` |
| **T02** | `task-spa-req21-03-t02-data-theme-selectors` | `[data-theme=light\|dark]` + `color-scheme`; default dark; **no** OS theme |
| **T03** | `task-spa-req21-03-t03-boot-default-dark` | Early set `data-theme=dark` when no preference (coord with 04 for `dogestonia.theme` read) |
| **T04** | `task-spa-req21-03-t04-unit-tests-scheme` | Vitest: scheme vars / attribute switch (AC-SPA-REQ2103-*) |
| **T05** | `task-spa-req21-03-t05-story-gate` | Gate AC-SPA-REQ2103-01…03 |

## Точки в коде

- `src/styles/tokens.css` (+ optional split — implement chooses; name ≠ create stubs early)
- `src/main.jsx` (import / boot coordination with REQ21-04)

## Dependencies

- G4/G9 Done; tokens package on disk
