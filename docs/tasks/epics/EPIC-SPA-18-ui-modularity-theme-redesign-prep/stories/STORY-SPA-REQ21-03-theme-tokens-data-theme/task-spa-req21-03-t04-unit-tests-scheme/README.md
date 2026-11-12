# SPA-REQ21-03-T04 — Unit tests scheme / attribute switch

**Status:** Done · P3 `2026-10-06T20:14:06Z`  
**Story:** [`../STORY-SPA-REQ21-03-theme-tokens-data-theme.md`](../STORY-SPA-REQ21-03-theme-tokens-data-theme.md)  
**Decision Ref:** backlog STORY-SPA-REQ21-03 · AC-SPA-REQ2103-01…03  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-06T20:08:53Z`  
**Done:** `2026-10-06T20:14:06Z`  
**Package:** `pkg-000094`

## Purpose

Vitest coverage for scheme selectors / attribute switch / default-dark boot (AC-SPA-REQ2103-*).

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Theme tests Present · **6/6 PASS** | [`src/theme/__tests__/bootTheme.test.js`](../../../../../../../src/theme/__tests__/bootTheme.test.js) |

## AC / DoD

- [x] (P0) Tests cover scheme vars / attribute switch (AC-01)
- [x] (P0) Default dark when no preference covered (AC-03)
- [x] (P0) No localStorage persistence invent asserted (AC soft / OOS→04)

## Where changed

- `src/theme/__tests__/bootTheme.test.js` (NEW)

## Out of scope

Puppeteer visual redesign · ThemeToggle E2E (REQ21-04)

## Verification

```bash
cd spa-app && npm test -- --run src/theme/__tests__/bootTheme.test.js
```
