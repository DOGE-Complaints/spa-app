# SPA-CAB-01-T03 — L10N cabinet shell keys

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) §FR-CAB-01.L10N, T03, §Тексты и переводы  
**Depends on:** [T02](../task-spa-cab-01-t02-m99-grid-section-slots/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T12:34:41Z

## Purpose
Закрыть FR-CAB-01.L10N / T03: page title, section labels, shell loading через `t()`; ключи `cabinet.*` + `appShell.nav.profile` в dictionaries + `CABINET_FLAT_KEYS` / `IDENTITY_FLAT_KEYS`, et/ru/en.

## Risk
Hardcoded nav/section strings или missing flat keys → AC #5 fail; forbidden-terms.

## Code Facts (re-verify at execute)
- [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) — часть `cabinet.page/section/shell` уже есть (CAB-02 wave); verify completeness vs backlog table.
- `appShell.nav.profile` — **отсутствует** в `identityDictionary.js` (re-verify).
- [localization-developer-guide.md](../../../../../../runtime-docs/localization-developer-guide.md) — `t()` + flat keys.
- Pipeline / backlog §Тексты — verbatim key table (EN canon M21/M99).

## AC / DoD
- [x] (P0) FR-CAB-01.L10N: page title, section labels, shell loading через `t()`.
- [x] (P0) AC #5: все строки shell локализованы (et/ru/en); `CABINET_FLAT_KEYS` / `IDENTITY_FLAT_KEYS` обновлены; forbidden-terms нет.
- [x] (P0) `appShell.nav.profile` wired (не hardcode).

## Where to change
- [`spa-app/src/i18n/cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js)
- [`spa-app/src/i18n/identityDictionary.js`](../../../../../../../src/i18n/identityDictionary.js)
- Sidebar / nav consumer (wire `t('appShell.nav.profile')`)
- [`spa-app/src/pages/UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) — section `aria-label` / titles via `t()`

## Out of scope
- `cabinet.account.*` (CAB-02 Done). Content of CAB-03…06 cards.

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage
cd spa-app && npm test -- --run cabinetDictionary
# or locale parity / flat-keys suite used by CAB-02 T10
```
