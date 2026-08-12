# UI Mockup Spec — M128 Story Draft Handoff (Path A)

**Story:** STORY-SPA-ID-12  
**Anchor task:** SPA-ID-12-T08  
**Mockup SSOT:** [`mockup-128-story-draft-handoff-submit-state-sheet-spec.md`](../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.md)  
**Mockup image:** [`mockup-128-story-draft-handoff-submit-state-sheet-spec.png`](../../../../UX/mockups/epic-04/mockup-128-story-draft-handoff-submit-state-sheet-spec.png)  
**Icon catalog:** [`STORY-SPA-ID-12-icon-assets.md`](../../../../backlog-stories/identity-auth/STORY-SPA-ID-12-icon-assets.md)  
**Human gate:** Path A — validated M128 2026-07-04 (operator accepted at scaffold)

## Route

`/story/submit` (HashRouter: `/#/story/submit`)

## States (M128)

| State | Phase key | `dev_handoff_phase` | `data-testid` | Icon |
|-------|-----------|---------------------|---------------|------|
| A | Resolving | `resolving` | `story-handoff-resolving` | `ic-spinner.png` |
| B | Login required | `login_required` | `story-handoff-login` | `ic-lock.png` |
| C | Preview | `preview` | `story-handoff-preview` | `ic-info.png` + field icons |
| D | Verify | `verify` | `story-handoff-verify` | `ic-verify-shield.png` |
| E | Submitting | `submitting` | `story-handoff-submitting` | `ic-spinner.png` |
| F | Submitted | `submitted` | `story-handoff-success` | `ic-success-check.png` |
| G | Expired | `expired` | `story-handoff-expired` | `ic-clock-expired.png` |
| H | Service down | `service_down` | `story-handoff-service-down` | `ic-cloud-error.png` |
| E0 | Empty | `empty` | `story-handoff-empty` | `ic-doc-new.png` |

## Viewport

1536×1024 (desktop)

## Screenshot naming

`{state-letter}-{slug}-m128-1536x1024.png` in `ui-baseline/{pre-implement|post-implement}/`

## Implementation refs

- Page: `spa-app/src/pages/StorySubmitPage.jsx`
- Panels: `spa-app/src/components/StoryHandoff/`
- Puppeteer: `spa-app/tests/puppeteer/story-handoff-m128-screenshot.mjs`
