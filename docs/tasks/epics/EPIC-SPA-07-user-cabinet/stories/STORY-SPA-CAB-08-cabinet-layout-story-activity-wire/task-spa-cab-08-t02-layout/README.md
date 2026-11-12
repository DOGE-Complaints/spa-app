# SPA-CAB-08-T02 — Compact civic · full-width activity · fix overlap

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md`](../STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/cabinet/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md`](../../../../../backlog-stories/cabinet/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md)  
**ui_scope:** `cabinet` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T14:39:13Z`  
**Package:** `pkg-000217`  
**Path A:** M170+M45 · Interview P5 · p13UxReady

## Purpose

FR-CAB-08.2 · 08.3 · 08.6: Compact verified civic · Story Activity full-width · no float/overlap.

## Code Facts (verify)

- Target: CivicStatusCard compact · StoryActivityCard full main column after T01

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK** · no invent OP PASS / contribution API

## AC / DoD

- [ ] Structure claims only after code verify  
- [ ] Visual Done not claimed without OP eye

## Where changed

_(Await P3)_ `UserCabinetPage.jsx` · `CivicStatusCard` · soft CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/user profile/DOGEstonia-M170-cabinet-layout-no-wallet-contrib-spec-v1.0.md
```
