# Story acceptance gate — STORY-SPA-BUG-07-start-preview-docs-drift

- **Story:** Three start lanes: `dev` / `build`+`start` / HL-02 bake (docs SSOT)
- **Package:** `pkg-000072-20260818-epic-spa-10-bug-07-start-preview-docs.yaml`
- **Result:** PASS
- **Date:** 2026-08-18T10:48:03Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Pin note: example/runtime-docs vs `package.json` L10. | PASS | [reconfirm](../../../../../../../run-reports/reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md) · T02 pin = docs layer |
| `.env.example` three-lane block present; L56–63 match `serve` / `preview` split. | PASS | Lane A/B/C in `.env.example`; `"start"` = `start-spa.mjs` → `serve` |
| `frontend-run-and-environment.md` L38–42 (or successor table) matches `package.json`. | PASS | table + §7; sverka 2026-08-18 |
| `rg` gate: no remaining **normative** `start` = `vite preview` in `.env.example` or runtime-docs (analysis/audit historical quotes allowed). | PASS | example clean; runtime-docs L42 negation «Не vite preview»; analysis historical OK; deploy-guide L287 troubleshooting OK |
| deploy-guide / railway.toml not rewritten against DEPLOY-02. | PASS | L94/L231/`railway.toml` L3 still `serve`; L7 still `verify:build:env-bake` |
| No `FORBIDDEN_LOCALHOST` / `railway.toml` `buildCommand` changes. | PASS | `verify-build-env-bake.mjs` L7 · `railway.toml` L7 |

## Pin note (FR-BUG-07.1)

Pinned layer = docs/example vs disk `package.json` `"start"`. Product `start-spa.mjs` **not** rewritten this pkg. `package.json` `start` **not** reverted to `vite preview`.

## Commands (live verification 2026-08-18T10:48:03Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n 'start.*vite preview|"start": vite preview' spa-app/.env.example spa-app/docs/runtime-docs/frontend-run-and-environment.md
rg -n '"start"' spa-app/package.json
rg -n 'FORBIDDEN_LOCALHOST' spa-app/scripts/verify-build-env-bake.mjs
rg -n 'verify:build:env-bake' spa-app/railway.toml
```
