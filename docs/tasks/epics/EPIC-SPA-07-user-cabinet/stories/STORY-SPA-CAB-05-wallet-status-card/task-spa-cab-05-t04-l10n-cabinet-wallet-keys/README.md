# SPA-CAB-05-T04 — L10N cabinet.wallet.* + CABINET_FLAT_KEYS

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-05-wallet-status-card.md`](../STORY-SPA-CAB-05-wallet-status-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-05-wallet-status-card.md) §FR-CAB-05.L10N, §Тексты, T06  
**Depends on:** T01–T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T13:51:04Z
**Completed:** 2026-07-26T19:35:18Z

## Purpose
Закрыть FR-CAB-05.L10N / T06: ключи `cabinet.wallet.*` (en/et/ru); reuse `cabinet.common.comingLater` / `cabinet.common.comingSoon`; обновить `CABINET_FLAT_KEYS`.

## Risk
Hardcoded EN / missing flat keys → locale drift; trading/speculation copy → FR-CAB-05.5 fail.

## Code Facts (re-verify at execute)
- [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`.
- Reuse: `cabinet.common.comingLater` (State A CTA), `cabinet.common.comingSoon` (Connect/Manage affordances).
- Guide: [`localization-developer-guide.md`](../../../../../../runtime-docs/localization-developer-guide.md).
- EN canon M50 — table in pipeline / backlog story §Тексты.

## AC / DoD
- [x] (P0) AC #4: все UI strings через `t()`; et/ru/en present for `cabinet.wallet.*` table.
- [x] (P0) `CABINET_FLAT_KEYS` includes new `cabinet.wallet.*` keys.
- [x] (P0) Reuse only for State A CTA (`comingLater`) and Connect/Manage notice (`comingSoon`).
- [x] (P1) No forbidden trading/speculation terms; truncated address/dates remain dynamic values.

## Where to change
- `spa-app/src/i18n/cabinetDictionary.js`
- `spa-app/src/components/WalletStatus/*` — `t()` calls

## Out of scope
- Icon paths (T03). Vitest suite expand beyond L10N if covered in T05. Live wallet fields from API.

## Verification
```bash
cd spa-app && npm test -- --run cabinetDictionary
rg -n "cabinet\\.wallet\\." src/i18n/cabinetDictionary.js
```
