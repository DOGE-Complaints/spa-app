# SPA-NS-14-T03 — Wire footer · drop tagline

**Status:** Done (tagline drop only)  
**Done:** `2026-10-23T14:30:20Z`  
**Note:** Tagline omitted · footer mark still legacy `logo-big.png` until T01 masters · no invent PNG  
**Story:** [`../STORY-SPA-NS-14-brand-png-dual-theme.md`](../STORY-SPA-NS-14-brand-png-dual-theme.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-14-brand-png-dual-theme.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-14-brand-png-dual-theme.md)  
**ui_scope:** `shell` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T14:25:07Z`  
**Package:** `pkg-000216`  
**Path A:** M169 · Interview L2 · p13UxReady

## Purpose

FR-NS-14.3 · 14.4: **no** tagline beside brand · soft hide from rendered UI. Same-family PNG wire awaits T01.

## Code Facts (verify)

- **Done:** `data-ns14=no-tagline` · `public-footer-tagline` Absent  
- Soft: footer logo still `DOGEstonia-logo-big.png` until clean dual masters

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK** · no invent OP PASS / art/PNG

## AC / DoD

- [x] Tagline Absent from UI  
- [ ] Footer dual PNG family after T01  
- [x] Visual Done not claimed · OP eye Absent → gate **BLOCK**

## Where changed

`PublicFooter.jsx` — omit tagline span · `data-ns14=no-tagline`

## Verification

```bash
rg -n "public-footer-tagline|data-ns14" spa-app/src/components/PublicFooter/PublicFooter.jsx
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.md
```
