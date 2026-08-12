# SPA-CAB-04-T05 — Vitest five states A–E + privacy + no-HTTP

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-04-story-activity-card.md`](../STORY-SPA-CAB-04-story-activity-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md) §T09, Acceptance Criteria  
**Depends on:** T01–T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T11:17:40Z
**Completed:** 2026-07-26T11:31:11Z

## Purpose
Закрыть T09: Vitest покрывает 5 состояний A–E; Empty=`Go to Board`; MVP Resume/data → `comingSoon` (не live ID-12 fetch); Verify → `/verify`; privacy; L10N/forbidden-terms parity; no gateway fetch.

## Risk
Ложный PASS без mount на `/profile`; тест ожидает live draft route вопреки MVP AC.

## Code Facts (re-verify at execute)
- Extend [`UserCabinetPage.test.jsx`](../../../../../../../src/pages/__tests__/UserCabinetPage.test.jsx) — story slot currently asserts placeholder; after T01 expects card.
- New: `src/components/StoryActivity/__tests__/…` (or colocated).
- MVP AC overrides FR-C live resume for this wave: assert `comingSoon` for data affordances.

## AC / DoD
- [x] (P0) 5 states A–E covered in Vitest.
- [x] (P0) Empty primary = Go to Board (not Submit).
- [x] (P0) No HTTP to gateway asserted (or no fetch in component under test).
- [x] (P0) Resume Draft / data-load affordance → `cabinet.common.comingSoon`.
- [x] (P0) Verify CTA → `/verify`.
- [x] (P0) Privacy: no full story text / phone / wallet / moderation in rendered output.
- [x] (P1) L10N / forbidden-terms / flat-keys parity green.

## Where to change
- `spa-app/src/components/StoryActivity/__tests__/`
- `spa-app/src/pages/__tests__/UserCabinetPage.test.jsx`
- `spa-app/src/i18n/__tests__/` if flat-keys guard needs story keys

## Out of scope
- Puppeteer full-cycle (optional later). Story gate artifact (T06). Live GW integration tests.

## Verification
```bash
cd spa-app && npm test -- --run StoryActivity UserCabinetPage cabinetDictionary
```
