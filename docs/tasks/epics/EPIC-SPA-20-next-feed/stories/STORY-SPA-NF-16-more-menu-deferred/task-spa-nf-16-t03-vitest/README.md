# SPA-NF-16-T03 — Vitest more Absent

**Status:** Done  
**Story:** [`../STORY-SPA-NF-16-more-menu-deferred.md`](../STORY-SPA-NF-16-more-menu-deferred.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-16-more-menu-deferred.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-16-more-menu-deferred.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T12:46:48Z`  
**Done:** `2026-10-21T12:53:22Z`  
**Package:** `pkg-000192`  
**Path A:** code lock · [ARCH-DELTA §4](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-16.7: Vitest — `feed-civic-post-more` Absent on civic post render.

## Code Facts (verify)

- `feed.nf16` **2/2** · suite **527/527**
- Soft: `feed.nf14` · `FeedCivicPost.nf02` aligned to more Absent
- Path A shots 01–05 · CAPTURE-META `fails: []` · `visual_gate: BLOCK`

## Constraints

- Path A code lock · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No invent OP PASS · no invent menu copy

## AC / DoD

- [x] Vitest: more Absent on civic post
- [x] Soft suites (nf02/nf14) aligned
- [x] Visual Done not claimed without OP eye

## Where changed

`src/features/feed/__tests__/feed.nf16.test.jsx` · nf14 · nf02 · `scripts/tmp-nf16-capture.mjs`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount src/i18n
NF16_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-nf16-capture.mjs
```
