# SPA-CR-11-T01 — Four zones + icon Runtime URLs

**Status:** Done · `2026-10-16T10:32:31Z`  
**Story:** [`../STORY-SPA-CR-11-strip-four-zone-chrome.md`](../STORY-SPA-CR-11-strip-four-zone-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T10:27:28Z`  
**Package:** `pkg-000147`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.1  
**@icons:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md) §Gap v2

## Purpose
FR-11.1–11.4: restore ZONES×4 (`react` · `comment` · `share` · `reactions`); `data-lab-strip-zones="4"`; each zone icon+label; wire Runtime URLs `/icons/next-feed/actions/{react,comment,share,reactions}.svg`.

## Code Facts (verified at scaffold)
- AS-IS: `FeedPostActionStrip.jsx` `data-lab-strip-zones="3"` · `reactSlot` · Comment/Share text-only
- Gap v2: `react.svg` Present wrong glyph · `reactions.svg` **Absent** — **wire URLs only · no invent SVG**

## Implement notes
- Equal chrome weight · no React-only bordered pill
- Supersedes CR-09 3-zone chrome for strip
- OOS: M160 states (T02) · 2×2 (T03) · aggregate CR-12

## Constraints
- Partial visual = BLOCK · no invent OP PASS · no invent SVG bodies
- Gap v2 residual → visual BLOCK until promote

## AC / DoD
- [x] `data-lab-strip-zones="4"` · testids `feed-post-action-{react,comment,share,reactions}`
- [x] Icon+label per zone · Runtime URL wired
- [x] No invent SVG · Gap v2 residual documented

## Where to change
`spa-app/src/features/feed-lab/post/FeedPostActionStrip.jsx` · `FeedPostActionStrip.css`

## Verification
```bash
rg -n "data-lab-strip-zones|/icons/next-feed/actions/" spa-app/src/features/feed-lab/post/FeedPostActionStrip.jsx spa-app/src/features/feed-lab/post/FeedPostActionStrip.css
```
