# SPA-CR-24-T01 — Wide single underlay CSS (M163)

**Status:** Done  
**Story:** [`../STORY-SPA-CR-24-react-underlay-own-vs-people.md`](../STORY-SPA-CR-24-react-underlay-own-vs-people.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-24-react-underlay-own-vs-people.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-24-react-underlay-own-vs-people.md)  
**ui_scope:** `reactions-mount` / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:56:25Z`  
**Package:** `pkg-000208`  
**Path A:** M163 · Interview Rx7 · p13UxReady

## Purpose

FR-CR-24.1 · 24.6: React control has **one wide** underlay spanning its zone — no double nest / inner pill (M163). Comment/Share stay flat.

## Code Facts (verify)

- AS-IS: `ReactionSummaryStrip` · `FeedReactionsMount` · `FeedCivicPost` (backlog code home)
- Target: single wide React underlay CSS · no double nest

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN · no invent M163 PNG

## AC / DoD

- [x] One wide underlay Present
- [x] Visual Done not claimed without OP eye · gate **BLOCK** until OP

## Where changed

`ReactionSummaryStrip` CSS / strip chrome (P3)

## Verification

```bash
rg -n "underlay|React|reaction-summary" spa-app/src/features/reactions-mount
```
