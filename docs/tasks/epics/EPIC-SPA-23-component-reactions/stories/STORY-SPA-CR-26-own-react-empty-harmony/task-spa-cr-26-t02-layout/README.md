# SPA-CR-26-T02 — Strip empty/filled CSS/layout harmony

**Status:** Done  
**Closed:** `2026-10-24T10:24:13Z`  
 

**Story:** [`../STORY-SPA-CR-26-own-react-empty-harmony.md`](../STORY-SPA-CR-26-own-react-empty-harmony.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-26-own-react-empty-harmony.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-26-own-react-empty-harmony.md)  
**ui_scope:** reactions-mount / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:18:37Z`  
**Package:** `pkg-000224`  
**Path A:** M173 · Interview M9 · arch 26 · p13UxReady

## Purpose

FR-CR-26.1 · 26.2: Own React **empty** and **filled** share one horizontal rhythm with Comment (baseline · hit height · no shifted icon) · icon above label · reserved 3-slot own lane · one wide React underlay · strip order React→Comment→Share→Reactions.

## Code Facts (verify)

- AS-IS: `FeedReactionsMount` · `FeedCivicPost` strip · reactions-mount CSS (CR-24 underlay Present)
- Target: empty↔filled harmony with Comment per M173 · no invent glyph catalog

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · no invent glyph catalog · CR-27/CR-28 OOS · invent people API OOS

## AC / DoD

- [x] Empty + filled harmony structure (Apply) — icon-above-label every state · Comment column · reserved lane
- [x] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where to change

`spa-app/src/features/feed/` · `spa-app/src/features/reactions-mount/` · strip / reactions-mount CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "FeedReactionsMount|own|underlay|Comment" spa-app/src/features/feed spa-app/src/features/reactions-mount | head -40
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-reactions/26-own-react-empty-harmony.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M173-own-react-empty-filled-harmony-spec-v1.0.md
```
