# SPA-CAB-08-T03 — Client GET /story-activity + map states

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

FR-CAB-08.4: Wire SPA client to `GET /story-activity` with authenticated session · map to M45 active/empty (no invent rows).

## Code Facts (verify)

- BE Present per [STORY-SPA-CAB-api-requirements.md](../../../../../backlog-stories/cabinet/STORY-SPA-CAB-api-requirements.md)  
- Target: SPA client + StoryActivityCard state map · no invent contribution API

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent** contribution API · no invent rows · no invent OP PASS · invent GW-CAB-03 OOS

## AC / DoD

- [ ] Structure claims only after code verify  
- [ ] Visual Done not claimed without OP eye

## Where changed

_(Await P3)_ `StoryActivityCard.jsx` · soft repository/client

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "story-activity|storyActivity" spa-app/src --glob '!**/node_modules/**' | head -40
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/user profile/mockup-45-story-activity-state-sheet-spec.md
```
