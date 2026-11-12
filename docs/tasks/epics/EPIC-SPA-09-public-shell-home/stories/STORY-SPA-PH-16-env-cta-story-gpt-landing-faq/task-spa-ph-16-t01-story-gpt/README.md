# SPA-PH-16-T01 — Wire HIW interview CTA → storyGpt helper

**Status:** Done  
**Closed:** `2026-10-24T10:03:43Z`  
 
**Story:** [`../STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md`](../STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md)  
**Decision Ref:** [`../../../../../backlog-stories/public-home/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md`](../../../../../backlog-stories/public-home/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md)  
**ui_scope:** how-it-works / public-home · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T09:58:33Z`  
**Package:** `pkg-000222`  
**Path A:** arch Present · Interview M2·M3 · p13UxReady

## Purpose

FR-PH-16.1 · 16.3: HIW step-02 «Start interview…» CTA href → `VITE_STORY_GPT_URL` via `getStoryGptHref` / `hasStoryGptUrl` (Header/PH-06 pattern). Supersede `getTelegramInterviewHref()` for **this** button only. Empty → `#`.

## Code Facts (verify)

- AS-IS: `HowItWorksPage.jsx` uses `getTelegramInterviewHref` / `hasTelegramInterviewUrl` for `data-testid="how-it-works-cta-telegram"`
- Present: `spa-app/src/config/storyGptUrl.js` · `getStoryGptHref` · `hasStoryGptUrl` · calm `#`
- Target: wire interview CTA to storyGpt helpers · **no invent GPT URL**

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent GPT URL** · Contact CTA PH-17 OOS · invent Telegram handle OOS

## AC / DoD

- [x] Interview CTA reads `VITE_STORY_GPT_URL` (structure)
- [x] Empty env → `#` honesty (`external` + `target=_self` so Link does not rewrite `#`)
- [x] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where changed

P3 `2026-10-24T10:03:43Z` · `HowItWorksPage.jsx` → `getStoryGptHref` / `hasStoryGptUrl`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "getStoryGptHref|getTelegramInterviewHref|how-it-works-cta-telegram" spa-app/src/pages/HowItWorksPage.jsx
```

## @mockup

```text
@mockup: spa-app/docs/architecture/public-home/16-env-cta-story-gpt-landing-faq.md
```
