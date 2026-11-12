# SPA-CT-07-T03 — Stub handoff + draft keys

**Status:** Done  
**Story:** [`../STORY-SPA-CT-07-verify-write-gate-lab.md`](../STORY-SPA-CT-07-verify-write-gate-lab.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-07-verify-write-gate-lab.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-07-verify-write-gate-lab.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:54:11Z`  
**Package:** `pkg-000165`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.3 V-B · V-D · [M157](../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · `2026-10-18T13:57:34Z`

## Purpose

FR-CT-07.2–07.4: Go to verification → stub handoff (route label `/verify` or lab return simulator) · session draft/target keys · cancel/fail return still blocked · draft intact · no method UI invent.

## Constraints

- No invent Identity methods · redesign `/verify` · OP PASS  
- Stub / lab simulator only

## AC / DoD

- [x] Stub handoff + cancel/fail return Present
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/lab/ThreadLabCanvas.jsx` · verify stub host · adapter session keys

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
