# Story acceptance — SPA-BUG-06-T03 classifier + bake-meta + start-spa

- **Task:** T03
- **Result:** PASS
- **Date:** 2026-08-18T10:18:16Z
- **Package:** `pkg-000071-20260818-epic-spa-10-bug-06-stale-placeholder-bake.yaml`

## AC

| AC | Status | Evidence |
|----|--------|----------|
| `classifySpaBake` + `write-bake-meta.mjs` + `start-spa.mjs` exist; `package.json` `build`/`start` wired | PASS | `spa-app/scripts/lib/classifySpaBake.mjs` · `scripts/write-bake-meta.mjs` · `scripts/start-spa.mjs` · `scripts/lib/spaStartDecision.mjs` · package.json `build=vite build && node scripts/write-bake-meta.mjs` · `start=node scripts/start-spa.mjs` |
| placeholder `npm start` → exit 1 | PASS | live `node scripts/start-spa.mjs` after write-bake-meta on current dist → refuse `bakeKind=placeholder` |
| public bake + local `.env` → exit 1 | PASS | vitest spaStartDecision `(b)` |
| Railway-like public, no localhost `.env` → serve | PASS | vitest spaStartDecision `(c)` |
| No new hostname branches in Login/Board | PASS | no edits under `src/pages/LoginPage.jsx` / `BoardPage.jsx` / `src/auth/mapAuthError.js` |

## Commands

```bash
cd spa-app && npx vitest run scripts/lib/__tests__/classifySpaBake.test.js scripts/lib/__tests__/spaStartDecision.test.js
cd spa-app && node scripts/start-spa.mjs; echo exit:$?
```
