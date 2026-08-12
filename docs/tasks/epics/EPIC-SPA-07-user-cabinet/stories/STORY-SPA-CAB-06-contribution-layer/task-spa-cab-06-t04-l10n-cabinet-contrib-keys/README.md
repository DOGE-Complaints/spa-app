# SPA-CAB-06-T04 — L10N cabinet.contrib.* keys

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-06-contribution-layer.md`](../STORY-SPA-CAB-06-contribution-layer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md) §FR-CAB-06.L10N, T06, §Тексты и переводы  
**Depends on:** T01 (wire via `t()`)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-27T14:45:14Z

## Purpose
Закрыть FR-CAB-06.L10N / T06 / AC #5: ключи `cabinet.contrib.*` (+ `{count}` via `formatI18nMessage`) + reuse `cabinet.common.*` (comingSoon/comingLater/retry); et/ru/en; `CABINET_FLAT_KEYS`. EN — канон M53. **Не** добавлять MVP key `cabinet.contrib.receipts.submitStory` (post-MVP).

## Risk
Hardcoded strings / missing flat keys / forbidden-terms → AC #5 fail; Submit Story key in MVP dictionary violates FR-06.5.

## Code Facts (re-verify at execute)
- Target: [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`.
- Verbatim EN/et/ru table in backlog / pipeline story §Тексты.
- Guide: [`localization-developer-guide.md`](../../../../../../runtime-docs/localization-developer-guide.md).
- Pattern: CAB-05 T04 wallet L10N.

## AC / DoD
- [ ] (P0) AC #5: all contrib UI strings via `t()`; et/ru/en parity.
- [ ] (P0) `CABINET_FLAT_KEYS` includes all new `cabinet.contrib.*` keys (except post-MVP submitStory).
- [ ] (P0) `{count}` metrics use `formatI18nMessage`.
- [ ] (P0) Reuse `cabinet.common.retry` / `comingLater` / `comingSoon` where backlog says reuse.
- [ ] (P0) No forbidden-terms; no MVP `submitStory` key.

## Where to change
- `spa-app/src/i18n/cabinetDictionary.js`
- Wire `t()` / `formatI18nMessage` in `ContributionLayer` components

## Out of scope
- Icon paths (T03). Vitest suite (T05). Post-MVP submitStory L10N.

## Verification
```bash
cd spa-app && npm test -- --run cabinetDictionary ContributionLayer
rg -n "cabinet\.contrib\.|submitStory" src/i18n/cabinetDictionary.js
```

Gate: [`acceptance-verification-spa-cab-06-t04.md`](./acceptance-verification-spa-cab-06-t04.md)
