# STORY-SPA-PH-05 — screenshots (story root)

**Viewport:** width 1536 · fullPage height ~1783 (State A evidence; not fold-only 1024)  
**Captured UTC:** UI-0 2026-08-04T13:15:54Z · P3 full-cycle 2026-08-04T13:22:05Z · **P6 T10 recapture 2026-08-05T09:20:08Z**  
**Canonical evidence for PH-05** — story-root `full-cycle/` (not only T02 `ui-baseline/`).

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Login → `/#/how-it-works` | **PASS** |
| Full-page State A (steps 01–04 + CTA row) | **PASS** · 1536×1783 |
| Single chrome after T09 (`/how-it-works` ∈ PUBLIC_PATHS) | **PASS** · one WORKSPACE sidebar |
| H1 vs H2 bytes | **identical** under `VITE_IDENTITY_MOCK_MODE` (same Demo User chrome after storage clear — session chrome delta N/A) |
| Script exit | `0` (PASS) · commit `a6484ab` |

```bash
cd spa-app && npm run test:ui:how-it-works-ph05-full
```

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live how-it-works full State A | [full-cycle/01-happy-live-how-it-works-full-1536.png](./full-cycle/01-happy-live-how-it-works-full-1536.png) | `USER_*` login → `/#/how-it-works` · `fullPage: true` |
| H2 | mock default tutorial full State A | [full-cycle/02-happy-mock-default-tutorial-full-1536.png](./full-cycle/02-happy-mock-default-tutorial-full-1536.png) | storage clear → `/#/how-it-works` · 4 steps · `fullPage: true` |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| — | _(M133 single primary state)_ | — | No separate error/empty artboard states |

## Archive (UI-0 / UI-3 / pre-T10)

Historical PNGs: [`archive/`](./archive/) — T02 baselines + pre-T10 fold-only H1/H2 (`pre-t10-*-1536x1024.png`).

## Related

- Anchor UI mockup: [`../task-spa-ph-05-t02-four-step-layout/ui-mockup-spec.md`](../task-spa-ph-05-t02-four-step-layout/ui-mockup-spec.md)
- Gate T10: [`../task-spa-ph-05-t10-recapture-full-state-a-evidence/acceptance-verification-spa-ph-05-t10.md`](../task-spa-ph-05-t10-recapture-full-state-a-evidence/acceptance-verification-spa-ph-05-t10.md)
- Story gate: [`../task-spa-ph-05-t07-story-gate-ph-05/acceptance-verification-spa-ph-05.md`](../task-spa-ph-05-t07-story-gate-ph-05/acceptance-verification-spa-ph-05.md)
