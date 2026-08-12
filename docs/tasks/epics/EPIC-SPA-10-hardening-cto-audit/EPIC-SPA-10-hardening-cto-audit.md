# EPIC-SPA-10 — Hardening CTO audit (launch)

> **Статус:** 🟡 In progress — HL-01 **Done** (`pkg-000059` · P7) · HL-02 **Done** (`pkg-000060` · P7) · **HL-03 Done** (`pkg-000061` P3 · P4 Ready) · **HL-04 Done** (`pkg-000062` P7) · **HL-05 Done** (`pkg-000063` P3 2026-08-10T09:42:36Z) · HL-06…08 tech decomp Ready  
> **Создан:** 2026-08-06  
> **Источник:** [audit-spa-app-architect-cto-security-2026-08-06.md](../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) §6 · backlog [hardening-cto-audit-2026-08](../backlog-stories/hardening-cto-audit-2026-08/README.md)

## Назначение

Закрыть ship blockers и fix-before-launch долг hard audit (Architect/CTO/Security), плюс post-MVP debt: react-router advisories, prod env-bake, handoff return-path tests, identity URL fail-fast, orphan redirect, session guard model, bundle size, dual GPT ops clarity.

**Не** смешивать с Done SEC-01/03 в EPIC-SPA-05; SEC-02 BFF остаётся отдельно.

## Состав

| Order | Story | Wave | Tasks |
|-------|-------|------|-------|
| 1 | [HL-01](stories/STORY-SPA-HL-01-react-router-advisory-triage/STORY-SPA-HL-01-react-router-advisory-triage.md) | Ship blocker | T01–T04 |
| 2 | [HL-02](stories/STORY-SPA-HL-02-prod-env-bake-gate/STORY-SPA-HL-02-prod-env-bake-gate.md) | Ship blocker | T01–T05 (T05 Done P6) |
| 3 | [HL-03](stories/STORY-SPA-HL-03-handoff-return-path-tests/STORY-SPA-HL-03-handoff-return-path-tests.md) | Fix-before-launch | T01–T02 |
| 4 | [HL-04](stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) | Fix-before-launch | T01–T05 |
| 5 | [HL-05](stories/STORY-SPA-HL-05-orphan-protected-route-redirect/STORY-SPA-HL-05-orphan-protected-route-redirect.md) | Fix-before-launch | T01–T03 |
| 6 | [HL-06](stories/STORY-SPA-HL-06-protected-route-guard-model/STORY-SPA-HL-06-protected-route-guard-model.md) | Post-MVP | T01–T04 |
| 7 | [HL-07](stories/STORY-SPA-HL-07-bundle-size-split/STORY-SPA-HL-07-bundle-size-split.md) | Post-MVP | T01–T05 |
| 8 | [HL-08](stories/STORY-SPA-HL-08-dual-gpt-operator-clarity/STORY-SPA-HL-08-dual-gpt-operator-clarity.md) | Post-MVP | T01–T04 |

**Рекомендуемый execute order:** HL-01 → HL-02 → HL-03 → HL-04 → HL-05 → (later) HL-06 → HL-07 → HL-08.

## Связь

- Backlog package: [hardening-cto-audit-2026-08](../backlog-stories/hardening-cto-audit-2026-08/README.md)  
- Adjacent: [EPIC-SPA-05](../EPIC-SPA-05-security-hardening/EPIC-SPA-05-security-hardening.md) · [EPIC-SPA-06 railway](../EPIC-SPA-06-railway-deploy/)  
- Audit: [audit-spa-app-architect-cto-security-2026-08-06](../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md)
