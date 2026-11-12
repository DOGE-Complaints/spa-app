# SPA-CT-07-T01 — VerifyWriteGate chrome

**Status:** Done  
**Story:** [`../STORY-SPA-CT-07-verify-write-gate-lab.md`](../STORY-SPA-CT-07-verify-write-gate-lab.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-07-verify-write-gate-lab.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-07-verify-write-gate-lab.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:54:11Z`  
**Package:** `pkg-000165`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.3 V-A · V-F · [M157](../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · `2026-10-18T13:57:34Z`

## Purpose

FR-CT-07.1 / 07.7: Greenfield `VerifyWriteGate` — Verify to participate · draft+target visible · Go to verification / Not now · mobile gate usable. Reference `features/feed/verify/` structure only — no product FeedDiscussionBlock import into lab Done path.

## Constraints

- No invent Identity methods · method chooser · eID/phone UI · OP PASS  
- Lab presentation only

## AC / DoD

- [x] Gate chrome Present (desktop + mobile)
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/verify/VerifyWriteGate.jsx` (+ css)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
