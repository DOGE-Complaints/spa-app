# UI Baseline — M128 Story Handoff (T08 anchor)

**Story:** STORY-SPA-ID-12  
**Route:** `/#/story/submit`  
**Viewport:** 1536×1024  
**Captured UTC:** 2026-07-05 (P3 execute)

## Capture method

`npm run test:ui:story-handoff-m128` with `PHASE=pre-implement|post-implement`

Dev query override: `dev_handoff_phase=<phase>` per [ui-mockup-spec.md](./ui-mockup-spec.md).

## Selectors

| State | Selector |
|-------|----------|
| A | `[data-testid="story-handoff-resolving"]` |
| B | `[data-testid="story-handoff-login"]` |
| C | `[data-testid="story-handoff-preview"]` |
| D | `[data-testid="story-handoff-verify"]` |
| E | `[data-testid="story-handoff-submitting"]` |
| F | `[data-testid="story-handoff-success"]` |
| G | `[data-testid="story-handoff-expired"]` |
| H | `[data-testid="story-handoff-service-down"]` |
| E0 | `[data-testid="story-handoff-empty"]` |

## Retroactive note

Pre-implement baseline skipped (greenfield route `/story/submit`); post-implement captures are story-gate evidence.

## Live E2E (`live-e2e/`)

**Command:** `npm run test:ui:story-handoff-m128-live`

**Prerequisites:**
- Gateway `http://127.0.0.1:8000/health` OK
- Identity `http://127.0.0.1:8100/health` OK
- `spa-app/.env`: `VITE_GATEWAY_BASE_URL`, `VITE_IDENTITY_MOCK_MODE=false`, Supabase keys
- Env (never commit): `PUPPETEER_TEST_EMAIL`, `PUPPETEER_TEST_PASSWORD`, `GATEWAY_SERVICE_API_TOKEN`

**Output:** `live-e2e/{slug}-1536x1024.png` + `capture-modes.json` (live | hybrid | dev_handoff per state)

| State | Typical mode |
|-------|----------------|
| A, B, C, G, E0 | live |
| D | live if submit→403 verify; else hybrid (`dev_handoff_phase=verify`) |
| E, F | live if submit→202; partial hybrid if verify branch |
| H | dev_handoff (gateway stop not attempted) |

**State B (live):** redirect to `/#/login?next=...` — screenshot `[data-testid="auth-page"]`, not `story-handoff-login`.
