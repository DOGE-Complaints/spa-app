# SPA-CAB-02-T05 — L10N cabinet.account keys

**Status:** Todo  
**Story:** [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-02-account-summary-block.md) §FR-CAB-02.L10N, T05, §Тексты и переводы  
**Depends on:** [T02](../task-spa-cab-02-t02-stable-field-grid/README.md)  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-12T08:03:15Z

## Purpose
Закрыть FR-CAB-02.L10N / T05: ключи `cabinet.account.*` + reuse `cabinet.common.notAvailable`, et/ru/en, `CABINET_FLAT_KEYS`; wire в `AccountSummary` через `t()`.

## Risk
Hardcoded labels или missing flat keys → AC #6 fail; forbidden-terms in translations.

## Code Facts (re-verify at execute)
- `cabinetDictionary.js` — **не существует** (создать).
- [`dictionaries.js`](../../../../../../../src/i18n/dictionaries.js) — merge pattern for domain dictionaries.
- [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md) — `t()` + flat keys registry.
- Pipeline story §Тексты и переводы — verbatim key table (EN canon M24–M26).

## AC / DoD
- [x] (P0) FR-CAB-02.L10N: labels, role/status display, placeholder через `t()`.
- [x] (P0) AC #6: все строки локализованы (et/ru/en); `CABINET_FLAT_KEYS` обновлён; forbidden-terms нет.
- [x] (P0) Reuse `cabinet.common.notAvailable` for missing fields (not duplicate key).
- [x] (P1) API role `citizen` / `authenticated_user` → `cabinet.account.role.authenticatedUser` display mapping.

## Where to change
- `spa-app/src/i18n/cabinetDictionary.js` (new)
- [`spa-app/src/i18n/dictionaries.js`](../../../../../../../src/i18n/dictionaries.js) — merge cabinet dict
- `spa-app/src/components/AccountSummary/AccountSummary.jsx` — replace hardcoded strings with `t()`

## Out of scope
- CAB-01 shell keys (`cabinet.page.*`, section titles) — CAB-01 scope unless shared file created here with minimal `cabinet.common.notAvailable`.

## Verification
```bash
cd spa-app && npm test -- --run identityLocaleSnapshots
cd spa-app && npm test -- --run AccountSummary
```
