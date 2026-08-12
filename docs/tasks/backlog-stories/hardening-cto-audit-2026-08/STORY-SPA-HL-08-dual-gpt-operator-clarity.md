# STORY-SPA-HL-08 — Dual GPT operator clarity

## Meta
- **Key:** `STORY-SPA-HL-08-dual-gpt-operator-clarity`
- **Epic (target):** TBD · docs / ops adjacent
- **Package:** [hardening-cto-audit-2026-08/](README.md)
- **Status:** Todo — tech decomp Ready (pipeline scaffolded; not executed) · **Post-MVP**
- **Severity:** ⚪ Info (ops / support risk)
- **Source:** [audit §F6 / C4](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) · HEAD `eaec8bb`
- **Depends on:** [spa-url-page-map.md](../../../spa-url-page-map.md); [UAT-MVP-BRIEF.md](../../../uat/UAT-MVP-BRIEF.md)
- **Out of scope for this file:** объединение двух GPT продуктов в один код-путь; смена GPT Actions OpenAPI

## Зачем простыми словами

В системе **два** разных контура с Custom GPT:

1. **Story draft handoff** — `/story/submit?draft_id=` + возврат в GPT через `VITE_STORY_GPT_URL`  
2. **OAuth bridge** — `/login?oauth_request_id=` + callback URL из identity

Оператор и UAT легко путают «куда пользователь вернулся» и какой URL «правильный». Часть уже описана в url-map/UAT; нужно **добить ясность** до уровня, где support/UAT не смешивают контуры.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| Два контура явно разделены в url-map §3–5 | spa-url-page-map.md |
| Audit F6: confusion risk = product ops, не баг кода | audit F6 |
| UAT brief уже упоминает Tier A/B handoff | UAT-MVP-BRIEF.md |
| Код: LoginPage OAuth vs StorySubmitPage draft | audit architecture map |

## Функциональные требования (первый слой)

- **FR-HL-08.1** SSOT docs (url-map и/или короткий ops runbook) содержат чеклист: «какой URL для какого сценария» + что **не** является return_to для story CTA.
- **FR-HL-08.2** UAT / operator onboarding ссылается на этот SSOT без необходимости читать `src/`.
- **FR-HL-08.3** Явно помечены gaps (если остались): например OAuth callback vs `VITE_STORY_GPT_URL` — когда какой.

## Acceptance Criteria (problem-level)

- [ ] Один кликабельный SSOT раздел/дока для dual GPT.
- [ ] UAT brief или README пакета ссылается на SSOT.
- [ ] Re-audit C4/F6 может закрыться как docs Done без code change **или** с минимальным docs-only diff.


## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-HL-08-dual-gpt-operator-clarity`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-08-dual-gpt-operator-clarity/STORY-SPA-HL-08-dual-gpt-operator-clarity.md)
- **Epic:** [`EPIC-SPA-10`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-hl-08-t01-gap-scan-url-map-uat`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-08-dual-gpt-operator-clarity/task-spa-hl-08-t01-gap-scan-url-map-uat/README.md) | Todo |
| T02 | [`task-spa-hl-08-t02-ops-ssot-section`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-08-dual-gpt-operator-clarity/task-spa-hl-08-t02-ops-ssot-section/README.md) | Todo |
| T03 | [`task-spa-hl-08-t03-cross-link-uat-bullrun`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-08-dual-gpt-operator-clarity/task-spa-hl-08-t03-cross-link-uat-bullrun/README.md) | Todo |
| T04 | [`task-spa-hl-08-t04-story-gate-hl-08`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-08-dual-gpt-operator-clarity/task-spa-hl-08-t04-story-gate-hl-08/README.md) | Todo |

> Tech decomposition Ready. Execute only after pkg activation / P3.

## Вне scope

- Реализация нового GPT продукта.
- HL-03 tests (другой контур — return path внутри SPA).

## Швы

- spa-url-page-map · UAT brief · LoginPage · StorySubmitPage · gptBridgeFlowState · storyHandoffFlowState

## Next (process)

1. PA.3 — wave confirmation if needed.
2. P3 / pkg activation — then execute Nested tasks in order.
3. Story-gate task closes FR/AC; set Status Done only after gate.
