# SPA-CR-25-T03 — After write → reload path keeps selected

**Status:** Done  
**Story:** [`../STORY-SPA-CR-25-reaction-selected-hydrate-persist.md`](../STORY-SPA-CR-25-reaction-selected-hydrate-persist.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-25-reaction-selected-hydrate-persist.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-25-reaction-selected-hydrate-persist.md)  
**ui_scope:** `reactions-mount` / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T15:15:09Z`  
**Package:** `pkg-000209`  
**Path A:** Interview Rp12 · persist analysis · p13UxReady

## Purpose

FR-CR-25.4: After PUT ok, local state and next tree reload stay consistent (no silent drop).

## Code Facts (verify)

- AS-IS: local write snapshot may diverge from next tree load
- Target: reload path re-hydrates selected · consistent with last PUT

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent people API · CR-24 visual OOS

## AC / DoD

- [x] PUT → reload keeps selected
- [x] No silent drop
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedReactionsMount` / LiveAdapter tree load (P3)

## Verification

```bash
rg -n "onReact|writeSnapshot|loadKnobs|getThreadTree|selected" spa-app/src/features/feed/FeedReactionsMount.jsx spa-app/src/features/reactions-mount/adapters/LiveAdapter.js
```
