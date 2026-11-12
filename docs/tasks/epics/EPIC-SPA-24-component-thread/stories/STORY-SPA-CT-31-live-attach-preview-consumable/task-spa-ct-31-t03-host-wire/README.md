# SPA-CT-31-T03 — Live host passes auth context for A

**Status:** Done  
**Story:** [`../STORY-SPA-CT-31-live-attach-preview-consumable.md`](../STORY-SPA-CT-31-live-attach-preview-consumable.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md)  
**ui_scope:** `thread-mount` / `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T17:56:40Z`  
**Package:** `pkg-000195`  
**P3 Done:** `2026-10-21T18:04:58Z`  
**Path A:** ARCH §17 · CT-22 Present · policy **A** locked

## Purpose

FR-CT-31.1: Ensure Live host passes auth context needed for authenticated fetch (policy A).

## Code Facts (verify)

- Soft: ThreadMount · LiveAdapter · ThreadsSocialClient auth surface
- Lab FixtureAdapter unchanged (FR-31.3)

## Constraints

- No invent gateway proxy · no invent HTTP-09 · Lab held · no invent OP PASS  
- Path A code lock · Partial=**BLOCK**

## AC / DoD

- [x] Live host auth context wired for A fetch
- [x] Lab Fixture unchanged
- [x] Visual Done not claimed without OP eye · Partial=BLOCK held

## Where changed

FeedThreadMount · ThreadMount → tree → getAccessToken · Lab omit

## Verification

```bash
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed
```
