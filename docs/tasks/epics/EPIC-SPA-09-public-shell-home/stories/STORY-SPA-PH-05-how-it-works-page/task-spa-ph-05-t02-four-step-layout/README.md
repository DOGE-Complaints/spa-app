# SPA-PH-05-T02 — Four-step layout M133

**Status:** Done — P3 2026-08-04T13:22:05Z
**Story:** [`../STORY-SPA-PH-05-how-it-works-page.md`](../STORY-SPA-PH-05-how-it-works-page.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md) FR-PH-05.2  
**Depends on:** T01  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T13:09:56Z  
**Package:** `pkg-000050`

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md
```

## Purpose
Replace stub with M133 tutorial structure: intro + **exactly four** steps in fixed order (civic issues → dashboard → useful story → GPT submit). Not marketing landing / onboarding wizard. Path A UI anchor for PH-05.

## Risk
Wrong step count/order; status-column board language; inventing copy not in appendix; Path B without human gate.

## Code Facts (re-verify at execute)
- Stub page: [`HowItWorksPage.jsx`](../../../../../../../src/pages/HowItWorksPage.jsx).
- M133 SSOT on disk: `docs/UX/mockups/home/mockup-133-…-page-state-sheet-spec.md` + L10N appendix. **No** page artboard `.png` on disk — Path A uses md SSOT; do **not** create `STORY-UX-MOCKUP-BRIEF` while `*-spec.md` exists.
- Copy keys: backlog / appendix `howItWorks.*` (wired in T05; layout may use keys early if T05 lands same wave).

## AC / DoD
- [x] (P0) Exactly four steps; order identical structure for en/et/ru (FR-PH-05.2) → backlog AC #2.
- [x] (P0) No status-column / kanban board language on this page.
- [x] (P0) No marketing/campaign/rewards fluff (AC #5).
- [x] (P0) UI Path A: `@mockup` M133 md + appendix on this **ui_anchor** task.

## Where to change
- `spa-app/src/pages/HowItWorksPage.jsx` (+ CSS as needed)

## Out of scope
CTA wiring targets (T03); icon assets (T04); full FLAT_KEYS parity (T05); CMS.

## Verification
```bash
rg -n 'how-it-works-stub|howItWorks\.steps' spa-app/src/pages/HowItWorksPage.jsx
cd spa-app && npm test -- --run HowItWorks
```
