# SPA-NS-14-T01 — Clean transparent PNG masters

**Status:** **BLOCK** soft  
**Note:** P3 `2026-10-23T14:30:20Z` · M169 brand masters still **Absent** · no invent art/PNG  
**Story:** [`../STORY-SPA-NS-14-brand-png-dual-theme.md`](../STORY-SPA-NS-14-brand-png-dual-theme.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-14-brand-png-dual-theme.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-14-brand-png-dual-theme.md)  
**ui_scope:** `shell` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T14:25:07Z`  
**Package:** `pkg-000216`  
**Path A:** M169 · Interview L2 · p13UxReady

## Purpose

FR-NS-14.1: Install clean transparent PNG light+dark masters under `public/assets/` (M169 §8–10 — not artboard crop).

## Code Facts (verify)

- AS-IS: M169 tip Present · `dogestonia-brand-light.png` / `dogestonia-brand-dark.png` **Absent**  
- Existing horizontal PNG/SVG **not** approved M169 production masters  
- P3: soft BLOCK held · no invent / no promote artboard crop

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent** art/PNG masters · no crop artboard as master · no invent OP PASS

## AC / DoD

- [ ] Masters Present on disk (soft BLOCK until OP delivers clean exports)
- [x] Visual Done not claimed · gate **BLOCK** (asset + OP eye)

## Where changed

_(none — masters Absent)_

## Verification

```bash
ls spa-app/public/assets/dogestonia-brand-*.png 2>&1
# expect: no matches / Absent
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/home/DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.md
```
