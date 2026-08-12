# SPA-G8-T07 — Deduplicate LanguageSelector vs LocaleSelector (post-audit)

**Status:** Done  
**Story:** [`../STORY-SPA-G8-app-shell-refactor.md`](../STORY-SPA-G8-app-shell-refactor.md)  
**Decision Ref:** [audit-STORY-SPA-G8-execution-2026-07-29.md](../../../../../../../../analysis/audit-STORY-SPA-G8-execution-2026-07-29.md) §G-1  
**Depends on:** SPA-G8-T01…T06 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-29T09:04:00Z

## Purpose
Убрать дублирование `LanguageSelector.jsx` и `LocaleSelector.jsx`, сохранив поведение Board/Issue/Cabinet и единый источник логики locale dropdown.

## Risk
Если оставить оба компонента, копипаста продолжит расходиться по aria/CSS и усложнит поддержку.

## Code Facts (verified)
- `src/components/AppShell/LanguageSelector.jsx` дублирует логику `src/components/LocaleSelector/LocaleSelector.jsx` (audit G-1).
- `BoardPage`/`IssuePage` используют `LanguageSelector` через `Header`.
- default header в `AppShell.jsx` использует `LocaleSelector`.

## AC / DoD
- [x] (P0) Один источник логики locale selector (без runtime-дублирования двух компонентов).
- [x] (P0) Board/Issue/Cabinet сохраняют UX-паритет и locale switching.
- [x] (P0) Нет новых расхождений в aria/CSS контрактах между shell-вариантами.
- [x] (P0) Gate заполнен в `acceptance-verification-spa-g8-t07.md`.

## Where to change
- `spa-app/src/components/AppShell/LanguageSelector.jsx`
- `spa-app/src/components/LocaleSelector/LocaleSelector.jsx`
- `spa-app/src/components/AppShell/Header.jsx`
- `spa-app/src/components/AppShell/AppShell.jsx`
- tests/docs по факту реализации

## Out of scope
- Новые маршруты.
- Изменение active pkg.

## Verification
```bash
cd spa-app && npm test
cd spa-app && npm run test:ui:board-shell
```

Gate: [`acceptance-verification-spa-g8-t07.md`](./acceptance-verification-spa-g8-t07.md)

Gate Date: 2026-07-29T09:39:05Z.
