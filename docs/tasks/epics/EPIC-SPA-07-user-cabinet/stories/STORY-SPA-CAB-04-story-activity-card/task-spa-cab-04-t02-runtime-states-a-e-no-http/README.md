# SPA-CAB-04-T02 — Runtime states A–E UI (no gateway HTTP)

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-04-story-activity-card.md`](../STORY-SPA-CAB-04-story-activity-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md) §FR-CAB-04.2–04.4, T02–T06, Routes/API, AC  
**Depends on:** T01  
**ui_scope:** `mixed`  
**extends:** T01 / ui-mockup M45+M23  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T11:17:40Z
**Completed:** 2026-07-26T11:31:11Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-45-story-activity-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-45-story-activity-state-sheet-spec.md.png
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.png

## Purpose
Закрыть FR-CAB-04.2 / .3 / .4 и backlog T02–T06: UI layout для states A–E (один за раз); MVP **без** `fetch` к gateway; privacy (нет full story text/phone/wallet/moderation).

## Risk
Live HTTP к GW в MVP ломает AC; Empty с Submit CTA нарушает M23/MVP; Resume Draft на live ID-12 route до wiring — вне MVP AC.

## Code Facts (re-verify at execute)
- MVP AC (backlog): Resume Draft / metrics drill-down / retry load → `cabinet.common.comingSoon`; Verify → `/verify`; Empty primary = `storyHandoff.cta.goToBoard` (не Submit).
- Seams (follow-up, не MVP fetch): [`storyDraftService.js`](../../../../../../../src/services/storyDraftService.js), [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx).
- `cabinet.common.comingSoon` already in [`cabinetDictionary.js`](../../../../../../../src/i18n/cabinetDictionary.js).

## AC / DoD
- [x] (P0) AC #1: 5 runtime states A–E как UI layout (кроме Submit First Story CTA).
- [x] (P0) AC #2: Empty state primary `Go to Board`, не Submit.
- [x] (P0) AC #3: Нет HTTP к gateway; Resume Draft / data-load → `cabinet.common.comingSoon`.
- [x] (P0) AC #4: Verify Account → `/verify` (без gateway).
- [x] (P0) AC #5 / FR-CAB-04.3: Privacy — нет full story text / phone / wallet / moderation notes in UI.
- [x] (P1) FR-CAB-04.4: empty/error states не блокируются на API gap (fixture/props driven).

## Where to change
- `spa-app/src/components/StoryActivity/StoryActivityCard.jsx` (+ helpers/state if needed)
- `spa-app/src/pages/UserCabinetPage.jsx` — props / preview hook if needed for states

## Out of scope
- Icon asset wiring paths (T03). Dictionary keys table (T04). Vitest (T05). Live GW wiring (follow-up).

## Verification
```bash
cd spa-app && npm test -- --run StoryActivity UserCabinetPage
rg -n "fetch\\(|/story-activity|/story-drafts" src/components/StoryActivity || true
```
