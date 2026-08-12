# Rotation decision — STORY-SPA-SEC-01

- **Date:** 2026-06-27
- **Package:** `pkg-000014`
- **Pair:** [STORY-IDS-SEC-04](../../../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md)

## Facts (code / repo)

| Fact | Evidence |
|------|----------|
| `VITE_SUPABASE_SERVICE_ROLE` was in local `.env` at intake | [`spa-app/.env:24`](../../../../../../../.env) (removed T01); gitignored [`spa-app/.gitignore:5-7`](../../../../../../../.gitignore) |
| Never in tracked `src/` | grep `SERVICE_ROLE` in `spa-app/src` → 0 at intake |
| No prod deploy artifact in repo | No CI/deploy env with `VITE_SUPABASE_SERVICE_ROLE` in tracked files |
| Post-T01 local build clean | T04: `grep -r service_role dist/assets/*.js` → empty (2026-06-27) |

## Decision

| Question | Answer |
|----------|--------|
| Was prod/staging bundle **confirmed** deployed with `VITE_SUPABASE_SERVICE_ROLE`? | **No repo evidence.** Operator must confirm from deploy history. |
| Was local dev build possible with leaked key? | **Yes** — key was in `.env` before T01; Vite inlines `VITE_*` at build time. |
| Rotate `service_role` in Supabase Dashboard? | **Recommended** as precaution (local builds may have exposed JWT). |
| Rotate executed in this spa wave? | **No** — out of scope (Dashboard + identity env; see SEC-04). |
| Identity `SUPABASE_SERVICE_ROLE` sync | **Handoff to SEC-04 wave** — no identity code changes in pkg-000014. |

## Operator follow-up (if rotation proceeds)

1. Supabase Dashboard → Project Settings → API → rotate `service_role` key.
2. Update `SUPABASE_SERVICE_ROLE` on `doge-identity-service` (SEC-04 task wave).
3. Record completion in SEC-04 acceptance artifact.

## SPA wave boundary

This decision satisfies story AC #4 (**decision recorded** + SEC-04 sync path documented). Actual rotation execution is operator/SEC-04 scope.
