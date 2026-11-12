# STORY-SPA-PH-16-env-cta-story-gpt-landing-faq — pipeline mirror

> **Epic:** [EPIC-SPA-09-public-shell-home](../../EPIC-SPA-09-public-shell-home.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md)  
> **Status:** P8 Done · T01–T03 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-24T10:08:24Z` · `pkg-000222` closed · `activation: none` · NO PUSH  
> **Package:** `pkg-000222` · public-home · Interview **M2·M3** · wave `OP-spa nf25-wave5-20261024`  
> **ui_scope:** how-it-works / public-home · **mixed** · Path A arch Present · Partial visual=**BLOCK** · NO BRIEF · no invent GPT URL / PASS  
> **Skill declared:** `react-expert`  
> **Depends:** PH-14 Present · `storyGptUrl.js` Present · tip after `pkg-000221`  
> **Runtime:** P5 Done · [disposition](../../../../run-reports/p5-disposition-STORY-SPA-PH-16-2026-10-24.md) · P6 skipped · Await **P8** · CAPTURE-META `fails: []` · OP eye Absent → gate **BLOCK**

## Purpose

HIW CTAs from env: interview → `VITE_STORY_GPT_URL` · Concept FAQ → `VITE_LANDING_FAQ_URL` · empty → `#` · Vitest · OP eye — no invent PASS / URL values.

## L1 — FR (backlog verbatim)

- **FR-PH-16.1** HIW «Start interview…» / Telegram-step CTA href → **`VITE_STORY_GPT_URL`** (same helper pattern as Header) · supersede `getTelegramInterviewHref()` for **this** button.  
- **FR-PH-16.2** «Concept & FAQ on landing» href → **`VITE_LANDING_FAQ_URL`** from env · remove hardcoded `HOW_IT_WORKS_LANDING_FAQ_HREF` as sole SSOT.  
- **FR-PH-16.3** Empty env → calm `#` honesty (Header/PH-06 pattern) · document keys in `.env.example`.  
- **FR-PH-16.4** Vitest · OP eye — no invent PASS · no invent URL values.

## Acceptance Criteria (backlog verbatim)

- [x] Interview CTA reads `VITE_STORY_GPT_URL` (structure)  
- [x] Concept FAQ reads `VITE_LANDING_FAQ_URL` (structure · empty→`#`)  
- [x] Vitest · OP eye Absent → **BLOCK**  

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-PH-16-env-cta-story-gpt-landing-faq.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ph-16-t01-story-gpt](task-spa-ph-16-t01-story-gpt/README.md) | Wire HIW interview CTA → storyGpt helper | **Done** |
| T02 | [task-spa-ph-16-t02-landing-faq](task-spa-ph-16-t02-landing-faq/README.md) | Env helper + replace hardcoded FAQ | **Done** |
| T03 | [task-spa-ph-16-t03-vitest](task-spa-ph-16-t03-vitest/README.md) | Markers / stubEnv | **Done** |

**Order:** t01 ‖ t02 → t03

## Out of scope (backlog verbatim)

Contact CTA (PH-17) · invent Telegram handle · invent landing host

## @mockup handoff

```text
@mockup: spa-app/docs/architecture/public-home/16-env-cta-story-gpt-landing-faq.md
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md
```

Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
Shots: [visual-checklists](./visual-checklists-env-cta-story-gpt-landing-faq.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/)
