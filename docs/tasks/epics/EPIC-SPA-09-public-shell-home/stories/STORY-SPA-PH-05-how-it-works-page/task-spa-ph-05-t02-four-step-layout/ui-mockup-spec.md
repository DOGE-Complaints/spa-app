# UI mockup spec — STORY-SPA-PH-05 How It Works (Path A)

**Path:** A (`@mockup` SSOT on disk — human AskQuestion gate skipped)  
**Anchor task:** `task-spa-ph-05-t02-four-step-layout`  
**ui_anchor:** true  
**Package:** `pkg-000050`  
**UTC:** 2026-08-04T13:15:54Z

## Source mockups

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix.md
@mockup: spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-localized-copy-appendix-estonia.png
```

Page artboard PNG is not on disk; Path A uses md SSOT + L10N appendix (+ estonia companion PNG).

## Target (M133 / PH-T)

| State | Code | Condition | UI |
|-------|------|-----------|-----|
| A | PH-T-A | Default tutorial page | Intro + exactly 4 steps + CTA row; M129/M131 chrome; no marketing hero |

## Hard rules

- Exactly four steps in fixed order (civic → dashboard → story → GPT submit).
- Dashboard CTA / step-2 inline → internal `/board`.
- Submit CTA → `VITE_STORY_GPT_URL` external; handoff explicit in a11y.
- L10N: `howItWorks.*` from appendix; do not duplicate chrome under wrong namespace.
- Untranslated: `DOGEstonia GPT`, `/board`.
- Out of scope: CMS; marketing/campaign/rewards; in-app compose.

## Baseline (UI-0)

See `ui-baseline/pre-implement/` — stub page before M133 content.

## Verify (UI-3)

See `ui-baseline/post-implement/` state `a-` + story-root `screenshots/full-cycle/`.
