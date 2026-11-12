# Run summary — SPA BUG-06 P6 gap closure

- **Date:** 2026-08-18T10:35:55Z
- **Package:** `pkg-000071-20260818-epic-spa-10-bug-06-stale-placeholder-bake.yaml` **unchanged**
- **Mode:** `run_mode=spa_bug_06_audit_2026_08_18` (Spa_builder safe-override **kept current**; `spa_bug_05_audit_2026_08_16` **not retired**)

## Tasks

| Task | Gap | Result |
|------|-----|--------|
| T06 | F1 | **BLOCKED** · `curl :8000/tallinn/issues` http_code **000** `2026-08-18T10:33:43Z` · identity `:8100/me` **401** · do not invent 200 |
| T07 | F2 | PASS · T01/T02 Code Facts As-of-Done `start-spa.mjs` / Historical `serve -s dist` · `2026-08-18T10:35:03Z` |
| T08 | F3 | PASS · backlog Surface + pipeline/backlog Expected vs Actual As-of-Done · `2026-08-18T10:35:55Z` |

## Disposition (wave)

| Gap | Disposition |
|-----|-------------|
| F1 | **OPEN** (T06 BLOCKED — needs operator gateway `:8000` then intended local lane) |
| F2 | CLOSED (T07) |
| F3 | CLOSED (T08) |

## Product Story Done ≠ empty OPEN gap-list

- Product AC/DoD: **not Done** (AC #9 / §8.4 PENDING)
- Actionable OPEN after P6: **F1** only

## Guards

- HL-02 `FORBIDDEN_LOCALHOST` + `railway.toml` `verify:build:env-bake` not weakened
- no BUG-05 Railway id invented; `spa_bug_05_audit_2026_08_16` not retired
- no BUG-07/08 product or docs-lane mix
- `pkg-000071` / `spa-active-package.current.yaml` not rewritten
- `Spa_builder.plan.md` not edited this P6
- no git push

## Next

Optional **P7** reaudit · F1 remains open until operator starts gateway `:8000` then `npm run dev` (or matching local bake+start). Do not start P7 in this packet.
