# SPA-BUG-08-T06 — As-of-Done backlog Surface / Repro / Env (F1)

**Status:** Done — P6 PASS 2026-08-18T11:22:22Z · F1 **CLOSED**  
**Story:** [`../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-08-execution-2026-08-18.md](../../../../../../analysis/audit-STORY-SPA-BUG-08-execution-2026-08-18.md) §F1  
**Depends on:** SPA-BUG-08-T05 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T11:18:17Z  
**Gate Date:** 2026-08-18T11:22:22Z  
**Package:** `pkg-000073` **unchanged** · wave `spa_bug_08_audit_2026_08_18`

## Purpose
Doc-only: backlog Meta **Surface** / **Repro** / **Env** still present-tense pre-T03. Disk: seam exists; listed readers migrated.

## Risk
Readers treat pre-T03 Surface as current. Moving HL-04 fallback into `publicEnv.js`. Mixing BUG-05/06/07. Changing `package.json` `start`.

## Code Facts (re-verify at execute)
- Seam exists: [`publicEnv.js`](../../../../../../../src/config/publicEnv.js) L10 `normalizePublicBaseUrl` · L20 `getVitePublicString` · L30 `getVitePublicUrl`.
- Backlog Surface/Repro/Env As-of-Done + Historical: [`STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) L16–18.
- HL-04 fallback still resolver: [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) L8–10.

## Gap
Audit F1 Low — persistent backlog Surface / Repro / Env SSOT vs shipped `publicEnv.js`. **CLOSED** this P6.

## AC / DoD
- [x] (P0) Backlog Meta Surface / Repro / Env → As-of-Done current (`publicEnv.js` exists; listed readers migrated) + Historical pre-T03 cite.
- [x] (P0) Doc-only. Do **not** move HL-04 fallback into `publicEnv`. Do not mix BUG-05/06/07. Do not change `package.json` `start`.
- [x] (P0) Do not rewrite `pkg-000073`. Gate `Date:` from `--print-utc-now` after rewrite only.

## Where to change
- [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) Meta Surface · Repro · Env (L16–18)

## Out of scope
Product source; F2 Expected vs Actual / §Проблема (T07); git push; `.env` secret dump.

## Verification
```bash
rg -n 'Surface|Repro|Env|publicEnv.js|Historical|As-of-Done' spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md
test -f spa-app/src/config/publicEnv.js && echo 'publicEnv.js exists'
```
