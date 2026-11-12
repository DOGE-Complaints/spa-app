# EPIC-SPA-15 — REQ9 `VITE_IDENTITY_BASE_URL` naming

> **ID:** `EPIC-SPA-15` · **Статус:** **Done** · Wave 1 REQ9-01 P3 Done (`pkg-000086`, 2026-09-26T12:09:47Z)  
> **Тип:** Ops / env rename (hard cut)  
> **source:** [`../../backlog-stories/req9-vite-identity-base-url/INDEX.md`](../../backlog-stories/req9-vite-identity-base-url/INDEX.md)  
> **Parent REQ:** [`18-req9-vite-identity-base-url.md`](../../../requirements/18-req9-vite-identity-base-url.md)  
> **Parent product:** [`REQ9-DOGEstonia-Microservices-Ops-Parity-Target.md`](../../../../docs/requirements%20backlog/REQ9-DOGEstonia-Microservices-Ops-Parity-Target.md) §5–§6 R3, §8.5, §10.2  
> **created_at:** `2026-09-26T12:06:24Z` · **P1.3 REQ9-01:** `2026-09-26T12:06:24Z` · **P3 Done:** `2026-09-26T12:09:47Z`

---

## Назначение

Hard cut public Vite identity peer env: `VITE_IDENTITY_SERVICE_URL` → `VITE_IDENTITY_BASE_URL` (grammar `VITE_{PEER}_BASE_URL`). Keep HL-04 PROD fail-fast / non-PROD fallback; env key only (no symbol rename); Railway lock **A** (checklist, not live UI Done gate).

## Prerequisites (verified)

| Prerequisite | Status |
|--------------|--------|
| Parent REQ-18 on disk | Yes |
| Backlog STORY-SPA-REQ9-01 | Todo → pipeline this wave |
| HL-04 / BUG-08 normalize seam | Done — reuse `getVitePublicString`; change **key string** only |
| EPIC-SPA-14 threads | Separate track — do not mix |

## Состав

| Story | Тема | Pipeline | Status |
|-------|------|----------|--------|
| REQ9-01 | Hard cut → `VITE_IDENTITY_BASE_URL` | [pipeline](stories/STORY-SPA-REQ9-01-vite-identity-base-url/STORY-SPA-REQ9-01-vite-identity-base-url.md) | **Done** · P3 `pkg-000086` |

## Operator locks

| Theme | Decision |
|-------|----------|
| Railway live bake-var | **A** — checklist only; live UI rename does not block Done |
| `VITE_` prefix | Keep `VITE_IDENTITY_BASE_URL` |
| Code symbols | Env key only; keep `resolveIdentityServiceUrl` / locals |
| Dual-read | **Forbidden** |

## Active tip

**REQ9-01** P3 Done · [`pkg-000086`](../../spa-active-packages/pkg-000086-20260926-epic-spa-15-req9-01-vite-identity-base-url.yaml) · T01–T04 Done · gate PASS · UX skip · **STOP before P4**.
