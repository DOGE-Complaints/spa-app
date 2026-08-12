# STORY-SPA-PH-04 — screenshots (story root)

**Viewport:** 1536×1024  
**Captured UTC:** UI-0 2026-08-04T11:35:00Z · UI-3 / full-cycle PASS **2026-08-04T12:16:21Z** · H1 relabel T11 **2026-08-04T12:48:38Z**  
**Canonical evidence for PH-04** — story-root `full-cycle/` (not only T01 `ui-baseline/`).

## Live login status

| Check | Result |
|-------|--------|
| `USER_EMAIL` / `USER_PASSWORD` from `spa-app/.env` | Present |
| Supabase `signInWithPassword` | **PASS** |
| `01-live-load-error-board-*.png` | Produced (live gateway → load-error UI) |
| Mock M132 states B–E (+ results) | GFL-DRIVEN + request interception |
| Script exit | `0` (PASS) |

```bash
cd spa-app && npm run test:ui:board-feed-ph04-full
```

## Dev hooks

| Key | Where | Effect |
|-----|-------|--------|
| Request intercept `/tallinn/issues` | puppeteer full-cycle | empty / results / error envelopes |
| `?search=zzznomatchph04` | URL | filtered-empty (client search) |
| `VITE_LIFE_REALITY_MODE=GFL-DRIVEN` | Vite env (script) | force gateway fetch for mocks |

## Happy flow

| ID | State | File | How triggered |
|----|-------|------|---------------|
| H1 | **live load-error** (gateway unavailable; not populated feed) | [full-cycle/01-live-load-error-board-1536x1024.png](./full-cycle/01-live-load-error-board-1536x1024.png) | `USER_*` login → Continue → `/#/board` · live `GET /tallinn/issues` failed → State E UI |
| H2 | **mock results feed** (canonical happy results SSOT) | [full-cycle/02-happy-mock-results-feed-1536x1024.png](./full-cycle/02-happy-mock-results-feed-1536x1024.png) | intercept results envelope |

> **F4/T11:** Do not treat H1 as proof of a populated live feed. H2 is the happy results evidence. E3 covers mock load-error; H1 is live load-error evidence.

## Edge cases

| ID | State | File | How triggered |
|----|-------|------|---------------|
| E1 | empty board | [full-cycle/03-edge-mock-empty-board-1536x1024.png](./full-cycle/03-edge-mock-empty-board-1536x1024.png) | intercept `{ data: { issues: [] } }` |
| E2 | filtered empty | [full-cycle/04-edge-mock-filtered-empty-1536x1024.png](./full-cycle/04-edge-mock-filtered-empty-1536x1024.png) | results + `?search=zzznomatchph04` |
| E3 | load error (mock) | [full-cycle/05-edge-mock-load-error-1536x1024.png](./full-cycle/05-edge-mock-load-error-1536x1024.png) | intercept HTTP 500 |

## Archive (UI-0 / UI-3 baselines)

Historical anchor PNGs: [`archive/`](./archive/) (copied from T01 `ui-baseline/pre-implement|post-implement`).

## Related

- Anchor UI mockup: [`../task-spa-ph-04-t01-remove-columns-single-feed/ui-mockup-spec.md`](../task-spa-ph-04-t01-remove-columns-single-feed/ui-mockup-spec.md)
- Gate: [`../task-spa-ph-04-t08-story-gate-ph-04/acceptance-verification-spa-ph-04.md`](../task-spa-ph-04-t08-story-gate-ph-04/acceptance-verification-spa-ph-04.md)
