# CR-27 — List own reactions hydrate

> **UTC:** 2026-10-24T10:37:16Z  
> **Code home:** `FeedListArea.jsx` · `FeedThreadMount` CR-25 `onThreadRootReactions` lift  
> **Normative:** Interview **M10** · Path A · Partial visual=**BLOCK**  
> **pkg:** `pkg-000225`  
> **Status:** Applied · structure Pass · gate **BLOCK** · OP eye Absent · Story **BLOCKED** · no invent PASS / gateway schema

## Decision

List cards hydrate actor `selected[]` by reusing CR-25 tree mapping (`thread_root_reactions` via `FeedThreadMount.onThreadRootReactions` → `FeedCivicPost` `initialSelected*`). No invent list/gateway schema.

## Evidence (P3–P7)

- Wire: `FeedIssueCard` lifts `rootRx` · `data-feed-cr27` markers  
- Vitest: `feed.cr27` **2/2**  
- Path A: CAPTURE-META `fails: []` · inventGatewaySchema **false**  
- Disposition: F1/F2 **WAIVED** · TASKED=**0** · `activation: none` · P6 skipped  
- Product Story Done: **not** claimed (OP eye)
