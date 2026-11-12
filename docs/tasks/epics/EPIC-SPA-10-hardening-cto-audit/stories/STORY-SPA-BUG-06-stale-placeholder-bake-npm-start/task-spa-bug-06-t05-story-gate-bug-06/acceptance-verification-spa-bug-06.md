# Story acceptance gate — STORY-SPA-BUG-06

- **Story:** Dist provenance + `npm start` contract (placeholder bake)
- **Package:** `pkg-000071-20260818-epic-spa-10-bug-06-stale-placeholder-bake.yaml`
- **Result:** PASS (local scripts / HL-02) · §8.4 board/login **PENDING** (T06 BLOCKED · gateway `:8000` not listening `2026-08-18T10:33:43Z`)
- **Date:** 2026-08-18T10:18:16Z
- **Re-verify:** 2026-08-18T10:22:42Z (`--print-utc-now`; vitest 13/13; `node scripts/start-spa.mjs` exit 1 `bakeKind=placeholder`; `curl :8000` fail; identity `:8100/me` **401**)

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Evidence / reconfirm note (или явная ссылка на investigation 2026-08-18). | PASS | [reconfirm-spa-bug-06-placeholder-start-2026-08-18.md](../../../../../../../run-reports/reconfirm-spa-bug-06-placeholder-start-2026-08-18.md) |
| Pin layer = SPA start / dist provenance (зафиксирован в gate note). | PASS | T02 pin: start × `dist` bake (H6). Not Login/Board/CORS. |
| `classifySpaBake` + `write-bake-meta.mjs` + `start-spa.mjs` существуют; `package.json` `build`/`start` wired. | PASS | T03 files + package.json scripts |
| `npm start` на placeholder bake → exit **1**, не silent `:4173` UI fail. | PASS | live `node scripts/start-spa.mjs` exit 1 `bakeKind=placeholder` |
| `npm start` на public bake при local `.env` с localhost gateway/identity → exit **1**. | PASS | vitest spaStartDecision (b) |
| Railway-like: public bake, no localhost `.env` → `serve` starts on `${PORT:-4173}`. | PASS | vitest spaStartDecision (c) `{ action: 'serve' }` |
| `rg` `FORBIDDEN_LOCALHOST` still present; `railway.toml` still `verify:build:env-bake`. | PASS | `verify-build-env-bake.mjs` L7 · `railway.toml` L7 |
| No new hostname branches in Login/Board. | PASS | no product edits in LoginPage / BoardPage / mapAuthError |
| After intended local lane (`npm run dev` or local `build`+`start`): `#/board` without `board-load-error`; Network issues to `127.0.0.1:8000` or `localhost:8000` **200**; login token **not** to `project.supabase.co`. | PENDING | T06 BLOCKED `2026-08-18T10:33:43Z`: `curl :8000/tallinn/issues` http_code **000**. Identity `:8100/me` **401**. Do **not** invent issues 200. Operator: start gateway then `npm run dev` (or matching local bake+start). |
| No operator passwords / anon JWT in commit or notes. | PASS | reconfirm + this gate |

## Pin note (FR-BUG-06.2)

Pinned layer = SPA `npm start` / dist provenance. T03 fail-fast wrapper + bake-meta. HL-02 `FORBIDDEN_LOCALHOST` / `railway.toml` `buildCommand` **unchanged**. Login/Board **unchanged**.

## Commands (live verification 2026-08-18T10:18:16Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npx vitest run scripts/lib/__tests__/classifySpaBake.test.js scripts/lib/__tests__/spaStartDecision.test.js
cd spa-app && node scripts/start-spa.mjs; echo exit:$?
rg -n 'FORBIDDEN_LOCALHOST' spa-app/scripts/verify-build-env-bake.mjs
rg -n 'verify:build:env-bake' spa-app/railway.toml
# §8.4 (operator): gateway :8000 up, then npm run dev — board without board-load-error; issues 200
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
