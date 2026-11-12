# semantic-schema-runtime — INDEX

> **Пакет:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **REQ:** [16-semantic-schema-spa-compatibility.md](../../../requirements/16-semantic-schema-spa-compatibility.md)  
> **Режим:** ADMIN queue **6/6 Done** · product **3 Done / 0 Todo** · Epic [EPIC-SPA-13](../../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md)

## Admin queue

| Key | File | Status | Next |
|-----|------|--------|------|
| ADMIN-SSR-01 | [ADMIN-SSR-01-product-ux-prompts.md](ADMIN-SSR-01-product-ux-prompts.md) | **Done** | [UX-PROMPTS.md](UX-PROMPTS.md) |
| ADMIN-SSR-02 | [ADMIN-SSR-02-ux-mockup-intake.md](ADMIN-SSR-02-ux-mockup-intake.md) | **Done** | [M141–M142](../../../UX/mockups/semantic-schema/README.md) Spec+PNG |
| ADMIN-SSR-03 | [ADMIN-SSR-03-icon-assets-catalog.md](ADMIN-SSR-03-icon-assets-catalog.md) | **Done** | [STORY-SPA-SSR-icon-assets.md](STORY-SPA-SSR-icon-assets.md) |
| ADMIN-SSR-04 | [ADMIN-SSR-04-api-requirements.md](ADMIN-SSR-04-api-requirements.md) | **Done** | [STORY-SPA-SSR-api-requirements.md](STORY-SPA-SSR-api-requirements.md) |
| ADMIN-SSR-05 | [ADMIN-SSR-05-backlog-stories-l10n.md](ADMIN-SSR-05-backlog-stories-l10n.md) | **Done** | Waves 0–3 product Done · L10N `schemaRuntime.*` |
| ADMIN-SSR-06 | [ADMIN-SSR-06-tech-decomposition.md](ADMIN-SSR-06-tech-decomposition.md) | **Done** | [EPIC-SPA-13](../../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md) |

**Execute order:** 01 → 02 → 03 ∥ 04 → 05 → 06 · then P1.3 on EPIC-SPA-13 (operator) · Wave 0 SSR-01 **Done** `pkg-000074` · Wave 1 SSR-02 **Done** `pkg-000075` · Wave 2–3 SSR-03 **Done** `pkg-000076`

## Product stories

| Key | File | orientation | Status | Pipeline |
|-----|------|-------------|--------|----------|
| SSR-01 | [STORY-SPA-SSR-01-issue-public-shape-consume.md](STORY-SPA-SSR-01-issue-public-shape-consume.md) | tech_first | **Done** | [Wave 0](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-01-issue-public-shape-consume/STORY-SPA-SSR-01-issue-public-shape-consume.md) · P3 2026-09-02 |
| SSR-02 | [STORY-SPA-SSR-02-schema-card-overlay.md](STORY-SPA-SSR-02-schema-card-overlay.md) | ui_first | **Done** | [Wave 1](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/STORY-SPA-SSR-02-schema-card-overlay.md) · P3 2026-09-02 |
| SSR-03 | [STORY-SPA-SSR-03-board-list-map-toggle.md](STORY-SPA-SSR-03-board-list-map-toggle.md) | ui_first | **Done** · `pkg-000076` | [Wave 2–3](../../epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-03-board-list-map-toggle/STORY-SPA-SSR-03-board-list-map-toggle.md) · P3 2026-09-02 |

L10N: `schemaRuntime.*` · Map ADR: [ADR-SSR-03-map-library.md](ADR-SSR-03-map-library.md) · Map assemble: [ARCHITECTURE-SSR-03-board-map-pins.md](ARCHITECTURE-SSR-03-board-map-pins.md)

## Cross-links

- Epic: [EPIC-SPA-13](../../epics/EPIC-SPA-13-semantic-schema-runtime/EPIC-SPA-13-semantic-schema-runtime.md)
- Sibling gateway: [REQ-51](../../../../../doge-complaints-gateway/docs/requirements/51-semantic-schema-runtime.md) · [GW-SSR-30](../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/semantic-schema-runtime/STORY-GW-SSR-30-tallinn-card-fields-spa-overlay-readiness.md)
- Mockups SSOT: [semantic-schema/](../../../UX/mockups/semantic-schema/README.md) (M141 / M142)
- Board host: PH-04 · Early Signal: [../early-signal-dashboard/INDEX.md](../early-signal-dashboard/INDEX.md)
- Parent REQ: [REQ-16](../../../requirements/16-semantic-schema-spa-compatibility.md)
