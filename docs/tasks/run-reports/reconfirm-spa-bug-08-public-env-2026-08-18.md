# Reconfirm — STORY-SPA-BUG-08 public-env grep (T01)

- **Date:** 2026-08-18T11:09:52Z
- **Story:** STORY-SPA-BUG-08-vite-public-env-normalize-seam
- **Task:** T01
- **Package:** `pkg-000073`

## Live facts (this session)

| Fact | Evidence |
|------|----------|
| `src/config/publicEnv.js` absent at T01 | `test ! -f spa-app/src/config/publicEnv.js` → absent |
| Raw gateway/mode | `issueService.js` L30–31 · Pulse/Emerging L4–5 |
| `assertBaseUrl` trim + `/+$/` | `GatewayIssueRepository.js` L8–13 |
| Trailing-space unit | `GatewayIssueRepository.test.js` L19 |
| `supabaseClient` no trim | L4–5 |
| Telemetry slash dialect **one** `/` | `labelMissTelemetry.js` L15 |
| `.env.example` L30 hygiene | present |
| `.env` `VITE_GATEWAY_BASE_URL` trailing space | L20 `has_trailing_space=true` (value **not** dumped; len 22 vs stripped 21) |
| E4 is **not** root | investigation H6 / BUG-06 remains root |

Did **not** dump secrets. Did **not** treat E4 as root. Product seam is T03.
