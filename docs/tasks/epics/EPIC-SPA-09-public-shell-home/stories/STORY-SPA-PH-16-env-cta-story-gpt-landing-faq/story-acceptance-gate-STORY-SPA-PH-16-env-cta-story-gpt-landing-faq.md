# Story acceptance gate — STORY-SPA-PH-16-env-cta-story-gpt-landing-faq

- **Story:** HIW CTAs from env (Story GPT + Landing FAQ)
- **Package:** `pkg-000222-20261024-epic-spa-09-ph-16-env-cta-story-gpt-landing-faq.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-24T10:03:43Z
- **Note:** P3 Execute Done · T01–T03 **Done** · interview→`VITE_STORY_GPT_URL` · FAQ→`VITE_LANDING_FAQ_URL` · empty FAQ→`#` · CAPTURE-META `fails: []` · HowItWorks **8/8** · landingFaq **2/2** · OP eye **Absent** · Partial visual=**BLOCK** · **no invent GPT URL / OP PASS** · Await **P4**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Interview CTA reads `VITE_STORY_GPT_URL` | Structure Present | `getStoryGptHref` · probe interviewHref from env · shot 01 · md5 `964c238da614` |
| Concept FAQ reads `VITE_LANDING_FAQ_URL` | Structure Present | `getLandingFaqHref` · empty→`#` · shot 02 · md5 `3cf1470454bf` |
| Vitest · OP eye | Vitest Present · visual **BLOCK** | HowItWorksPage **8/8** · landingFaqUrl **2/2** · OP eye Absent → Partial=**BLOCK** |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/pages/__tests__/HowItWorksPage.test.jsx src/config/__tests__/landingFaqUrl.test.js
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" PH16_BASE=http://127.0.0.1:5173 node scripts/tmp-ph16-capture.mjs
```

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
