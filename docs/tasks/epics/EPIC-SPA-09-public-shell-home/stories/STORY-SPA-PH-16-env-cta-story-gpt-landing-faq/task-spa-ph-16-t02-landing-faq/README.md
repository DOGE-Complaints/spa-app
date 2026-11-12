# SPA-PH-16-T02 — Env helper + replace hardcoded FAQ

**Status:** Done  
**Closed:** `2026-10-24T10:03:43Z`  
 
**Story:** [`../STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md`](../STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md)  
**ui_scope:** how-it-works / public-home · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T09:58:33Z`  
**Package:** `pkg-000222`  
**Path A:** arch Present · Interview M2·M3 · p13UxReady

## Purpose

FR-PH-16.2 · 16.3: «Concept & FAQ on landing» href → `VITE_LANDING_FAQ_URL` via env helper (same `getVitePublicUrl` pattern as `storyGptUrl.js`). Remove hardcoded `HOW_IT_WORKS_LANDING_FAQ_HREF` as sole SSOT. Empty → `#`. Document key in `.env.example`.

## Code Facts (verify)

- AS-IS: `HOW_IT_WORKS_LANDING_FAQ_HREF` in `howItWorksDictionary.js` · used by `HowItWorksPage.jsx` `data-testid="how-it-works-cta-landing"`
- Present: `getVitePublicUrl` in `spa-app/src/config/publicEnv.js` · `VITE_STORY_GPT_URL` in `.env.example`
- Absent: `VITE_LANDING_FAQ_URL` helper / `.env.example` key
- Target: landing FAQ helper · wire page · document env · **no invent landing host**

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent landing host / FAQ URL** · PH-17 OOS

## AC / DoD

- [x] Concept FAQ reads `VITE_LANDING_FAQ_URL` (structure)
- [x] Empty env → `#` · `.env.example` documents key
- [x] Visual Done not claimed without OP eye

## Where changed

P3 `2026-10-24T10:03:43Z` · `landingFaqUrl.js` · `HowItWorksPage.jsx` · removed `HOW_IT_WORKS_LANDING_FAQ_HREF` · `.env.example`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "VITE_LANDING_FAQ_URL|HOW_IT_WORKS_LANDING_FAQ_HREF|landingFaq" spa-app/src spa-app/.env.example | head -40
```

## @mockup

```text
@mockup: spa-app/docs/architecture/public-home/16-env-cta-story-gpt-landing-faq.md
```
