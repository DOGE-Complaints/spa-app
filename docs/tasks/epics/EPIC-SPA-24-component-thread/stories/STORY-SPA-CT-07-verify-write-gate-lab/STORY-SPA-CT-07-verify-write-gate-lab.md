# STORY-SPA-CT-07-verify-write-gate-lab — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-07-verify-write-gate-lab.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-07-verify-write-gate-lab.md)  
> **Status:** P3/P5 Done · gate **BLOCK** · `2026-10-18T14:00:35Z` · tip active  
> **Package:** `pkg-000165` · component-thread · REQ-22 FR-22.4  
> **ui_scope:** `thread-mount` / `feed-lab` · **mixed** · Path A OP-UX-MIRROR §4.3 V-A…V-F · M157 · Partial visual=**BLOCK**  
> **Skill declared:** `react-expert`  
> **Depends:** CT-04 structure Present  
> **Runtime:** P5 APPLY Done · TASKED=0 · activation none · Await **P8**

## Purpose

Lab VerifyWriteGate: known unverified write blocked · stub handoff to existing `/verify` · verified return restores draft without auto-post · cancel/fail/stale/unknown honesty · Read/React/Share remain usable — no invent Identity methods.

## Acceptance Criteria

See backlog story AC checklist (SSOT). Pipeline does not fork AC text.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-07-t01-verify-gate-ui](task-spa-ct-07-t01-verify-gate-ui/README.md) | Greenfield VerifyWriteGate chrome | Done |
| T02 | [task-spa-ct-07-t02-capability-wire](task-spa-ct-07-t02-capability-wire/README.md) | writeCapability drives gate vs composer | Done |
| T03 | [task-spa-ct-07-t03-stub-handoff](task-spa-ct-07-t03-stub-handoff/README.md) | CTA → stub `/verify` · draft keys | Done |
| T04 | [task-spa-ct-07-t04-no-autopost](task-spa-ct-07-t04-no-autopost/README.md) | Verified restores intent · manual Post | Done |
| T05 | [task-spa-ct-07-t05-vitest-gate](task-spa-ct-07-t05-vitest-gate/README.md) | Vitest · Path A + gate | Done |

## Out of scope

Real eID/phone · redesign `/verify` · invent Identity fields · auto-post · invent OP PASS

## @mockup handoff

- Mirror: [OP-UX-MIRROR §4.3 V-A…V-F](../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)
- Artboard: [M157](../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md)
- Verify: `#/lab/thread` gate stands · OP eye · Partial=**BLOCK**
- Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-07-verify-write-gate-lab.md) · **BLOCK**
- NO STORY-UX-MOCKUP-BRIEF
