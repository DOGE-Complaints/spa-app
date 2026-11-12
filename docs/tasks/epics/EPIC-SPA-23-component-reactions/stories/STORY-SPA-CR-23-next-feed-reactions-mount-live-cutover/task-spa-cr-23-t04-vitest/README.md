# SPA-CR-23-T04 — vitest reactions-mount · live · lab hold

**Status:** Done  
**Closed:** `2026-10-20T21:15:55Z` · P3 · feed.cr23 + feedLab.cr23 · suite 437/437  

**Story:** [`../STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md`](../STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md)  
**ui_scope:** `feed` / `reactions-mount` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T21:05:43Z`  
**Package:** `pkg-000187`  
**Path A:** [gap analysis](../../../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)

## Purpose

FR-CR-23.6 · 23.7: Vitest — next-feed hosts `data-testid="reactions-mount"` · Live adapter kind · lab Fixture path unchanged.

## Code Facts (verify)

- `feed/__tests__/feed.cr23.test.jsx` · **Present**
- `feed-lab/__tests__/feedLab.cr23.test.jsx` · **Present**
- Path A `scripts/tmp-cr23-capture.mjs` · **Present**

## Constraints

- Lab Fixture unchanged · no invent HTTP/OP PASS  
- Path A gap analysis · Partial=**BLOCK**

## AC / DoD

- [x] Vitest: `data-testid="reactions-mount"` on next-feed hosts
- [x] Live adapter kind asserted
- [x] Lab held (FR-23.6)
- [x] People Live fail-closed covered

## Where to change

`src/features/feed/__tests__/feed.cr23.test.jsx` · `src/features/feed-lab/__tests__/feedLab.cr23.test.jsx`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed src/features/reactions-mount src/features/feed-lab src/features/thread-mount
```
