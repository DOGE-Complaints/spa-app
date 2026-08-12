# SPA-CAB-04-T03 — Icon wiring Story Activity (#10–#15 + reuse)

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-04-story-activity-card.md`](../STORY-SPA-CAB-04-story-activity-card.md)  
**Decision Ref:** [`../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-04-story-activity-card.md) §Иконки, T08  
**Depends on:** T01–T02  
**ui_scope:** `visual`  
**extends:** mockup M45 / T01  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-07-26T11:17:40Z
**Completed:** 2026-07-26T11:31:11Z

@mockup: ../../../../../../UX/mockups/user profile/mockup-45-story-activity-state-sheet-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-45-story-activity-state-sheet-spec.md.png
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.md
@mockup: ../../../../../../UX/mockups/user profile/mockup-23-user-cabinet-empty-new-user-spec.png

## Purpose
Закрыть T08: подключить иконки Story Activity из каталога #10–#15 + reuse story-handoff (verify/cloud/retry) в `StoryActivityCard`.

## Risk
Unicode/emoji вместо catalog icons → drift vs M45 и icon inventory.

## Code Facts (re-verify at execute)
- On disk: `public/icons/user-cabinet/ic-story-{activity,empty,draft,id}.png`, `ic-status-{published,under-review}.png`.
- Reuse: `public/icons/story-handoff/ic-verify-shield.png`, `ic-cloud-error.png`, `ic-auto-resubmit.png`.
- Code paths: `/icons/user-cabinet/…`, `/icons/story-handoff/…`.
- Catalog SSOT: [`STORY-SPA-CAB-icon-assets.md`](../../../../../../backlog-stories/cabinet/STORY-SPA-CAB-icon-assets.md) #10–#15 + §Reuse.

## AC / DoD
- [x] (P0) Title / empty / draft / story-id / published / under-review icons wired to catalog paths.
- [x] (P0) State D/E + retry reuse story-handoff icons (no duplicates under user-cabinet).
- [x] (P1) No unicode glyph placeholders for these states in Story Activity UI.

## Where to change
- `spa-app/src/components/StoryActivity/StoryActivityCard.jsx` (icon map / `<img src=…>`)

## Out of scope
- Generating new PNG assets (already on disk). L10N keys (T04). Gateway.

## Verification
```bash
ls spa-app/public/icons/user-cabinet/ic-story-*.png spa-app/public/icons/user-cabinet/ic-status-*.png
ls spa-app/public/icons/story-handoff/ic-verify-shield.png spa-app/public/icons/story-handoff/ic-cloud-error.png spa-app/public/icons/story-handoff/ic-auto-resubmit.png
cd spa-app && npm test -- --run StoryActivity
```
