# SPA-NS-18-T02 — AccountSummary mobile rows

**Status:** Done · BLOCK  
**Closed:** `2026-10-25T10:21:22Z` (P3 · OP eye Absent → Partial visual BLOCK)  


**Story:** [`../STORY-SPA-NS-18-profile-mobile-layout.md`](../STORY-SPA-NS-18-profile-mobile-layout.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-18-profile-mobile-layout.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-18-profile-mobile-layout.md)  
**ui_scope:** next-shell / profile · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-25T10:16:00Z`  
**Package:** `pkg-000231`  
**Path A:** M178 · Interview M3 · soft CAB-08

## Purpose

FR-NS-18.1: `/profile` Account (email · created) readable as normal rows — no vertical character column.

## Code Facts (verify)

- AS-IS: `AccountSummary` · `UserCabinetPage` may crush fields on narrow width
- Target: normal label/value rows · natural wrap · theme parity · no invent fields/APIs

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK** · no invent PNG  
- **no invent OP PASS** · CAB-08 wallet/contrib **gated** · burger drawer OOS

## AC / DoD

- [x] Account rows Present (email · created readable)
- [x] No vertical character column
- [x] Visual Done not claimed without OP eye → gate **BLOCK**

## Where to change

`spa-app/src/` · `AccountSummary` · soft `UserCabinetPage`

## Verification

```bash
rg -n "AccountSummary|UserCabinetPage|email|created" spa-app/src -g '*.{jsx,css}' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/18-profile-mobile-layout.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M178-profile-mobile-layout-spec-v1.0.md
```
