# SPA-NF-14-T04 — Update nf02/nf07/ct29 · assert no open testid

**Status:** Done  
**Story:** [`../STORY-SPA-NF-14-civic-card-hit-target.md`](../STORY-SPA-NF-14-civic-card-hit-target.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-14-civic-card-hit-target.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-14-civic-card-hit-target.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T11:43:47Z`  
**Done:** `2026-10-21T11:51:32Z`  
**Package:** `pkg-000190`  
**Path A:** code lock · [ARCH-DELTA §2](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-14.8: Update nf02 · assert no open testid · navigate region Present · strip outside · Path A shots.

## Code Facts (verify)

- `feed.nf14.test.jsx` · `feedLab.nf14.test.jsx` · **Present**
- `FeedCivicPost.nf02.test.jsx` updated for hit · open Absent
- Path A `scripts/tmp-nf14-capture.mjs` · shots 01–05 · CAPTURE-META `fails: []`

## Constraints

- Path A code lock · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No invent OP PASS

## AC / DoD

- [x] Vitest: open Absent · hit Present · strip outside
- [x] nf02 updated · nf14 + feedLab.nf14 suites
- [x] Visual Done not claimed without OP eye

## Where changed

`feed.nf14.test.jsx` · `feedLab.nf14.test.jsx` · `FeedCivicPost.nf02.test.jsx` · `FeedLabNf14Stand.jsx` · `tmp-nf14-capture.mjs`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed src/features/feed-lab src/features/reactions-mount src/features/thread-mount src/i18n
NF14_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-nf14-capture.mjs
```

P3: vitest **522/522** · feed.nf14 **2/2** · feedLab.nf14 **1/1** · shots md5 `eeddeb717f5c` · `6c75e3e88912` · `51b3ac387a29` · `92b7a437cf76` · `f1b3918a3a65`
