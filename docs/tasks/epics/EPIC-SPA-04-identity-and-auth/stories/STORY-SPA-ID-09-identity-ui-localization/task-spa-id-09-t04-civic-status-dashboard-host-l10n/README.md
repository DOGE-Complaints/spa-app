# SPA-ID-09-T04 — Civic status + dashboard host l10n (ID-03)

**Story:** [`../STORY-SPA-ID-09-identity-ui-localization.md`](../STORY-SPA-ID-09-identity-ui-localization.md)  
**Decision Ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-09-identity-ui-localization.md) Scope ID-03 + `dashboard.*`  
**Depends on:** T01 (dictionary keys)  
**ui_scope:** `none`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T10:51:38Z

## Purpose
Retrofit CivicStatusCard and civic label SSOT to `t('civic.*')`. Localize DashboardPage host strings. Preserve EN canon values for `civic.label.*` per FR-03.3 / FR-09.4.

## Risk
Civic status card remains EN on Estonian default. Canonical status labels drift if EN dictionary values are altered.

## Code Facts (re-verify at execute)
- [`CivicStatusCard.jsx`](../../../../../../../../src/components/CivicStatus/CivicStatusCard.jsx) — inline EN; grep `useI18n` → 0.
- [`civicStatusLabels.js`](../../../../../../../../src/components/CivicStatus/civicStatusLabels.js) — EN-only const exports for states A–E.
- [`DashboardPage.jsx`](../../../../../../../../src/pages/DashboardPage.jsx) — host title/subtitle EN literals.
- Story §Translations `civic.label.notVerified` en = «Civic account not verified yet» (canon).

## AC / DoD
- [ ] (P0) CivicStatusCard uses `useI18n()`; all panel copy via `t('civic.*')` (story AC #1, FR-09.1, FR-09.3).
- [ ] (P0) `civicStatusLabels.js` removed or reduced to key constants only — no user-facing EN strings (story AC #1).
- [ ] (P0) `dashboard.title` / `dashboard.subtitle` via `t()` on DashboardPage (story AC #1).
- [ ] (P0) EN `civic.label.*` values in dictionary match backlog §Translations exactly (story AC #4, FR-09.4).
- [ ] (P1) `civic.verified.dialPrefix` uses `formatI18nMessage` with `{prefix}`.

## Where to change
- `spa-app/src/components/CivicStatus/CivicStatusCard.jsx`
- `spa-app/src/components/CivicStatus/civicStatusLabels.js` (deprecate EN blobs)
- `spa-app/src/pages/DashboardPage.jsx`
- `spa-app/src/components/CivicStatus/__tests__/`

## Out of scope
- Phone verification (T05). Locale selector (T03).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/CivicStatus
```
