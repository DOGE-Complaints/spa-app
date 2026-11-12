# SPA-CT-07-T02 — writeCapability drives gate

**Status:** Done  
**Story:** [`../STORY-SPA-CT-07-verify-write-gate-lab.md`](../STORY-SPA-CT-07-verify-write-gate-lab.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-07-verify-write-gate-lab.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-07-verify-write-gate-lab.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:54:11Z`  
**Package:** `pkg-000165`  
**@mockup:** [`../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md`](../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) §4.3 V-A · V-E · [M157](../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md)  
**Runtime:** P3 Done · `2026-10-18T13:57:34Z`

## Purpose

FR-CT-07.1 / 07.5: `writeCapability` (`allowed` | `unverified` | `denied-unknown` | stale) selects VerifyWriteGate vs ThreadComposer · honest WRITE-DENIED-UNKNOWN · no bare-403 → `/verify` guess.

## Constraints

- No invent HTTP · OP PASS  
- FixtureAdapter capability matrix only

## AC / DoD

- [x] Capability wire Present · composer gated when unverified
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/ThreadMount.jsx` · `adapters/FixtureAdapter.js`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
