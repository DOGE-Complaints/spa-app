# SPA-CR-22-T02 — Flush fix (verified cause only)

**Status:** Done · `2026-10-18T12:25:27Z`  
**P3 note:** card+detail media `background: transparent` · flush locks held · chip held  
**Story:** [`../STORY-SPA-CR-22-media-strip-flush-residual.md`](../STORY-SPA-CR-22-media-strip-flush-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-22-media-strip-flush-residual.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-22-media-strip-flush-residual.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:22:10Z`  
**Package:** `pkg-000158`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md)  
**@mirror:** residual §5 · measure-then-fix  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:25:27Z`

## Purpose
FR-22.1 · 22.3–22.4: Minimal CSS for verified cause only (remove light media plate). Detail parity. Hold CR-16 chip.

## Code Facts (verified at P3)
- Capture: `mediaBg=rgba(0,0,0,0)` · gap still **0**
- `data-lab-cr22-flush=true` on card + detail

## Constraints
- Fix only measured cause · no invent SVG/HTTP/OP PASS · hold chip

## AC / DoD
- [x] Structure flush + plate fix Present
- [x] Detail parity CSS
- [ ] Visual Done not claimed without OP eye

## Where to change
`FeedPostCard.css` · `FeedIssueDetailBody.css` · markers on JSX

## Verification
```bash
rg -n "background: transparent|CR-22" spa-app/src/features/feed-lab/post/FeedPostCard.css spa-app/src/features/feed-lab/post/FeedIssueDetailBody.css
```
