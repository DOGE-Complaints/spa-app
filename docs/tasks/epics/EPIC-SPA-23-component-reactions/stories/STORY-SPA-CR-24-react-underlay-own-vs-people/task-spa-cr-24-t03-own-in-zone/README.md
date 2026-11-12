# SPA-CR-24-T03 — Own icons inside React · stable box · zero layout

**Status:** Done  
**Story:** [`../STORY-SPA-CR-24-react-underlay-own-vs-people.md`](../STORY-SPA-CR-24-react-underlay-own-vs-people.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-24-react-underlay-own-vs-people.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-24-react-underlay-own-vs-people.md)  
**ui_scope:** `reactions-mount` / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:56:25Z`  
**Package:** `pkg-000208`  
**Path A:** M164 · Interview Rx7 · p13UxReady

## Purpose

FR-CR-24.4 · 24.5: Own selected icons render **inside** React underlay (lower row) · outer React geometry **stable** for 0/1/2/3 · default max 3 · **no** page-wide aggregate row below strip. Zero-selected: entry thumb **above** `React` label · peer-aligned with Comment/Share.

## Code Facts (verify)

- AS-IS: CR-12 aggregate-row residual may still place own/aggregate outside React zone (verify at P3)
- Target: own in-zone · stable box · zero thumb above label · no below-row

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- M164 supersedes draft “below” · no invent OP PASS · CR-25 hydrate **OOS**

## AC / DoD

- [x] Own icons inside React underlay
- [x] Geometry stable 0/1/2/3
- [x] Zero-selected thumb above React label
- [x] No below-row aggregate
- [x] Visual Done not claimed without OP eye

## Where changed

`ReactionSummaryStrip` / own-selected render (P3)

## Verification

```bash
rg -n "selected|own|aggregate|below" spa-app/src/features/reactions-mount
```
