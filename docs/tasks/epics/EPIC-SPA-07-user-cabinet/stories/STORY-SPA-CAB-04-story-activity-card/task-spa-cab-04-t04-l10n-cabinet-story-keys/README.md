# SPA-CAB-04-T04 — L10N cabinet.story.* + CABINET_FLAT_KEYS

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-04-story-activity-card.md`](../STORY-SPA-CAB-04-story-activity-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md) §FR-CAB-04.L10N, §Тексты, T07  
**Depends on:** T01–T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T11:17:40Z
**Completed:** 2026-07-26T11:31:11Z

## Purpose
Закрыть FR-CAB-04.L10N / T07: ключи `cabinet.story.*` (en/et/ru) + `{count}` через `formatI18nMessage`; reuse `storyHandoff.cta.goToBoard`, `civic.unverified.cta`, `cabinet.common.*`; обновить `CABINET_FLAT_KEYS`.

## Risk
Hardcoded EN / missing flat keys → locale drift; Submit First Story key в MVP → post-MVP leak.

## Code Facts (re-verify at execute)
- [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js) + `CABINET_FLAT_KEYS`.
- Reuse keys live in identity / storyHandoff dictionaries (do not duplicate copy).
- Guide: [`localization-developer-guide.md`](../../../../../../runtime-docs/localization-developer-guide.md).
- EN canon M45; empty description M23 (not M45 Submit).

## AC / DoD
- [x] (P0) AC #6: все UI strings через `t()`; et/ru/en present for `cabinet.story.*` table.
- [x] (P0) `CABINET_FLAT_KEYS` includes new `cabinet.story.*` keys.
- [x] (P0) Reuse only for empty CTA / verify CTA / discard / code / retry (`storyHandoff` / `civic` / `cabinet.common`).
- [x] (P1) `{count}` metrics use `formatI18nMessage`; no `cabinet.story.empty.submitFirst` in MVP.

## Where to change
- `spa-app/src/i18n/cabinetDictionary.js`
- `spa-app/src/components/StoryActivity/*` — `t()` / `formatI18nMessage` calls

## Out of scope
- Post-MVP `cabinet.story.empty.submitFirst`. Icon paths (T03). Vitest suite expand beyond L10N if covered in T05.

## Verification
```bash
cd spa-app && npm test -- --run cabinetDictionary
rg -n "cabinet\\.story\\." src/i18n/cabinetDictionary.js
```
