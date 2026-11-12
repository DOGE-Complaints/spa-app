# Reconfirm — STORY-SPA-BUG-07 start vs preview docs drift (T01)

- **Date:** 2026-08-18T10:47:00Z
- **Story:** STORY-SPA-BUG-07-start-preview-docs-drift
- **Task:** T01
- **Package:** `pkg-000072`

## Live facts (this session)

| Fact | Evidence |
|------|----------|
| Example still names `start` as `vite preview` | `spa-app/.env.example` L56 |
| Runtime manual same stale line | `spa-app/docs/runtime-docs/frontend-run-and-environment.md` L42 |
| Disk `start` is **not** `vite preview` | `spa-app/package.json` L10 `"start": "node scripts/start-spa.mjs"` |
| Disk `preview` / `dev` | L9 `vite preview` · L7 `vite` |
| D3 is **not** root | investigation H6 / BUG-06 remains root; example L37–41 already `npm run dev` |

Did **not** dump secrets. Did **not** rediscover D3 as root. Docs rewrite is T03.
