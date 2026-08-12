# Security hardening — backlog package

EPIC mirror: `EPIC-SPA-05` · Epic doc: [EPIC-SPA-SEC.md](EPIC-SPA-SEC.md)

| Order | Story | Status | Depends |
|-------|-------|--------|---------|
| 1 | [SEC-01 — Remove service_role from frontend](STORY-SPA-SEC-01-remove-service-role-from-frontend.md) | Done (pkg-000014) | — |
| 2 | [SEC-03 — Remove debug instrumentation](STORY-SPA-SEC-03-remove-debug-instrumentation.md) | Done (pkg-000015) | SEC-01 |
| — | [SEC-02 — Supabase credential boundary](STORY-SPA-SEC-02-supabase-credential-boundary.md) | Deferred | SEC-01 |

**Progress:** 2/2 actionable stories Done; SEC-02 deferred (67% if counting deferred)

---

## Related package (CTO hard audit 2026-08)

Новый intake из [audit §6 CTO ship list](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md):  
**[hardening-cto-audit-2026-08/](../hardening-cto-audit-2026-08/README.md)** — HL-01…08 (Todo · tech decomp Ready · [EPIC-SPA-10](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)). Не смешивать с Done SEC-01/03.
