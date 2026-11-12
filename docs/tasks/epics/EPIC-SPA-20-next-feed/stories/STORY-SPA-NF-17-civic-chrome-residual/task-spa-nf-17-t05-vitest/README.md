# SPA-NF-17-T05 — Markers / honesty

**Status:** Done  
**Story:** [`../STORY-SPA-NF-17-civic-chrome-residual.md`](../STORY-SPA-NF-17-civic-chrome-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-17-civic-chrome-residual.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-17-civic-chrome-residual.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T17:41:52Z`  
**Done:** `2026-10-21T17:48:06Z`  
**Package:** `pkg-000194`  
**Path A:** [M162](../../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) · [ARCH-DELTA §5](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-17.6: Vitest / CSS markers Present · Path A honesty · no invent PASS.

## Code Facts (verify)

- `data-nf17-chrome="residual"` · four-zone · CR-23 · nf15 density held
- feed.nf17 **2/2** · suite feed+feed-lab+reactions-mount+thread-mount+i18n **533/533**
- Path A shots 01–05 · CAPTURE-META `fails: []` · `visual_gate: BLOCK`

## Constraints

- Path A M162 · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No invent OP PASS · no invent counts

## AC / DoD

- [x] Vitest / markers
- [x] Visual Done not claimed without OP eye

## Where changed

`src/features/feed/__tests__/feed.nf17.test.jsx` · `FeedCivicPost.jsx` (`data-nf17-chrome`) · `scripts/tmp-nf17-capture.mjs`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount src/i18n
NF17_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-nf17-capture.mjs
```
