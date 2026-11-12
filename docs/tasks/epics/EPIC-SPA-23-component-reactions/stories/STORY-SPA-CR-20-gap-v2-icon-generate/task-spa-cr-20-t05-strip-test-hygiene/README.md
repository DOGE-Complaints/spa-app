# SPA-CR-20-T05 — Strip test hygiene + Path A gate

**Status:** Done · `2026-10-18T12:07:24Z`
**P3 note:** Gap v2 Write+promote applied  
**Story:** [`../STORY-SPA-CR-20-gap-v2-icon-generate.md`](../STORY-SPA-CR-20-gap-v2-icon-generate.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md)  
**ui_scope:** `feed-lab` / `reactions-mount` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:04:08Z`  
**Package:** `pkg-000156`  
**@mockup:** residual mirror §3 · Path A `#/lab/feed`  
**extends:** mockup · story-acceptance gate · T03  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:07:24Z`

## Purpose
FR-20.7 · AC: Remove Absent-OK comments; flip cr11/cr17 `existsSync` Absent → Present; Path A shots + story gate (Partial=BLOCK if OP Absent).

## Code Facts (verified at scaffold)
- Tests encode `reactions.svg` Absent as OK (CR-17 residual)
- `FeedPostActionStrip.css` may comment broken-img OK

## Implement notes
- Flip assertions to require file Present · URL still wired
- Path A capture Reactions/React zones · no invent OP PASS

## Constraints
- Partial visual = BLOCK without OP eye · no invent PASS

## AC / DoD
- [x] Vitest Present assertions
- [x] Path A shots inventoried · gate Result set (PASS only with OP eye)

## Where to change
`FeedPostActionStrip.css` · `*cr11*` / `*cr17*` tests · story `screenshots/` · gate

## Verification
```bash
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
rg -n "existsSync|reactions\\.svg|Absent" spa-app/src/features/reactions-mount/__tests__/ spa-app/src/features/feed-lab/__tests__/ | head
```
