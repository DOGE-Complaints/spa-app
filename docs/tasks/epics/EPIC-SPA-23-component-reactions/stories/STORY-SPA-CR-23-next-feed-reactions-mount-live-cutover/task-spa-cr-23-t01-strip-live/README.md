# SPA-CR-23-T01 — Wire ReactionsMount Live on civic strip

**Status:** Done  
**Closed:** `2026-10-20T21:15:55Z` · P3 · FeedCivicPost → FeedReactionsMount Live  

**Story:** [`../STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md`](../STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  
**ui_scope:** `feed` / `reactions-mount` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T21:05:43Z`  
**Package:** `pkg-000187`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)

## Purpose

FR-CR-23.1 · 23.4: Wire ReactionsMount Live on civic strip (FeedCivicPost / next-feed host) · LiveAdapter · issueId · ThreadsSocialClient only · no invent paths.

## Code Facts (verify)

- `features/feed/FeedReactionsMount.jsx` · **Present** (Live host)
- `FeedCivicPost.jsx` react zone → FeedReactionsMount · **Present**
- `reactions-mount/adapters/LiveAdapter.js` → `ThreadsSocialClient.react` · **Present**

## Constraints

- Path A gap analysis · NO BRIEF · no UX gen · Partial=**BLOCK**  
- ThreadsSocialClient only · People Live fail-closed · no invent HTTP/OP PASS

## AC / DoD

- [x] ReactionsMount on next/feed strip (`data-testid="reactions-mount"`)
- [x] LiveAdapter · issueId · Closed client only
- [x] People Live fail-closed
- [x] Visual Done not claimed without OP eye

## Where to change

`FeedCivicPost.jsx` · `FeedReactionsMount.jsx` · `features/reactions-mount/`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed/__tests__/feed.cr23.test.jsx
```
