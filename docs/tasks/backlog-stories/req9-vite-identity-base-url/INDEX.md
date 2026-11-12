# REQ9 — `VITE_IDENTITY_BASE_URL` naming · index

**Зона:** `spa-app/docs/tasks/backlog-stories/req9-vite-identity-base-url/`  
**Тип:** backlog (постановки; P1.3/P3 — после активации pkg).  
**Метод:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)  
**Parent REQ:** [`18-req9-vite-identity-base-url.md`](../../../requirements/18-req9-vite-identity-base-url.md)  
**Parent product:** [`REQ9-DOGEstonia-Microservices-Ops-Parity-Target.md`](../../../../../docs/requirements%20backlog/REQ9-DOGEstonia-Microservices-Ops-Parity-Target.md) §5–§6 R3, §8.5, §10.2  
**Dashboard:** [`spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md)  
**Naming:** `STORY-SPA-REQ9-*`  
**Updated:** 2026-09-26T12:09:47Z · P3 Done `pkg-000086`  


**Operator locks (interview):**
| Theme | Decision |
|-------|----------|
| Railway live bake-var | **A** — repo + docs/scripts + ops checklist; live Railway UI rename does **not** block Story Done |
| `VITE_` prefix | **A** — keep `VITE_IDENTITY_BASE_URL` (Vite client bake) |
| Code symbols | **A** — rename **env key only**; keep `resolveIdentityServiceUrl` / local const names |

---

## Контекст одной фразой

Spa: hard cut `VITE_IDENTITY_SERVICE_URL` → `VITE_IDENTITY_BASE_URL` (grammar `VITE_{PEER}_BASE_URL`); no dual-read; no service tokens in browser; Railway ops checklist after code Done.

---

## Stories

| Status | Key | Title | Depends |
|--------|-----|-------|---------|
| **Done** · P3 | [STORY-SPA-REQ9-01-vite-identity-base-url](STORY-SPA-REQ9-01-vite-identity-base-url.md) · [pipeline](../../epics/EPIC-SPA-15-req9-vite-identity-base-url/stories/STORY-SPA-REQ9-01-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md) · `pkg-000086` | Hard cut identity peer env → `VITE_IDENTITY_BASE_URL` | — |

## Out of package

- Drop `VITE_` prefix / stack-agnostic public env grammar (separate REQ / wave)  
- Dual-read old name  
- `VITE_WAITLIST_API_URL` backend (REQ §6 Unknown)  
- New spa `/health` (G10)  
- Gateway / threads / identity Makefile renames (siblings)  
