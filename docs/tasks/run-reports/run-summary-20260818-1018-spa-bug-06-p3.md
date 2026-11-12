# Run summary — SPA BUG-06 P3

- **Date:** 2026-08-18T10:18:16Z
- **Package:** `pkg-000071`
- **Story:** STORY-SPA-BUG-06-stale-placeholder-bake-npm-start
- **Phase:** P3

## Tasks

| Task | Result | Date |
|------|--------|------|
| T01 Reconfirm placeholder start | PASS · `index-3Fbc_xg4.js` placeholder needles · investigation H6 | 2026-08-18T10:18:16Z |
| T02 Pin start × dist provenance | PASS · pin = SPA start / dist bake | 2026-08-18T10:18:16Z |
| T03 Fix classifier + start-spa | PASS · `start` exit 1 on placeholder | 2026-08-18T10:18:16Z |
| T04 Regression bake kinds + HL-02 | PASS · vitest 13/13 · `FORBIDDEN_LOCALHOST` intact | 2026-08-18T10:18:16Z |
| T05 Story gate | PASS (local scripts) · §8.4 **PENDING** (gateway `:8000` down) | 2026-08-18T10:18:16Z |

## Evidence

- Product: [`spa-app/scripts/lib/classifySpaBake.mjs`](../../../scripts/lib/classifySpaBake.mjs) · [`spaStartDecision.mjs`](../../../scripts/lib/spaStartDecision.mjs) · [`write-bake-meta.mjs`](../../../scripts/write-bake-meta.mjs) · [`start-spa.mjs`](../../../scripts/start-spa.mjs) · [`package.json`](../../../package.json) `build`/`start`
- Reconfirm: [reconfirm-spa-bug-06-placeholder-start-2026-08-18.md](reconfirm-spa-bug-06-placeholder-start-2026-08-18.md)
- Gate: [acceptance-verification-spa-bug-06.md](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/task-spa-bug-06-t05-story-gate-bug-06/acceptance-verification-spa-bug-06.md)
- `railway.toml` L7 unchanged (`verify:build:env-bake`)
- HL-02 / HL-04 **not** reopened · Login/Board **not** patched · no git push · no invented Railway id

## Next

P4 hard-audit. Product Story Done **blocked** on §8.4 (live gateway + `npm run dev`). Commits: P8 unless asked.

## Re-verify (2026-08-18T10:22:42Z)

- `--verify` ok 5 paths · `--check-dates` ok
- vitest 13/13 (classifySpaBake 6 · spaStartDecision 7)
- `node scripts/start-spa.mjs` exit 1 `refusing bakeKind=placeholder`
- `FORBIDDEN_LOCALHOST` L7 intact · `railway.toml` L7 intact · Login/Board/mapAuthError **no git diff**
- `curl :8000/tallinn/issues` connection failed · `:8100/me` **401** — §8.4 still PENDING
