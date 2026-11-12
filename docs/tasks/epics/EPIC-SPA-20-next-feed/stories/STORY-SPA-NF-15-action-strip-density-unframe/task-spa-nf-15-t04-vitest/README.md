# SPA-NF-15-T04 — Markers / honesty

**Status:** Done  
**Story:** [`../STORY-SPA-NF-15-action-strip-density-unframe.md`](../STORY-SPA-NF-15-action-strip-density-unframe.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-15-action-strip-density-unframe.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-15-action-strip-density-unframe.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T11:59:57Z`  
**Done:** `2026-10-21T12:34:30Z`  
**Package:** `pkg-000191`  
**Path A:** [M162](../../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md)

## Purpose

FR-NF-15.5 · 15.8: Vitest / Path A — strip markers Present · CR-23 host held · no invent counts.

## Code Facts (verify)

- Four-zone `data-action-zones="4"` · `data-nf15-density="m162"` · Present
- CR-23 `data-feed-cr23-strip` / `data-feed-cr23` · Present
- feed.nf15 **2/2** · feedLab.nf15 **1/1** · suite **525/525**
- Path A shots 01–05 · CAPTURE-META `fails: []` · `visual_gate: BLOCK`

## Constraints

- Path A M162 · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No invent OP PASS · no invent counts

## AC / DoD

- [x] Vitest strip markers / honesty
- [x] CR-23 host held
- [x] Visual Done not claimed without OP eye

## Where changed

`src/features/feed/__tests__/feed.nf15.test.jsx` · `src/features/feed-lab/__tests__/feedLab.nf15.test.jsx` · `FeedLabNf15Stand.jsx` · `scripts/tmp-nf15-capture.mjs`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount src/i18n
NF15_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-nf15-capture.mjs
```
