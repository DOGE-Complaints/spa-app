# SPA-NS-15-T03 — Footer dual · no text beside

**Status:** Done  
**Story:** [`../STORY-SPA-NS-15-brand-op-light-png-footer-dual.md`](../STORY-SPA-NS-15-brand-op-light-png-footer-dual.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-15-brand-op-light-png-footer-dual.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-15-brand-op-light-png-footer-dual.md)  
**ui_scope:** next-shell / brand · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T09:00:58Z`  
**Package:** `pkg-000220`  
**Path A:** tip masters Present · copy only · Interview M1·M4·M5 · p13UxReady

## Purpose

FR-NS-15.2 · 15.3: Footer light+dark tip family · no adjacent text/tagline · not logo-big dark.

## Code Facts (verify)

- AS-IS: Header/PublicFooter · soft NS-14 · tip shelf `m169-brand-source/dogestonia-brand-{light,dark}.png` Present  
- Target: promote + wire · no invent PNG

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent PNG** · no invent OP PASS · no invent mascot · invent CDN OOS · NS-16 OOS

## AC / DoD

- [x] Structure Present (P3 `2026-10-24T09:40:52Z`)  
- [x] Visual gate **BLOCK** (OP eye Absent · Partial · no invent PASS)

## Where changed

src/components/PublicFooter/PublicFooter.jsx · PublicFooter.css · no adjacent text · dual PNG

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "dogestonia-brand|logo-big|PublicFooter|Header" spa-app/src spa-app/public/assets 2>/dev/null | head -40
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/m169-brand-source/
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.md
```
