# SPA-CR-24-T02 — React→picker · Reactions→people

**Status:** Done  
**Story:** [`../STORY-SPA-CR-24-react-underlay-own-vs-people.md`](../STORY-SPA-CR-24-react-underlay-own-vs-people.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-24-react-underlay-own-vs-people.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-24-react-underlay-own-vs-people.md)  
**ui_scope:** `reactions-mount` / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:56:25Z`  
**Package:** `pkg-000208`  
**Path A:** M163/M164 · Interview Rx7 · p13UxReady

## Purpose

FR-CR-24.2 · 24.3: Tap React → own M154 picker — not people. Tap rightmost `Reactions` text → M155 people path (honesty if unavailable) — not picker · no glyph stack on right.

## Code Facts (verify)

- AS-IS: CR-21 people affordance · CR-17/18 people paths Present (soft)
- Target: React≠people · Reactions≠picker · honesty if people unavailable

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent people HTTP · no invent OP PASS

## AC / DoD

- [x] React opens picker only
- [x] Reactions opens people path (or honesty) only
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedReactionsMount` / strip click handlers (P3)

## Verification

```bash
rg -n "activateAggregate|openPicker|Reactions|people" spa-app/src/features/reactions-mount
```
