# STORY-SPA-PH-06 — screenshots (story root)

**Viewport:** 1536×1024  
**Captured UTC:** UI-0/3 baselines 2026-08-05T10:25–10:28Z · full-cycle P3 **2026-08-05T10:30:00Z** · **T10 H3 recapture 2026-08-06T09:51:14Z** · **PH-07 P6 T07 proven mock results 2026-08-06T18:10:54Z** (`assertBoardMockResults` — H1/H2 show `ISSUE-PH07-1` / «Mock feed item one»)  
**Canonical evidence for PH-06** — story-root `full-cycle/` (not only T02 `ui-baseline/`).

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Supabase password login → Continue → `/#/board` | **PASS** |
| Live `01-happy-live-board-submit-ctas-*.png` | Produced (`public-nav-submit` + `board-submit-cta`) · **backdrop=helper mock results** (PH-07 T07) |
| Mock board / how-it-works Submit | Mock Vite (`VITE_IDENTITY_MOCK_MODE=true`) |
| H3 CTA in viewport | **PASS** T10 — `scrollIntoView({block:'center'})` before shot (F3) |
| Accidental board-load-error on H1/H2 | **Absent** — `assertNoBoardLoadError` (PH-07) |
| Positive mock marker on H1/H2 | **PASS** — `assertBoardMockResults` (PH-07 T07) |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:submit-ph06-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| `VITE_STORY_GPT_URL` | env | Submit href via `getStoryGptHref()` |
| `VITE_IDENTITY_MOCK_MODE` | Vite | Deterministic mock chrome |
| `doge.locale` | localStorage | en \| et \| ru |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | live board Submit CTAs | [full-cycle/01-happy-live-board-submit-ctas-1536x1024.png](./full-cycle/01-happy-live-board-submit-ctas-1536x1024.png) | `USER_*` → Continue → `/#/board` |
| H2 | mock board Submit | [full-cycle/02-happy-mock-board-submit-ctas-1536x1024.png](./full-cycle/02-happy-mock-board-submit-ctas-1536x1024.png) | mock Vite `/#/board` |
| H3 | mock how-it-works Submit CTA | [full-cycle/03-happy-mock-how-it-works-submit-cta-1536x1024.png](./full-cycle/03-happy-mock-how-it-works-submit-cta-1536x1024.png) | `/#/how-it-works` + `shotInView(how-it-works-cta-submit)` — CTA row visible (T10) |

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| — | _(empty env calm — unit-tested)_ | — | `storyGptUrl.test.js` empty → `#` |

## Archive (UI-0 / UI-3 baselines)

Historical pre/post PNGs: [`archive/`](./archive/).

## Related

- Anchor UI mockup: [`../task-spa-ph-06-t02-wire-nav-submit/ui-mockup-spec.md`](../task-spa-ph-06-t02-wire-nav-submit/ui-mockup-spec.md)
- Story gate: [`../task-spa-ph-06-t07-story-gate-ph-06/acceptance-verification-spa-ph-06.md`](../task-spa-ph-06-t07-story-gate-ph-06/acceptance-verification-spa-ph-06.md)
- T10 gate: [`../task-spa-ph-06-t10-recapture-h3-how-it-works-cta/acceptance-verification-spa-ph-06-t10.md`](../task-spa-ph-06-t10-recapture-h3-how-it-works-cta/acceptance-verification-spa-ph-06-t10.md)

Secrets: never commit `.env`; this README does not include email/password.
