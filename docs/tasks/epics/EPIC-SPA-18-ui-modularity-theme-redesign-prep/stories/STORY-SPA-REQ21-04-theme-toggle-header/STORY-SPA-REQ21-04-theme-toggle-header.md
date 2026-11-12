# STORY-SPA-REQ21-04 — ThemeToggle in Public Header + localStorage (pipeline)

- **Status:** Done · P3 `2026-10-06T20:27:07Z` · P6 gap CLOSED `2026-10-06T20:34:23Z` · `pkg-000095`
- **Epic:** [EPIC-SPA-18-ui-modularity-theme-redesign-prep](../../EPIC-SPA-18-ui-modularity-theme-redesign-prep.md) (**REUSE**)
- **Backlog:** [`spa-app/docs/tasks/backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-04-theme-toggle-header.md`](../../../../backlog-stories/ui-modularity-theme-redesign-prep/STORY-SPA-REQ21-04-theme-toggle-header.md)
- **Package:** `pkg-000095-20261006-epic-spa-18-req21-04-theme-toggle-header.yaml`
- **ui_scope:** `mixed` · chrome ThemeToggle · **UX:** mockup-150 from BRIEF
- **Skill declared:** `react-expert` (soft: `javascript-pro`)
- **Depends:** REQ21-03 Done (`pkg-000094`) · soft REQ21-01
- **Gate:** [acceptance-verification-spa-req21-04.md](task-spa-req21-04-t06-story-gate/acceptance-verification-spa-req21-04.md) · **PASS** `2026-10-06T20:27:07Z`

## Зачем простыми словами

В шапке рядом с языком — переключатель светлой/тёмной темы; выбор запоминается в `localStorage`.

## Verified facts

### Historical (P1.3 · `2026-10-06T20:21:56Z`)

| Fact | Evidence |
|------|----------|
| Header public chrome Present | `src/components/AppShell/Header.jsx` · LocaleSelector |
| ThemeToggle Absent | `rg` empty (product) |
| Schemes + default-dark boot Done | REQ21-03 · `tokens.css` · `bootTheme.js` · key reserved no R/W |
| Artboard for toggle | **Absent** → UX brief |

### As-of-Done (P3 · `2026-10-06T20:27:07Z`)

| Fact | Evidence |
|------|----------|
| ThemeToggle in Header | `ThemeToggle.jsx` · Header locale → theme → account |
| Persistence | `localStorage['dogestonia.theme']` · FOUC + `bootTheme.js` |
| No OS / no account sync | no `prefers-color-scheme` as source |
| mockup-150 | `docs/UX/mockups/home/mockup-150-public-header-theme-toggle-spec.md` |
| Vitest | bootTheme + ThemeToggle + Header.publicNav **15/15 PASS** |

## AC (verbatim backlog)

| ID | Criterion |
|----|-----------|
| AC-SPA-REQ2104-01 | toggle in Header switches light/dark (AC-21-04) |
| AC-SPA-REQ2104-02 | preference survives reload via `localStorage['dogestonia.theme']` |
| AC-SPA-REQ2104-03 | i18n + a11y minimum |

## Scope / Out

**In:** ThemeToggle in Header (locale → theme → bell → account); persist `dogestonia.theme`; set `data-theme` + `color-scheme`; i18n et/ru/en; a11y; tests; gate.  
**Out:** Account API · OS theme · Header redesign beyond slot · token invent (03 Done)

## Operator locks

| Lock | Value |
|------|-------|
| Persistence | `localStorage` **`dogestonia.theme`** · `dark`\|`light` |
| Host | Public Header |
| Default | dark when empty (03 boot) |
| OS | Forbidden |

## Субтаски

| Task | Folder | Status |
|------|--------|--------|
| T01 | [task-spa-req21-04-t01-theme-storage-helper](task-spa-req21-04-t01-theme-storage-helper/README.md) | Done |
| T02 | [task-spa-req21-04-t02-theme-toggle-component](task-spa-req21-04-t02-theme-toggle-component/README.md) | Done |
| T03 | [task-spa-req21-04-t03-header-slot](task-spa-req21-04-t03-header-slot/README.md) | Done · ui_anchor |
| T04 | [task-spa-req21-04-t04-i18n-keys](task-spa-req21-04-t04-i18n-keys/README.md) | Done |
| T05 | [task-spa-req21-04-t05-tests-toggle-persist](task-spa-req21-04-t05-tests-toggle-persist/README.md) | Done |
| T06 | [task-spa-req21-04-t06-story-gate](task-spa-req21-04-t06-story-gate/README.md) | Done |
| T07 | [task-spa-req21-04-t07-audit-f1-story-screenshots-pack](task-spa-req21-04-t07-audit-f1-story-screenshots-pack/README.md) | Done · P6 F1 |
| T08 | [task-spa-req21-04-t08-audit-f2-theme-state-pngs](task-spa-req21-04-t08-audit-f2-theme-state-pngs/README.md) | Done · P6 F2 |

## Code targets

- `src/components/AppShell/Header.jsx`
- `src/components/ThemeToggle/*` · `src/theme/bootTheme.js`
- `src/i18n/identityDictionary.js`
