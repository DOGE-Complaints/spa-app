# SPA-CR-11-T03 — Narrow stress 2×2 grid

**Status:** Done · `2026-10-16T10:32:31Z`  
**Story:** [`../STORY-SPA-CR-11-strip-four-zone-chrome.md`](../STORY-SPA-CR-11-strip-four-zone-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T10:27:28Z`  
**Package:** `pkg-000147`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.4

## Purpose
FR-11.6: at narrow lab stress (~320 / 200% text) strip CSS becomes **2×2** (React|Comment / Share|Reactions).

## Code Facts (verified at scaffold)
- FeedLabPage stress controls Present (CR-08) · viewport/zoom attrs
- Strip currently single-row 3-col grid

## Implement notes
- Prefer CSS driven by lab stress attrs / container query / media aligned to stress host
- Row1 React+Comment · Row2 Share+Reactions
- OOS: aggregate CR-12 · invent SVG

## Constraints
- Partial visual = BLOCK · no invent OP PASS

## AC / DoD
- [x] Narrow stress → 2×2 layout Present
- [x] Desktop wide remains 1×4
- [x] Zones order preserved

## Where to change
`FeedPostActionStrip.css` · FeedLabPage stress attrs (if needed)

## Verification
```bash
rg -n "2x2|grid-template|320|200" spa-app/src/features/feed-lab/post/FeedPostActionStrip.css spa-app/src/pages/FeedLabPage.jsx
```
