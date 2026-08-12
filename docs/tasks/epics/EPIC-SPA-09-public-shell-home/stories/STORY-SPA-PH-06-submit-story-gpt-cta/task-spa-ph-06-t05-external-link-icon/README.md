# SPA-PH-06-T05 — Optional ic-external-link

**Status:** Done — P3 2026-08-05T10:31:01Z  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) FR-PH-06.4 · icon catalog #3  
**Depends on:** T02 (and ideally T03/T04 surfaces)  
**ui_scope:** `mixed`  
**ui_anchor:** false · extends T02  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-05T10:15:57Z  
**Package:** `pkg-000051`

**UI gate:**
- `@mockup: spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md` (external affordance)
- Path: `/icons/public-home/ic-external-link.png` (catalog NEW #3)

## Purpose
Wire optional external-link icon on Submit affordances using catalog path. Placeholder PNG is **non-blocking** (icon-asset: placeholder-ok).

## Risk
Blocking story on final art; inventing new icon filenames.

## Code Facts (re-verify at execute)
- File exists: `spa-app/public/icons/public-home/ic-external-link.png` (PH-05 already referenced on HowItWorks Submit).
- Catalog: [STORY-SPA-PH-icon-assets.md](../../../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md) #3.

## AC / DoD
- [x] (P0) Catalog path wired where Submit external affordance is shown → FR-PH-06.4; AC #4.
- [x] (P1) Missing/placeholder PNG does not fail tests or layout.
- [x] (P0) api-req §3.3 linked in gate notes (T07).

## Where to change
- Header / HowItWorks / Board Submit markup (as applicable after T02–T04)
- Icon path only under `/icons/public-home/`

## Out of scope
Generating final PNG art. New icon names.

## Verification
```bash
ls spa-app/public/icons/public-home/ic-external-link.png
rg -n "ic-external-link" spa-app/src
```
