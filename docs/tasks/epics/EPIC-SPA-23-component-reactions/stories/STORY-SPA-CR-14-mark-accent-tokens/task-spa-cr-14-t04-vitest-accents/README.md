# SPA-CR-14-T04 — Vitest accents + gate/shots

**Status:** Done  
**Story:** [`../STORY-SPA-CR-14-mark-accent-tokens.md`](../STORY-SPA-CR-14-mark-accent-tokens.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-14-mark-accent-tokens.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-14-mark-accent-tokens.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Completed:** `2026-10-16T11:04:23Z`  
**Scaffolded:** `2026-10-16T11:00:46Z`  
**Package:** `pkg-000150`  
**@mockup:** [`../../../../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md`](../../../../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §4.5

## Purpose
AC vitest + Path A shots + gate: class/attr map · light/dark · no new SVG · verify labs.

## Code Facts (verified at scaffold)
- Gate stub PENDING · Partial visual=BLOCK
- CR-13 tile grid Present · CR-08 theme Present

## Implement notes
- New or extend `reactionsMount.cr14` · gate Result BLOCK if OP eye Absent
- OOS: multicolor SVG generate · invent HTTP · M155

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No multicolor SVG generate · no invent HTTP · no M155
- Prefer existing CSS variables over hardcoded hex where Present

## AC / DoD
- [x] Structure for FR AC Present
- [x] No new `*-color.svg` mark files

## Where to change
`spa-app/src/features/reactions-mount/__tests__/*` · gate/checklist/shots under story root

## Verification
```bash
cd spa-app && npm test -- --run src/features/reactions-mount\npython3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
