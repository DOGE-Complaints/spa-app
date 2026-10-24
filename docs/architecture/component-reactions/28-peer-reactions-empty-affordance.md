# CR-28 — Peer Reactions empty affordance

> **UTC:** 2026-10-24T10:48:19Z  
> **Code home:** `FeedPeerReactionsEntry.jsx` · `FeedCivicPost.jsx` peer zone  
> **Normative:** Interview **M14** · [M176](../../UX/next/feed/artboards/DOGEstonia-M176-peer-reactions-layout-spec-v1.0.md) rev2  
> **pkg:** `pkg-000226`  
> **Status:** Applied · structure Pass · gate **BLOCK** · OP eye Absent · Story **BLOCKED** · no invent PASS / people HTTP

## Decision

Known-empty peer zone shows catalog people/group chrome (`/icons/next-feed/actions/reactions.svg`) **above** Reactions label. Filled state keeps aggregate chips in a reserved lane. Missing data ≠ empty. No invent people HTTP.

## Evidence (P3–P7)

- Wire: `FeedPeerReactionsEntry` · `data-feed-cr28` · lab empty/fill peer  
- Vitest: `feed.cr28` **5/5**  
- Path A: CAPTURE-META `fails: []` · peerH=commentH **84** · inventPeopleHttp **false**  
- Disposition: F1/F2 **WAIVED** · TASKED=**0** · `activation: none` · P6 skipped  
- Product Story Done: **not** claimed (OP eye)
