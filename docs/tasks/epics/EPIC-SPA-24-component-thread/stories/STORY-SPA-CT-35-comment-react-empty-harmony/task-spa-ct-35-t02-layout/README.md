# SPA-CT-35-T02 — Pill empty/filled layout

**Status:** Done · gate **BLOCK** (OP eye Absent)  

**Story:** [`../STORY-SPA-CT-35-comment-react-empty-harmony.md`](../STORY-SPA-CT-35-comment-react-empty-harmony.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-35-comment-react-empty-harmony.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-35-comment-react-empty-harmony.md)  
**ui_scope:** thread-mount / comment action pill · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T11:02:42Z`  
**Package:** `pkg-000228`  
**Path A:** M174 · Interview M12 · soft CT-13

## Purpose

FR-CT-35.1 / 35.2: Comment React empty + filled share harmony with Reply — horizontal icon+label · empty compact (no dead pocket) · filled Reply centers on full React stack · do **not** copy M173 reserved lane.

## Code Facts (verify)

- AS-IS: CT-13 comment action chrome Present · soft empty/filled misalignment residual (Interview M12 / M174)
- Target: M174 anatomy on comment React|Reply group

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · invent glyphs OOS · CT-34 attach OOS · do **not** copy M173 lane

## AC / DoD

- [x] Empty + filled harmony structure Present
- [x] Horizontal icon+label · empty compact · filled Reply center held
- [x] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where to change

`spa-app/src/features/thread-mount/` · soft comment action pill CSS/JSX · soft CR comment plug

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "action-pill|React|Reply|tm-comment" spa-app/src/features/thread-mount/ -g '*.jsx' -g '*.css' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-thread/35-comment-react-empty-harmony.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M174-comment-react-reply-harmony-spec-v1.0.md
```
