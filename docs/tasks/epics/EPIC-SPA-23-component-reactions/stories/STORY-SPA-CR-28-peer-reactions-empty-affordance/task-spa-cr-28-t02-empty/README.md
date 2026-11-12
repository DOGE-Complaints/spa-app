# SPA-CR-28-T02 — Empty peer icon wire

**Status:** Done  

**Story:** [`../STORY-SPA-CR-28-peer-reactions-empty-affordance.md`](../STORY-SPA-CR-28-peer-reactions-empty-affordance.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-28-peer-reactions-empty-affordance.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-28-peer-reactions-empty-affordance.md)  
**ui_scope:** reactions-mount / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:39:23Z`  
**Package:** `pkg-000226`  
**Path A:** M176 rev2 · Interview M14

## Purpose

FR-CR-28.1 / 28.2: When peer aggregate empty, show people/group icon **above** Reactions label — not blank gap · filled chips continuity · neighbors unmoved.

## Code Facts (verify)

- AS-IS: peer Reactions zone may omit empty affordance / blank gap (arch + M176)
- Target: empty icon-above-label wire in peer zone · reuse Gap v2 / catalog assets · no invent people HTTP

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent people HTTP** · CR-26 own strip OOS · invent CDN OOS

## AC / DoD

- [ ] Empty affordance structure (Apply) — structure
- [ ] Filled continuity · stable footprint held
- [ ] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where to change

`spa-app/src/features/feed/` · `spa-app/src/features/reactions-mount/` · soft peer Reactions zone in `FeedCivicPost`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "peer|Reactions|empty|people" spa-app/src/features/feed/FeedCivicPost.jsx spa-app/src/features/reactions-mount/ -g '*.jsx' -g '*.css' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-reactions/28-peer-reactions-empty-affordance.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M176-peer-reactions-layout-spec-v1.0.md
```
