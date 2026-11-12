# SPA-NS-10-T04 — Vitest markers · home href

**Status:** Done  
**Done:** `2026-10-22T13:32:42Z`  
**Note:** P3 · Header.ns10 **3/3** · AppShell **28/28** · home `/next/feed` · Path A fails:[]  
**Story:** [`../STORY-SPA-NS-10-header-logo-light-scale.md`](../STORY-SPA-NS-10-header-logo-light-scale.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T13:22:37Z`  
**Package:** `pkg-000203`  
**Path A:** M165 · Interview H8

## Purpose

FR-NS-10.5: Markers · brand home `/next/feed` · Path A capture at P3 · OP eye not invent PASS.

## Code Facts (verify)

- TO-BE: `Header.ns10.test.jsx` · `data-ns10` · light/dark SVG · href `/next/feed` · ns02/publicNav updated

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no crop PNG as master

## AC / DoD

- [x] Vitest green for NS-10 claims
- [x] Brand href `/next/feed`
- [ ] Visual Done not claimed without OP eye

## Where changed

`Header.ns10.test.jsx` · `Header.ns02Chrome.test.jsx` · `Header.publicNav.test.jsx` · soft `scripts/tmp-ns10-capture.mjs`

## Verification

```bash
cd spa-app && npm test -- --run src/components/AppShell
```
