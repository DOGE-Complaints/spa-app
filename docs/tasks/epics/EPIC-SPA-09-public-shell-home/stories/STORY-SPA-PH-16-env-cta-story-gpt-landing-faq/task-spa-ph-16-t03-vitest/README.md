# SPA-PH-16-T03 — Markers / stubEnv Vitest

**Status:** Done  
**Closed:** `2026-10-24T10:03:43Z`  
 
**Story:** [`../STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md`](../STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md)  
**ui_scope:** how-it-works / public-home · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T09:58:33Z`  
**Package:** `pkg-000222`  
**Path A:** arch Present · Interview M2·M3

## Purpose

FR-PH-16.4: Vitest markers / `vi.stubEnv` for interview + FAQ CTAs · empty → `#` · **no invent URL values** · OP eye Absent → Partial=**BLOCK**.

## Code Facts (verify)

- AS-IS: `spa-app/src/pages/__tests__/HowItWorksPage.test.jsx` asserts `HOW_IT_WORKS_LANDING_FAQ_HREF` · `getTelegramInterviewHref`
- Present: Header tests stub `VITE_STORY_GPT_URL` (`Header.publicNav.test.jsx`)
- Target: update / add asserts for storyGpt + landing FAQ env helpers · no invent PASS

## Constraints

- Path A · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent GPT / FAQ URL** in fixtures beyond stubEnv test hosts

## AC / DoD

- [x] Vitest green for env CTA markers
- [x] OP eye Absent → gate **BLOCK** (validator does not invent PASS)

## Where changed

P3 `2026-10-24T10:03:43Z` · HowItWorksPage.test · landingFaqUrl.test · ph06SubmitNoHardcode

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/HowItWorksPage.test.jsx
```

## @mockup

```text
@mockup: spa-app/docs/architecture/public-home/16-env-cta-story-gpt-landing-faq.md
```
