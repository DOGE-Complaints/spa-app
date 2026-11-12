# Run summary — SPA BUG-07 P3

- **Date:** 2026-08-18T10:48:03Z
- **Package:** `pkg-000072`
- **Story:** STORY-SPA-BUG-07-start-preview-docs-drift
- **Phase:** P3

## Tasks

| Task | Result | Date |
|------|--------|------|
| T01 Reproduce grep/example vs `package.json` | PASS · example L56 + runtime-docs L42 ≠ disk L10 | 2026-08-18T10:47:00Z |
| T02 Pin docs layer | PASS · pin = docs vs `package.json` `start` | 2026-08-18T10:47:00Z |
| T03 Fix `.env.example` + runtime-docs | PASS · three-lane + sverka 2026-08-18 · §8.5 one-line | 2026-08-18T10:48:03Z |
| T04 Regression grep | PASS · no normative `start`=`vite preview` in example/runtime-docs | 2026-08-18T10:48:03Z |
| T05 Story gate | PASS · 6/6 AC | 2026-08-18T10:48:03Z |

## Evidence

- Docs: [`spa-app/.env.example`](../../../.env.example) · [`frontend-run-and-environment.md`](../../../runtime-docs/frontend-run-and-environment.md)
- Reconfirm: [reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md](reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md)
- Gate: [acceptance-verification-spa-bug-07.md](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/task-spa-bug-07-t05-story-gate-bug-07/acceptance-verification-spa-bug-07.md)
- Disk `"start"` still `node scripts/start-spa.mjs`
- `railway.toml` L7 unchanged (`verify:build:env-bake`) · `FORBIDDEN_LOCALHOST` intact
- HL-02 / HL-04 **not** reopened · BUG-05/06/08 **not** mixed · no git push

## Next

Optional P4 hard-audit. Product Story AC/DoD **Done** (docs). Commits: P8 unless asked.
