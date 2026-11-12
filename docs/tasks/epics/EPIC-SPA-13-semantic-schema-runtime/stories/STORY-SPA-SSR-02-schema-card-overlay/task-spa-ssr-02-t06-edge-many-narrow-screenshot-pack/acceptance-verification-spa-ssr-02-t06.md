# Task acceptance gate — SPA-SSR-02-T06 (F1)

- **Story:** STORY-SPA-SSR-02-schema-card-overlay
- **Package:** `pkg-000075-20260902-epic-spa-13-ssr-02-schema-card-overlay.yaml` **unchanged**
- **Result:** PASS
- **Date:** 2026-09-02T20:30:25Z
- **Wave:** `spa_ssr_02_audit_2026_09_02`

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Edge many PNG (≥5 leaves + showMore) | PASS | [`03-board-overlay-edge-many-1536x1024.png`](../screenshots/full-cycle/03-board-overlay-edge-many-1536x1024.png) |
| Edge narrow PNG (≤520px stacked) | PASS | [`04-board-overlay-edge-narrow-480x900.png`](../screenshots/full-cycle/04-board-overlay-edge-narrow-480x900.png) |
| `screenshots/README.md` Edge table | PASS | [`screenshots/README.md`](../screenshots/README.md) |
| Harness extended; no invent product keys | PASS | [`ssr02-overlay-screenshot.mjs`](../../../../../../../tests/puppeteer/ssr02-overlay-screenshot.mjs) `MANY_ISSUE` fixture leaves only |

## Commands (live verification 2026-09-02T20:30:25Z)

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/screenshots/full-cycle/
rg -n 'Edge|many|narrow' spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/screenshots/README.md
SSR02_PORT=4199 PHASE=post-implement node spa-app/tests/puppeteer/ssr02-overlay-screenshot.mjs
```
