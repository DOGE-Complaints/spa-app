# SPA-CR-08-T02 — Locale `t` through FeedLabReactionsMount

**Status:** Done  
**Story:** [`../STORY-SPA-CR-08-lab-feed-theme-stress.md`](../STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:27:28Z`  
**Package:** `pkg-000144`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.1

## Purpose
FR-08.1 locale honesty: when stress locale changes, mount/picker strings use `THREADS_FEED_DICTIONARY_BY_LOCALE` / `makeT` — not EN-only `labT`.

## Code Facts (verified at scaffold)
- `spa-app/src/features/feed-lab/post/reactions/FeedLabReactionsMount.jsx` passes `t={labT}`
- `spa-app/src/features/feed-lab/labI18n.js` — EN-only map
- Pattern: `ReactionsLabCanvas.jsx` · `THREADS_FEED_DICTIONARY_BY_LOCALE` + `makeT`

## Implement notes
- Pass locale-aware `t` from FeedLabPage stress state into mounts (root + comment)
- Reuse dictionary keys Present from CR-04 / threadsFeedDictionary
- OOS: invent L10N keys · touch ReactionPicker CSS as primary · CR-09/10

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Depends T01 stress locale control Present preferred

## AC / DoD
- [x] Locale stress changes mount/picker copy via dictionary `t`
- [x] No EN-only hard lock when locale ≠ en

## Where to change
`FeedLabReactionsMount.jsx` · `labI18n.js` · `FeedLabPage.jsx` / discussion hosts pass-down

## Verification
```bash
rg -n "labT|THREADS_FEED_DICTIONARY|makeT|t=" spa-app/src/features/feed-lab/post/reactions/FeedLabReactionsMount.jsx spa-app/src/pages/FeedLabPage.jsx
```
