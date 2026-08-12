# SPA-CAB-07-T03 — L10N cabinet.error.profileLoad.*

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-07-cabinet-page-states.md`](../STORY-SPA-CAB-07-cabinet-page-states.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) §FR-CAB-07.L10N, T05  
**Depends on:** T02 (keys consumed by ErrorPanel)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-28T13:48:38Z

## Purpose
Добавить `cabinet.error.profileLoad.*` (title/message/details) + reuse `cabinet.common.retry`, `storyHandoff.cta.backToBoard`, `cabinet.common.codeLabel` в `cabinetDictionary.js` + `CABINET_FLAT_KEYS` (et/ru/en). M23 — без новых ключей (reuse CAB-02…06).

## Risk
Hardcoded EN strings or missing FLAT_KEYS → locale gaps / false Done on L10N AC.

## Code Facts (re-verify at execute)
- [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) — no `cabinet.error.profileLoad` at scaffold.
- Guide: [`localization-developer-guide.md`](../../../../../../runtime-docs/localization-developer-guide.md).
- EN canon from M22 / backlog table.

## AC / DoD
- [ ] (P0) AC #5: M22 strings localized et/ru/en via `t()`; `CABINET_FLAT_KEYS` updated; forbidden-terms none.
- [ ] (P0) Keys: `title`, `message`, `details`; retry/backToBoard reuse existing keys.
- [ ] (P1) M23 composite uses existing CAB-02…06 keys only (no new M23 keys).

## Where to change
- `spa-app/src/i18n/cabinetDictionary.js`
- ErrorPanel / consumers to use `t()` (if not already in T02)

## Out of scope
- Per-code title/message translations. Icon wiring (T04). Vitest (T05).

## Verification
```bash
cd spa-app && npm test -- --run cabinetDictionary
```

Gate: [`acceptance-verification-spa-cab-07-t03.md`](./acceptance-verification-spa-cab-07-t03.md)
