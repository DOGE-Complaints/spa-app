# SPA-NF-23-T04 — Route tests

**Status:** Done  
**Story:** [`../STORY-SPA-NF-23-board-deprecate-redirect.md`](../STORY-SPA-NF-23-board-deprecate-redirect.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md)  
**ui_scope:** `feed` / routes · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:23:16Z`  
**Package:** `pkg-000206`  
**Path A:** Interview B11 · ARCH-DELTA §11 · p13UxReady

## Purpose

FR-NF-23.5: Vitest for `/board` → `/next/feed` replace · soft CTA asserts · Path A capture at P3 · OP eye not invent PASS.

## Code Facts (verify)

- AS-IS: `App.ns06DefaultEntry.test.jsx` keeps `/board` reachable
- Target: nf23 route tests · update NS-06 board assertion · soft Path A shots

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN

## AC / DoD

- [x] Vitest green for NF-23 route claims (`App.nf23BoardRedirect` 3/3 · NS-06 · Header · HowItWorks)
- [x] Visual Done not claimed without OP eye · Path A CAPTURE-META `fails: []` · gate **BLOCK**

## Where changed

`pages/__tests__/*` · soft `*.nf23.test.jsx` · soft capture script

## Verification

```bash
cd spa-app && npm test -- --run src/pages/__tests__/App
```
