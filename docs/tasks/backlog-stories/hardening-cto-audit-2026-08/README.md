# hardening-cto-audit-2026-08 — CTO / Security launch hardening

> **Тип пакета:** backlog intake (требования + обоснования)  
> **Источник:** [audit-spa-app-architect-cto-security-2026-08-06.md](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) **§6 CTO ship list** (findings F1–F8)  
> **As-of audit HEAD:** `eaec8bb`  
> **Статус:** Todo — tech decomp Ready (EPIC-SPA-10 scaffolded)  
> **Вне этого пакета:** pkg yaml activation, P3 execute, product `src/` реализация

## Зачем

Hard audit (Architect / CTO / Security) зафиксировал, что MVP **функционально** опирается на чистый SEC-01 и зелёный harness, но **production «hardened»** ещё не закрыт: dependency advisories, процесс bake публичных URL, дыры в тестах return-path, мелкий архитектурный шум и post-MVP долг по shell/bundle/GPT ops.

Этот пакет переводит §6 ship list в **отдельные стори** без смешения с Done SEC-01/03 и без выбора «как именно чинить» в коде.

## Волны

| Wave | Stories | Смысл |
|------|---------|--------|
| **Ship blockers** | [HL-01](STORY-SPA-HL-01-react-router-advisory-triage.md) · [HL-02](STORY-SPA-HL-02-prod-env-bake-gate.md) | Не называть prod hardened без закрытия |
| **Fix-before-launch** | [HL-03](STORY-SPA-HL-03-handoff-return-path-tests.md) · [HL-04](STORY-SPA-HL-04-prod-fail-fast-identity-url.md) · [HL-05](STORY-SPA-HL-05-orphan-protected-route-redirect.md) | Сильно рекомендуется до публичного launch |
| **Post-MVP** | [HL-06](STORY-SPA-HL-06-protected-route-guard-model.md) · [HL-07](STORY-SPA-HL-07-bundle-size-split.md) · [HL-08](STORY-SPA-HL-08-dual-gpt-operator-clarity.md) | Осознанный долг после MVP loop |

**Рекомендуемый порядок активации:** HL-01 → HL-02 → HL-03 → HL-04 → HL-05, затем HL-06…08.

## Не входит (намеренно)

| Item | Почему |
|------|--------|
| F9 / F10 | Info / SEC-01 holds — не отдельные стори |
| [SEC-02](../security-hardening/STORY-SPA-SEC-02-supabase-credential-boundary.md) | Отдельная deferred граница кредов |
| PH / CAB product UI | Другие пакеты |
| pkg yaml / P3 execute | После активации; tech decomp уже в EPIC-SPA-10 |

## Epic

**[EPIC-SPA-10-hardening-cto-audit](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)** — pipeline stories + task READMEs (Code Facts / AC / Verification). Не смешивать с Done SEC-01/03 в EPIC-SPA-05. **pkg не активирован.**

## Индекс

Полная таблица: [INDEX.md](INDEX.md).

## Связанные docs

- URL / GPT loops: [spa-url-page-map.md](../../../spa-url-page-map.md)  
- UAT: [uat/UAT-MVP-BRIEF.md](../../../uat/UAT-MVP-BRIEF.md)  
- Deploy bake script: `scripts/verify-build-env-bake.mjs`  
- Prior SEC package: [security-hardening/INDEX.md](../security-hardening/INDEX.md)
