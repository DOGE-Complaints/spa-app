# SPA-CAB-03-T04 — L10N civic.* reuse-only (no cabinet duplicates)

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../STORY-SPA-CAB-03-civic-status-in-cabinet.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-03-civic-status-in-cabinet.md) §FR-CAB-03.L10N, T04  
**Depends on:** T01–T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-25T21:26:27Z
**Completed:** 2026-07-25T21:40:18Z

## Purpose
Закрыть FR-CAB-03.L10N / T04: все civic strings только через существующие `civic.*` (ID-03); **запрет** дублировать civic-copy в `cabinet.*`. Новых ключей не создавать.

## Risk
Дубли в `cabinet.*` → drift vs ID-03 / M28 canon.

## Code Facts (re-verify at execute)
- Civic copy SSOT: [`identityDictionary.js`](../../../../../../../src/i18n/identityDictionary.js) `civic.*` + `IDENTITY_FLAT_KEYS`.
- Cabinet section title only: `cabinet.section.civicStatus` (shell, CAB-01) — не body civic card.
- Guide: [`localization-developer-guide.md`](../../../../../../runtime-docs/localization-developer-guide.md).

## AC / DoD
- [x] (P0) AC #5: Civic strings только через `civic.*` reuse.
- [x] (P0) Нет новых `cabinet.civic.*` / дублей Verify/Verified copy в `cabinetDictionary.js`.
- [x] (P1) `CABINET_FLAT_KEYS` не раздут civic-body keys; `IDENTITY_FLAT_KEYS` civic keys intact.

## Where to change
- Prefer **no code** if T01–T02 already use `CivicStatusCard` `t('civic.*')`.
- Guard/test: optional assert in T05; this task documents/verifies no-new-keys.

## Out of scope
- New translations. M23 exact copy (`cabinet.civic.newUserHint` — only CAB-07 if needed).

## Verification
```bash
cd spa-app && npm test -- --run identityDictionary cabinetDictionary
rg -n "cabinet\\.civic\\.|Verify Account" src/i18n/cabinetDictionary.js || true
```
