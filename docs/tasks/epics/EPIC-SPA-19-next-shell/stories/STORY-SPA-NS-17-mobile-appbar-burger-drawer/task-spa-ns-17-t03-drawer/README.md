# SPA-NS-17-T03 — Drawer sections + CTA

**Status:** Done · BLOCK  
**Closed:** `2026-10-25T10:06:18Z` (P3 · OP eye Absent → Partial visual BLOCK)  


**Story:** [`../STORY-SPA-NS-17-mobile-appbar-burger-drawer.md`](../STORY-SPA-NS-17-mobile-appbar-burger-drawer.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md)  
**ui_scope:** next-shell / MobileAppBar · **mixed**  
**ui_anchor:** false  
**extends ui-mockup:** `../ui-mockup-spec.md`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-25T10:00:29Z`  
**Package:** `pkg-000230`  
**Path A:** M177 · Interview M1 · soft Header drawer

## Purpose

FR-NS-17.2: Drawer IA — Account · Feed · My stories · static pages (How it works · About · Privacy · Contact) · Submit story CTA via existing `VITE_STORY_GPT_URL` helper · **no invent Wallet**.

## Code Facts (verify)

- AS-IS: soft `Header.jsx` drawer pattern · `ProfileRail` soft · PH static routes Present
- Target: working mobile drawer sections · reuse existing routes/helpers · no invent routes

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent Wallet** · no invent routes · Filters/profile-card OOS

## AC / DoD

- [x] Drawer sections Present
- [x] Submit CTA wired (existing helper)
- [x] Wallet absent from drawer
- [x] Visual Done not claimed without OP eye → gate **BLOCK**

## Where to change

`MobileAppBar` drawer · soft Header drawer reuse · soft ProfileRail links

## Verification

```bash
rg -n "drawer|VITE_STORY_GPT|Wallet|How it works|Privacy" spa-app/src -g '*.jsx' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/17-mobile-appbar-burger-drawer.md
@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md
```
