# SPA-PH-01-T12 — Capture M129 State C (locale menu open)

**Status:** Done — P6 PASS 2026-08-04T07:30:45Z  
**Story:** [`../STORY-SPA-PH-01-header-brand-nav.md`](../STORY-SPA-PH-01-header-brand-nav.md)  
**Decision Ref:** [audit-STORY-SPA-PH-01-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-01-execution-2026-08-04.md) §F2  
**Depends on:** SPA-PH-01-T08 Done  
**ui_scope:** `visual`  
**extends ui-mockup:** [`../task-spa-ph-01-t01-public-header-zones/ui-mockup-spec.md`](../task-spa-ph-01-t01-public-header-zones/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_01_audit_2026_08_04`  
**Scaffolded:** 2026-08-04T07:23:37Z

## Purpose
Закрыть audit **F2**: добавить story-root full-cycle PNG открытого locale selector (M129 State C) + строку в `screenshots/README.md`. Без смены LocaleSelector UX.

## Risk
Evidence gap: нельзя сверить anchored EN/ET/RU menu vs M129 из story pack.

## Code Facts (re-verify at execute)
- Locale: `LanguageSelector` → `LocaleSelector` variant `header` ([`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx)).
- Capture: `tests/puppeteer/public-header-ph01-locale-open.mjs` + full-cycle suite extended with E3.

## AC / DoD
- [x] (P0) PNG under `…/screenshots/full-cycle/` named `0N-edge-*-locale-menu-open-*-1536x1024.png` (kebab).
- [x] (P0) `screenshots/README.md` Edge row for State C + trigger (open locale menu).
- [x] (P0) Gate filled; Date from `--print-utc-now` after live verify.

Gate Date: 2026-08-04T07:30:45Z.

## Where to change
- EDIT/EXTEND `tests/puppeteer/public-header-ph01-full-cycle.mjs` (or one-off capture) → open locale trigger → screenshot
- EDIT `…/STORY-SPA-PH-01-header-brand-nav/screenshots/README.md`
- Gate: `acceptance-verification-spa-ph-01-t12.md`

## Out of scope
- LocaleSelector redesign / globe+EN code artboard; PH-02 account; PH-06 Submit; commit unless operator asks.

## Verification
```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/screenshots/full-cycle/*locale-menu-open*
rg -n 'locale-menu-open|State C' spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-01-header-brand-nav/screenshots/README.md
```

Gate: [`acceptance-verification-spa-ph-01-t12.md`](./acceptance-verification-spa-ph-01-t12.md)
