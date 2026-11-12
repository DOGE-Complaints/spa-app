# SPA-CR-26-T03 — Vitest markers · OP eye

**Status:** Done  
**Closed:** `2026-10-24T10:24:13Z`  
 

**Story:** [`../STORY-SPA-CR-26-own-react-empty-harmony.md`](../STORY-SPA-CR-26-own-react-empty-harmony.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-26-own-react-empty-harmony.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-26-own-react-empty-harmony.md)  
**ui_scope:** reactions-mount / next-feed · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:18:37Z`  
**Package:** `pkg-000224`  
**Path A:** M173 · Interview M9 · Partial=**BLOCK**

## Purpose

FR-CR-26.3: Light + dark · Vitest markers for empty/filled harmony · OP eye — **no invent PASS**.

## Code Facts (verify)

- AS-IS: feed/reactions-mount tests Present (CR-24/25)
- Target: CR-26 markers · Path A capture soft · OP eye Absent → Partial=**BLOCK**

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · no invent glyph catalog

## AC / DoD

- [x] Vitest markers Present — `reactionsMount.cr26` + `feed.cr26`
- [x] OP eye Absent → gate **BLOCK** · no invent PASS

## Where to change

`spa-app/src/features/feed/__tests__/` · soft capture script under `spa-app/scripts/`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed/__tests__/
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-reactions/26-own-react-empty-harmony.md
```
