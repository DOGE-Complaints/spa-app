# SPA-CR-08-T01 — FeedLabPage M160 stress controls

**Status:** Done  
**Story:** [`../STORY-SPA-CR-08-lab-feed-theme-stress.md`](../STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:27:28Z`  
**Package:** `pkg-000144`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.1

## Purpose
FR-08.1 / FR-08.2: on `#/lab/feed`, expose stress controls (min light/dark; prefer ET/RU/EN · 320 · 200%) with same UX grammar as `#/lab/reactions`; theme via `setThemeAttribute(..., { persist: false })`.

## Code Facts (verified at scaffold)
- Pattern Present: `spa-app/src/features/reactions-mount/lab/ReactionsLabCanvas.jsx` · `data-testid="rm-lab-stress-controls"` · `setThemeAttribute`
- Gap: `spa-app/src/pages/FeedLabPage.jsx` (+ `.css`) — no stress UI
- Theme helper Present: `spa-app/src/theme/bootTheme.js`

## Implement notes
- Reuse reactions-lab stress row grammar / testids where practical
- Attrs `data-lab-*` for locale/theme/viewport/text-zoom as wired
- Do not persist lab theme to localStorage
- OOS: locale `t` into mount (T02) · feed-lab hex→tokens (T03) · CR-09/10

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No invent HTTP · no M155 · no `#/next/feed`

## AC / DoD
- [x] `#/lab/feed` has light/dark toggle usable like reactions lab
- [x] Toggle sets document `data-theme` via existing bootTheme path
- [x] Stress host testid Present (`rm-lab-stress-controls` or feed-lab equivalent documented)

## Where to change
`spa-app/src/pages/FeedLabPage.jsx` · `FeedLabPage.css` · possibly thin shared stress chrome

## Verification
```bash
rg -n "rm-lab-stress-controls|setThemeAttribute|data-lab-theme" spa-app/src/pages/FeedLabPage.jsx spa-app/src/pages/FeedLabPage.css
# manual: http://127.0.0.1:5173/#/lab/feed
```
