# UI mockup spec — SPA-ID-14-T05 (Path A)

**Source:** `@mockup` M135 (human gate waived — Path A)  
**PNG:** `spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet.png`  
**Spec:** `spa-app/docs/UX/mockups/epic-04/mockup-135-story-submit-post-submit-path-choice-state-sheet-spec.md`  
**Related ancestor:** M128 State F (do not regenerate)  
**Route:** `/#/story/submit`  
**Primary state:** F — Story Submitted (post HTTP 202)

## Product rule

Successful submission does **not** auto-navigate. User chooses Board · My Stories · Submit Another.

## Target layout (State F)

1. Success icon (`ic-success-check`)
2. Title — `storyHandoff.success.title`
3. Message — `storyHandoff.success.message`
4. Runtime chrome — `storyHandoff.success.noAutoRedirect` (M135 §14)
5. Submission ID + a11y copy control (`copySubmissionId` / `copied`)
6. Status — Under Review
7. CTA stack:
   - Primary — Go To Board → `/board` · leading `ic-go-to-board`
   - Secondary — My Stories → `/profile` · leading `ic-my-stories`
   - Tertiary — Submit Another → `VITE_STORY_GPT_URL` · trailing `ic-external-link` · hint `submitAnotherHint`

## Capture states (UI-0 / UI-3)

| State | Slug | Hook |
|-------|------|------|
| F desktop | `f-submitted-m135` | `dev_handoff_phase=submitted` · 1536×1024 |
| F narrow | `f-narrow-submitted-m135` | same · 390×844 |
| E submitting | `e-submitting-m135` | `dev_handoff_phase=submitting` |
| E0 empty | `e0-empty-m135` | `dev_handoff_phase=empty` |

## Out of scope

Profile consume `submittedStoryId`; reopen BUG-01; regenerate M128.
