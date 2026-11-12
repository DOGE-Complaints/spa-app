# SPA-REQ21-03-T02 — data-theme selectors + color-scheme

**Status:** Done · P3 `2026-10-06T20:14:06Z`  
**Story:** [`../STORY-SPA-REQ21-03-theme-tokens-data-theme.md`](../STORY-SPA-REQ21-03-theme-tokens-data-theme.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-03 · arch §1 · package §Activation  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T20:08:53Z`  
**Done:** `2026-10-06T20:14:06Z`  
**Package:** `pkg-000094`

## Purpose

Wire `[data-theme="light"|"dark"]` (+ matching `color-scheme`) so semantic/legacy vars remap per scheme. **No** `prefers-color-scheme` as theme source.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | `[data-theme=dark]` + `[data-theme=light]` Present | `src/styles/tokens.css` |
| 2 | `color-scheme: dark|light` | same |
| 3 | No OS theme source | `rg prefers-color-scheme` empty under `src/styles/` |

## AC / DoD

- [x] (P0) `[data-theme=light|dark]` selectors Present (AC-SPA-REQ2103-01)
- [x] (P0) Matching `color-scheme`
- [x] (P0) No OS `prefers-color-scheme` as theme source

## Where changed

- `src/styles/tokens.css`

## Out of scope

Boot attribute apply (T03) · ThemeToggle / persistence (REQ21-04)

## Verification

```bash
rg -n 'data-theme|prefers-color-scheme' spa-app/src/styles/tokens.css
```
