# SPA-CAB-06-T01 — Mount ContributionLayer in M99 Section 5

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-06-contribution-layer.md`](../STORY-SPA-CAB-06-contribution-layer.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-06-contribution-layer.md) §FR-CAB-06.1, T01  
**Depends on:** [CAB-01](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) — contribution slot in `UserCabinetPage`  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-27T14:45:14Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-53-contribution-layer-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-53-contribution-layer-state-sheet-spec.png
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.png

## Purpose
Закрыть FR-CAB-06.1 / T01: создать parent `<ContributionLayer />` с тремя дочерними карточками (Story Receipts / Contribution Records / Reputation) и смонтировать в слот Contribution (`cabinet-slot-contribution`, M99 Section 5) вместо `cabinet.common.comingLater`.

## Risk
Без mount нижняя секция остаётся placeholder; M53 layout не появляется на `/profile`.

## Code Facts (re-verify at execute)
- [`UserCabinetPage.jsx`](../../../../../../../src/pages/UserCabinetPage.jsx) — `SECTION_SLOTS` id `contribution`; `testId: cabinet-slot-contribution`; currently renders `cabinet.common.comingLater` placeholder.
- Account / civic / story / wallet slots mount cards — образец mount branch (no slot-header when card owns title).
- No `ContributionLayer` in `src/` yet (`rg ContributionLayer` empty for component).

## AC / DoD
- [ ] (P0) FR-CAB-06.1 / AC #1: `ContributionLayer` смонтирован в contribution slot на `/profile`; три модуля видны (layout).
- [ ] (P0) Placeholder `comingLater` убран из contribution slot.
- [ ] (P1) Component scaffold ready for T02 states (default A1 + C1 stubs).
- [ ] (P1) Contribution layer не блокирует остальные секции кабинета.

## Where to change
- `spa-app/src/components/ContributionLayer/` (new) — `ContributionLayer.jsx` (+ child cards / index export)
- `spa-app/src/pages/UserCabinetPage.jsx` — contribution branch like wallet/story

## Out of scope
- Runtime states A1–C3 details (T02). Icons (T03). L10N keys (T04). Vitest suite (T05). HTTP / GW-CAB-03.

## Verification
```bash
cd spa-app && npm test -- --run UserCabinetPage
rg -n "ContributionLayer|cabinet-slot-contribution" src/pages/UserCabinetPage.jsx src/components/ContributionLayer || true
```

Gate: [`acceptance-verification-spa-cab-06-t01.md`](./acceptance-verification-spa-cab-06-t01.md)
