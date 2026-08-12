# Identity & Auth — backlog package

EPIC mirror: `EPIC-SPA-04` · Deep dive: [README.md](README.md)

| Wave | Story | Status | Depends |
|------|-------|--------|---------|
| 1 | [ID-01 — Web authentication](STORY-SPA-ID-01-web-authentication.md) | Done (pkg-000013) | — |
| 1 | [ID-02 — Session shell states](STORY-SPA-ID-02-session-shell-states.md) | Done (pkg-000016) | ID-01 |
| 1 | [ID-03 — Civic status component](STORY-SPA-ID-03-civic-status-component.md) | Done (pkg-000017) | — |
| 2 | [ID-04 — Phone verification flow](STORY-SPA-ID-04-phone-verification-flow.md) | Done (pkg-000018) | ID-03 |
| 2 | [ID-05 — Verification error states](STORY-SPA-ID-05-verification-error-states.md) | Done (pkg-000019) | ID-04 |
| 3 | [ID-06 — Protected action gate](STORY-SPA-ID-06-protected-action-gate.md) | Done (pkg-000021) | ID-04 |
| 3 | [ID-07 — Country waitlist](STORY-SPA-ID-07-country-waitlist.md) | Done (pkg-000022) | ID-05 |
| 3 | [ID-09 — Identity UI localization](STORY-SPA-ID-09-identity-ui-localization.md) | Done (pkg-000020) | ID-01…05 |
| 3 | [ID-10 — Country selector + waitlist routing](STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md) | Done (pkg-000023) | ID-07 |
| 3 | [ID-11 — Per-country phone format](STORY-SPA-ID-11-per-country-phone-format-validation.md) | Done (pkg-000024) | ID-10 |
| 4 | [ID-08 — GPT verification entry](STORY-SPA-ID-08-gpt-verification-entry.md) | Done (pkg-000025) | ID-04, ID-05 |
| 4 | [ID-12 — Story draft handoff submit](STORY-SPA-ID-12-story-draft-handoff-submit.md) | Done (pkg-000026) | ID-08, ID-06 |
| 4+ | [ID-14 — Post-submit path choice](STORY-SPA-ID-14-post-submit-path-choice.md) · [UX prompt](STORY-SPA-ID-14-ux-artboard-prompt.md) · [pipeline](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-14-post-submit-path-choice/STORY-SPA-ID-14-post-submit-path-choice.md) | ✅ Done (`pkg-000055`) · **P7 WAVE COMPLETE** ([reaudit](../../analysis/reaudit-STORY-SPA-ID-14-gap-closure-2026-08-07.md)) · M135 | ID-12 |
| gate | [ID-13 — Public route regression](STORY-SPA-ID-13-public-route-regression.md) · [pipeline](../../epics/EPIC-SPA-04-identity-and-auth/stories/STORY-SPA-ID-13-public-route-regression/STORY-SPA-ID-13-public-route-regression.md) | ✅ Done (`pkg-000041`, gate 2026-08-01T20:02:31Z) | ID-12 |

## Aux artifacts

| File | Role |
|------|------|
| [STORY-SPA-ID-12-icon-assets.md](STORY-SPA-ID-12-icon-assets.md) | M128 icon catalog |
| `STORY-SPA-ID-*-ux-artboard-prompt.md` | UX prompts (not product stories) |
| [STORY-SPA-ID-14-ux-artboard-prompt.md](STORY-SPA-ID-14-ux-artboard-prompt.md) | M135 path-choice prompt (landed) |

**Progress:** 14/14 product stories Done · ~100%
