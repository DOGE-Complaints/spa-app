# STORY-SPA-ID-14 — screenshots (story root)

**Viewport:** 1536×1024 (narrow 390×844)  
**Captured UTC:** UI-0/UI-3 baselines 2026-08-07T19:45–19:56Z · full-cycle PASS **2026-08-07T19:56:01Z** (`liveMode=gateway-submit`)  
**Canonical evidence for ID-14** — story-root `full-cycle/` (primary) · anchor `task-spa-id-14-t05-…/ui-baseline/` as archive/history.

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Live submit → State F | **PASS** (`gateway-submit`) |
| `01-happy-live-submit-state-f-m135-*.png` | Produced |
| Mock State F / narrow / E / empty | Mock Vite + seeded JWT + `dev_handoff_phase` |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:story-submit-m135-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `dev_handoff_phase=submitted` | query | Force State F (`StoryHandoffSuccessPanel`) |
| `dev_handoff_phase=submitting` | query | State E |
| `dev_handoff_phase=empty` | query | Empty / start GPT |
| mock JWT + `doge.mock-profile` | local/sessionStorage | Avoid auth gate on mock captures |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live submit State F | [full-cycle/01-happy-live-submit-state-f-m135-1536x1024.png](./full-cycle/01-happy-live-submit-state-f-m135-1536x1024.png) | `USER_*` → seed draft → preview → Submit → `story-handoff-success` |
| H2 | mock State F | [full-cycle/02-happy-mock-state-f-submitted-1536x1024.png](./full-cycle/02-happy-mock-state-f-submitted-1536x1024.png) | mock Vite + `dev_handoff_phase=submitted` |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | F narrow | [full-cycle/03-edge-mock-state-f-narrow-390x844.png](./full-cycle/03-edge-mock-state-f-narrow-390x844.png) | 390×844 + submitted |
| E2 | E submitting | [full-cycle/04-edge-mock-state-e-submitting-1536x1024.png](./full-cycle/04-edge-mock-state-e-submitting-1536x1024.png) | `dev_handoff_phase=submitting` |
| E3 | E0 empty | [full-cycle/05-edge-mock-state-e0-empty-1536x1024.png](./full-cycle/05-edge-mock-state-e0-empty-1536x1024.png) | `dev_handoff_phase=empty` |

## archive/ (P3 UI-0 / UI-3 baselines from T05)

| File |
|------|
| [archive/pre-implement/](./archive/pre-implement/) |
| [archive/post-implement/](./archive/post-implement/) |

## Commands

```bash
cd spa-app && npx vitest run src/pages/__tests__/StorySubmitPage.test.jsx --reporter=dot
cd spa-app && npm run test:ui:board-shell
cd spa-app && npm run test:ui:story-submit-m135
cd spa-app && npm run test:ui:story-submit-m135-full
```

Secrets: never commit `.env`; this README does not include email/password.

## UI gate links

- Mockup: [ui-mockup-spec.md](../task-spa-id-14-t05-panel-parity-m135/ui-mockup-spec.md) · M135 Path A  
- Acceptance §UI: [acceptance-verification-spa-id-14.md](../task-spa-id-14-t07-story-gate-id-14/acceptance-verification-spa-id-14.md)
