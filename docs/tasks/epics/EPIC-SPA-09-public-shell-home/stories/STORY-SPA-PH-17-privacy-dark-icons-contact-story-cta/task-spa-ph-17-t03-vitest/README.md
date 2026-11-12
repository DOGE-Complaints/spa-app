# SPA-PH-17-T03 — Markers Vitest

**Status:** Done  
**Closed:** `2026-10-24T10:13:01Z`  

**Story:** [`../STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md`](../STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md)  
**ui_scope:** static-pages / public-home · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:09:06Z`  
**Package:** `pkg-000223`  
**Path A:** arch Present · Interview M6·M7

## Purpose

FR-PH-17.4: Vitest markers for dark privacy icon affordance + Contact CTA env href · OP eye Absent → Partial=**BLOCK** · no invent PASS.

## Code Facts (verify)

- AS-IS: `StaticPublicPage.test.jsx` (PH-15)
- Target: assert Contact CTA / privacy dark markers · stubEnv for story GPT when needed

## Constraints

- Path A · Partial=**BLOCK**  
- **no invent OP PASS** · no invent GPT URL / RU-ET

## AC / DoD

- [ ] Vitest green for PH-17 markers
- [ ] OP eye Absent → gate **BLOCK**

## Where to change

`spa-app/src/pages/__tests__/StaticPublicPage.test.jsx` (or sibling)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/StaticPublicPage.test.jsx
```

## @mockup

```text
@mockup: spa-app/docs/architecture/public-home/17-privacy-dark-icons-contact-story-cta.md
```
