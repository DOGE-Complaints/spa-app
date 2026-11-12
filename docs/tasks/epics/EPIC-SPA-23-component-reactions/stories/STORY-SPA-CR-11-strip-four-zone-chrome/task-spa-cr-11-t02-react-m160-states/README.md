# SPA-CR-11-T02 — React M160 control states

**Status:** Done · `2026-10-16T10:32:31Z`  
**Story:** [`../STORY-SPA-CR-11-strip-four-zone-chrome.md`](../STORY-SPA-CR-11-strip-four-zone-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T10:27:28Z`  
**Package:** `pkg-000147`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.2

## Purpose
FR-11.5: React zone rest / hover / focus / selected / disabled per M160 §D (yellow selected via tokens).

## Code Facts (verified at scaffold)
- CR-08 feed-lab tokens `--color-*` Present
- Mirror §3.2: React always visible in strip (empty and populated)

## Implement notes
- Optional `data-rm-react-state` on React zone host
- Token yellow selected · no hardcoded light-only islands
- OOS: aggregate row CR-12 · invent SVG

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Theme tokens from CR-08 path

## AC / DoD
- [x] Rest/hover/focus/selected/disabled styles Present
- [x] Selected uses token yellow (not invent hex in SVG)
- [x] React always visible in strip chrome

## Where to change
`FeedPostActionStrip.css` · optional attrs in `FeedPostActionStrip.jsx`

## Verification
```bash
rg -n "data-rm-react-state|hover|selected|--color" spa-app/src/features/feed-lab/post/FeedPostActionStrip.css spa-app/src/features/feed-lab/post/FeedPostActionStrip.jsx
```
