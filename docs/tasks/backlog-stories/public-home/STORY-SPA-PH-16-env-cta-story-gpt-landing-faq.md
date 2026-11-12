# STORY-SPA-PH-16 — HIW CTAs from env (Story GPT + Landing FAQ)

## Meta

- **Key:** `STORY-SPA-PH-16-env-cta-story-gpt-landing-faq`
- **Package:** [public-home](INDEX.md)
- **Status:** **P8 Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000222` closed · `activation: none` · NO PUSH · soft [wave5 intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md)  
- **Interview:** [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M2·M3**
- **Depends on:** PH-14 Present · `storyGptUrl.js` Present  
- **Code home:** `HowItWorksPage.jsx` · `howItWorksDictionary.js` · soft `.env` / `.env.example`  
- **L1.5:** [arch](../../../architecture/public-home/16-env-cta-story-gpt-landing-faq.md)

## L1 — FR

- **FR-PH-16.1** HIW «Start interview…» / Telegram-step CTA href → **`VITE_STORY_GPT_URL`** (same helper pattern as Header) · supersede `getTelegramInterviewHref()` for **this** button.  
- **FR-PH-16.2** «Concept & FAQ on landing» href → **`VITE_LANDING_FAQ_URL`** from env · remove hardcoded `HOW_IT_WORKS_LANDING_FAQ_HREF` as sole SSOT.  
- **FR-PH-16.3** Empty env → calm `#` honesty (Header/PH-06 pattern) · document keys in `.env.example`.  
- **FR-PH-16.4** Vitest · OP eye — no invent PASS · no invent URL values.

## OOS

Contact CTA (PH-17) · invent Telegram handle · invent landing host

## AC

- [x] Interview CTA reads `VITE_STORY_GPT_URL` (structure)  
- [x] Concept FAQ reads `VITE_LANDING_FAQ_URL` (structure · empty→`#`)  
- [x] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ph-16-t01-story-gpt` | Done | Wire HIW interview CTA → storyGpt helper | 16.1 · 16.3 |
| `task-spa-ph-16-t02-landing-faq` | Done | Env helper + replace hardcoded FAQ | 16.2 · 16.3 |
| `task-spa-ph-16-t03-vitest` | Done | Markers / stubEnv | 16.4 |

### Order

`t01` ‖ `t02` → `t03` · skill `react-expert`
